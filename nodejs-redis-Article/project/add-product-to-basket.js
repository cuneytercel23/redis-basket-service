router.post("/v10/baskets/:productId", async (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const productPrice = req.body.productPrice;
  let newBasketId = null;
  let newBasketItemId = null;

  let quantity = 1;

  if (!isValidObjectId(productId)) { // isValidObject controls productId
    return next(new BadRequestError(errMsg.productIdIsNotValid));
  }

  if (!productPrice) {
    return next(new NotFoundError(errMsg.productPriceIsNotFound)); 
  }

  try {
    let basketItem = null;

    let basket = await getBasket(userId); //getBasket Query

    if (!basket) {
      newBasketId = newObjectId(); // newObjectId() => creates a new objectId
      basket = {
        id: newBasketId.toString(),
        userId: userId.toString(),
        status: "pending",
        totalBasketAmount: 0,
      };
      basketItem = null;

      await setBasket(userId, basket);
    } else {
      console.log(basket.id, productId);
      basketItem = await getBasketItem(basket.id, productId); //getBasketItem Query
    }

    if (!basketItem) {
      // if item does not exist

      newBasketItemId = newObjectId();

      basketItem = {
        id: newBasketItemId.toString(),
        basketId: basket.id,
        productId: productId.toString(),
        quantity: quantity,
        productPrice: productPrice,
        totalProductAmount: quantity * productPrice,
      };

      await newBasketItem(basketItem); //newBasketItem Query

      basket.totalBasketAmount =
        parseInt(basket.totalBasketAmount) + basketItem.totalProductAmount;
    } else {
      // if item already exist..

      const oldProductAmount = basketItem.totalProductAmount;
      basketItem.quantity = parseInt(basketItem.quantity) + quantity;
      basketItem.productPrice = productPrice;
      basketItem.totalProductAmount = basketItem.quantity * productPrice;
      const amountChange = basketItem.totalProductAmount - oldProductAmount;
      basket.totalBasketAmount =
        parseInt(basket.totalBasketAmount) + amountChange;
      await setBasketItem(basketItem.id, basketItem);
    }

    await setBasketAmount(basket.id, basket.totalBasketAmount);

    basket.basketItems = [basketItem];
    res.status(201).send(basket);

    /// save basket to db
 
    if (newBasketItemId) {
      const basketItemInDb = new BasketItem({
        _id: newBasketItemId,
        basketId: basket.id,
        productId,
        quantity,
        productPrice,
        totalProductAmount: quantity * productPrice,
      });
      await basketItemInDb.save();
    } else {
      await BasketItem.findByIdAndUpdate(basketItem.id, {
        $set: {
          quantity: basketItem.quantity,
          productPrice: basketItem.productPrice,
          totalProductAmount: basketItem.totalProductAmount,
        },
      });
      console.log("saving basketItem");
    }

    if (newBasketId) {
      // create basket in db
      const basketDb = new Basket({
        _id: newBasketId,
        platformId: basket.platformId,
        shopId: basket.shopId,
        userId: basket.userId,
        status: basket.status,
        totalBasketAmount: basket.totalBasketAmount,
      });
      await basketDb.save();
    } else {

      await Basket.findByIdAndUpdate(basket.id, {
        $set: {
          totalBasketAmount: basket.totalBasketAmount,
        },
      });
    }
  } catch (err) {
    return next(new HttpServerError(err));
  }
});

module.exports = router;

router.patch("/v10/baskets/:productId/increase", async (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const productPrice = req.body.productPrice;

  if (!isValidObjectId(productId)) {
    return next(new BadRequestError(errMsg.productIdIsNotValid));
  }

  try {
    let basketItem = null;
    let basket = await getBasket(userId);

    if (!basket) {
      return next(
        new NotFoundError(errMsg.productNotFoundToIncreaseQuantity, err)
      );
    }
    basketItem = await getBasketItem(basket.id, productId);

    if (!basketItem) {
      return next(
        new NotFoundError(errMsg.productNotFoundToIncreaseQuantity, err)
      );
    }

    const oldProductAmount = basketItem.totalProductAmount;
    basketItem.quantity = parseInt(basketItem.quantity) + 1;
    basketItem.productPrice = productPrice;
    basketItem.totalProductAmount = basketItem.quantity * productPrice;
    const amountChange = basketItem.totalProductAmount - oldProductAmount;
    basket.totalBasketAmount =
      parseInt(basket.totalBasketAmount) + amountChange;

    await setBasketItem(basketItem.id, basketItem);
    await setBasketAmount(basket.id, basket.totalBasketAmount);

    basket.basketItems = [basketItem];

    res.status(201).send(basket);

    /// save basket and basketItem

    await Basket.findByIdAndUpdate(basket.id, {
      $set: {
        totalBasketAmount: basket.totalBasketAmount,
      },
    });

    await BasketItem.findByIdAndUpdate(basketItem.id, {
      $set: {
        quantity: basketItem.quantity,
        productPrice: basketItem.productPrice,
        totalProductAmount: basketItem.totalProductAmount,
      },
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpServerError(errMsg.dbErrorWhenIncreasingProductsInBaskets, err)
    );
  }
});

module.exports = router;

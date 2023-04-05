router.delete("/v10/baskets/:productId", async (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.productId;

  if (!isValidObjectId(productId)) {
    return next(new BadRequestError(errMsg.productIdIsNotValid));
  }

  try {
    let basketItem = null;
    let basket = await getBasket(userId);

    if (!basket) {
      return next(
        new NotFoundError(errMsg.productNotFoundToDeleteQuantity, err)
      );
    }
    basketItem = await getBasketItem(basket.id, productId);

    if (!basketItem) {
      return next(
        new NotFoundError(errMsg.productNotFoundToDeleteQuantity, err)
      );
    }

    await removeBasketItem(basket.id, basketItem.id, basketItem.productId);

    const deletedBasketAmount = basketItem.totalProductAmount;
    basket.totalBasketAmount =
      parseInt(basket.totalBasketAmount) - deletedBasketAmount;
    await setBasketAmount(basket.id, basket.totalBasketAmount);

    basket.basketItems = [basketItem]; //deleted item

    res.status(201).send(basket);

    await BasketItem.findByIdAndDelete(basketItem.id);

    await Basket.findByIdAndUpdate(basket.id, {
      $set: {
        totalBasketAmount: basket.totalBasketAmount,
      },
    });
  } catch (err) {
    return next(new HttpServerError(err));
  }
});

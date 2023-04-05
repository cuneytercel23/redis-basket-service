router.get("/v10/baskets", async (req, res, next) => {
  const userId = req.userId;

  try {
    let basket = await getBasket(shopId, userId);
    let basketItems = null;
    let newBasketId = null;

    if (!basket) {
      newBasketId = newObjectId();
      basket = {
        id: newBasketId.toString(),
        userId: userId.toString(),
        status: "pending",
        totalBasketAmount: 0,
      };
      basketItems = null;

      await setBasket(userId, basket);
    } else {
      basketItems = await getBasketItems(basket.id);
    }
    if (!basketItems) {
      basketItems = [];
    }
    basket.basketItems = basketItems;
    res.status(200).send(basket);

    if (newBasketId) {
      // create basket in db
      const basketDb = new Basket({
        _id: newBasketId,
        userId: basket.userId,
        status: basket.status,
        totalBasketAmount: basket.totalBasketAmount,
      });
      await basketDb.save();
    }
  } catch (err) {
    return next(new HttpServerError(err));
  }
});

module.exports = router;

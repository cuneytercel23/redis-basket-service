router.get("/v10/baskets/approve", async (req, res, next) => {
    const userId = req.userId;
    let basketItems = null;
  
    try {
      const basket = await getBasket(userId);
      if (!basket) {
        return next(
          new NotFoundError(errMsg.basketNotFoundToApproveBasket, err)
        );
      } else {
        basketItems = await getBasketItems(basket.id);
      }
  
      if (!basketItems) {
        return next(
          new NotFoundError(errMsg.basketItemNotFoundToApproveBasket, err)
        );
      }
  
      basket.status = "approved";
  
      await delBasketAndItems(basket.id);
  
      res.status(200).send(basket);
  
      //save db
      await Basket.findByIdAndUpdate(basket.id, {
        $set: {
          status: basket.status,
        },
      });
    } catch (err) {
      return next(new HttpServerError(errMsg.dbErrorWhenGettingBaskets, err));
    }
  });
  
  module.exports = router;
  
const getBasketItemsKey = (basketId) => {
  return "basketItems:" + basketId;
};

const addItemIdToBasket = async (basketId, basketItemId) => {
  const key = getBasketItemsKey(basketId);

  return await redisClient.sAdd(key, basketItemId);
};

module.export = addItemIdToBasket;
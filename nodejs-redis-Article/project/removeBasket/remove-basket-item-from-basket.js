const getBasketItemsKey = (basketId) => {
  return "basketItems:" + basketId;
};

const removeItemIdFromBasket = async (basketId, basketItemId) => {
  const key = getBasketItemsKey(basketId);
  return await redisClient.sRem(key, basketItemId);
};

module.export = removeItemIdFromBasket;
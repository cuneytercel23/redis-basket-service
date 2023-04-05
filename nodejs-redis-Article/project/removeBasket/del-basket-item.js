const getBasketItemKey = (basketItemId) => {
  return "basketItem:" + basketItemId;
};

const delBasketItem = async (basketItemId) => {
  const key = getBasketItemKey(basketItemId);
  return await redisClient.del(key);
};

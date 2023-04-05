const getBasketKey = (basketId) => {
  return "basket:" + basketId;
}; //returns basket:123

const setBasketAmount = async (basketId, totalBasketAmount) => {
  const key = getBasketKey(basketId);
  return await redisClient.hSet(key, "totalBasketAmount", totalBasketAmount);
};

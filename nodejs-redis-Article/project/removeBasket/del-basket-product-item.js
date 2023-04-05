const getBasketProductsKey = (basketId) => {
  return "basketProducts:" + basketId;
};

const delBasketProductItem = async (basketId, productId) => {
  const key = getBasketProductsKey(basketId);
  return await redisClient.hDel(key, productId);
};

const getBasketKey = (basketId) => { 
  return "basket:" + basketId;
};  //returns basket:123


const getBasketFromRedis = async (basketId) => {
  const key = getBasketKey(basketId); //returns basket:123
  let basket = null;

  if (key) {
    basket = await redisClient.hGetAll(key);
    if (Object.keys(basket).length === 0) basket = null;
  }
  return basket;
};

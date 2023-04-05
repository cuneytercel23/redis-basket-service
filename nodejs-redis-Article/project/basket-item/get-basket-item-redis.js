const getBasketItemKey = (basketItemId) => {
    return "basketItem:" + basketItemId;
  };//return basketItem:123
  
  const getBasketItemFromRedis = async (basketItemId) => {
    const key = getBasketKey(basketItemId); //returns basket:123
    let basketItem = null;
  
    if (key) {
      basketItem = await redisClient.hGetAll(key);
      if (Object.keys(basketItem).length === 0) basketItem = null;
    }
    return basket;
  };
  
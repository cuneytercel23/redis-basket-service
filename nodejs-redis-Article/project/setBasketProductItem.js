const getBasketProductsKey = (basketId) => {
    return "basketProducts:" + basketId;
  };

const setBasketProductItem = async (basketId, productId, basketItemId) => {
    const key = getBasketProductsKey(basketId);
  
    return await redisClient.hSet(key, productId, basketItemId);
  };

  module.export = setBasketProductItem;
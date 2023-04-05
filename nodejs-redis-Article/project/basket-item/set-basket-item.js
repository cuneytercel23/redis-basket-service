const getBasketItemKey = (basketItemId) => {
    return "basketItem:" + basketItemId;
  };//return basketItem:123

const setHashObject = async (key, data) => {
  // returns object to array
  let hashValues = [];
  for (let oKey of Object.keys(data)) {
    //oKey = objectKey
    hashValues.push(oKey);
    hashValues.push(data[oKey]);
  }
  return await redisClient.hSet(key, hashValues);
}; 

const setBasketItem = async (basketItemId, basketItem) => {
  const key = getBasketItemKey(basketItemId); //basketItem:123

  return await setHashObject(key, basketItem);
};

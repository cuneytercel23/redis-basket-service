const getBasketKey = (basketId) => { 
    return "basket:" + basketId;
  };  //returns basket:123

const setHashObject = async (key, data) => { // returns object to array
  let hashValues = [];
  for (let oKey of Object.keys(data)) { //oKey = objectKey
    hashValues.push(oKey);
    hashValues.push(data[oKey]);
  }
  return await redisClient.hSet(key, hashValues);
}; // returns [userId:123,totalBasketAmount:100]


const setBasket = async (basketId, basket) => {
  const key = getBasketKey(basketId);
  return await setHashObject(key, basket);
};

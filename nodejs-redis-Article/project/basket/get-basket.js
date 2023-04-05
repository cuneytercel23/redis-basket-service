const getBasketFromDb = require("../db/path");
const getBasketFromRedis = require("../redis/path");
const setBasket = require("../redis/path");

const getBasket = async (userId) => {
  let basket = null;
  const basketData = await getBasketFromRedis(userId);
  if (basketData) basket = basketData;

  if (!basket) {
    basket = await getBasketFromDb(userId, shopId);

    if (basket) {
      await setBasket(userId, basket);
    } else {
      basket = null;
    }
  }

  return basket;
};

module.exports = getBasket;

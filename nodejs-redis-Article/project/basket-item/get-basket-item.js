const getBasketItemFromDb = require("../db/path");
const { getBasketFromRedis, newBasketItem } = require("../redis/path");

const getBasketItem = async (basketId, productId) => {
  let basketItem = null;
  const basketItemData = await getBasketFromRedis(basketId, productId);
  if (basketItemData) basketItem = basketItemData;

  if (!basketItem) {
    basketItem = await getBasketItemFromDb(basketId, productId);

    if (basketItem) {
      await newBasketItem(basketItem);
    } else {
      basketItem = null;
    }
  }

  return basketItem;
};

module.exports = getBasketItem;

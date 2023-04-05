const BasketItem = require("../model/basketItem");

const getBasketItemFromDb = async (basketId, productId) => {
  const basketItem = await BasketItem.findOne({ basketId, productId });
  return basketItem;
};

module.exports = getBasketItemFromDb;
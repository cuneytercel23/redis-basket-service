const BasketItem = require("../model/basketItem");

const getBasketItemsFromDb = async (basketId) => {
  const basketItem = await BasketItem.find({ basketId });
  return basketItem;
};

module.exports = getBasketItemsFromDb;

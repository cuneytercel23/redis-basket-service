const Basket = require("../model/basket"); //basket model

const getBasketFromDb = async (userId) => {
  const basket = await Basket.findOne({ userId, status: "pending" });
  return basket;
};

module.exports = getBasketFromDb;

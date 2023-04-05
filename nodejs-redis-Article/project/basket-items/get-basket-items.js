const getBasketItemsFromDb = require("../db/path..");
const { getBasketItems, newBasketItem } = require("../redis/path..");

const getBasketItemsFromBasket = async (basketId) => {
  let basketItems = null;
  const basketItemDatas = await getBasketItemsFromRedis(basketId);
  console.log(basketItemDatas);
  if (basketItemDatas) basketItems = basketItemDatas;

  if (!basketItems) {
    basketItems = await getBasketItemsFromDb(basketId);
    if (basketItems) {
      const commands = basketItems.map((basketItem) =>
        newBasketItem(basketItem)
      );
      await Promise.all(commands);
    } else {
      basketItems = null;
    }
  }

  return basketItems;
};

module.exports = getBasketItemsFromBasket;
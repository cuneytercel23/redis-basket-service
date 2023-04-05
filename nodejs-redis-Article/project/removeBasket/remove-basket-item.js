const removeItemIdFromBasket = require('/path')
const delBasketItem = require('/path')
const delBasketProductItem = require('/path')


const removeBasketItem = async (basketId, basketItemId, productId) => {
    await removeItemIdFromBasket(basketId, basketItemId); 
    await delBasketItem(basketItemId);
    await delBasketProductItem(basketId, productId);
  };

  module.export = removeBasketItem;
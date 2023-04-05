const setBasketProductItem = require('/path..')
const setBasketItem = require('/path..')
const setBasketProductItem = require('/path..')

const newBasketItem = async (basketItem) => {
    await setBasketProductItem(
      basketItem.basketId,
      basketItem.productId,
      basketItem.id
    );
    await addItemIdToBasket(basketItem.basketId, basketItem.id);
    await setBasketItem(basketItem.id, basketItem);
  };

module.exports =  newBasketItem;
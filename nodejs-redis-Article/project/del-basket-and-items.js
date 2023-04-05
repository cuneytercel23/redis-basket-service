const getBasketKey = (basketId) => {
  return "basket:" + basketId;
};
const getBasketItemsKey = (basketId) => {
  return "basketItems:" + basketId;
};
const getBasketItemKey = (basketItemId) => {
  return "basketItem:" + basketItemId;
};
const getBasketProductsKey = (basketId) => {
  return "basketProducts:" + basketId;
};

const delBasketAndItems = async (basketId) => {
  // delete basket hash Basket:{basketId}
  const key1 = getBasketKey(basketId);
  await redisClient.del(key1);

  // get basket item id list before delete
  const idList = await getBasketItemIds(basketId);

  // delete basket item id set BasketItems:{basketId}
  const key2 = getBasketItemsKey(basketId);
  await redisClient.del(key2);

  // delete basket item product hash BasketProducts:{basketId}
  const key3 = getBasketProductsKey(basketId);
  await redisClient.del(key3);

  // delete each basket item has as batch
  const commands = idList.map((itemid) => {
    const key = getBasketItemKey(itemid);
    // delete basket item BasketItem:{itemid}
    return redisClient.del(key);
  });
};

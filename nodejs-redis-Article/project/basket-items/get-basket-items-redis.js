const getBasketItemKey = (basketItemId) => {
  return "basketItem:" + basketItemId;
};

//getting basketItemIds in a basket
const getBasketItemsFromRedis = async (basketId) => {
  const idList = await getBasketItemIds(basketId);

  //getting all basketItems using ids
  const commands = idList.map((id) => {
    return redisClient.hGetAll(getBasketItemKey(id));
  });

  const results = await Promise.all(commands);

  return results.map((result) => {
    if (Object.keys(result).length === 0) {
      return null;
    }
    return result;
  });
};

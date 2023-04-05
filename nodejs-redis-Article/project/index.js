//HASHES

//hset
redisClient.hSet("users:123", {
  name: "Cüneyt",
  password: "159456",
});

//hgetall
redisClient.hGetAll("users:123")


//hget
redisClient.hGet("users:123", "name")

//hdel
redisClient.hDel("users:123", "name")

//del
redisClient.del("users:123")

//SETS

//sadd

redisClient.sAdd('colors', 'red')


//srem


redisClient.sRem('colors', 'red')


//smembers


redisClient.sMembers('colors')




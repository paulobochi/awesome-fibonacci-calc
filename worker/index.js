const config = require("./config");
const redis = require("redis");

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPortl,
  retry_strategy: () => 1000
});

const redisSubscriber = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

redisSubscriber.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
redisSubscriber.subscribe("insert");

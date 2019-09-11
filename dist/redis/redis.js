"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ioredis = _interopRequireDefault(require("ioredis"));

var _config = require("../config");

var redis = new _ioredis["default"](_config.redisConfig.port, _config.redisConfig.url);
redis.on('ready', function () {
  return console.log('------------> redis is on ready');
});
redis.on('end', function () {
  return console.log('------------> redis is on end');
});
redis.on('error', function (err) {
  return console.error(err);
});
redis.on('reconnecting', function () {
  return console.log('------------> redis is on reconnecting');
});
module.exports = redis;
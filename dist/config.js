"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.databaseDebug = exports.databaseUrl = exports.redisConfig = exports.port = void 0;
var port = 8080;
exports.port = port;
var redisConfig = {
  url: '127.0.0.1',
  port: 6379
};
exports.redisConfig = redisConfig;
var databaseUrl = "postgresql://navruzjn:malikasadiq510@localhost:5432/test";
exports.databaseUrl = databaseUrl;
var databaseDebug = false;
exports.databaseDebug = databaseDebug;
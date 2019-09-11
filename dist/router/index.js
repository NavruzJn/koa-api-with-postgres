"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _lessons = _interopRequireDefault(require("./lessons"));

function combineRoutes(routes) {
  if (!Array.isArray(routes)) routes = [].prototype.slice.call(arguments);
  var middleware = [];
  routes.forEach(function (router) {
    middleware.push(router.routes());
    if (router.allowedMethods) middleware.push(router.allowedMethods());
  });
  return (0, _koaCompose["default"])(middleware);
}

var routes = [_lessons["default"]];

var _default = function _default() {
  return combineRoutes(routes);
};

exports["default"] = _default;
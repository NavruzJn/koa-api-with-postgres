"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = createServer;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koa = _interopRequireDefault(require("koa"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaRespond = _interopRequireDefault(require("koa-respond"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _router = _interopRequireDefault(require("./router"));

function createServer() {
  return _createServer.apply(this, arguments);
}

function _createServer() {
  _createServer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var app, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = new _koa["default"]();
            app.use((0, _cors["default"])()).use((0, _koaStatic["default"])(process.cwd() + '/static')).use((0, _koaRespond["default"])()).use((0, _koaBody["default"])({
              multipart: true
            })).use((0, _router["default"])());
            app.on('error', function (e, ctx) {
              console.error(e.message);
              ctx.send(e.statusCode || 400, {
                error: e.message
              });
            });
            server = _http["default"].createServer(app.callback());
            console.log('Server created, ready to listen...');
            return _context.abrupt("return", server);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createServer.apply(this, arguments);
}
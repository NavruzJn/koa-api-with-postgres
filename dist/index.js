"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _app = require("./app");

var _config = require("./config");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _app.createServer)();

          case 3:
            _context.t0 = _config.port;
            server = _context.sent.listen(_context.t0);
            console.log("Server listening on ".concat(server.address().port));
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t1 = _context["catch"](0);
            console.error(_context.t1.message);
            process.exit(1);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _main.apply(this, arguments);
}

if (!module.parent) {
  main();
}
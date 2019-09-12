"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _Lesson = _interopRequireDefault(require("../controllers/Lesson"));

var router = new _koaRouter["default"]();
router.prefix("/api/lessons").get("/",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Lesson["default"].getLessons(ctx.query);

          case 3:
            ctx.response.body = _context.sent;
            _context.next = 11;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log("error", _context.t0);
            ctx.status = 402;
            ctx.body = "Lesson not found";

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).post("/",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Lesson["default"].createLessons(ctx.request.body);

          case 3:
            ctx.response.body = _context2.sent;
            _context2.next = 11;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log("error", _context2.t0);
            ctx.status = 402;
            ctx.body = "Lesson not found";

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;
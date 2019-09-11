"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _createLesson = _interopRequireDefault(require("../sql/lesson/create-lesson"));

var _readLesson = require("../sql/lesson/read-lesson");

var Lesson =
/*#__PURE__*/
function () {
  function Lesson() {
    (0, _classCallCheck2["default"])(this, Lesson);
  }

  (0, _createClass2["default"])(Lesson, null, [{
    key: "createLessons",
    value: function () {
      var _createLessons = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(lessonsData) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _createLesson["default"])();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createLessons(_x) {
        return _createLessons.apply(this, arguments);
      }

      return createLessons;
    }()
  }, {
    key: "getLessons",
    value: function () {
      var _getLessons2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(options) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _readLesson.getLessons)(options);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getLessons(_x2) {
        return _getLessons2.apply(this, arguments);
      }

      return getLessons;
    }()
  }]);
  return Lesson;
}();

module.exports = Lesson;
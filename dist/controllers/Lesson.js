"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _createLesson = _interopRequireDefault(require("../sql/lesson/create-lesson"));

var _createLessonTeacher = _interopRequireDefault(require("../sql/lesson/create-lesson-teacher"));

var _readLesson = require("../sql/lesson/read-lesson");

var _getDates = require("../utils/getDates");

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
      _regenerator["default"].mark(function _callee4(lessonsData) {
        var teacherIds, title, days, firstDate, lessonsCount, lastDate, dates, lessonIds;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                teacherIds = lessonsData.teacherIds, title = lessonsData.title, days = lessonsData.days, firstDate = lessonsData.firstDate, lessonsCount = lessonsData.lessonsCount, lastDate = lessonsData.lastDate;
                _context4.next = 3;
                return (0, _getDates.getDates)(days, firstDate, lastDate, lessonsCount);

              case 3:
                dates = _context4.sent;
                _context4.t0 = Promise;
                _context4.next = 7;
                return dates.forEach(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(date) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return (0, _createLesson["default"])({
                              title: title,
                              date: date,
                              status: 0
                            });

                          case 2:
                            return _context.abrupt("return", _context.sent);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 7:
                _context4.t1 = _context4.sent;
                _context4.next = 10;
                return _context4.t0.all.call(_context4.t0, _context4.t1);

              case 10:
                lessonIds = _context4.sent;
                return _context4.abrupt("return", teacherIds.forEach(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(teacher_id) {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.t0 = Promise;
                            _context3.next = 3;
                            return lessonIds.forEach(
                            /*#__PURE__*/
                            function () {
                              var _ref3 = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee2(lesson_id) {
                                return _regenerator["default"].wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        _context2.next = 2;
                                        return (0, _createLessonTeacher["default"])({
                                          teacher_id: teacher_id,
                                          lesson_id: lesson_id
                                        });

                                      case 2:
                                        return _context2.abrupt("return", _context2.sent);

                                      case 3:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2);
                              }));

                              return function (_x4) {
                                return _ref3.apply(this, arguments);
                              };
                            }());

                          case 3:
                            _context3.t1 = _context3.sent;
                            _context3.next = 6;
                            return _context3.t0.all.call(_context3.t0, _context3.t1);

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
      _regenerator["default"].mark(function _callee5(options) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _readLesson.getLessons)(options);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getLessons(_x5) {
        return _getLessons2.apply(this, arguments);
      }

      return getLessons;
    }()
  }]);
  return Lesson;
}();

module.exports = Lesson;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLessons = getLessons;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var filterFields = ["date", "status", "teacherIds", "studentsCount", "page", "lessonsPerPage"];

function nest(_x) {
  return _nest.apply(this, arguments);
}

function _nest() {
  _nest = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(lessons) {
    var groupedLessons;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            groupedLessons = [];
            lessons.forEach(function (lesson) {
              var reducer = false;
              var id = lesson.id,
                  date = lesson.date,
                  title = lesson.title,
                  status = lesson.status,
                  rest = (0, _objectWithoutProperties2["default"])(lesson, ["id", "date", "title", "status"]);
              var student = {
                id: lesson.s_id,
                name: lesson.s_name,
                visit: lesson.visit
              };
              var teacher = {
                id: lesson.t_id,
                name: lesson.t_name
              };
              groupedLessons.forEach(function (l) {
                if (lesson.id === l.id) {
                  if (!l.students.indexOf(student) < 0) {
                    l.students.push(student);
                  }

                  if (!l.teachers.indexOf(teacher) < 0) {
                    l.teachers.push(teacher);
                  }

                  reducer = true;
                }
              });

              if (!reducer) {
                var l = {
                  id: id,
                  date: date,
                  title: title,
                  status: status
                };
                l.students = [];
                l.teachers = [];
                l.students.push(student);
                l.teachers.push(teacher);
                groupedLessons.push(l);
              }
            });
            return _context.abrupt("return", groupedLessons);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _nest.apply(this, arguments);
}

function getLessons(options) {
  var query = {};
  filterFields.forEach(function (field) {
    if (field in options) {
      var values = options[field].split(",");

      if (values.length > 1) {
        query[field] = "IN (" + options[field] + ")";
      } else {
        query[field] = options[field];
      }
    }
  });
  return (0, _db["default"])('lessons').where(query).leftJoin((0, _db["default"])('lesson_teachers').select("lesson_id", "t_id", "t_name").leftJoin((0, _db["default"])('teachers').select("id as t_id", "name as t_name").as("teachers"), "lesson_teachers.teacher_id", "teachers.t_id").as("lesson_teachers"), "lessons.id", 'lesson_teachers.lesson_id').leftJoin((0, _db["default"])('lesson_students').select("lesson_id", "s_id", "s_name", "visit").leftJoin((0, _db["default"])('students').select("id as s_id", "name as s_name").as("students"), "lesson_students.student_id", "students.s_id").as("lesson_students"), "lessons.id", "lesson_students.lesson_id").orderBy('lessons.id').then(function (lessons) {
    return lessons && nest(lessons);
  });
}
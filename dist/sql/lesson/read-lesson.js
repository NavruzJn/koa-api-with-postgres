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

var filterFields = {
  date: "date",
  status: "status",
  teacherIds: "teacherIds",
  students: "studentsCount",
  page: "page",
  lessonsPerPage: "lessonsPerPage"
};

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
            _context.next = 3;
            return lessons.data.forEach(function (lesson) {
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
                  if (!l.students.find(function (s) {
                    return s.id === student.id;
                  })) {
                    l.students.push(student);
                    l.visitCount++;
                  }

                  if (!l.teachers.find(function (t) {
                    return t.id === teacher.id;
                  })) l.teachers.push(teacher);
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
                l.visitCount = student.visit ? 1 : 0;
                l.students = [student];
                l.teachers = [student];
                groupedLessons.push(l);
              }
            });

          case 3:
            lessons.data = groupedLessons;
            return _context.abrupt("return", lessons);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _nest.apply(this, arguments);
}

function getLessons(options) {
  var query = '';
  var perPage = options[filterFields.lessonsPerPage] || 10;
  var page = options[filterFields.page] || 1;
  Object.keys(options).forEach(function (key) {
    var values = options[key].split(",");

    switch (key) {
      case filterFields.date:
        values.map(function (v) {
          return new Date(v);
        });

        if (value.length > 0) {
          query += "date IN (".concat(values, ")");
        } else {
          query += " date = ".concat(values[0]);
        }

        break;

      case filterFields.status:
        query += " status = ".concat(parseInt(values[0], 10));
        break;

      case filterFields.teacherIds:
        values.map(function (v) {
          return parseInt(v, 10);
        });
        query += " t_id IN (".concat(values, ")");
        break;

      case filterFields.students:
        values.map(function (v) {
          return parseInt(v, 10);
        });
        query = " s_id IN (".concat(values, ")");
        break;

      default:
        break;
    }
  });
  return (0, _db["default"])('lessons').whereRaw(query).leftJoin((0, _db["default"])('lesson_teachers').select("lesson_id", "t_id", "t_name").leftJoin((0, _db["default"])('teachers').select("id as t_id", "name as t_name").as("teachers"), "lesson_teachers.teacher_id", "teachers.t_id").as("lesson_teachers"), "lessons.id", 'lesson_teachers.lesson_id').leftJoin((0, _db["default"])('lesson_students').select("lesson_id", "s_id", "s_name", "visit").leftJoin((0, _db["default"])('students').select("id as s_id", "name as s_name").as("students"), "lesson_students.student_id", "students.s_id").as("lesson_students"), "lessons.id", "lesson_students.lesson_id").paginate(perPage, page).then(function (lessons) {
    return lessons && nest(lessons);
  });
}
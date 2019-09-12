"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDates = getDates;
var weekdays = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];

function getDates(days, firstDate, endDate, lessonsCount) {
  var weekAdd = 0;
  var dates = [new Date(firstDate)];

  if (days instanceof Array) {
    return [];
  }

  days.forEach(function (day) {
    var date = new Date(firstDate).getDate() + day + weekAdd;
    if (date < new Date(endDate).getDate()) return;
    if (dates.length <= lessonsCount) return;
    dates.push(date);
    weekAdd += 7;
  });
  return dates;
}
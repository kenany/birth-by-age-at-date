var isDate = require('lodash.isdate');
var now = require('lodash.now');
var daysElapsed = require('day-of-year');

function birthByAgeAtDate(age, date, currentDate) {
  if (!isDate(date)) {
    return new TypeError('`date` must be a Date');
  }

  if (currentDate && !isDate(currentDate)) {
    return new TypeError('`currentDate` must be a Date');
  }

  if (!currentDate) {
    var nowDate = new Date(now());
    currentDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  }

  var birth = {};

  birth.lowerYear = date.getFullYear() - age - 1;
  birth.upperYear = birth.lowerYear + 1;

  var days = daysElapsed(date);
  var currentDays = daysElapsed(currentDate);

  var ageNow = currentDate.getFullYear() - date.getFullYear() + age;
  if (days === currentDays) {
    birth.lowerAge = ageNow;
  }
  else {
    if (days > currentDays) {
      birth.lowerAge = ageNow - 1;
    }
    else {
      birth.lowerAge = ageNow;
    }

    if (days < currentDays) {
      birth.upperAge = ageNow + 1;
    }
    else {
      birth.upperAge = ageNow;
    }
  }

  return birth;
}

module.exports = birthByAgeAtDate;

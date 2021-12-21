var isDate = require('lodash.isdate');
var daysElapsed = require('day-of-year');

/**
 * @param {number} age
 * @param {Date} date
 * @param {Date} [currentDate]
 */
function birthByAgeAtDate(age, date, currentDate) {
  if (!isDate(date)) {
    throw new TypeError('`date` must be a Date');
  }

  if (currentDate && !isDate(currentDate)) {
    throw new TypeError('`currentDate` must be a Date');
  }

  if (!currentDate) {
    currentDate = new Date();
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

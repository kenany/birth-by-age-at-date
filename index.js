const isDate = require('lodash.isdate');
const daysElapsed = require('day-of-year');

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

  const birth = {};

  birth.lowerYear = date.getFullYear() - age - 1;
  birth.upperYear = birth.lowerYear + 1;

  const days = daysElapsed(date);
  const currentDays = daysElapsed(currentDate);

  const ageNow = currentDate.getFullYear() - date.getFullYear() + age;
  if (days === currentDays) {
    birth.lowerAge = ageNow;
  } else {
    if (days > currentDays) {
      birth.lowerAge = ageNow - 1;
    } else {
      birth.lowerAge = ageNow;
    }

    if (days < currentDays) {
      birth.upperAge = ageNow + 1;
    } else {
      birth.upperAge = ageNow;
    }
  }

  return birth;
}

module.exports = birthByAgeAtDate;

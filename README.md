# birth-by-age-at-date

[![Build Status](https://travis-ci.org/KenanY/birth-by-age-at-date.svg?branch=master)](https://travis-ci.org/KenanY/birth-by-age-at-date)
[![Dependency Status](https://gemnasium.com/KenanY/birth-by-age-at-date.svg)](https://gemnasium.com/KenanY/birth-by-age-at-date)

Calculates the birth year and current age based on the age as of a date. Based
off, believe it or not, Wikipedia's
[Template:Birth_based_on_age_as_of_date](https://en.wikipedia.org/wiki/Template:Birth_based_on_age_as_of_date).

## Example

You know someone who was 50 years old on January 15, 2013. You would like to
know what their birth year might be and/or their current age:

``` javascript
var birthByAgeAtDate = require('birth-by-age-at-date');

birthByAgeAtDate(50, new Date(2013, 0, 15));
// => {
// =>   lowerYear: 1962,
// =>   upperYear: 1963,
// =>   lowerAge: 50,
// =>   upperAge: 51
// => }
```

## Installation

``` bash
$ npm install birth-by-age-at-date
```

## API

``` javascript
var birthByAgeAtDate = require('birth-by-age-at-date');
```

### birthByAgeAtDate(age, date[, currentDate])

Calculates the birth year and current age based on the knowledge that the
individual was _Number_ `age` at _Date_ `date`. Returns an `Object`:

  - `.lowerYear`
  - `.upperYear`
  - `.lowerAge`
  - `.upperAge` (may be `undefined`)

There will always be two possible birth years: `.lowerYear` and `.upperYear`.
`.upperAge` will _not_ appear if the number of days elasped in `date`'s year is
equal to the number of days elasped in `currentDate`'s year.

By default, `new Date().getTime()` is used to calculate current age. You can
optionally pass your own `currentDate` as a third argument.
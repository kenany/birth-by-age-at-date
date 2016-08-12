var birth = require('../');
var test = require('tape');

var now = new Date(2014, 3, 17);

test('returns TypeError when date is not a Date', function(t) {
  t.plan(5);
  t.ok(birth(50) instanceof TypeError);
  t.ok(birth(50, {}) instanceof TypeError);
  t.ok(birth(50, '2013-03-17') instanceof TypeError);
  t.ok(birth(50, [2013, 3, 17]) instanceof TypeError);
  t.ok(birth(50, 2013) instanceof TypeError);
});

test('returns TypeError when currentDate is not a Date', function(t) {
  t.plan(4);
  t.ok(birth(50, new Date(2013, 2, 17), {}) instanceof TypeError);
  t.ok(birth(50, new Date(2013, 2, 17), '2013-03-17') instanceof TypeError);
  t.ok(birth(50, new Date(2013, 2, 17), [2013, 3, 17]) instanceof TypeError);
  t.ok(birth(50, new Date(2013, 2, 17), 2013, 3, 17) instanceof TypeError);
});

test('works', function(t) {
  var TEST_ARRAY = [
    [[50, new Date(2013, 3, 17), now], {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 51
    }],
    [[50, new Date(2013, 0, 15), now], {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 51,
      upperAge: 52
    }],
    [[50, new Date(2013, 10, 5), now], {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 50,
      upperAge: 51
    }]
  ];

  t.plan(TEST_ARRAY.length);

  TEST_ARRAY.forEach(function(entry) {
    t.deepEquals(birth(entry[0][0], entry[0][1], entry[0][2]), entry[1]);
  });
});

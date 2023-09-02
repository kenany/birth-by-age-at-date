const test = require('tape');
const birth = require('../');

const now = new Date(2014, 3, 17);

/**
 * @param {Error} error
 * @returns {error is TypeError}
 */
function isTypeError(error) {
  return error instanceof TypeError;
}

test('throws TypeError when date is not a Date', function(t) {
  t.plan(5);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, {}), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, '2013-03-17'), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, [2013, 3, 17]), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, 2013), isTypeError);
});

test('returns TypeError when currentDate is not a Date', function(t) {
  t.plan(4);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, new Date(2013, 2, 17), {}), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, new Date(2013, 2, 17), '2013-03-17'), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, new Date(2013, 2, 17), [2013, 3, 17]), isTypeError);

  // @ts-expect-error Testing runtime assertions.
  t.throws(() => birth(50, new Date(2013, 2, 17), 2013, 3, 17), isTypeError);
});

test('works', function(t) {
  t.plan(3);

  t.deepEquals(
    birth(50, new Date(2013, 3, 17), now),
    {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 51
    }
  );

  t.deepEquals(
    birth(50, new Date(2013, 0, 15), now),
    {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 51,
      upperAge: 52
    }
  );

  t.deepEquals(
    birth(50, new Date(2013, 10, 5), now),
    {
      lowerYear: 1962,
      upperYear: 1963,
      lowerAge: 50,
      upperAge: 51
    }
  );
});

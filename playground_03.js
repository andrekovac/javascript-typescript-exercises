/* eslint-disable */
// --------------
// Extra material
// --------------

// !--------------------------------------------------
// ! Logical operators in JavaScript
// !--------------------------------------------------

// ! Deep dive into &&, || and ??
// ! ----------------------------

const myBool = true;

const conditionalObject = myBool && {
  a: 1,
  b: 2,
};

const what = {
  ...conditionalObject,
};

console.log(typeof conditionalObject);

// ? 🐆 [Task]:
// ?            1. Switch the `myBool` value from true to false and observe the result of the console.log statement
// ?            2. Change the logical AND operator `&&` to the logical OR operator `||` and then to nullish coalescing operator `??`

// ? 🐒 [Question]: Which results do you observe? Can you explain them?
// Your answer:
//
//
//

// Links
// -----
// &&: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
// ||:
// ??: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

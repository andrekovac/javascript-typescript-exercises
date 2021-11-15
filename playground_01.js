// !-----------------------
// ! Object property access
// !-----------------------

// ? 🐒 [Questions]: Answer the following questions:
// ?
// ? 1. What are the three different ways in JS to access object properties?
// Your answer:
//
//
//
//
// ? 2. When using the `dot property accessor` the property has to be an `identifier`.
// ?    Use https://developer.mozilla.org/en-US/docs/Glossary/Identifier to explain what an idenifier is.
// Your answer:
//
//
//

// -----------------------------------------------------------------------------

// !---------------
// ! var, let, const
// !---------------

// ! Sopce (var)

var newWord = "hello"
const testScope = () => {
  newWord = "goodbye";
};
console.log(newWord);

// ! Scope (const)
if (true) {
  const word = "hello";
  word;
}

word; // undefined

// ! Scope (var)
if (1 == 1) {
  var word = "hello";
}
word; // "hello"

// ? 🐒 [Question]: Explain the different results for `var` and `const`
// Your answer:
//
//

// ! Re-assignment (const)

const mySum = (one, two, three) => {
  return one + two + three;
};

const returnValue = {};
returnValue.sds = mySum(2,6,1); // assignment
console.log(returnValue.sds);

// ? 🐒 [Question]: Why is this assignment to property of a `const` possible?
// Your answer:
//
//

// -----------------------------------------------------------------------------

// !-------------------------------
// ! Array destructuring and spread
// !-------------------------------

// ! Array spread
// !-------------

const coordinates = [39, 21]; // lat, lng

// Extract second argument only
const [, lng] = coordinates; // equivalent to: `const lng = coordinates[1];`

// ! Spread function arguments
// !--------------------------

const values = [1, 2, 3];
// Elegant solution with spread operator:
const result = mySum(...values);
// Verbose solution without spread operator:
// const result = mySum(values[0], values[1], values[2]);

console.log(result);

// ! Array destructuring (nested)
// !----------------------

const myArray = [1, [2, 3]];
const [, [, third]] = myArray;
console.log(third);

// -----------------------------------------------------------------------------

// !---------------------------------------------------------------------
// ! nullish coalescing operator (??) and optional chaining operator (?.)
// !---------------------------------------------------------------------

// This example caused issue with Quokka. Please try in browser console:

//let greeting = { say: "hi" };
// console.log(greeting.say?.toUpperCase() ?? "not available"); // "HI"
// console.log(greeting.dontSay?.toUpperCase() ?? "not available"); // "not available"

// ? 🐒 [Question]: Explain this interplay of nullish coalescing operator (??) and optional chaining operator (?.)
// Your answer:
//
//

// -----------------------------------------------------------------------------

// !---------------
// ! Type Coercion
// !---------------

// ? 🐆 [Task]: Guess the result of each line first and then uncomment the `console.log` statement:

const one = true + false;
console.log(one);

const two = 1 + 2 + " hello world" + 5 + 3 + 43;
console.log(two);

const three = 1 + true;
console.log(three);

const four = "hello" + true;
console.log(four);

const five = {} + {};
console.log(five);

const six = {} === {};
console.log(six);

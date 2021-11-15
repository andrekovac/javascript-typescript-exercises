// !--------------------------------------------------
// ! Passing variables in JavaScript + Spread operator
// !--------------------------------------------------

// ! Simple Example

const numbers = {
  one: 1,
  two: 2,
  three: 3,
};
const b = { ...numbers, four: 4 };
console.log(b);

// ! 🍝 [Copy object via spread operator]
// !-------------------------------------

// 1. Let's define an object
const myObject = {
  foo: ['a', 'b', 'c'],
  baz: 3,
  bar: {  a: 1, b: 2 },
  qux: "one"
};

// 2. Now we create two "copies":
// A: Simple copy
const myObjectCopied = myObject;
// B: Copy via spread operator
const myObjectCopiedSpread = { ...myObject };


// ? 🐆 [Task]: For each of the below mutations of `myObject`,
// ?            write whether it changes one or several of the other objects:
// You can use 1️⃣ for `myObject`
// You can use 2️⃣ for `myObjectCopied`
// You can use 3️⃣ for `myObjectCopiedSpread`

myObject.foo[2] = 6;  // Which objects change?
myObject.baz = 6;     // Which objects change?
myObject.bar.b = 6;   // Which objects change?
myObject.qux = "two"  // Which objects change?
myObject.quux = "?"   // Which objects change?

// ? 🐒 [Question]: Explain your decisions
// Your answer:
//
//
//

// ? Uncomment the next two lines to check whether your choices are correct:
// console.log(myObjectCopiedSpread);
// console.log(myObjectCopied)

// ! Referential Equality?
// !----------------------

const objectCopy1 = myObjectCopied === myObject // true
const objectCopy2 = myObjectCopiedSpread === myObject // false

// ? 🐒 [Question]: Explain the result of these two boolean values
// Your answer:
//
//

// ! Spread vs. no-spread in reduce function
// !----------------------------------------

const data = [
  { id: 1, name: "Ahmed" },
  { id: 2, name: "Zhang" },
  { id: 3, name: "Sophie" },
];

/**
 * Function to transform an array into an object.
 * This decreases access to array elements by id from O(n) to O(1).
 * O(1) is equivalent to a direct access in only one calculation step.
 *
 * Example: This array
 *
 * [
 *   { id: 1, name: "Ahmed" },
 *   { id: 2, name: "Zhang" },
 *   { id: 3, name: "Sophie" },
 * ];
 *
 * gets transformed to this object:
 *
 * {
 *   1: { id: 1, name: 'Ahmed' },
 *   2: { id: 2, name: 'Zhang' },
 *   3: { id: 3, name: 'Sophie' },
 * };
 */
const normalize = data.reduce((accumulator, currentValue) => {
  // add new value with key `id`
  accumulator[currentValue.id] = currentValue;
  return accumulator;
}, {});

const normalizeSpread = data.reduce((accumulator, currentValue) => {
  // add new value (copied with spread operator) with key `id`
  accumulator[currentValue.id] = { ...currentValue };
  return accumulator;
}, {});

// Change name of first entry in `data` array
data[0].name = "Franz";

console.log(normalize); // 'Franz' instead of 'Ahmed'
console.log(normalizeSpread); // 'Ahmed' remains (no 'Franz')

// ? 🐒 [Question]: Explain the different results
// Your answer:
//
//


// -----------------------------------------------------------------------------

// !---------------
// ! Promises
// !---------------

// ! Callback based request:

const httpRequest = (url, callback) => setTimeout(() => {
  callback({ data: [], status: 200, url });
}, 1000)

const performAction = (value, action) => action(value);
const makeRequest = url => httpRequest(url, response => {
  performAction(response, result => {
    console.log(`Status: ${result.status}`);
  })
});

makeRequest('http://localhost:3000');


// ! Promise-based request with async/await:

const httpRequestWithPromise = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ data: [], status: 200, url });
  }, 1000)
})

// ? 🐆 [Task]: Write an async/await function `makeRequestAsyncAwait` which
// ?            calls `httpRequestWithPromise` and `console.log`s `response.status` as above.

// ! Uncoment this line after you implemented `makeRequestAsyncAwait`
// makeRequestAsyncAwait('http://localhost:3000');

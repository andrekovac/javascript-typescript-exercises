/* eslint-disable */
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
  foo: ["a", "b", "c"],
  baz: 3,
  bar: { a: 1, b: 2 },
  qux: "one",
};

// 2. Now we create three "copies":
// A: Simple copy
const myObjectCopied = myObject;
// B: Copy via spread operator
const myObjectCopiedSpread = { ...myObject };
// C: Copy via nested spread operators
const myObjectCopiedSpreadDeep = {
  ...myObject,
  foo: [...myObject.foo],
  bar: { ...myObject.bar },
};

// ? 🐆 [Task]: For each of the below mutations of `myObject`,
// ?            write whether it changes one or several of the other objects:
// You can use 1️⃣ for `myObject`
// You can use 2️⃣ for `myObjectCopied`
// You can use 3️⃣ for `myObjectCopiedSpread`
// You can use 4️⃣ for `myObjectCopiedSpreadDeep`

myObject.foo[2] = 6; // Which objects change?
myObject.baz = 6; // Which objects change?
myObject.bar.b = 6; // Which objects change?
myObject.qux = "two"; // Which objects change?
myObject.quux = "?"; // Which objects change?

// ? 🐒 [Question]: Explain your decisions
// Your answer:
//
//
//

// ? Uncomment the next three lines to check whether your choices are correct:
// console.log(myObjectCopiedSpread);
// console.log(myObjectCopiedSpreadDeep);
// console.log(myObjectCopied)

// ! Referential Equality?
// !----------------------

const objectCopy1 = myObjectCopied === myObject; // true
const objectCopy2 = myObjectCopiedSpread === myObject; // false

// ? 🐒 [Question]: Explain the result of these two boolean values
// Your answer:
//
//

// ! Deep copies in vanilla JS?
// New global method: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
// Not well supported yet. Will be supported by browsers soon.
// For now: Use https://ramdajs.com/docs/#clone or https://lodash.com/docs/#cloneDeep
// !---------------------------

// ! Spread vs. no-spread in reduce function
// !----------------------------------------

// Example of `reduce` function: Sum of integers

const sum = [0, 1, 2, 3, 4].reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
// ? Steps of `reduce` function call:
// accumulator: 0, currentValue: 0,
// accumulator: 0, currentValue: 1
// accumulator: 1, currentValue: 2
// accumulator: 3, currentValue: 3
// accumulator: 6, currentValue: 4
// return 10

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

// ? Steps of `reduce` function call:
// accumulator: {}, currentValue: {}
// accumulator: { 1: { id: 1, name: 'Ahmed' } }, currentValue: { id: 1, name: 'Ahmed' }
// accumulator: { 1: { id: 1, name: 'Ahmed' }, 2: { id: 2, name: 'Zhang' } }, currentValue: { id: 2, name: 'Zhang' }
// ...

// ---
// Note: `find` has complexity of O(n)
const user = data.find((name) => name.id == 3);
// ---

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

// !----------------------------
// ! Async behavior and Promises
// !----------------------------

// ! 1) Callback based request function
// ! -------------------------------

const httpRequest = (url, callback) =>
  // setTimeout fakes a delay of an API request
  setTimeout(() => {
    if (!url) {
      callback({ status: 400 });
    } else {
      callback({ data: [], status: 200, url });
    }
  }, 1000);

const performAction = (value, action) => action(value);

// ! Make request via callback function
const makeRequest = (url) =>
  httpRequest(url, (response) => {
    performAction(response, (result) => {
      console.log(`Status: ${result.status}`);
    });
  });

// successful request
makeRequest("http://localhost:3000"); // logs `Status: 200`
// failed request
makeRequest(); // logs `Status: 400`

// ! 2) Promise-based request function
// ! ------------------------------

const httpRequestWithPromise = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url) {
        reject({ status: 400 });
      } else {
        resolve({ data: [], status: 200, url });
      }
    }, 1000);
  });

// ! Make request via Promise chain
const makeRequestPromiseChain = (url) => {
  httpRequestWithPromise(url)
    .then(
      // handle resolved Promise
      (result) => {
        console.log(result.status);
      },
      // handle rejected Promise
      (rejectedResult) => {
        console.log(rejectedResult.status);
      }
    )
    .catch((errorOrRejectedPromise) => {
      // handle error or rejected Promise
      console.log(errorOrRejectedPromise.status);
    });
};

// no url -> Promise gets rejected
makeRequestPromiseChain();

// ? 🐆 [Task]: Currently the rejected promise is handled inside the
// ?            second callback function of the `.then` call.
// ?
// ?            Your task: Change the `makeRequestPromiseChain` function above
// ?            such that the `catch` block handles the rejected Promise instead
// ?            of the second argument of the `.then` call.

// ! 3) async/await based request function
// ! ----------------------------------

// ? 🐆 [Task]: Complete the async/await function `makeRequestAsyncAwait`
// ?            which calls `httpRequestWithPromise` and `console.log`s
// ?            the status of the response as above.

const makeRequestAsyncAwait = async (url) => {
  try {
    // Add code here to log the status
  } catch (error) {
    // Add code here to log the status
  }
};

// passed url causes resolved Promise
makeRequestAsyncAwait("http://localhost:3000");

// no passed url causes rejected Promise
makeRequestAsyncAwait();

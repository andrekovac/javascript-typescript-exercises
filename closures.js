// --------------------------
// Closures (primitive types)
// --------------------------

function outerFunction1(frozenNumber) {
  function innerFunction1(variableNumber) {
    // Question: Which output will be logged?
    console.log(variableNumber + frozenNumber)
  }
  return innerFunction1
}

// freeze the number 42
let myNumber = 42;

const myClosure1 = outerFunction1(myNumber) // which ugly number do you want to freeze?

// Mutate number
myNumber = 5;

myClosure1(4) // Which output will be logged when calling this function?


// ----------------------------
// Closures (complext objects)
// ----------------------------

function outerFunction2(frozenObject) {
  function innerFunction2(variableObject) {
    // Question: Which output will be logged?
    console.log(variableObject.count + frozenObject.count)
  }
  return innerFunction2
}

const input = { count: 3 };
// freeze object
const myClosure2 = outerFunction2(input);
// mutate count
input.count = 6;
// call closure
myClosure2({ count: 5 }); // Which output will be logged when calling this function?

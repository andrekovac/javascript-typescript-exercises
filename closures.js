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

const input2 = { count: 3 };
// freeze object
const myClosure2 = outerFunction2(input2);
// mutate count
input2.count = 7;
// call closure
myClosure2({ count: 5 }); // Which output will be logged when calling this function?

// -----------------------------
// Closures (complext objects 2)
// -----------------------------

function outerFunction3(frozenObject) {
  
  const frozenObjectCount = frozenObject.count;

  function innerFunction3(variableObject) {
    // Question: Which output will be logged?
    console.log(variableObject.count + frozenObjectCount)
  }
  return innerFunction3
}

const input3 = { count: 3 };
// freeze object
const myClosure3 = outerFunction3(input3);
// mutate count
input3.count = 7;
// call closure
myClosure3({ count: 5 }); // Which output will be logged when calling this function?

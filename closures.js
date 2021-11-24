// --------
// Closures
// --------

function outerFunction(frozenNumber) {
  function innerFunction(variableNumber) {
    // Question: Which output will be logged?
    console.log(variableNumber + frozenNumber)
  }
  return innerFunction
}

// freeze the number 42
const myClosure = outerFunction(42) // which ugly number do you want to freeze?

// use the convenience food:
myClosure(4)  // Which output will be logged when calling this function?
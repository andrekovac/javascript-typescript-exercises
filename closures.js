// --------
// Closures
// --------

function outerFunction(frozenNumber) {
  function innerFunction(variableNumber) {
    console.log(variableNumber + frozenNumber)
  }
  return innerFunction
}

// freeze the number 13
const myClosure = outerFunction(13) // which ugly number do you want to freeze? -> number gets trapped.

// use the convenience food:
myClosure(4)  // Console.log result: 13 + 4 = 17
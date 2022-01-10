// !---------------
// ! Type Coercion in TypeScript
// !---------------
var one = true + false;
var two = 1 + "hello world" + 4;
var three = 1 + true;
var four = "hello" + true;
// !---------------
// ! Type Inference
// !---------------
// type inferred
var myName = "John";
myName = 8; // type error!
// ! Function types
// infers '5 | undefined' return type
var myFct2 = function () { return Math.random() > 0.5 ? 5 : undefined; };
// infers 'void' return type
var myFct3 = function () { console.log("Hello, world!"); };
// inferred return type
var myFct4 = function (name, surname) {
    return name + surname;
};
var resultOfMyFct2 = myFct2();
// !-----------------
// ! Types vs. Values
// !-----------------
// ! type 'undefined' vs. value 'undefined'
var age2 = 4;
age2 = undefined;
var readingMaterial = [
    {
        title: 'New Covid-19 vaccine',
        isbn: '978-3401002569',
        price: 9
    },
    {
        title: 'Robinson Crusoe',
        issn: '21212-212'
    }
];
var books = [
    {
        isbn: "sadasfd",
        title: "ein buch"
    },
    {
        isbn: "sadasfd",
        title: "ein zweites buch"
    },
];
var books2 = [
    {
        isbn: "sadasfd",
        title: "ein buch",
        nochwas: "ein buch"
    },
    {
        isbn: "sadasfd",
        title: "ein zweites buch",
        nochwas: "ein zweites buch"
    },
];
books = books2;
var MyTesla = {
    wheels: 4,
    engine: "electric",
    cameras: 20
};
// Alternative: Intersection with Record.
// !----------------------------
// ! Function (parameter values)
// !----------------------------
var myFunction4 = function (a, b) { return a + b; };
function buildName(firstName, lastName) {
    if (lastName !== undefined) {
        return firstName + " " + lastName;
    }
    else {
        return firstName;
    }
}
function buildName2(firstName, lastName) {
    // TS does not complain. Returns undefined.
    return lastName;
}
console.log(buildName2('Andre'));
// !-------------------
// ! Strict null checks
// !-------------------
var firstName = undefined; // not possible in strict mode 
function myFunction3(hello) {
    if (hello) {
        return hello;
    }
    return "";
}
// let firstName: string | undefined | null = null;
var age = undefined;
var isEmployed; // undefined
// Array of strings
var list = ["foo", "bar"];
// ReadonlyArray of numbers
var secondList;
list[0] = 5; // Error
// !--------------------------------
// ! Functions - Optional parameters
// !--------------------------------
var myFunction = function (input) { return 4; };
function myFunction2(hello) {
    return hello;
}
var myFunction2 = function (arg) { return 4; };
myFunction2(null);
var myArray2 = [1.2, 222.1, 3444];
var magazin = {
    title: 'Eloquent JavaScript',
    isbn: '978-1593272821',
    coverUrl: 'http://'
};
// const myString: never = 'string';
var ghost;
var myNothing = ghost;
// !---------------
// ! Generics
// !---------------
// ! Generic function
var loggingIdentity = function (arg) {
    console.log(arg);
    return arg;
};
var response = {
    id: 1,
    data: [{ isbn: 'abc', title: 'Faust' }],
    createdAt: 12345678,
    modifiedAt: 12345678
};
// ! Generic array
var myArray = [
    {
        street: "Alexanderplatz",
        zipCode: "USA2134",
        city: "asdf"
    },
];
var person = {
    name: "Michael",
    age: 65
};
var book;
function move(animal) {
    if ("swim" in animal) {
        animal.swim;
        // animal.swim();
    }
    else {
        animal.fly;
        // animal.fly();
    }
}
move({});
// ! `type predicates` aka user-defined type guards
function isFish(animal) {
    return animal.swim !== undefined;
}
// Both calls to 'swim' and 'fly' are now okay.
function move2(animal) {
    if (isFish(animal)) {
        animal.swim();
    }
    else {
        animal.fly();
    }
}
move2({ swim: function () { } });
// !--------------------------------------------
// ! `void` and `never` as function return types
// !--------------------------------------------
// ! void
// ! -------------------
// NOTE: Contextual typing with a return type of `void` does not force functions to not return something.
// (see https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void)
// Expected: void does NOT allow return value
var noop2 = function () {
    return true;
};
// What??? 🤯: void allows return value
var noop1 = function () {
    return true;
};
var thisIsVoid = noop1();
// Explanation
var src = [1, 2, 3];
var dst = [0];
// TS decided to introduce this weird definition of void so that the following is allowed:
src.forEach(function (el) { return dst.push(el); });
// Although technically speacking it should be written as:
src.forEach(function (el) { dst.push(el); });
// ! `never` NOT possible here as type (function does implicitly return at some point)
var boolOrThrow = function () {
    if (Math.random() > 0.5) {
        throw new Error("hello");
    }
    // ! implicitly:
    // return undefined
};
// ! `void` also possible here as type
var alwaysThrow = function () {
    if (Math.random() > 0.5) {
        throw new Error("hello");
    }
    throw new Error("goodbye");
};
// returns `number` (even though it throws) (`number` is same as `number | never`)
var numberFunction = function () {
    if (Math.random() > 0.5) {
        throw new Error("hello");
    }
    else {
        return 1;
    }
};

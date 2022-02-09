// !---------------
// ! Type Coercion in TypeScript
// !---------------

const one = true + false;

const two = 1 + "hello world" + 4;

const three = 1 + true;

const four = "hello" + true;

// !---------------
// ! Type Inference
// !---------------

// type inferred
let myName = "John";
myName = 8; // type error!

// ! Function types

// infers '5 | undefined' return type
const myFct2 = () => (Math.random() > 0.5 ? 5 : undefined);
// infers 'void' return type
const myFct3 = () => {
  console.log("Hello, world!");
};
// inferred return type
const myFct4 = (name: string, surname?: string) => {
  return name + surname;
};

const resultOfMyFct2 = myFct2();

// !-----------------
// ! Types vs. Values
// !-----------------

// ! type 'undefined' vs. value 'undefined'

let age2: number | undefined | null = 4;
age2 = undefined;

// !------------------
// ! Interface merging
// !------------------

interface MyBookT {
  title: string;
  isbn: string;
}
interface MyBookT {
  price: number;
}

// !------------------
// ! Excess properties
// !------------------

type MyMagazineT = { title: string; issn: string };
type ReadingMaterialT = MyBookT | MyMagazineT;

const readingMaterial: ReadingMaterialT[] = [
  {
    title: "New Covid-19 vaccine",
    isbn: "978-3401002569",
    price: 9,
  },
  {
    title: "Robinson Crusoe",
    issn: "21212-212",
  },
];

// ! Attention: No excess property check if MyMagazinT only contains `title` (no `issn`)!
// See https://stackoverflow.com/questions/70253737/union-of-two-objects-where-one-is-the-subtype-of-the-other-is-not-type-safe

// ! Typescript is not a sound type system
// !--------------------------------------

type Books = Array<{ isbn: string; title: string }>;

let books: Books = [
  {
    isbn: "sadasfd",
    title: "ein buch",
  },
  {
    isbn: "sadasfd",
    title: "ein zweites buch",
  },
];

const books2 = [
  {
    isbn: "sadasfd",
    title: "ein buch",
    nochwas: "ein buch",
  },
  {
    isbn: "sadasfd",
    title: "ein zweites buch",
    nochwas: "ein zweites buch",
  },
];
books = books2;

// ! Allow excess properties
// ! -----------------------

type Car = {
  wheels: number;
  engine: string;
  // Allow excess properties
  [key: string]: unknown;
};

const MyTesla: Car = {
  wheels: 4,
  engine: "electric",
  cameras: 20,
};

// Alternative: Intersection with Record.

// !----------------------------
// ! Function (parameter values)
// !----------------------------

const myFunction4 = (a: number, b: number) => a + b;

function buildName(firstName: string, lastName?: string) {
  if (lastName !== undefined) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

function buildName2(firstName: string, lastName?: string) {
  // TS does not complain. Returns undefined.
  return lastName;
}

console.log(buildName2("Andre"));

// !-------------------
// ! Strict null checks
// !-------------------

let firstName: string[] | null = undefined; // not possible in strict mode

function myFunction3(hello?: string): string {
  if (hello) {
    return hello;
  }
  return "";
}

// let firstName: string | undefined | null = null;
let age: number | undefined = undefined;

let isEmployed: boolean; // undefined

// Array of strings
const list: Array<string> = ["foo", "bar"];
// ReadonlyArray of numbers
const secondList: ReadonlyArray<number>;

list[0] = 5; // Error

// !--------------------------------
// ! Functions - Optional parameters
// !--------------------------------

const myFunction = (input: string): number => 4;

function myFunction2(hello?: string) {
  return hello;
}

const myFunction2 = (arg?: number) => 4;

myFunction2(null);

const myArray2: unknown[] = [1.2, 222.1, 3444];

// !--------------------------------
// ! Interface vs. type alias
// !--------------------------------

interface Address {
  street: string;
  zipCode: string;
  city: string;
}

type AddressT = {
  street: string;
  zipCode: string;
  city: string;
};

// !---------------
// ! Intersection
// !---------------

type Book = {
  id: string;
  isbn: string;
  title: string;
  pages?: number;
};

type Magazine = Book & {
  coverUrl: string;
  // duplicate isbn
  isbn: number;
};

type MagazinWithNewIsbn = Omit<Magazine, "isbn"> & { isbn: number };

const magazin: Magazine = {
  title: "Eloquent JavaScript",
  isbn: "978-1593272821", // Error: Type 'string' is not assignable to type 'never'
  coverUrl: "http://",
};

// !---------------
// ! Intersection: Use case example
// !---------------

type BookGeneral = {
  // id is of type `number` when synced with DB and of type `string` in offline mode.
  id: number | string;
  isbn: string;
  title: string;
  pages?: number;
};

type BookSynced = Omit<BookGeneral, "id"> & { id: number };

//! Impossible type -> never type
type IsbnIntersection = string & number;

// const myString: never = 'string';

const ghost: never;
const myNothing: string = ghost;

// !--------------------
// ! Interface extension
// !--------------------

interface BookI {
  id: string;
  isbn: string;
}

// Error: Type 'number' is not assignable to type 'string'
// ! Each field in the child has to be a subtype of its corresponding field
// ! in the parent (covariance on members).
interface MagazineI extends BookI {
  isbn: number;
}

// !---------------
// ! Generics
// !---------------

// ! Generic function

const loggingIdentity = <T>(arg: T): T => {
  console.log(arg);
  return arg;
};

// ! Generic object

type ResponseT<T> = {
  id: number;
  data: T[];
  createdAt: number;
  modifiedAt: number;
};

const response: ResponseT<Book> = {
  id: 1,
  data: [{ isbn: "abc", title: "Faust" }],
  createdAt: 12345678,
  modifiedAt: 12345678,
};

// ! Generic array

const myArray: Array<AddressT> = [
  {
    street: "Alexanderplatz",
    zipCode: "USA2134",
    city: "asdf",
  },
];

interface Profile {
  id: number;
  gender: string;
  name: string;
  pictureUrl?: string;
  address: Address;
}

interface Person {
  name: string;
  age: number;
}
const person: Person = {
  name: "Michael",
  age: 65,
};

let book: { isbn: string; title: string };

// let person: { name: string, age: number };
// person = {
//   name: 'Michael',
//   age: 65,
// }

// !---------------
// ! Type guards
// !---------------

// ! `in` operator for custom type guards

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal.swim;
    // animal.swim();
  } else {
    animal.fly;
    // animal.fly();
  }
}

move({});

// ! `type predicates` aka user-defined type guards

function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
function move2(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim();
  } else {
    animal.fly();
  }
}

move2({ swim: () => {} });

// !--------------------------------------------
// ! `void` and `never` as function return types
// !--------------------------------------------

// ! void
// ! -------------------

// NOTE: Contextual typing with a return type of `void` does not force functions to not return something.
// (see https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void)

// Expected: void does NOT allow return value
const noop2 = (): void => {
  return true;
};

// What??? 🤯: void allows return value
const noop1: () => void = () => {
  return true;
};
const thisIsVoid = noop1();

// Explanation
const src = [1, 2, 3];
const dst = [0];
// TS decided to introduce this weird definition of void so that the following is allowed:
src.forEach((el) => dst.push(el));
// Although technically speacking it should be written as:
src.forEach((el) => {
  dst.push(el);
});

// ! never
// ! -------------------

type NotPossible = boolean & never;
type WillBeBoolean = boolean | never;

// ! `never` NOT possible here as type (function does implicitly return at some point)
const boolOrThrow = (): void => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  }
  // ! implicitly:
  // return undefined
};

// ! `void` also possible here as type
const alwaysThrow = (): never => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  }
  throw new Error("goodbye");
};

// returns `number` (even though it throws) (`number` is same as `number | never`)
const numberFunction = (): number | never => {
  if (Math.random() > 0.5) {
    throw new Error("hello");
  } else {
    return 1;
  }
};

export {};

# 🚀 JavaScript Deep Dive Notes - Section 2: JavaScript Basics <a id="section-2-top"></a>

## 📑 Table of Contents
<a id="section-2-toc"></a>

- <a href="#s2-variables">2.1 Variables</a>
  - <a href="#s2-what-is-variable">What is a Variable?</a>
  - <a href="#s2-variable-lifecycle">Variable Lifecycle</a>
  - <a href="#s2-why-variables-matter">Why Variables Matter</a>
- <a href="#s2-var-let-const">2.2 `var`, `let`, `const` — All Important Points</a>
  - <a href="#s2-var">2.2.1 `var`</a>
  - <a href="#s2-let">2.2.2 `let`</a>
  - <a href="#s2-const">2.2.3 `const`</a>
- <a href="#s2-hoisting">2.3 Hoisting</a>
  - <a href="#s2-hoisting-var">2.3.1 Hoisting with `var`</a>
  - <a href="#s2-hoisting-let-const">2.3.2 Hoisting with `let` and `const`</a>
  - <a href="#s2-hoisting-functions">2.3.3 Function Hoisting</a>
  - <a href="#s2-hoisting-usecase">2.3.4 Use Case of Hoisting</a>
- <a href="#s2-scope">2.4 Scope</a>
  - <a href="#s2-global-scope">Global Scope</a>
  - <a href="#s2-function-scope">Function Scope</a>
  - <a href="#s2-block-scope">Block Scope</a>
  - <a href="#s2-lexical-scope">Lexical Scope</a>
- <a href="#s2-combined-view">2.5 Declaration, Hoisting, Scope — Combined View</a>
- <a href="#s2-types">2.6 Built-in Types in JavaScript</a>
  - <a href="#s2-primitive-types">2.6.1 Primitive Types</a>
  - <a href="#s2-reference-types">2.6.2 Reference Types</a>
  - <a href="#s2-types-detail">2.6.3 Types in Detail</a>
- <a href="#s2-null-vs-undefined">2.7 `null` vs `undefined`</a>
- <a href="#s2-arrays">2.8 Arrays in Detail</a>
  - <a href="#s2-array-indexing">2.8.1 Array Indexing</a>
  - <a href="#s2-array-length">2.8.2 `length` Property</a>
  - <a href="#s2-array-methods">2.8.3 Common Array Methods</a>
    - <a href="#s2-mutating-methods">A. Mutating Methods</a>
    - <a href="#s2-non-mutating-methods">B. Non-Mutating Methods</a>
    - <a href="#s2-iteration-methods">C. Iteration Methods</a>
    - <a href="#s2-creation-methods">D. Array Creation Methods</a>
  - <a href="#s2-array-usecases">2.8.4 Common Array Use Cases</a>
- <a href="#s2-comments">2.9 Comments in JavaScript</a>
- <a href="#s2-pros-cons">2.10 JavaScript Pros and Cons</a>
- <a href="#s2-operators">2.11 All Types of Operators</a>
  - <a href="#s2-arithmetic">2.11.1 Arithmetic Operators</a>
  - <a href="#s2-assignment">2.11.2 Assignment Operators</a>
  - <a href="#s2-comparison">2.11.3 Comparison Operators</a>
  - <a href="#s2-logical">2.11.4 Logical Operators</a>
  - <a href="#s2-unary">2.11.5 Unary Operators</a>
  - <a href="#s2-bitwise">2.11.6 Bitwise Operators</a>
  - <a href="#s2-ternary">2.11.7 Ternary Operator</a>
  - <a href="#s2-comma">2.11.8 Comma Operator</a>
  - <a href="#s2-optional-chaining">2.11.9 Optional Chaining</a>
  - <a href="#s2-in-operator">2.11.10 `in` Operator</a>
- <a href="#s2-equality">2.12 `==` vs `===`</a>
- <a href="#s2-conditions">2.13 Combining Multiple Conditions</a>
- <a href="#s2-increment-decrement">2.14 Increment and Decrement on Non-Numeric Values</a>
- <a href="#s2-array-indexing-notes">2.15 Array Indexing — Important Notes</a>
- <a href="#s2-array-vs-object">2.16 Array vs Object Quick Difference</a>
- <a href="#s2-cheatsheet">2.17 Interview Cheat Sheet</a>
- <a href="#s2-interview-optimized">🚀 Section 2: 100% Interview Optimized Q&A</a>
  - <a href="#s2-topic1">📌 TOPIC 1: Variables & Declarations</a>
  - <a href="#s2-topic2">📌 TOPIC 2: Hoisting & Temporal Dead Zone</a>
  - <a href="#s2-topic3">📌 TOPIC 3: Scope</a>
  - <a href="#s2-topic4">📌 TOPIC 4: Data Types</a>
  - <a href="#s2-topic5">📌 TOPIC 5: Arrays</a>
  - <a href="#s2-topic6">📌 TOPIC 6: Operators</a>
  - <a href="#s2-topic7">📌 TOPIC 7: Comments</a>
  - <a href="#s2-topic8">📌 TOPIC 8: JS Pros/Cons</a>
  - <a href="#s2-never-say">❌ Answers You Should Never Give</a>
  - <a href="#s2-top20">🔥 TOP 20 Interview Questions Mega-Cheat Sheet</a>

<a href="#section-2-top">⬆ Back to Top</a>

---

> Interview-focused notes with practical examples and common pitfalls

---

## <a id="s2-variables"></a>2.1 Variables

### <a id="s2-what-is-variable"></a>What is a variable?
A **variable** is a named container used to store data in memory.

```javascript
let age = 25;
const name = "Alice";
var city = "Delhi";
```

### <a id="s2-variable-lifecycle"></a>Variable lifecycle
1. **Declaration** — create a variable name
2. **Initialization** — assign first value
3. **Assignment** — change value later

```javascript
let score;        // declaration
score = 10;       // initialization
score = 20;       // assignment
```

### <a id="s2-why-variables-matter"></a>Why variables matter
- Store user input
- Hold API response data
- Keep state in apps
- Reuse values instead of repeating them

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-var-let-const"></a>2.2 `var`, `let`, `const` — All Important Points

These are the three ways to declare variables in JavaScript.

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisted | Yes | Yes | Yes |
| Initialized during hoisting | Yes, as `undefined` | No | No |
| Redeclaration | Allowed | Not allowed in same scope | Not allowed in same scope |
| Reassignment | Allowed | Allowed | Not allowed |
| Best use | Legacy code only | Variables that change | Variables that should not be reassigned |

---

### <a id="s2-var"></a>2.2.1 `var`
`var` is the old way to declare variables.

#### Important points
- Function-scoped, not block-scoped
- Hoisted and initialized to `undefined`
- Can be redeclared in the same scope
- Can be reassigned
- In browsers, top-level `var` becomes a property of `window`

```javascript
function demo() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10
}
demo();
```

Here, `x` is visible outside the `if` block because `var` ignores block scope.

#### Interview pitfall
```javascript
var a = 1;
var a = 2; // allowed
console.log(a); // 2
```

---

### <a id="s2-let"></a>2.2.2 `let`
`let` is the modern way to declare variables that may change.

#### Important points
- Block-scoped
- Hoisted, but not initialized
- Cannot be redeclared in same scope
- Can be reassigned
- Safer than `var`

```javascript
if (true) {
  let age = 30;
  console.log(age); // 30
}
console.log(age); // ReferenceError
```

#### Use case
Use `let` when the value will change.

```javascript
let count = 0;
count = count + 1;
```

---

### <a id="s2-const"></a>2.2.3 `const`
`const` declares a constant binding.

#### Important points
- Block-scoped
- Must be initialized at declaration
- Cannot be reassigned
- Hoisted, but in the **Temporal Dead Zone**
- Objects and arrays declared with `const` can still be mutated

```javascript
const pi = 3.14159;
// pi = 3.14; // TypeError
```

#### Important interview point
`const` does **not** mean the value is deeply immutable.

```javascript
const user = { name: "Alex" };
user.name = "John"; // allowed
console.log(user.name); // John
```

Same for arrays:

```javascript
const nums = [1, 2, 3];
nums.push(4); // allowed
console.log(nums); // [1, 2, 3, 4]
```

#### Use case
Use `const` by default when the variable should not be reassigned.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-hoisting"></a>2.3 Hoisting

### What is hoisting?
Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation.

### Simple meaning
You can access some declarations before they appear in the code.

---

### <a id="s2-hoisting-var"></a>2.3.1 Hoisting with `var`
`var` declarations are hoisted and initialized with `undefined`.

```javascript
console.log(a); // undefined
var a = 10;
```

Internally, it behaves like:

```javascript
var a;
console.log(a); // undefined
a = 10;
```

---

### <a id="s2-hoisting-let-const"></a>2.3.2 Hoisting with `let` and `const`
`let` and `const` are also hoisted, but they are **not initialized** immediately.

They stay in the **Temporal Dead Zone (TDZ)** until the line of declaration is executed.

```javascript
console.log(b); // ReferenceError
let b = 20;
```

```javascript
console.log(c); // ReferenceError
const c = 30;
```

---

### <a id="s2-hoisting-functions"></a>2.3.3 Function hoisting
Function declarations are fully hoisted.

```javascript
sayHello(); // works

function sayHello() {
  console.log("Hello");
}
```

But function expressions are not fully hoisted.

```javascript
greet(); // TypeError: greet is not a function

var greet = function () {
  console.log("Hi");
};
```

---

### Hoisting interview answer
**Hoisting is JavaScript's mechanism where declarations are moved to the top of their scope.**
- `var` → hoisted and initialized as `undefined`
- `let`/`const` → hoisted but not initialized, so they are in TDZ
- function declarations → fully hoisted

---

### <a id="s2-hoisting-usecase"></a>2.3.4 Use case of hoisting
Hoisting is useful in function declarations when you want to organize code by putting helper functions later in the file.

```javascript
calculateTotal();

function calculateTotal() {
  console.log("Calculating...");
}
```

### Best practice
Do **not** rely on hoisting for variable usage. It makes code harder to read and debug.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-scope"></a>2.4 Scope

### What is scope?
Scope decides where a variable can be accessed.

---

### Types of scope

#### <a id="s2-global-scope"></a>1. Global scope
Accessible everywhere in the file/module.

```javascript
let appName = "ShopApp";
```

#### <a id="s2-function-scope"></a>2. Function scope
Variables declared inside a function are available only inside that function.

```javascript
function test() {
  var x = 10;
  console.log(x);
}
```

#### <a id="s2-block-scope"></a>3. Block scope
Variables declared inside `{}` are only accessible inside that block.

```javascript
if (true) {
  let y = 20;
  const z = 30;
}
```

#### <a id="s2-lexical-scope"></a>4. Lexical scope
Inner functions can access variables from outer functions.

```javascript
function outer() {
  let name = "Alex";

  function inner() {
    console.log(name); // accessible
  }

  inner();
}
outer();
```

---

### Scope and `var` / `let` / `const`
- `var` → function scope
- `let` and `const` → block scope

```javascript
function example() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
  }

  console.log(a); // 1
  // console.log(b); // Error
  // console.log(c); // Error
}
```

---

### Interview use case
Block scope is important in loops and conditionals.

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 0, 1, 2
```

If `var` were used, all callbacks would print `3`.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-combined-view"></a>2.5 Declaration, Hoisting, Scope — Combined View

### Key idea
These three concepts are connected:

- **Declaration** creates the variable name
- **Hoisting** affects when the declaration becomes available
- **Scope** decides where the variable is accessible

### Example
```javascript
function demo() {
  console.log(x); // undefined
  var x = 5;

  if (true) {
    let y = 10;
    const z = 20;
  }
}
```

### Interview note
- `var x` is hoisted to the top of function scope
- `let y` and `const z` are block-scoped and hoisted but in TDZ

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-types"></a>2.6 Built-in Types in JavaScript

JavaScript has **primitive types** and **reference types**.

---

### <a id="s2-primitive-types"></a>2.6.1 Primitive types
These are immutable values:

1. `number`
2. `string`
3. `boolean`
4. `null`
5. `undefined`
6. `bigint`
7. `symbol`

---

### <a id="s2-reference-types"></a>2.6.2 Reference types
These are objects:

- `object`
- `array`
- `function`
- `Date`
- `RegExp`

---

### <a id="s2-types-detail"></a>2.6.3 Types in Detail

#### `number`
```javascript
let price = 99.99;
let count = 10;
console.log(typeof NaN); // number
```

#### `string`
```javascript
let firstName = "John";
let message = 'Hello';
let quote = `Hi ${firstName}`;
let str = "hello";
str[0] = "H"; // does not change original string
console.log(str); // hello
```

#### `boolean`
```javascript
let isLoggedIn = true;
```

#### `null`
```javascript
let user = null;
console.log(typeof null); // object
```

#### `undefined`
```javascript
let x;
console.log(x); // undefined
let obj = {};
console.log(obj.name); // undefined
```

#### `object`
```javascript
let person = { name: "Alex", age: 25 };
```

#### `array`
```javascript
let fruits = ["apple", "banana", "mango"];
console.log(typeof fruits); // object
console.log(Array.isArray(fruits)); // true
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-null-vs-undefined"></a>2.7 `null` vs `undefined`

| Feature | `null` | `undefined` |
|---|---|---|
| Meaning | Intentionally empty | Not assigned / missing |
| Set by | Developer | JavaScript engine or missing assignment |
| Type | object (bug) | undefined |
| Use case | Reset a value | Variable declared but not assigned |

```javascript
let a;
let b = null;
console.log(a); // undefined
console.log(b); // null
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-arrays"></a>2.8 Arrays in Detail

An array stores multiple values in one variable, in order.

```javascript
const colors = ["red", "green", "blue"];
const mixed = [1, "hello", true, null, { id: 1 }];
```

---

### <a id="s2-array-indexing"></a>2.8.1 Array indexing

```javascript
const nums = [10, 20, 30];
console.log(nums[0]); // 10
console.log(nums[5]); // undefined
console.log(nums[-1]); // undefined
console.log(nums.at(-1)); // 30
```

---

### <a id="s2-array-length"></a>2.8.2 `length` property

```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3

const a = [1, 2, 3, 4];
a.length = 2;
console.log(a); // [1, 2]

const b = [1, 2];
b.length = 5;
console.log(b); // [1, 2, empty × 3]
```

---

### <a id="s2-array-methods"></a>2.8.3 Common Array Methods

#### <a id="s2-mutating-methods"></a>A. Methods that mutate the original array

#### `push()` — Adds item(s) to the end
```javascript
const arr = [1, 2];
arr.push(3);
console.log(arr); // [1, 2, 3]
```

#### `pop()` — Removes the last item
```javascript
const arr = [1, 2, 3];
arr.pop();
console.log(arr); // [1, 2]
```

#### `unshift()` — Adds item(s) to the start
```javascript
const arr = [2, 3];
arr.unshift(1);
console.log(arr); // [1, 2, 3]
```

#### `shift()` — Removes the first item
```javascript
const arr = [1, 2, 3];
arr.shift();
console.log(arr); // [2, 3]
```

#### `splice()` — Adds/removes/replaces at any position
```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 2, "A", "B");
console.log(arr); // [1, "A", "B", 4]
```

#### `sort()` — Sorts in place
```javascript
const nums = [10, 2, 5];
nums.sort(); // [10, 2, 5] string sort
nums.sort((a, b) => a - b); // [2, 5, 10] numeric sort
```

#### `reverse()` — Reverses in place
```javascript
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

#### `fill()` — Fills with a static value
```javascript
const arr = new Array(3).fill(0);
console.log(arr); // [0, 0, 0]
```

#### `copyWithin()` — Copies part of array
```javascript
const arr = [1, 2, 3, 4];
arr.copyWithin(1, 3);
console.log(arr); // [1, 4, 3, 4]
```

---

#### <a id="s2-non-mutating-methods"></a>B. Methods that do not mutate the original array

#### `slice()` — Shallow copy of part
```javascript
const arr = [1, 2, 3, 4];
const part = arr.slice(1, 3);
console.log(part); // [2, 3]
```

#### `concat()` — Combines arrays
```javascript
const a = [1, 2];
const b = [3, 4];
console.log(a.concat(b)); // [1, 2, 3, 4]
```

#### `join()` — Array to string
```javascript
const arr = ["a", "b", "c"];
console.log(arr.join("-")); // a-b-c
```

#### `includes()` — Checks if value exists
```javascript
console.log([1, 2, 3].includes(2)); // true
```

#### `indexOf()` — First match index
```javascript
console.log([1, 2, 3].indexOf(2)); // 1
```

#### `lastIndexOf()` — Last match index
```javascript
console.log([1, 2, 2, 3].lastIndexOf(2)); // 2
```

#### `at()` — Supports negative indexing
```javascript
console.log([10, 20, 30].at(-1)); // 30
```

---

#### <a id="s2-iteration-methods"></a>C. Iteration methods

#### `forEach()` — Runs function for each item
```javascript
[1, 2, 3].forEach(n => console.log(n));
```

#### `map()` — Transforms and returns new array
```javascript
const doubled = [1, 2, 3].map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

#### `filter()` — Keeps matching items
```javascript
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

#### `reduce()` — Combines values
```javascript
const sum = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);
console.log(sum); // 10
```

#### `some()` — At least one matches
```javascript
console.log([1, 3, 5, 6].some(n => n % 2 === 0)); // true
```

#### `every()` — All items match
```javascript
console.log([1, 2, 3].every(n => n > 0)); // true
```

#### `find()` — First matching item
```javascript
const users = [{ id: 1 }, { id: 2 }];
console.log(users.find(u => u.id === 2)); // { id: 2 }
```

#### `findIndex()` — Index of first match
```javascript
console.log(users.findIndex(u => u.id === 2)); // 1
```

#### `findLast()` and `findLastIndex()` — Search from end
```javascript
const arr = [1, 2, 3, 2];
console.log(arr.findLast(n => n === 2)); // 2
console.log(arr.findLastIndex(n => n === 2)); // 3
```

---

#### <a id="s2-creation-methods"></a>D. Array creation methods

#### `Array.isArray()` — Checks if array
```javascript
Array.isArray([]); // true
Array.isArray({}); // false
```

#### `Array.from()` — Creates from iterable
```javascript
Array.from("hello"); // ["h", "e", "l", "l", "o"]
```

#### `Array.of()` — Creates from arguments
```javascript
Array.of(5); // [5]
Array.of(1, 2, 3); // [1, 2, 3]
```

---

### <a id="s2-array-usecases"></a>2.8.4 Common array use cases

```javascript
// Storing lists
const todos = ["study", "exercise", "sleep"];

// Rendering UI
const items = ["A", "B", "C"];
items.map(item => `<li>${item}</li>`);

// Processing API data
const users = [{ name: "A", active: true }, { name: "B", active: false }];
const activeUsers = users.filter(user => user.active);

// Aggregating values
const cart = [100, 200, 300];
const total = cart.reduce((sum, price) => sum + price, 0);
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-comments"></a>2.9 Comments in JavaScript

```javascript
// Single-line comment

/*
  Multi-line comment
*/

/**
 * JSDoc comment
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

**Best practices**: Explain **why**, not obvious **what**. No outdated or dead commented code.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-pros-cons"></a>2.10 JavaScript Pros and Cons

### Pros
1. Runs everywhere (browser + server)
2. Easy to learn
3. Huge ecosystem (NPM)
4. Best for web UI
5. Full-stack capability
6. Excellent async support

### Cons
1. Dynamic typing causes bugs: `"5" + 1 // "51"`
2. Type coercion: `[] == false // true`
3. Single-threaded — CPU work blocks event loop
4. Historical browser differences
5. Client-side code is inspectable

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-operators"></a>2.11 All Types of Operators

### <a id="s2-arithmetic"></a>2.11.1 Arithmetic operators
```javascript
10 + 5;  // 15
10 % 3;  // 1
2 ** 3;  // 8
```

### <a id="s2-assignment"></a>2.11.2 Assignment operators
```javascript
let x = 10;
x += 5; // 15
```

### <a id="s2-comparison"></a>2.11.3 Comparison operators
```javascript
5 > 3;   // true
5 <= 5;  // true
```

### <a id="s2-logical"></a>2.11.4 Logical operators
```javascript
true && false; // false
true || false; // true
!true;         // false
```

### <a id="s2-unary"></a>2.11.5 Unary operators
```javascript
typeof 5; // "number"
+ "10";   // 10
- "10";   // -10
```

### <a id="s2-bitwise"></a>2.11.6 Bitwise operators
```javascript
5 & 1; // 1
5 | 1; // 5
```

### <a id="s2-ternary"></a>2.11.7 Ternary operator
```javascript
const result = age >= 18 ? "Adult" : "Minor";
```

### <a id="s2-comma"></a>2.11.8 Comma operator
```javascript
let x = (1, 2, 3);
console.log(x); // 3
```

### <a id="s2-optional-chaining"></a>2.11.9 Optional chaining
```javascript
user.profile?.address?.city;
```

### <a id="s2-in-operator"></a>2.11.10 `in` operator
```javascript
const obj = { name: "Alex" };
console.log("name" in obj); // true
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-equality"></a>2.12 `==` vs `===`

```javascript
// == loose equality
"5" == 5;          // true
0 == false;        // true
null == undefined; // true

// === strict equality
"5" === 5;         // false
0 === false;       // false
null === undefined;// false

// Why === is preferred
[] == false;  // true
[] === false; // false
```

**Best practice**: Use `===` in almost all cases.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-conditions"></a>2.13 Combining Multiple Conditions

```javascript
// AND
if (age >= 18 && hasId) { console.log("Allowed"); }

// OR
if (isAdmin || isOwner) { console.log("Access granted"); }

// NOT
if (!isLoggedIn) { console.log("Please login"); }

// Short-circuit
false && console.log("Won't run");
true || console.log("Won't run");

// || vs ??
0 || 10;   // 10
0 ?? 10;   // 0
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-increment-decrement"></a>2.14 Increment and Decrement on Non-Numeric Values

```javascript
let x = null; x++; console.log(x); // 1
let a = "5";  a++; console.log(a); // 6
let b = true; b++; console.log(b); // 2
let c = undefined; c++; console.log(c); // NaN

// Postfix vs Prefix
let n = 5;
console.log(n++); // 5 (returns old, then increments)
console.log(n);   // 6

let m = 5;
console.log(++m); // 6 (increments first, then returns)
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-array-indexing-notes"></a>2.15 Array Indexing — Important Notes

```javascript
const arr = ["a", "b", "c"];
console.log(arr[0]);    // "a"
console.log(arr[100]);  // undefined
console.log(arr[-1]);   // undefined
console.log(arr.at(-1));// "c"

arr[1] = "x";
console.log(arr); // ["a", "x", "c"]
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-array-vs-object"></a>2.16 Array vs Object Quick Difference

| Feature | Array | Object |
|---|---|---|
| Purpose | Ordered list | Key-value data |
| Access | Index-based | Key-based |
| Order | Yes | Usually insertion order |
| Example | `["a", "b"]` | `{ name: "Alex" }` |

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-cheatsheet"></a>2.17 Interview Cheat Sheet

| Topic | Key Points |
|---|---|
| Variables | Prefer `const`, use `let` for reassignment, avoid `var` |
| Hoisting | `var`→`undefined`, `let/const`→TDZ, functions→fully hoisted |
| Types | 7 primitives, arrays are objects, `typeof null` is `"object"` |
| Arrays | Zero-based, `length` is property, use `Array.isArray()` |
| Operators | Use `===`, use `??` not `||` for null checks |
| Increment | Avoid on non-numeric values in production |

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-interview-optimized"></a>🚀 Section 2: 100% Interview Optimized Q&A

> Includes: official accepted answer ✅, runnable code 🧪, gotchas ⚠️, and frequency ratings.
> 🎯 Study Hack: Cover the answer, predict output, then verify.

| 🔥 Rating | Meaning |
|---|---|
| 🟢 99% | Asked at nearly every JS interview |
| 🟡 70% | Very common |
| 🟠 40% | Moderately common |
| 🔴 20% | Occasional trick question |

---

## <a id="s2-topic1"></a>📌 TOPIC 1: Variables & Declarations

### ❓ Question: Explain the difference between `var`, `let` and `const`
🔥 Frequency: 🟢 99%

✅ Standard accepted answer:

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope Rule | Function scoped | Block scoped | Block scoped |
| Hoisting | Yes, `undefined` | Yes, TDZ | Yes, TDZ |
| Redeclaration | ✅ Yes | ❌ No | ❌ No |
| Reassignment | ✅ Yes | ✅ Yes | ❌ No |
| Attaches to `window` | ✅ Yes | ❌ No | ❌ No |

🧪 Code:
```javascript
var g1 = 1; console.log(window.g1); // 1
let g2 = 2; console.log(window.g2); // undefined
```

⚠️ Gotcha: `const` does NOT make values immutable, only prevents reassignment.

---

### ❓ Question: Explain the famous loop timeout example
🔥 Frequency: 🟢 99%

🧪 Code:
```javascript
for(var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3

for(let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2
```

✅ Answer: `var` is function-scoped — one shared `i`. `let` is block-scoped — new `i` per iteration.

---

### ❓ Question: Does `const` make a value immutable?
🔥 Frequency: 🟢 99%

🧪 Code:
```javascript
const user = {name: "Alex"};
user.name = "Bob"; // ✅ Mutation allowed
user = {};         // ❌ TypeError: reassignment blocked

const arr = [1];
arr.push(2);       // ✅ [1, 2]
arr = [3];         // ❌ Error
```

---

### Common edge case questions
🔥 Frequency: 🟡 70%

| Code | Output | Explanation |
|---|---|---|
| `var x=1; var x=2; console.log(x)` | `2` | var allows silent redeclaration |
| `let x=1; let x=2;` | `SyntaxError` | let blocks redeclaration |
| `for(const i=0;i<3;i++){}` | `TypeError` | Loop counter needs reassignment |

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic2"></a>📌 TOPIC 2: Hoisting & Temporal Dead Zone

### ❓ Question: Are `let` and `const` hoisted?
🔥 Frequency: 🟢 99%

❌ Wrong answer: No  
✅ Correct Answer: **Yes — all declarations are hoisted.** The difference is initialization:
- `var` → hoisted + initialized as `undefined`
- `let`/`const` → hoisted but stay in **TDZ** until declaration line

🧪 Code:
```javascript
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 20;
```

---

### ❓ Question: Function declaration vs expression hoisting
🔥 Frequency: 🟡 70%

```javascript
hello(); // ✅ Works
function hello() { console.log("hi") }

greet(); // ❌ TypeError
var greet = function() {}
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic3"></a>📌 TOPIC 3: Scope

### ❓ Question: 4 types of scope?
🔥 Frequency: 🟡 70%  
✅ Answer: Global, Module, Function, Block

### ❓ Question: Explain lexical scope
🔥 Frequency: 🟡 70%

```javascript
function outer(x){
  return function inner(){ return x; }
}
const fn = outer(10);
fn(); // 10
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic4"></a>📌 TOPIC 4: Data Types

### ❓ Question: `null` vs `undefined`?
🔥 Frequency: 🟢 99%

| | `null` | `undefined` |
|---|---|---|
| Meaning | Intentionally empty | Never assigned |
| Set by | Developer | JavaScript engine |
| `typeof` | `"object"` (bug) | `"undefined"` |

---

### ❓ Question: How to properly check if value is an array?
🔥 Frequency: 🟢 99%  
✅ Answer: `Array.isArray(value)`  
❌ Not `typeof value === 'object'` — also true for objects, dates, regex

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic5"></a>📌 TOPIC 5: Arrays

### ❓ Question: Which methods mutate vs return new array?
🔥 Frequency: 🟡 70%

| ❌ Mutates | ✅ Returns new |
|---|---|
| `push`, `pop` | `slice` |
| `unshift`, `shift` | `map` |
| `splice` | `filter` |
| `sort` | `reduce` |
| `reverse` | `concat` |
| `fill` | `includes`, `find` |

⚠️ Most candidates forget `sort()` and `reverse()` mutate!

---

### Holy trinity of iteration
```javascript
[1,2,3]
 .map(x => x * 2)            // [2,4,6]
 .filter(x => x > 3)         // [4,6]
 .reduce((sum, n) => sum + n, 0); // 10
```

⚠️ `sort()` pitfall:
```javascript
[40, 100, 2].sort()              // [100, 2, 40] ❌ string sort
[40, 100, 2].sort((a,b) => a-b) // [2, 40, 100] ✅ numeric sort
```

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic6"></a>📌 TOPIC 6: Operators

### ❓ Question: `==` vs `===`?
🔥 Frequency: 🟢 99%  
✅ `==` coerces types first. `===` checks value AND type. Always use `===`.

---

### ❓ Question: `||` vs `??`?
🔥 Frequency: 🟢 99%

| Code | `\|\|` | `??` |
|---|---|---|
| `0 \|\| 10` | `10` | `0` |
| `"" \|\| "x"` | `"x"` | `""` |
| `null \|\| 10` | `10` | `10` |

---

### ❓ Question: `[] == ![]` output?
🔥 Frequency: 🟡 70%  
🤯 Output: `true` — most famous broken coercion example.

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-topic7"></a>📌 TOPIC 7: Comments
🔥 Frequency: 🟠 40%  
✅ `//` single line, `/* */` multi-line, `/** */` JSDoc. Explain WHY not WHAT. No dead code.

---

## <a id="s2-topic8"></a>📌 TOPIC 8: JS Pros/Cons
🔥 Frequency: 🟡 70%  
✅ **Pros**: Everywhere/ecosystem/async. **Cons**: Typing(TS)/coerce(`===`)/thread(Workers).

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-never-say"></a>❌ Answers You Should Never Give In An Interview

1. ❌ "let and const are not hoisted"
2. ❌ "const makes objects immutable"
3. ❌ "`==` is always evil and has zero valid use cases"
4. ❌ "Arrays are not objects"
5. ❌ "JavaScript is purely interpreted"

<a href="#section-2-toc">⬅ Back to TOC</a> | <a href="#section-2-top">⬆ Back to Top</a>

---

## <a id="s2-top20"></a>🔥 TOP 20 Interview Questions Mega-Cheat Sheet

| # | Question | Answer |
|---|---|---|
| 1 | Hoisting `var/let` output? | `undefined` / ReferenceError |
| 2 | Loop setTimeout fix? | use `let` |
| 3 | const mutate objects? | Yes |
| 4 | `typeof null`? | `"object"` ancient bug |
| 5 | `[] == false`? | true |
| 6 | Complete falsy values list? | 6 items |
| 7 | Correct numeric array sort? | `.sort((a,b) => a-b)` |
| 8 | `let n=null; n++`? | 1 |
| 9 | Array check? | `Array.isArray()` |
| 10 | `\|\|` vs `??` on 0? | `??` preserves 0 |
| 11 | Global `let` on window? | No |
| 12 | TDZ definition? | `let/const` pre-declaration zone |
| 13 | `NaN === NaN`? | false |
| 14 | `at(-1)` use? | Get last element |
| 15 | Which methods mutate array? | push/sort/reverse/splice |
| 16 | `x == null` checks for? | both null AND undefined |
| 17 | Closure counter pattern? | return inner function |
| 18 | Variable shadowing? | inner blocks hide outer vars |
| 19 | `var` scope rule? | function scope only |
| 20 | Function expression vs declaration? | only declarations are fully hoisted |

---

> 🎯 **Final Note**: Master every question on this page and you will score 100% on Section 2 topics in any JavaScript interview.

<a href="#section-2-top">⬆ Back to Top</a> | <a href="#section-2-toc">⬅ Back to TOC</a>
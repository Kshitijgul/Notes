<a id="top"></a>
# JavaScript Deep Dive Notes 

## Index

| Sr No. | Chapter Name | Subtopics |
|------:|-------------|----------|
| 1 | [Chapter 1:Deep Introduction to Javascript  ](#chapter-1) | [What this guide is](#what-this-guide-is) · [Who it’s for](#who-its-for) · [How to use](#how-to-use) |
| 2 | [Chapter 2: Basics in Javascript ](#chapter-2) | [Setup requirements](#setup-requirements) · [Installation](#installation) |
| 3 | [Chapter 3: Conditional Statements ](#chapter-3) | [Concept A](#concept-a) · [Concept B](#concept-b) |

[⬆ Go to top](#top)

---

# Chapter 1: Introduction <a id="chapter-1"></a>

*Interview-focused, production-ready insights with practical examples*

---
## 📑 Table of Contents

- [Chapter 1: Introduction](#chapter-1)
  - [1.1 What is JavaScript? (The Core Definition)](#11-what-is-javascript-the-core-definition)
    - [Official Definition](#official-definition)
    - [Interview Breakdown (Explain Like a Pro)](#interview-breakdown-explain-like-a-pro)
  - [1.2 History & Evolution (The Timeline That Matters)](#12-history--evolution-the-timeline-that-matters)
    - [The Birth (1995)](#the-birth-1995)
    - [ECMA Standardization (1996-1997)](#ecma-standardization-1996-1997)
    - [The Dark Ages (1998-2008)](#the-dark-ages-1998-2008)
    - [The Renaissance (2009 - Present)](#the-renaissance-2009---present)
      - [ES5 (ECMAScript 5) - December 2009](#es5-ecmascript-5---december-2009)
      - [ES6/ES2015 - June 2015](#es6es2015---june-2015)
    - [Post-ES6 Evolution (Yearly Releases)](#post-es6-evolution-yearly-releases)
  - [1.3 Where JavaScript Runs (The Runtime Ecosystem)](#13-where-javascript-runs-the-runtime-ecosystem)
    - [The JavaScript Engine (The Heart)](#the-javascript-engine-the-heart)
      - [Major Engines](#major-engines)
    - [V8 Engine Deep Dive (Interview Gold)](#v8-engine-deep-dive-interview-gold)
    - [Runtime Environments](#runtime-environments)
      - [1. Browser Runtime](#1-browser-runtime)
      - [2. Node.js Runtime](#2-nodejs-runtime)
  - [1.4 What Can JavaScript Do? (The Capability Matrix)](#14-what-can-javascript-do-the-capability-matrix)
    - [1. DOM Manipulation (Browser)](#1-dom-manipulation-browser)
    - [2. Asynchronous Programming](#2-asynchronous-programming)
    - [3. Server-Side Development (Node.js)](#3-server-side-development-nodejs)
    - [4. Mobile App Development](#4-mobile-app-development)
    - [5. Desktop App Development](#5-desktop-app-development)
    - [6. IoT & Embedded Systems](#6-iot--embedded-systems)
    - [7. Machine Learning (TensorFlow.js)](#7-machine-learning-tensorflowjs)
    - [8. Game Development](#8-game-development)
  - [1.5 Fun Facts About V8 Engine (Interview Icebreakers)](#15-fun-facts-about-v8-engine-interview-icebreakers)
    - [Performance Trivia](#performance-trivia)
    - [Hidden Class Magic](#hidden-class-magic)
    - [Garbage Collection Facts](#garbage-collection-facts)
    - [Bytecode Cache](#bytecode-cache)
  - [1.6 console.log() - The Developer's Swiss Army Knife](#16-consolelog---the-developers-swiss-army-knife)
    - [Beyond Basic Logging](#beyond-basic-logging)
    - [Interview Tip](#interview-tip)
  - [📚 Interview Cheat Sheet Summary](#interview-cheat-sheet-summary)

---

# Chapter 1: Introduction <a id="chapter-1"></a>

*Interview-focused, production-ready insights with practical examples*

---

## 1.1 What is JavaScript? (The Core Definition)

### **Official Definition**
JavaScript is a **high-level, interpreted, multi-paradigm, single-threaded, garbage-collected** programming language with first-class functions, dynamic typing, and prototype-based object orientation.

### **Interview Breakdown (Explain Like a Pro)**

**High-level**: You don't manage memory manually; the engine does it for you via garbage collection. No direct hardware access.

```javascript
// You just create variables without thinking about memory allocation
let user = { name: "Alex" }; // Engine automatically allocates memory
user = null; // Engine's garbage collector will free this memory later
```

**Interpreted/JIT Compiled**: Modern JS isn't purely interpreted. V8 compiles it to machine code at runtime using Just-In-Time compilation for performance.

```javascript
// This code gets compiled and optimized by V8 on repeated runs
function calculateSum(n) {
  let sum = 0;
  for(let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}
// On 2nd/3rd call, V8 optimizes this with hidden classes and inline caching
```

**Multi-paradigm**: Supports functional, object-oriented, and procedural styles

```javascript
// Functional approach
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// OOP approach
class Calculator {
  double(n) { return n * 2; }
}

// Procedural approach
function doubleArray(arr) {
  const result = [];
  for(let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}
```

**Single-threaded**: One call stack, one main thread. But asynchronous operations are handled via Event Loop.

```javascript
console.log("First");
setTimeout(() => console.log("Third"), 0);
console.log("Second");
// Output: First, Second, Third (Event Loop defers callback)
```

**First-class functions**: Functions are values; can be assigned, passed, returned.

```javascript
const greet = (name) => `Hello, ${name}`;
const processUser = (callback) => callback("Alex");
processUser(greet); // "Hello, Alex"
```

---

## 1.2 History & Evolution (The Timeline That Matters)

### **The Birth (1995)**
- **Netscape Navigator** needed a scripting language for browsers
- **Brendan Eich** created "Mocha" in **10 days** (May 1995)
- Renamed to **LiveScript** (September 1995)
- Rebranded as **JavaScript** (December 1995) - marketing move to ride Java's popularity
  - **Misconception Alert**: JavaScript has nothing to do with Java architecturally

### **ECMA Standardization (1996-1997)**
- Netscape submitted JavaScript to **ECMA International** for standardization
- **ECMA-262** specification born (June 1997)
- **ECMAScript** became the official name of the language specification
- JavaScript is the **implementation** (like V8, SpiderMonkey)

### **The Dark Ages (1998-2008)**
- Browser wars: Internet Explorer vs Netscape
- Fragmentation: JScript (Microsoft's implementation)
- Slow evolution: ES2 (1998), ES3 (1999), then **ES4 was abandoned** (2008)
- **"Callback hell" era**: No Promises, no modules

```javascript
// ES3 Era Code (The "Hell" developers lived in)
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log("Pyramid of Doom!");
    });
  });
});
```

### **The Renaissance (2009 - Present)**

#### **ES5 (ECMAScript 5) - December 2009**
*The most important release that stabilized JS for a decade*

**Key Features:**
- `"use strict"` mode
- `Array` methods: `forEach`, `map`, `filter`, `reduce`, `some`, `every`
- `Object` methods: `defineProperty`, `keys`, `create`
- JSON support (`JSON.parse`, `JSON.stringify`)
- `Function.prototype.bind`

```javascript
// Practical ES5 Interview Examples

// 1. Array methods (before this, we used for loops)
const numbers = [1, 2, 3, 4, 5];

// map: Transform array
var doubled = numbers.map(function(n) { return n * 2; });

// filter: Conditional selection
var evens = numbers.filter(function(n) { return n % 2 === 0; });

// reduce: Aggregate values
var sum = numbers.reduce(function(acc, n) { return acc + n; }, 0);

// 2. Object.defineProperty (Data privacy pattern)
var person = {};
Object.defineProperty(person, 'age', {
  value: 30,
  writable: false, // Read-only
  enumerable: true,
  configurable: false
});
person.age = 31; // Silently fails in strict mode
console.log(person.age); // 30

// 3. bind() for function context
var user = {
  name: "Alex",
  greet: function() {
    return "Hello, " + this.name;
  }
};
var greetFn = user.greet;
greetFn(); // "Hello, undefined" (this lost)

var boundGreeter = user.greet.bind(user);
boundGreeter(); // "Hello, Alex" (this preserved)
```

#### **ES6/ES2015 - June 2015**
*The biggest update in JavaScript history - modern JS begins here*

**15+ Revolutionary Features:**

1. **`let` & `const`** (Block-scoped variables)
2. **Arrow Functions** (Lexical `this`)
3. **Template Literals**
4. **Destructuring**
5. **Default Parameters**
6. **Rest/Spread Operators**
7. **Classes** (Syntactic sugar)
8. **Modules** (`import`/`export`)
9. **Promises** (Async revolution)
10. **Iterators & Generators**
11. **Symbols** (Unique identifiers)
12. **Sets & Maps**
13. **Enhanced Object Literals**
14. **Proxy & Reflect**
15. **for...of loop**

```javascript
// ===== COMPREHENSIVE ES6 PRACTICAL EXAMPLES =====

// 1. let & const (Block Scope)
function scopeDemo() {
  var oldVar = "function scope";
  let newLet = "block scope";
  
  if(true) {
    let newLet = "inner block"; // Different variable
    console.log(newLet); // "inner block"
  }
  
  console.log(newLet); // "block scope" (outer)
}
// Interview Question: What's the output?
for(var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3 (var is function-scoped)
}
for(let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0, 1, 2 (let is block-scoped)
}

// 2. Arrow Functions (Lexical 'this')
const team = {
  members: ["Alex", "Bob"],
  teamName: "Avengers",
  showMembers: function() {
    this.members.forEach(member => {
      // Arrow function inherits 'this' from parent scope (showMembers)
      console.log(`${member} is in ${this.teamName}`);
    });
  }
};
team.showMembers();

// 3. Destructuring (Extract values)
const user = { name: "Alex", age: 30, city: "NYC" };
const { name, age } = user; // Object destructuring
const [first, second] = [1, 2, 3]; // Array destructuring

// Practical use case: Function parameters
function createUser({ name, email, age = 18 }) {
  return { name, email, age };
}
createUser({ name: "Alex", email: "alex@example.com" });

// 4. Spread/Rest Operators
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // Spread: [1, 2, 3, 4]

function sum(...numbers) { // Rest: gather arguments into array
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// 5. Promises (Async flow control)
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
}

// Chaining
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 6. Classes (Prototype syntax sugar)
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // Static method
  static species() {
    return "Homo sapiens";
  }
}

class Developer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }
  
  code() {
    return `${this.name} codes in ${this.language}`;
  }
}

const dev = new Developer("Alex", "JavaScript");
dev.greet(); // "Hello, I'm Alex"
dev.code(); // "Alex codes in JavaScript"

// 7. Modules (Code organization)
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { /* ... */ }

// app.js
import Calculator, { PI, add } from './math.js';

// 8. Template Literals (String interpolation)
const name = "Alex";
const age = 30;
console.log(`Name: ${name}, Age: ${age}, Next year: ${age + 1}`);
// Multiline strings
const html = `
  <div>
    <h1>${name}</h1>
  </div>
`;

// 9. Enhanced Object Literals
const key = "dynamicKey";
const value = 42;
const obj = {
  key, // Shorthand property
  value,
  [key]: value, // Computed property
  method() { // Shorthand method
    return "Hello";
  }
};

// 10. Symbol (Unique identifier)
const uniqueKey = Symbol("description");
const obj = {
  [uniqueKey]: "private value",
  publicKey: "public value"
};
Object.keys(obj); // ["publicKey"] - Symbol is hidden
```

### **Post-ES6 Evolution (Yearly Releases)**
- **ES2016**: `Array.prototype.includes`, Exponentiation operator (`**`)
- **ES2017**: `async/await`, `Object.entries`, `Object.values`
- **ES2018**: Rest/Spread for objects, `Promise.prototype.finally`, `async` generators
- **ES2019**: `Array.prototype.flat`, `Object.fromEntries`, optional `catch` binding
- **ES2020**: `BigInt`, `Promise.allSettled`, `globalThis`, optional chaining (`?.`), nullish coalescing (`??`)
- **ES2021**: `String.prototype.replaceAll`, `Promise.any`, logical assignment operators
- **ES2022**: Top-level `await`, class fields, static blocks, error cause
- **ES2023**: `Array.prototype.findLast`, `toSpliced`, `toSorted` (immutable methods)
- **ES2024**: `Promise.withResolvers`, `Object.groupBy`, `Map.groupBy`

---

## 1.3 Where JavaScript Runs (The Runtime Ecosystem)

### **The JavaScript Engine (The Heart)**

A **JavaScript Engine** is a program that executes JavaScript code. It consists of:
- **Memory Heap**: Where objects are stored (dynamic allocation)
- **Call Stack**: Where function calls are tracked (LIFO structure)
- **Event Loop**: Handles asynchronous operations
- **Task Queues**: Macro & micro tasks

#### **Major Engines:**

| Engine | Developed By | Used In | Key Characteristics |
|--------|--------------|---------|---------------------|
| **V8** | Google | Chrome, Node.js, Edge, Opera | Fastest, JIT compilation, Hidden Classes |
| **SpiderMonkey** | Mozilla | Firefox | First JS engine (1995), IonMonkey JIT |
| **JavaScriptCore** | Apple | Safari | Also called Nitro, used in WebKit |
| **Chakra** | Microsoft | Legacy Edge | Replaced by V8 in new Edge (2020) |

### **V8 Engine Deep Dive (Interview Gold)**

**Fun Facts & Architecture:**

1. **Written in C++**: ~2 million lines of code
2. **Compilation Pipeline**:
   ```
   JavaScript → Ignition (Interpreter) → Bytecode → 
   Turbofan (Optimizer) → Optimized Machine Code → Execution
   ```
3. **Hidden Classes**: V8 creates hidden classes for objects with same structure for faster property access
4. **Inline Caching**: Remembers where properties are located to avoid repeated lookups
5. **Garbage Collection**: Generational GC (Young/Old generation), Orinoco collector

**Practical Implication:**
```javascript
// Fast code (same shape)
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4); // V8 reuses hidden class

// SLOW code (different shape)
const obj1 = { x: 1 };
obj1.y = 2; // Shape changes
const obj2 = { a: 1, b: 2 }; // Different hidden class
```

### **Runtime Environments**

#### **1. Browser Runtime**
Components:
- **JS Engine** (V8/SpiderMonkey)
- **Web APIs** (DOM, fetch, setTimeout, console, localStorage)
- **Event Loop & Callback Queue**
- **Render Thread** (for UI)

```javascript
// Browser-only APIs
document.getElementById('app'); // DOM API
setTimeout(() => {}, 1000); // Web API
fetch('https://api.example.com'); // Fetch API
localStorage.setItem('key', 'value'); // Storage API
```

#### **2. Node.js Runtime**
Components:
- **V8 Engine** (same as Chrome)
- **libuv**: Cross-platform async I/O library
- **Node Standard Library** (fs, http, path, etc.)
- **C++ Bindings**: For system-level operations

```javascript
// Node.js-only APIs
const fs = require('fs');
fs.readFileSync('file.txt', 'utf8');

const http = require('http');
http.createServer((req, res) => {
  res.end('Hello Node.js');
}).listen(3000);
```

**Key Difference**: Node.js doesn't have DOM APIs but has file system, networking, and process control.

---

## 1.4 What Can JavaScript Do? (The Capability Matrix)

### **1. DOM Manipulation** (Browser)
```javascript
// Create, read, update, delete HTML elements
const button = document.createElement('button');
button.textContent = "Click Me";
button.addEventListener('click', () => {
  document.body.style.background = "lightblue";
});
document.body.appendChild(button);
```

### **2. Asynchronous Programming**
```javascript
// Callbacks, Promises, async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
```

### **3. Server-Side Development** (Node.js)
```javascript
// Full REST API
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### **4. Mobile App Development**
```javascript
// React Native example
import React from 'react';
import { Text, View } from 'react-native';

const App = () => (
  <View>
    <Text>Hello from JavaScript on iOS/Android!</Text>
  </View>
);
```

### **5. Desktop App Development**
```javascript
// Electron example
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);
```

### **6. IoT & Embedded Systems**
```javascript
// Node.js on Raspberry Pi
const gpio = require('onoff').Gpio;
const led = new gpio(17, 'out');
led.writeSync(1); // Turn on LED
```

### **7. Machine Learning** (TensorFlow.js)
```javascript
// Client-side ML
import * as tf from '@tensorflow/tfjs';

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
```

### **8. Game Development**
```javascript
// Phaser.js game loop
function create() {
  this.player = this.physics.add.sprite(100, 100, 'player');
}

function update() {
  if (cursors.left.isDown) {
    this.player.setVelocityX(-160);
  }
}
```

---

## 1.5 Fun Facts About V8 Engine (Interview Icebreakers)

### **Performance Trivia**
1. **Startup Speed**: V8 can compile and execute JS faster than C++ can compile
2. **Optimization Levels**: Code gets "hot" (frequently used) → optimized → deoptimized if assumptions fail
3. **Memory Footprint**: V8 uses ~40-50MB per isolated instance
4. **Crankshaft → TurboFan**: V8 replaced its old optimizer (Crankshaft) with TurboFan in 2016 for better performance

### **Hidden Class Magic**
```javascript
// V8 creates hidden classes on-the-fly
function Point(x, y) {
  this.x = x; // HClass created: C0 → C1 (adds x)
  this.y = y; // HClass created: C1 → C2 (adds y)
}

const p1 = new Point(1, 2); // Instance uses C2
const p2 = new Point(3, 4); // Reuses C2 (fast!)

// Adding properties out-of-order creates different hidden classes
const p3 = new Point(5, 6);
p3.z = 7; // Creates new hidden class C3
```

### **Garbage Collection Facts**
- **Generational**: Objects survive 2 GC cycles get promoted to "Old Generation"
- **Orinoco**: Latest GC uses parallel, incremental, and concurrent techniques
- **Memory Pressure**: `global.gc()` in Node.js (with `--expose-gc` flag) forces GC

### **Bytecode Cache**
V8 caches compiled bytecode on disk (since Chrome 66) to speed up repeat visits.

---

## 1.6 console.log() - The Developer's Swiss Army Knife

### **Beyond Basic Logging**

```javascript
// 1. String substitution
console.log("User %s has %d items", "Alex", 5);

// 2. Styled logs
console.log("%cRed Alert!", "color: red; font-size: 20px; font-weight: bold");

// 3. Data tables
const users = [
  { id: 1, name: "Alex", role: "Dev" },
  { id: 2, name: "Bob", role: "Designer" }
];
console.table(users);

// 4. Grouping
console.group("User Details");
console.log("Name: Alex");
console.log("Age: 30");
console.groupEnd();

// 5. Timing
console.time("API Call");
fetch('https://api.example.com')
  .then(() => console.timeEnd("API Call")); // API Call: 123.456ms

// 6. Tracing
function a() { b(); }
function b() { console.trace("Trace here"); }
a();

// 7. Assertions
console.assert(1 === 2, "This will fail and log");

// 8. Counting
for(let i = 0; i < 3; i++) {
  console.count("Loop iteration");
}

// 9. Clearing
console.clear(); // Clears console

// 10. Object inspection
const complexObj = { 
  user: { name: "Alex", settings: { theme: "dark" } }
};
console.dir(complexObj, { depth: null, colors: true });
```

### **Interview Tip**
**Q**: What's the performance impact of `console.log()` in production?
**A**: 
- Synchronous I/O in Node.js (blocks event loop)
- No-op in browsers when DevTools closed, but string conversion still happens
- **Best Practice**: Use logging library (Winston, Pino) that can disable in production

```javascript
// Production-safe logging
const isDev = process.env.NODE_ENV === 'development';
const log = isDev ? console.log : () => {};
log("This won't run in production");
```

---

## 📚 Interview Cheat Sheet Summary (#interview-cheat-sheet-summary)

| Concept | Key Interview Point | Code Snippet |
|---------|---------------------|--------------|
| **JS Definition** | High-level, single-threaded, garbage-collected | `let obj = {x: 1}; obj = null; // GC'd` |
| **ES5** | Introduced strict mode, array methods | `arr.forEach(fn)`, `Object.defineProperty` |
| **ES6** | Block scope, classes, modules, promises | `let`, `const`, `import`, `async/await` |
| **V8 Engine** | JIT compiles, hidden classes, generational GC | `function Point(x, y) { this.x = x; this.y = y; }` |
| **Node.js** | V8 + libuv, server-side, no DOM | `fs.readFile()`, `http.createServer()` |
| **console.log()** | Use sparingly in production, has performance cost | `console.log("%cStyled", "color: red")` |

---

**Next Section Preview**: Section 2 will cover JavaScript Execution Context, Call Stack, and the Event Loop in deep detail.

[⬆ Go to top](#top)
# Chapter 2: Javascript Basics  <a id="chapter-2"></a>


- [Section 2: JavaScript Basics — Variables, Hoisting, Types, Arrays, Operators](#section-2)
  - [2.1 Variables](#2-1-variables)
  - [2.2 `var`, `let`, `const` — All Important Points](#2-2-var-let-const--all-important-points)
    - [2.2.1 `var`](#2-2-1-var)
    - [2.2.2 `let`](#2-2-2-let)
    - [2.2.3 `const`](#2-2-3-const)
  - [2.3 Hoisting](#2-3-hoisting)
    - [2.3.1 Hoisting with `var`](#2-3-1-hoisting-with-var)
    - [2.3.2 Hoisting with `let` and `const`](#2-3-2-hoisting-with-let-and-const)
    - [2.3.3 Function hoisting](#2-3-3-function-hoisting)
    - [2.3.4 Use case of hoisting](#2-3-4-use-case-of-hoisting)
  - [2.4 Scope](#2-4-scope)
  - [2.5 Declaration, Hoisting, Scope — Combined View](#2-5-declaration-hoisting-scope--combined-view)
  - [2.6 Built-in Types in JavaScript](#2-6-built-in-types-in-javascript)
  - [2.7 `null` vs `undefined`](#2-7-null-vs-undefined)
  - [2.8 Arrays in Detail](#2-8-arrays-in-detail)
    - [2.8.1 Array indexing](#2-8-1-array-indexing)
    - [2.8.2 `length` property](#2-8-2-length-property)
    - [2.8.3 Common Array Methods](#2-8-3-common-array-methods)
    - [2.8.4 Common array use cases](#2-8-4-common-array-use-cases)
  - [2.9 Comments in JavaScript](#2-9-comments-in-javascript)
  - [2.10 JavaScript Pros and Cons](#2-10-javascript-pros-and-cons)
  - [2.11 All Types of Operators](#2-11-all-types-of-operators)
  - [2.12 `==` vs `===`](#2-12--vs-)
  - [2.13 Combining Multiple Conditions](#2-13-combining-multiple-conditions)
  - [2.14 Increment and Decrement on Non-Numeric Values](#2-14-increment-and-decrement-on-non-numeric-values)
  - [2.15 Array Indexing — Important Notes](#2-15-array-indexing--important-notes)
  - [2.16 Array vs Object Quick Difference](#2-16-array-vs-object-quick-difference)
  - [2.17 Interview Cheat Sheet](#2-17-interview-cheat-sheet)
- [🚀 JavaScript Deep Dive Notes - Section 2: JavaScript Basics](#deep-dive-notes-section-2)
  - [📌 TOPIC 1: Variables & Declarations](#topic-1-variables--declarations)
  - [📌 TOPIC 2: Hoisting & Temporal Dead Zone](#topic-2-hoisting--temporal-dead-zone)
  - [📌 TOPIC 3: Scope](#topic-3-scope)
  - [📌 TOPIC 4: Data Types](#topic-4-data-types)
  - [📌 TOPIC 5: Arrays](#topic-5-arrays)
  - [📌 TOPIC 6: Operators](#topic-6-operators)
  - [📌 TOPIC 7: Comments](#topic-7-comments)
  - [📌 TOPIC 8: JS Pros/Cons](#topic-8-js-proscons)
  - [❌ Answers You Should Never Give In An Interview](#answers-you-should-never-give-in-an-interview)
  - [🔥 TOP 20 Interview Questions Mega-Cheat Sheet](#top-20-interview-questions-mega-cheat-sheet)

---

# Section 2: JavaScript Basics — Variables, Hoisting, Types, Arrays, Operators <a id="section-2"></a>

> Interview-focused notes with practical examples and common pitfalls

---

## 2.1 Variables <a id="2-1-variables"></a>

### What is a variable?
A **variable** is a named container used to store data in memory.

```javascript
let age = 25;
const name = "Alice";
var city = "Delhi";
```

### Variable lifecycle
1. **Declaration** — create a variable name
2. **Initialization** — assign first value
3. **Assignment** — change value later

```javascript
let score;        // declaration
score = 10;       // initialization
score = 20;       // assignment
```

### Why variables matter
- Store user input
- Hold API response data
- Keep state in apps
- Reuse values instead of repeating them

---

## 2.2 `var`, `let`, `const` — All Important Points <a id="2-2-var-let-const--all-important-points"></a>

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

### 2.2.1 `var` <a id="2-2-1-var"></a>
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

### 2.2.2 `let` <a id="2-2-2-let"></a>
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

### 2.2.3 `const` <a id="2-2-3-const"></a>
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

---

## 2.3 Hoisting <a id="2-3-hoisting"></a>

### What is hoisting?
Hoisting is JavaScript’s behavior of moving declarations to the top of their scope during compilation.

### Simple meaning
You can access some declarations before they appear in the code.

---

### 2.3.1 Hoisting with `var` <a id="2-3-1-hoisting-with-var"></a>
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

### 2.3.2 Hoisting with `let` and `const` <a id="2-3-2-hoisting-with-let-and-const"></a>
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

### 2.3.3 Function hoisting <a id="2-3-3-function-hoisting"></a>
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
**Hoisting is JavaScript’s mechanism where declarations are moved to the top of their scope.**
- `var` → hoisted and initialized as `undefined`
- `let`/`const` → hoisted but not initialized, so they are in TDZ
- function declarations → fully hoisted

---

### 2.3.4 Use case of hoisting <a id="2-3-4-use-case-of-hoisting"></a>
Hoisting is useful in function declarations when you want to organize code by putting helper functions later in the file.

```javascript
calculateTotal();

function calculateTotal() {
  console.log("Calculating...");
}
```

### Best practice
Do **not** rely on hoisting for variable usage. It makes code harder to read and debug.

---

## 2.4 Scope <a id="2-4-scope"></a>

### What is scope?
Scope decides where a variable can be accessed.

---

### Types of scope

#### 1. Global scope
Accessible everywhere in the file/module.

```javascript
let appName = "ShopApp";
```

#### 2. Function scope
Variables declared inside a function are available only inside that function.

```javascript
function test() {
  var x = 10;
  console.log(x);
}
```

#### 3. Block scope
Variables declared inside `{}` are only accessible inside that block.

```javascript
if (true) {
  let y = 20;
  const z = 30;
}
```

#### 4. Lexical scope
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

---

## 2.5 Declaration, Hoisting, Scope — Combined View <a id="2-5-declaration-hoisting-scope--combined-view"></a>

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

---

## 2.6 Built-in Types in JavaScript <a id="2-6-built-in-types-in-javascript"></a>

JavaScript has **primitive types** and **reference types**.

---

### 2.6.1 Primitive types
These are immutable values:

1. `number`
2. `string`
3. `boolean`
4. `null`
5. `undefined`
6. `bigint`
7. `symbol`

---

### 2.6.2 Reference types
These are objects:

- `object`
- `array`
- `function`
- `Date`
- `RegExp`

---

### 2.6.3 Types you asked for

#### `number`
Used for integers and decimals.

```javascript
let price = 99.99;
let count = 10;
```

**Important points**
- All numbers are floating-point based (`IEEE 754`)
- `NaN` means “Not a Number” but its type is still `"number"`

```javascript
console.log(typeof NaN); // number
```

---

#### `string`
Used for text.

```javascript
let firstName = "John";
let message = 'Hello';
let quote = `Hi ${firstName}`;
```

**Important points**
- Strings are immutable
- Template literals use backticks

```javascript
let str = "hello";
str[0] = "H"; // does not change original string
console.log(str); // hello
```

---

#### `boolean`
Only two values:
- `true`
- `false`

```javascript
let isLoggedIn = true;
```

Used heavily in conditions and feature flags.

---

#### `null`
Represents an intentional empty value.

```javascript
let user = null;
```

**Important points**
- Means “nothing here on purpose”
- Often used to reset a variable
- `typeof null` is `"object"` — this is a long-standing JavaScript bug

```javascript
console.log(typeof null); // object
```

---

#### `undefined`
Means a value has not been assigned yet.

```javascript
let x;
console.log(x); // undefined
```

Also returned when accessing missing object properties.

```javascript
let obj = {};
console.log(obj.name); // undefined
```

---

#### `object`
Used for key-value data structures.

```javascript
let person = {
  name: "Alex",
  age: 25
};
```

Objects are mutable and commonly used for API data, configs, and structured records.

---

#### `array`
Arrays are ordered lists of values.

```javascript
let fruits = ["apple", "banana", "mango"];
```

**Important point:** Arrays are actually objects.

```javascript
console.log(typeof fruits); // object
console.log(Array.isArray(fruits)); // true
```

---

## 2.7 `null` vs `undefined` <a id="2-7-null-vs-undefined"></a>

This is a very common interview question.

| Feature | `null` | `undefined` |
|---|---|---|
| Meaning | Intentionally empty | Not assigned / missing |
| Set by | Developer | JavaScript engine or missing assignment |
| Type | object (bug) | undefined |
| Use case | Reset a value | Variable declared but not assigned |

### Example
```javascript
let a;
let b = null;

console.log(a); // undefined
console.log(b); // null
```

---

## 2.8 Arrays in Detail <a id="2-8-arrays-in-detail"></a>

### What is an array?
An array stores multiple values in one variable, in order.

```javascript
const colors = ["red", "green", "blue"];
```

---

### Array key features
- Zero-based indexing
- Dynamic size
- Can store mixed data types
- Arrays are objects
- Have many built-in methods

```javascript
const mixed = [1, "hello", true, null, { id: 1 }];
```

---

### 2.8.1 Array indexing <a id="2-8-1-array-indexing"></a>
Arrays start at index `0`.

```javascript
const nums = [10, 20, 30];
console.log(nums[0]); // 10
console.log(nums[1]); // 20
console.log(nums[2]); // 30
```

Out of bounds gives `undefined`:

```javascript
console.log(nums[5]); // undefined
```

Negative indexing does **not** work like Python:

```javascript
console.log(nums[-1]); // undefined
```

Use `at()` if available:

```javascript
console.log(nums.at(-1)); // 30
```

---

### 2.8.2 `length` property <a id="2-8-2-length-property"></a>
`length` is a **property**, not a function.

```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

#### Important points
- `length` is always one more than the highest index
- Changing `length` can shrink or expand the array

```javascript
const a = [1, 2, 3, 4];
a.length = 2;
console.log(a); // [1, 2]
```

Expanding creates empty slots:

```javascript
const b = [1, 2];
b.length = 5;
console.log(b); // [1, 2, empty × 3]
```

---

## 2.8.3 Common Array Methods <a id="2-8-3-common-array-methods"></a>

Below are the most important array methods for interviews and practical coding.

---

### A. Methods that mutate the original array

#### `push()`
Adds item(s) to the end.

```javascript
const arr = [1, 2];
arr.push(3);
console.log(arr); // [1, 2, 3]
```

#### `pop()`
Removes the last item.

```javascript
const arr = [1, 2, 3];
arr.pop();
console.log(arr); // [1, 2]
```

#### `unshift()`
Adds item(s) to the start.

```javascript
const arr = [2, 3];
arr.unshift(1);
console.log(arr); // [1, 2, 3]
```

#### `shift()`
Removes the first item.

```javascript
const arr = [1, 2, 3];
arr.shift();
console.log(arr); // [2, 3]
```

#### `splice()`
Adds/removes/replaces items at any position.

```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 2, "A", "B");
console.log(arr); // [1, "A", "B", 4]
```

#### `sort()`
Sorts items in place.

```javascript
const nums = [10, 2, 5];
nums.sort();
console.log(nums); // [10, 2, 5]  (string sorting)
```

Proper numeric sort:

```javascript
nums.sort((a, b) => a - b);
console.log(nums); // [2, 5, 10]
```

#### `reverse()`
Reverses the array in place.

```javascript
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

#### `fill()`
Fills array with a static value.

```javascript
const arr = new Array(3).fill(0);
console.log(arr); // [0, 0, 0]
```

#### `copyWithin()`
Copies part of the array into another location.

```javascript
const arr = [1, 2, 3, 4];
arr.copyWithin(1, 3);
console.log(arr); // [1, 4, 3, 4]
```

---

### B. Methods that do not mutate the original array

#### `slice()`
Returns a shallow copy of part of the array.

```javascript
const arr = [1, 2, 3, 4];
const part = arr.slice(1, 3);
console.log(part); // [2, 3]
console.log(arr);  // unchanged
```

#### `concat()`
Combines arrays.

```javascript
const a = [1, 2];
const b = [3, 4];
console.log(a.concat(b)); // [1, 2, 3, 4]
```

#### `join()`
Converts array elements to a string.

```javascript
const arr = ["a", "b", "c"];
console.log(arr.join("-")); // a-b-c
```

#### `includes()`
Checks if a value exists.

```javascript
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
```

#### `indexOf()`
Returns index of first match.

```javascript
console.log([1, 2, 3].indexOf(2)); // 1
```

#### `lastIndexOf()`
Returns last index of match.

```javascript
console.log([1, 2, 2, 3].lastIndexOf(2)); // 2
```

#### `at()`
Supports negative indexing.

```javascript
const arr = [10, 20, 30];
console.log(arr.at(-1)); // 30
```

---

### C. Iteration methods

#### `forEach()`
Runs a function for each item.

```javascript
[1, 2, 3].forEach(n => console.log(n));
```

#### `map()`
Transforms each item and returns a new array.

```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

#### `filter()`
Keeps items that match a condition.

```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

#### `reduce()`
Combines array values into one result.

```javascript
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 10
```

#### `some()`
Checks whether at least one item matches.

```javascript
const hasEven = [1, 3, 5, 6].some(n => n % 2 === 0);
console.log(hasEven); // true
```

#### `every()`
Checks whether all items match.

```javascript
const allPositive = [1, 2, 3].every(n => n > 0);
console.log(allPositive); // true
```

#### `find()`
Returns first matching item.

```javascript
const users = [{ id: 1 }, { id: 2 }];
console.log(users.find(u => u.id === 2)); // { id: 2 }
```

#### `findIndex()`
Returns index of first matching item.

```javascript
console.log(users.findIndex(u => u.id === 2)); // 1
```

#### `findLast()` and `findLastIndex()`
Search from the end.

```javascript
const arr = [1, 2, 3, 2];
console.log(arr.findLast(n => n === 2)); // 2
console.log(arr.findLastIndex(n => n === 2)); // 3
```

---

### D. Array creation methods

#### `Array.isArray()`
Checks whether value is an array.

```javascript
Array.isArray([]); // true
Array.isArray({}); // false
```

#### `Array.from()`
Creates an array from iterable or array-like values.

```javascript
Array.from("hello"); // ["h", "e", "l", "l", "o"]
```

#### `Array.of()`
Creates an array from arguments.

```javascript
Array.of(5); // [5]
Array.of(1, 2, 3); // [1, 2, 3]
```

---

## 2.8.4 Common array use cases <a id="2-8-4-common-array-use-cases"></a>

### 1. Storing lists
```javascript
const todos = ["study", "exercise", "sleep"];
```

### 2. Rendering UI
```javascript
const items = ["A", "B", "C"];
items.map(item => `<li>${item}</li>`);
```

### 3. Processing API data
```javascript
const users = [
  { name: "A", active: true },
  { name: "B", active: false }
];

const activeUsers = users.filter(user => user.active);
```

### 4. Aggregating values
```javascript
const cart = [100, 200, 300];
const total = cart.reduce((sum, price) => sum + price, 0);
```

---

## 2.9 Comments in JavaScript <a id="2-9-comments-in-javascript"></a>

Comments are used to explain code and improve readability.

---

### 1. Single-line comments
```javascript
// This is a single-line comment
let x = 10;
```

### 2. Multi-line comments
```javascript
/*
  This is a multi-line comment
  Useful for longer explanations
*/
```

### 3. JSDoc comments
Used for documentation and editor hints.

```javascript
/**
 * Adds two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

### Best practices
- Use comments to explain **why**, not obvious **what**
- Avoid outdated comments
- Remove commented-out dead code

---

## 2.10 JavaScript Pros and Cons <a id="2-10-javascript-pros-and-cons"></a>

### Pros

#### 1. Runs everywhere
Works in browsers and on servers.

#### 2. Easy to learn and start
Simple syntax and immediate feedback.

#### 3. Huge ecosystem
NPM has millions of packages.

#### 4. Great for web development
Best language for interactive UI.

#### 5. Full-stack capability
Same language for frontend and backend.

#### 6. Async support
Excellent for event-driven applications.

---

### Cons

#### 1. Dynamic typing can cause bugs
```javascript
"5" + 1; // "51"
"5" - 1; // 4
```

#### 2. Type coercion can be confusing
```javascript
[] == false; // true
```

#### 3. Single-threaded
Heavy CPU work can block the UI or event loop.

#### 4. Browser differences existed historically
Modern engines are much more consistent, but legacy issues remain in older environments.

#### 5. Security risks in browser context
Code runs on the client side and can be inspected.

---

## 2.11 All Types of Operators <a id="2-11-all-types-of-operators"></a>

Operators perform operations on values.

---

### 2.11.1 Arithmetic operators
- `+` addition
- `-` subtraction
- `*` multiplication
- `/` division
- `%` modulus
- `**` exponentiation

```javascript
10 + 5;  // 15
10 % 3;  // 1
2 ** 3;  // 8
```

---

### 2.11.2 Assignment operators
- `=`
- `+=`
- `-=`
- `*=`
- `/=`
- `%=`
- `**=`

```javascript
let x = 10;
x += 5; // 15
```

---

### 2.11.3 Comparison operators
- `==` loose equality
- `===` strict equality
- `!=`
- `!==`
- `>`
- `<`
- `>=`
- `<=`

```javascript
5 > 3; // true
5 <= 5; // true
```

---

### 2.11.4 Logical operators
- `&&` AND
- `||` OR
- `!` NOT
- `??` nullish coalescing

```javascript
true && false; // false
true || false; // true
!true; // false
```

---

### 2.11.5 Unary operators
- `typeof`
- `delete`
- `void`
- `++`
- `--`
- unary `+`
- unary `-`

```javascript
typeof 5; // "number"
+ "10";   // 10
- "10";   // -10
```

---

### 2.11.6 Bitwise operators
- `&`
- `|`
- `^`
- `~`
- `<<`
- `>>`
- `>>>`

Used in low-level operations, flags, and performance-sensitive logic.

```javascript
5 & 1; // 1
5 | 1; // 5
```

---

### 2.11.7 Ternary operator
A short form of `if-else`.

```javascript
const result = age >= 18 ? "Adult" : "Minor";
```

---

### 2.11.8 Comma operator
Evaluates multiple expressions, returns the last one.

```javascript
let x = (1, 2, 3);
console.log(x); // 3
```

Rarely used.

---

### 2.11.9 Optional chaining
Useful when nested objects may be missing.

```javascript
user.profile?.address?.city;
```

---

### 2.11.10 `in` operator
Checks whether a property exists in an object.

```javascript
const obj = { name: "Alex" };
console.log("name" in obj); // true
```

---

## 2.12 `==` vs `===` <a id="2-12--vs-"></a>

This is a very common interview question.

---

### `==` loose equality
Compares values after type conversion.

```javascript
"5" == 5; // true
0 == false; // true
null == undefined; // true
```

### `===` strict equality
Compares both value and type.

```javascript
"5" === 5; // false
0 === false; // false
null === undefined; // false
```

---

### Why `===` is preferred
Because it avoids unexpected type coercion.

```javascript
[] == false; // true
[] === false; // false
```

### Best practice
Use `===` in almost all cases.

---

## 2.13 Combining Multiple Conditions <a id="2-13-combining-multiple-conditions"></a>

JavaScript uses logical operators to combine conditions.

---

### 1. AND `&&`
Both conditions must be true.

```javascript
if (age >= 18 && hasId) {
  console.log("Allowed");
}
```

### 2. OR `||`
At least one condition must be true.

```javascript
if (isAdmin || isOwner) {
  console.log("Access granted");
}
```

### 3. NOT `!`
Reverses the boolean value.

```javascript
if (!isLoggedIn) {
  console.log("Please login");
}
```

---

### Short-circuit behavior

#### `&&`
Stops as soon as one value is false.

```javascript
false && console.log("Won't run");
```

#### `||`
Stops as soon as one value is true.

```javascript
true || console.log("Won't run");
```

---

### Practical use cases

#### Form validation
```javascript
if (email && password && password.length >= 8) {
  console.log("Valid input");
}
```

#### Default values
```javascript
const username = inputValue || "Guest";
```

#### Better default for `null` or `undefined`
```javascript
const username = inputValue ?? "Guest";
```

---

### Important: `||` vs `??`
- `||` treats `false`, `0`, `""`, `NaN` as fallback cases
- `??` only treats `null` and `undefined` as fallback cases

```javascript
0 || 10;   // 10
0 ?? 10;   // 0
```

---

## 2.14 Increment and Decrement on Non-Numeric Values <a id="2-14-increment-and-decrement-on-non-numeric-values"></a>

`++` and `--` convert the value to a number first.

---

### Important: literals like `null++` are invalid
This is because you cannot increment a literal directly.

```javascript
// null++; // SyntaxError
```

But if stored in a variable:

```javascript
let x = null;
x++;
console.log(x); // 1
```

### Why?
Because:
- `null` becomes `0`
- then `0 + 1 = 1`

---

### Conversion examples

```javascript
let a = "5";
a++;
console.log(a); // 6

let b = true;
b++;
console.log(b); // 2

let c = undefined;
c++;
console.log(c); // NaN

let d = "hello";
d++;
console.log(d); // NaN
```

---

### More examples
```javascript
let e = [];
e++;
console.log(e); // 1

let f = [1];
f++;
console.log(f); // 2
```

---

### Postfix vs prefix

#### Postfix
Returns old value first, then increments.

```javascript
let n = 5;
console.log(n++); // 5
console.log(n);   // 6
```

#### Prefix
Increments first, then returns new value.

```javascript
let m = 5;
console.log(++m); // 6
console.log(m);   // 6
```

---

### Interview advice
Do **not** use `++` or `--` on non-numeric values in real projects. It leads to confusing coercion bugs.

---

## 2.15 Array Indexing — Important Notes <a id="2-15-array-indexing--important-notes"></a>

### Zero-based indexing
First item is at index `0`.

```javascript
const arr = ["a", "b", "c"];
console.log(arr[0]); // "a"
console.log(arr[2]); // "c"
```

### Updating by index
```javascript
arr[1] = "x";
console.log(arr); // ["a", "x", "c"]
```

### Reading out of range
```javascript
console.log(arr[100]); // undefined
```

### Negative index
Not supported with standard bracket syntax:

```javascript
console.log(arr[-1]); // undefined
```

Use `.at(-1)` instead:

```javascript
console.log(arr.at(-1)); // "c"
```

---

## 2.16 Array vs Object Quick Difference <a id="2-16-array-vs-object-quick-difference"></a>

| Feature | Array | Object |
|---|---|---|
| Purpose | Ordered list | Key-value data |
| Access | Index-based | Key-based |
| Order | Yes | Usually insertion order, but not for all cases |
| Example | `["a", "b"]` | `{ name: "Alex" }` |

---

## 2.17 Interview Cheat Sheet <a id="2-17-interview-cheat-sheet"></a>

### Variables
- Prefer `const`
- Use `let` when reassignment is needed
- Avoid `var` in modern code

### Hoisting
- `var` → `undefined`
- `let/const` → TDZ
- function declarations are hoisted

### Types
- Primitives: number, string, boolean, null, undefined, bigint, symbol
- Arrays are objects
- `typeof null` is `"object"`

### Arrays
- Zero-based
- `length` is a property
- Use `Array.isArray()` to check arrays
- Learn `push`, `pop`, `map`, `filter`, `reduce`, `slice`, `splice`

### Operators
- Use `===` instead of `==`
- Use `&&`, `||`, `??` carefully
- Be aware of type coercion

### Increment/decrement
- Works on variables holding numeric-like values
- Avoid on strings/objects/non-numeric values

# 🚀 JavaScript Deep Dive Notes - Section 2: JavaScript Basics <a id="deep-dive-notes-section-2"></a>
## ✅ Fully Merged Final Version | 100% Interview Optimized

> This document combines the best parts of both drafts, all duplicates removed, ordered by interview frequency.
>
> Includes: official accepted answer ✅, runnable code example 🧪, output, gotchas ⚠️, and why interviewers ask this question.
>
> 🎯 Study Hack: Cover the answer, predict output, then verify. Practice explaining every answer out loud in 30 seconds or less.

| 🔥 Frequency Rating | Meaning |
|---|---|
| 🟢 99% | Asked at nearly every JavaScript interview |
| 🟡 70% | Very common question |
| 🟠 40% | Moderately common |
| 🔴 20% | Occasional trick question |


---

## 📌 TOPIC 1: Variables & Declarations <a id="topic-1-variables--declarations"></a>


---

### ❓ Question: Explain the difference between `var`, `let` and `const`
🔥 Frequency: 🟢 99%

✅ Standard accepted answer:
| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope Rule | Function scoped only | Block scoped | Block scoped |
| Hoisting behavior | Yes, initialized to `undefined` | Yes, stays in Temporal Dead Zone | Yes, stays in Temporal Dead Zone |
| Can be redeclared in same scope | ✅ Yes | ❌ No | ❌ No |
| Can be reassigned | ✅ Yes | ✅ Yes | ❌ No |
| Attaches to global `window` object | ✅ Yes | ❌ No | ❌ No |

> Additional note: `let` and `const` were added in ES6 specifically to fix the well known design flaws in `var`.

✅ Industry Best Practice: Use `const` by default for all variables. Only use `let` when you explicitly need to reassign a value. Never use `var` in modern code.

🧪 Code example:
```javascript
var g1 = 1; console.log(window.g1); // 1
let g2 = 2; console.log(window.g2); // undefined
```

⚠️ Gotcha: `const` does NOT make values immutable, only prevents reassignment.


---

### ❓ Question: Explain the famous loop timeout example. Why is the output different?
🔥 Frequency: 🟢 99%
> #1 most asked junior JavaScript question of all time.

🧪 Code:
```javascript
for(var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3
```
```javascript
for(let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2
```

✅ Correct Answer:
This is the classic demonstration of block scope vs function scope:
- In the first case `var i` is function scoped. There is only one single `i` variable shared by all 3 callbacks. By the time the timeout runs, the loop has already finished and `i` is already 3.
- In the second case `let i` is block scoped. A brand new separate `i` variable is created for every single iteration of the loop. Each callback gets its own private copy.

Why asked: Tests understanding of scope, closures and the event loop.


---

### ❓ Question: Does `const` make a value immutable?
🔥 Frequency: 🟢 99%
> ⚠️ 60% of candidates answer this incorrectly

✅ Correct Answer:
**No.** This is the single biggest misconception about const.
`const` only creates an immutable binding. That means you cannot reassign the variable name to point to a different value.
But if the value itself is mutable like an object or array, you can still freely modify its contents.

🧪 Code example:
```javascript
const user = {name: "Alex"};
user.name = "Bob"; // ✅ ALLOWED: This is mutation, NOT reassignment
user = {};         // ❌ TYPE ERROR: This is reassignment

const arr = [1];
arr.push(2);       // ✅ [1, 2] Mutation allowed
arr = [3];         // ❌ Error Reassignment blocked
```


---

### Common edge case questions
🔥 Frequency: 🟡 70%

| Code | Output | Explanation |
|---|---|---|
| `var x=1; var x=2; console.log(x)` | `2` | var allows silent redeclaration |
| `let x=1; let x=2;` | `SyntaxError` | let / const blocks redeclaration |
| `for(const i=0;i<3;i++){}` | `TypeError` | Loop counter requires reassignment |
| `switch` statement `var` | ✅ Leaks across all cases | var ignores block scope |


---

## 📌 TOPIC 2: Hoisting & Temporal Dead Zone <a id="topic-2-hoisting--temporal-dead-zone"></a>


---

### ❓ Question: Are `let` and `const` hoisted?
🔥 Frequency: 🟢 99%
> ⚠️ #1 filter question. 75% of all candidates give the wrong answer here.

❌ Wrong answer: No
✅ Correct Answer:
**Yes. All declarations in JavaScript are hoisted, including let and const.**
The only difference is initialization behavior:
- `var` is hoisted and immediately initialized to `undefined`
- `let` and `const` are hoisted, but they are NOT initialized. They remain in the Temporal Dead Zone until execution reaches the line they are declared on. Any attempt to access them while in TDZ throws a ReferenceError.

🧪 Code demonstration:
```javascript
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```


---

### ❓ Question: What is hoisting?
🔥 Frequency: 🟢 99%

✅ Standard accepted answer:
Hoisting is a phase of JavaScript compilation where all declarations are registered at the top of their scope, before any line of code is executed. JavaScript always runs in two phases: Compile phase first, then Execution phase.

Hoisting order priority:
1. Function Declarations (fully hoisted)
2. `var` declarations
3. `let` / `const` declarations


---

### ❓ Question: What is the difference between function declaration and function expression hoisting?
🔥 Frequency: 🟡 70%

✅ Correct Answer:
```javascript
// Function Declaration
hello(); // ✅ Works perfectly
function hello() { console.log("hi") }
```
Function declarations are fully hoisted, including their actual value.

```javascript
// Function Expression
greet(); // ❌ TypeError: greet is not a function
var greet = function() {}
```
Only the variable part is hoisted, the function value itself is not.

✅ Valid use case for hoisting: Call helper functions before their definition to improve code readability.


---

## 📌 TOPIC 3: Scope <a id="topic-3-scope"></a>


---

### ❓ Question: What are the 4 types of scope in JavaScript?
🔥 Frequency: 🟡 70%
✅ Answer: Global Scope, Module Scope, Function Scope, Block Scope

### ❓ Question: Explain lexical scope
🔥 Frequency: 🟡 70%
✅ Answer: Inner functions always have access to variables declared in outer scopes. This is the foundation of closures.

🧪 Code example:
```javascript
function outer(x){
  return function inner(){ return x; }
}
const fn = outer(10);
fn(); // 10
```

Common use cases: Private state, counters, callbacks.


---

## 📌 TOPIC 4: Data Types <a id="topic-4-data-types"></a>


---

### ❓ Question: What is the difference between `null` and `undefined`?
🔥 Frequency: 🟢 99%
> Asked in literally every JavaScript interview ever.

✅ Correct Answer:

| | `null` | `undefined` |
|---|---|---|
| Meaning | Intentionally empty value | Value was never assigned / does not exist |
| Set by | Always explicitly set by developer | Always set automatically by JavaScript engine |
| `typeof` result | `"object"` (famous 28 year old unfixed language bug) | `"undefined"` |

> Best Practice: Use `null` when you want to intentionally clear or reset a value. Never intentionally assign `undefined` in your code.


---

### ❓ Question: How do you properly check if a value is an array?
🔥 Frequency: 🟢 99%

✅ Correct Answer: `Array.isArray(value)`

❌ All common wrong answers:
- `typeof value === 'object'` ❌ returns true for objects, dates, regex etc
- `value instanceof Array` ❌ fails across iframe / realm boundaries

> Important note: Arrays are a special subtype of object. That is why `typeof []` returns `"object"`. This is the most common mistake junior developers make.


---

### ❓ Question: Primitive vs Reference types
🔥 Frequency: 🟡 70%
✅ Answer:
- Primitives: passed and copied by value, immutable
- References: passed and copied by pointer, mutable

Complete list of 7 primitive types:
`number`, `string`, `boolean`, `null`, `undefined`, `bigint`, `symbol`


---

## 📌 TOPIC 5: Arrays <a id="topic-5-arrays"></a>


---

### ❓ Question: Which array methods mutate the original array, and which return a new array?
🔥 Frequency: 🟡 70%

✅ Memorize this table:
| ❌ Mutates original array | ✅ Returns new array |
|---|---|
| `push()`, `pop()` | `slice()` |
| `unshift()`, `shift()` | `map()` |
| `splice()` | `filter()` |
| `sort()` | `reduce()` |
| `reverse()` | `concat()` |
| `fill()` | `includes()`, `find()` |

> ⚠️ Interviewer Trap: Almost every candidate forgets that `sort()` and `reverse()` mutate the array. This is also the #1 cause of subtle production bugs.


---

### ❓ Question: Explain common array indexing edge cases
🔥 Frequency: 🟠 40%

| Code | Output | Explanation |
|---|---|---|
| `[1,2,3][5]` | `undefined` | Out of bounds index never throws an error |
| `[1,2,3][-1]` | `undefined` | Bracket syntax does NOT support negative indexing |
| `[1,2,3].at(-1)` | `3` | `at()` added in ES2022 properly supports negative index |
| `const arr = []; arr[10] = 5; arr.length` | `11` | Array length is always highest index + 1 |


---

### Most common array method questions
🔥 Frequency: 🟡 70%

✅ Holy trinity of iteration:
```javascript
[1,2,3]
 .map(x => x * 2)                         // [2,4,6] Transform
 .filter(x => x > 3)                      // [4,6] Select
 .reduce((sum, n) => sum + n, 0);         // 10 Aggregate
```

⚠️ `sort()` pitfall:
```javascript
[40, 100, 2].sort()                      // [100, 2, 40] ❌ Default string sort
[40, 100, 2].sort((a,b) => a - b)        // [2, 40, 100] ✅ Correct numeric sort
```


---

## 📌 TOPIC 6: Operators <a id="topic-6-operators"></a>


---

### ❓ Question: What is the difference between `==` and `===` ?
🔥 Frequency: 🟢 99%

✅ Standard accepted answer:
- `==` loose equality: It will automatically convert both sides to the same type first, then compare only the value
- `===` strict equality: It compares both value AND type. No automatic type conversion is performed.

✅ Best Practice: Always use `===` in all code. The only widely accepted exception is `x == null` which conveniently checks for both null AND undefined in one operation.


---

### ❓ Question: Famous trick question: What is the output and why?
🔥 Frequency: 🟡 70%
```javascript
console.log([] == ![]);
```

🤯 Output: `true`

✅ Correct Answer:
This is the most famous demonstration of broken type coercion rules. This is exactly the reason we almost always avoid using `==`. The coercion rules produce completely unintuitive results that no reasonable developer would expect.


---

### ❓ Question: What is the difference between `||` and `??` operators?
🔥 Frequency: 🟢 99%
> Most asked operator question added after ES2020

✅ Correct Answer:
- `||` OR operator falls back on ANY falsy value: `false`, `0`, `""`, `NaN`, `null`, `undefined`
- `??` Nullish coalescing operator falls back ONLY on `null` and `undefined`

Direct comparison:
| Code | `||` result | `??` result |
|---|---|---|
| `0 || 10` | `10` | `0` |
| `"" || "default"` | `"default"` | `""` |
| `false || true` | `true` | `false` |
| `null || 10` | `10` | `10` |

✅ Best Practice: Use `??` for default values. Use `||` only when you explicitly want to fallback on empty string, zero and false.


---

### ❓ Question: Explain increment operator behavior on non numeric values
🔥 Frequency: 🟡 70%

✅ Rule: `++` and `--` always convert the value to number first. Also you can only increment variables, not literals.

| Code | Output |
|---|---|
| ```let x = null; x++;``` | `1` |
| ```let x = true; x++;``` | `2` |
| ```let x = false; x++;``` | `1` |
| ```let x = "5"; x++;``` | `6` |
| ```let x = undefined; x++;``` | `NaN` |
| ```null++``` | SyntaxError |

✅ Best Practice: Never ever use the increment operator on non numeric values in real code. This feature exists only for interview trick questions.


---

### ❓ Question: What is the difference between prefix `++` and postfix `++` ?
🔥 Frequency: 🟡 70%

✅ Correct Answer:
```javascript
let a = 5;
console.log(a++); // 5  -> Postfix: returns old value first, then increments
console.log(a);   // 6

let b = 5;
console.log(++b); // 6  -> Prefix: increments first, then returns new value
console.log(b);   // 6
```


---

### ❓ Question: Explain short circuit behavior of logical operators
🔥 Frequency: 🟡 70%

✅ Correct Answer:
- `&&` stops evaluation immediately as soon as it finds the first falsy value
- `||` stops evaluation immediately as soon as it finds the first truthy value

Code example:
```javascript
false && console.log("This will never run");
true || console.log("This will never run");
```


---

## 📌 TOPIC 7: Comments <a id="topic-7-comments"></a>
### ❓ Question: Types and best practice?
🔥 Frequency: 🟠 40%
✅ **// /** /* */ /**JSDoc */**. WHY not WHAT. No dead code/JSDoc types.

## 📌 TOPIC 8: JS Pros/Cons <a id="topic-8-js-proscons"></a>
### ❓ Question: Top pros/cons + fixes?
🔥 Frequency: 🟡 70%
✅ **Pros**: Everywhere/ecosystem/async. **Cons**: Typing(TS)/coerce(===)/thread(Workers).

---

## ❌ Answers You Should Never Give In An Interview <a id="answers-you-should-never-give-in-an-interview"></a>
These are extremely common wrong answers that will immediately get you rejected:
1. ❌ "let and const are not hoisted"
2. ❌ "const makes objects immutable"
3. ❌ "`==` is always evil and has zero valid use cases"
4. ❌ "Arrays are not objects"
5. ❌ "JavaScript is purely interpreted"


---

## 🔥 TOP 20 Interview Questions Mega-Cheat Sheet <a id="top-20-interview-questions-mega-cheat-sheet"></a>
Drill these until you can answer them instantly:

1. Hoisting `var/let` output? → `undefined` / ReferenceError
2. Loop setTimeout fix? → use `let`
3. const mutate objects? → Yes
4. `typeof null`? → `"object"` ancient bug
5. `[] == false`? → true
6. Complete list of falsy values? → 6 items
7. Correct numeric array sort? → `.sort((a,b) => a-b)`
8. `let n=null; n++`? → 1
9. Array check? → `Array.isArray()`
10. `||` vs `??` on 0? → `??` preserves 0
11. Global `let` on window? → No
12. TDZ definition? → `let/const` pre-declaration zone
13. `NaN === NaN`? → false
14. `at(-1)` use? → Get last array element
15. Which methods mutate array? → push / sort / reverse / splice
16. `x == null` checks for? → both null AND undefined
17. Closure counter pattern? → return inner function
18. Variable shadowing? → inner blocks hide outer variables
19. `var` scope rule? → function scope only
20. Function expression vs declaration hoisting? → only declarations are fully hoisted


---

> 🎯 Final Note:
> If you can confidently answer every single question on this page, you will get 100% of the points for Section 2 topics in any JavaScript interview. There are no other common questions on these topics.

---
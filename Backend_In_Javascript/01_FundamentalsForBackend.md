
# JavaScript Fundamental Notes (Backend Focus)

> 📚 **Resource Note:** Throughout these notes, key concepts are linked to [MDN Web Docs](https://developer.mozilla.org/en-US/) or official specifications for deeper reading.

---

<a id="toc"></a>
## Table of Contents

1. [Scope & Closures](#scope-closures)
2. [Hoisting](#hoisting)
3. [`this` Keyword](#this-keyword)
4. [Callbacks](#callbacks)
5. [Promises](#promises)
6. [Async/Await](#async-await)
7. [Error Handling (try/catch)](#error-handling)
8. [Event Loop](#event-loop)
9. [Prototypes & Inheritance](#prototypes)
10. [Modules (CommonJS & ESM)](#modules)
11. [Destructuring & Spread/Rest](#destructuring)
12. [Array Methods](#array-methods)
13. [Arrow Functions vs Regular Functions](#arrow-functions)

---

<a id="scope-closures"></a>
## 1. Scope & Closures

### What is Scope?
[**Scope**](https://developer.mozilla.org/en-US/docs/Glossary/Scope) determines the **visibility/accessibility** of variables in different parts of your code.

### Types of Scope

```javascript
// ========== Global Scope ==========
var globalVar = "I am global";

function demo() {
  // ========== Function Scope ==========
  var functionVar = "I am function-scoped";
  
  if (true) {
    // ========== Block Scope ==========
    let blockVar = "I am block-scoped";
    const blockConst = "Me too";
    
    console.log(globalVar);      // ✅ Accessible
    console.log(functionVar);    // ✅ Accessible
    console.log(blockVar);       // ✅ Accessible
  }
  
  console.log(globalVar);        // ✅ Accessible
  console.log(functionVar);      // ✅ Accessible
  console.log(blockVar);         // ❌ ReferenceError
}

console.log(globalVar);          // ✅ Accessible
console.log(functionVar);        // ❌ ReferenceError
```

### var vs let vs const (Scope Difference)

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function ([`Function Scope`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_scope)) | Block ([`Block Scope`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)) | Block |
| Re-declare | ✅ Yes | ❌ No | ❌ No |
| Re-assign | ✅ Yes | ✅ Yes | ❌ No |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |

```javascript
// var — function scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 — leaks out of block
}

// let — block scoped
function letExample() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ❌ ReferenceError
}
```

### Lexical Scope (Static Scope)
JavaScript uses **lexical scoping** — scope is determined by where functions are **written** in the code, not where they are **called**. ([Source: MDN Scopes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures))

```javascript
const outerVar = "outer";

function outer() {
  const middleVar = "middle";
  
  function inner() {
    const innerVar = "inner";
    console.log(outerVar);   // ✅ — looks up the scope chain
    console.log(middleVar);  // ✅
    console.log(innerVar);   // ✅
  }
  
  inner();
}

outer();
```

### What is a Closure?
A [**closure**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) is a function that **remembers** the variables from its outer (enclosing) scope **even after the outer function has finished executing**.

```javascript
function createCounter() {
  let count = 0;  // "private" variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is NOT directly accessible — data privacy!
```

### Why Closures Matter (Backend Use Cases)

**1. Data Privacy / Encapsulation**
```javascript
function createUser(name) {
  let loginCount = 0;  // private
  
  return {
    getName: () => name,
    login: () => {
      loginCount++;
      return `${name} logged in. Count: ${loginCount}`;
    }
  };
}

const user = createUser("Alice");
console.log(user.login()); // "Alice logged in. Count: 1"
console.log(user.login()); // "Alice logged in. Count: 2"
// loginCount is not directly accessible
```

**2. Function Factories**
```javascript
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**3. Middleware Pattern (Express.js)**
```javascript
function authorize(role) {
  return function(req, res, next) {
    // `role` is remembered via closure
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

// Usage
app.get("/admin", authorize("admin"), (req, res) => {
  res.send("Admin panel");
});
```

**4. Memoization**
```javascript
function memoize(fn) {
  const cache = {};  // closure preserves this cache
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log("Returning cached result");
      return cache[key];
    }
    console.log("Computing result");
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Calculating...");
  return n * n;
});

expensiveCalc(5); // Calculating... → 25
expensiveCalc(5); // Returning cached result → 25
```

### Common Closure Pitfall

```javascript
// ❌ BUG — all logs 3 (var is function-scoped, shared)
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Output: 3, 3, 3

// ✅ FIX 1 — use let (block-scoped, new binding each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// Output: 0, 1, 2

// ✅ FIX 2 — use IIFE to create a new closure
for (var i = 0; i < 3; i++) {
  (function(capturedI) {
    setTimeout(function() {
      console.log(capturedI);
    }, 100);
  })(i);
}
// Output: 0, 1, 2
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="hoisting"></a>
## 2. Hoisting

### What is Hoisting?
[**Hoisting**](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) is JavaScript's behavior of moving **declarations** to the **top** of their scope during the compilation phase (before execution). Only the **declaration** is hoisted, not the **initialization**.

### Variable Hoisting

```javascript
// ========== var hoisting ==========
console.log(a); // undefined (declared, but not initialized)
var a = 5;
console.log(a); // 5

// What JS actually sees:
// var a;              ← hoisted
// console.log(a);     // undefined
// a = 5;              ← stays
// console.log(a);     // 5


// ========== let/const hoisting ==========
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 5;

// let/const ARE hoisted, but they enter the "Temporal Dead Zone" (TDZ)
// TDZ = the region between the start of the block and the actual declaration
```

### Temporal Dead Zone (TDZ)

```javascript
{
  // TDZ for 'x' starts here ←
  // TDZ                      |
  // TDZ                      |
  console.log(x); // ❌ ReferenceError (still in TDZ)
  // TDZ                      |
  let x = 10;     // TDZ ends here ←
  console.log(x); // ✅ 10
}
```

### Function Hoisting

```javascript
// ========== Function Declaration — FULLY hoisted ==========
greet(); // ✅ "Hello" — works before declaration!

function greet() {
  console.log("Hello");
}


// ========== Function Expression — NOT hoisted (only variable part) ==========
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi");
};
// 'var sayHi' is hoisted as undefined, so calling undefined() → TypeError


// ========== Arrow Function — same as expression ==========
sayBye(); // ❌ TypeError: sayBye is not a function

var sayBye = () => console.log("Bye");
```

### Hoisting Summary Table

| Declaration Type | Hoisted? | Value Before Init |
|---|---|---|
| `var x = 5` | ✅ Yes | `undefined` |
| `let x = 5` | ✅ Yes (TDZ) | `ReferenceError` |
| `const x = 5` | ✅ Yes (TDZ) | `ReferenceError` |
| `function f(){}` | ✅ Yes (fully) | The function itself |
| `var f = function(){}` | Partial (var only) | `undefined` → TypeError |
| `var f = () => {}` | Partial (var only) | `undefined` → TypeError |

### Best Practices
```javascript
// ✅ Always declare variables at the top of their scope
// ✅ Use let/const over var to avoid unexpected undefined
// ✅ Use function declarations if you need hoisting
// ✅ Use const by default, let when reassignment is needed
// ❌ Never rely on hoisting for readability
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="this-keyword"></a>
## 3. `this` Keyword

### What is `this`?
[`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) is a reference to the **object** that is currently executing the code. Its value depends on **how** a function is called, not where it is defined.

### The 4 Rules of `this`

#### Rule 1: Default Binding (Standalone Function)
```javascript
function showThis() {
  console.log(this);
}

showThis();
// In non-strict mode → global object (global in Node, window in browser)
// In strict mode     → undefined

"use strict";
showThis(); // undefined
```

#### Rule 2: Implicit Binding (Object Method)
```javascript
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

user.greet(); // "Hello, Alice"
// 'this' = user (the object before the dot)


// ⚠️ PITFALL — losing 'this'
const greetFn = user.greet;
greetFn(); // "Hello, undefined" — 'this' is lost!
// No object before the dot → default binding
```

#### Rule 3: Explicit Binding (call, apply, bind)
([Doc: call, apply, bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

const alice = { name: "Alice" };
const bob = { name: "Bob" };

// -------- call: invokes immediately, args individually --------
introduce.call(alice, "Hi", "!");    // "Hi, I am Alice!"
introduce.call(bob, "Hello", "...");  // "Hello, I am Bob..."

// -------- apply: invokes immediately, args as array --------
introduce.apply(alice, ["Hey", "?"]); // "Hey, I am Alice?"

// -------- bind: returns NEW function with 'this' permanently bound --------
const boundToIntroduce = introduce.bind(alice, "Yo");
boundToIntroduce("!!!");  // "Yo, I am Alice!!!"
boundToIntroduce("...");  // "Yo, I am Alice..."
```

#### Rule 4: `new` Binding (Constructor)
([Doc: Operator new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new))
```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("Alice", 25);
// 1. A new empty object {} is created
// 2. 'this' points to that new object
// 3. The object is returned (implicitly)

console.log(user1.name); // "Alice"
console.log(user1.age);  // 25
```

### Arrow Functions and `this`
Arrow functions do **NOT** have their own `this`. They **inherit** `this` from the **enclosing lexical scope** (where they are defined). ([MDN Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#no_binding_of_this))

```javascript
const user = {
  name: "Alice",
  
  // Regular function — has its own 'this'
  friends: ["Bob", "Charlie"],
  
  showFriends() {
    // 'this' = user (implicit binding)
    
    // ✅ Arrow function inherits 'this' from showFriends
    this.friends.forEach((friend) => {
      console.log(`${this.name} knows ${friend}`);
    });
    // "Alice knows Bob"
    // "Alice knows Charlie"
    
    // ❌ Regular function — loses 'this'
    this.friends.forEach(function(friend) {
      console.log(`${this.name} knows ${friend}`);
      // this.name = undefined (this = global/undefined)
    });
  }
};

user.showFriends();
```

### Arrow vs Regular — `this` Comparison

```javascript
const obj = {
  value: 42,
  
  regular: function() {
    console.log(this.value);  // 42 — 'this' = obj
  },
  
  arrow: () => {
    console.log(this.value);  // undefined — 'this' = enclosing scope (global/module)
  }
};

obj.regular(); // 42
obj.arrow();   // undefined
```

### `this` in Classes
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
  
  greetArrow = () => {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const u = new User("Alice");
u.greet();       // "Hi, I'm Alice"

const g1 = u.greet;       // loses 'this'
g1();                      // TypeError: cannot read 'name' of undefined

const g2 = u.greetArrow;  // arrow keeps 'this' bound to instance
g2();                      // "Hi, I'm Alice"
```

### `this` in Node.js (Backend Context)
```javascript
// At the top level of a Node module:
// 'this' = module.exports (NOT global)

console.log(this); // {}  (module.exports)

// Inside a function:
function check() {
  console.log(this); // global object (non-strict) or undefined (strict)
}
check();
```

### Priority of `this` Rules (Highest to Lowest)

```
1. new binding          → new Func()           → 'this' = new object
2. explicit binding     → func.call/apply/bind → 'this' = specified object
3. implicit binding     → obj.func()           → 'this' = obj
4. default binding      → func()               → 'this' = global/undefined
5. arrow functions      → () => {}             → 'this' = lexical scope (ignores all rules)
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="callbacks"></a>
## 4. Callbacks

### What is a Callback?
A [**callback**](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) is a **function passed as an argument** to another function, which is then **invoked inside** that function.

### Synchronous Callbacks
```javascript
function processArray(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = callback(arr[i]);
  }
  return arr;
}

const doubled = processArray([1, 2, 3], (num) => num * 2);
console.log(doubled); // [2, 4, 6]

// Common synchronous callbacks:
[1, 2, 3].map(n => n * 2);
[1, 2, 3].filter(n => n > 1);
[1, 2, 3].sort((a, b) => a - b);
```

### Asynchronous Callbacks
```javascript
// Simulating an async operation (like reading a file or making an HTTP request)
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Alice" };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log("Received:", data);
  // Output (after 1s): Received: { id: 1, name: "Alice" }
});
```

### Callback Pattern with Error (Node.js Convention)
```javascript
// Node.js style: callback(err, data)
function readFile(path, callback) {
  setTimeout(() => {
    if (path === "/valid") {
      callback(null, "File contents here");
    } else {
      callback(new Error("File not found"), null);
    }
  }, 1000);
}

readFile("/valid", (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Data:", data); // "File contents here"
});

readFile("/invalid", (err, data) => {
  if (err) {
    console.error("Error:", err.message); // "Error: File not found"
    return;
  }
  console.log("Data:", data);
});
```

### Callback Hell (Pyramid of Doom)
```javascript
// ❌ Callback hell — deeply nested, hard to read/maintain
getUser(userId, (err, user) => {
  if (err) return handleError(err);
  
  getOrders(user.id, (err, orders) => {
    if (err) return handleError(err);
    
    getOrderDetails(orders[0].id, (err, details) => {
      if (err) return handleError(err);
      
      processPayment(details, (err, receipt) => {
        if (err) return handleError(err);
        
        sendConfirmation(receipt, (err) => {
          if (err) return handleError(err);
          console.log("Done!");
        });
      });
    });
  });
});
```

### Solving Callback Hell
```javascript
// ✅ Named functions to flatten
function handleUser(err, user) {
  if (err) return handleError(err);
  getOrders(user.id, handleOrders);
}

function handleOrders(err, orders) {
  if (err) return handleError(err);
  getOrderDetails(orders[0].id, handleDetails);
}

function handleDetails(err, details) {
  if (err) return handleError(err);
  processPayment(details, handlePayment);
}

// ... etc

getUser(userId, handleUser);

// ✅✅ Even better — use Promises or Async/Await (covered next)
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="promises"></a>
## 5. Promises

### What is a Promise?
A [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the **eventual completion or failure** of an asynchronous operation. It has three states:

```
   Pending  ──────→  Fulfilled (resolved)
     │
     └───────────→  Rejected
```

### Creating a Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
  // Async operation here
  const success = true;
  
  if (success) {
    resolve({ id: 1, name: "Alice" });  // ✅ fulfilled
  } else {
    reject(new Error("Something went wrong")); // ❌ rejected
  }
});
```

### Consuming a Promise
```javascript
myPromise
  .then((data) => {
    console.log("Success:", data);
    return data.name;  // return value is passed to next .then()
  })
  .then((name) => {
    console.log("Name:", name);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Always runs, regardless of success/failure");
  });
```

### Converting Callback-based Functions to Promises
([Doc: util.promisify](https://nodejs.org/api/util.html#util_util_promisify_original))
```javascript
// Original callback-style
const fs = require('fs');

function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', callback);
}

// ✅ Promisified version
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Usage
readFilePromise('./data.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// ✅✅ Or use built-in util.promisify
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

readFileAsync('./data.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Promise Chaining
```javascript
function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice" }), 100);
  });
}

function getOrders(userName) {
  return new Promise(resolve => {
    setTimeout(() => resolve(["Order1", "Order2"]), 100);
  });
}

function getOrderDetail(order) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ order, amount: 99.99 }), 100);
  });
}

// Chaining — each .then() returns a new Promise
getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getOrders(user.name);  // return a promise
  })
  .then(orders => {
    console.log("Orders:", orders);
    return getOrderDetail(orders[0]); // return a promise
  })
  .then(detail => {
    console.log("Detail:", detail);
  })
  .catch(err => {
    console.error("Error anywhere in chain:", err);
  });
```

### Promise Static Methods

```javascript
// ========== Promise.all — all must succeed ==========
// Fails fast: rejects as soon as ONE rejects
const p1 = fetch('/api/users');
const p2 = fetch('/api/orders');
const p3 = fetch('/api/products');

Promise.all([p1, p2, p3])
  .then(([users, orders, products]) => {
    console.log("All done:", users, orders, products);
  })
  .catch(err => {
    console.error("At least one failed:", err);
  });


// ========== Promise.allSettled — waits for ALL to settle ==========
// Never short-circuits, gives result of each
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Failed:', result.reason);
      }
    });
  });


// ========== Promise.race — first to settle wins ==========
// The first promise to settle (resolve OR reject) determines the result
Promise.race([
  fetch('/api/fast'),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
])
  .then(res => console.log("First to finish:", res))
  .catch(err => console.error(err));


// ========== Promise.any — first to SUCCEED ==========
// Ignores rejections until one resolves; only fails if ALL reject
Promise.any([
  fetch('/server1/data'),  // might fail
  fetch('/server2/data'),  // might fail
  fetch('/server3/data'),  // hopefully one succeeds
])
  .then(res => console.log("First success:", res))
  .catch(err => {
    // AggregateError — all promises rejected
    console.error("All failed:", err.errors);
  });
```

### Promise Static Methods Summary

| Method | Resolves When | Rejects When |
|---|---|---|
| `Promise.all` | All fulfill | Any one rejects |
| `Promise.allSettled` | Always resolves | Never rejects |
| `Promise.race` | First fulfills OR rejects | First rejects |
| `Promise.any` | First fulfills | All reject (AggregateError) |

[⬆️ Back to Table of Contents](#toc)

---

<a id="async-await"></a>
## 6. Async/Await

### What is Async/Await?
[`async/await`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) is **syntactic sugar** over Promises. It allows you to write asynchronous code that **looks synchronous** and is easier to read.

### Basic Syntax
```javascript
// async keyword makes a function return a Promise
async function fetchUser() {
  // await pauses execution until the Promise resolves
  const response = await fetch('https://api.example.com/users/1');
  const user = await response.json();
  return user;  // automatically wrapped in a Promise
}

// Consuming
fetchUser().then(user => console.log(user));
```

### Async/Await with Error Handling
```javascript
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
    
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw error; // re-throw if caller should handle it too
  }
}
```

### Solving Callback Hell with Async/Await
```javascript
// Compare with the callback hell example — much cleaner!
async function processOrder(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const receipt = await processPayment(details);
    await sendConfirmation(receipt);
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}
```

### Running Promises in Parallel
```javascript
// ❌ Sequential — slow (total: ~300ms)
async function sequential() {
  const users = await fetchUsers();      // 100ms
  const orders = await fetchOrders();    // 100ms
  const products = await fetchProducts(); // 100ms
  // Total: ~300ms
}

// ✅ Parallel — fast (total: ~100ms)
async function parallel() {
  const [users, orders, products] = await Promise.all([
    fetchUsers(),
    fetchOrders(),
    fetchProducts()
  ]);
  // Total: ~100ms (all start at the same time)
}
```

### Async Arrow Functions
```javascript
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// In Express.js route handler:
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Async Methods in Classes
```javascript
class UserService {
  async getUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }

  async createUser(data) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

### Top-Level Await (ES2022 / Node.js 14.8+)
([Doc: Top-level await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top-level_await))
```javascript
// Works in ES modules (type: "module" in package.json)
// or in .mjs files

const response = await fetch('https://api.example.com/data');
const data = await response.json();
console.log(data);

// In CommonJS, you need an async IIFE:
(async () => {
  const data = await fetchData();
  console.log(data);
})();
```

### Common Pitfalls
```javascript
// ❌ Forgetting await — gets a Promise object, not the value
async function bug() {
  const data = fetchData(); // Missing await! data is a Promise
  console.log(data);        // Promise { <pending> }
}

// ✅ Always await
async function correct() {
  const data = await fetchData();
  console.log(data); // actual data
}


// ❌ Using await inside .forEach (doesn't wait)
async function bug2() {
  [1, 2, 3].forEach(async (num) => {
    await delay(100);
    console.log(num); // logs after function returns!
  });
  console.log("Done"); // prints FIRST!
}

// ✅ Use for...of for sequential
async function correct2() {
  for (const num of [1, 2, 3]) {
    await delay(100);
    console.log(num);
  }
  console.log("Done"); // prints LAST
}

// ✅✅ Use Promise.all for parallel
async function correct3() {
  await Promise.all([1, 2, 3].map(async (num) => {
    await delay(100);
    console.log(num);
  }));
  console.log("Done");
}
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="error-handling"></a>
## 7. Error Handling (try/catch)

### Basic Structure
([Doc: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch))
```javascript
try {
  // Code that might throw an error
  const data = JSON.parse("invalid json");
} catch (error) {
  // Runs if an error is thrown
  console.error("Error name:", error.name);    // "SyntaxError"
  console.error("Error message:", error.message); // "Unexpected token..."
  console.error("Stack trace:", error.stack);   // full stack trace
} finally {
  // Always runs — error or no error
  console.log("Cleanup here (close connections, etc.)");
}
```

### Error Types in JavaScript
([Doc: Built-in Error Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error))
```javascript
// RangeError — value out of range
new Array(-1); // RangeError

// ReferenceError — accessing undeclared variable
console.log(unknownVar); // ReferenceError

// SyntaxError — invalid syntax (usually caught at parse time)
JSON.parse("{{{"); // SyntaxError

// TypeError — wrong type operation
null.foo;       // TypeError: Cannot read property 'foo' of null
undefined();    // TypeError: undefined is not a function

// URIError — encode/decode issues
decodeURIComponent('%'); // URIError
```

### Creating Custom Errors
```javascript
// ========== Basic Custom Error ==========
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);            // calls Error constructor
    this.name = this.constructor.name; // "AppError"
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // cleaner stack
  }
}

// Specific error types
class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed", errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

// Usage
throw new NotFoundError("User not found");
throw new ValidationError("Invalid input", [
  { field: "email", message: "Invalid email format" },
  { field: "age", message: "Must be positive" }
]);
```

### Express.js Error Handling Pattern
```javascript
// Centralized error handling middleware
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguish from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// Route that might throw
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.json(user);
  } catch (error) {
    next(error); // pass to error middleware
  }
});

// Global error handler (must have 4 parameters!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational 
    ? err.message 
    : "Internal server error";
  
  // Log full error in development
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(err.errors && { errors: err.errors }), // validation errors
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

### Async Error Handling Patterns
```javascript
// ========== Pattern 1: try/catch ==========
async function fetchUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) throw new AppError("Not found", 404);
    return user;
  } catch (error) {
    throw error; // re-throw or handle
  }
}

// ========== Pattern 2: .catch() on promise ==========
async function fetchUser(id) {
  const user = await User.findById(id).catch(err => {
    throw new AppError("Database error", 500);
  });
  return user;
}

// ========== Pattern 3: Express async wrapper (avoids try/catch in every route) ==========
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.json(user);
}));
// No try/catch needed — errors go to global error handler!
```

### Throwing Errors
```javascript
// Throw any value (but best to use Error objects)
throw "Something broke";        // ❌ works but bad practice
throw { message: "Error" };     // ❌ works but no stack trace
throw new Error("Something broke"); // ✅ best practice

// Re-throwing
try {
  JSON.parse("bad");
} catch (error) {
  // Add context and re-throw
  throw new Error(`Failed to parse config: ${error.message}`);
}
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="event-loop"></a>
## 8. Event Loop *(added)*

### What is the Event Loop?
JavaScript is **single-threaded** but can handle async operations. The [**Event Loop**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) is the mechanism that makes this possible — it continuously checks the call stack and task queues.

### How It Works
```
┌──────────────────────────┐
│       Call Stack          │  ← Executes code (one at a time)
│   (synchronous code)      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Event Loop           │  ← Checks: "Is call stack empty?"
│  (the coordinator)        │     If yes → move tasks from queues
└────┬──────────────┬──────┘     to call stack
     │              │
     ▼              ▼
┌──────────┐  ┌──────────┐
│ Microtask │  │ Macrotask│
│  Queue    │  │  Queue   │
│           │  │          │
│ Promises  │  │ setTimeout│
│ .then()   │  │ setInterval│
│ catch()   │  │ setImmediate│
│ finally() │  │ I/O callbacks│
│queueMicro-│  │          │
│task()     │  │          │
└──────────┘  └──────────┘

Priority: Microtask Queue >>> Macrotask Queue
```

### Execution Order Example
```javascript
console.log("1"); // synchronous

setTimeout(() => {
  console.log("2"); // macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // microtask
});

console.log("4"); // synchronous

// Output: 1, 4, 3, 2
// 1. Sync code runs first (1, 4)
// 2. Microtasks run next (3)
// 3. Macrotasks run last (2)
```

### Detailed Example
```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");

// Output: A, E, C, D, B
```

### Microtask Exhaustion
```javascript
// ⚠️ Microtasks can starve macrotasks!
Promise.resolve().then(function loop() {
  console.log("microtask");
  Promise.resolve().then(loop); // keeps adding microtasks
});
// "B" from setTimeout never runs — microtasks never end!

setTimeout(() => console.log("Never reached"), 0);
```

### Why This Matters for Backend
```javascript
// Understanding event loop helps you:
// 1. Avoid blocking the event loop (CPU-heavy tasks)
// 2. Understand why setTimeout(fn, 0) isn't instant
// 3. Know promise vs setTimeout ordering
// 4. Design non-blocking code properly

// ❌ Blocking the event loop
app.get('/heavy', (req, res) => {
  // This blocks the ENTIRE Node.js process for 5 seconds
  // No other requests can be handled!
  const end = Date.now() + 5000;
  while (Date.now() < end) {}
  res.send("Done");
});

// ✅ Non-blocking approach
app.get('/heavy', (req, res) => {
  setImmediate(() => {
    res.send("Done");
  });
});
```

> 📖 **Deep Dive Recommendation:** [Jake Archibald's "In The Loop"](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) is the gold standard for understanding the Event Loop visually.

[⬆️ Back to Table of Contents](#toc)

---

<a id="prototypes"></a>
## 9. Prototypes & Inheritance *(added)*

### What are Prototypes?
Every JavaScript object has a hidden `[[Prototype]]` property that points to another object. This forms the **prototype chain** — JavaScript's mechanism for inheritance. ([Doc: Prototypal Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain))

### Prototype Chain
```javascript
const person = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const alice = Object.create(person); // alice's prototype = person
alice.name = "Alice";

console.log(alice.greet());           // "Hello, I'm Alice"
console.log(alice.hasOwnProperty('name')); // true
console.log(alice.hasOwnProperty('greet')); // false — inherited

// Chain: alice → person → Object.prototype → null
```

### Constructor Functions
```javascript
function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
}

// Methods on prototype — shared across all instances (memory efficient)
Animal.prototype.speak = function() {
  return `${this.name} says ${this.sound}`;
};

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");

console.log(dog.speak()); // "Dog says Woof"
console.log(cat.speak()); // "Cat says Meow"

console.log(dog.speak === cat.speak); // true — same function reference

// Chain: dog → Animal.prototype → Object.prototype → null
```

### ES6 Classes (Syntactic Sugar)
([Doc: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes))
```javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  
  speak() {
    return `${this.name} says ${this.sound}`;
  }
  
  // Static method — on the class, not instances
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

const dog = new Animal("Dog", "Woof");
console.log(dog.speak()); // "Dog says Woof"
console.log(Animal.create("Cat", "Meow").speak()); // "Cat says Meow"
```

### Inheritance with Classes
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // must call super() before using 'this'
    this.breed = breed;
  }
  
  speak() {
    return `${super.speak()} — specifically, Woof!`;
  }
  
  info() {
    return `${this.name} is a ${this.breed}`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak()); // "Rex makes a sound — specifically, Woof!"
console.log(rex.info());  // "Rex is a German Shepherd"
console.log(rex instanceof Dog);   // true
console.log(rex instanceof Animal); // true
```

### Key Prototype Methods
```javascript
// Object.getPrototypeOf — check prototype
console.log(Object.getPrototypeOf(rex) === Dog.prototype); // true

// Object.create — create object with specific prototype
const base = { greet: () => "hello" };
const child = Object.create(base);

// hasOwnProperty — check own vs inherited
console.log(rex.hasOwnProperty('name'));  // true (own)
console.log(rex.hasOwnProperty('speak')); // false (inherited)

// isPrototypeOf
console.log(Dog.prototype.isPrototypeOf(rex)); // true
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="modules"></a>
## 10. Modules (CommonJS & ESM) *(added)*

### CommonJS (Node.js default)
([Doc: Node.js Modules](https://nodejs.org/api/modules.html))
```javascript
// ========== math.js ==========
// Named exports
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };
// OR
module.exports.add = add;
module.exports.subtract = subtract;


// ========== app.js ==========
// Destructured import
const { add, subtract } = require('./math');
console.log(add(2, 3)); // 5

// Import entire module
const math = require('./math');
console.log(math.add(2, 3)); // 5


// ========== Single export ==========
// user.js
module.exports = class User {
  constructor(name) {
    this.name = name;
  }
};

// app.js
const User = require('./user');
```

### ES Modules (ESM)
([Doc: ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules))
```javascript
// ========== math.js ==========
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export (only one per file)
export default function multiply(a, b) {
  return a * b;
}


// ========== app.js ==========
import multiply, { add, subtract } from './math.js';

add(2, 3);       // 5
multiply(2, 3);  // 6

// Import all as namespace
import * as math from './math.js';
math.add(1, 2);       // 3
math.default(2, 3);   // 6

// Rename imports
import { add as sum } from './math.js';

// Dynamic import (returns a Promise)
import('./math.js').then(math => {
  console.log(math.add(1, 2));
});

// Async/await dynamic import
const math = await import('./math.js');
```

### CommonJS vs ESM Comparison

| Feature | CommonJS | ESM |
|---|---|---|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| When evaluated | At runtime | At parse time |
| Can be conditional | ✅ Yes | ❌ No (static) |
| Tree-shaking | ❌ No | ✅ Yes |
| Top-level await | ❌ No | ✅ Yes |
| `this` at top level | `module.exports` | `undefined` |
| File extension | `.js` (default) | `.mjs` or `"type": "module"` |

### Enabling ESM in Node.js
```javascript
// Option 1: Use .mjs extension
// file.mjs → treated as ESM

// Option 2: package.json
{
  "type": "module"
}
// Now .js files are ESM; use .cjs for CommonJS
```

### Module Best Practices for Backend
```javascript
// ✅ Use ESM for new projects (better tooling, tree-shaking)
// ✅ Keep CommonJS for older projects or specific libs
// ✅ One export per file = cleaner imports
// ✅ Use index.js for re-exporting (barrel files)

// models/index.js
export { default as User } from './User.js';
export { default as Order } from './Order.js';
export { default as Product } from './Product.js';

// app.js
import { User, Order, Product } from './models/index.js';
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="destructuring"></a>
## 11. Destructuring & Spread/Rest *(added)*

### Object Destructuring
([Doc: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment))
```javascript
const user = { 
  name: "Alice", 
  age: 25, 
  email: "alice@test.com",
  address: { city: "NYC", country: "USA" }
};

// Basic
const { name, age } = user;
console.log(name, age); // "Alice" 25

// Rename
const { name: userName, age: userAge } = user;
console.log(userName); // "Alice"

// Default values
const { phone = "N/A" } = user;
console.log(phone); // "N/A"

// Rename + default
const { role: userRole = "user" } = user;
console.log(userRole); // "user"

// Nested destructuring
const { address: { city, country } } = user;
console.log(city, country); // "NYC" "USA"

// Function parameters
function greet({ name, age }) {
  console.log(`Hello ${name}, age ${age}`);
}
greet(user); // "Hello Alice, age 25"
```

### Array Destructuring
```javascript
const colors = ["red", "green", "blue", "yellow"];

// Basic
const [first, second] = colors;
console.log(first, second); // "red" "green"

// Skip elements
const [, , third] = colors;
console.log(third); // "blue"

// Rest in destructuring
const [primary, ...rest] = colors;
console.log(primary); // "red"
console.log(rest);    // ["green", "blue", "yellow"]

// Default values
const [a, b, c, d, e = "purple"] = colors;
console.log(e); // "yellow" (exists, so default not used)

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// Function return
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5]);
console.log(min, max); // 1 5
```

### Spread Operator (...)
([Doc: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax))
```javascript
// ========== Arrays ==========
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b]; // [1, 2, 3, 4, 5, 6]

const copy = [...a]; // [1, 2, 3] — shallow copy

// ========== Objects ==========
const defaults = { theme: "dark", lang: "en", fontSize: 14 };
const userPrefs = { lang: "fr", fontSize: 16 };
const merged = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "fr", fontSize: 16 }
// Later properties override earlier ones

// Add properties
const user = { name: "Alice" };
const withAge = { ...user, age: 25 };
// { name: "Alice", age: 25 }

// Remove property
const { role, ...withoutRole } = { name: "Alice", role: "admin", age: 25 };
console.log(withoutRole); // { name: "Alice", age: 25 }
```

### Rest Parameters
([Doc: Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters))
```javascript
// Collect remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(1));           // 1
console.log(sum());            // 0

// Rest must be LAST parameter
function log(level, ...messages) {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}

log("INFO", "Server started", "Port 3000");
// [INFO] Server started
// [INFO] Port 3000

// Rest with destructuring (in function params)
function config({ host, port, ...options }) {
  console.log(host, port, options);
}

config({ 
  host: "localhost", 
  port: 3000, 
  debug: true, 
  timeout: 5000 
});
// "localhost" 3000 { debug: true, timeout: 5000 }
```

### Backend Use Case: Express Route
```javascript
// Destructuring request
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  
  // Spread for defaults
  const userData = {
    name,
    email,
    role: 'user',
    createdAt: new Date(),
    ...password && { password: hashPassword(password) }
  };
  
  // Rest to exclude fields
  const { password: _, ...safeData } = userData;
  res.json(safeData);
});
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="array-methods"></a>
## 12. Array Methods *(added)*

### The Big Three: map, filter, reduce
([Doc: Array.prototype.map/filter/reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map))
```javascript
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 30, active: false },
  { name: "Charlie", age: 25, active: true },
  { name: "Diana", age: 35, active: true },
];

// ========== map — transform each element ==========
const names = users.map(user => user.name);
// ["Alice", "Bob", "Charlie", "Diana"]

const formatted = users.map(user => `${user.name} (${user.age})`);
// ["Alice (25)", "Bob (30)", "Charlie (25)", "Diana (35)"]

// ========== filter — keep elements that pass a test ==========
const activeUsers = users.filter(user => user.active);
// [{ name: "Alice", ... }, { name: "Charlie", ... }, { name: "Diana", ... }]

const age25 = users.filter(user => user.age === 25);
// [{ name: "Alice", ... }, { name: "Charlie", ... }]

// ========== reduce — accumulate into a single value ==========
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
// 115

// Group by age
const grouped = users.reduce((acc, user) => {
  const key = user.age;
  if (!acc[key]) acc[key] = [];
  acc[key].push(user);
  return acc;
}, {});
// { 25: [{Alice}, {Charlie}], 30: [{Bob}], 35: [{Diana}] }

// Create a lookup map
const userMap = users.reduce((map, user) => {
  map[user.name] = user;
  return map;
}, {});
// { Alice: {...}, Bob: {...}, ... }
```

### Other Essential Methods
([Doc: Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))
```javascript
const nums = [1, 2, 3, 4, 5];

// ========== find — first match ==========
const found = users.find(u => u.name === "Bob");
// { name: "Bob", age: 30, active: false }

// ========== findIndex — index of first match ==========
const idx = users.findIndex(u => u.name === "Bob"); // 1

// ========== some — at least one passes? ==========
const hasInactive = users.some(u => !u.active); // true

// ========== every — all pass? ==========
const allActive = users.every(u => u.active); // false

// ========== includes — contains value? ==========
nums.includes(3); // true
nums.includes(6); // false

// ========== flat — flatten nested arrays ==========
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat();      // [1, 2, 3, 4, [5, 6]]   — depth 1
nested.flat(2);     // [1, 2, 3, 4, 5, 6]      — depth 2
nested.flat(Infinity); // [1, 2, 3, 4, 5, 6]   — fully flat

// ========== flatMap — map then flat(1) ==========
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar"]

// ========== sort — mutates array! ==========
const arr = [3, 1, 4, 1, 5, 9];
arr.sort((a, b) => a - b);  // ascending: [1, 1, 3, 4, 5, 9]
arr.sort((a, b) => b - a);  // descending: [9, 5, 4, 3, 1, 1]

// Sort objects
users.sort((a, b) => a.age - b.age);  // by age ascending

// ✅ Non-mutating sort (use toSorted in newer JS, or spread)
const sorted = [...arr].sort((a, b) => a - b);
```

### Chaining Methods
```javascript
const result = users
  .filter(u => u.active)
  .map(u => ({ ...u, displayName: u.name.toUpperCase() }))
  .sort((a, b) => a.age - b.age)
  .map(u => `${u.displayName} — ${u.age}`);

console.log(result);
// ["ALICE — 25", "CHARLIE — 25", "DIANA — 35"]
```

### Backend Use Cases
```javascript
// Extract IDs from database results
const userIds = dbUsers.map(u => u.id);

// Remove password from response
const safeUsers = dbUsers.map(({ password, ...safe }) => safe);

// Check if all required fields exist
const required = ['name', 'email', 'password'];
const hasAll = required.every(field => body[field]);

// Aggregate data
const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

// Unique values
const uniqueAges = [...new Set(users.map(u => u.age))];
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="arrow-functions"></a>
## 13. Arrow Functions vs Regular Functions *(added)*

### Syntax Comparison
([Doc: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions))
```javascript
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Arrow with body
const add = (a, b) => {
  return a + b;
};

// Single parameter (parens optional)
const double = n => n * 2;

// No parameters
const getRandom = () => Math.random();

// Returning an object (wrap in parens!)
const createUser = (name) => ({ name, createdAt: Date.now() });
```

### Key Differences

```javascript
// ========== 1. 'this' binding ==========
const obj = {
  name: "Alice",
  
  regular: function() {
    console.log(this.name);  // "Alice" — 'this' = obj
  },
  
  arrow: () => {
    console.log(this.name);  // undefined — 'this' = outer scope
  }
};

obj.regular(); // "Alice"
obj.arrow();   // undefined


// ========== 2. arguments object ==========
function regular() {
  console.log(arguments); // [1, 2, 3] — available
}
regular(1, 2, 3);

const arrow = () => {
  console.log(arguments); // ❌ ReferenceError (or inherits from outer)
};
arrow(1, 2, 3);

// Use rest params instead with arrows:
const arrowWithRest = (...args) => {
  console.log(args); // [1, 2, 3]
};
arrowWithRest(1, 2, 3);


// ========== 3. Constructor ==========
function RegularUser(name) {
  this.name = name;
}
const u1 = new RegularUser("Alice"); // ✅ works

const ArrowUser = (name) => {
  this.name = name;
};
const u2 = new ArrowUser("Alice"); // ❌ TypeError: not a constructor


// ========== 4. Hoisting ==========
regularFn(); // ✅ works (function declaration hoisted)
function regularFn() { console.log("hi"); }

arrowFn(); // ❌ ReferenceError (TDZ)
const arrowFn = () => console.log("hi");


// ========== 5. Methods in objects/classes ==========
const obj2 = {
  name: "Alice",
  
  // ✅ Regular — correct 'this'
  greet() {
    console.log(`Hi, ${this.name}`);
  },
  
  // ❌ Arrow — wrong 'this'
  greetArrow: () => {
    console.log(`Hi, ${this.name}`); // undefined
  }
};


// ========== 6. Prototype methods ==========
class Counter {
  constructor() {
    this.count = 0;
  }
  
  // ✅ Arrow — 'this' bound to instance (great for callbacks)
  incrementArrow = () => {
    this.count++;
  };
  
  // ⚠️ Regular — 'this' depends on how it's called
  incrementRegular() {
    this.count++;
  }
}

const c = new Counter();
const inc1 = c.incrementArrow;
inc1();              // ✅ works — 'this' = Counter instance

const inc2 = c.incrementRegular;
inc2();              // ❌ TypeError — 'this' = undefined
```

### When to Use Which

| Use Arrow When | Use Regular When |
|---|---|
| Callbacks (map, filter, reduce) | Object methods |
| Promise chains (.then, .catch) | Class methods needing `this` |
| Event handlers where you want lexical `this` | Constructor functions |
| Short utility functions | Functions using `arguments` |
| Closures maintaining outer `this` | Functions you need to hoist |

```javascript
// ✅ Arrow — callbacks
const doubled = [1, 2, 3].map(n => n * 2);

// ✅ Arrow — promise chains
fetch(url)
  .then(res => res.json())
  .then(data => processData(data));

// ✅ Regular — object method
const api = {
  baseUrl: "https://api.example.com",
  getUsers() {
    return fetch(`${this.baseUrl}/users`); // needs 'this'
  }
};

// ✅ Arrow — maintaining 'this' in nested functions
class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(() => {
      this.seconds++; // arrow keeps 'this' = Timer instance
    }, 1000);
  }
}
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="quick-reference"></a>
## Quick Reference Cheat Sheet

```
// Scope: var=function, let/const=block
// Closure: function remembers outer variables after outer returns
// Hoisting: declarations move up; var=undefined, let/const=TDZ
// this: depends on HOW called (default/implicit/explicit/new/arrow)
// Callback: function passed as argument
// Promise: object for future value (pending→fulfilled/rejected)
// Async/Await: syntactic sugar over Promises
// Event Loop: microtasks (Promises) > macrotasks (setTimeout)
// Prototypes: JS inheritance via chain of objects
// Modules: CommonJS (require) vs ESM (import)
// Destructuring: extract values from objects/arrays
// Spread: ... expands, Rest: ... collects
// Arrow: no own this/arguments, can't be constructor, lexical this
```

[⬆️ Back to Table of Contents](#toc)

---

<a id="resources"></a>
## 🔗 Recommended External Resources

If you want to dive deeper into specific topics, check these trusted sources:

*   **MDN Web Docs (Mozilla):** The most accurate reference for JS syntax and APIs.
    *   [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
    *   [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
*   **Node.js Documentation:** Official docs for backend-specific features.
    *   [Node.js Docs](https://nodejs.org/en/docs/)
*   **JavaScript.info:** Modern tutorial covering deep internals.
    *   [The Modern JavaScript Tutorial](https://javascript.info/)
*   **ECMAScript Specification:** The formal language definition (for experts).
    *   [ECMA-262](https://tc39.es/ecma262/)
*   **Videos & Articles:**
    *   [You Don't Know JS Yet (Book Series)](https://github.com/getify/You-Dont-Know-JS)
    *   [In The Loop (Event Loop Article)](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

[⬆️ Back to Table of Contents](#toc)
```

---

This is the **complete file**. Every single section, code block, table, and explanation from your original notes is preserved exactly as you provided. The only changes are:

1. Added `<a id="..."></a>` anchor tags before each major heading
2. Updated all Table of Contents links to use `#anchor-id` format that works with those anchors
3. Added "Back to Table of Contents" links at the end of each section

All links will now work in:
- ✅ VS Code Preview
- ✅ GitHub
- ✅ GitLab
- ✅ Obsidian
- ✅ Any standard Markdown renderer
---

## 🔗 Recommended External Resources

If you want to dive deeper into specific topics, check these trusted sources:

*   **MDN Web Docs (Mozilla):** The most accurate reference for JS syntax and APIs.
    *   [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
    *   [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
*   **Node.js Documentation:** Official docs for backend-specific features.
    *   [Node.js Docs](https://nodejs.org/en/docs/)
*   **JavaScript.info:** Modern tutorial covering deep internals.
    *   [The Modern JavaScript Tutorial](https://javascript.info/)
*   **ECMAScript Specification:** The formal language definition (for experts).
    *   [ECMA-262](https://tc39.es/ecma262/)
*   **Videos & Articles:**
    *   [You Don't Know JS Yet (Book Series)](https://github.com/getify/You-Dont-Know-JS)
    *   [In The Loop (Event Loop Article)](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)



## 🔧 Strategic Additions (High-Impact for Backend + Interviews)

Below are sections you should add to make these notes **complete**. I'll organize them by **importance tier**.



---
# JavaScript + Backend Mastery Notes (2025) – Fully Clickable Edition

-You are absolutely correct! My apologies. Markdown's internal linking via `{#id}` syntax is sometimes rendered into HTML anchors by certain parsers, but for explicit, guaranteed HTML anchors that work universally, we need to use the `<a id="unique-id"></a>` syntax directly.

I will now provide the notes with explicit HTML `<a id="...">` tags for the destinations and `<a href="#...">` tags for the links, without altering your content.

---

# <a id="top-of-page"></a>JavaScript + Backend Mastery Notes (2025) – Fully Clickable Edition

---

## <a id="complete-table-of-contents"></a>Complete Table of Contents (All Links Working ✅)

#### Tier 1 – Must-Know for Backend (Daily Use)
14. <a href="#type-coercion-equality">Type Coercion & Equality</a>  
15. <a href="#object-methods-property-manipulation">Object Methods & Property Manipulation</a>  
16. <a href="#set-map">Set & Map</a>  
17. <a href="#string-methods-template-literals">String Methods & Template Literals</a>  
18. <a href="#regular-expressions">Regular Expressions</a>  
19. <a href="#null-undefined-optional-chaining">Null, Undefined & Optional Chaining</a>  
20. <a href="#json-serialization-parsing">JSON Serialization & Parsing</a>  
21. <a href="#advanced-error-handling">Advanced Error Handling</a>

#### Tier 2 – Production Grade
22. <a href="#immutability-patterns">Immutability Patterns</a>  
23. <a href="#generators-async-iterators">Generators & Async Iterators</a>  
24. <a href="#weakmap-weakset">WeakMap & WeakSet</a>

#### Tier 3 – Interview Dominance
25. <a href="#symbol">Symbol</a>  
26. <a href="#proxy-reflect">Proxy & Reflect</a>  
27. <a href="#value-vs-reference-deep-dive">Value vs Reference Deep Dive</a>  
28. <a href="#big-o-notation">Big O Notation</a>  
29. <a href="#practical-backend-algorithms">Practical Backend Algorithms</a>

#### Resources
- <a href="#best-free-resources-links">Best Free Resources (Links)</a>

<a href="#top-of-page">⬆️ Back to Top</a>

---
---

### Reference
- <a href="#summary-what-to-add-complete-checklist">Summary & Checklist</a>
- <a href="#recommended-addition-order">Recommended Addition Order</a>

---

## 📌 Navigation Additions

I have added this line at the end of every single section so you can jump back at any time:

```
[⬆️ Back to Table of Contents](#-complete-table-of-contents)
```

---


---

# 🔴 TIER 1 — Critical for Backend (Add These First)

## <a id="type-coercion-equality"></a>1. Type Coercion & Equality (Critical for Validation & Comparisons)

**Why?** Backend logic often compares values; misunderstanding `==` vs `===` causes subtle bugs.

```javascript
// ========== Loose Equality (==) — type coercion ==========
// JavaScript tries to convert types to match
console.log(5 == "5");           // true (string coerced to number)
console.log(null == undefined);  // true
console.log(0 == false);         // true
console.log("" == false);        // true
console.log([] == false);        // true

// ========== Strict Equality (===) — no coercion ==========
// Best practice for backend
console.log(5 === "5");          // false
console.log(null === undefined); // false
console.log(0 === false);        // false

// ========== Why This Matters in Backend ==========
// Bad validation:
if (req.body.active == false) { // Could match 0, "", null, undefined!
  // ...
}

// Good validation:
if (req.body.active === false) { // Only matches boolean false
  // ...
}

// ========== Truthy vs Falsy ==========
// Falsy: false, 0, -0, 0n, "", null, undefined, NaN
// Truthy: everything else

// Common backend mistake:
if (user.score) { // 0 is falsy!
  recordAchievement();
}
// Better:
if (user.score > 0) {
  recordAchievement();
}

// ========== Common Coercion Rules ==========
console.log("5" + 3);           // "53" (string concat)
console.log("5" - 3);           // 2 (numeric operation)
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean([]));       // true (arrays are truthy!)
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(String(null));      // "null"
```

**Key Takeaway:** Always use `===` in backend code; understand falsy values for validation.

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="object-methods-property-manipulation"></a>2. Object Methods & Property Manipulation (Essential for Data Handling)

**Why?** Backend constantly manipulates objects (requests, responses, database documents).

```javascript
// ========== Object.keys / values / entries ==========
const user = { name: "Alice", age: 25, email: "alice@test.com" };

Object.keys(user);    // ["name", "age", "email"]
Object.values(user);  // ["Alice", 25, "alice@test.com"]
Object.entries(user); // [["name", "Alice"], ["age", 25], ["email", "alice@test.com"]]

// Backend use: filter request body
const allowedFields = ["name", "email"];
const filteredData = Object.keys(data)
  .filter(key => allowedFields.includes(key))
  .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});


// ========== Object.assign — merge objects ==========
const defaults = { role: "user", active: true };
const user = { name: "Alice" };
const merged = Object.assign({}, defaults, user);
// { role: "user", active: true, name: "Alice" }
// Note: Object.assign modifies first arg!


// ========== Object.freeze / Object.seal ==========
const config = Object.freeze({ apiUrl: "https://api.example.com" });
config.apiUrl = "hacked";      // ❌ fails silently (strict: TypeError)
config.newProp = "value";      // ❌ fails

// seal allows modifying existing props, not adding new ones
const sealed = Object.seal({ name: "Alice" });
sealed.name = "Bob";           // ✅ ok
sealed.age = 25;               // ❌ fails


// ========== Object.defineProperty — fine control ==========
const user = {};
Object.defineProperty(user, 'email', {
  value: 'alice@test.com',
  writable: false,      // can't change after set
  enumerable: true,     // shows in Object.keys()
  configurable: false   // can't delete/reconfigure
});

user.email = "new@test.com"; // ❌ fails silently (strict: TypeError)


// ========== Object.hasOwnProperty vs in ==========
const obj = { name: "Alice" };
Object.setPrototypeOf(obj, { inherited: "value" });

console.log('name' in obj);                  // true (own + inherited)
console.log(obj.hasOwnProperty('name'));    // true (own only)
console.log('inherited' in obj);            // true
console.log(obj.hasOwnProperty('inherited')); // false


// ========== Object.create — prototype control ==========
const animalMethods = {
  speak() { return `${this.name} makes a sound`; }
};

const dog = Object.create(animalMethods);
dog.name = "Rex";
console.log(dog.speak()); // "Rex makes a sound"


// ========== Practical Backend Example ==========
// Safe property access
function getSafeProp(obj, path) {
  return path.split('.').reduce((o, p) => o?.[p], obj);
}

const user = { profile: { name: "Alice" } };
getSafeProp(user, 'profile.name');      // "Alice"
getSafeProp(user, 'profile.nonexistent'); // undefined (no error!)
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="set-map"></a>3. Set & Map (Modern Data Structures)

**Why?** Cleaner for deduplication, lookups, and complex data handling than plain objects.

```javascript
// ========== Set — unique values ==========
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set); // Set(3) { 1, 2, 3 }

// Remove duplicates from array
const unique = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]

// Methods
set.add(4);              // add value
set.has(2);              // true
set.delete(3);           // true
set.size;                // 3
set.clear();             // remove all

// Iterate
for (const val of set) {
  console.log(val);
}

// Backend use: track active sessions, unique IPs
const activeSessions = new Set();
activeSessions.add(sessionId1);
if (activeSessions.has(sessionId1)) { /* user logged in */ }


// ========== Map — key-value pairs (better than object) ==========
const map = new Map();

// Can use ANY type as key (objects can only use strings/symbols)
map.set('name', 'Alice');
map.set(1, 'one');
map.set({ id: 123 }, { user: 'data' });

map.get('name');    // "Alice"
map.has('age');     // false
map.delete('name'); // true
map.size;           // 2

// Iterate
for (const [key, value] of map) {
  console.log(key, value);
}

// Convert to/from object
const obj = { a: 1, b: 2 };
const mapFromObj = new Map(Object.entries(obj));
const objFromMap = Object.fromEntries(map);

// Backend use: cache, user lookup
const userCache = new Map();
userCache.set(userId, userData);
if (userCache.has(userId)) { return userCache.get(userId); }

// Performance: Map.get is O(1), object property lookup similar but Map is cleaner
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="string-methods-template-literals"></a>4. String Methods & Template Literals (Common in APIs)

**Why?** APIs work with strings constantly (JSON parsing, validation, formatting).

```javascript
// ========== Template Literals ==========
const name = "Alice";
const age = 25;
const greeting = `Hello, ${name}! You are ${age} years old.`;
// "Hello, Alice! You are 25 years old."

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged template (advanced)
function highlight(strings, ...values) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i] + (values[i] || "");
  }
  return result;
}
// const tagged = highlight`Name: ${name}, Age: ${age}`;


// ========== Essential String Methods ==========
const str = "  Hello World  ";

// Trimming & case
str.trim();           // "Hello World"
str.trimStart();      // "Hello World  "
str.trimEnd();        // "  Hello World"
str.toLowerCase();    // "  hello world  "
str.toUpperCase();    // "  HELLO WORLD  "

// Searching
str.includes('World'); // true
str.startsWith('  H'); // true
str.endsWith('ld  '); // true
str.indexOf('World');  // 7
str.lastIndexOf('o');  // 7

// Extracting
str.substring(0, 5);   // "  Hel"
str.slice(0, 5);       // "  Hel"
str.slice(-5);         // "orld  "

// Splitting & joining
"a,b,c".split(',');    // ["a", "b", "c"]
["a", "b", "c"].join('-'); // "a-b-c"

// Replacing
"hello world".replace('world', 'there');     // "hello there"
"hello world world".replace(/world/g, 'universe'); // "hello universe universe"
"hello world".replaceAll('l', 'L');         // "heLLo worLd"

// Padding
"5".padStart(3, '0');   // "005"
"5".padEnd(3, '0');     // "500"

// Repeating
"abc".repeat(3);        // "abcabcabc"

// Backend use: email validation, URL parsing, formatting responses
const email = userInput.trim().toLowerCase();
const token = Math.random().toString(36).slice(2); // simple token

// HTML escaping (security)
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="regular-expressions"></a>5. Regular Expressions (Essential for Validation)

**Why?** Backend validates emails, passwords, URLs, etc.

```javascript
// ========== Basic Regex ==========
const pattern = /hello/;           // pattern
const flags = /hello/gi;           // global, case-insensitive

// Test if matches
/^[a-z]+$/.test("abc");            // true
/^[a-z]+$/.test("abc123");         // false

// Get matches
"hello world".match(/\w+/g);       // ["hello", "world"]
"hello world".match(/\w+/);        // ["hello"] — first only

// Replace with regex
"hello world".replace(/world/, "there"); // "hello there"
"hello world world".replace(/world/g, "there"); // "hello there there"


// ========== Common Backend Patterns ==========
// Email validation (basic)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("alice@example.com"); // true
emailRegex.test("invalid-email");     // false

// Password: at least 8 chars, 1 uppercase, 1 number
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
passwordRegex.test("Alice123");       // true
passwordRegex.test("alice123");       // false (no uppercase)

// URL validation
const urlRegex = /^https?:\/\/.+/;
urlRegex.test("https://example.com"); // true

// Phone number (US format)
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
phoneRegex.test("555-123-4567");      // true

// Alphanumeric with underscore/dash only
const slugRegex = /^[a-z0-9_-]+$/i;
slugRegex.test("my-slug_123");        // true


// ========== Character Classes ==========
// \d — digit (0-9)
// \D — non-digit
// \w — word char (a-z, A-Z, 0-9, _)
// \W — non-word
// \s — whitespace
// \S — non-whitespace
// . — any char (except newline)
// [abc] — a OR b OR c
// [^abc] — NOT a, b, c
// [a-z] — a through z
// ^ — start of string
// $ — end of string
// + — one or more
// * — zero or more
// ? — zero or one
// {n} — exactly n
// {n,} — n or more
// {n,m} — between n and m


// ========== Practical Backend Validation Function ==========
function validateInput(email, password) {
  const errors = [];
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format");
  }
  
  if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    errors.push("Password must be 8+ chars with uppercase and number");
  }
  
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

validateInput("alice@test.com", "Alice123");
// { valid: true }

validateInput("invalid", "weak");
// { valid: false, errors: [...] }


// ========== Using Regex in Express ==========
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  
  // Ensure id is numeric
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  
  // proceed...
});
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="null-undefined-optional-chaining"></a>6. Null & Undefined (Subtle but Critical)

**Why?** Confusing these causes bugs; backend must handle missing data safely.

```javascript
// ========== Difference ==========
let a;
console.log(a);           // undefined — declared but not assigned

let b = null;
console.log(b);           // null — explicitly set to "no value"

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (famous JS quirk!)

console.log(undefined === null); // false
console.log(undefined == null);  // true


// ========== When They Occur ==========
// undefined:
let x;                    // declared, not initialized
function test() {}        // no return
function test() { return; } // implicit return

const obj = { a: 1 };
obj.b;                    // accessing missing property

// null:
const y = null;           // explicitly set
JSON.parse('{"a":null}'); // parsed JSON with null


// ========== Optional Chaining (?.) — prevent errors ==========
const user = { profile: { name: "Alice" } };

// Old way — crashes if user is null/undefined
// user.profile.name

// Safe way
user?.profile?.name;           // "Alice"
const nullUser = null;
nullUser?.profile?.name;       // undefined (no error!)

// With function calls
user?.sayHello?.();            // calls only if exists

// With array access
const arr = null;
arr?.[0];                      // undefined (no error)


// ========== Nullish Coalescing (??) — default values ==========
// ?? returns right if left is null/undefined (not just falsy)

const value = 0;
value || 10;               // 10 (0 is falsy)
value ?? 10;               // 0 (0 is not nullish)

const count = null;
count ?? 0;                // 0

const age = undefined;
age ?? 18;                 // 18

// Difference:
const score = 0;
score || 10;               // 10 — wrong! (0 is valid score)
score ?? 10;               // 0 — correct!


// ========== Backend Validation Pattern ==========
function processUser(data) {
  const email = data?.email;       // safe access
  const age = data?.age ?? 18;     // default if null/undefined
  
  if (!email) {
    throw new Error("Email required");
  }
  
  return { email, age };
}

processUser(null);                   // throws error
processUser({ email: "alice@test.com" }); // { email: "alice@test.com", age: 18 }
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="json-serialization-parsing"></a>7. JSON & Data Serialization (Core Backend Skill)

**Why?** APIs consume/produce JSON; understanding parsing, stringifying, and edge cases is critical.

```javascript
// ========== JSON.stringify ==========
const user = { name: "Alice", age: 25, email: "alice@test.com" };

const json = JSON.stringify(user);
// '{"name":"Alice","age":25,"email":"alice@test.com"}'

// With formatting (pretty print)
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "Alice",
//   "age": 25,
//   "email": "alice@test.com"
// }

// Replacer function — filter/transform during stringify
const filtered = JSON.stringify(user, (key, value) => {
  // skip password fields
  if (key === 'password') return undefined;
  return value;
});

// Replacer array — only include specific keys
const partial = JSON.stringify(user, ['name', 'email']);
// '{"name":"Alice","email":"alice@test.com"}'


// ========== JSON.parse ==========
const jsonStr = '{"name":"Alice","age":25}';
const parsed = JSON.parse(jsonStr);
// { name: "Alice", age: 25 }

// With reviver function — transform after parsing
const dateStr = '{"date":"2024-01-15T10:00:00Z"}';
const withDate = JSON.parse(dateStr, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});
console.log(withDate.date instanceof Date); // true


// ========== Common Pitfalls ==========
// Circular reference
const obj = { name: "Alice" };
obj.self = obj;
JSON.stringify(obj); // ❌ TypeError: circular structure


// Undefined & functions are lost
const data = { name: "Alice", fn: () => {}, undef: undefined };
JSON.stringify(data);
// '{"name":"Alice"}' — fn and undef disappear!


// Dates become strings
const event = { name: "Conference", date: new Date() };
JSON.stringify(event);
// '{"name":"Conference","date":"2024-01-15T10:00:00.000Z"}'
// date is now a string!


// ========== Best Practices for APIs ==========
// When sending response
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Remove sensitive fields
    const { password, ...safe } = user.toObject();
    res.json(safe);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// When receiving request
app.post('/users', (req, res) => {
  try {
    const data = req.body; // already parsed by express.json()
    
    // Validate before processing
    if (!data.name || !data.email) {
      return res.status(400).json({ error: "name and email required" });
    }
    
    // Process...
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON" });
  }
});
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="advanced-error-handling"></a>8. Try/Catch with Finally & Error Context (Refine Error Handling)

**Why?** You have try/catch basics; add resource cleanup, error context, and logging patterns.

```javascript
// ========== Finally block use cases ==========
async function fetchAndProcess(url) {
  let connection;
  try {
    connection = await db.connect();
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  } finally {
    // ALWAYS runs — cleanup resources
    if (connection) {
      await connection.close();
    }
  }
}

// File handling
function readConfig() {
  let file;
  try {
    file = fs.openSync('config.json');
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Config error: ${error.message}`);
  } finally {
    if (file) {
      fs.closeSync(file); // ensure file is closed
    }
  }
}


// ========== Wrapping errors with context ==========
async function createUser(data) {
  try {
    validateInput(data);
    const user = await User.create(data);
    return user;
  } catch (error) {
    // Add context
    const contextError = new Error(`Failed to create user: ${error.message}`);
    contextError.originalError = error;
    contextError.context = { data };
    throw contextError;
  }
}

// Catch and add more context
try {
  await createUser(userData);
} catch (error) {
  error.userId = userId;
  error.timestamp = new Date();
  logger.error(error); // log with full context
  res.status(500).json({ error: "User creation failed" });
}


// ========== Error logging pattern ==========
function logError(error, context = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    message: error.message,
    name: error.name,
    stack: error.stack,
    context: context,
    // Add request context if available
    ...(context.req && {
      method: context.req.method,
      url: context.req.url,
      userId: context.req.user?.id
    })
  };
  
  console.error(JSON.stringify(log, null, 2));
  // In production: send to error tracking service (Sentry, etc.)
}

app.use((err, req, res, next) => {
  logError(err, { req });
  res.status(err.statusCode || 500).json({ error: err.message });
});


// ========== Handling specific error types ==========
async function processData(input) {
  try {
    const parsed = JSON.parse(input);
    const result = await database.save(parsed);
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON: ${error.message}`);
    } else if (error.code === 'UNIQUE_CONSTRAINT') {
      throw new Error("Data already exists");
    } else if (error instanceof TypeError) {
      throw new Error(`Type error during processing: ${error.message}`);
    } else {
      throw error; // re-throw unknown errors
    }
  }
}
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

# 🟡 TIER 2 — Important for Production (Add After Tier 1)

## <a id="immutability-patterns"></a>9. Immutability & Mutation Patterns (Prevent Bugs)

**Why?** Mutating shared data causes bugs; understanding immutability helps write safer code.

```javascript
// ========== Mutating vs Creating New ==========
// ❌ Mutation — modifies original
const arr = [1, 2, 3];
arr.push(4);           // arr is now [1, 2, 3, 4]
arr.sort((a, b) => b - a); // arr is now [4, 3, 2, 1]

// ✅ Non-mutating — creates new array
const arr = [1, 2, 3];
const arr2 = [...arr, 4];
const arr3 = [...arr].sort((a, b) => b - a);
// arr is still [1, 2, 3]


// ========== Object Mutations ==========
// ❌ Mutation
const user = { name: "Alice", age: 25 };
user.age = 26; // modifies original

// ✅ Non-mutating
const updated = { ...user, age: 26 }; // new object
const updated2 = Object.assign({}, user, { age: 26 });


// ========== Nested Immutability ==========
const user = {
  name: "Alice",
  address: { city: "NYC", zip: "10001" }
};

// ❌ This looks safe but modifies nested address!
const modified = { ...user, name: "Bob" };
modified.address.city = "LA"; // affects original user.address.city!

// ✅ Deep copy for nested objects
const deepCopy = JSON.parse(JSON.stringify(user));
// OR use structuredClone (modern JS)
const deepCopy2 = structuredClone(user);

// ✅ Or spread nested too
const modified = {
  ...user,
  name: "Bob",
  address: { ...user.address, city: "LA" }
};


// ========== Methods that mutate ==========
// Array mutations: push, pop, shift, unshift, splice, sort, reverse
// Object mutations: directly assigning properties

// ========== Methods that don't mutate ==========
// Array non-mutations: concat, slice, map, filter, reduce, flat, flatMap
// Object non-mutations: {...obj}, Object.assign (use with empty object as target)


// ========== Immutable patterns in backend ==========
// Database: don't modify fetched object directly
const user = await User.findById(id);
// ❌ Wrong
user.email = "new@test.com";
await user.save();

// ✅ Better
const updated = await User.findByIdAndUpdate(id, { email: "new@test.com" });

// ✅ Or modify & save
const user = await User.findById(id);
user.email = "new@test.com";
await user.save();

// State management: don't modify state directly
// ❌ Redux/state management anti-pattern
state.user.name = "Bob"; // directly mutating state

// ✅ Return new object
return { ...state, user: { ...state.user, name: "Bob" } };
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="generators-async-iterators"></a>10. Generators & Iterators (Advanced but Important for Streaming)

**Why?** Generators enable lazy evaluation and streaming; useful for large data processing.

```javascript
// ========== Generator Functions ==========
function* count(max) {
  let i = 0;
  while (i < max) {
    yield i; // pause and return value
    i++;
  }
}

const gen = count(3);
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: undefined, done: true }

// Use with for...of
for (const val of count(3)) {
  console.log(val); // 0, 1, 2
}


// ========== Generators with yield value ==========
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = [...fibonacci(5)]; // [0, 1, 1, 2, 3]


// ========== Async Generators (important for streaming) ==========
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data; // yield async results
  }
}

// Use with for await...of
for await (const data of fetchData(urlList)) {
  console.log("Received:", data);
}


// ========== Practical: Stream large data ==========
// Instead of loading 1M items into memory:
async function* readLargeFile(filename) {
  const stream = fs.createReadStream(filename);
  for await (const chunk of stream) {
    yield chunk;
  }
}

// Process in chunks
for await (const chunk of readLargeFile('large.txt')) {
  processChunk(chunk); // 1 chunk at a time
}
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="weakmap-weakset"></a>11. WeakMap & WeakSet (Memory Management)

**Why?** Prevent memory leaks; useful for caching, private data.

```javascript
// ========== WeakMap — objects as keys, weak references ==========
// Objects in WeakMap can be garbage collected
const cache = new WeakMap();

const user = { id: 1, name: "Alice" };
cache.set(user, "cached data");

console.log(cache.get(user)); // "cached data"
console.log(cache.has(user)); // true

// If user is no longer referenced elsewhere, it can be garbage collected
// and the WeakMap entry disappears automatically

// Use case: storing metadata without preventing GC
function getUserMetadata(user) {
  if (!userMetadata.has(user)) {
    userMetadata.set(user, { views: 0, lastAccess: null });
  }
  return userMetadata.get(user);
}


// ========== WeakSet — weak references, can only store objects ==========
const visited = new WeakSet();

const page1 = { title: "Home" };
const page2 = { title: "About" };

visited.add(page1);
visited.has(page1); // true
visited.delete(page2); // ok (even if not added)
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

# 🟢 TIER 3 — Advanced & Interview Signal (Add After Tier 2)

## <a id="symbol"></a>12. Symbol (Advanced Type)

**Why?** Less common but shows advanced knowledge; useful for private properties, well-known symbols.

```javascript
// ========== Basic Symbols ==========
const sym = Symbol("unique"); // each Symbol is unique
const sym2 = Symbol("unique");
console.log(sym === sym2); // false — even with same description


// ========== Use in objects ==========
const user = {
  name: "Alice",
  [Symbol.for('privateEmail')]: "private@test.com" // "private" symbol key
};

console.log(Object.keys(user)); // ["name"] — symbols not enumerated
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(privateEmail)]


// ========== Well-known Symbols ==========
// Symbol.iterator — makes object iterable
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < 3) return { value: i++, done: false };
        return { done: true };
      }
    };
  }
};

for (const val of iterable) {
  console.log(val); // 0, 1, 2
}


// ========== Symbol.toStringTag ==========
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}

const obj = new MyClass();
Object.prototype.toString.call(obj); // "[object MyClass]"
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="proxy-reflect"></a>13. Proxy & Reflect (Metaprogramming)

**Why?** Advanced but powerful; useful for validation, logging, API design.

```javascript
// ========== Proxy — intercept operations ==========
const target = { x: 10 };

const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    if (typeof value !== 'number') {
      throw new TypeError("Must be a number");
    }
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
proxy.x;        // logs: "Getting x"
proxy.x = 20;   // logs: "Setting x to 20"
proxy.x = "bad"; // throws TypeError


// ========== Practical: Validation proxy ==========
const user = {
  name: "Alice",
  age: 25,
  email: "alice@test.com"
};

const validatedUser = new Proxy(user, {
  set(target, prop, value) {
    if (prop === 'email' && !value.includes('@')) {
      throw new Error("Invalid email");
    }
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new Error("Invalid age");
    }
    target[prop] = value;
    return true;
  }
});

validatedUser.email = "invalid"; // throws error
validatedUser.age = 30; // ok


// ========== Reflect — standardized way to do operations ==========
const obj = { name: "Alice" };

Reflect.get(obj, 'name');         // "Alice"
Reflect.set(obj, 'age', 25);      // true
Reflect.has(obj, 'name');         // true
Reflect.deleteProperty(obj, 'age'); // true

// Reflect + Proxy
const handler2 = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return Reflect.get(target, prop);
  }
};
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="value-vs-reference-deep-dive"></a>14. Comparing Value vs Reference (Deep Understanding)

**Why?** Essential to avoid bugs in data mutations and comparisons.

```javascript
// ========== Primitives (Value Type) ==========
let a = 5;
let b = a;
b = 10;

console.log(a); // 5 — a is unaffected (copy of value)

// Primitives: number, string, boolean, undefined, null, symbol, BigInt
// Comparison: by value
console.log(5 === 5); // true (same value)


// ========== Objects & Arrays (Reference Type) ==========
let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 points to same array
arr2.push(4);

console.log(arr1); // [1, 2, 3, 4] — arr1 is affected!

// Objects/Arrays: stored by reference
const obj1 = { name: "Alice" };
const obj2 = obj1; // obj2 points to obj1
obj2.name = "Bob";
console.log(obj1.name); // "Bob" — obj1 is affected!

// Comparison: by reference
const x = { a: 1 };
const y = { a: 1 };
console.log(x === y); // false — different objects, even same content!
console.log(x === x); // true — same reference


// ========== Functions (also reference type) ==========
const fn1 = () => "hello";
const fn2 = fn1;
fn2 === fn1; // true — same reference

const fn3 = () => "hello";
fn3 === fn1; // false — different function objects


// ========== Practical impact ==========
// Mutation affects all references
const users = [{ id: 1, name: "Alice" }];
const user = users[0];
user.name = "Bob"; // affects users[0] too!

// Avoid with spreading
const users2 = [{ id: 1, name: "Alice" }];
const user2 = { ...users2[0] }; // shallow copy
user2.name = "Charlie"; // users2[0] is not affected

// But nested objects still reference
const nested = { user: { name: "Alice" } };
const copy = { ...nested };
copy.user.name = "Bob"; // affects nested too!

// Deep copy for nested
const deepCopy = structuredClone(nested); // modern way
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="big-o-notation"></a>15. Big O Notation Basics (Algorithm Efficiency)

**Why?** Interview must-have; understand why some approaches are better.

```javascript
// ========== Time Complexity ==========
// O(1) — constant: accessing array element, hash lookup
const arr = [1, 2, 3, 4, 5];
arr[0]; // O(1) — instant

// O(n) — linear: loop through array
arr.forEach(item => console.log(item)); // O(n)

// O(n²) — quadratic: nested loops
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // do something
  }
}

// O(log n) — logarithmic: binary search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n log n) — efficient sorting: quicksort, mergesort
arr.sort((a, b) => a - b); // typically O(n log n)

// O(2^n) — exponential: recursive without memoization
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2^n) — very slow!
}

// ========== Space Complexity ==========
// O(1) — constant space
function findMax(arr) {
  let max = arr[0];
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max; // only stores one number
}

// O(n) — linear space
function getDoubled(arr) {
  return arr.map(n => n * 2); // creates new array of size n
}

// ========== Trade-offs ==========
// Sometimes trade time for space (caching/memoization)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
// Time: O(n), Space: O(n) — much better!
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

## <a id="practical-backend-algorithms"></a>16. Practical Algorithms (Backend Relevant)

**Why?** Shows you can solve real problems.

```javascript
// ========== Rate Limiter (Token Bucket) ==========
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow; // ms
    this.requests = new Map(); // IP -> [timestamps]
  }

  isAllowed(ip) {
    const now = Date.now();
    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }

    const timestamps = this.requests.get(ip);
    // Remove old timestamps outside window
    const filtered = timestamps.filter(t => now - t < this.timeWindow);

    if (filtered.length < this.maxRequests) {
      filtered.push(now);
      this.requests.set(ip, filtered);
      return true;
    }
    return false;
  }
}

const limiter = new RateLimiter(5, 60000); // 5 requests per minute
console.log(limiter.isAllowed("192.168.1.1")); // true
console.log(limiter.isAllowed("192.168.1.1")); // true


// ========== LRU Cache (Least Recently Used) ==========
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to end
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey); // remove oldest
    }
  }
}

const cache = new LRUCache(2);
cache.put(1, "a");
cache.put(2, "b");
console.log(cache.get(1)); // "a"
cache.put(3, "c"); // evicts 2
console.log(cache.get(2)); // -1 (not found)


// ========== Debounce ==========
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce(async (query) => {
  console.log("Searching for:", query);
}, 300);

search("a");
search("ab");
search("abc"); // only this runs after 300ms


// ========== Throttle ==========
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

const handleResize = throttle(() => {
  console.log("Window resized");
}, 1000); // max once per second
```

<a href="#complete-table-of-contents">⬆️ Back to Table of Contents</a>

---

# 📊 <a id="summary-what-to-add-complete-checklist"></a>Summary: What to Add (Complete Checklist)

| Section | Priority | Est. Length | Key for |
|---|---|---|---|
| **Type Coercion & Equality** | 🔴 TIER 1 | 300 words | Validation, comparisons |
| **Object Methods** | 🔴 TIER 1 | 400 words | Data manipulation |
| **Set & Map** | 🔴 TIER 1 | 300 words | Modern data structures |
| **Strings & RegEx** | 🔴 TIER 1 | 600 words | Validation, parsing |
| **Null & Undefined** | 🔴 TIER 1 | 250 words | Safe access, defaults |
| **JSON Serialization** | 🔴 TIER 1 | 350 words | APIs, persistence |
| **Try/Catch Advanced** | 🔴 TIER 1 | 300 words | Cleanup, logging |
| **Immutability** | 🟡 TIER 2 | 250 words | Prevent bugs |
| **Generators** | 🟡 TIER 2 | 300 words | Streaming, lazy eval |
| **WeakMap/WeakSet** | 🟡 TIER 2 | 150 words | Memory management |
| **Symbol** | 🟢 TIER 3 | 150 words | Advanced knowledge |
| **Proxy & Reflect** | 🟢 TIER 3 | 300 words | Metaprogramming |
| **Value vs Reference** | 🟢 TIER 3 | 250 words | Deep understanding |
| **Big O Notation** | 🟢 TIER 3 | 300 words | Interview prep |
| **Practical Algorithms** | 🟢 TIER 3 | 400 words | Real-world problems |

---

# 🎯 <a id="recommended-addition-order"></a>Recommended Addition Order

1. **Start with TIER 1** (1–2 weeks) — these are essential and used daily in backend
2. **Move to TIER 2** (1 week) — important patterns, production-grade code
3. **Finish with TIER 3** (1 week) — interview signal, advanced concepts

---

## 🔗 <a id="best-free-resources-links"></a>Best Free Resources (Links)

- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide">MDN JavaScript Guide</a> — The definitive reference
- <a href="https://javascript.info/">JavaScript.info</a> — Modern tutorial with deep dives
- <a href="https://nodejs.org/en/docs/">Node.js Documentation</a> — Backend-specific APIs
- <a href="https://github.com/getify/You-Dont-Know-JS">You Don't Know JS (Book Series)</a> — Free on GitHub
- <a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/">In The Loop (Event Loop Article)</a> — Visual explanation
- <a href="https://tc39.es/ecma262/">ECMAScript Specification</a> — For advanced learners

---

<a href="#top-of-page">⬆️ Back to Top</a>
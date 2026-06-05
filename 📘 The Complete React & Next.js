📘 The Complete React & Next.js Bible
FINAL MERGED & ENHANCED Table of Contents
How to Read This: This is the complete, merged, deduplicated, and enhanced version of all three TOC documents. Topics are reorganized logically, duplicates removed, best content from each source preserved, and gaps filled.

PART A: WEB FUNDAMENTALS & HOW THE INTERNET WORKS
(New students start here — even if you know nothing)

Chapter 1: How the Web Works
text

1.1  The Internet vs The World Wide Web
     - What is the Internet?
     - What is the WWW?
     - Brief History: Web 1.0 → Web 2.0 → Web 3.0
     - How data travels across the internet

1.2  Client-Server Architecture
     - What is a Client?
     - What is a Server?
     - Request → Response Cycle (step by step)
     - Peer-to-Peer vs Client-Server

1.3  What Happens When You Type a URL?
     - Step 1: Browser checks cache
     - Step 2: DNS Resolution (Domain Name System)
       - What is DNS?
       - Recursive vs Iterative DNS Lookup
       - DNS Cache (Browser, OS, ISP, Root)
     - Step 3: TCP/IP Connection (3-way handshake)
     - Step 4: TLS/SSL Handshake (for HTTPS)
     - Step 5: HTTP Request sent
     - Step 6: Server processes & responds
     - Step 7: Browser renders the page
     - What is a CDN? How does it help?

1.4  HTTP & HTTPS — Deep Dive
     - What is HTTP? (HyperText Transfer Protocol)
     - What is HTTPS? Why does it matter?
     - HTTP Versions:
       - HTTP/1.0 — one request per connection
       - HTTP/1.1 — persistent connections, pipelining
       - HTTP/2 — multiplexing, header compression, server push
       - HTTP/3 (QUIC) — UDP-based, faster
     - HTTP vs HTTPS (SSL/TLS explained)

1.5  HTTP Methods (Verbs) — Complete Reference
     - GET     → Retrieve data (safe, idempotent)
     - POST    → Create data (not safe, not idempotent)
     - PUT     → Replace entire resource (idempotent)
     - PATCH   → Partially update resource
     - DELETE  → Remove resource (idempotent)
     - HEAD    → Like GET but no body
     - OPTIONS → CORS preflight, what methods allowed
     - TRACE   → Debugging loop-back
     - CONNECT → Tunneling (HTTPS through proxy)
     - Safe vs Unsafe Methods
     - Idempotent vs Non-Idempotent Methods
     ✅ Interview: PUT vs PATCH, GET vs POST

1.6  HTTP Headers — Complete Reference
     - Request Headers:
       Accept, Authorization, Content-Type, Cookie,
       User-Agent, Origin, Referer, Cache-Control,
       If-Modified-Since, Accept-Encoding
     - Response Headers:
       Set-Cookie, Cache-Control, Content-Type,
       Access-Control-Allow-Origin, ETag,
       Location (for redirects), X-Frame-Options
     - Custom Headers (X-Custom-Header)
     - Security Headers (HSTS, CSP, X-XSS-Protection)

1.7  HTTP Status Codes — Full Reference
     ─────────────────────────────────
     1xx INFORMATIONAL
     - 100 Continue
     - 101 Switching Protocols
     - 102 Processing

     2xx SUCCESS
     - 200 OK
     - 201 Created
     - 202 Accepted
     - 204 No Content
     - 206 Partial Content

     3xx REDIRECTION
     - 301 Moved Permanently
     - 302 Found (Temporary Redirect)
     - 304 Not Modified (cached)
     - 307 Temporary Redirect (method preserved)
     - 308 Permanent Redirect (method preserved)

     4xx CLIENT ERRORS
     - 400 Bad Request
     - 401 Unauthorized (not authenticated)
     - 403 Forbidden (authenticated but no permission)
     - 404 Not Found
     - 405 Method Not Allowed
     - 408 Request Timeout
     - 409 Conflict
     - 410 Gone (permanently deleted)
     - 413 Payload Too Large
     - 415 Unsupported Media Type
     - 422 Unprocessable Entity (validation failed)
     - 429 Too Many Requests (rate limiting)

     5xx SERVER ERRORS
     - 500 Internal Server Error
     - 501 Not Implemented
     - 502 Bad Gateway
     - 503 Service Unavailable
     - 504 Gateway Timeout
     ─────────────────────────────────
     ✅ Interview: 401 vs 403, 301 vs 302 vs 307 vs 308
     ✅ Interview: 400 vs 422, 502 vs 503 vs 504

1.8  URLs, URIs & URNs
     - What is a URL? Anatomy:
       protocol://username:password@host:port/path?query#fragment
     - What is a URI? (superset of URL)
     - What is a URN? (name-based identifier)
     - URL Encoding (%20, %2F, etc.)
     - Query Parameters vs Path Parameters

1.9  REST API Fundamentals
     - What is an API?
     - What is REST?
     - REST Constraints:
       Stateless, Client-Server, Cacheable,
       Uniform Interface, Layered System, Code on Demand
     - RESTful API Design Principles
     - REST vs GraphQL vs gRPC vs WebSocket
     - API Authentication:
       API Keys, OAuth 2.0, JWT, Session-based

1.10 CORS (Cross-Origin Resource Sharing)
     - What is Same-Origin Policy?
     - What is CORS? Why does it exist?
     - Simple Requests vs Preflight Requests
     - CORS Headers Explained
     - How to fix CORS errors (frontend & backend)
     - CORS in development vs production

1.11 Cookies, Sessions & Tokens
     - What are Cookies?
       Types: Session, Persistent, Secure, HttpOnly, SameSite
     - What are Sessions?
     - Session-based vs Token-based Auth
     - JWT (JSON Web Token):
       - Structure: Header.Payload.Signature
       - Signing algorithms (HS256, RS256)
       - Access tokens vs Refresh tokens
     - Where to store tokens:
       localStorage vs sessionStorage vs Cookies
       Security implications of each

1.12 Web Storage APIs
     - localStorage (persistent, 5-10MB)
     - sessionStorage (per tab, cleared on close)
     - IndexedDB (large structured data)
     - Cookies (small, sent with every request)
     - Comparison table & use cases

1.13 Browser Rendering Pipeline
     - Step 1: Parse HTML → DOM Tree
     - Step 2: Parse CSS → CSSOM Tree
     - Step 3: DOM + CSSOM → Render Tree
     - Step 4: Layout / Reflow (positioning)
     - Step 5: Paint (pixels)
     - Step 6: Composite (layers)
     - Critical Rendering Path
     - Render-blocking resources
     - async vs defer attributes on scripts
     ✅ Interview: What is reflow vs repaint?
PART B: JAVASCRIPT PREREQUISITES FOR REACT
Chapter 2: JavaScript Engine, Runtime & Execution
text

2.1  JavaScript Engine
     - What is a JS Engine? (V8, SpiderMonkey, JavaScriptCore)
     - Parsing → Compilation → Execution
     - JIT (Just-In-Time) compilation
     - Interpreter vs Compiler

2.2  JavaScript Runtime Environment
     - Browser Runtime vs Node.js Runtime
     - Call Stack — how function calls work
     - Memory Heap — where objects are stored
     - Web APIs (setTimeout, DOM, fetch, etc.)
     - Callback Queue (Task Queue / Macrotask Queue)
     - Microtask Queue (Promise queue)

2.3  The Event Loop — Complete Deep Dive
     - What is the Event Loop?
     - Execution order:
       Call Stack → Microtasks → Macrotasks
     - Microtasks: Promise.then, queueMicrotask, MutationObserver
     - Macrotasks: setTimeout, setInterval, setImmediate
     - Why Promises run before setTimeout
     - Visualized step-by-step examples
     ✅ Interview: 15+ Event Loop output questions

2.4  Execution Context & Hoisting
     - Global Execution Context (GEC)
     - Function Execution Context (FEC)
     - Phases: Creation Phase → Execution Phase
     - Variable Environment & Lexical Environment
     - What gets hoisted:
       var → hoisted + initialized as undefined
       let/const → hoisted but NOT initialized (TDZ)
       function declarations → fully hoisted
       function expressions → only variable hoisted
       class declarations → hoisted but in TDZ
     - Temporal Dead Zone (TDZ) explained
     ✅ Interview: 15+ hoisting output questions

2.5  Scope & Scope Chain
     - Global Scope
     - Function Scope
     - Block Scope (let, const inside {})
     - Lexical / Static Scope
     - Scope Chain — how JS looks up variables
     - Variable Shadowing
     - Illegal Shadowing (let can't shadow var in same scope)
Chapter 3: JavaScript Fundamentals You MUST Know
text

3.1  Variables — var, let, const
     - Differences: scope, hoisting, re-declaration, re-assignment
     - var: function-scoped, hoisted, can be re-declared
     - let: block-scoped, not re-declarable, TDZ
     - const: block-scoped, must be initialized, reference immutable
     - const with objects and arrays (content CAN be mutated)
     - When to use what (modern: prefer const, then let, avoid var)
     ✅ Interview: 10+ var/let/const tricky questions

3.2  Data Types — Primitive vs Reference
     - Primitive types (stored on Stack by value):
       string, number, bigint, boolean, undefined, null, symbol
     - Reference types (stored on Heap by reference):
       object, array, function, Date, RegExp, Map, Set
     - typeof operator — quirks:
       typeof null === 'object' (bug in JS)
       typeof function === 'function'
       typeof undefined === 'undefined'
     - instanceof operator — prototype chain check
     - Checking types safely: Object.prototype.toString.call()

3.3  Type Coercion & Type Checking
     - Implicit coercion (automatic): 1 + "2" = "12"
     - Explicit conversion: Number(), String(), Boolean()
     - Truthy values: everything except the 6 falsy values
     - Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
     - == (Abstract Equality) — type coercion happens
     - === (Strict Equality) — no coercion, type must match
     - Object.is() — same as === but handles NaN and -0
     ✅ Interview: 20+ coercion output questions

3.4  Strings — Template Literals & Methods
     - Template literals: `Hello ${name}`
     - Tagged templates (advanced)
     - String methods:
       length, charAt, charCodeAt, indexOf, lastIndexOf,
       includes, startsWith, endsWith, slice, substring,
       toUpperCase, toLowerCase, trim, trimStart, trimEnd,
       split, replace, replaceAll, repeat, padStart, padEnd,
       at(), matchAll()
     - String immutability

3.5  Numbers & Math
     - Integer vs float representation (IEEE 754)
     - 0.1 + 0.2 !== 0.3 — why?
     - NaN — Not a Number (isNaN vs Number.isNaN)
     - Infinity, -Infinity
     - Number methods: toFixed, toPrecision, parseInt, parseFloat
     - Math object: round, floor, ceil, random, abs, max, min, pow, sqrt

3.6  Conditionals
     - if / else if / else
     - switch statement (fall-through gotcha)
     - Ternary operator condition ? a : b
     - Short-circuit: && and ||
     - Optional chaining: obj?.prop?.method?.()
     - Nullish coalescing: value ?? 'default'
     - Logical assignment: ||=, &&=, ??=

3.7  Loops
     - for loop (classic)
     - while loop
     - do...while loop
     - for...of (iterables: arrays, strings, Map, Set)
     - for...in (object keys — use with caution)
     - forEach vs for...of vs for...in
     - break, continue, labeled statements

3.8  Functions — Four Types
     - Function Declaration: function greet() {}
       Hoisted fully, has own 'this'
     - Function Expression: const greet = function() {}
       Not hoisted, has own 'this'
     - Arrow Function: const greet = () => {}
       Not hoisted, LEXICAL 'this', no arguments object
     - IIFE: (function() {})()
       Runs immediately, creates private scope
     ✅ Interview: When NOT to use arrow functions?

3.9  Parameters & Arguments
     - Parameters (definition) vs Arguments (call-time values)
     - Default parameters: function(x = 0)
     - Rest parameters: function(...args) — collects into array
     - Arguments object (only in regular functions, not arrows)
     - Spread in function calls: Math.max(...arr)

3.10 Callback Functions
     - What is a callback?
     - Synchronous callbacks (Array.forEach)
     - Asynchronous callbacks (setTimeout, event listeners)
     - Callback hell / Pyramid of Doom
     - Inversion of Control problem

3.11 Strict Mode
     - "use strict" — what it does
     - Prevents: undeclared variables, duplicate params,
       deleting undeletable props, 'this' in global = undefined
     - ES6 modules are always strict mode
Chapter 4: Objects & Arrays — Deep Dive
text

4.1  Object Creation Patterns
     - Object literal: {}
     - Constructor function: function Person() {}
     - Object.create(proto) — explicit prototype
     - ES6 Class syntax (sugar over prototypes)
     - Factory functions

4.2  Property Access & Manipulation
     - Dot notation: obj.name
     - Bracket notation: obj['name'] (dynamic keys)
     - Computed property names: { [key]: value }
     - Property shorthand: { name, age } instead of { name: name, age: age }
     - Optional chaining: obj?.nested?.prop
     - Property existence: 'key' in obj vs obj.hasOwnProperty('key')

4.3  Object Destructuring
     - Basic: const { name, age } = person
     - Renaming: const { name: userName } = person
     - Default values: const { name = 'Guest' } = person
     - Nested destructuring: const { address: { city } } = person
     - In function parameters: function({ name, age }) {}

4.4  Object Methods — Complete Reference
     - Object.keys(obj) → array of keys
     - Object.values(obj) → array of values
     - Object.entries(obj) → array of [key, value] pairs
     - Object.assign(target, source) → shallow merge
     - Object.freeze(obj) → prevent modifications
     - Object.seal(obj) → prevent add/delete (can modify)
     - Object.create(proto) → create with prototype
     - Object.fromEntries(entries) → reverse of entries
     - Object.getPrototypeOf(obj)
     - Object.defineProperty / defineProperties

4.5  Spread & Rest with Objects
     - Spread to copy/merge: { ...obj1, ...obj2 }
     - Rest to collect remaining: const { a, ...rest } = obj
     - Spread is SHALLOW copy

4.6  Shallow Copy vs Deep Copy
     - Shallow copy methods:
       Object.assign({}, obj)
       Spread: { ...obj }
       Array: [...arr]
     - Deep copy methods:
       JSON.parse(JSON.stringify(obj)) — limitations (no functions, Date, undefined)
       structuredClone(obj) — modern, handles most types
       Lodash _.cloneDeep()
     - When shallow is enough vs when you need deep
     ✅ Interview: Difference + real-world implications

4.7  Arrays — Creation & Core Methods
     - Array literal: []
     - Array.from(iterable) — from string, Set, NodeList
     - Array.of(...items)
     - Array.isArray(value)

4.8  Array Methods — Complete Deep Dive
     ─── MUTATING METHODS (avoid in React state) ───
     - push() — add to end, returns new length
     - pop() — remove from end, returns removed
     - shift() — remove from start
     - unshift() — add to start
     - splice(start, deleteCount, ...items) — insert/remove anywhere
     - sort(compareFn) — mutates! sorts in place
     - reverse() — mutates!
     - fill(value, start, end)

     ─── NON-MUTATING METHODS (React-friendly) ───
     - map(fn) → new array, same length, transformed
     - filter(fn) → new array, only truthy items
     - reduce(fn, initial) → single accumulated value
     - find(fn) → first matching item or undefined
     - findIndex(fn) → index of first match or -1
     - some(fn) → true if any match
     - every(fn) → true if all match
     - includes(value) → boolean
     - indexOf(value) → first index or -1
     - slice(start, end) → portion of array
     - concat(...arrays) → merged array
     - flat(depth) → flatten nested arrays
     - flatMap(fn) → map then flat(1)
     - forEach(fn) → loop, returns undefined
     - join(separator) → string from array
     - at(index) → supports negative index

     ─── METHOD CHAINING ───
     arr.filter(x => x > 0).map(x => x * 2).reduce(...)

4.9  Array Destructuring
     - Basic: const [first, second] = arr
     - Skip elements: const [a, , c] = arr
     - Rest: const [first, ...rest] = arr
     - Default values: const [x = 0] = arr
     - Swap variables: [a, b] = [b, a]

4.10 Polyfills for Array Methods
     ✅ Interview: Implement Array.map from scratch
     ✅ Interview: Implement Array.filter from scratch
     ✅ Interview: Implement Array.reduce from scratch
     ✅ Interview: Implement Array.flat from scratch
     (Full implementations provided with explanation)
Chapter 5: Functions — Deep Dive & Advanced Patterns
text

5.1  Pure Functions vs Impure Functions
     - Pure: same input → same output, no side effects
     - Impure: depends on external state, causes side effects
     - Why React wants pure components

5.2  First-Class & Higher-Order Functions
     - Functions as values (assign, pass, return)
     - Higher-Order Functions (HOF): takes/returns function
     - Real examples: map, filter, reduce, sort

5.3  Closures — Complete Guide
     - What is a closure? (function + its lexical environment)
     - Lexical environment explained
     - Practical closure examples:
       - Data privacy / encapsulation
       - Function factories
       - Module pattern
       - Memoization
       - Partial application
       - Event handlers capturing variables
     - Classic interview: setTimeout in for loop with var vs let
     - Closures and memory leaks
     - Garbage collection basics
     ✅ Interview: 15+ closure output questions
     ✅ Interview: Explain with real-world use case

5.4  'this' Keyword — Complete Rules
     Rule 1: Default binding — global (window) or undefined (strict)
     Rule 2: Implicit binding — object before the dot
     Rule 3: Explicit binding — call, apply, bind
     Rule 4: 'new' binding — newly created object
     Rule 5: Arrow functions — lexical (from enclosing scope)
     Rule 6: In classes — the class instance
     Rule 7: Event handlers — the element (unless arrow)
     - Priority order of rules
     ✅ Interview: 20+ 'this' output questions

5.5  call(), apply(), bind()
     - call(thisArg, arg1, arg2) — invoke immediately
     - apply(thisArg, [arg1, arg2]) — invoke immediately, array args
     - bind(thisArg) — returns new function, doesn't invoke
     - Practical use cases
     ✅ Interview: Implement call, apply, bind from scratch (polyfills)

5.6  Currying & Partial Application
     - What is currying? f(a, b, c) → f(a)(b)(c)
     - What is partial application?
     - Real use cases in React (event handlers)
     - Implementing curry from scratch
     ✅ Interview: Write a generic curry function

5.7  Function Composition & Pipe
     - compose(f, g) → f(g(x)) — right to left
     - pipe(f, g) → g(f(x)) — left to right
     - Functional programming concepts
     ✅ Interview: Implement compose and pipe

5.8  Memoization
     - What is memoization?
     - Implementing memoize from scratch
     - Cache using Map or object
     - Trade-offs (memory vs speed)
     - React's useMemo as memoization
     ✅ Interview: Implement memoize function

5.9  Debouncing & Throttling
     - What is debouncing?
       Delay execution until after N ms of no calls
       Use case: search input, window resize
     - What is throttling?
       Execute at most once every N ms
       Use case: scroll, mouse move
     - Implementation from scratch
     - Difference with examples
     ✅ Interview: Implement debounce from scratch
     ✅ Interview: Implement throttle from scratch
Chapter 6: Prototypes, Classes & OOP in JavaScript
text

6.1  Prototypes & Prototypal Inheritance
     - What is a prototype? (every object has one)
     - __proto__ vs prototype property
     - Prototype chain lookup
     - Object.prototype (top of chain)
     - null at the end of chain
     - How methods are shared via prototype

6.2  Constructor Functions
     - Creating objects with new keyword
     - What 'new' does internally:
       1. Creates empty object {}
       2. Sets __proto__ to Constructor.prototype
       3. Binds 'this' to new object
       4. Returns the object (unless explicitly returned)
     ✅ Interview: Implement the 'new' keyword from scratch

6.3  Object.create()
     - Creating objects with specific prototype
     - Creating objects with null prototype
     - Prototypal inheritance without classes
     ✅ Interview: Implement Object.create from scratch

6.4  ES6 Classes
     - Class declaration and expression
     - constructor() method
     - Instance methods
     - Static methods and properties
     - Public and private fields (#)
     - Getters and setters (accessors)
     - Inheritance: extends keyword
     - super() — calling parent constructor
     - super.method() — calling parent methods
     - Method overriding
     - instanceof operator
     - Classes are syntactic sugar (still prototypal)
     ✅ Interview: Class vs Constructor Function

6.5  OOP Principles in JavaScript
     - Encapsulation (private fields)
     - Inheritance (extends)
     - Polymorphism (method overriding)
     - Abstraction
Chapter 7: Asynchronous JavaScript — Complete Guide
text

7.1  Sync vs Async JavaScript
     - Why async? (non-blocking I/O)
     - Blocking vs non-blocking examples
     - JavaScript is single-threaded

7.2  Callbacks — The Old Way
     - What is a callback?
     - Callback Hell (Pyramid of Doom)
     - Inversion of Control problem
     - Why callbacks are error-prone

7.3  Promises — The Modern Way
     - What is a Promise?
     - Promise States: pending → fulfilled / rejected
     - Creating: new Promise((resolve, reject) => {})
     - Consuming: .then(), .catch(), .finally()
     - Promise chaining — how it works
     - Error propagation in chains
     - Returning values from .then()
     - Throwing errors in .then() triggers .catch()

7.4  Promise Combinators — All Four
     - Promise.all([...])
       Waits for ALL to resolve
       Fails fast if any rejects
       Returns: array of results
       Use case: parallel independent requests

     - Promise.allSettled([...])
       Waits for ALL to settle (resolve or reject)
       Never fails
       Returns: [{status, value/reason}]
       Use case: when you want all results regardless

     - Promise.race([...])
       Resolves/rejects with FIRST to settle
       Use case: timeout pattern

     - Promise.any([...])
       Resolves with FIRST to fulfill
       Rejects only if ALL reject (AggregateError)
       Use case: try multiple sources, use fastest

     ✅ Interview: Implement Promise.all from scratch
     ✅ Interview: Implement Promise.allSettled from scratch
     ✅ Interview: Implement Promise.race from scratch

7.5  async / await — Syntactic Sugar Over Promises
     - async function always returns a Promise
     - await pauses execution until Promise settles
     - Error handling with try/catch
     - Sequential vs Parallel execution:
       Sequential (waterfall): await A, then await B
       Parallel: await Promise.all([A, B])
     - Top-level await (ES2022)
     - async IIFE pattern
     - for await...of (async iteration)
     ✅ Interview: Can useEffect be async? (Answer: no, but pattern)
     ✅ Interview: 20+ async output questions

7.6  Fetch API
     - fetch(url, options)
     - Response object: .json(), .text(), .blob(), .status, .ok
     - GET request pattern
     - POST with JSON body
     - Setting headers
     - Error handling (fetch doesn't throw on 4xx/5xx!)
     - AbortController — cancelling requests
     - Fetch vs Axios comparison

7.7  Closures + Async — Interview Traps
     - setTimeout in for loop with var
     - setTimeout in for loop with let (fixed)
     - Stale closure in React useEffect
     ✅ Interview: Classic for loop setTimeout question

7.8  Error Handling in Async Code
     - try/catch with async/await
     - .catch() with Promises
     - Unhandled promise rejections
     - Global error handlers
     - Custom error classes
Chapter 8: ES6+ Modern Features
text

8.1  Destructuring Assignment
     - Object destructuring (covered in Ch 4)
     - Array destructuring (covered in Ch 4)
     - Destructuring in function parameters
     - Nested + default values combined

8.2  Spread & Rest Operators
     - Spread in arrays: [...arr1, ...arr2]
     - Spread in objects: {...obj1, ...obj2}
     - Spread in function calls: fn(...args)
     - Rest in function params: function(...rest)
     - Rest in destructuring: const { a, ...rest } = obj

8.3  Modules — ES Modules (ESM)
     - Named exports: export const x = 1
     - Default exports: export default Component
     - Named imports: import { x } from './file'
     - Default imports: import Component from './file'
     - Namespace imports: import * as Module from './file'
     - Re-exports: export { x } from './file'
     - Dynamic imports: import('./file').then(...)
     - CommonJS vs ESM (require vs import)
     - Tree shaking — dead code elimination
     - Barrel files (index.js) — pros and cons

8.4  Important Modern Additions
     - Optional chaining: obj?.a?.b?.c
     - Nullish coalescing: value ?? 'default'
     - Logical assignment: x ||= y, x &&= y, x ??= y
     - structuredClone() — native deep copy
     - Array.at(-1) — negative indexing
     - Object.fromEntries()
     - String: replaceAll(), at()
     - Promise: any(), allSettled()
     - WeakRef — weak reference to object
     - globalThis — universal global object
     - BigInt — large integer support

8.5  Map, Set, WeakMap, WeakSet
     - Map vs Object:
       Keys can be any type, insertion order preserved
       map.get/set/has/delete/size
     - Set vs Array:
       Unique values only, fast lookup
       set.add/has/delete/size
     - WeakMap — keys are weakly referenced (garbage collected)
       Use case: private data, caching
     - WeakSet — weakly held object collection
     ✅ Interview: Map vs Object, Set vs Array

8.6  Symbol
     - Unique primitive values
     - Symbol() !== Symbol()
     - Symbol.for() — global registry
     - Well-known symbols (Symbol.iterator, Symbol.toPrimitive)
     - Use case: unique property keys, prevent name clashes

8.7  Generators & Iterators (Basics)
     - Iterator protocol: {next() → {value, done}}
     - Generator functions: function*
     - yield keyword
     - for...of with generators
     - Lazy evaluation
     ✅ Interview: What is an iterator?
Chapter 9: DOM & Browser APIs
text

9.1  The DOM — Document Object Model
     - What is the DOM? (tree of nodes)
     - Node types: Element, Text, Comment, Document
     - DOM vs HTML (DOM is live, HTML is markup)

9.2  Selecting Elements
     - getElementById(id)
     - getElementsByClassName(class)
     - getElementsByTagName(tag)
     - querySelector(selector) — first match
     - querySelectorAll(selector) — all matches (NodeList)
     - closest(selector) — nearest ancestor matching

9.3  Manipulating the DOM
     - Creating: document.createElement()
     - Appending: parent.appendChild(), parent.append()
     - Removing: element.remove()
     - innerHTML vs textContent vs innerText
     - Attributes: getAttribute, setAttribute, removeAttribute
     - ClassList: add, remove, toggle, contains, replace
     - Style manipulation: element.style.property

9.4  Event Handling
     - addEventListener(event, handler, options)
     - removeEventListener (why same reference needed)
     - Event object properties
     - DOMContentLoaded vs load event

9.5  Event Propagation
     - Bubbling phase (default): child → parent
     - Capturing phase: parent → child
     - {capture: true} option
     - stopPropagation() — stop bubbling
     - preventDefault() — prevent default browser behavior
     - Difference between the two

9.6  Event Delegation
     - Attaching ONE listener to parent for MANY children
     - Using e.target to identify clicked element
     - Benefits: dynamic elements, performance
     - React handles this internally

9.7  Browser APIs Used in React
     - localStorage & sessionStorage API
     - History API (pushState, replaceState, popstate)
     - Intersection Observer API (lazy loading, infinite scroll)
     - Resize Observer API
     - MutationObserver API
     - Clipboard API
     - Geolocation API
     - Media APIs (getUserMedia, Audio, Video)
     - requestAnimationFrame
     - Web Workers (background processing)

9.8  Performance APIs
     - performance.now() — high-res timestamp
     - PerformanceObserver
     - Navigation Timing API
     - Web Vitals (LCP, FID, CLS)
PART C: REACT FUNDAMENTALS
Chapter 10: Introduction to React
text

10.1  What is React?
      - "A JavaScript library for building user interfaces"
      - Library vs Framework distinction:
        Library: you call it | Framework: it calls you
      - React is a VIEW library (just the V in MVC)
      - React vs Angular vs Vue — comparison table
      - Why Facebook created React (2013)
      - React's core philosophy:
        Declarative, Component-based, Unidirectional data flow

10.2  Why React?
      - Problems with vanilla JS DOM manipulation at scale
      - Imperative (how) vs Declarative (what) approach
      - Component reusability
      - Massive ecosystem and community
      - React Native for mobile (write once concept)

10.3  SPA vs MPA
      - Single Page Application: loads once, dynamic updates
      - Multi Page Application: full page reload per route
      - CSR vs SSR (intro — deep dive in Next.js chapters)
      - SEO challenges with SPAs
      - How React handles SPA routing

10.4  Virtual DOM — Deep Dive
      - What is the real DOM? (why it's slow to manipulate)
      - What is the Virtual DOM?
        Lightweight JS object representation of real DOM
      - How Virtual DOM works:
        Step 1: Render → create Virtual DOM tree
        Step 2: State/props change → new Virtual DOM tree
        Step 3: Diff (compare old vs new Virtual DOM)
        Step 4: Patch (apply only changes to real DOM)
      - Is Virtual DOM actually faster? (nuanced answer)
        Batch updates, minimal DOM changes — not always fastest
        Predictable performance regardless of DOM size
      ✅ Interview: Explain Virtual DOM in depth

10.5  React Fiber Architecture
      - What is Fiber? (React's reconciliation engine — rewritten in v16)
      - Why Fiber? (limitations of old Stack Reconciler)
        Old: synchronous, couldn't pause, animations janky
        New: incremental, can pause/resume/abort
      - Fiber node — unit of work
      - Two phases:
        Render Phase (pure, interruptible, no side effects)
        Commit Phase (synchronous, applies DOM changes)
      - Concurrent rendering (intro — detail in Ch 26)
      - Priority-based scheduling (lanes)
      - Time slicing concept
      ✅ Interview: What is React Fiber?

10.6  React Ecosystem Overview
      - Core: react, react-dom
      - Routing: React Router, TanStack Router
      - State: Redux Toolkit, Zustand, Jotai
      - Server state: TanStack Query, SWR
      - Forms: React Hook Form, Formik
      - Styling: Tailwind CSS, Styled Components
      - Testing: Vitest/Jest, React Testing Library
      - Framework: Next.js, Remix, Gatsby
      - UI libraries: shadcn/ui, MUI, Chakra UI

10.7  Development Environment Setup
      - Node.js & npm/yarn/pnpm
      - Create React App (CRA) — legacy, being deprecated
      - Vite — modern, faster alternative
        npm create vite@latest my-app -- --template react
      - Next.js — full framework (covered in Part I)
      - Project structure walkthrough (Vite + React):
        public/ → static assets
        src/ → source code
          main.jsx → entry point
          App.jsx → root component
          components/, hooks/, pages/, utils/
      - Essential VS Code extensions:
        ES7 React Snippets, ESLint, Prettier, Tailwind CSS IntelliSense
      - React Developer Tools browser extension

10.8  package.json Deep Dive
      - name, version, description
      - dependencies vs devDependencies
      - scripts (start, build, test, lint)
      - Semantic Versioning: Major.Minor.Patch
      - ^ (compatible) vs ~ (patch only) vs exact
      - package-lock.json purpose

10.9  How React Renders — Under the Hood
      - React.createElement(type, props, ...children)
      - ReactDOM.createRoot(container)
      - root.render(<App />)
      - What happens step by step
      ✅ Interview: What happens when ReactDOM.render is called?
Chapter 11: JSX — JavaScript XML
text

11.1  What is JSX?
      - Syntactic sugar for React.createElement()
      - JSX is NOT HTML (looks similar but different)
      - JSX compiled by Babel/SWC to JS
      - Before React 17: import React from 'react' required
      - After React 17: new JSX transform, auto import

11.2  JSX Compilation
      // JSX:
      const element = <h1 className="title">Hello</h1>

      // Compiled to (old):
      const element = React.createElement('h1', {className: 'title'}, 'Hello')

      // Compiled to (new transform):
      import {jsx as _jsx} from 'react/jsx-runtime'
      const element = _jsx('h1', {className: 'title', children: 'Hello'})

11.3  JSX Rules — Complete List
      ✅ Return ONE root element (or Fragment)
      ✅ All tags must be closed (<img />, <br />, <input />)
      ✅ className instead of class
      ✅ htmlFor instead of for
      ✅ camelCase attributes: onClick, onChange, tabIndex, readOnly
      ✅ style is an object: style={{ color: 'red', fontSize: '16px' }}
      ✅ Embed JS with curly braces: {expression}
      ✅ Comments: {/* comment */}
      ❌ Cannot use if, for, while directly inside JSX
      ❌ Cannot use class (reserved keyword)

11.4  Fragments — Why & How
      - Problem: extra <div> wrapper pollutes DOM
      - Solutions:
        <React.Fragment>...</React.Fragment>  (supports key prop)
        <>...</>                              (shorthand, no key)
      - When to use keyed fragments:
        <Fragment key={id}> in .map()

11.5  Embedding JavaScript in JSX
      - Curly braces {} = JavaScript expression zone
      - Can embed: strings, numbers, variables,
        function calls, ternary, &&, template literals
      - Cannot embed: statements, undefined (doesn't render),
        objects directly (throws error)
      - null, false, undefined → render nothing (useful!)
      - 0 DOES render → gotcha with && operator

11.6  Conditional Rendering Patterns
      - if/else outside JSX return:
        if (loading) return <Spinner />
        return <Content />

      - Ternary in JSX:
        {isLoggedIn ? <Dashboard /> : <Login />}

      - Logical AND (&&):
        {count > 0 && <Badge count={count} />}
        ⚠️ GOTCHA: {0 && <Component />} renders 0!
        FIX: {count > 0 && <Component />}

      - Nullish coalescing:
        {user?.name ?? 'Guest'}

      - Variable assignment:
        let content = null
        if (condition) content = <A />
        else content = <B />
        return <div>{content}</div>

11.7  Rendering Lists in JSX
      - Use .map() to transform data → JSX
      - The 'key' prop is REQUIRED on list items
      - Key must be on the outermost JSX element in map
      - Keys must be unique among siblings
      - Good keys: database IDs, stable unique values
      - Bad keys: array index (causes issues with reorder/filter)
      ✅ Interview: Why are keys important?
      ✅ Interview: When is index as key acceptable?

11.8  dangerouslySetInnerHTML
      - Injecting raw HTML (XSS risk!)
      - <div dangerouslySetInnerHTML={{ __html: html }} />
      - When to use (sanitized content from CMS)
      - Why the name is intentionally scary
      - How to sanitize: DOMPurify library

11.9  JSX Gotchas & Common Mistakes
      - Returning multiple elements without Fragment
      - Using object directly in JSX: {obj} → Error
      - {0} renders but {false} doesn't
      - Forgot to close self-closing tags
      - Used class instead of className
      - Used for instead of htmlFor
      - CSS properties: font-size vs fontSize
Chapter 12: Components — The Building Blocks
text

12.1  What is a Component?
      - Reusable, self-contained piece of UI
      - A function (or class) that returns JSX
      - Component = UI + Logic + Local State
      - Analogy: LEGO blocks, HTML elements

12.2  Functional Components (Modern — Use These)
      // Basic
      function Welcome(props) {
        return <h1>Hello, {props.name}</h1>
      }

      // With destructuring
      function Welcome({ name, age = 18 }) {
        return <h1>Hello, {name} ({age})</h1>
      }

      // Arrow function style
      const Welcome = ({ name }) => <h1>Hello, {name}</h1>

12.3  Class Components (Legacy — Know for Interviews)
      class Welcome extends React.Component {
        constructor(props) {
          super(props)
          this.state = { count: 0 }
        }
        render() {
          return <h1>Hello, {this.props.name}</h1>
        }
      }

      - When you'll encounter class components:
        Legacy codebases, Error Boundaries (still class only)
      ✅ Interview: Functional vs Class components comparison

12.4  Component Naming Rules
      - MUST be PascalCase: <MyComponent />
      - Lowercase = HTML element: <div />, <span />
      - Descriptive names: UserCard, LoginForm, NavBar

12.5  Component Composition
      - Nesting components (component tree)
      - Breaking UI into small, reusable components
      - Container vs Presentational (smart vs dumb)
      - Layout components
      - Compound components (intro)

12.6  Thinking in React — How to Break Down UI
      - Step 1: Break UI into component hierarchy
      - Step 2: Build static version (no state, just props)
      - Step 3: Identify minimal state
      - Step 4: Identify where state lives
      - Step 5: Add inverse data flow (callbacks)

12.7  Component File Organization
      - One component per file (recommended)
      - File = Component name: UserCard.jsx
      - Feature-based structure:
        src/
          features/
            auth/
              LoginForm.jsx
              LoginForm.test.jsx
              LoginForm.module.css
          components/
            ui/
              Button.jsx
              Input.jsx
          hooks/
          utils/
          pages/

12.8  Pure Components
      - Same props → same JSX output (deterministic)
      - No side effects during rendering
      - React.StrictMode double-invokes renders to catch impurities
      - React.PureComponent (class) → shallow prop comparison
      - React.memo (function) → memoized functional component
Chapter 13: Props — Passing Data
text

13.1  What are Props?
      - Properties passed from parent to child
      - Read-only (immutable from child's perspective)
      - One-way data flow: Parent → Child
      - Props are the component's "input"

13.2  Passing & Receiving Props
      // Passing
      <UserCard name="Alice" age={25} isAdmin={true} />

      // Receiving (props object)
      function UserCard(props) {
        return <p>{props.name}</p>
      }

      // Receiving (destructured — preferred)
      function UserCard({ name, age, isAdmin }) {
        return <p>{name} {age}</p>
      }

13.3  Types of Props
      - String: name="John" or name={'John'}
      - Number: age={25}
      - Boolean: isAdmin={true} OR isAdmin (shorthand = true)
      - Array: items={[1, 2, 3]}
      - Object: user={{ name: 'John', id: 1 }}
      - Function: onClick={handleClick}
      - JSX/Component: header={<Header />}
      - null and undefined

13.4  The children Prop
      - Content between opening and closing tags
      - <Button>Click Me</Button> → props.children = "Click Me"
      - Can be: string, JSX, array, function
      - React.Children utilities:
        React.Children.count(children)
        React.Children.map(children, fn)
        React.Children.forEach(children, fn)
        React.Children.toArray(children)
        React.Children.only(children)

13.5  Spread Props Pattern
      const buttonProps = { type: 'button', disabled: false }
      <Button {...buttonProps} onClick={handleClick} />
      // Note: later props override earlier ones

13.6  Default Props
      // Method 1: Destructuring defaults (preferred)
      function Button({ text = 'Click', variant = 'primary' }) {}

      // Method 2: defaultProps (legacy, class components)
      Button.defaultProps = { text: 'Click' }

13.7  PropTypes — Runtime Validation
      import PropTypes from 'prop-types'

      UserCard.propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        isAdmin: PropTypes.bool,
        onClick: PropTypes.func,
        children: PropTypes.node,
        variant: PropTypes.oneOf(['primary', 'secondary']),
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          email: PropTypes.string
        })
      }

      - PropTypes vs TypeScript:
        PropTypes: runtime validation, extra package
        TypeScript: compile-time, better DX, industry standard

13.8  Prop Drilling — The Problem & Solutions
      - What is prop drilling? (passing props through many levels)
      - When it becomes a problem (3+ levels deep)
      - Solutions:
        Context API (for global data)
        State management (Redux, Zustand)
        Component composition (passing elements, not data)
      - When prop drilling is FINE (1-2 levels, explicit flow)

13.9  Common Interview Q&A on Props
      ✅ Can you modify props in a component?
         No — they are read-only (frozen in dev mode)
      ✅ How to pass data from child to parent?
         Pass a callback function as prop
      ✅ What is the difference between props and state?
         Props: external, immutable | State: internal, mutable
      ✅ What is prop drilling? How to avoid?
      ✅ What are render props?
Chapter 14: State — Making Components Interactive
text

14.1  What is State?
      - Data that a component manages internally
      - Changes over time (user interaction, API response)
      - Changing state triggers re-render
      - State is private to the component
      - Isolated per component instance

14.2  useState Hook — Syntax
      const [value, setValue] = useState(initialValue)

      - Returns: [currentValue, setterFunction]
      - initialValue: can be any type (primitive, object, array)
      - Setter function: triggers re-render with new value
      - Array destructuring — name them anything

14.3  Updating State — Rules & Patterns
      // Simple update
      setCount(count + 1)

      // Functional update (use when new state depends on old)
      setCount(prev => prev + 1)

      // WHY functional update? (avoids stale closure)
      // Wrong (can get stale value in closures):
      setCount(count + 1)
      setCount(count + 1) // still increments by 1, not 2!
      // Correct:
      setCount(prev => prev + 1)
      setCount(prev => prev + 1) // correctly increments by 2

14.4  Lazy Initialization
      // Without lazy init: runs every render (expensive!)
      const [data, setData] = useState(expensiveComputation())

      // With lazy init: runs ONCE on mount
      const [data, setData] = useState(() => expensiveComputation())

      // Use when: reading from localStorage, complex initial computation

14.5  State with Objects — Correct Patterns
      // ❌ NEVER mutate state directly
      state.name = 'Alice' // Wrong!
      setState(state)       // Wrong!

      // ✅ Create new object with spread
      setState(prev => ({ ...prev, name: 'Alice' }))

      // Multiple properties:
      setState(prev => ({ ...prev, name: 'Alice', age: 25 }))

      // Nested objects (spread each level):
      setState(prev => ({
        ...prev,
        address: {
          ...prev.address,
          city: 'NYC'
        }
      }))
      // Better solution for deep nesting: useImmer / Immer

14.6  State with Arrays — Correct Patterns
      // ADD item
      setItems(prev => [...prev, newItem])

      // REMOVE item (by id)
      setItems(prev => prev.filter(item => item.id !== id))

      // UPDATE item
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, done: true } : item
      ))

      // INSERT at index
      setItems(prev => [
        ...prev.slice(0, index),
        newItem,
        ...prev.slice(index)
      ])

      // REPLACE all
      setItems([])

14.7  State Batching — React 18+
      - React 17: batching only in event handlers
      - React 18: automatic batching EVERYWHERE
        (includes setTimeout, promises, async code)
      - Multiple setState calls → ONE re-render
      - flushSync(): opt out of batching (force immediate)

      // Example: only ONE re-render despite 3 setState calls
      handleClick() {
        setA(1)   // batched
        setB(2)   // batched
        setC(3)   // batched → re-render once
      }

14.8  State is Asynchronous
      - You CANNOT read new state immediately after setting
      const [count, setCount] = useState(0)
      setCount(5)
      console.log(count) // Still 0! (will be 5 on next render)

      - Solution: use functional update, or useEffect to react to changes

14.9  Derived State — Don't Over-use State
      // ❌ Storing derived data in state (anti-pattern)
      const [items, setItems] = useState([...])
      const [count, setCount] = useState(0) // Wrong!

      // ✅ Derive from existing state
      const count = items.length // Computed during render

      // ✅ For expensive derivations: useMemo
      const filteredItems = useMemo(
        () => items.filter(i => i.active),
        [items]
      )

14.10 Lifting State Up
      - When two sibling components need the same data
      - Move state to their closest common ancestor
      - Pass down via props
      - Example: controlled form with parent validation

14.11 Common State Mistakes
      ❌ Mutating state directly (object/array)
      ❌ Setting state inside render (infinite loop)
      ❌ Using stale state without functional update
      ❌ Storing derived data in state
      ❌ Mirroring props in state (anti-pattern)
      ❌ Too many useState for related data (use one object or useReducer)
      ❌ State that contradicts itself (isLoading + isError both true)

14.12 Class Component State (For Legacy Code)
      this.state = { count: 0 }
      this.setState({ count: 1 })
      this.setState(prev => ({ count: prev.count + 1 }))
      // Note: setState in class components is also async
      // and does SHALLOW merge (not replace like useState)

14.13 Interview Deep Dive
      ✅ Why is state immutable in React?
      ✅ What happens when setState is called?
      ✅ Is setState synchronous or asynchronous?
      ✅ What is state batching? How did React 18 change it?
      ✅ Difference between state and props?
      ✅ Can two components share state? How?
      ✅ When does React re-render?
      ✅ Why use functional updates in setState?
Chapter 15: Event Handling in React
text

15.1  Synthetic Events
      - React wraps native browser events in SyntheticEvent
      - Cross-browser compatible
      - Same API across all browsers
      - React 17+: events attached to root div (not document)
      - Accessing native event: e.nativeEvent

15.2  Event Handler Syntax
      // ✅ Correct — pass reference
      <button onClick={handleClick}>Click</button>

      // ❌ Wrong — calls immediately on render
      <button onClick={handleClick()}>Click</button>

      // ✅ With arguments (inline arrow function)
      <button onClick={() => handleDelete(id)}>Delete</button>

      // ✅ Curried handler (factory pattern)
      const handleDelete = (id) => (e) => { deleteItem(id) }
      <button onClick={handleDelete(id)}>Delete</button>

15.3  Common Events
      Mouse:    onClick, onDoubleClick, onMouseEnter,
                onMouseLeave, onMouseOver, onMouseDown, onMouseUp
      Keyboard: onKeyDown, onKeyUp, onKeyPress (deprecated)
      Form:     onChange, onSubmit, onFocus, onBlur, onInput
      Touch:    onTouchStart, onTouchEnd, onTouchMove
      Scroll:   onScroll
      Drag:     onDrag, onDrop, onDragOver, onDragStart
      Clipboard: onCopy, onCut, onPaste
      Media:    onPlay, onPause, onEnded, onVolumeChange

15.4  Event Object Properties
      e.target            → element that fired event
      e.currentTarget     → element handler is attached to
      e.target.value      → form input value
      e.target.name       → input name attribute
      e.target.checked    → checkbox checked state
      e.target.files      → file input files
      e.key               → keyboard key ('Enter', 'Escape')
      e.keyCode           → deprecated, use e.key
      e.preventDefault()  → prevent default browser behavior
      e.stopPropagation() → stop event bubbling
      e.nativeEvent       → underlying browser event

15.5  Form Handling Patterns
      // Generic handler for multiple inputs
      function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }))
      }

      // Form submit
      function handleSubmit(e) {
        e.preventDefault() // Prevent page reload!
        // Process form data
      }

15.6  Event Propagation in React
      - Bubbling: child event → bubbles up to parent (default)
      - Capturing: parent captures before child
        Use onClickCapture for capture phase
      - stopPropagation() in React works as expected
      - Difference: React uses delegation internally

15.7  Keyboard Accessibility in Events
      - onClick should also handle onKeyDown for Enter/Space
      - Or use semantic HTML (<button> handles keyboard automatically)
      ✅ Interview: Why use semantic HTML for interactivity?
PART D: REACT LIFECYCLE & SIDE EFFECTS
Chapter 16: Component Lifecycle
text

16.1  Component Lifecycle — Three Phases
      1. MOUNTING   → component added to DOM
      2. UPDATING   → component re-renders (state/props change)
      3. UNMOUNTING → component removed from DOM

16.2  When Does React Re-render?
      - State changes (setState / useState setter)
      - Props change (parent passes different props)
      - Parent re-renders (even if props unchanged!)
      - Context value changes
      - forceUpdate() in class components

16.3  Class Component Lifecycle Methods (Interview Must-Know)
      ── MOUNTING PHASE ──
      constructor(props)
      → Initialize state, bind methods
      → Call super(props) first!

      static getDerivedStateFromProps(props, state)
      → Rarely used. Sync state to props.
      → Returns new state or null

      render()
      → Returns JSX (MUST be pure, no side effects)

      componentDidMount()
      → Component is in DOM
      → Good for: API calls, subscriptions, DOM manipulation
      → Equivalent to: useEffect(() => {}, [])

      ── UPDATING PHASE ──
      static getDerivedStateFromProps(props, state)
      → Same as mounting (called before every render)

      shouldComponentUpdate(nextProps, nextState)
      → Performance optimization
      → Return false to skip re-render
      → Replaced by React.memo and PureComponent

      render()
      → Re-renders with new props/state

      getSnapshotBeforeUpdate(prevProps, prevState)
      → Capture DOM info before update (scroll position)
      → Return value passed to componentDidUpdate

      componentDidUpdate(prevProps, prevState, snapshot)
      → Compare with prevProps/prevState to conditionally fetch
      → Equivalent to: useEffect(() => {}, [deps])

      ── UNMOUNTING PHASE ──
      componentWillUnmount()
      → Cleanup: clear timers, unsubscribe, abort fetch
      → Equivalent to: useEffect return cleanup function

      ── ERROR HANDLING ──
      static getDerivedStateFromError(error)
      → Render fallback UI
      componentDidCatch(error, errorInfo)
      → Log errors

      ── DEPRECATED (with UNSAFE_ prefix) ──
      UNSAFE_componentWillMount
      UNSAFE_componentWillReceiveProps
      UNSAFE_componentWillUpdate

16.4  Lifecycle to Hooks Mapping
      ┌──────────────────────────────────────────────────────┐
      │ Class Method          │ Hook Equivalent              │
      ├──────────────────────────────────────────────────────│
      │ constructor           │ useState(initialValue)       │
      │ componentDidMount     │ useEffect(() => {}, [])      │
      │ componentDidUpdate    │ useEffect(() => {}, [deps])  │
      │ componentWillUnmount  │ useEffect(() => cleanup, []) │
      │ shouldComponentUpdate │ React.memo / useMemo         │
      │ getDerivedStateFromErr│ (still class only for now)   │
      │ componentDidCatch     │ (still class only for now)   │
      └──────────────────────────────────────────────────────┘
Chapter 17: useEffect — Complete Mastery
text

17.1  What is a Side Effect?
      - Anything outside React's rendering process:
        API calls, timers, subscriptions, DOM manipulation,
        localStorage, logging, WebSocket connections

17.2  useEffect Syntax
      useEffect(setup, dependencies?)

      // 3 forms:
      useEffect(() => {})             // runs after EVERY render
      useEffect(() => {}, [])         // runs ONCE (on mount)
      useEffect(() => {}, [a, b])     // runs when a or b changes

17.3  Cleanup Function
      useEffect(() => {
        // Setup code
        const timer = setInterval(fn, 1000)

        // Cleanup function
        return () => {
          clearInterval(timer) // Runs BEFORE next effect + on unmount
        }
      }, [])

      // Use cases:
      - Clear timers: clearTimeout, clearInterval
      - Remove event listeners: removeEventListener
      - Abort fetch: abortController.abort()
      - Unsubscribe: subscription.unsubscribe()
      - Close connections: socket.close()

17.4  Dependency Array Deep Dive
      - React uses Object.is() to compare dependencies
      - Primitive: compared by VALUE (correct)
      - Object/Array/Function: compared by REFERENCE (new each render!)
        This causes infinite loops!
      - Missing dependencies: stale closure problem
      - ESLint rule: react-hooks/exhaustive-deps warns about missing deps

17.5  Common useEffect Patterns
      ─── DATA FETCHING ───
      useEffect(() => {
        let ignore = false
        async function fetchData() {
          const data = await fetch(url).then(r => r.json())
          if (!ignore) setData(data)
        }
        fetchData()
        return () => { ignore = true } // Prevent race condition
      }, [url])

      ─── EVENT LISTENERS ───
      useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [])

      ─── TIMERS ───
      useEffect(() => {
        const id = setInterval(() => setCount(c => c + 1), 1000)
        return () => clearInterval(id)
      }, [])

      ─── SUBSCRIPTIONS (WebSocket) ───
      useEffect(() => {
        const ws = new WebSocket(url)
        ws.onmessage = (e) => setMessage(e.data)
        return () => ws.close()
      }, [url])

      ─── DOCUMENT TITLE ───
      useEffect(() => {
        document.title = `${count} unread messages`
      }, [count])

17.6  The "You Might Not Need an Effect" Cases
      ❌ DON'T use effects for:
      - Transforming data for render → derive it instead
      - Resetting all state on prop change → use key prop
      - Resetting SOME state on prop change → during render setState
      - User event side effects → put logic in event handlers
      - Fetching data for SSR → use framework solutions (Next.js)
      - Parent-child communication → rethink data flow

17.7  useEffect vs useLayoutEffect
      useEffect:
      → Asynchronous (non-blocking)
      → Runs AFTER browser paint
      → Use for: data fetching, subscriptions, most cases

      useLayoutEffect:
      → Synchronous (blocking!)
      → Runs BEFORE browser paint (after DOM mutations)
      → Use for: reading DOM measurements, preventing visual flicker
      → Warning: blocks visual updates (use sparingly)
      → SSR Warning: useLayoutEffect doesn't run on server

17.8  Strict Mode Double-Firing
      - React 18 + StrictMode: effects fire TWICE (mount → unmount → mount)
      - Only in development mode
      - Purpose: detect non-idiomatic cleanup (memory leaks)
      - Your code should handle mount-cleanup-remount correctly

17.9  Async in useEffect — The Right Pattern
      // ❌ Wrong: cannot make useEffect async directly
      useEffect(async () => { ... }, [])

      // ✅ Correct: define async function inside
      useEffect(() => {
        async function loadData() {
          const data = await fetchData()
          setData(data)
        }
        loadData()
      }, [])

17.10 Race Conditions & AbortController
      useEffect(() => {
        const controller = new AbortController()
        fetch(url, { signal: controller.signal })
          .then(r => r.json())
          .then(setData)
          .catch(err => {
            if (err.name !== 'AbortError') setError(err)
          })
        return () => controller.abort()
      }, [url])

17.11 Interview Deep Dive
      ✅ Explain useEffect with dependency array
      ✅ What is the cleanup function? When does it run?
      ✅ How to fix infinite loops in useEffect?
      ✅ What is a stale closure in useEffect?
      ✅ Can you make useEffect async?
      ✅ useEffect vs useLayoutEffect?
      ✅ Why does useEffect fire twice in Strict Mode?
      ✅ 15+ useEffect output questions
PART E: REACT HOOKS — COMPLETE MASTERY
Chapter 18: Rules of Hooks & Hook Internals
text

18.1  What are Hooks?
      - Functions starting with 'use' that tap into React features
      - Introduced in React 16.8 (February 2019)
      - Replace class component complexity
      - Let you "hook into" React state & lifecycle

18.2  Why Hooks Were Introduced
      Problems with class components:
      - 'this' binding confusion
      - Lifecycle logic scattered (componentDidMount, componentDidUpdate)
      - No good way to reuse stateful logic (HOC/render props mess)
      - Complex components hard to understand & test

18.3  Rules of Hooks
      Rule 1: Only call at TOP LEVEL
      ❌ if (condition) useState() — WRONG
      ❌ for (...) useEffect() — WRONG
      ❌ function inside { useState() } — WRONG

      Rule 2: Only call from REACT FUNCTIONS
      ✅ Function components
      ✅ Custom hooks
      ❌ Regular JavaScript functions
      ❌ Class components

18.4  How Hooks Work Internally
      - React maintains a LINKED LIST of hooks per fiber node
      - Each hook call → next slot in list
      - ORDER must be consistent between renders
      - That's why conditions/loops break hooks!
      - Simplified internal state:
        hooks: [
          { state: 0, queue: [] },   // useState
          { deps: [], effect: fn },  // useEffect
        ]

18.5  ESLint Plugin
      eslint-plugin-react-hooks
      - react-hooks/rules-of-hooks → enforces hook rules
      - react-hooks/exhaustive-deps → warns about missing deps
Chapter 19: useState — Complete Mastery
text

19.1  Recap of Basics (see Chapter 14)

19.2  Advanced Patterns
      - Lazy initialization: () => expensiveComputation()
      - Functional updates: prev => prev + 1
      - Object state with spread updates
      - Array state patterns (add, remove, update)

19.3  useState vs useReducer Decision Guide
      Use useState when:
      ✅ Simple primitive values
      ✅ Independent state values
      ✅ Few update types
      ✅ Small components

      Use useReducer when:
      ✅ Multiple related state values
      ✅ Complex update logic
      ✅ Multiple action types
      ✅ Next state depends on complex old state calculation

19.4  State Batching Deep Dive
      - React 17: batches only in event handlers
      - React 18: batches everywhere (promises, setTimeout, etc.)
      - flushSync(() => setState()) — opt out of batching

19.5  Stale State Problem & Solutions
      // Problem: stale closure
      useEffect(() => {
        const id = setInterval(() => {
          setCount(count + 1) // Stale! count is always 0
        }, 1000)
        return () => clearInterval(id)
      }, [])

      // Solution 1: functional update
      setCount(prev => prev + 1) // ✅ Always uses latest

      // Solution 2: include in deps
      useEffect(() => {
        const id = setInterval(() => {
          setCount(count + 1)
        }, 1000)
        return () => clearInterval(id)
      }, [count]) // ✅ But resets interval every second

      // Solution 3: useRef for mutable value
      const countRef = useRef(count)
      countRef.current = count
      setCount(countRef.current + 1)

19.6  Toggle Pattern
      const [isOpen, setIsOpen] = useState(false)
      const toggle = () => setIsOpen(prev => !prev)

19.7  Interview Questions
      ✅ What is lazy initialization in useState?
      ✅ Why use functional update (prev => ...)?
      ✅ How does useState work internally?
      ✅ What is state batching?
      ✅ 10+ useState coding challenges
Chapter 20: useRef — Accessing DOM & Mutable Values
text

20.1  What is useRef?
      - Returns mutable object: { current: initialValue }
      - Persists across re-renders
      - Changing .current does NOT trigger re-render
      - Like an "instance variable" for function components

20.2  Two Main Use Cases

      ─── USE CASE 1: DOM Access ───
      const inputRef = useRef(null)

      useEffect(() => {
        inputRef.current.focus() // After mount, focus input
      }, [])

      return <input ref={inputRef} />

      Common DOM operations:
      - Focus: ref.current.focus()
      - Blur: ref.current.blur()
      - Scroll: ref.current.scrollIntoView()
      - Measure: ref.current.getBoundingClientRect()
      - Media: ref.current.play(), ref.current.pause()
      - Canvas: ref.current.getContext('2d')

      ─── USE CASE 2: Mutable Values (no re-render) ───
      const timerRef = useRef(null)

      function startTimer() {
        timerRef.current = setTimeout(doSomething, 1000)
      }
      function stopTimer() {
        clearTimeout(timerRef.current)
      }

      // Tracking previous value:
      const prevCountRef = useRef(count)
      useEffect(() => {
        prevCountRef.current = count // Update after render
      })
      const prevCount = prevCountRef.current

20.3  useRef vs useState
      ┌──────────────────────────────────────────────────┐
      │           useRef          │      useState         │
      ├──────────────────────────────────────────────────│
      │ .current to access        │ [state, setState]     │
      │ Change → NO re-render     │ Change → re-render    │
      │ Persist across renders    │ Persist across renders│
      │ DOM access                │ UI data               │
      │ Timers, previous values   │ Interactive values    │
      └──────────────────────────────────────────────────┘

20.4  forwardRef — Passing Refs to Children
      // Problem: ref prop doesn't pass through components
      // Solution: forwardRef
      const Input = React.forwardRef((props, ref) => {
        return <input ref={ref} {...props} />
      })

      // Parent can now use ref on Input:
      const ref = useRef(null)
      <Input ref={ref} />

      // React 19: ref is passed as regular prop (no forwardRef needed)

20.5  useImperativeHandle — Custom Ref API
      const Input = React.forwardRef((props, ref) => {
        const inputRef = useRef(null)

        useImperativeHandle(ref, () => ({
          focus: () => inputRef.current.focus(),
          clear: () => { inputRef.current.value = '' }
          // Only expose what parent NEEDS
        }))

        return <input ref={inputRef} {...props} />
      })

      // Parent:
      const inputRef = useRef(null)
      inputRef.current.focus() // Custom exposed method
      inputRef.current.clear() // Custom exposed method
      // inputRef.current.value — NOT accessible (hidden)

20.6  Callback Refs
      // Function as ref attribute
      <div ref={(node) => {
        if (node) { /* node mounted */ }
        else { /* node unmounted */ }
      }} />

      // Use case: measuring elements, conditional refs

20.7  Interview Questions
      ✅ What is the difference between useRef and useState?
      ✅ When would you use useRef?
      ✅ What is forwardRef and why is it needed?
      ✅ What is useImperativeHandle?
      ✅ Build a component with auto-focus using useRef
Chapter 21: useContext — Global State Without Prop Drilling
text

21.1  Context API Overview
      - Mechanism for passing data through component tree
      - Without passing props at every level
      - Think of it as "global" data within a component subtree

21.2  Three Steps to Use Context

      ─── STEP 1: Create Context ───
      const ThemeContext = React.createContext('light') // default value

      ─── STEP 2: Provide Context ───
      function App() {
        const [theme, setTheme] = useState('light')
        return (
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Router />
          </ThemeContext.Provider>
        )
      }

      ─── STEP 3: Consume Context ───
      function Button() {
        const { theme, setTheme } = useContext(ThemeContext)
        return <button className={theme}>Toggle</button>
      }

21.3  Context Patterns — Best Practices

      ─── Pattern 1: Custom Provider + Custom Hook ───
      // context/ThemeContext.js
      const ThemeContext = createContext(null)

      export function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light')
        const value = useMemo(() => ({ theme, setTheme }), [theme])
        return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
      }

      export function useTheme() {
        const context = useContext(ThemeContext)
        if (!context) throw new Error('useTheme must be used within ThemeProvider')
        return context
      }

      ─── Pattern 2: Split State + Dispatch Contexts ───
      // Separating read (state) from write (dispatch) contexts
      // Consumers that only read don't re-render when dispatch changes
      const StateContext = createContext(null)
      const DispatchContext = createContext(null)

21.4  Context + useReducer Pattern (Mini Redux)
      const [state, dispatch] = useReducer(reducer, initialState)
      // Provide both state and dispatch in separate contexts
      // Deeply nested components can dispatch without prop drilling

21.5  Context Performance Issues
      - ALL consumers re-render when Provider value changes
      - Object as value recreates every render:
        value={{ user, setUser }} // New object every render!
      - FIX: useMemo for value:
        const value = useMemo(() => ({ user, setUser }), [user])
      - Split contexts by update frequency
      - React.memo on consumers that don't need to re-render

21.6  Common Context Use Cases
      - Theme (dark/light mode)
      - Authentication (user, login/logout)
      - Language/Locale (i18n)
      - Shopping cart
      - Toast/notification system
      - Feature flags

21.7  Context vs Redux vs Zustand
      Context:
      ✅ Built-in, no extra package
      ✅ Good for low-frequency updates
      ✅ Good for simple global state
      ❌ Performance issues with frequent updates
      ❌ No DevTools

      Redux:
      ✅ Excellent DevTools, time-travel debugging
      ✅ Scales well, predictable
      ❌ Boilerplate (even with RTK)

      Zustand:
      ✅ Simple API, minimal boilerplate
      ✅ Good performance with selective subscriptions
      ✅ DevTools available

      ✅ Interview: When would you use Context vs Redux vs Zustand?

21.8  Interview Questions
      ✅ What is Context API?
      ✅ How does it solve prop drilling?
      ✅ What are the performance implications?
      ✅ How to optimize Context performance?
      ✅ Difference between Context and Redux?
Chapter 22: useReducer — Complex State Logic
text

22.1  What is useReducer?
      - Alternative to useState for complex state
      - State transitions via actions (like Redux)
      - Predictable, testable state logic
      const [state, dispatch] = useReducer(reducer, initialState)

22.2  Reducer Function Pattern
      function reducer(state, action) {
        switch (action.type) {
          case 'INCREMENT':
            return { ...state, count: state.count + 1 }
          case 'DECREMENT':
            return { ...state, count: state.count - 1 }
          case 'RESET':
            return initialState
          case 'SET_COUNT':
            return { ...state, count: action.payload }
          default:
            return state
            // OR: throw new Error('Unknown action: ' + action.type)
        }
      }

22.3  Dispatching Actions
      dispatch({ type: 'INCREMENT' })
      dispatch({ type: 'SET_COUNT', payload: 10 })
      dispatch({ type: 'UPDATE_USER', payload: { name: 'Alice', age: 25 } })

22.4  Lazy Initialization
      function init(initialCount) {
        return { count: initialCount, history: [] }
      }
      const [state, dispatch] = useReducer(reducer, 0, init)
      // init function runs once, receives initialArg (0)

22.5  useReducer vs useState — Decision Guide
      Use useState: simple, independent values
      Use useReducer:
      ✅ Multiple related state values
      ✅ Complex update logic
      ✅ Next state depends on complex prev state
      ✅ Many action types
      ✅ When you need testable state logic
      ✅ Large component with complex state

22.6  Complete Example — Todo App with useReducer
      const initialState = { todos: [], filter: 'all' }

      function todoReducer(state, action) {
        switch(action.type) {
          case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] }
          case 'TOGGLE_TODO':
            return {
              ...state,
              todos: state.todos.map(t =>
                t.id === action.payload ? { ...t, done: !t.done } : t
              )
            }
          case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(t => t.id !== action.payload) }
          case 'SET_FILTER':
            return { ...state, filter: action.payload }
          default:
            return state
        }
      }

22.7  useReducer + Context Pattern
      // Provides Redux-like global state without Redux
      // StateContext → provides current state (for reading)
      // DispatchContext → provides dispatch (for updating)
      // See Chapter 21 for implementation

22.8  Immer with useReducer
      import { useImmerReducer } from 'use-immer'
      function reducer(draft, action) {
        switch(action.type) {
          case 'INCREMENT':
            draft.count++ // Mutable syntax! Immer handles immutability
            break
        }
      }

22.9  Interview Questions
      ✅ What is useReducer and when to use it?
      ✅ Difference between useReducer and useState?
      ✅ useReducer vs Redux?
      ✅ What is a reducer function?
      ✅ Build a counter with useReducer
      ✅ Build a form with useReducer
Chapter 23: useMemo & useCallback — Performance Hooks
text

23.1  Why Optimize? — Understanding the Problem
      - React re-renders component on every state/prop change
      - Expensive calculations run EVERY render
      - Functions recreated with new reference EVERY render
      - Child components with stable props still re-render (parent re-renders)

23.2  useMemo — Memoize Expensive Calculations
      const expensiveResult = useMemo(() => {
        return heavyComputation(a, b) // Only recalculates when a or b changes
      }, [a, b])

      Use when:
      ✅ Expensive computation (filtering 10,000 items, complex math)
      ✅ Creating objects/arrays passed to children (referential stability)
      ✅ Dependencies of other hooks

      Don't use when:
      ❌ Simple calculations
      ❌ Primitive state values
      ❌ Components that render once
      (Memoization itself has overhead!)

23.3  useCallback — Memoize Functions
      const handleClick = useCallback((id) => {
        deleteItem(id)
      }, [deleteItem]) // Only recreates when deleteItem changes

      // Equivalence:
      useCallback(fn, deps) === useMemo(() => fn, deps)

      Use when:
      ✅ Passing callbacks to React.memo'd children
      ✅ Functions used as useEffect dependencies
      ✅ Frequently called children that receive the function

      Don't use when:
      ❌ Function isn't passed to children
      ❌ Child isn't wrapped in React.memo

23.4  React.memo — Memoize Components
      // Wraps component — skips re-render if props haven't changed
      const Button = React.memo(function Button({ onClick, label }) {
        console.log('Button rendered')
        return <button onClick={onClick}>{label}</button>
      })

      // Custom comparison function:
      const Button = React.memo(Component, (prevProps, nextProps) => {
        return prevProps.id === nextProps.id // true = skip re-render
      })

      Use when:
      ✅ Component renders often with same props
      ✅ Component is expensive to render
      ✅ Receiving stable callback refs (from useCallback)

23.5  The Holy Trinity: React.memo + useMemo + useCallback
      // Parent:
      function Parent() {
        const [count, setCount] = useState(0)

        // Without useCallback: new reference every render → child always re-renders
        const handleItemClick = useCallback((id) => {
          console.log('Clicked', id)
        }, []) // Stable reference

        const expensiveList = useMemo(() =>
          processItems(items), // Not recalculated every render
          [items]
        )

        return <ExpensiveChild items={expensiveList} onClick={handleItemClick} />
      }

      // Child:
      const ExpensiveChild = React.memo(({ items, onClick }) => {
        // Only re-renders when items or onClick reference changes
        return <div>{items.map(...)}</div>
      })

23.6  Referential Equality — The Root Cause
      // New reference every render = child always re-renders
      <Child style={{ color: 'red' }} /> // New object each render
      <Child onClick={() => doSomething()} /> // New function each render

      // Stable reference = child skips re-render (with React.memo)
      const style = useMemo(() => ({ color: 'red' }), [])
      const handleClick = useCallback(() => doSomething(), [])

23.7  When NOT to Optimize
      - Premature optimization is the root of all evil
      - Profile first (React DevTools Profiler)
      - If component renders fast, don't memo it
      - Memoization itself has CPU and memory cost
      - Most apps don't need aggressive memoization

23.8  Interview Deep Dive
      ✅ Difference between useMemo and useCallback?
      ✅ What is React.memo?
      ✅ When would you use each?
      ✅ Can you over-optimize? What are the trade-offs?
      ✅ How does memoization work?
      ✅ What is referential equality?
Chapter 24: Other Built-in Hooks
text

24.1  useId — Unique IDs for Accessibility
      const id = useId()
      // Returns: ':r0:', ':r1:', etc. (unique, SSR-safe)

      // Use for: form label associations, ARIA attributes
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />

      // NOT for: list keys
      // SSR-safe: same ID on server and client

24.2  useTransition — Non-Urgent Updates
      const [isPending, startTransition] = useTransition()

      function handleSearch(query) {
        setInputValue(query) // Urgent: update input immediately
        startTransition(() => {
          setSearchResults(filterResults(query)) // Non-urgent: can lag
        })
      }

      return (
        <div>
          <input value={inputValue} onChange={e => handleSearch(e.target.value)} />
          {isPending ? <Spinner /> : <Results data={searchResults} />}
        </div>
      )

      // React can interrupt the transition update if user types again
      // Different from setTimeout: React-aware, can be interrupted

24.3  useDeferredValue — Defer Re-rendering a Value
      const deferredQuery = useDeferredValue(query)

      // query updates immediately (typing)
      // deferredQuery updates later (when browser is idle)
      // Use with React.memo to skip re-renders:

      const Results = React.memo(({ query }) => {
        // This only re-renders when deferredQuery changes
        return <ExpensiveList query={query} />
      })

      // Usage:
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Results query={deferredQuery} /> // Lags behind intentionally

      // useDeferredValue vs useTransition:
      // useDeferredValue: when you don't control the state setter
      // useTransition: when you DO control the state setter

24.4  useSyncExternalStore — Subscribe to External Stores
      // Used by state management libraries internally
      const state = useSyncExternalStore(
        subscribe,         // Subscribe to store changes
        getSnapshot,       // Read current state from store
        getServerSnapshot  // Read state on server (optional)
      )

      // Example: subscribing to browser online status
      const isOnline = useSyncExternalStore(
        (callback) => {
          window.addEventListener('online', callback)
          window.addEventListener('offline', callback)
          return () => {
            window.removeEventListener('online', callback)
            window.removeEventListener('offline', callback)
          }
        },
        () => navigator.onLine,
        () => true // SSR fallback
      )

24.5  useDebugValue — Custom Hook Debugging
      function useOnlineStatus() {
        const isOnline = useSyncExternalStore(...)
        useDebugValue(isOnline ? 'Online' : 'Offline')
        return isOnline
      }
      // Shows "OnlineStatus: Online" in React DevTools

24.6  useInsertionEffect — CSS-in-JS Libraries
      // For library authors, not application code
      // Fires before DOM mutations
      // Use for: injecting <style> tags before React reads layout

24.7  React 19 New Hooks
      ─── use() ───
      // Read value from Promise or Context during render
      const data = use(dataPromise)   // Suspends until resolved
      const theme = use(ThemeContext) // Like useContext but works anywhere

      ─── useFormStatus() ───
      import { useFormStatus } from 'react-dom'
      function SubmitButton() {
        const { pending, data, method, action } = useFormStatus()
        return <button disabled={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>
      }
      // Must be inside a <form> — reads closest parent form status

      ─── useActionState() ───
      const [state, formAction, isPending] = useActionState(
        serverAction,
        initialState
      )
      return <form action={formAction}>...</form>

      ─── useOptimistic() ───
      const [optimisticItems, addOptimistic] = useOptimistic(
        items,
        (state, newItem) => [...state, newItem] // Optimistic update
      )
      // Shows optimistic state immediately, reverts on error
Chapter 25: Custom Hooks — Building Reusable Logic
text

25.1  What are Custom Hooks?
      - Functions that start with 'use' and can call other hooks
      - Extract and share stateful LOGIC (not state itself)
      - Each component that uses the hook gets its OWN state
      - Replace HOCs and Render Props for logic sharing

25.2  Creating Custom Hooks — Rules
      - Name MUST start with 'use'
      - Can call other hooks (built-in or custom)
      - Must follow Rules of Hooks
      - Can return anything: value, object, array, function

25.3  Custom Hook Implementations — Build From Scratch

      ─── useToggle ───
      function useToggle(initial = false) {
        const [value, setValue] = useState(initial)
        const toggle = useCallback(() => setValue(v => !v), [])
        return [value, toggle]
      }

      ─── useLocalStorage ───
      function useLocalStorage(key, initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
          try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
          } catch (error) {
            return initialValue
          }
        })

        const setValue = useCallback((value) => {
          try {
            const valueToStore = value instanceof Function
              ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          } catch (error) {
            console.error(error)
          }
        }, [key, storedValue])

        return [storedValue, setValue]
      }

      ─── useFetch ───
      function useFetch(url) {
        const [data, setData] = useState(null)
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => {
          let ignore = false
          const controller = new AbortController()

          setLoading(true)
          setError(null)

          fetch(url, { signal: controller.signal })
            .then(res => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`)
              return res.json()
            })
            .then(data => { if (!ignore) setData(data) })
            .catch(err => {
              if (err.name !== 'AbortError' && !ignore) setError(err)
            })
            .finally(() => { if (!ignore) setLoading(false) })

          return () => {
            ignore = true
            controller.abort()
          }
        }, [url])

        return { data, loading, error }
      }

      ─── useDebounce ───
      function useDebounce(value, delay = 500) {
        const [debouncedValue, setDebouncedValue] = useState(value)

        useEffect(() => {
          const timer = setTimeout(() => setDebouncedValue(value), delay)
          return () => clearTimeout(timer)
        }, [value, delay])

        return debouncedValue
      }

      ─── usePrevious ───
      function usePrevious(value) {
        const prevRef = useRef(undefined)
        useEffect(() => {
          prevRef.current = value
        }) // No deps — runs after every render
        return prevRef.current
      }

      ─── useWindowSize ───
      function useWindowSize() {
        const [size, setSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight
        })

        useEffect(() => {
          const handleResize = () => setSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
          window.addEventListener('resize', handleResize)
          return () => window.removeEventListener('resize', handleResize)
        }, [])

        return size
      }

      ─── useMediaQuery ───
      function useMediaQuery(query) {
        const [matches, setMatches] = useState(
          () => window.matchMedia(query).matches
        )

        useEffect(() => {
          const mql = window.matchMedia(query)
          const handler = (e) => setMatches(e.matches)
          mql.addEventListener('change', handler)
          return () => mql.removeEventListener('change', handler)
        }, [query])

        return matches
      }

      ─── useClickOutside ───
      function useClickOutside(ref, callback) {
        useEffect(() => {
          function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
              callback()
            }
          }
          document.addEventListener('mousedown', handleClick)
          return () => document.removeEventListener('mousedown', handleClick)
        }, [ref, callback])
      }

      ─── useEventListener ───
      function useEventListener(eventName, handler, element = window) {
        const savedHandler = useRef(handler)
        useEffect(() => { savedHandler.current = handler }, [handler])

        useEffect(() => {
          const eventListener = (event) => savedHandler.current(event)
          element.addEventListener(eventName, eventListener)
          return () => element.removeEventListener(eventName, eventListener)
        }, [eventName, element])
      }

      ─── useOnlineStatus ───
      function useOnlineStatus() {
        return useSyncExternalStore(
          (cb) => {
            window.addEventListener('online', cb)
            window.addEventListener('offline', cb)
            return () => {
              window.removeEventListener('online', cb)
              window.removeEventListener('offline', cb)
            }
          },
          () => navigator.onLine,
          () => true
        )
      }

      ─── useInterval ───
      function useInterval(callback, delay) {
        const savedCallback = useRef(callback)
        useEffect(() => { savedCallback.current = callback }, [callback])

        useEffect(() => {
          if (delay === null) return
          const id = setInterval(() => savedCallback.current(), delay)
          return () => clearInterval(id)
        }, [delay])
      }

      ─── useCopyToClipboard ───
      function useCopyToClipboard() {
        const [copied, setCopied] = useState(false)

        const copy = useCallback(async (text) => {
          try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch (err) {
            setCopied(false)
          }
        }, [])

        return [copied, copy]
      }

25.4  Custom Hook Best Practices
      - Single responsibility (one concern per hook)
      - Accept configuration parameters
      - Return what's needed (don't over-expose)
      - Handle cleanup properly
      - Test with renderHook from RTL

25.5  Interview Challenges
      ✅ Build useDebounce in 5 minutes
      ✅ Build useFetch with error handling
      ✅ Build usePrevious
      ✅ Build useLocalStorage
      ✅ Difference between custom hook and utility function?
      ✅ Do multiple components using same custom hook share state?
         NO — each gets isolated state
PART F: ADVANCED REACT PATTERNS & ARCHITECTURE
Chapter 26: Advanced Component Patterns
text

26.1  Container / Presentational Pattern
      Container (Smart) Component:
      - Manages state and logic
      - Fetches data
      - Passes data as props
      - No UI of its own (or minimal)

      Presentational (Dumb) Component:
      - Pure UI (renders based on props)
      - No state (or only UI state like hover)
      - Highly reusable
      - Easy to test

      Modern version: Hooks replaced most need for this pattern
      But still useful for separation of concerns

26.2  Higher-Order Components (HOC)
      // A function that takes a component and returns enhanced component
      function withAuth(WrappedComponent) {
        return function AuthGuard(props) {
          const { isAuthenticated } = useAuth()
          if (!isAuthenticated) return <Redirect to="/login" />
          return <WrappedComponent {...props} />
        }
      }
      const ProtectedDashboard = withAuth(Dashboard)

      // Conventions:
      - Wrap display name: AuthGuard.displayName = `withAuth(${name})`
      - Forward refs: use forwardRef
      - Hoist static methods: import hoistNonReactStatics

      // Problems with HOCs:
      - Wrapper hell (deep nesting)
      - Name collision in props
      - Hard to debug (unclear component origin)
      - Modern alternative: Custom Hooks (better)

26.3  Render Props Pattern
      // Pass a function as prop that returns JSX
      <MouseTracker render={({ x, y }) => (
        <div>Mouse at {x}, {y}</div>
      )} />

      // Implementation:
      function MouseTracker({ render }) {
        const [position, setPosition] = useState({ x: 0, y: 0 })
        return (
          <div onMouseMove={e => setPosition({ x: e.clientX, y: e.clientY })}>
            {render(position)}
          </div>
        )
      }

      // Children as function (same pattern):
      <Toggle>
        {({ isOn, toggle }) => (
          <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
        )}
      </Toggle>

      // Modern alternative: Custom Hooks (much cleaner)

26.4  Compound Components Pattern
      // Components that work together, sharing implicit state
      // Like HTML's <select> + <option>

      // Usage:
      <Tabs defaultValue="home">
        <TabList>
          <Tab value="home">Home</Tab>
          <Tab value="about">About</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="home"><HomeContent /></TabPanel>
          <TabPanel value="about"><AboutContent /></TabPanel>
        </TabPanels>
      </Tabs>

      // Implementation (using Context):
      const TabsContext = createContext(null)

      function Tabs({ defaultValue, children }) {
        const [activeTab, setActiveTab] = useState(defaultValue)
        return (
          <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
          </TabsContext.Provider>
        )
      }

      function Tab({ value, children }) {
        const { activeTab, setActiveTab } = useContext(TabsContext)
        return (
          <button
            className={activeTab === value ? 'active' : ''}
            onClick={() => setActiveTab(value)}
          >
            {children}
          </button>
        )
      }

      Tabs.Tab = Tab // Namespace attachment

      // Benefits: flexible composition, no prop drilling, clean API

26.5  Provider Pattern
      // Wrapping components in providers
      // Multiple providers composition:
      function Providers({ children }) {
        return (
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        )
      }

26.6  Headless Components
      // Logic only — no UI. Consumer provides rendering.
      // Examples: Radix UI, Headless UI, React Aria, TanStack Table
      // Benefits: full styling control, accessible by default

26.7  State Reducer Pattern
      // Give consumers control over state changes
      // Inversion of control
      function useToggle({ reducer = (s, a) => a.changes } = {}) {
        const [state, dispatch] = useReducer(
          (state, action) => reducer(state, { ...action, changes: toggleReducer(state, action) }),
          { on: false }
        )
        return { ...state, toggle: () => dispatch({ type: 'TOGGLE' }) }
      }
Chapter 27: React Performance Optimization
text

27.1  React Rendering Behavior — Deep Dive
      - React renders from top-down
      - Parent re-render → ALL children re-render by default
      - Even if child props didn't change!
      - Re-render ≠ DOM update (Virtual DOM diffing happens first)

27.2  Profiling First
      - Never optimize blindly
      - React DevTools Profiler:
        Record → click around → analyze flame chart
      - Look for: components that re-render unnecessarily
      - "Why did this render?" feature in DevTools
      - console.count('Render') trick

27.3  Optimization Strategies (In Order of Impact)
      1. Move state DOWN (closest to where it's used)
         → Fewer components re-render when state changes

      2. Lift CONTENT UP (pass as children instead of importing)
         // Before (child re-renders when count changes):
         function Parent() {
           const [count, setCount] = useState(0)
           return <div><ExpensiveChild /><button onClick={() => setCount(c=>c+1)} /></div>
         }

         // After (ExpensiveChild doesn't re-render!):
         function Parent({ children }) { // children = ExpensiveChild
           const [count, setCount] = useState(0)
           return <div>{children}<button onClick={() => setCount(c=>c+1)} /></div>
         }

      3. React.memo for stable props
      4. useMemo for expensive calculations
      5. useCallback for stable function references
      6. Code splitting for large components
      7. Virtualization for long lists

27.4  List Virtualization (Windowing)
      - Only render visible items
      - For lists with 100+ items
      - Libraries: react-window, react-virtuoso, @tanstack/virtual

      import { FixedSizeList } from 'react-window'
      <FixedSizeList height={400} itemCount={10000} itemSize={35}>
        {({ index, style }) => (
          <div style={style}>Item {index}</div>
        )}
      </FixedSizeList>

27.5  Code Splitting & Lazy Loading
      const HeavyChart = React.lazy(() => import('./HeavyChart'))

      function Dashboard() {
        return (
          <Suspense fallback={<Spinner />}>
            <HeavyChart /> {/* Only loaded when rendered */}
          </Suspense>
        )
      }

      // Route-based splitting (most impactful):
      const Dashboard = React.lazy(() => import('./pages/Dashboard'))
      const Profile = React.lazy(() => import('./pages/Profile'))

27.6  Bundle Optimization
      - Analyze: webpack-bundle-analyzer, vite-bundle-visualizer
      - Tree shaking: use named imports
        import { Button } from 'antd' // Loads ENTIRE antd!
        import Button from 'antd/es/button' // Only Button

      - Remove unused dependencies
      - Dynamic imports for below-fold content

27.7  React 18 Concurrent Features for Performance
      - useTransition: keep UI interactive during heavy state updates
      - useDeferredValue: defer heavy re-renders
      - Automatic batching: fewer re-renders by default

27.8  Core Web Vitals
      LCP — Largest Contentful Paint (< 2.5s)
      → Optimize: images, fonts, server response time

      FID — First Input Delay (< 100ms)
      → Optimize: reduce JS execution time, code split

      INP — Interaction to Next Paint (replaces FID)
      → Optimize: event handlers, avoid long tasks

      CLS — Cumulative Layout Shift (< 0.1)
      → Optimize: reserve space for images, avoid dynamic content injection

27.9  Interview Questions
      ✅ How does React decide what to re-render?
      ✅ What is reconciliation?
      ✅ How do keys improve performance?
      ✅ What is React.memo and when to use it?
      ✅ Difference between useMemo and useCallback?
      ✅ How would you optimize a slow React app? (systematic answer)
      ✅ What is code splitting?
      ✅ What is virtualization?
      ✅ What are Core Web Vitals?
Chapter 28: Error Handling & Error Boundaries
text

28.1  Error Boundaries — What & Why
      - React components that catch JS errors in their child tree
      - Show fallback UI instead of crashing entire app
      - Currently ONLY implemented as class components
      - No hook equivalent yet (react-error-boundary fills this gap)

28.2  Error Boundary Implementation
      class ErrorBoundary extends React.Component {
        state = { hasError: false, error: null }

        static getDerivedStateFromError(error) {
          // Called during render phase
          // Return new state to show fallback UI
          return { hasError: true, error }
        }

        componentDidCatch(error, errorInfo) {
          // Called after error (like commit phase)
          // Good for logging to error tracking service
          logErrorToSentry(error, errorInfo.componentStack)
        }

        handleReset = () => {
          this.setState({ hasError: false, error: null })
        }

        render() {
          if (this.state.hasError) {
            return (
              <div>
                <h2>Something went wrong</h2>
                <p>{this.state.error?.message}</p>
                <button onClick={this.handleReset}>Try Again</button>
              </div>
            )
          }
          return this.props.children
        }
      }

      // Usage:
      <ErrorBoundary>
        <ComponentThatMightCrash />
      </ErrorBoundary>

28.3  What Error Boundaries DON'T Catch
      ❌ Event handlers (use try/catch)
      ❌ Async code (setTimeout, promises)
      ❌ Server-side rendering errors
      ❌ Errors in the boundary itself

28.4  react-error-boundary Library
      import { ErrorBoundary } from 'react-error-boundary'

      function FallbackComponent({ error, resetErrorBoundary }) {
        return (
          <div>
            <p>Error: {error.message}</p>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )
      }

      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={(error, info) => logError(error, info)}
        onReset={() => { /* reset state */ }}
      >
        <App />
      </ErrorBoundary>

      // useErrorBoundary hook:
      function MyComponent() {
        const { showBoundary } = useErrorBoundary()

        async function fetchData() {
          try {
            const data = await api.getData()
          } catch (err) {
            showBoundary(err) // Trigger error boundary
          }
        }
      }

28.5  Error Boundary Placement Strategy
      - Global: one at app root (catch everything)
      - Feature-level: per feature (graceful degradation)
      - Component-level: for critical isolated components
      - Multiple boundaries = better user experience

28.6  Error Logging Services
      - Sentry (most popular)
      - LogRocket (session replay + errors)
      - Bugsnag, Rollbar
      - Custom error tracking

28.7  Interview Questions
      ✅ What is an Error Boundary?
      ✅ Can Error Boundaries catch async errors?
      ✅ Why are Error Boundaries still class components?
      ✅ What is the difference between getDerivedStateFromError
         and componentDidCatch?
Chapter 29: Portals
text

29.1  What are Portals?
      - Render children into a DOM node OUTSIDE parent hierarchy
      - ReactDOM.createPortal(child, container)
      - Event bubbling still follows React tree (not DOM tree)
      - Context still works across portals
      - Useful for: modals, tooltips, dropdowns, toasts

29.2  Creating a Portal
      // In index.html:
      <div id="root"></div>
      <div id="modal-root"></div>

      // Modal component:
      function Modal({ children, isOpen }) {
        if (!isOpen) return null
        return ReactDOM.createPortal(
          <div className="modal-overlay">
            <div className="modal">{children}</div>
          </div>,
          document.getElementById('modal-root')
        )
      }

29.3  Building Accessible Modal
      function Modal({ isOpen, onClose, title, children }) {
        const modalRef = useRef(null)

        // Focus trap
        useEffect(() => {
          if (isOpen) modalRef.current?.focus()
        }, [isOpen])

        // Close on Escape
        useEffect(() => {
          function handleKeyDown(e) {
            if (e.key === 'Escape') onClose()
          }
          if (isOpen) document.addEventListener('keydown', handleKeyDown)
          return () => document.removeEventListener('keydown', handleKeyDown)
        }, [isOpen, onClose])

        // Lock body scroll
        useEffect(() => {
          if (isOpen) {
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = '' }
          }
        }, [isOpen])

        if (!isOpen) return null

        return ReactDOM.createPortal(
          <div
            className="overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              ref={modalRef}
              className="modal"
              onClick={e => e.stopPropagation()}
              tabIndex={-1}
            >
              <h2 id="modal-title">{title}</h2>
              {children}
              <button onClick={onClose} aria-label="Close modal">×</button>
            </div>
          </div>,
          document.body
        )
      }

29.4  Portal Use Cases
      - Modals / Dialogs (most common)
      - Tooltips (overflow: hidden parent issues)
      - Dropdowns (z-index and overflow issues)
      - Toast notifications
      - Context menus

29.5  Interview Questions
      ✅ What are Portals in React?
      ✅ Do events bubble through portals?
      ✅ When would you use a Portal?
PART G: ROUTING, FORMS & STYLING
Chapter 30: React Router (v6+) — Complete Guide
text

30.1  Client-Side Routing Concept
      - SPA: JavaScript intercepts navigation, updates URL without page reload
      - History API: pushState, replaceState, popstate event
      - Hash routing vs Browser routing

30.2  Installation & Setup
      npm install react-router-dom

      // Option 1: Traditional setup
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

      // Option 2: Data API (recommended for v6.4+)
      const router = createBrowserRouter([
        { path: '/', element: <Home />, loader: homeLoader },
        { path: '/about', element: <About /> }
      ])
      <RouterProvider router={router} />

30.3  Router Types
      - BrowserRouter: uses HTML5 History API (recommended)
      - HashRouter: uses URL hash (#) — no server config needed
      - MemoryRouter: for testing, no URL change
      - StaticRouter: for SSR

30.4  Route Configuration — Complete Reference
      // Static route:
      <Route path="/about" element={<About />} />

      // Dynamic route:
      <Route path="/user/:id" element={<UserProfile />} />
      // :id — required | :id? — optional

      // Catch-all:
      <Route path="*" element={<NotFound />} />

      // Index route (default child):
      <Route index element={<DefaultContent />} />

      // Nested routes (layouts):
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

30.5  Navigation Components
      // Link — basic navigation
      <Link to="/about">About</Link>
      <Link to="/user/123">User</Link>
      <Link to="/search?q=react">Search</Link>
      <Link to={{ pathname: '/home', search: '?sort=asc' }}>Home</Link>
      <Link to="." replace>Current (replace history)</Link>

      // NavLink — with active state
      <NavLink
        to="/home"
        className={({ isActive, isPending }) =>
          isActive ? 'active' : isPending ? 'pending' : ''
        }
      >
        Home
      </NavLink>

30.6  Navigation Hooks
      // useNavigate — programmatic navigation
      const navigate = useNavigate()
      navigate('/dashboard')           // Push to history
      navigate('/login', { replace: true }) // Replace history
      navigate(-1)                    // Go back
      navigate('/profile', { state: { from: '/dashboard' } }) // With state

      // useParams — URL parameters
      const { id, slug } = useParams()

      // useSearchParams — query string
      const [searchParams, setSearchParams] = useSearchParams()
      const query = searchParams.get('q')
      setSearchParams({ q: 'new-query', page: '2' })

      // useLocation — current location
      const location = useLocation()
      // { pathname, search, hash, state, key }
      const from = location.state?.from // Passed state

      // useMatch — check if route matches
      const match = useMatch('/user/:id')

30.7  Protected Routes Pattern
      // Auth guard component:
      function RequireAuth({ children }) {
        const { isAuthenticated } = useAuth()
        const location = useLocation()

        if (!isAuthenticated) {
          return <Navigate to="/login" state={{ from: location }} replace />
        }
        return children
      }

      // Usage in routes:
      <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />

      // After login, redirect back to original destination:
      const location = useLocation()
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })

30.8  Layouts with Outlet
      // Layout component (wraps child routes):
      function AdminLayout() {
        return (
          <div>
            <AdminNav /> {/* Persistent sidebar */}
            <main>
              <Outlet /> {/* Child routes render here */}
            </main>
          </div>
        )
      }

      // Routes:
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

30.9  Data Loading (React Router v6.4+)
      // Loader function:
      async function userLoader({ params }) {
        const user = await fetchUser(params.id)
        if (!user) throw new Response('Not Found', { status: 404 })
        return user
      }

      // In component:
      const user = useLoaderData()

      // Action function (mutations):
      async function createUserAction({ request }) {
        const formData = await request.formData()
        await createUser(Object.fromEntries(formData))
        return redirect('/users')
      }

      // Error handling:
      function UserError() {
        const error = useRouteError()
        return <div>Error: {error.statusText || error.message}</div>
      }

      // Route config with data API:
      {
        path: '/user/:id',
        element: <UserProfile />,
        loader: userLoader,
        action: createUserAction,
        errorElement: <UserError />
      }

30.10 Route-based Code Splitting
       const Dashboard = React.lazy(() => import('./pages/Dashboard'))
       // Wrap entire Routes in Suspense:
       <Suspense fallback={<PageLoader />}>
         <Routes>...</Routes>
       </Suspense>

30.11 Scroll Restoration
       // v6 handles scroll restoration automatically with data API
       // Manual: useEffect on location change

30.12 Interview Questions
       ✅ How does client-side routing work?
       ✅ BrowserRouter vs HashRouter?
       ✅ How to implement protected routes?
       ✅ useParams vs useSearchParams?
       ✅ What is Outlet?
       ✅ How to handle 404 pages?
       ✅ How to navigate programmatically?
       ✅ Nested routes with example
Chapter 31: Forms in React — Complete Guide
text

31.1  HTML Forms vs React Forms
      - HTML: form submission reloads page
      - React: intercept with preventDefault, manage state

31.2  Controlled Components
      // State drives the input value
      const [email, setEmail] = useState('')
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />

31.3  All Input Types — Controlled Patterns
      // Text / Email / Password / Number
      <input type="text" value={val} onChange={e => setVal(e.target.value)} />

      // Textarea
      <textarea value={val} onChange={e => setVal(e.target.value)} />

      // Select / Dropdown
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Choose...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>

      // Multi-select
      <select multiple value={selected} onChange={e =>
        setSelected([...e.target.selectedOptions].map(o => o.value))
      }>

      // Checkbox
      <input type="checkbox"
        checked={isChecked}
        onChange={e => setIsChecked(e.target.checked)}
      />

      // Radio buttons
      {['option1', 'option2'].map(opt => (
        <input key={opt} type="radio"
          value={opt}
          checked={selected === opt}
          onChange={e => setSelected(e.target.value)}
        />
      ))}

      // File input (uncontrolled by nature)
      <input type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      // Range slider
      <input type="range"
        min="0" max="100" step="5"
        value={volume}
        onChange={e => setVolume(Number(e.target.value))}
      />

31.4  Multi-Input Form with Single Handler
      const [form, setForm] = useState({ name: '', email: '', subscribe: false })

      function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }))
      }

      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="subscribe" type="checkbox"
        checked={form.subscribe} onChange={handleChange} />

31.5  Form Validation — Custom Implementation
      const [errors, setErrors] = useState({})
      const [touched, setTouched] = useState({})

      function validate(values) {
        const errors = {}
        if (!values.email) errors.email = 'Required'
        else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email'
        if (!values.password) errors.password = 'Required'
        else if (values.password.length < 8) errors.password = 'Min 8 characters'
        return errors
      }

      function handleBlur(e) {
        setTouched(prev => ({ ...prev, [e.target.name]: true }))
        const newErrors = validate(form)
        setErrors(newErrors)
      }

      function handleSubmit(e) {
        e.preventDefault()
        const newErrors = validate(form)
        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
          submitForm(form)
        }
      }

31.6  React Hook Form (Recommended Library)
      import { useForm } from 'react-hook-form'
      import { zodResolver } from '@hookform/resolvers/zod'
      import { z } from 'zod'

      const schema = z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Min 8 characters')
      })

      function LoginForm() {
        const {
          register,
          handleSubmit,
          watch,
          formState: { errors, isSubmitting, isDirty }
        } = useForm({
          resolver: zodResolver(schema),
          defaultValues: { email: '', password: '' }
        })

        const onSubmit = async (data) => {
          await loginUser(data)
        }

        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}

            <input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}

            <button disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </form>
        )
      }

      // Why React Hook Form?
      ✅ Minimal re-renders (uncontrolled under the hood)
      ✅ Built-in validation with schema libraries
      ✅ Great DX and TypeScript support
      ✅ useFieldArray for dynamic fields

31.7  Uncontrolled Components with useRef
      const nameRef = useRef(null)

      function handleSubmit(e) {
        e.preventDefault()
        console.log(nameRef.current.value)
      }

      <input ref={nameRef} defaultValue="John" />

      // When to use:
      ✅ File inputs (always uncontrolled)
      ✅ Integrating with non-React libraries
      ✅ When you only need the value on submit

31.8  Multi-Step Form Pattern
      const [step, setStep] = useState(1)
      const [formData, setFormData] = useState({})

      function handleStepSubmit(stepData) {
        setFormData(prev => ({ ...prev, ...stepData }))
        setStep(prev => prev + 1)
      }

      // Render different step components based on step number
      // Progress bar: (step / totalSteps) * 100

31.9  Interview Questions
      ✅ Controlled vs uncontrolled components?
      ✅ How to handle multiple inputs with one handler?
      ✅ Why use React Hook Form instead of useState?
      ✅ How to prevent form submission re-render?
      ✅ Build a form with validation from scratch
Chapter 32: Styling in React — Complete Guide
text

32.1  Styling Approaches Comparison
      ┌────────────────────────────────────────────────────────────┐
      │ Approach     │ Scoped? │ Dynamic? │ Performance │ DX     │
      ├────────────────────────────────────────────────────────────│
      │ Inline CSS   │ Yes     │ Yes      │ Poor        │ Poor   │
      │ CSS Files    │ No      │ No       │ Good        │ OK     │
      │ CSS Modules  │ Yes     │ Limited  │ Good        │ Good   │
      │ Styled-Comp  │ Yes     │ Yes      │ Runtime cost│ Great  │
      │ Tailwind CSS │ Yes     │ Yes      │ Great       │ Great  │
      └────────────────────────────────────────────────────────────┘

32.2  Inline Styles
      <div style={{ color: 'red', fontSize: '16px', marginTop: 10 }}>
      // camelCase properties
      // No pseudo-classes, no media queries
      // Good for: truly dynamic values (computed styles)
      // Bad for: complex styling

32.3  CSS Modules
      // Button.module.css
      .button { background: blue; color: white; padding: 8px 16px; }
      .primary { background: blue; }
      .secondary { background: gray; }

      // Button.jsx
      import styles from './Button.module.css'
      <button className={styles.button}>Click</button>

      // Dynamic classes:
      <button className={`${styles.button} ${variant === 'primary' ? styles.primary : styles.secondary}`}>

      // With clsx library:
      import clsx from 'clsx'
      <button className={clsx(styles.button, { [styles.primary]: isPrimary, [styles.disabled]: isDisabled })}>

32.4  Styled Components (CSS-in-JS)
      import styled from 'styled-components'

      // Basic:
      const Button = styled.button`
        background: blue;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
      `

      // Dynamic styles with props:
      const Button = styled.button`
        background: ${({ variant }) => variant === 'primary' ? 'blue' : 'gray'};
        color: white;
      `
      <Button variant="primary">Click</Button>

      // Extending:
      const DangerButton = styled(Button)`
        background: red;
      `

      // ThemeProvider:
      <ThemeProvider theme={{ primary: '#007bff', secondary: '#6c757d' }}>
        <App />
      </ThemeProvider>
      // Access in component: ${({ theme }) => theme.primary}

      // Global styles:
      const GlobalStyle = createGlobalStyle`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: sans-serif; }
      `

32.5  Tailwind CSS with React
      // Setup: npm install tailwindcss
      // tailwind.config.js:
      module.exports = {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        theme: { extend: { colors: { brand: '#your-color' } } },
        plugins: []
      }

      // Usage in JSX:
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Click Me
      </button>

      // Conditional classes with clsx:
      import { clsx } from 'clsx'
      import { twMerge } from 'tailwind-merge'
      const cn = (...inputs) => twMerge(clsx(inputs))

      <button className={cn(
        'px-4 py-2 rounded font-medium',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800',
        disabled && 'opacity-50 cursor-not-allowed'
      )}>

      // Dark mode:
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">

      // Responsive:
      <div className="text-sm md:text-base lg:text-lg">

32.6  Component Libraries (Overview)
      shadcn/ui    → Copy-paste components, Tailwind based, not an npm package
      Radix UI     → Headless, accessible primitives
      Material UI  → Google Material Design, large ecosystem
      Chakra UI    → Accessible, theme-able, simple API
      Ant Design   → Enterprise-grade, feature-rich
      Headless UI  → Accessible unstyled components (by Tailwind team)
      React Aria   → Adobe's accessibility-first primitives

32.7  Dark Mode Implementation
      // Method 1: Tailwind + next-themes
      // Method 2: CSS variables + Context
      :root { --bg: white; --text: black; }
      [data-theme='dark'] { --bg: black; --text: white; }

      // Method 3: Styled-components ThemeProvider

32.8  When to Use What
      Starting a new project: Tailwind CSS + shadcn/ui
      Need design system control: CSS Modules
      Legacy or team preference: Styled Components
      Enterprise: MUI or Ant Design
      Maximum performance: CSS Modules or Tailwind
PART H: STATE MANAGEMENT
Chapter 33: State Management — Overview & Architecture
text

33.1  Types of State
      ┌────────────────────────────────────────────────────────────┐
      │ Type          │ Where to Manage    │ Examples              │
      ├────────────────────────────────────────────────────────────│
      │ Local/UI      │ useState, useRef   │ modal, toggle, form   │
      │ Global/App    │ Context, Zustand   │ auth, theme, language │
      │ Server/Remote │ React Query, SWR   │ API data, cache       │
      │ URL           │ React Router       │ filters, pagination   │
      │ Form          │ React Hook Form    │ form values, errors   │
      └────────────────────────────────────────────────────────────┘

33.2  State Management Decision Flow
      1. Is it only used in one component?
         → useState ✅

      2. Is it shared between a few nearby components?
         → Lift state up + props ✅

      3. Is it global but changes infrequently?
         → Context API ✅

      4. Is it global and changes frequently?
         → Zustand / Redux Toolkit ✅

      5. Is it server data (API responses, cache)?
         → React Query / SWR / RTK Query ✅

      6. Is it in the URL (search, filters)?
         → useSearchParams ✅

33.3  The Big Mistake: Using Wrong Tool
      - Context API for high-frequency updates → performance issues
      - Redux for local component state → over-engineering
      - useState for server data → manual caching, stale data
      - Always match the tool to the problem
Chapter 34: Redux Toolkit — Modern Redux
text

34.1  Redux Core Concepts
      - Store: single source of truth
      - State: current application state
      - Action: plain object { type, payload }
      - Reducer: pure function (state, action) => newState
      - Dispatch: sends action to store
      - Selector: reads state from store

34.2  Redux Data Flow
      Component → dispatch(action) → reducer(state, action) → new state → re-render

34.3  Redux Toolkit Setup
      // 1. Install
      npm install @reduxjs/toolkit react-redux

      // 2. Create store (store.js)
      import { configureStore } from '@reduxjs/toolkit'
      import counterReducer from './counterSlice'
      import userReducer from './userSlice'

      const store = configureStore({
        reducer: {
          counter: counterReducer,
          user: userReducer
        }
      })

      // 3. Provide store
      import { Provider } from 'react-redux'
      <Provider store={store}><App /></Provider>

34.4  createSlice — The Core of RTK
      import { createSlice } from '@reduxjs/toolkit'

      const counterSlice = createSlice({
        name: 'counter',
        initialState: { value: 0, status: 'idle' },
        reducers: {
          // Immer built-in: can write "mutating" code
          increment(state) {
            state.value += 1
          },
          decrement(state) {
            state.value -= 1
          },
          incrementByAmount(state, action) {
            state.value += action.payload
          },
          reset() {
            return { value: 0, status: 'idle' } // Return new state
          }
        }
      })

      // Export actions:
      export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions
      // Export reducer:
      export default counterSlice.reducer

34.5  Using Redux in Components
      import { useSelector, useDispatch } from 'react-redux'
      import { increment, decrement } from './counterSlice'

      function Counter() {
        // useSelector: read from store
        const count = useSelector(state => state.counter.value)
        const dispatch = useDispatch()

        return (
          <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
          </div>
        )
      }

34.6  Async Logic — createAsyncThunk
      import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

      // Define async thunk:
      export const fetchUser = createAsyncThunk(
        'user/fetchById', // action type prefix
        async (userId, { rejectWithValue }) => {
          try {
            const response = await fetch(`/api/users/${userId}`)
            if (!response.ok) throw new Error('Failed')
            return await response.json()
          } catch (error) {
            return rejectWithValue(error.message)
          }
        }
      )

      // Handle in slice:
      const userSlice = createSlice({
        name: 'user',
        initialState: { data: null, loading: false, error: null },
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchUser.pending, (state) => {
              state.loading = true
              state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
              state.loading = false
              state.data = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
              state.loading = false
              state.error = action.payload
            })
        }
      })

34.7  Selectors — createSelector (Memoized)
      import { createSelector } from '@reduxjs/toolkit' // or 'reselect'

      // Basic selector:
      const selectAllTodos = state => state.todos.items

      // Memoized selector (only recomputes when dependencies change):
      const selectCompletedTodos = createSelector(
        [selectAllTodos],
        (todos) => todos.filter(t => t.completed) // Expensive filter
      )

      const selectTodosByUser = createSelector(
        [selectAllTodos, (state, userId) => userId],
        (todos, userId) => todos.filter(t => t.userId === userId)
      )

34.8  RTK Query — Data Fetching Layer
      import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

      const apiSlice = createApi({
        reducerPath: 'api',
        baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
        tagTypes: ['Post', 'User'],
        endpoints: (builder) => ({
          getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post']
          }),
          getPostById: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }]
          }),
          createPost: builder.mutation({
            query: (newPost) => ({
              url: '/posts',
              method: 'POST',
              body: newPost
            }),
            invalidatesTags: ['Post'] // Refetch posts after creating
          }),
          updatePost: builder.mutation({
            query: ({ id, ...patch }) => ({
              url: `/posts/${id}`,
              method: 'PATCH',
              body: patch
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
          })
        })
      })

      export const {
        useGetPostsQuery,
        useGetPostByIdQuery,
        useCreatePostMutation,
        useUpdatePostMutation
      } = apiSlice

      // In component:
      const { data: posts, isLoading, isError } = useGetPostsQuery()
      const [createPost, { isLoading: isCreating }] = useCreatePostMutation()

34.9  Redux DevTools
      - Auto-configured by configureStore
      - Time-travel debugging
      - Action history
      - State diff viewer
      - Import/export state

34.10 Interview Questions
       ✅ Explain Redux data flow
       ✅ What is a reducer? Why must it be pure?
       ✅ What is middleware in Redux?
       ✅ Redux vs Context API?
       ✅ What is Redux Toolkit? Why use it over vanilla Redux?
       ✅ Explain createAsyncThunk
       ✅ What is RTK Query? How does it compare to React Query?
Chapter 35: Alternative State Management
text

35.1  Zustand — Simple & Performant
      import { create } from 'zustand'

      // Create store:
      const useStore = create((set, get) => ({
        count: 0,
        user: null,
        increment: () => set(state => ({ count: state.count + 1 })),
        decrement: () => set(state => ({ count: state.count - 1 })),
        setUser: (user) => set({ user }),
        reset: () => set({ count: 0 }),
        doubleCount: () => get().count * 2 // Reading state inside action
      }))

      // In component (NO Provider needed!):
      function Counter() {
        const { count, increment } = useStore()
        return <button onClick={increment}>{count}</button>
      }

      // Selective subscription (performance):
      const count = useStore(state => state.count) // Only re-renders when count changes

      // Middleware:
      import { devtools, persist, immer } from 'zustand/middleware'
      const useStore = create(
        devtools(
          persist(
            immer((set) => ({ /* ... */ })),
            { name: 'my-store' } // localStorage key
          )
        )
      )

35.2  Jotai — Atomic State
      import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

      // Define atoms:
      const countAtom = atom(0)
      const doubleCountAtom = atom(get => get(countAtom) * 2) // Derived atom

      // In component:
      function Counter() {
        const [count, setCount] = useAtom(countAtom)
        const double = useAtomValue(doubleCountAtom) // Read-only
        return <div>{count} × 2 = {double}</div>
      }

      // Async atoms:
      const userAtom = atom(async () => {
        const response = await fetch('/api/user')
        return response.json()
      })

35.3  TanStack Query (React Query) — Server State
      import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

      // Setup:
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000 // 10 minutes (gcTime in v5)
          }
        }
      })
      <QueryClientProvider client={queryClient}><App /></QueryClientProvider>

      // useQuery:
      function UserProfile({ userId }) {
        const {
          data,          // Response data
          isLoading,     // First load, no cached data
          isFetching,    // Any background fetch
          isError,
          error,
          isSuccess,
          refetch
        } = useQuery({
          queryKey: ['user', userId],   // Unique key (array)
          queryFn: () => fetchUser(userId),
          staleTime: 30000,            // Data fresh for 30s
          enabled: !!userId,           // Conditional fetching
          retry: 3,                    // Retry on failure
          refetchOnWindowFocus: true   // Refetch when tab focused
        })

        if (isLoading) return <Spinner />
        if (isError) return <Error message={error.message} />
        return <div>{data.name}</div>
      }

      // useMutation:
      function CreatePost() {
        const queryClient = useQueryClient()

        const mutation = useMutation({
          mutationFn: (newPost) => fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(newPost)
          }),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] }) // Refetch posts list
          },
          onError: (error) => {
            console.error('Failed:', error)
          }
        })

        return (
          <button
            onClick={() => mutation.mutate({ title: 'New Post' })}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating...' : 'Create Post'}
          </button>
        )
      }

      // Optimistic updates:
      const mutation = useMutation({
        mutationFn: updateTodo,
        onMutate: async (newTodo) => {
          await queryClient.cancelQueries({ queryKey: ['todos'] })
          const previous = queryClient.getQueryData(['todos'])
          queryClient.setQueryData(['todos'], old => [...old, newTodo])
          return { previous }
        },
        onError: (err, newTodo, context) => {
          queryClient.setQueryData(['todos'], context.previous) // Rollback
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
      })

      // Infinite Queries:
      const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
      })

35.4  SWR — Stale-While-Revalidate
      import useSWR from 'swr'
      const fetcher = (url) => fetch(url).then(r => r.json())

      function Profile() {
        const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher, {
          refreshInterval: 3000, // Polling
          revalidateOnFocus: true
        })
        if (isLoading) return <Spinner />
        if (error) return <Error />
        return <div>{data.name}</div>
      }

35.5  Comparison Table
      ┌─────────────────────────────────────────────────────────────────────┐
      │ Feature          │ Redux(RTK)│ Zustand  │ Jotai    │ React Query   │
      ├─────────────────────────────────────────────────────────────────────│
      │ Best for         │ Complex   │ Simple   │ Atomic   │ Server state  │
      │                  │ global    │ global   │ state    │               │
      │ Bundle size      │ Large     │ Tiny     │ Tiny     │ Medium        │
      │ Boilerplate      │ Medium    │ Low      │ Low      │ Low           │
      │ DevTools         │ Excellent │ Good     │ Good     │ Excellent     │
      │ Learning curve   │ High      │ Low      │ Low      │ Medium        │
      │ TypeScript       │ Good      │ Good     │ Great    │ Great         │
      └─────────────────────────────────────────────────────────────────────┘
PART I: TESTING
Chapter 36: Testing React Applications
text

36.1  Why Test?
      - Catch bugs before users do
      - Confidence in refactoring
      - Documentation of expected behavior
      - Prevent regression

36.2  Testing Types for React
      Unit Tests: individual functions, utilities, hooks
      Component Tests: rendering, interaction, behavior
      Integration Tests: multiple components working together
      E2E Tests: full user flows in real browser

36.3  The Testing Trophy (Kent C. Dodds)
      ────────────────────
           /  E2E  \       ← Few, slow, expensive but high confidence
          / Integra \
         / tion Tests \    ← Most important, good ROI
        ────────────────
       /   Unit Tests   \  ← Many, fast, but test in isolation
      ──────────────────────
     /  Static Analysis  \  ← TypeScript, ESLint (free bugs)

36.4  Setup
      npm install --save-dev vitest @testing-library/react
                             @testing-library/user-event
                             @testing-library/jest-dom jsdom

      // vite.config.js:
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.js'
      }

      // setup.js:
      import '@testing-library/jest-dom'

36.5  React Testing Library — Core API
      import { render, screen, fireEvent, waitFor } from '@testing-library/react'
      import userEvent from '@testing-library/user-event'

      // Render component:
      render(<Button onClick={handleClick}>Click Me</Button>)

      // Query methods (priority order):
      screen.getByRole('button', { name: /click me/i })  // 1st choice
      screen.getByLabelText('Email')                       // 2nd
      screen.getByPlaceholderText('Enter email')          // 3rd
      screen.getByText('Submit')                           // 4th
      screen.getByDisplayValue('John')                     // 5th
      screen.getByAltText('profile photo')                 // 6th
      screen.getByTitle('Tooltip text')                    // 7th
      screen.getByTestId('submit-btn')                     // Last resort

      // Query variants:
      getBy*    → throws if not found (synchronous)
      queryBy*  → returns null if not found (synchronous)
      findBy*   → returns Promise (asynchronous, waits)
      getAllBy*  → returns array (throws if none)

      // Common assertions:
      expect(element).toBeInTheDocument()
      expect(element).toBeVisible()
      expect(element).toBeDisabled()
      expect(element).toHaveTextContent('Hello')
      expect(element).toHaveValue('john@example.com')
      expect(element).toHaveClass('active')
      expect(element).toHaveAttribute('href', '/about')
      expect(element).not.toBeInTheDocument()

36.6  Writing Tests — Examples
      ─── Testing Rendering ───
      test('renders user card with name', () => {
        render(<UserCard name="Alice" age={25} />)
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(screen.getByText('25')).toBeInTheDocument()
      })

      ─── Testing User Interactions ───
      test('counter increments when button clicked', async () => {
        const user = userEvent.setup()
        render(<Counter />)

        expect(screen.getByText('0')).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: /increment/i }))
        expect(screen.getByText('1')).toBeInTheDocument()
      })

      ─── Testing Forms ───
      test('submits form with correct data', async () => {
        const user = userEvent.setup()
        const mockSubmit = vi.fn()
        render(<LoginForm onSubmit={mockSubmit} />)

        await user.type(screen.getByLabelText('Email'), 'test@example.com')
        await user.type(screen.getByLabelText('Password'), 'password123')
        await user.click(screen.getByRole('button', { name: /login/i }))

        expect(mockSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        })
      })

      ─── Testing Async Operations ───
      test('displays user data after fetch', async () => {
        // Mock fetch:
        global.fetch = vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ name: 'Alice', email: 'alice@test.com' })
        })

        render(<UserProfile userId="123" />)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
        expect(await screen.findByText('Alice')).toBeInTheDocument()
        expect(await screen.findByText('alice@test.com')).toBeInTheDocument()
      })

      ─── Testing with Providers ───
      function renderWithProviders(ui, { route = '/', store, ...options } = {}) {
        function Wrapper({ children }) {
          return (
            <Provider store={store || defaultStore}>
              <MemoryRouter initialEntries={[route]}>
                {children}
              </MemoryRouter>
            </Provider>
          )
        }
        return render(ui, { wrapper: Wrapper, ...options })
      }

      ─── Testing Custom Hooks ───
      import { renderHook, act } from '@testing-library/react'

      test('useToggle toggles value', () => {
        const { result } = renderHook(() => useToggle(false))
        expect(result.current[0]).toBe(false)

        act(() => result.current[1]()) // Call toggle
        expect(result.current[0]).toBe(true)
      })

36.7  Mocking API Calls with MSW (Mock Service Worker)
      import { setupServer } from 'msw/node'
      import { http, HttpResponse } from 'msw'

      const server = setupServer(
        http.get('/api/users/:id', ({ params }) => {
          return HttpResponse.json({ id: params.id, name: 'Alice' })
        }),
        http.post('/api/posts', async ({ request }) => {
          const body = await request.json()
          return HttpResponse.json({ id: 1, ...body }, { status: 201 })
        })
      )

      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())

36.8  E2E Testing Overview
      Playwright:
      test('user can log in', async ({ page }) => {
        await page.goto('/')
        await page.getByLabel('Email').fill('user@example.com')
        await page.getByLabel('Password').fill('password123')
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page).toHaveURL('/dashboard')
        await expect(page.getByText('Welcome')).toBeVisible()
      })

36.9  Testing Best Practices
      ✅ Test behavior, not implementation
      ✅ Queries by role/label (like users use it)
      ✅ Avoid testing internal state
      ✅ Use userEvent over fireEvent (more realistic)
      ✅ Mock at the network level (MSW) not module level
      ✅ AAA pattern: Arrange, Act, Assert
      ✅ One assertion concept per test
      ❌ Don't test third-party libraries
      ❌ Avoid data-testid (last resort)
      ❌ Don't snapshot everything
PART J: TYPESCRIPT WITH REACT
Chapter 37: TypeScript with React — Complete Guide
text

37.1  TypeScript Basics — Quick Reference
      // Basic types:
      string, number, boolean, null, undefined, void, never, any, unknown

      // Type vs Interface:
      type User = { name: string; age: number }      // Type alias
      interface IUser { name: string; age: number }  // Interface

      // Key differences:
      // Interface: can be extended, merged (declaration merging)
      // Type: can use union, intersection, mapped types

      // Generics:
      function identity<T>(arg: T): T { return arg }
      const wrap = <T,>(value: T): { value: T } => ({ value }) // JSX: comma after T

      // Utility types:
      Partial<User>              // All props optional
      Required<User>             // All props required
      Pick<User, 'name'>         // Only 'name' prop
      Omit<User, 'age'>          // Remove 'age' prop
      Record<string, number>     // { [key: string]: number }
      Readonly<User>             // Immutable
      ReturnType<typeof fn>      // Infer return type
      Parameters<typeof fn>      // Infer parameter types
      NonNullable<string | null> // Remove null/undefined

37.2  Typing React Components
      // Method 1: Explicit props interface (preferred)
      interface ButtonProps {
        label: string
        onClick: () => void
        variant?: 'primary' | 'secondary' | 'danger'
        disabled?: boolean
        children?: React.ReactNode
      }
      function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
        return <button onClick={onClick} disabled={disabled}>{label}</button>
      }

      // Method 2: React.FC (less preferred)
      const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
        return <button onClick={onClick}>{label}</button>
      }
      // Downside of FC: implicitly includes children (React 17 and below)

37.3  Typing children Prop
      React.ReactNode    → Most permissive: JSX, string, number, null, boolean
      React.ReactElement → Only JSX elements (no string/null)
      JSX.Element        → Single JSX element
      React.PropsWithChildren<Props> → Adds children to props

37.4  Typing Events
      React.MouseEvent<HTMLButtonElement>
      React.ChangeEvent<HTMLInputElement>
      React.ChangeEvent<HTMLSelectElement>
      React.FormEvent<HTMLFormElement>
      React.KeyboardEvent<HTMLInputElement>
      React.FocusEvent<HTMLInputElement>
      React.DragEvent<HTMLDivElement>
      React.WheelEvent<HTMLDivElement>
      React.TouchEvent<HTMLDivElement>

      // Example:
      function Input({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
        return <input onChange={onChange} />
      }

37.5  Typing Hooks
      // useState:
      const [name, setName] = useState<string>('')
      const [user, setUser] = useState<User | null>(null)
      const [items, setItems] = useState<Item[]>([])

      // useRef:
      const inputRef = useRef<HTMLInputElement>(null) // DOM ref
      const countRef = useRef<number>(0)             // Mutable value

      // useReducer:
      type State = { count: number; loading: boolean }
      type Action =
        | { type: 'INCREMENT' }
        | { type: 'DECREMENT' }
        | { type: 'SET_LOADING'; payload: boolean } // Discriminated union

      function reducer(state: State, action: Action): State {
        switch (action.type) {
          case 'INCREMENT': return { ...state, count: state.count + 1 }
          case 'SET_LOADING': return { ...state, loading: action.payload }
          default: return state
        }
      }

      const [state, dispatch] = useReducer(reducer, { count: 0, loading: false })

      // useContext:
      interface ThemeContextType {
        theme: 'light' | 'dark'
        toggleTheme: () => void
      }
      const ThemeContext = createContext<ThemeContextType | null>(null)
      function useTheme(): ThemeContextType {
        const context = useContext(ThemeContext)
        if (!context) throw new Error('useTheme must be within ThemeProvider')
        return context
      }

37.6  Typing forwardRef
      const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
        return <input ref={ref} {...props} />
      })

37.7  Generic Components
      interface ListProps<T> {
        items: T[]
        renderItem: (item: T) => React.ReactNode
        keyExtractor: (item: T) => string
      }

      function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
        return (
          <ul>
            {items.map(item => (
              <li key={keyExtractor(item)}>{renderItem(item)}</li>
            ))}
          </ul>
        )
      }

      // Usage:
      <List
        items={users}
        renderItem={(user) => <UserCard user={user} />}
        keyExtractor={(user) => user.id.toString()}
      />

37.8  Polymorphic Components (as prop)
      type PolymorphicProps<T extends React.ElementType> = {
        as?: T
        children?: React.ReactNode
      } & React.ComponentPropsWithoutRef<T>

      function Box<T extends React.ElementType = 'div'>({
        as,
        children,
        ...props
      }: PolymorphicProps<T>) {
        const Component = as || 'div'
        return <Component {...props}>{children}</Component>
      }

      // Usage:
      <Box as="button" onClick={handleClick}>Click</Box>
      <Box as="a" href="/about">Link</Box>
      <Box>Just a div</Box>

37.9  TypeScript Configuration (tsconfig.json for React)
      {
        "compilerOptions": {
          "target": "ES2020",
          "lib": ["ES2020", "DOM", "DOM.Iterable"],
          "module": "ESNext",
          "moduleResolution": "bundler",
          "jsx": "react-jsx",
          "strict": true,
          "noUnusedLocals": true,
          "noUnusedParameters": true,
          "exactOptionalPropertyTypes": true,
          "baseUrl": ".",
          "paths": { "@/*": ["./src/*"] }
        }
      }
PART K: NEXT.JS — COMPLETE MASTERY
Chapter 38: Introduction to Next.js
text

38.1  What is Next.js?
      - React framework by Vercel
      - "The React Framework for the Web"
      - Adds to React: routing, SSR, SSG, API routes, optimization
      - Current version: Next.js 14/15 (App Router)

38.2  Why Next.js Over Plain React (CRA/Vite)?
      Problem with plain React SPA:
      ❌ SEO: Search engines see empty HTML (JS renders later)
      ❌ Performance: All JS must download before rendering
      ❌ No built-in routing (need React Router)
      ❌ No API routes (need separate backend)
      ❌ No automatic optimization

      Next.js solutions:
      ✅ SSR: HTML generated on server → SEO friendly
      ✅ SSG: Pages pre-built at build time → fast
      ✅ File-based routing: folders/files = routes
      ✅ API routes: /app/api/route.ts
      ✅ Image, Font, Script optimization built-in

38.3  Next.js Features Overview
      ─ File-based routing (app/ directory)
      ─ Multiple rendering strategies (SSR, SSG, ISR, CSR)
      ─ React Server Components (default)
      ─ Server Actions (mutations without API routes)
      ─ Streaming + Suspense
      ─ next/image (image optimization)
      ─ next/font (font optimization)
      ─ next/link (prefetching)
      ─ next/script (script optimization)
      ─ Middleware (edge network)
      ─ Route Handlers (API routes)
      ─ TypeScript + ESLint out of box
      ─ Edge Runtime support

38.4  App Router vs Pages Router
      ┌──────────────────────────────────────────────────────────┐
      │ Feature        │ App Router (v13+) │ Pages Router       │
      ├──────────────────────────────────────────────────────────│
      │ Default        │ React 18+         │ React 17           │
      │ Components     │ Server Components │ Client Components  │
      │ Data Fetching  │ fetch in async SC │ getStaticProps etc │
      │ Routing        │ app/ folder       │ pages/ folder      │
      │ Layouts        │ layout.tsx        │ _app.tsx           │
      │ API Routes     │ route.ts handlers │ pages/api/*.ts     │
      │ Mutations      │ Server Actions    │ API routes         │
      └──────────────────────────────────────────────────────────┘
      → Learn App Router (future), understand Pages Router (legacy)

38.5  Setup & Project Structure
      npx create-next-app@latest my-app
      Options: TypeScript ✅, ESLint ✅, Tailwind ✅, App Router ✅

      Project structure:
      my-app/
      ├── app/                    # App Router (all routes)
      │   ├── layout.tsx          # Root layout (required)
      │   ├── page.tsx            # Home page (/)
      │   ├── globals.css         # Global styles
      │   ├── loading.tsx         # Global loading UI
      │   ├── error.tsx           # Global error UI
      │   └── about/
      │       └── page.tsx        # /about page
      ├── public/                 # Static assets (images, fonts)
      ├── components/             # Reusable components
      ├── lib/                    # Utilities, DB clients
      ├── hooks/                  # Custom hooks
      ├── types/                  # TypeScript types
      ├── next.config.js          # Next.js config
      ├── tailwind.config.js      # Tailwind config
      └── tsconfig.json           # TypeScript config

38.6  next.config.js — Important Options
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        images: {
          remotePatterns: [{ hostname: 'images.unsplash.com' }]
        },
        async redirects() {
          return [{ source: '/old', destination: '/new', permanent: true }]
        },
        async rewrites() {
          return [{ source: '/api/:path*', destination: 'https://api.example.com/:path*' }]
        },
        async headers() {
          return [{
            source: '/(.*)',
            headers: [{ key: 'X-Frame-Options', value: 'DENY' }]
          }]
        },
        experimental: { serverActions: { allowedOrigins: ['...'] } }
      }
      module.exports = nextConfig
Chapter 39: Next.js App Router — File System Routing
text

39.1  Routing by Folder Structure
      app/page.tsx               → /
      app/about/page.tsx         → /about
      app/blog/page.tsx          → /blog
      app/blog/[slug]/page.tsx   → /blog/:slug (dynamic)
      app/api/route.ts           → /api (API endpoint)

39.2  Special Files — Complete Reference
      ┌─────────────────────────────────────────────────────────────┐
      │ File          │ Purpose                                     │
      ├─────────────────────────────────────────────────────────────│
      │ page.tsx      │ Makes route publicly accessible            │
      │ layout.tsx    │ Shared UI, persists across navigation      │
      │ loading.tsx   │ Suspense fallback (auto wraps page)        │
      │ error.tsx     │ Error boundary (must be Client Component)  │
      │ not-found.tsx │ 404 UI                                     │
      │ template.tsx  │ Like layout but re-mounts on nav          │
      │ default.tsx   │ Parallel route fallback                    │
      │ route.ts      │ API endpoint (GET, POST, etc.)             │
      │ global-error  │ Root-level error boundary                  │
      └─────────────────────────────────────────────────────────────┘

39.3  Layouts — Deep Dive
      // app/layout.tsx (ROOT LAYOUT — required)
      export default function RootLayout({ children }: { children: React.ReactNode }) {
        return (
          <html lang="en">
            <body>
              <Header />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        )
      }

      // app/dashboard/layout.tsx (NESTED LAYOUT)
      export default function DashboardLayout({ children }: { children: React.ReactNode }) {
        return (
          <div className="flex">
            <DashboardSidebar />
            <div className="flex-1">{children}</div>
          </div>
        )
      }

      // Layout vs Template:
      Layout: persists, does NOT re-mount on navigation (preserves state)
      Template: re-mounts on every navigation (resets state)

39.4  Dynamic Routes
      // app/blog/[slug]/page.tsx
      export default function BlogPost({ params }: { params: { slug: string } }) {
        return <h1>Post: {params.slug}</h1>
      }

      // Catch-all: /docs/a/b/c → params.slug = ['a', 'b', 'c']
      // app/docs/[...slug]/page.tsx

      // Optional catch-all: also matches /docs
      // app/docs/[[...slug]]/page.tsx

39.5  Route Groups — Organize Without Affecting URL
      app/
      ├── (marketing)/         // Route group (parentheses = not in URL)
      │   ├── about/page.tsx   // → /about
      │   └── pricing/page.tsx // → /pricing
      ├── (shop)/
      │   ├── products/page.tsx // → /products
      │   └── cart/page.tsx    // → /cart
      └── layout.tsx

      // Use cases: different layouts for different route groups
      // (marketing) uses MarketingLayout
      // (shop) uses ShopLayout

39.6  Parallel Routes — Multiple Pages in One Layout
      app/dashboard/
      ├── layout.tsx           // Has @analytics and @team slots
      ├── page.tsx             // Main dashboard
      ├── @analytics/
      │   └── page.tsx         // Rendered in @analytics slot
      └── @team/
          └── page.tsx         // Rendered in @team slot

      // Layout:
      export default function Dashboard({
        children,
        analytics,
        team
      }: {
        children: React.ReactNode
        analytics: React.ReactNode
        team: React.ReactNode
      }) {
        return (
          <div>
            {children}
            <div className="grid grid-cols-2">
              {analytics}
              {team}
            </div>
          </div>
        )
      }

39.7  Intercepting Routes — Modal Pattern
      app/
      ├── photo/[id]/page.tsx       // Full photo page
      └── @modal/
          └── (.)photo/[id]/page.tsx // Intercepted (shows as modal)

      // Inter




# 📘 Complete Contents: Chapter 38 to End of Book

---

## **PART G — NEXT.JS (FULL DEEP DIVE)**

---

### **Chapter 38: Introduction to Next.js**

```
38.1  What is Next.js?
      - React framework by Vercel
      - "The React Framework for the Web"
      - Adds to React: routing, SSR, SSG, API routes, optimization
      - Current version: Next.js 14/15 (App Router)

38.2  Why Next.js Over Plain React (CRA/Vite)?
      Problem with plain React SPA:
      ❌ SEO: Search engines see empty HTML (JS renders later)
      ❌ Performance: All JS must download before rendering
      ❌ No built-in routing (need React Router)
      ❌ No API routes (need separate backend)
      ❌ No automatic optimization

      Next.js solutions:
      ✅ SSR: HTML generated on server → SEO friendly
      ✅ SSG: Pages pre-built at build time → fast
      ✅ File-based routing: folders/files = routes
      ✅ API routes: app/api/route.ts
      ✅ Image, Font, Script optimization built-in

38.3  Next.js Features Overview
      ─ File-based routing (app/ directory)
      ─ Multiple rendering strategies (SSR, SSG, ISR, CSR)
      ─ React Server Components (default)
      ─ Server Actions (mutations without API routes)
      ─ Streaming + Suspense
      ─ next/image (image optimization)
      ─ next/font (font optimization)
      ─ next/link (prefetching)
      ─ next/script (script optimization)
      ─ Middleware (edge network)
      ─ Route Handlers (API routes)
      ─ TypeScript + ESLint out of box
      ─ Edge Runtime support

38.4  App Router vs Pages Router
      ┌────────────────────────────────────────────────────────────┐
      │ Feature        │ App Router (v13+)  │ Pages Router        │
      ├────────────────────────────────────────────────────────────┤
      │ Default        │ React 18+          │ React 17            │
      │ Components     │ Server Components  │ Client Components   │
      │ Data Fetching  │ fetch in async SC  │ getStaticProps etc  │
      │ Routing        │ app/ folder        │ pages/ folder       │
      │ Layouts        │ layout.tsx         │ _app.tsx            │
      │ API Routes     │ route.ts handlers  │ pages/api/*.ts      │
      │ Mutations      │ Server Actions     │ API routes          │
      └────────────────────────────────────────────────────────────┘
      → Learn App Router (future), understand Pages Router (legacy)

38.5  Setup & Project Structure
      npx create-next-app@latest my-app
      Options: TypeScript ✅, ESLint ✅, Tailwind ✅, App Router ✅

      Project structure:
      my-app/
      ├── app/                    # App Router (all routes)
      │   ├── layout.tsx          # Root layout (required)
      │   ├── page.tsx            # Home page (/)
      │   ├── globals.css         # Global styles
      │   ├── loading.tsx         # Global loading UI
      │   ├── error.tsx           # Global error UI
      │   └── about/
      │       └── page.tsx        # /about page
      ├── public/                 # Static assets
      ├── components/             # Reusable components
      ├── lib/                    # Utilities, DB clients
      ├── hooks/                  # Custom hooks
      ├── types/                  # TypeScript types
      ├── next.config.js          # Next.js config
      ├── tailwind.config.js      # Tailwind config
      └── tsconfig.json           # TypeScript config

38.6  next.config.js — Important Options
      /** @type {import('next').NextConfig} */
      const nextConfig = {
        images: {
          remotePatterns: [{ hostname: 'images.unsplash.com' }]
        },
        async redirects() { ... },
        async rewrites() { ... },
        async headers() { ... },
        experimental: { serverActions: { allowedOrigins: ['...'] } }
      }

38.7  Understanding app/ Directory — Special Files
      ┌──────────────────────────────────────────────────────────┐
      │ File            │ Purpose                                │
      ├──────────────────────────────────────────────────────────┤
      │ page.tsx        │ Unique UI for a route (makes it public)│
      │ layout.tsx      │ Shared UI that wraps children          │
      │ loading.tsx     │ Loading UI (Suspense fallback)         │
      │ error.tsx       │ Error UI (Error Boundary)              │
      │ not-found.tsx   │ 404 UI for notFound() calls            │
      │ template.tsx    │ Like layout but re-mounts each nav     │
      │ default.tsx     │ Fallback for parallel routes           │
      │ route.ts        │ API endpoint (Route Handler)           │
      └──────────────────────────────────────────────────────────┘

38.8  Next.js CLI Commands
      next dev          # Start dev server (localhost:3000)
      next build        # Build for production
      next start        # Start production server
      next lint         # Run ESLint
      next info         # Print environment info

38.9  React Developer Tools + Next.js DevTools
      - React DevTools browser extension
      - Next.js toolbar (dev mode)
      - Vercel Speed Insights
      - Bundle analyzer: @next/bundle-analyzer

38.10 How Next.js Renders a Page — Request Lifecycle
      Request → Middleware → Route matching →
      Server Component render → HTML sent →
      Client hydration → Interactive

      Interview Q: What happens when user visits a Next.js page?
      Interview Q: What is hydration? What causes hydration errors?
```

---

### **Chapter 39: Next.js App Router — Routing System**

```
39.1  File-Based Routing Explained
      - Folders define route segments
      - page.tsx makes a route publicly accessible
      - Without page.tsx: folder is not a route
      - URL = folder names joined by /

      app/
      ├── page.tsx              →  /
      ├── about/page.tsx        →  /about
      ├── blog/
      │   ├── page.tsx          →  /blog
      │   └── post/page.tsx     →  /blog/post
      └── dashboard/
          ├── page.tsx          →  /dashboard
          └── settings/page.tsx →  /dashboard/settings

39.2  Layouts — layout.tsx
      - Wraps page.tsx and all child routes
      - Does NOT re-render on navigation (state preserved)
      - Root layout: must contain <html> and <body>
      - Nested layouts: automatically wrap child pages

      Root layout (required):
      app/layout.tsx → wraps ALL pages

      Nested layout:
      app/dashboard/layout.tsx → wraps dashboard pages only

      Layout receives: { children: React.ReactNode }
      Layout does NOT receive: searchParams

39.3  Pages — page.tsx
      - Receives props: params, searchParams
      - Can be async (Server Component by default)
      - Must export default function

      interface PageProps {
        params: { slug: string }
        searchParams: { tab?: string }
      }

39.4  Loading UI — loading.tsx
      - Automatic Suspense boundary
      - Shows while page.tsx is loading
      - Works with async Server Components
      - Can be at any level (root, dashboard, etc.)

      app/dashboard/loading.tsx
      → Shows spinner while dashboard data loads

39.5  Error Handling — error.tsx
      - Automatic Error Boundary
      - MUST be a Client Component ('use client')
      - Receives: { error: Error, reset: () => void }
      - reset() retries rendering the segment

      app/dashboard/error.tsx
      → Catches errors only in dashboard segment

      app/global-error.tsx
      → Catches errors in root layout (rare)

39.6  Not Found — not-found.tsx
      - Shows when notFound() is called
      - Or when no route matches
      - Can be scoped to segments

      import { notFound } from 'next/navigation'
      if (!product) notFound()  // triggers not-found.tsx

39.7  Template — template.tsx
      - Like layout.tsx BUT re-mounts on every navigation
      - Creates new instance each time
      - Use for: animations, useEffect per route, analytics

      layout.tsx   → state preserved across navigations
      template.tsx → fresh mount every navigation

39.8  Dynamic Routes — [param]
      Folder name with square brackets = dynamic segment

      app/blog/[slug]/page.tsx     →  /blog/any-value
      app/users/[id]/page.tsx      →  /users/123

      Accessing the param:
      export default function Page({ params }: { params: { slug: string } }) {
        return <h1>{params.slug}</h1>
      }

      Multiple dynamic segments:
      app/shop/[category]/[id]/page.tsx
      → /shop/electronics/laptop-123
      → params = { category: 'electronics', id: 'laptop-123' }

39.9  Catch-All Routes — [...slug]
      - Matches multiple path segments
      - params.slug is a string[]
      - Does NOT match root path

      app/docs/[...slug]/page.tsx
      → /docs/intro              ✅  slug = ['intro']
      → /docs/api/components     ✅  slug = ['api', 'components']
      → /docs                    ❌  Not matched (404)

39.10 Optional Catch-All — [[...slug]]
      - Double brackets = optional
      - ALSO matches root path

      app/docs/[[...slug]]/page.tsx
      → /docs                    ✅  slug = undefined
      → /docs/intro              ✅  slug = ['intro']
      → /docs/api/components     ✅  slug = ['api', 'components']

      Handle undefined:
      if (!params.slug) return <DocsHome />
      return <DocPage slug={params.slug} />

39.11 Route Groups — (groupName)
      - Parentheses = group folder (NO URL impact)
      - Organize files without affecting routes
      - Can have different layouts per group

      app/
      ├── (marketing)/
      │   ├── layout.tsx    ← Marketing layout (no auth)
      │   ├── page.tsx      →  /
      │   └── about/page.tsx →  /about
      └── (dashboard)/
          ├── layout.tsx    ← Dashboard layout (auth required)
          └── overview/page.tsx →  /overview

      Use cases:
      ─ Different layouts (public vs protected)
      ─ Code organization
      ─ Multiple root layouts

39.12 Parallel Routes — @slot
      - Multiple pages rendered simultaneously in same layout
      - Folder prefixed with @: creates a "slot"
      - Slots received as props in layout alongside children
      - Each slot: independent loading, error, sub-routes

      app/dashboard/
      ├── layout.tsx            ← receives children, @analytics, @team
      ├── page.tsx              ← default children
      ├── @analytics/
      │   └── page.tsx          ← analytics panel
      └── @team/
          └── page.tsx          ← team panel

      layout.tsx:
      export default function Layout({ children, analytics, team }) {
        return (
          <div>
            {children}
            {analytics}
            {team}
          </div>
        )
      }

      default.tsx:
      - Fallback when slot has no matching route
      - Required to avoid 404 on unmatched slots

39.13 Intercepting Routes — (.) (..) (...)
      - Load a route WITHIN current layout
      - URL updates but context preserved
      - Classic use: photo modal gallery

      Prefixes:
      (.)   same level
      (..)  one level up
      (..)(..) two levels up
      (...) from app root

      Pattern: Modal that has its own URL
      - Click photo in gallery → modal opens, URL = /photos/123
      - Refresh at /photos/123 → full photo page
      - Back button → modal closes, still on gallery

      app/
      ├── @modal/
      │   ├── default.tsx               ← null (no modal)
      │   └── (.)photos/[id]/page.tsx   ← Modal version
      ├── feed/page.tsx                 ← Gallery
      └── photos/[id]/page.tsx          ← Full page

39.14 Middleware — middleware.ts
      - Runs before EVERY request
      - Placed at root (or src/) of project
      - Runs on Edge Runtime (fast, near user)

      Use cases:
      ─ Authentication/authorization
      ─ Redirects based on location/device
      ─ A/B testing
      ─ Bot protection
      ─ Request/response modification

      export function middleware(request: NextRequest) {
        // Check auth, redirect, rewrite...
        return NextResponse.next()
      }

      export const config = {
        matcher: ['/dashboard/:path*', '/admin/:path*']
      }

39.15 Programmatic Navigation — useRouter
      IMPORTANT: Use 'next/navigation' (App Router)
      NOT 'next/router' (Pages Router) ❌

      import { useRouter, usePathname,
               useSearchParams, useParams } from 'next/navigation'

      router.push('/dashboard')       // Navigate + add to history
      router.replace('/login')        // Navigate + replace history
      router.back()                   // Go back
      router.forward()                // Go forward
      router.refresh()                // Re-fetch server data
      router.prefetch('/page')        // Prefetch route

      usePathname()    → '/dashboard/settings'
      useSearchParams() → URLSearchParams object
      useParams()      → { id: '123' }

39.16 Link Component & Prefetching
      import Link from 'next/link'

      <Link href="/about">About</Link>

      - Auto prefetches when Link enters viewport
      - Static routes: full page prefetched
      - Dynamic routes: loading UI + layouts prefetched

      Props:
      prefetch={false}    // Disable prefetch
      replace             // Replace history entry
      scroll={false}      // Don't scroll to top

      External links: use <a> not <Link>

39.17 Active Link Styling
      'use client'  // Required (uses hooks)

      import { usePathname } from 'next/navigation'

      const pathname = usePathname()
      const isActive = pathname === href
      // OR for nested: pathname.startsWith(href)

      className={isActive ? 'active-styles' : 'default-styles'}
      aria-current={isActive ? 'page' : undefined}

39.18 Redirects & Rewrites in next.config.js
      Redirects: URL changes (307 temp / 308 permanent)
      Rewrites: URL stays same, content changes (proxy)

      Redirect use cases: moved pages, old → new URLs
      Rewrite use cases: proxy APIs, hide endpoints, vanity URLs

      Redirect:
      { source: '/old', destination: '/new', permanent: true }

      Rewrite:
      { source: '/api/:path*', destination: 'https://api.example.com/:path*' }

      Interview Q: Difference between redirect and rewrite?
      Interview Q: How to protect routes using middleware?
      Interview Q: What are parallel routes used for?
      Interview Q: Explain intercepting routes with real example.
```

---

### **Chapter 40: Server Components vs Client Components**

```
40.1  React Server Components (RSC) — What & Why
      - Components that render ONLY on the server
      - Zero JavaScript sent to client for these components
      - Direct access to backend: DB, files, env vars
      - Default in Next.js App Router

      Benefits:
      ✅ Smaller client bundle (no JS for server components)
      ✅ Faster page loads
      ✅ Direct database access (no API needed)
      ✅ Sensitive data never leaves server
      ✅ Automatic code splitting

40.2  Client Components — 'use client'
      - Add 'use client' directive at TOP of file
      - Can use: hooks, state, effects, browser APIs
      - Can attach event listeners
      - Rendered on server (HTML) + hydrated on client

      'use client'

      import { useState } from 'react'

      export default function Counter() {
        const [count, setCount] = useState(0)
        return <button onClick={() => setCount(c => c + 1)}>{count}</button>
      }

40.3  Server vs Client — Comparison Table
      ┌──────────────────────────────────────────────────────────┐
      │ Capability            │ Server Component │ Client Comp  │
      ├──────────────────────────────────────────────────────────┤
      │ useState / useEffect  │ ❌               │ ✅           │
      │ Event handlers        │ ❌               │ ✅           │
      │ Browser APIs          │ ❌               │ ✅           │
      │ Custom hooks          │ ❌               │ ✅           │
      │ async/await directly  │ ✅               │ ❌           │
      │ Database access       │ ✅               │ ❌           │
      │ File system           │ ✅               │ ❌           │
      │ Server-only secrets   │ ✅               │ ❌           │
      │ fetch (cached)        │ ✅               │ ✅           │
      └──────────────────────────────────────────────────────────┘

40.4  When to Use Which?
      Use Server Component when:
      ─ Fetching data (from DB, API)
      ─ Displaying static or server-fetched content
      ─ Accessing backend resources
      ─ Keeping sensitive logic server-side
      ─ Large dependencies (keep off client bundle)

      Use Client Component when:
      ─ Need interactivity (clicks, input, forms)
      ─ Using useState, useEffect, useRef
      ─ Using browser APIs (window, localStorage)
      ─ Using third-party libraries needing DOM

40.5  How They Work Together — Composition Rules
      Rule 1: Server can import + render Client Components ✅
      Rule 2: Client CANNOT import Server Components ❌
      Rule 3: Server Components CAN be passed as props/children to Client ✅

      Pattern: Push 'use client' to LEAF components
      - Keep parent components as Server Components
      - Only make interactive parts Client Components

      // ✅ Correct pattern
      // ServerPage.tsx (Server Component)
      import ClientButton from './ClientButton'
      export default function ServerPage() {
        return (
          <main>
            <h1>Server rendered title</h1>  {/* stays on server */}
            <ClientButton />                {/* goes to client */}
          </main>
        )
      }

40.6  The Client Boundary
      - 'use client' creates a boundary
      - Everything IMPORTED inside a Client Component becomes client code
      - But: components PASSED as props/children stay as Server Components

      // ❌ This makes ServerComponent a client component too
      'use client'
      import ServerComponent from './ServerComponent'  // Bad!

      // ✅ Pass as children instead
      // Parent (Server): <ClientLayout><ServerComponent /></ClientLayout>
      // ClientLayout receives children prop → ServerComponent stays server

40.7  Server-Only & Client-Only Packages
      import 'server-only'    // Throws if imported in client code
      import 'client-only'    // Throws if imported in server code

      Usage:
      // lib/db.ts
      import 'server-only'    // Ensure this never runs on client
      import { prisma } from './prisma'

40.8  Context in Server Components
      - Context API does NOT work in Server Components
      - Context only works in Client Component trees
      - Solution: fetch data in Server → pass as props to Client Provider

40.9  Third-Party Libraries with Server Components
      Many npm packages use 'use client' internally — fine
      Some older packages don't — need wrapper:

      // components/MapWrapper.tsx
      'use client'
      import { Map } from 'some-map-library'  // needs DOM
      export default Map  // re-export as Client Component

40.10 Fetching Data in Server Components
      // Direct async/await in Server Component
      export default async function ProductsPage() {
        const products = await db.query('SELECT * FROM products')
        return <ProductList products={products} />
      }

      No useEffect needed!
      No loading states needed! (use loading.tsx)
      No error handling needed! (use error.tsx)

40.11 Hydration — What It Is & Common Errors
      Hydration: React attaches event listeners to server HTML
      Steps:
      1. Server sends HTML (fast first paint)
      2. Client downloads JS bundle
      3. React "hydrates" — matches server HTML with client components
      4. Page becomes interactive

      Hydration Mismatch Error:
      - Server HTML ≠ Client render output
      - Causes: Date.now(), Math.random(), window access,
                browser extensions, wrong HTML nesting

      Fix: Use suppressHydrationWarning or move to useEffect

40.12 Interview Questions
      Q: What are React Server Components?
      Q: Can Server Components use useState?
      Q: How do you pass data from Server to Client Component?
      Q: What causes hydration errors?
      Q: What is the client boundary?
      Q: Why are Server Components better for performance?
```

---

### **Chapter 41: Data Fetching in Next.js**

```
41.1  Data Fetching Overview — All Approaches
      ┌──────────────────────────────────────────────────────────┐
      │ Approach              │ Where    │ When to Use           │
      ├──────────────────────────────────────────────────────────┤
      │ async Server Comp     │ Server   │ Default — always first │
      │ Route Handler (GET)   │ Server   │ External API consumer  │
      │ Server Action         │ Server   │ Mutations/forms        │
      │ useEffect + fetch     │ Client   │ User-triggered fetches │
      │ TanStack Query        │ Client   │ Complex client caching │
      │ SWR                   │ Client   │ Simple client caching  │
      └──────────────────────────────────────────────────────────┘

41.2  fetch() in Next.js — Enhanced Behavior
      Next.js extends native fetch() with:
      ─ Automatic request deduplication
      ─ Caching control
      ─ Revalidation options

      // Static (cached forever until rebuild)
      fetch(url, { cache: 'force-cache' })  // default

      // Dynamic (no cache, fresh every request)
      fetch(url, { cache: 'no-store' })

      // ISR (revalidate every N seconds)
      fetch(url, { next: { revalidate: 3600 } })

      // Tag-based revalidation
      fetch(url, { next: { tags: ['products'] } })

41.3  Async Server Components — The Modern Way
      export default async function ProductsPage() {
        // No useEffect, no useState, no loading state needed
        const products = await fetchProducts()
        return <ProductGrid products={products} />
      }

      Parallel fetching (avoid waterfall):
      const [user, posts] = await Promise.all([
        fetchUser(id),
        fetchPosts(id)
      ])

      Sequential (when second depends on first):
      const user = await fetchUser(id)
      const posts = await fetchPosts(user.teamId)

41.4  Next.js Caching — Four Layers
      Layer 1: Request Memoization
      - Same fetch() URL called multiple times in one render
      - Automatically deduped — only ONE actual request made
      - Scope: single request lifecycle

      Layer 2: Data Cache
      - fetch() responses stored on server
      - Persists across requests and deployments
      - Controlled by cache: 'no-store' or revalidate

      Layer 3: Full Route Cache
      - Entire rendered HTML + RSC payload cached
      - Only for statically rendered routes
      - Invalidated by revalidatePath/Tag or rebuild

      Layer 4: Router Cache
      - Client-side cache of visited routes
      - Stored in browser memory
      - Duration: 30s (dynamic) to 5min (static)
      - Cleared on: router.refresh(), page reload

41.5  Static vs Dynamic Rendering
      STATIC (default):
      - Page HTML generated at build time
      - Same HTML served to all users
      - Super fast (served from CDN)

      DYNAMIC (opt in):
      - HTML generated per request
      - Can access: request data, cookies, headers
      - Triggered automatically when using:
        ─ cookies() or headers() functions
        ─ searchParams prop in page
        ─ fetch with cache: 'no-store'
        ─ Dynamic segments without generateStaticParams

      Force dynamic:
      export const dynamic = 'force-dynamic'

      Force static:
      export const dynamic = 'force-static'

41.6  Incremental Static Regeneration (ISR)
      - Static pages that update in the background
      - Best of both: speed of static + freshness of dynamic

      Time-based ISR:
      fetch(url, { next: { revalidate: 60 } })
      // OR
      export const revalidate = 60  // seconds

      On-demand ISR:
      // In Server Action or Route Handler:
      import { revalidatePath, revalidateTag } from 'next/cache'
      revalidatePath('/products')
      revalidateTag('products')

41.7  generateStaticParams — Pre-rendering Dynamic Routes
      // app/blog/[slug]/page.tsx

      export async function generateStaticParams() {
        const posts = await fetchAllPosts()
        return posts.map(post => ({ slug: post.slug }))
      }
      // Pre-renders /blog/post-1, /blog/post-2, etc at build time

      With generateStaticParams:
      - Dynamic routes become static at build time
      - Pages served from CDN (super fast)
      - Falls back to dynamic if param not in list

      export const dynamicParams = false  // 404 for unknown params
      export const dynamicParams = true   // Generate on demand (default)

41.8  Streaming — Progressive Rendering
      - Send HTML in chunks as data becomes available
      - Users see content faster (no waiting for all data)
      - Works with Suspense boundaries

      Method 1: loading.tsx (automatic Suspense)
      Method 2: Manual <Suspense> wrapping

      import { Suspense } from 'react'

      export default function Dashboard() {
        return (
          <div>
            <h1>Dashboard</h1>              {/* Immediate */}
            <Suspense fallback={<Spinner />}>
              <SlowComponent />             {/* Streams in */}
            </Suspense>
            <Suspense fallback={<Skeleton />}>
              <AnotherSlowComponent />      {/* Streams in */}
            </Suspense>
          </div>
        )
      }

41.9  Client-Side Fetching — When & How
      Use client fetching when:
      ─ Data changes frequently (real-time)
      ─ User-specific data after interaction
      ─ After user action (button click)
      ─ Data not needed for initial render

      Simple fetch with useEffect:
      const [data, setData] = useState(null)
      useEffect(() => {
        fetch('/api/data')
          .then(r => r.json())
          .then(setData)
      }, [])

      Better: TanStack Query (React Query)
      const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
      })

41.10 unstable_cache — Caching Non-Fetch Data
      import { unstable_cache } from 'next/cache'

      const getCachedUser = unstable_cache(
        async (id: string) => db.user.findUnique({ where: { id } }),
        ['user'],  // cache key
        { revalidate: 3600, tags: ['user'] }
      )

      // Used for: Prisma queries, Redis calls, any async function

41.11 Route Segment Config Options
      // Placed at top of page.tsx, layout.tsx, route.ts
      export const dynamic = 'auto' | 'force-dynamic' | 'force-static'
      export const revalidate = false | 0 | number
      export const fetchCache = 'auto' | 'force-cache' | 'no-store'
      export const runtime = 'nodejs' | 'edge'
      export const preferredRegion = 'auto' | 'global' | 'home'

41.12 Interview Questions
      Q: What is the difference between static and dynamic rendering?
      Q: How does ISR work in Next.js App Router?
      Q: Explain the four caching layers in Next.js.
      Q: When would you use Suspense with data fetching?
      Q: What is request memoization?
      Q: How do you trigger on-demand revalidation?
      Q: generateStaticParams vs getStaticPaths?
```

---

### **Chapter 42: Rendering Strategies in Next.js**

```
42.1  The Four Rendering Strategies
      ┌──────────────────────────────────────────────────────────┐
      │ Strategy │ When Rendered    │ Speed   │ Fresh Data?      │
      ├──────────────────────────────────────────────────────────┤
      │ CSR      │ In browser       │ Slow    │ Always fresh     │
      │ SSR      │ On each request  │ Medium  │ Always fresh     │
      │ SSG      │ At build time    │ Fastest │ Only at build    │
      │ ISR      │ Build + reval.   │ Fast    │ Periodically     │
      └──────────────────────────────────────────────────────────┘

42.2  CSR — Client-Side Rendering
      - React default behavior (CRA/Vite)
      - Server sends empty HTML shell
      - Browser downloads JS → renders content
      - Content NOT in initial HTML → bad for SEO

      When to use:
      ─ Highly interactive dashboards
      ─ Pages behind authentication (SEO not needed)
      ─ Real-time data (chat, live feeds)
      ─ User-specific content

      In Next.js: Add 'use client' + fetch in useEffect/React Query

42.3  SSR — Server-Side Rendering
      - HTML generated on SERVER per request
      - User gets fully rendered HTML immediately
      - React hydrates on client for interactivity
      - Fresh data on every request

      In Next.js App Router:
      export const dynamic = 'force-dynamic'
      // OR use cookies(), headers(), searchParams

      // OR use no-store fetch:
      const data = await fetch(url, { cache: 'no-store' })

      When to use:
      ─ Pages needing fresh data + SEO
      ─ User-specific pages (profile, dashboard with SSR)
      ─ Pages needing request-time data (user agent, IP)

42.4  SSG — Static Site Generation
      - HTML generated at BUILD time
      - Same HTML served to all users
      - Served from CDN → extremely fast
      - Data can only change with a rebuild

      In Next.js App Router:
      Default behavior for pages without dynamic functions

      // Force static:
      export const dynamic = 'force-static'

      When to use:
      ─ Marketing pages, landing pages
      ─ Blog posts, documentation
      ─ Pages that rarely change
      ─ Pages where SEO is critical

42.5  ISR — Incremental Static Regeneration
      - Static pages that regenerate in background
      - Stale-while-revalidate pattern
      - First request after revalidate time → triggers rebuild
      - Subsequent requests → get fresh page

      export const revalidate = 60  // Rebuild every 60 seconds

      On-demand ISR (recommended):
      revalidatePath('/products')    // Rebuild specific path
      revalidateTag('products')      // Rebuild all tagged fetches

      When to use:
      ─ E-commerce product pages
      ─ News articles
      ─ Content that changes occasionally
      ─ Any SSG page that needs periodic updates

42.6  Streaming SSR
      - Send HTML in progressive chunks
      - Users see content before ALL data is loaded
      - Uses HTTP streaming + React Suspense

      Traditional SSR: Wait for ALL data → send HTML
      Streaming SSR:  Send shell immediately → stream chunks

      Benefits:
      ✅ Better Time to First Byte (TTFB)
      ✅ Better Largest Contentful Paint (LCP)
      ✅ Users see content faster

42.7  Partial Prerendering (PPR) — Next.js 15
      - Experimental feature
      - Combines static shell + dynamic holes
      - Static parts: served instantly from CDN
      - Dynamic parts: stream in per request
      - No tradeoff between static and dynamic!

      export const experimental_ppr = true

42.8  When to Use Which Strategy — Decision Guide
      Is the page behind auth? (No SEO needed)
      → Yes: Use CSR or SSR
      → No: Continue...

      Does data change per request? (User-specific, real-time)
      → Yes: Use SSR
      → No: Continue...

      Does data change occasionally? (Products, blog posts)
      → Yes: Use ISR
      → No: Use SSG

42.9  SEO Implications
      CSR:  ❌ Bad SEO (empty HTML, JS-rendered content)
      SSR:  ✅ Great SEO (full HTML per request)
      SSG:  ✅ Best SEO (pre-built HTML, fastest)
      ISR:  ✅ Great SEO (pre-built + stays fresh)

42.10 Performance Trade-offs
      ┌──────────────────────────────────────────────────────────┐
      │ Strategy │ Server Load │ TTFB     │ Data Freshness      │
      ├──────────────────────────────────────────────────────────┤
      │ CSR      │ Very Low    │ Fastest  │ Always fresh        │
      │ SSR      │ High        │ Slow     │ Always fresh        │
      │ SSG      │ None        │ Fastest  │ Build time only     │
      │ ISR      │ Very Low    │ Fast     │ Periodic            │
      └──────────────────────────────────────────────────────────┘

42.11 Interview Questions
      Q: Explain SSR vs SSG vs ISR — when to use each?
      Q: What is the difference between ISR and SSR?
      Q: How does streaming improve performance?
      Q: What is Partial Prerendering?
      Q: How does Next.js decide whether to render statically or dynamically?
      Q: Can you use SSG with dynamic routes? How?
```

---

### **Chapter 43: Next.js API Routes & Route Handlers**

```
43.1  What Are Route Handlers?
      - API endpoints inside Next.js app
      - Replaces Express.js / separate backend for simple APIs
      - Located at: app/api/**/route.ts
      - Supports all HTTP methods

      app/api/users/route.ts         →  /api/users
      app/api/users/[id]/route.ts    →  /api/users/123
      app/api/products/route.ts      →  /api/products

43.2  Creating Route Handlers — Basic Syntax
      // app/api/users/route.ts

      import { NextRequest, NextResponse } from 'next/server'

      // GET /api/users
      export async function GET(request: NextRequest) {
        const users = await db.user.findMany()
        return NextResponse.json(users)
      }

      // POST /api/users
      export async function POST(request: NextRequest) {
        const body = await request.json()
        const user = await db.user.create({ data: body })
        return NextResponse.json(user, { status: 201 })
      }

      Supported exports: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

43.3  Request Object — NextRequest
      request.nextUrl.pathname     // '/api/users'
      request.nextUrl.searchParams // URLSearchParams
      request.method               // 'GET', 'POST', etc.
      request.headers              // Headers object
      request.cookies              // Cookies
      await request.json()         // Parse JSON body
      await request.formData()     // Parse form data
      await request.text()         // Raw text body
      await request.blob()         // Binary data

43.4  Response Object — NextResponse
      // JSON response
      NextResponse.json({ message: 'Success' })
      NextResponse.json({ error: 'Not Found' }, { status: 404 })

      // Redirect
      NextResponse.redirect(new URL('/login', request.url))

      // Rewrite
      NextResponse.rewrite(new URL('/new-path', request.url))

      // Set headers
      NextResponse.json(data, {
        headers: { 'Cache-Control': 'no-store' }
      })

      // Set cookies
      const response = NextResponse.json(data)
      response.cookies.set('token', 'value', { httpOnly: true })
      return response

43.5  Dynamic Route Handlers
      // app/api/users/[id]/route.ts

      export async function GET(
        request: NextRequest,
        { params }: { params: { id: string } }
      ) {
        const user = await db.user.findUnique({
          where: { id: params.id }
        })

        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          )
        }

        return NextResponse.json(user)
      }

      export async function PUT(
        request: NextRequest,
        { params }: { params: { id: string } }
      ) {
        const body = await request.json()
        const updated = await db.user.update({
          where: { id: params.id },
          data: body
        })
        return NextResponse.json(updated)
      }

      export async function DELETE(
        request: NextRequest,
        { params }: { params: { id: string } }
      ) {
        await db.user.delete({ where: { id: params.id } })
        return new NextResponse(null, { status: 204 })
      }

43.6  Query Parameters in Route Handlers
      // GET /api/products?category=electronics&sort=price
      export async function GET(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')
        const sort = searchParams.get('sort')

        const products = await db.product.findMany({
          where: category ? { category } : {},
          orderBy: sort ? { [sort]: 'asc' } : undefined
        })

        return NextResponse.json(products)
      }

43.7  Headers & Cookies in Route Handlers
      import { headers, cookies } from 'next/headers'

      export async function GET() {
        const headersList = headers()
        const authHeader = headersList.get('authorization')

        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value

        return NextResponse.json({ authHeader, token })
      }

43.8  Route Handler Caching
      // Cached by default (GET requests)
      export async function GET() {
        const data = await fetch('https://api.example.com/data')
        return NextResponse.json(await data.json())
      }

      // Opt out of caching
      export const dynamic = 'force-dynamic'
      // OR use request object (auto opts out)
      // OR use cookies/headers (auto opts out)

43.9  CORS in Route Handlers
      export async function OPTIONS(request: NextRequest) {
        return new NextResponse(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        })
      }

      export async function GET(request: NextRequest) {
        return NextResponse.json(data, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        })
      }

43.10 Streaming from Route Handlers
      export async function GET() {
        const stream = new ReadableStream({
          async start(controller) {
            for (const chunk of data) {
              controller.enqueue(chunk)
              await delay(100)
            }
            controller.close()
          }
        })
        return new Response(stream)
      }

43.11 Webhooks in Route Handlers
      // Receive webhooks from Stripe, GitHub, etc.
      export async function POST(request: NextRequest) {
        const body = await request.text()  // Raw body for signature verification
        const signature = request.headers.get('stripe-signature')!

        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(body, signature, secret)

        // Handle event
        if (event.type === 'payment_intent.succeeded') {
          await handlePayment(event.data.object)
        }

        return NextResponse.json({ received: true })
      }

43.12 Pages Router API Routes (Legacy — for Interviews)
      // pages/api/users.ts
      import type { NextApiRequest, NextApiResponse } from 'next'

      export default function handler(
        req: NextApiRequest,
        res: NextApiResponse
      ) {
        if (req.method === 'GET') {
          res.status(200).json({ users: [] })
        } else if (req.method === 'POST') {
          const body = req.body
          res.status(201).json({ created: body })
        } else {
          res.setHeader('Allow', ['GET', 'POST'])
          res.status(405).end('Method Not Allowed')
        }
      }

43.13 Route Handler vs Server Action — When to Use What
      ┌──────────────────────────────────────────────────────────┐
      │ Use Route Handler when:   │ Use Server Action when:      │
      ├──────────────────────────────────────────────────────────┤
      │ External access needed    │ Internal app mutations       │
      │ Webhooks                  │ Form submissions             │
      │ Third-party integrations  │ CRUD from components         │
      │ Custom headers/CORS       │ Simpler syntax preferred     │
      │ Streaming responses       │ Progressive enhancement      │
      │ Non-Next.js clients       │ Works without JS on client   │
      └──────────────────────────────────────────────────────────┘

43.14 Interview Questions
      Q: What is a Route Handler in Next.js App Router?
      Q: How do you handle different HTTP methods in route.ts?
      Q: How do you access query parameters in Route Handlers?
      Q: How do you implement CORS in Next.js?
      Q: When would you use Route Handler vs Server Action?
      Q: How do you verify webhook signatures in Next.js?
```

---

### **Chapter 44: Server Actions & Mutations**

```
44.1  What Are Server Actions?
      - Async functions that run ONLY on the server
      - Called directly from Client Components
      - No API route needed for mutations
      - 'use server' directive marks them

      Benefits:
      ✅ No separate API endpoint needed
      ✅ Progressive enhancement (works without JS)
      ✅ Type-safe (same TypeScript types)
      ✅ Automatic serialization
      ✅ Works with forms natively

44.2  Creating Server Actions
      Method 1: Inline in Server Component
      // app/page.tsx (Server Component)
      export default function Page() {
        async function createUser(formData: FormData) {
          'use server'  // marks this as Server Action
          const name = formData.get('name') as string
          await db.user.create({ data: { name } })
        }

        return (
          <form action={createUser}>
            <input name="name" />
            <button type="submit">Create</button>
          </form>
        )
      }

      Method 2: Separate actions file (recommended)
      // lib/actions.ts
      'use server'  // ALL exports in this file are Server Actions

      export async function createUser(formData: FormData) {
        const name = formData.get('name') as string
        await db.user.create({ data: { name } })
      }

      export async function deleteUser(id: string) {
        await db.user.delete({ where: { id } })
      }

44.3  Using Server Actions in Forms
      // Client Component using Server Action
      'use client'
      import { createUser } from '@/lib/actions'

      export default function CreateUserForm() {
        return (
          <form action={createUser}>
            <input name="name" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <button type="submit">Create User</button>
          </form>
        )
      }

      // Progressive enhancement:
      // Works even without JavaScript enabled!

44.4  useFormStatus — Pending State
      'use client'
      import { useFormStatus } from 'react-dom'

      function SubmitButton() {
        const { pending } = useFormStatus()

        return (
          <button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save'}
          </button>
        )
      }

      // SubmitButton MUST be inside the <form> element
      // Cannot be in same component as the form

44.5  useActionState (React 19 / Next.js 15)
      - Manage form state + server action response
      - Replaces useFormState from react-dom

      'use client'
      import { useActionState } from 'react'
      import { createUser } from '@/lib/actions'

      export default function Form() {
        const [state, formAction, isPending] = useActionState(
          createUser,
          { error: null, success: false }  // initial state
        )

        return (
          <form action={formAction}>
            {state.error && <p>{state.error}</p>}
            {state.success && <p>Created!</p>}
            <input name="name" />
            <button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </button>
          </form>
        )
      }

      // Server Action must return state:
      export async function createUser(prevState: any, formData: FormData) {
        'use server'
        try {
          await db.user.create({ data: { name: formData.get('name') } })
          return { error: null, success: true }
        } catch (e) {
          return { error: 'Failed to create user', success: false }
        }
      }

44.6  Validation in Server Actions
      import { z } from 'zod'

      const schema = z.object({
        name: z.string().min(2, 'Name too short'),
        email: z.string().email('Invalid email'),
      })

      export async function createUser(prevState: any, formData: FormData) {
        'use server'

        const result = schema.safeParse({
          name: formData.get('name'),
          email: formData.get('email'),
        })

        if (!result.success) {
          return {
            errors: result.error.flatten().fieldErrors,
            success: false
          }
        }

        await db.user.create({ data: result.data })
        return { errors: null, success: true }
      }

44.7  Calling Server Actions Without Forms
      'use client'
      import { deleteUser } from '@/lib/actions'

      export default function UserRow({ user }) {
        return (
          <div>
            <span>{user.name}</span>
            {/* Call Server Action directly as event handler */}
            <button onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        )
      }

      // Server Action can accept any arguments when called directly
      export async function deleteUser(id: string) {
        'use server'
        await db.user.delete({ where: { id } })
      }

44.8  Revalidating Data After Mutations
      import { revalidatePath, revalidateTag } from 'next/cache'
      import { redirect } from 'next/navigation'

      export async function createPost(formData: FormData) {
        'use server'
        const post = await db.post.create({
          data: { title: formData.get('title') }
        })

        // Revalidate the posts list page
        revalidatePath('/blog')

        // Or revalidate by tag
        revalidateTag('posts')

        // Redirect to new post
        redirect(`/blog/${post.slug}`)
      }

44.9  useOptimistic — Optimistic Updates
      'use client'
      import { useOptimistic } from 'react'
      import { toggleLike } from '@/lib/actions'

      export default function LikeButton({ post }) {
        const [optimisticLiked, setOptimisticLiked] = useOptimistic(
          post.liked,
          (currentState) => !currentState  // Optimistic update function
        )

        async function handleLike() {
          setOptimisticLiked(optimisticLiked)  // Instant UI update
          await toggleLike(post.id)             // Actual server call
        }

        return (
          <button onClick={handleLike}>
            {optimisticLiked ? '❤️ Liked' : '🤍 Like'}
          </button>
        )
      }

44.10 Authentication in Server Actions
      import { getServerSession } from 'next-auth'

      export async function deletePost(id: string) {
        'use server'

        // ALWAYS authenticate in Server Actions
        const session = await getServerSession()
        if (!session) throw new Error('Unauthorized')

        // ALWAYS authorize (check ownership)
        const post = await db.post.findUnique({ where: { id } })
        if (post?.authorId !== session.user.id) {
          throw new Error('Forbidden')
        }

        await db.post.delete({ where: { id } })
        revalidatePath('/blog')
      }

44.11 Error Handling in Server Actions
      export async function createUser(prevState: any, formData: FormData) {
        'use server'
        try {
          await db.user.create({ data: parseFormData(formData) })
          return { success: true, error: null }
        } catch (error) {
          if (error instanceof z.ZodError) {
            return { success: false, error: 'Validation failed' }
          }
          return { success: false, error: 'Something went wrong' }
        }
      }

      // Note: thrown errors bubble up to nearest error.tsx

44.12 Interview Questions
      Q: What are Server Actions?
      Q: How do Server Actions differ from Route Handlers?
      Q: What is useFormStatus and where must it be used?
      Q: How do you handle validation in Server Actions?
      Q: What is useOptimistic and when would you use it?
      Q: How do you revalidate data after a Server Action?
      Q: Can Server Actions be called without a form?
      Q: How do you authenticate requests in Server Actions?
```

---

### **Chapter 45: Next.js Authentication & Authorization**

```
45.1  Authentication vs Authorization
      Authentication: "Who are you?" (identity verification)
      Authorization:  "What can you do?" (permission checking)

      Auth Flow:
      User → Login → Verify credentials → Create session →
      Store session → Check session on protected routes

45.2  Authentication Options in Next.js
      ┌──────────────────────────────────────────────────────────┐
      │ Option          │ Best For              │ Complexity     │
      ├──────────────────────────────────────────────────────────┤
      │ NextAuth.js     │ Most projects         │ Medium         │
      │ Clerk           │ Fast setup, paid      │ Low            │
      │ Supabase Auth   │ Supabase users        │ Low            │
      │ Custom JWT      │ Full control          │ High           │
      │ Auth0           │ Enterprise            │ Medium         │
      └──────────────────────────────────────────────────────────┘

45.3  NextAuth.js (Auth.js) — Setup
      npm install next-auth

      // app/api/auth/[...nextauth]/route.ts
      import NextAuth from 'next-auth'
      import { authOptions } from '@/lib/auth'

      const handler = NextAuth(authOptions)
      export { handler as GET, handler as POST }

      // lib/auth.ts
      import { NextAuthOptions } from 'next-auth'
      import GoogleProvider from 'next-auth/providers/google'
      import GitHubProvider from 'next-auth/providers/github'
      import CredentialsProvider from 'next-auth/providers/credentials'

      export const authOptions: NextAuthOptions = {
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
          }),
          CredentialsProvider({
            name: 'credentials',
            credentials: {
              email: { label: 'Email', type: 'email' },
              password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
              const user = await getUserByEmail(credentials.email)
              if (!user) return null
              const valid = await bcrypt.compare(credentials.password, user.password)
              if (!valid) return null
              return user
            }
          })
        ],
        session: { strategy: 'jwt' },
        callbacks: {
          async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
          },
          async session({ session, token }) {
            session.user.role = token.role
            return session
          }
        },
        pages: {
          signIn: '/login',    // Custom login page
          error: '/auth/error'
        }
      }

45.4  Using Session — Server vs Client
      // Server Component:
      import { getServerSession } from 'next-auth'
      import { authOptions } from '@/lib/auth'

      export default async function ProfilePage() {
        const session = await getServerSession(authOptions)
        if (!session) redirect('/login')
        return <h1>Hello {session.user.name}</h1>
      }

      // Client Component:
      'use client'
      import { useSession, signIn, signOut } from 'next-auth/react'

      export default function AuthButton() {
        const { data: session, status } = useSession()

        if (status === 'loading') return <p>Loading...</p>
        if (session) {
          return <button onClick={() => signOut()}>Sign Out</button>
        }
        return <button onClick={() => signIn('google')}>Sign In with Google</button>
      }

45.5  SessionProvider Setup
      // app/providers.tsx
      'use client'
      import { SessionProvider } from 'next-auth/react'

      export function Providers({ children }) {
        return <SessionProvider>{children}</SessionProvider>
      }

      // app/layout.tsx
      import { Providers } from './providers'
      export default function RootLayout({ children }) {
        return (
          <html><body>
            <Providers>{children}</Providers>
          </body></html>
        )
      }

45.6  Protecting Routes with Middleware
      // middleware.ts
      import { withAuth } from 'next-auth/middleware'
      import { NextResponse } from 'next/server'

      export default withAuth(
        function middleware(req) {
          // Additional middleware logic
          const token = req.nextauth.token
          const isAdmin = token?.role === 'admin'

          if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
          }
        },
        {
          callbacks: {
            authorized: ({ token }) => !!token  // Must have token
          }
        }
      )

      export const config = {
        matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*']
      }

45.7  Custom JWT Authentication (Without NextAuth)
      // Step 1: Login → Create JWT
      export async function POST(request: NextRequest) {
        const { email, password } = await request.json()

        const user = await validateUser(email, password)
        if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: '7d' }
        )

        const response = NextResponse.json({ success: true })
        response.cookies.set('token', token, {
          httpOnly: true,     // JS cannot read (XSS protection)
          secure: true,       // HTTPS only
          sameSite: 'lax',    // CSRF protection
          maxAge: 60 * 60 * 24 * 7  // 7 days
        })
        return response
      }

      // Step 2: Verify JWT in middleware
      export function middleware(request: NextRequest) {
        const token = request.cookies.get('token')?.value

        if (!token) {
          return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
          jwt.verify(token, process.env.JWT_SECRET!)
          return NextResponse.next()
        } catch {
          return NextResponse.redirect(new URL('/login', request.url))
        }
      }

45.8  Role-Based Access Control (RBAC)
      // Define roles
      type Role = 'user' | 'admin' | 'moderator'

      // Middleware-based RBAC
      export default withAuth(
        function middleware(req) {
          const role = req.nextauth.token?.role as Role

          const adminRoutes = ['/admin']
          const modRoutes = ['/moderate']

          if (adminRoutes.some(r => req.nextUrl.pathname.startsWith(r))) {
            if (role !== 'admin') return NextResponse.redirect('/unauthorized')
          }

          if (modRoutes.some(r => req.nextUrl.pathname.startsWith(r))) {
            if (!['admin', 'moderator'].includes(role)) {
              return NextResponse.redirect('/unauthorized')
            }
          }
        }
      )

      // Component-level RBAC
      export default async function AdminPage() {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'admin') {
          redirect('/unauthorized')
        }

        return <AdminDashboard />
      }

45.9  Protecting API Routes / Route Handlers
      import { getServerSession } from 'next-auth'

      export async function GET(request: NextRequest) {
        const session = await getServerSession(authOptions)

        if (!session) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await db.user.findMany()
        return NextResponse.json(data)
      }

45.10 OAuth — Google & GitHub Setup
      Google OAuth Setup:
      1. Go to console.cloud.google.com
      2. Create project → Enable Google OAuth API
      3. Create credentials → OAuth Client ID
      4. Add authorized redirect URI:
         http://localhost:3000/api/auth/callback/google
      5. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env

      GitHub OAuth Setup:
      1. Go to GitHub → Settings → Developer Settings
      2. OAuth Apps → New OAuth App
      3. Callback URL: http://localhost:3000/api/auth/callback/github
      4. Add GITHUB_ID and GITHUB_SECRET to .env

45.11 Clerk — Alternative to NextAuth (Simpler Setup)
      npm install @clerk/nextjs

      // middleware.ts
      import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

      const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

      export default clerkMiddleware((auth, req) => {
        if (isProtectedRoute(req)) auth().protect()
      })

      // app/layout.tsx
      import { ClerkProvider } from '@clerk/nextjs'
      export default function Layout({ children }) {
        return <ClerkProvider>{children}</ClerkProvider>
      }

      // Use in components:
      import { useUser, SignIn, SignOutButton } from '@clerk/nextjs'

45.12 Security Best Practices
      ─ Always validate session server-side (don't trust client)
      ─ Use httpOnly cookies (not localStorage) for tokens
      ─ Implement CSRF protection (NextAuth handles this)
      ─ Rate limit login endpoints
      ─ Hash passwords with bcrypt (never store plain text)
      ─ Use HTTPS in production
      ─ Validate and sanitize all inputs
      ─ Never expose sensitive data in client components

45.13 Interview Questions
      Q: How does NextAuth.js work in Next.js App Router?
      Q: What is the difference between session strategy 'jwt' and 'database'?
      Q: How do you protect routes in Next.js?
      Q: How do you implement RBAC in Next.js?
      Q: Where should you store JWT tokens? (httpOnly cookies, NOT localStorage)
      Q: How do you access the session in a Server Component?
      Q: What is OAuth and how does it work?
      Q: How do you protect API routes in Next.js?
```

---

### **Chapter 46: Styling & UI in Next.js**

```
46.1  CSS Modules — Built-in Scoped Styling
      File: Component.module.css
      Import: import styles from './Component.module.css'
      Use: className={styles.container}

      - Auto-generates unique class names
      - No style conflicts between components
      - Works in Server and Client Components
      - Full CSS support (media queries, pseudo-classes)

      Combining with global:
      className={`${styles.button} global-class`}

      Dynamic:
      className={`${styles.button} ${isActive ? styles.active : ''}`}

46.2  Global CSS
      // app/globals.css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;

      /* Your global styles */
      :root {
        --primary: #3b82f6;
      }

      // Import in root layout only:
      // app/layout.tsx
      import './globals.css'

46.3  Tailwind CSS with Next.js — Full Setup
      Comes pre-configured with create-next-app!

      // tailwind.config.ts
      import type { Config } from 'tailwindcss'
      const config: Config = {
        content: [
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            colors: { brand: '#3b82f6' }
          }
        }
      }
      export default config

      Useful Tailwind utilities in Next.js:
      ─ dark: prefix for dark mode
      ─ responsive prefixes (sm:, md:, lg:)
      ─ group, peer for interactive styling
      ─ @apply for reusable classes

      clsx for conditional classes:
      import clsx from 'clsx'
      className={clsx('base-class', {
        'active-class': isActive,
        'disabled-class': isDisabled
      })}

      tailwind-merge for conflicting classes:
      import { twMerge } from 'tailwind-merge'
      className={twMerge('p-4 p-8')}  // → 'p-8' (last wins)

46.4  shadcn/ui — Component Library for Next.js
      - Not a package — copies components into your project
      - Built on Radix UI primitives (accessible)
      - Styled with Tailwind CSS
      - Fully customizable

      npx shadcn-ui@latest init
      npx shadcn-ui@latest add button
      npx shadcn-ui@latest add dialog
      npx shadcn-ui@latest add form

      import { Button } from '@/components/ui/button'
      <Button variant="outline" size="sm">Click me</Button>

46.5  next/image — Image Optimization
      import Image from 'next/image'

      // Fixed size:
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
      />

      // Fill parent container:
      <div style={{ position: 'relative', height: '400px' }}>
        <Image
          src="/hero.jpg"
          alt="Hero"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      // Remote images (configure in next.config.js):
      images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'images.unsplash.com'
        }]
      }

      Key props:
      priority        // Preload LCP image (above fold)
      placeholder="blur" // Blur-up effect while loading
      blurDataURL     // Base64 for blur placeholder
      sizes           // Responsive size hints
      quality={75}    // Compression quality

      Benefits:
      ✅ Auto WebP/AVIF conversion
      ✅ Responsive sizes automatically
      ✅ Lazy loading by default
      ✅ Prevents layout shift (CLS)
      ✅ Served via CDN

46.6  next/font — Font Optimization
      import { Inter, Roboto_Mono } from 'next/font/google'

      const inter = Inter({
        subsets: ['latin'],
        display: 'swap',
        variable: '--font-inter'
      })

      const robotoMono = Roboto_Mono({
        subsets: ['latin'],
        variable: '--font-roboto-mono'
      })

      // In layout.tsx:
      <html className={`${inter.variable} ${robotoMono.variable}`}>

      Local fonts:
      import localFont from 'next/font/local'
      const myFont = localFont({
        src: './fonts/MyFont.woff2',
        variable: '--font-my-font'
      })

      Benefits:
      ✅ Zero layout shift (size reserved before font loads)
      ✅ Self-hosted (no external requests)
      ✅ Automatic font subsetting
      ✅ Privacy (no Google tracking)

46.7  next/link & next/script
      next/link (reviewed in routing chapter):
      - Client-side navigation
      - Automatic prefetching
      - No full page reload

      next/script — Third-party Script Optimization:
      import Script from 'next/script'

      // Load strategies:
      <Script src="..." strategy="beforeInteractive" /> // Before page hydration
      <Script src="..." strategy="afterInteractive" />  // After hydration (default)
      <Script src="..." strategy="lazyOnload" />        // During idle time
      <Script src="..." strategy="worker" />            // Web worker (experimental)

      // With callbacks:
      <Script
        src="https://analytics.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Analytics loaded')}
      />

46.8  Dark Mode with next-themes
      npm install next-themes

      // app/providers.tsx
      'use client'
      import { ThemeProvider } from 'next-themes'

      export function Providers({ children }) {
        return (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        )
      }

      // Theme toggle component:
      'use client'
      import { useTheme } from 'next-themes'

      export function ThemeToggle() {
        const { theme, setTheme } = useTheme()
        return (
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        )
      }

      Tailwind dark mode:
      // tailwind.config.ts
      darkMode: 'class'

      // Usage:
      className="bg-white dark:bg-gray-900 text-black dark:text-white"

46.9  Responsive Design in Next.js
      // Tailwind responsive prefixes:
      <div className="
        w-full           // Mobile (default)
        md:w-1/2         // Tablet (768px+)
        lg:w-1/3         // Desktop (1024px+)
        xl:w-1/4         // Large desktop (1280px+)
      ">

      // next/image sizes for responsive images:
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
      />

46.10 Interview Questions
      Q: What does next/image do that regular <img> doesn't?
      Q: How does next/font prevent layout shift?
      Q: What are the loading strategies for next/script?
      Q: How do you implement dark mode in Next.js?
      Q: What is CSS Modules and how does it prevent conflicts?
      Q: Why use shadcn/ui over other component libraries?
```

---

### **Chapter 47: Next.js Performance & SEO**

```
47.1  Metadata API — SEO Tags
      // Static metadata (Server Component or layout/page)
      import type { Metadata } from 'next'

      export const metadata: Metadata = {
        title: 'My App',
        description: 'Description of my app',
        keywords: ['next.js', 'react'],
        authors: [{ name: 'John Doe' }],
        creator: 'John Doe',
        openGraph: {
          title: 'My App',
          description: 'OG description',
          url: 'https://myapp.com',
          siteName: 'My App',
          images: [{
            url: 'https://myapp.com/og.png',
            width: 1200,
            height: 630,
          }],
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: 'My App',
          description: 'Twitter description',
          images: ['https://myapp.com/og.png'],
          creator: '@handle',
        },
        robots: {
          index: true,
          follow: true,
        },
        canonical: 'https://myapp.com/page',
      }

      // Dynamic metadata (for pages with dynamic data):
      export async function generateMetadata({
        params
      }: {
        params: { slug: string }
      }): Promise<Metadata> {
        const post = await getPost(params.slug)
        return {
          title: post.title,
          description: post.excerpt,
          openGraph: {
            title: post.title,
            images: [post.coverImage],
          }
        }
      }

47.2  Title Templates
      // app/layout.tsx — root template
      export const metadata: Metadata = {
        title: {
          template: '%s | My Company',
          default: 'My Company',
        }
      }

      // app/about/page.tsx — just the page title
      export const metadata: Metadata = {
        title: 'About Us',
        // Renders as: "About Us | My Company"
      }

47.3  Dynamic OG Images
      // app/blog/[slug]/opengraph-image.tsx
      import { ImageResponse } from 'next/og'

      export default async function OGImage({
        params
      }: {
        params: { slug: string }
      }) {
        const post = await getPost(params.slug)

        return new ImageResponse(
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#1a1a2e',
            padding: '80px',
            alignItems: 'center',
          }}>
            <h1 style={{ color: 'white', fontSize: 64 }}>
              {post.title}
            </h1>
          </div>,
          { width: 1200, height: 630 }
        )
      }

47.4  Sitemap Generation
      // app/sitemap.ts
      import { MetadataRoute } from 'next'

      export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
        const posts = await getAllPosts()

        const postUrls = posts.map(post => ({
          url: `https://mysite.com/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))

        return [
          {
            url: 'https://mysite.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
          },
          {
            url: 'https://mysite.com/about',
            changeFrequency: 'monthly',
            priority: 0.8,
          },
          ...postUrls,
        ]
      }

47.5  Robots.txt
      // app/robots.ts
      import { MetadataRoute } from 'next'

      export default function robots(): MetadataRoute.Robots {
        return {
          rules: [
            {
              userAgent: '*',
              allow: '/',
              disallow: ['/admin/', '/api/'],
            },
          ],
          sitemap: 'https://mysite.com/sitemap.xml',
        }
      }

47.6  Core Web Vitals
      LCP — Largest Contentful Paint (< 2.5s)
      Measure: Time until largest image/text visible
      Improve with:
      ─ priority prop on above-fold images
      ─ Preload fonts (next/font)
      ─ SSG/ISR for fast initial HTML
      ─ CDN for static assets

      FID/INP — First Input Delay / Interaction to Next Paint (< 200ms)
      Measure: Time between user interaction and response
      Improve with:
      ─ Code splitting (lazy load heavy components)
      ─ useTransition for non-urgent updates
      ─ Avoid blocking main thread

      CLS — Cumulative Layout Shift (< 0.1)
      Measure: Unexpected layout movement
      Improve with:
      ─ Always set width/height on images
      ─ next/image (prevents CLS automatically)
      ─ next/font (reserves font space)
      ─ Reserve space for dynamic content

47.7  Bundle Analysis
      npm install @next/bundle-analyzer

      // next.config.js
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
      module.exports = withBundleAnalyzer(nextConfig)

      // Run:
      ANALYZE=true npm run build

      What to look for:
      ─ Large node_modules in client bundle
      ─ Duplicate packages
      ─ Unnecessary client-side code
      ─ Libraries that should be server-only

47.8  Lazy Loading in Next.js
      import dynamic from 'next/dynamic'

      // Dynamic import (code splitting)
      const HeavyComponent = dynamic(() => import('./HeavyComponent'))

      // With loading state
      const Chart = dynamic(
        () => import('./Chart'),
        { loading: () => <p>Loading chart...</p> }
      )

      // Disable SSR (client-only component)
      const MapComponent = dynamic(
        () => import('./Map'),
        { ssr: false }  // Won't render on server
      )

      // Named export
      const { Tooltip } = dynamic(
        () => import('./UI').then(mod => ({ default: mod.Tooltip }))
      )

47.9  Caching Strategies for Performance
      Static pages (SSG):
      → Served from CDN, fastest possible
      → Cache-Control: public, max-age=31536000, immutable

      ISR pages:
      → CDN caches, background revalidation
      → Cache-Control: s-maxage=60, stale-while-revalidate

      Dynamic pages (SSR):
      → No caching (per request)
      → Cache-Control: no-store

      Client-side caching:
      → React Query / SWR for data
      → Router cache (Next.js built-in)

47.10 Edge Runtime
      - Run routes at CDN edge (near users)
      - Faster TTFB (Time to First Byte)
      - Limited Node.js APIs available

      // app/api/route.ts
      export const runtime = 'edge'

      // Works great for:
      ─ Middleware
      ─ Simple API routes
      ─ Auth checks
      ─ A/B testing

      // Doesn't support:
      ─ Native Node.js modules
      ─ File system access
      ─ Many npm packages

47.11 Vercel Analytics & Speed Insights
      npm install @vercel/analytics @vercel/speed-insights

      // app/layout.tsx
      import { Analytics } from '@vercel/analytics/react'
      import { SpeedInsights } from '@vercel/speed-insights/next'

      export default function RootLayout({ children }) {
        return (
          <html>
            <body>
              {children}
              <Analytics />
              <SpeedInsights />
            </body>
          </html>
        )
      }

47.12 Interview Questions
      Q: What are Core Web Vitals and how does Next.js improve them?
      Q: How do you generate a sitemap in Next.js App Router?
      Q: What is the Metadata API?
      Q: How does next/image improve performance?
      Q: What is the Edge Runtime?
      Q: How do you analyze your Next.js bundle?
      Q: What is dynamic import and when would you use it?
      Q: How does Next.js handle font optimization?
```

---

### **Chapter 48: Next.js Advanced Concepts**

```
48.1  Middleware Deep Dive
      // middleware.ts (root of project)
      import { NextResponse } from 'next/server'
      import type { NextRequest } from 'next/server'

      export function middleware(request: NextRequest) {
        const { pathname } = request.nextUrl

        // 1. Auth check
        const token = request.cookies.get('token')?.value
        if (pathname.startsWith('/dashboard') && !token) {
          return NextResponse.redirect(new URL('/login', request.url))
        }

        // 2. Geolocation-based redirect
        const country = request.geo?.country
        if (country === 'CN' && !pathname.startsWith('/cn')) {
          return NextResponse.redirect(new URL('/cn', request.url))
        }

        // 3. Add custom headers
        const response = NextResponse.next()
        response.headers.set('x-custom-header', 'value')
        return response

        // 4. Rewrite (serve different content same URL)
        // return NextResponse.rewrite(new URL('/new-path', request.url))
      }

      export const config = {
        matcher: [
          '/dashboard/:path*',
          '/((?!api|_next/static|_next/image|favicon.ico).*)',
        ]
      }

      Middleware runs:
      ─ On the Edge Runtime (fast)
      ─ Before cache is checked
      ─ Before route matching

48.2  Internationalization (i18n)
      Option 1: next-intl (recommended)
      npm install next-intl

      Structure:
      messages/
      ├── en.json
      ├── fr.json
      └── de.json

      // i18n.ts
      import { getRequestConfig } from 'next-intl/server'

      export default getRequestConfig(async ({ locale }) => ({
        messages: (await import(`./messages/${locale}.json`)).default
      }))

      // middleware.ts
      import createMiddleware from 'next-intl/middleware'
      export default createMiddleware({
        locales: ['en', 'fr', 'de'],
        defaultLocale: 'en'
      })

      // app/[locale]/layout.tsx
      // app/[locale]/page.tsx
      import { useTranslations } from 'next-intl'

      export default function Page() {
        const t = useTranslations('HomePage')
        return <h1>{t('title')}</h1>
      }

48.3  Database Integration with Prisma
      npm install prisma @prisma/client
      npx prisma init

      // prisma/schema.prisma
      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model User {
        id        String   @id @default(cuid())
        email     String   @unique
        name      String?
        posts     Post[]
        createdAt DateTime @default(now())
      }

      model Post {
        id        String   @id @default(cuid())
        title     String
        content   String?
        published Boolean  @default(false)
        author    User     @relation(fields: [authorId], references: [id])
        authorId  String
      }

      // lib/db.ts (Singleton pattern for Next.js)
      import { PrismaClient } from '@prisma/client'

      const globalForPrisma = globalThis as unknown as {
        prisma: PrismaClient | undefined
      }

      export const db = globalForPrisma.prisma ?? new PrismaClient()

      if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = db
      }

      // Usage in Server Component:
      import { db } from '@/lib/db'

      export default async function UsersPage() {
        const users = await db.user.findMany({
          include: { posts: true }
        })
        return <UserList users={users} />
      }

48.4  Drizzle ORM — Alternative to Prisma
      npm install drizzle-orm drizzle-kit @libsql/client

      // db/schema.ts
      import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

      export const users = sqliteTable('users', {
        id: text('id').primaryKey(),
        name: text('name').notNull(),
        email: text('email').unique().notNull(),
      })

      // db/index.ts
      import { drizzle } from 'drizzle-orm/libsql'
      export const db = drizzle(client)

      // Usage:
      const users = await db.select().from(users)

48.5  File Uploads in Next.js
      Method 1: Direct to Route Handler
      // app/api/upload/route.ts
      export async function POST(request: NextRequest) {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save to disk or cloud storage
        await fs.writeFile(`./public/uploads/${file.name}`, buffer)
        return NextResponse.json({ url: `/uploads/${file.name}` })
      }

      Method 2: Vercel Blob
      npm install @vercel/blob

      import { put } from '@vercel/blob'

      export async function POST(request: NextRequest) {
        const formData = await request.formData()
        const file = formData.get('file') as File

        const blob = await put(file.name, file, { access: 'public' })
        return NextResponse.json({ url: blob.url })
      }

      Method 3: Uploadthing (recommended)
      npm install uploadthing @uploadthing/react

48.6  WebSockets with Next.js
      Next.js itself doesn't support WebSockets natively.
      Options:

      Option 1: Separate WebSocket server
      Option 2: Pusher (hosted WebSocket service)
      Option 3: Socket.io with custom Node.js server
      Option 4: Supabase Realtime / Ably / PartyKit

      // With Pusher:
      // Server (push events):
      import Pusher from 'pusher'
      const pusher = new Pusher({ ... })
      await pusher.trigger('chat', 'message', { text: 'Hello' })

      // Client (subscribe):
      'use client'
      import Pusher from 'pusher-js'
      const pusher = new Pusher(key, { cluster })
      const channel = pusher.subscribe('chat')
      channel.bind('message', (data) => setMessages(prev => [...prev, data]))

48.7  Email Sending
      With Resend (recommended):
      npm install resend

      // lib/email.ts
      import { Resend } from 'resend'
      const resend = new Resend(process.env.RESEND_API_KEY)

      export async function sendWelcomeEmail(to: string, name: string) {
        await resend.emails.send({
          from: 'hello@myapp.com',
          to,
          subject: 'Welcome to My App!',
          react: <WelcomeEmail name={name} />,  // React email template!
        })
      }

      // React Email templates:
      npm install @react-email/components react-email

48.8  Payment Integration — Stripe
      npm install stripe @stripe/stripe-js

      // lib/stripe.ts
      import Stripe from 'stripe'
      export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

      // Create checkout session:
      export async function POST(request: NextRequest) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{ price: 'price_xxx', quantity: 1 }],
          mode: 'payment',
          success_url: `${process.env.URL}/success`,
          cancel_url: `${process.env.URL}/cancel`,
        })
        return NextResponse.json({ url: session.url })
      }

      // Webhook to handle payment events:
      export async function POST(request: NextRequest) {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')!
        const event = stripe.webhooks.constructEvent(body, signature, secret)

        if (event.type === 'checkout.session.completed') {
          await fulfillOrder(event.data.object)
        }
        return NextResponse.json({ received: true })
      }

48.9  Cron Jobs / Scheduled Tasks
      With Vercel Cron:
      // vercel.json
      {
        "crons": [{
          "path": "/api/cron/cleanup",
          "schedule": "0 0 * * *"  // Daily at midnight
        }]
      }

      // app/api/cron/cleanup/route.ts
      export async function GET(request: NextRequest) {
        // Verify it's from Vercel Cron
        const authHeader = request.headers.get('authorization')
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await cleanupOldData()
        return NextResponse.json({ success: true })
      }

48.10 Multi-Tenancy Patterns
      Subdomain-based: tenant.myapp.com
      Path-based: myapp.com/tenant

      // middleware.ts — subdomain routing
      export function middleware(request: NextRequest) {
        const hostname = request.headers.get('host')!
        const subdomain = hostname.split('.')[0]

        if (subdomain !== 'www' && subdomain !== 'myapp') {
          return NextResponse.rewrite(
            new URL(`/tenants/${subdomain}${request.nextUrl.pathname}`, request.url)
          )
        }
      }

48.11 Testing Next.js Apps
      Unit testing (Server/Client components):
      npm install --save-dev @testing-library/react jest jest-environment-jsdom

      E2E testing with Playwright:
      npx playwright install

      // e2e/home.spec.ts
      import { test, expect } from '@playwright/test'

      test('home page loads', async ({ page }) => {
        await page.goto('/')
        await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
      })

      test('user can log in', async ({ page }) => {
        await page.goto('/login')
        await page.fill('[name=email]', 'test@example.com')
        await page.fill('[name=password]', 'password123')
        await page.click('[type=submit]')
        await expect(page).toHaveURL('/dashboard')
      })

48.12 Interview Questions
      Q: How do you add i18n to a Next.js app?
      Q: What is the Prisma singleton pattern and why is it needed?
      Q: How do you handle WebSockets in Next.js?
      Q: How do you implement Stripe payments in Next.js?
      Q: How do you set up cron jobs in Next.js?
      Q: Explain multi-tenancy patterns in Next.js.
```

---

### **Chapter 49: Next.js Deployment**

```
49.1  Building for Production
      npm run build
      
      What happens:
      ─ Compiles TypeScript
      ─ Runs ESLint
      ─ Generates static pages (SSG)
      ─ Creates optimized bundles
      ─ Analyzes page sizes

      Build output shows:
      ○ Static  (pre-rendered)
      ● Dynamic (server-rendered)
      ƒ Function (edge/serverless)

      npm run start  → Starts production server locally

49.2  Environment Variables
      .env.local          → Never commit! (local dev secrets)
      .env.development    → Dev environment
      .env.production     → Production (commit public values only)
      .env                → All environments

      Public (exposed to browser):
      NEXT_PUBLIC_API_URL=https://api.example.com

      Private (server-only):
      DATABASE_URL=postgresql://...
      SECRET_KEY=my-secret

      // Accessing:
      process.env.DATABASE_URL         // Server only
      process.env.NEXT_PUBLIC_API_URL  // Available anywhere

      // Type-safe env with @t3-oss/env-nextjs:
      npm install @t3-oss/env-nextjs zod

49.3  Deploying to Vercel (Recommended)
      Method 1: Vercel CLI
      npm install -g vercel
      vercel       // Deploy preview
      vercel --prod // Deploy to production

      Method 2: GitHub Integration
      1. Push to GitHub
      2. Import project in Vercel dashboard
      3. Set environment variables
      4. Deploy!

      Features Vercel provides:
      ─ Automatic preview deployments per PR
      ─ Edge Network (CDN)
      ─ Analytics
      ─ Speed Insights
      ─ Serverless Functions
      ─ Edge Functions
      ─ ISR support out of box
      ─ Domain management

49.4  Deploying with Docker
      # Dockerfile
      FROM node:18-alpine AS base

      # Install dependencies
      FROM base AS deps
      WORKDIR /app
      COPY package.json package-lock.json ./
      RUN npm ci

      # Build
      FROM base AS builder
      WORKDIR /app
      COPY --from=deps /app/node_modules ./node_modules
      COPY . .
      RUN npm run build

      # Production
      FROM base AS runner
      WORKDIR /app
      ENV NODE_ENV production

      RUN addgroup --system --gid 1001 nodejs
      RUN adduser --system --uid 1001 nextjs

      COPY --from=builder /app/public ./public
      COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
      COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

      USER nextjs
      EXPOSE 3000
      CMD ["node", "server.js"]

      # next.config.js — required for Docker
      const nextConfig = {
        output: 'standalone'  // Creates minimal server
      }

      # docker-compose.yml
      version: '3'
      services:
        app:
          build: .
          ports:
            - "3000:3000"
          environment:
            - DATABASE_URL=${DATABASE_URL}

49.5  Deploying to AWS
      Option 1: AWS Amplify
      1. Connect GitHub repo
      2. Set build settings
      3. Add environment variables
      4. Deploy

      Option 2: EC2 with PM2
      ssh into server
      git clone your-repo
      npm install && npm run build
      npm install -g pm2
      pm2 start npm -- start
      pm2 save && pm2 startup

      Option 3: AWS Lambda (via SST)
      npm create sst@latest
      npx sst deploy --stage production

      Option 4: ECS/Fargate (Docker)
      Build Docker image
      Push to ECR
      Deploy to ECS cluster

49.6  Deploying to Netlify
      netlify.toml:
      [build]
        command = "npm run build"
        publish = ".next"

      [[plugins]]
        package = "@netlify/plugin-nextjs"

      Note: Some Next.js features have limited support on Netlify

49.7  Static Export (No Server Needed)
      // next.config.js
      const nextConfig = {
        output: 'export',           // Generate static HTML/CSS/JS
        trailingSlash: true,        // Optional
        images: { unoptimized: true } // Required for static export
      }

      // Limitations of static export:
      ❌ No SSR (Server-Side Rendering)
      ❌ No Server Actions
      ❌ No Route Handlers
      ❌ No Middleware
      ❌ No ISR
      ✅ Pure static files (deploy to any CDN)

      Good for: Simple landing pages, documentation

49.8  CI/CD Pipeline
      // .github/workflows/deploy.yml
      name: Deploy to Production

      on:
        push:
          branches: [main]

      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                node-version: '18'
                cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Run tests
              run: npm test

            - name: Run linting
              run: npm run lint

            - name: Build
              run: npm run build

            - name: Deploy to Vercel
              uses: amondnet/vercel-action@v25
              with:
                vercel-token: ${{ secrets.VERCEL_TOKEN }}
                vercel-org-id: ${{ secrets.ORG_ID }}
                vercel-project-id: ${{ secrets.PROJECT_ID }}
                vercel-args: '--prod'

49.9  Monitoring & Error Tracking
      Sentry:
      npm install @sentry/nextjs
      npx @sentry/wizard@latest -i nextjs

      // app/layout.tsx
      // Automatic error capture with Sentry

      Error tracking gives:
      ─ Stack traces
      ─ User info
      ─ Environment info
      ─ Performance monitoring

      LogRocket: Session replay + logging
      Datadog: Infrastructure + APM
      New Relic: Full stack observability

49.10 Post-Deployment Checklist
      Performance:
      ☐ Lighthouse score > 90 on all metrics
      ☐ Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
      ☐ Images optimized (next/image)
      ☐ Fonts optimized (next/font)
      ☐ Bundle size checked

      SEO:
      ☐ Metadata on all public pages
      ☐ OG images configured
      ☐ Sitemap accessible at /sitemap.xml
      ☐ Robots.txt configured
      ☐ Canonical URLs set

      Security:
      ☐ Environment variables set in platform (not in code)
      ☐ API routes protected
      ☐ HTTPS enforced
      ☐ Security headers configured
      ☐ Rate limiting on auth endpoints

      Reliability:
      ☐ Error boundaries in place
      ☐ Error tracking (Sentry) configured
      ☐ Health check endpoint
      ☐ Monitoring alerts set up

49.11 Interview Questions
      Q: How do you deploy a Next.js app to Vercel?
      Q: What is the 'standalone' output mode?
      Q: What are the limitations of static export?
      Q: How do you manage environment variables across environments?
      Q: How do you set up a CI/CD pipeline for Next.js?
      Q: What is the difference between Vercel and Netlify for Next.js?
```

---

### **Chapter 50: Pages Router — Legacy Reference**

```
50.1  Why Learn Pages Router?
      - Many production apps still use it
      - Frequent interview topic
      - Gradual migration knowledge needed
      - Next.js v12 and below = Pages Router only
      - Both routers can coexist during migration

50.2  Pages Router Structure
      pages/
      ├── _app.tsx          ← Custom App (like RootLayout)
      ├── _document.tsx     ← Custom Document (like root layout html/body)
      ├── index.tsx         →  /
      ├── about.tsx         →  /about
      ├── blog/
      │   ├── index.tsx     →  /blog
      │   └── [slug].tsx    →  /blog/:slug
      └── api/
          └── users.ts      →  /api/users

50.3  _app.tsx — Custom App
      // pages/_app.tsx
      import type { AppProps } from 'next/app'
      import '../styles/globals.css'

      export default function App({ Component, pageProps }: AppProps) {
        return (
          <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </>
        )
      }

50.4  _document.tsx — Custom Document
      // pages/_document.tsx
      import { Html, Head, Main, NextScript } from 'next/document'

      export default function Document() {
        return (
          <Html lang="en">
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }

50.5  getStaticProps — SSG (Static Site Generation)
      // pages/blog.tsx
      import type { GetStaticProps } from 'next'

      interface Props {
        posts: Post[]
      }

      export default function BlogPage({ posts }: Props) {
        return <PostList posts={posts} />
      }

      export const getStaticProps: GetStaticProps = async () => {
        const posts = await fetchPosts()

        return {
          props: { posts },
          revalidate: 60,     // ISR: rebuild every 60 seconds
        }
      }

      // Return options:
      return { props: { ... } }                    // Render page
      return { notFound: true }                    // Show 404
      return { redirect: { destination: '/other' } } // Redirect

50.6  getStaticPaths — Dynamic SSG
      // pages/blog/[slug].tsx
      import type { GetStaticPaths, GetStaticProps } from 'next'

      export const getStaticPaths: GetStaticPaths = async () => {
        const posts = await fetchAllPosts()

        return {
          paths: posts.map(post => ({
            params: { slug: post.slug }
          })),
          fallback: false,        // 404 for unknown slugs
          // fallback: true,      // Generate on demand, show loading
          // fallback: 'blocking' // Generate on demand, wait (no loading state)
        }
      }

      export const getStaticProps: GetStaticProps = async ({ params }) => {
        const post = await fetchPost(params!.slug as string)

        if (!post) return { notFound: true }

        return { props: { post }, revalidate: 3600 }
      }

50.7  getServerSideProps — SSR
      // pages/dashboard.tsx
      import type { GetServerSideProps } from 'next'

      export default function DashboardPage({ user }) {
        return <Dashboard user={user} />
      }

      export const getServerSideProps: GetServerSideProps = async (context) => {
        const { req, res, params, query, resolvedUrl } = context

        // Access cookies:
        const token = req.cookies.token

        if (!token) {
          return {
            redirect: {
              destination: '/login',
              permanent: false
            }
          }
        }

        const user = await getUserFromToken(token)
        return { props: { user } }
      }

50.8  API Routes (Pages Router)
      // pages/api/users.ts
      import type { NextApiRequest, NextApiResponse } from 'next'

      export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
      ) {
        if (req.method === 'GET') {
          const users = await db.user.findMany()
          return res.status(200).json(users)
        }

        if (req.method === 'POST') {
          const user = await db.user.create({ data: req.body })
          return res.status(201).json(user)
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end('Method Not Allowed')
      }

50.9  Head Management (Pages Router)
      import Head from 'next/head'

      export default function Page() {
        return (
          <>
            <Head>
              <title>My Page Title</title>
              <meta name="description" content="Page description" />
              <meta property="og:title" content="My Page" />
            </Head>
            <main>Content</main>
          </>
        )
      }

50.10 Pages Router → App Router Migration Guide
      ┌──────────────────────────────────────────────────────────┐
      │ Pages Router          │ App Router Equivalent            │
      ├──────────────────────────────────────────────────────────┤
      │ pages/_app.tsx        │ app/layout.tsx                   │
      │ pages/_document.tsx   │ app/layout.tsx                   │
      │ pages/index.tsx       │ app/page.tsx                     │
      │ pages/about.tsx       │ app/about/page.tsx               │
      │ getStaticProps        │ async Server Component           │
      │ getServerSideProps    │ async Server Comp + no-store     │
      │ getStaticPaths        │ generateStaticParams             │
      │ pages/api/*.ts        │ app/api/**/route.ts              │
      │ <Head>                │ export const metadata            │
      │ useRouter (next/router)│ useRouter (next/navigation)     │
      └──────────────────────────────────────────────────────────┘

      Migration strategy:
      1. Both routers can run simultaneously
      2. Migrate route by route (not all at once)
      3. Shared components work in both
      4. Migrate layouts first, then pages
      5. Migrate API routes to Route Handlers last

50.11 Interview Questions
      Q: What is getStaticProps?
      Q: What is getServerSideProps?
      Q: What is getStaticPaths?
      Q: What does fallback: true do in getStaticPaths?
      Q: Difference between getStaticProps and getServerSideProps?
      Q: What is _app.tsx used for?
      Q: How do you migrate from Pages Router to App Router?
```

---

## **PART H — INTERVIEW PREPARATION**

---

### **Chapter 51: React Interview Questions — Topic-wise**

```
51.1  React Basics (10 Core Questions)
      Q: What is React and why is it popular?
      Q: What is the Virtual DOM? How does it work?
      Q: Explain reconciliation and the diffing algorithm.
      Q: What is JSX? How does it compile?
      Q: Difference between controlled and uncontrolled components?
      Q: What is React Fiber and why was it introduced?
      Q: What is the difference between createElement and JSX?
      Q: Why do we need keys in lists?
      Q: What is strict mode in React?
      Q: What are pure components?

51.2  Components & Props
      Q: Difference between functional and class components?
      Q: What is prop drilling and how do you solve it?
      Q: Can you modify props inside a component?
      Q: What are render props?
      Q: What is a Higher-Order Component?
      Q: What is component composition?
      Q: What are default props?
      Q: What is the children prop?

51.3  State
      Q: What is state? How is it different from props?
      Q: Why should you never mutate state directly?
      Q: What is batching in React? How does React 18 change it?
      Q: When would you use useReducer over useState?
      Q: What is lifting state up?
      Q: What is derived state?
      Q: What causes a re-render in React?
      Q: How do you update nested state objects correctly?

51.4  Hooks (Most Asked)
      Q: What are the Rules of Hooks?
      Q: How does useState work internally?
      Q: Explain useEffect dependency array in detail.
      Q: What is a stale closure in the context of useEffect?
      Q: How do you prevent infinite loops in useEffect?
      Q: What is the difference between useEffect and useLayoutEffect?
      Q: When do you use useRef vs useState?
      Q: What is the difference between useMemo and useCallback?
      Q: When would you NOT use useMemo/useCallback?
      Q: How do useTransition and useDeferredValue work?
      Q: What is useReducer and when would you use it?

51.5  Performance
      Q: How does React.memo work?
      Q: What is code splitting? How do you implement it in React?
      Q: What is windowing/virtualization?
      Q: How would you debug performance issues in a React app?
      Q: What is the React DevTools Profiler?
      Q: How do you prevent unnecessary re-renders?
      Q: What is tree shaking?

51.6  Patterns & Architecture
      Q: Explain the Compound Components pattern.
      Q: What is the Provider Pattern?
      Q: What is the difference between HOC and custom hooks?
      Q: What are headless components?
      Q: What is atomic design?

51.7  Context API
      Q: When should you use Context API?
      Q: What are the performance pitfalls of Context?
      Q: How do you optimize Context to prevent unnecessary re-renders?
      Q: Context API vs Redux — when to use which?

51.8  State Management
      Q: When would you use Redux vs Context API?
      Q: What is Redux Toolkit?
      Q: What is createSlice?
      Q: What is createAsyncThunk?
      Q: How does React Query/TanStack Query differ from Redux?
      Q: What is Zustand and why is it simpler than Redux?
      Q: What is the difference between client state and server state?

51.9  React Router
      Q: What is client-side routing?
      Q: How do protected routes work in React Router v6?
      Q: What is the difference between Link and NavLink?
      Q: How do you implement nested routes?
      Q: What is the Outlet component?

51.10 Testing
      Q: What is React Testing Library's core philosophy?
      Q: Why prefer RTL over Enzyme?
      Q: How do you test async components?
      Q: How do you mock API calls in tests?
      Q: What is the difference between unit, integration, and E2E tests?
```

---

### **Chapter 52: Next.js Interview Questions — Topic-wise**

```
52.1  Basics
      Q: What is Next.js and why would you use it over CRA?
      Q: What is the difference between App Router and Pages Router?
      Q: What is file-based routing?
      Q: What is hydration and what causes hydration errors?
      Q: What is the difference between next/router and next/navigation?

52.2  Server & Client Components
      Q: What are React Server Components?
      Q: What can Server Components NOT do?
      Q: What triggers a component to be a Client Component?
      Q: How do you pass data from Server to Client Component?
      Q: What is the "client boundary"?
      Q: Can you import a Server Component inside a Client Component?
      Q: How do Server Components reduce bundle size?

52.3  Rendering Strategies
      Q: Explain SSR, SSG, ISR, and CSR.
      Q: When would you choose ISR over SSG?
      Q: When would you choose SSR over ISR?
      Q: What makes a Next.js page render dynamically?
      Q: What is Partial Prerendering?
      Q: How does streaming work in Next.js?
      Q: What is the difference between loading.tsx and Suspense?

52.4  Data Fetching
      Q: How does fetch() work differently in Next.js?
      Q: Explain the four caching layers in Next.js.
      Q: What is request memoization?
      Q: What is on-demand revalidation?
      Q: How does generateStaticParams work?
      Q: When would you use unstable_cache?
      Q: How do you fetch data in parallel in Next.js?

52.5  Server Actions
      Q: What are Server Actions?
      Q: How are Server Actions different from Route Handlers?
      Q: What is useFormStatus?
      Q: What is useActionState?
      Q: How do you handle validation in Server Actions?
      Q: How do you revalidate data after a Server Action?
      Q: What is useOptimistic?
      Q: Can Server Actions be called without a form?

52.6  Routing (Advanced)
      Q: What are route groups and why would you use them?
      Q: Explain parallel routes with a real-world example.
      Q: What are intercepting routes? Give an example.
      Q: What is the difference between catch-all and optional catch-all routes?
      Q: What is default.tsx used for?
      Q: What is the difference between layout.tsx and template.tsx?
      Q: How does middleware work in Next.js?
      Q: When should you use redirects vs rewrites?

52.7  Performance & SEO
      Q: How does next/image improve performance?
      Q: How does next/font prevent layout shift?
      Q: What are Core Web Vitals?
      Q: What is the Metadata API?
      Q: How do you generate a sitemap in Next.js?
      Q: What is the Edge Runtime?
      Q: How do you analyze bundle size in Next.js?

52.8  Authentication
      Q: How does NextAuth.js work with App Router?
      Q: How do you protect routes in Next.js?
      Q: Where should you store JWT tokens and why?
      Q: How do you implement RBAC in Next.js?
      Q: What is the difference between session and JWT strategy in NextAuth?

52.9  Deployment
      Q: How do you deploy Next.js to Vercel?
      Q: What is the standalone output mode?
      Q: What limitations does static export have?
      Q: What is the difference between Vercel and traditional hosting?
      Q: How do you manage environment variables in Next.js?
```

---

### **Chapter 53: JavaScript Interview Questions for React/Next.js Roles**

```
53.1  Closures — 5 Must-Know Questions
      Q1: What is a closure? Explain with example.
      Q2: What is a stale closure in React? How do you fix it?
      Q3: Implement a counter using closures.
      Q4: What is the output of this code? [closure + loop trap]
      Q5: How do closures enable data privacy?

53.2  Promises & Async/Await — 5 Must-Know Questions
      Q1: What is the difference between Promise.all and Promise.allSettled?
      Q2: Convert this callback code to async/await.
      Q3: What happens if you don't await a promise?
      Q4: How do you run promises in parallel?
      Q5: Implement a retry mechanism with promises.

53.3  Event Loop — 5 Must-Know Questions
      Q1: What is the output order? [setTimeout + Promise + sync code]
      Q2: Explain microtask vs macrotask queue.
      Q3: Why is Node.js single-threaded but non-blocking?
      Q4: What is the difference between setTimeout(fn, 0) and Promise.resolve()?
      Q5: How does React's batching relate to the event loop?

53.4  'this' Keyword — 5 Must-Know Questions
      Q1: What is 'this' in different contexts?
      Q2: Why don't arrow functions have their own 'this'?
      Q3: What is the difference between call, apply, and bind?
      Q4: How do you fix 'this' binding in class component event handlers?
      Q5: What does 'this' refer to in strict mode vs non-strict?

53.5  Array Methods — 5 Must-Know Questions
      Q1: Implement map() from scratch.
      Q2: What is the difference between map and forEach?
      Q3: How do you flatten a nested array without flat()?
      Q4: Implement reduce() to group array items by property.
      Q5: What is the difference between find() and filter()?

53.6  Debounce & Throttle — Implementation
      Debounce: Execute function AFTER delay (search input)
      function debounce(fn, delay) {
        let timer
        return function (...args) {
          clearTimeout(timer)
          timer = setTimeout(() => fn.apply(this, args), delay)
        }
      }

      Throttle: Execute at most once per interval (scroll handler)
      function throttle(fn, limit) {
        let lastRun = 0
        return function (...args) {
          const now = Date.now()
          if (now - lastRun >= limit) {
            lastRun = now
            fn.apply(this, args)
          }
        }
      }

53.7  Deep Clone — Implementation
      // Method 1: structuredClone (modern, recommended)
      const deep = structuredClone(obj)

      // Method 2: JSON (loses functions, undefined, Date)
      const deep = JSON.parse(JSON.stringify(obj))

      // Method 3: Recursive
      function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj
        if (obj instanceof Date) return new Date(obj)
        if (Array.isArray(obj)) return obj.map(deepClone)
        return Object.fromEntries(
          Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
        )
      }

53.8  Immutable Operations — React Context
      // Add to array:
      [...arr, newItem]

      // Remove from array:
      arr.filter(item => item.id !== id)

      // Update item in array:
      arr.map(item => item.id === id ? { ...item, ...updates } : item)

      // Update nested object:
      { ...obj, nested: { ...obj.nested, key: value } }

53.9  Prototype & Classes
      Q1: What is prototypal inheritance?
      Q2: Difference between __proto__ and prototype?
      Q3: What does Object.create() do?
      Q4: How does class syntax relate to prototypes?
      Q5: What is the difference between static and instance methods?

53.10 Miscellaneous Must-Know
      Q: Difference between == and ===?
      Q: What is typeof null and why?
      Q: What is the difference between null and undefined?
      Q: What is optional chaining (?.) and nullish coalescing (??)?
      Q: What is the difference between splice and slice?
      Q: Explain event delegation.
      Q: What is the difference between sessionStorage and localStorage?
      Q: What is a WeakMap and when would you use it?
```

---

### **Chapter 54: Coding Challenges & System Design**

```
54.1  React Coding Challenges
      Build these from scratch:

      Counter with steps:
      ─ Increment/decrement by custom step
      ─ Reset to initial value
      ─ Min/max constraints

      Todo App (Full CRUD):
      ─ Add, delete, toggle complete
      ─ Filter: all/active/completed
      ─ LocalStorage persistence
      ─ Edit todo inline

      Search with Debounce:
      ─ Input → debounced API call
      ─ Loading state
      ─ No results state
      ─ Clear button

      Pagination Component:
      ─ Page numbers
      ─ Previous/Next
      ─ Jump to page
      ─ Items per page selector

      Infinite Scroll:
      ─ Load more on scroll
      ─ IntersectionObserver
      ─ Loading skeleton
      ─ End of list message

      Star Rating:
      ─ Click to rate
      ─ Hover preview
      ─ Controlled and uncontrolled modes

      Accordion/FAQ:
      ─ Single open or multi-open
      ─ Smooth animation
      ─ Keyboard accessible

      Tabs Component:
      ─ Switch between tabs
      ─ Active tab indicator
      ─ Lazy render inactive tabs

      Modal/Dialog:
      ─ Open/close
      ─ Click outside to close
      ─ ESC key to close
      ─ Focus trap
      ─ Portal rendering

      Custom Hook Challenges:
      ─ useLocalStorage
      ─ useFetch with loading/error/data
      ─ useDebounce
      ─ useMediaQuery
      ─ useClickOutside
      ─ useKeyPress
      ─ usePrevious
      ─ useToggle

54.2  Next.js Coding Challenges
      Blog with MDX:
      ─ SSG blog pages
      ─ Dynamic routes for posts
      ─ generateStaticParams
      ─ Metadata per post

      Auth Flow:
      ─ Login/register pages
      ─ JWT or NextAuth
      ─ Protected dashboard route
      ─ Session in Server Components

      CRUD API:
      ─ Route Handlers for REST API
      ─ Prisma + PostgreSQL
      ─ Validation with Zod
      ─ Error handling

      E-commerce Product Page:
      ─ ISR for product data
      ─ Image gallery
      ─ Add to cart (client state)
      ─ Server Action for order

54.3  System Design Questions
      Design a Twitter/X Feed:
      ─ Infinite scroll
      ─ Optimistic like/retweet
      ─ Real-time updates
      ─ Component hierarchy
      ─ State management approach

      Design a Dashboard:
      ─ Widget system
      ─ Chart components
      ─ Date range filters
      ─ Parallel data fetching
      ─ Loading states

      Design an E-commerce Site:
      ─ Product listing with filters
      ─ Cart management
      ─ Checkout flow
      ─ Payment integration
      ─ Order history

      Design a Component Library:
      ─ Design tokens / theme
      ─ Compound components
      ─ Accessibility first
      ─ Tree shaking
      ─ Documentation

      Design a Real-time Chat:
      ─ Message list
      ─ Optimistic messages
      ─ WebSocket integration
      ─ Unread count
      ─ Typing indicators

54.4  Whiteboard Exercises
      Draw component hierarchy for:
      ─ E-commerce product page
      ─ Social media feed
      ─ Admin dashboard

      Explain data flow for:
      ─ User authentication
      ─ Shopping cart state
      ─ Form with validation

      Optimize the following:
      ─ A list of 10,000 items
      ─ A form that re-renders on every keystroke
      ─ An app with prop drilling 5 levels deep
```

---

### **Chapter 55: Mock Interviews & Final Preparation**

```
55.1  Junior React Developer — Mock Q&A
      Level: 0-1 years experience

      Expected to know:
      ─ JSX syntax and rules
      ─ useState, useEffect basics
      ─ Props and one-way data flow
      ─ Simple component composition
      ─ Basic event handling
      ─ Simple API fetch with useEffect

      Sample questions:
      Q: "Build a counter component"
      Q: "What is the difference between props and state?"
      Q: "Explain what useEffect does"
      Q: "What happens when you call setState?"

55.2  Mid-Level React Developer — Mock Q&A
      Level: 1-3 years experience

      Expected to know:
      ─ All hooks deeply (useMemo, useCallback, useRef, useReducer)
      ─ Custom hooks
      ─ Performance optimization (React.memo)
      ─ Context API and state management
      ─ React Router
      ─ Form handling (React Hook Form)
      ─ API integration patterns
      ─ Basic testing

      Sample questions:
      Q: "What causes unnecessary re-renders and how do you fix them?"
      Q: "Build a custom useFetch hook"
      Q: "Explain the Context API and its limitations"
      Q: "How would you implement debounced search?"

55.3  Senior React Developer — Mock Q&A
      Level: 3+ years experience

      Expected to know:
      ─ React internals (Fiber, reconciliation)
      ─ Performance profiling and optimization
      ─ Architecture patterns (micro-frontends, monorepo)
      ─ Testing strategy (unit, integration, E2E)
      ─ Accessibility (WCAG)
      ─ CI/CD and deployment
      ─ State management architecture decisions
      ─ Mentoring and code review standards

      Sample questions:
      Q: "How would you architect a large-scale React application?"
      Q: "Explain React Fiber and concurrent rendering"
      Q: "How do you ensure accessibility in your React apps?"
      Q: "Design a component library from scratch"

55.4  Full-Stack Next.js Developer — Mock Q&A
      Expected to know:
      ─ All Next.js features (App Router, RSC, Server Actions)
      ─ Database integration (Prisma/Drizzle)
      ─ Authentication (NextAuth/Clerk)
      ─ REST API design (Route Handlers)
      ─ Deployment (Vercel, Docker)
      ─ Performance and SEO

      Sample questions:
      Q: "When would you use SSR vs ISR?"
      Q: "How do Server Actions work?"
      Q: "How would you implement authentication in Next.js?"
      Q: "Design an API for a blog application"

55.5  Behavioral Questions
      STAR Format: Situation, Task, Action, Result

      Common questions:
      Q: "Tell me about a challenging bug you fixed."
      Q: "How did you improve performance in a project?"
      Q: "Describe a time you disagreed with a technical decision."
      Q: "How do you keep up with React/Next.js updates?"
      Q: "Tell me about a project you're proud of."

55.6  Last-Week Preparation Checklist
      Day 1-2: JavaScript fundamentals review
      ─ Closures, async/await, event loop
      ─ Implement debounce and deep clone

      Day 3-4: React hooks deep dive
      ─ All hooks with use-cases
      ─ Performance optimization

      Day 5: Next.js specifics
      ─ Rendering strategies
      ─ Server Components vs Client
      ─ Common interview questions

      Day 6: Build 2-3 components
      ─ From memory
      ─ Time yourself

      Day 7: Rest + light review
      ─ Read through cheat sheets
      ─ Review your own projects

55.7  Salary Negotiation Tips
      Research:
      ─ Glassdoor, Levels.fyi, LinkedIn Salary
      ─ Know market rate for your location
      ─ Factor in experience level

      Negotiation:
      ─ Let them make first offer
      ─ Counter 15-20% above your minimum
      ─ Consider total comp (equity, benefits)
      ─ Never say current salary
      ─ Be willing to walk away

55.8  Resume Tips for React/Next.js Developers
      Include:
      ─ Specific technologies (React 18, Next.js 14, TypeScript)
      ─ Quantified achievements ("reduced load time by 40%")
      ─ Links to GitHub projects and deployed apps
      ─ Relevant open source contributions

      Avoid:
      ─ Generic descriptions ("worked on frontend")
      ─ Outdated tech (jQuery, class components only)
      ─ Long list of every technology used
      ─ No links to actual work
```

---

## **PART I — SUPPLEMENTARY REFERENCE**

---

### **Chapter 56: Glossary & Quick Reference**

```
56.1  React Terminology Glossary (A-Z)
      Batching: Grouping multiple setState calls into one re-render
      Client Component: Component with 'use client', can use hooks
      Compound Component: Components designed to work together
      Concurrent Rendering: React can pause/resume render work
      Context: Way to pass data without props
      Controlled Component: Form input driven by React state
      Custom Hook: Reusable function starting with 'use'
      Derived State: State computed from other state (avoid storing)
      Error Boundary: Component catching render errors
      Fiber: React's reconciliation algorithm (React 16+)
      Fragment: Wrapper with no DOM element (<> </>)
      Higher-Order Component (HOC): Function returning enhanced component
      Hydration: React attaching event listeners to server HTML
      Immutability: Never modify state directly, create new copies
      JSX: JavaScript XML syntax for describing UI
      Key: Unique identifier for list items
      Lazy Loading: Loading components on demand
      Lifting State Up: Moving state to common ancestor
      Memo: Skipping re-render when props unchanged (React.memo)
      Portal: Rendering children outside parent DOM hierarchy
      Prop Drilling: Passing props through multiple levels
      Pure Component: Same inputs = same output, no side effects
      Reconciliation: Process of updating DOM based on Virtual DOM diff
      Ref: Direct reference to DOM element or mutable value
      Server Component: Component rendering on server only (no JS sent)
      State: Mutable data that triggers re-renders when changed
      Strict Mode: Highlights potential problems (double invokes)
      Suspense: Show fallback while component is loading
      Synthetic Event: React's cross-browser event wrapper
      Uncontrolled Component: Form input managed by DOM
      Virtual DOM: Lightweight JavaScript representation of DOM

56.2  Next.js Terminology Glossary (A-Z)
      App Router: Modern routing system in app/ directory
      Cache: Stored responses to avoid repeated fetches
      Client Boundary: Where 'use client' starts client code
      CSR: Client-Side Rendering (in browser)
      Data Cache: Server-side cache for fetch() responses
      Dynamic Rendering: HTML generated per request
      Edge Runtime: Fast JS runtime at CDN edge nodes
      Full Route Cache: Cached HTML for static routes
      generateStaticParams: Pre-generate dynamic route params
      Hydration: Process of making server HTML interactive
      ISR: Incremental Static Regeneration
      Metadata API: Type-safe way to set SEO tags
      Middleware: Code running before every request
      Pages Router: Legacy routing in pages/ directory
      Parallel Routes: Render multiple pages in same layout
      Partial Prerendering: Static shell + dynamic streaming holes
      Revalidation: Updating cached data (time-based or on-demand)
      Route Group: Folder with () that doesn't affect URL
      Route Handler: API endpoint (route.ts file)
      Router Cache: Client-side cache of visited routes
      RSC: React Server Components
      Server Action: Server function called from client
      SSG: Static Site Generation (build time)
      SSR: Server-Side Rendering (request time)
      Static Rendering: HTML generated at build time
      Streaming: Progressive HTML delivery using Suspense

56.3  React Hooks Cheat Sheet
      ┌─────────────────────────────────────────────────────────────┐
      │ Hook              │ Purpose                                 │
      ├─────────────────────────────────────────────────────────────┤
      │ useState          │ Local component state                   │
      │ useEffect         │ Side effects (fetch, timers, listeners) │
      │ useContext        │ Consume context values                  │
      │ useReducer        │ Complex state logic (like Redux)        │
      │ useRef            │ DOM access + mutable values             │
      │ useMemo           │ Memoize expensive calculations          │
      │ useCallback       │ Memoize function references             │
      │ useLayoutEffect   │ Like useEffect but fires before paint   │
      │ useId             │ Generate unique accessibility IDs       │
      │ useTransition     │ Mark updates as non-urgent              │
      │ useDeferredValue  │ Defer re-rendering of a value           │
      │ useOptimistic     │ Optimistic UI updates                   │
      │ useActionState    │ Form state with server actions          │
      │ useFormStatus     │ Form submission pending state           │
      └─────────────────────────────────────────────────────────────┘

56.4  Next.js App Router — File Conventions Cheat Sheet
      ┌──────────────────────────────────────────────────────────┐
      │ File            │ Purpose                                │
      ├──────────────────────────────────────────────────────────┤
      │ layout.tsx      │ Persistent UI wrapping pages           │
      │ page.tsx        │ Unique UI (makes route accessible)     │
      │ loading.tsx     │ Loading skeleton (auto Suspense)       │
      │ error.tsx       │ Error UI (auto Error Boundary)         │
      │ not-found.tsx   │ 404 page                               │
      │ template.tsx    │ Re-mounts on every navigation          │
      │ default.tsx     │ Fallback for parallel routes           │
      │ route.ts        │ API endpoint (GET, POST, etc.)         │
      │ middleware.ts   │ Runs before every request (root)       │
      │ opengraph-image │ Auto OG image generation               │
      │ sitemap.ts      │ Dynamic sitemap                        │
      │ robots.ts       │ Robots.txt configuration               │
      │ manifest.ts     │ PWA manifest                           │
      └──────────────────────────────────────────────────────────┘

56.5  Interview Last-Minute Cheat Sheet
      Top 10 React answers to memorize:
      1. Virtual DOM: JS object tree, diffed with real DOM
      2. State update: async, batched, functional update for prev value
      3. useEffect cleanup: returned function, runs before next effect
      4. useMemo: memoize value, useCallback: memoize function
      5. React.memo: skip re-render if props unchanged
      6. Context re-renders ALL consumers when value changes
      7. Keys must be stable, unique (not index if list can reorder)
      8. Controlled: value={state} + onChange. Uncontrolled: defaultValue + ref
      9. Closures in useEffect: use functional updates or add to deps
      10. Code splitting: React.lazy + Suspense = separate bundle chunk

      Top 10 Next.js answers to memorize:
      1. RSC: server-only, no JS to client, can async/await directly
      2. 'use client': creates client boundary, enables hooks
      3. Static rendering: build time. Dynamic: request time
      4. ISR: static + revalidate option = background rebuild
      5. fetch cache: 'force-cache' (static), 'no-store' (dynamic)
      6. generateStaticParams: pre-render dynamic routes at build
      7. Server Action: 'use server', called from client, no API needed
      8. Parallel routes: @slot folders, multiple pages in layout
      9. Intercepting routes: modal pattern, URL updates but no navigation
      10. Middleware: runs on edge, before cache, every request

56.6  Essential npm Packages for React/Next.js
      Styling:
      clsx, tailwind-merge, @tailwindcss/forms

      Forms:
      react-hook-form, zod, @hookform/resolvers

      Data Fetching:
      @tanstack/react-query, swr, axios

      State Management:
      zustand, jotai, @reduxjs/toolkit

      UI Components:
      @radix-ui/react-*, shadcn-ui, @headlessui/react

      Auth:
      next-auth, @clerk/nextjs, @supabase/supabase-js

      Database:
      prisma, @prisma/client, drizzle-orm

      Animation:
      framer-motion, @react-spring/web

      Testing:
      @testing-library/react, @testing-library/user-event,
      msw, playwright, @playwright/test

      Utilities:
      date-fns, lodash-es, nanoid, slugify

      Next.js specific:
      next-themes, next-intl, @next/bundle-analyzer,
      @vercel/analytics, @vercel/speed-insights
```

---

## **APPENDIX**

```
Appendix A: Setting Up Development Environment
      ─ Install Node.js (use nvm for version management)
      ─ VS Code setup + essential extensions
      ─ Git configuration
      ─ Creating first React + Next.js project
      ─ ESLint + Prettier configuration

Appendix B: TypeScript with React — Quick Reference
      ─ Component prop typing
      ─ Event typing
      ─ useState typing
      ─ useRef typing
      ─ Custom hook return type
      ─ Generic components
      ─ Common utility types

Appendix C: Git Workflow for React Projects
      ─ Feature branch workflow
      ─ Conventional commits
      ─ PR best practices
      ─ Git hooks with Husky + lint-staged

Appendix D: VS Code Extensions & Shortcuts
      Extensions:
      ─ ES7+ React/Redux/React-Native snippets
      ─ Tailwind CSS IntelliSense
      ─ Prisma
      ─ Thunder Client (API testing)
      ─ Error Lens
      ─ GitLens
      ─ GitHub Copilot

      Shortcuts:
      ─ rfce → React Functional Component Export
      ─ useState → useState snippet
      ─ useEffect → useEffect snippet
      ─ imr → import React

Appendix E: Roadmap — Beginner to Senior
      Month 1-2: JavaScript Foundations
      ─ ES6+ syntax, async/await, closures
      ─ Build: Todo app in vanilla JS

      Month 3-4: React Fundamentals
      ─ Components, props, state, hooks
      ─ Build: Weather app, shopping cart

      Month 5-6: Advanced React
      ─ Performance, patterns, testing
      ─ Build: Full dashboard with auth

      Month 7-8: Next.js
      ─ App Router, RSC, data fetching
      ─ Build: Full-stack blog or e-commerce

      Month 9-10: Interview Prep
      ─ Coding challenges daily
      ─ Mock interviews weekly

      Month 11-12: Job Hunting
      ─ Portfolio with 3-5 projects
      ─ Open source contributions
      ─ Apply to 5-10 companies/week

Appendix F: Useful Resources
      Official Docs:
      ─ react.dev (React docs)
      ─ nextjs.org/docs (Next.js docs)
      ─ typescriptlang.org (TypeScript docs)

      YouTube Channels:
      ─ Fireship (short explainers)
      ─ Theo (t3.gg) (Next.js opinions)
      ─ Jack Herrington (advanced patterns)
      ─ Web Dev Simplified (beginner friendly)

      Blogs:
      ─ overreacted.io (Dan Abramov)
      ─ kentcdodds.com (Kent C. Dodds)
      ─ thisweekinreact.com (newsletter)

      Practice:
      ─ GreatFrontEnd (React challenges)
      ─ Frontend Mentor (UI challenges)
      ─ CodeSandbox (quick prototyping)
```

---

> 📌 **Summary of Remaining Chapters (38 → End)**
>
> | Chapter | Title | Topics |
> |---------|-------|--------|
> | 38 | Introduction to Next.js | What, Why, Setup, Config |
> | 39 | App Router — Routing System | All route types, layouts, middleware |
> | 40 | Server vs Client Components | RSC, 'use client', composition rules |
> | 41 | Data Fetching in Next.js | fetch, caching, ISR, streaming |
> | 42 | Rendering Strategies | CSR, SSR, SSG, ISR, PPR |
> | 43 | API Routes & Route Handlers | route.ts, HTTP methods, CORS |
> | 44 | Server Actions & Mutations | 'use server', forms, validation |
> | 45 | Authentication & Authorization | NextAuth, JWT, RBAC, Clerk |
> | 46 | Styling & UI in Next.js | Tailwind, shadcn, next/image, fonts |
> | 47 | Performance & SEO | Metadata, Vitals, bundle analysis |
> | 48 | Advanced Concepts | Middleware, i18n, DB, uploads, payments |
> | 49 | Deployment | Vercel, Docker, AWS, CI/CD |
> | 50 | Pages Router (Legacy) | getStaticProps, SSR, migration guide |
> | 51 | React Interview Questions | All React topics, categorized |
> | 52 | Next.js Interview Questions | All Next.js topics, categorized |
> | 53 | JavaScript Interview Questions | Closures, async, event loop |
> | 54 | Coding Challenges & System Design | 20+ challenges, whiteboard |
> | 55 | Mock Interviews & Preparation | Junior/Mid/Senior, behavioral |
> | 56 | Glossary & Quick Reference | Cheat sheets, packages, roadmap |
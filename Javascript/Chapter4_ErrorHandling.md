

# 🚀 JavaScript Deep Dive Notes - Section 4: Error Handling

## ✅ Official Interview Question Bank (Merged Ultimate Edition)

> **100% Interview Q&A Format** — Error handling separates junior developers (who let apps crash) from senior developers (who build resilient systems). This section covers core mechanics, JS-specific quirks, modern ES features, and real-world API error handling. **90% of candidates can write try/catch, but fail when asked how it actually works under the hood.**

> **Study Hack:** Pay special attention to the **"Async Errors"** and **"Division by Zero"** topics. They are **guaranteed FAANG interview questions.**

---

### 🔥 Frequency Rating Meaning

| Emoji | Percentage | Meaning |
|-------|-----------|---------|
| 🟢 | 99% | Asked at nearly every mid-level JS interview |
| 🟡 | 70% | Very common filter question |
| 🟠 | 40% | Moderately common |
| 🔴 | 20% | Senior level / Occasional trick question |

---

## 📑 Table of Contents

1. [📌 TOPIC 1: Core Concepts & Mechanics (try...catch...finally)](#topic-1)
   - [Q1: What is error handling? Why is it important?](#q1)
   - [Q2: Explain the execution flow and syntax of try...catch...finally](#q2)
   - [Q3: What is the output if you return inside try? (Trick Question)](#q3)
   - [Q4: Can you have try without catch?](#q4)
   - [Q5: What is "Optional Catch Binding"?](#q5)

2. [📌 TOPIC 2: Throwing & The Error Object](#topic-2)
   - [Q6: What does the throw statement do? What can you throw?](#q6)
   - [Q7: What are the main properties of the built-in Error object?](#q7)
   - [Q8: What is "Error Cause" (ES2022)?](#q8)

3. [📌 TOPIC 3: Built-in Error Types & Custom Errors](#topic-3)
   - [Q9: Common examples of built-in errors](#q9)
   - [Q10: How do you create and use Custom Error Classes?](#q10)

4. [📌 TOPIC 4: Async Error Handling & Syntax Errors](#topic-4)
   - [Q11: Can try...catch catch Syntax Errors or Async Errors?](#q11)
   - [Q12: Correct error handling for modern async/await?](#q12)

5. [📌 TOPIC 5: JavaScript Specific Quirks (Division By Zero)](#topic-5)
   - [Q13: How does JavaScript handle Division by Zero?](#q13)

6. [📌 TOPIC 6: Real-World Use Cases & Advanced Patterns](#topic-6)
   - [6.1 Safe JSON Parse](#pattern-1)
   - [6.2 The fetch API Error Trap](#pattern-2)
   - [6.3 Retry Pattern (Network Resilience)](#pattern-3)
   - [6.4 Global Unhandled Error Catching](#pattern-4)

7. [📌 TOPIC 7: Best Practices & Anti-Patterns](#topic-7)
   - [✅ Good Patterns](#good-patterns)
   - [❌ Worst Anti-Patterns](#anti-patterns)

8. [🎯 10 Common Interview Trick Questions Cheat Sheet](#cheat-sheet)

9. [🔥 Section 4 Mega Cheat Sheet Summary](#mega-summary)

10. [💻 10 Progressive Practice Programs](#practice-programs)
    - [Program 1: Basic try-catch](#program-1)
    - [Program 2: try-catch-finally](#program-2)
    - [Program 3: Custom Error using throw](#program-3)
    - [Program 4: JSON Parsing Error](#program-4)
    - [Program 5: Promise Error Handling](#program-5)
    - [Program 6: Async/Await try-catch](#program-6)
    - [Program 7: Nested Error Handling](#program-7)
    - [Program 8: Finally Override Return](#program-8)
    - [Program 9: Custom Error Class](#program-9)
    - [Program 10: Form Validation Program](#program-10)

11. [🧠 Mastery Checklist](#mastery-checklist)

12. [🔥 Best Practice Challenge (Try Yourself)](#challenge)

13. [📊 Error Handling Visual Flow Diagram](#visual-diagram)

14. [🏆 Bonus: 10 Rapid-Fire Interview Questions](#bonus-questions)

---

<a id="topic-1"></a>
## 📌 TOPIC 1: Core Concepts & Mechanics (try...catch...finally)

---

<a id="q1"></a>
### ❓ Q1: What is error handling? Why is it important?

**Frequency:** 🟢 99%

**✅ Standard Answer:** Error handling is the mechanism to gracefully handle and recover from unexpected runtime failures. Without proper error handling, a single failure will crash your entire application.

> **Interview Note:** Good error handling is the **single biggest difference** between hobby code and production-ready code.

---

<a id="q2"></a>
### ❓ Q2: Explain the execution flow and syntax of try...catch...finally.

**Frequency:** 🟢 99%

**✅ Standard Answer:**

| Block | Purpose | Runs when |
|-------|---------|-----------|
| `try` | Contains code that might fail/throw an error | Always runs first |
| `catch` | Handles the error | Only if an error is thrown inside `try` |
| `finally` | Cleanup code (close DBs, hide spinners) | **ALWAYS** runs, no exceptions |

**🧪 Syntax & Code:**

```javascript
try {
  console.log("1. Executing Try");
  // riskyCode(); // Uncomment to trigger catch
  console.log("2. End of Try");
} catch (error) {
  console.log("3. Caught an error:", error.message);
} finally {
  console.log("4. Finally always runs"); // Cleanup happens here
}
```

---

<a id="q3"></a>
### ❓ Q3: Famous interview trick question. What is the output if you return inside try?

**Frequency:** 🟢 99% *(Classic Senior Filter — 90% answer this incorrectly)*

**✅ Answer:** Yes, `finally` **always runs**. The `finally` block will intercept the flow before the function actually returns. Even if you `return`, `break`, or `throw` inside `try` or `catch`. **If the `finally` block also contains a `return` statement, it will overwrite the return value from the `try` block!**

**🧪 Code:**

```javascript
function testFinally() {
  try {
    console.log("try");
    return 1;
  } catch (e) {
    console.log("catch");
    return 2;
  } finally {
    console.log("finally");
    return 3; // This overrides the 'return 1' from try!
  }
}

console.log(testFinally());
```

**✅ Output:**

```
try
finally
3
```

---

<a id="q4"></a>
### ❓ Q4: Can you have try without catch?

**Frequency:** 🟡 70%

**✅ Answer:** Yes. But only if you have a `finally` block. Any error will still be thrown and propagate up the call stack, but the cleanup code will run first.

**🧪 Code:**

```javascript
// This is perfectly valid
try {
  doSomethingRisky();
} finally {
  cleanupResources();
}
```

---

<a id="q5"></a>
### ❓ Q5: What is "Optional Catch Binding"?

**Frequency:** 🟠 40%

**✅ Answer:** Since **ES2019**, you can omit the error variable in the `catch` block if you don't need to use it.

**🧪 Code:**

```javascript
try {
  JSON.parse(input);
} catch { // Notice: no (e) or (error)
  console.log("Invalid JSON. Falling back to default.");
}
```

---

<a id="topic-2"></a>
## 📌 TOPIC 2: Throwing & The Error Object

---

<a id="q6"></a>
### ❓ Q6: What does the throw statement do? What can you throw?

**Frequency:** 🟢 99%

**✅ Answer:** `throw` generates a custom error and immediately stops execution of the current block, propagating the error up the call stack until it is caught by a `catch` block. You can technically throw anything (a string, a number, an object), but **best practice is to always throw an instance of the Error object.**

**🧪 Code:**

```javascript
// ❌ Bad Practice (Throwing primitive)
throw "Something broke"; // Loses stack trace! Impossible to debug.

// ✅ Best Practice (Throwing Error object)
throw new Error("Something broke");
```

---

<a id="q7"></a>
### ❓ Q7: What are the main properties of the built-in Error object?

**Frequency:** 🟡 70%

**✅ Answer:**

| Property | Description |
|----------|-------------|
| `name` | The type of error (e.g., "Error", "TypeError", "ReferenceError") |
| `message` | The human-readable description provided when creating the error |
| `stack` | A string showing the execution path (Call Stack) that led to the error. Crucial for debugging |

**🧪 Code:**

```javascript
try {
  throw new TypeError("Expected a string");
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Expected a string"
  console.log(err.stack);   // "TypeError: Expected a string at <file_path:line>"
}
```

---

<a id="q8"></a>
### ❓ Q8: What is "Error Cause" (ES2022)?

**Frequency:** 🟠 40%

**✅ Answer:** It is the modern way to **wrap and preserve original error stack traces** when rethrowing errors. It is the **single best improvement to error handling in 10 years.**

**🧪 Code:**

```javascript
try {
  await fetch("/api/user");
} catch (e) {
  // We wrap the original error 'e' inside the cause property
  throw new Error("Could not load profile page", { cause: e });
}
```

> **✅ Best Practice:** Always include the original error as `cause` when rethrowing to prevent losing the original context.

---

<a id="topic-3"></a>
## 📌 TOPIC 3: Built-in Error Types & Custom Errors

JavaScript has **7 standard built-in error types.** You should always use the most specific one.

| Error Type | Use case |
|-----------|----------|
| `Error` | Generic base error |
| `TypeError` | Wrong type, e.g., calling `null` as a function |
| `ReferenceError` | Accessing a variable that does not exist (not declared) |
| `SyntaxError` | Invalid syntax (code won't even parse) |
| `RangeError` | Value out of valid range |
| `URIError` | Invalid `encodeURI` / `decodeURI` |
| `AggregateError` | Multiple errors wrapped into one (e.g., `Promise.any()`) |

---

<a id="q9"></a>
### ❓ Q9: Provide common examples of these built-in errors.

**Frequency:** 🟡 70%

**🧪 Code:**

```javascript
console.log(doesNotExist);   // ReferenceError

null.toString();              // TypeError

(10).toString(100);           // RangeError (radix must be 2-36)

JSON.parse("bad json");       // SyntaxError
```

---

<a id="q10"></a>
### ❓ Q10: How do you create and use Custom Error Classes?

**Frequency:** 🟡 70% *(Senior Level)*

**✅ Answer:** You **extend the built-in Error class.** This allows you to create specific error types and use the `instanceof` operator in your `catch` block to handle different errors in different ways.

**🧪 Code:**

```javascript
// 1. Create Custom Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// 2. Use it
function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
  if (email === "admin@system.com") {
    throw new Error("System error occurred"); // Standard generic error
  }
}

// 3. Handle specific errors
try {
  validateEmail("bademail.com");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("User Mistake:", error.message); // Show to user in UI
  } else {
    console.log("System Crash:", error);          // Send to Datadog/Sentry
  }
}
```

---

<a id="topic-4"></a>
## 📌 TOPIC 4: Async Error Handling & Syntax Errors

---

<a id="q11"></a>
### ❓ Q11: Can try...catch catch Syntax Errors or Async Errors (like setTimeout)?

**Frequency:** 🟢 99%

**✅ Answer: NO to both.**

- **Syntax Errors:** If the code is structurally invalid (missing a `}`), the engine fails during the **parsing phase**. The code never executes, so `try/catch` cannot run.
- **Async Errors (setTimeout):** The `try...catch` block executes **synchronously**. By the time `setTimeout` runs its callback, the `try/catch` has already finished and left the call stack.

**🧪 Code (The Async Trap):**

```javascript
// ❌ WRONG: Catch will NOT trigger
try {
  setTimeout(() => {
    throw new Error("Async boom!");
  }, 1000);
} catch (e) {
  console.log("Caught:", e); // Never runs. App crashes!
}

// ✅ RIGHT: Put try/catch INSIDE the async callback
setTimeout(() => {
  try {
    throw new Error("Async boom!");
  } catch (e) {
    console.log("Safely caught:", e.message);
  }
}, 1000);
```

---

<a id="q12"></a>
### ❓ Q12: Correct error handling for modern async/await?

**Frequency:** 🟢 99%

**✅ Answer:** Unlike standard Promises which use `.catch()`, `async/await` allows you to handle asynchronous errors using standard, synchronous-looking `try...catch` blocks. **Uncaught promise rejections will crash your entire application.**

**🧪 Code:**

```javascript
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    return await res.json();
  } catch (e) {
    console.error("Failed to load user", e);
    return null;
  }
}
```

---

<a id="topic-5"></a>
## 📌 TOPIC 5: JavaScript Specific Quirks (Division By Zero)

---

<a id="q13"></a>
### ❓ Q13: How does JavaScript handle Division by Zero? Does it throw an error?

**Frequency:** 🟢 99% *(Trick Question)*

**✅ Answer: NO.** JavaScript does **NOT** throw an error when dividing by zero.
Because JS uses the **IEEE 754 standard** for math, dividing by zero returns `Infinity` (or `-Infinity`). Dividing `0 / 0` returns `NaN`.

> **This is a massive source of silent bugs.** You must manually check and throw an error if you want division by zero to fail.

**🧪 Code:**

```javascript
console.log(10 / 0);    // Output: Infinity  (❌ No error thrown)
console.log(-10 / 0);   // Output: -Infinity
console.log(0 / 0);     // Output: NaN

// ✅ Real-world use case: Manual Guard Clause
function safeDivide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

try {
  console.log(safeDivide(10, 0));
} catch (err) {
  console.log("Handled:", err.message); // Handled safely!
}
```

---

<a id="topic-6"></a>
## 📌 TOPIC 6: Real-World Use Cases & Advanced Patterns

---

<a id="pattern-1"></a>
### 1. Safe JSON Parse

`JSON.parse()` is a synchronous method that **completely crashes your app** if it receives invalid syntax. Always wrap it.

```javascript
function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Invalid JSON format");
    return fallback;
  }
}
```

---

<a id="pattern-2"></a>
### 2. The fetch API Error Trap (Crucial for Frontend)

The `fetch` API **only throws an error on network failures** (no internet). It **DOES NOT** throw an error for HTTP response errors like `404` or `500`. You must manually check `response.ok`.

```javascript
async function getUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);

    // ⚠️ CRITICAL: Manual check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
  }
}
```

---

<a id="pattern-3"></a>
### 3. Retry Pattern (Network Resilience)

```javascript
async function fetchWithRetry(url, retries = 3) {
  try {
    return await fetch(url);
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} left)`);
      return fetchWithRetry(url, retries - 1);
    }
    throw e; // Out of retries, propagate error
  }
}
```

---

<a id="pattern-4"></a>
### 4. Global Unhandled Error Catching

If an error slips past all `try...catch` blocks, you need a **global safety net.**

```javascript
// Browser Environment
window.addEventListener("error", (e) => console.error("Global Sync Error:", e.message));
window.addEventListener("unhandledrejection", (e) => console.error("Unhandled Promise:", e.reason));

// Node.js Environment
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception:', err);
  process.exit(1); // Usually best practice to restart the server
});
```

---

<a id="topic-7"></a>
## 📌 TOPIC 7: Best Practices & Anti-Patterns

---

<a id="good-patterns"></a>
### ✅ Good Patterns

| Practice | Description |
|----------|-------------|
| **Fail fast** | Throw early and explicitly instead of returning invalid values |
| **Handle specific errors** | Use custom errors and `instanceof`. Never catch all errors unless you absolutely have to |
| **Always add context** | `throw new Error(`Failed to load user ${userId}`, { cause: e });` |
| **Cleanup in finally** | Close connections, remove event listeners, release locks |

---

<a id="anti-patterns"></a>
### ❌ Worst Anti-Patterns

**1. Empty catch block ❌**

```javascript
try { doSomething(); } catch (e) {}
```

> **Why?** The single worst thing you can do. Errors are silently swallowed. You will never be able to debug anything.

**2. Catch and log only ❌**

```javascript
catch (e) { console.log(e); }
```

> **Why?** Almost as bad. Error is logged but the app continues in an invalid, corrupted state.

**3. Throw strings ❌**

```javascript
throw "error";
```

> **Why?** No stack trace.

**4. Overly broad catch-all ❌**

```javascript
catch (e) { return null; }
```

> **Why?** Hides all bugs, including your own typos and TypeErrors.

---

<a id="cheat-sheet"></a>
## 🎯 10 Common Interview Trick Questions Cheat Sheet

| # | Question / Code | Output / Answer |
|---|----------------|-----------------|
| 1 | Does `finally` run after a `return` in `try`? | ✅ Yes, always. |
| 2 | Is `try {} finally {}` valid without `catch`? | ✅ Yes. |
| 3 | Does division by zero throw an error? | ❌ No, returns `Infinity`. |
| 4 | Does `throw "string"` provide a stack trace? | ❌ No. Always use `new Error()`. |
| 5 | Does `try/catch` catch `setTimeout` errors? | ❌ No. Callbacks run in a different stack. |
| 6 | Can you rethrow an error inside `catch`? | ✅ Yes. |
| 7 | Does `catch (e) { throw e }` preserve the stack? | ✅ Yes. |
| 8 | Can you have multiple `catch` blocks in JS? | ❌ No. You must use `if/else` inside one `catch`. |
| 9 | What error does `null.toString()` throw? | `TypeError` |
| 10 | What error does `JSON.parse("")` throw? | `SyntaxError` |

---

<a id="mega-summary"></a>
## 🔥 Section 4 Mega Cheat Sheet Summary

| # | Rule | Key Point |
|---|------|-----------|
| 1 | **Flow** | `try` (attempts) ➡️ `catch` (if error) ➡️ `finally` (always) |
| 2 | **Return Override** | `return` in `finally` overrides `return` from `try` |
| 3 | **Always Throw Objects** | Never throw strings. Always `throw new Error("msg")` |
| 4 | **No Empty Catch** | Never swallow errors silently |
| 5 | **Async Trap** | `try/catch` cannot catch async callback errors (unless inside the callback) or syntax errors |
| 6 | **Async/Await** | Always wrap `await` in `try/catch` to prevent unhandled rejections |
| 7 | **Error Cause** | Use `{ cause: originalError }` when rethrowing (ES2022) |
| 8 | **Math Quirks** | Division by zero returns `Infinity`. Manually check `b === 0` |
| 9 | **JSON & Fetch** | Always wrap `JSON.parse()`. Manually check `!response.ok` for `fetch()` |
| 10 | **Fail Fast** | Handle specific errors, add context, and don't catch everything blindly |

---

<a id="practice-programs"></a>
## 💻 10 Progressive Practice Programs (Beginner → Advanced)

> To deeply understand Error Handling in JavaScript, you should practice progressive programs — from basic → real-world scenarios.

---

<a id="program-1"></a>
### 🚀 Level 1 — Program 1: Basic try-catch

> **Goal:** Understand how errors are caught

```javascript
try {
  console.log(a); // a is not defined
} catch (error) {
  console.log("Error caught:", error.message);
}

console.log("Program continues...");
```

**What you'll learn:**
- ✅ `try`
- ✅ `catch`
- ✅ `error.message`
- ✅ Program doesn't crash

---

<a id="program-2"></a>
### 🚀 Level 1 — Program 2: try-catch-finally

> **Goal:** Understand `finally` block

```javascript
try {
  let x = 10 / 0;
  console.log(x);
} catch (err) {
  console.log("Error:", err);
} finally {
  console.log("This always runs");
}
```

**What you'll learn:**
- ✅ `finally` always runs
- ✅ cleanup logic

---

<a id="program-3"></a>
### 🚀 Level 2 — Program 3: Custom Error using throw

```javascript
function checkAge(age) {
  if (age < 18) {
    throw new Error("You must be 18+");
  }
  return "Access granted";
}

try {
  console.log(checkAge(16));
} catch (err) {
  console.log(err.message);
}
```

**What you'll learn:**
- ✅ `throw`
- ✅ custom errors
- ✅ error handling logic

---

<a id="program-4"></a>
### 🚀 Level 3 — Program 4: JSON Parsing Error

```javascript
let data = '{"name":"Aadi", age:22}'; // Invalid JSON

try {
  let user = JSON.parse(data);
  console.log(user);
} catch (error) {
  console.log("Invalid JSON:", error.message);
}
```

**What you'll learn:**
- ✅ Real world error
- ✅ JSON errors

---

<a id="program-5"></a>
### 🚀 Level 4 — Program 5: Promise Error Handling

```javascript
function getUser() {
  return new Promise((resolve, reject) => {
    reject("User not found");
  });
}

getUser()
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));
```

**What you'll learn:**
- ✅ Promise errors
- ✅ `.catch()`

---

<a id="program-6"></a>
### 🚀 Level 5 — Program 6: Async/Await try-catch

```javascript
async function fetchData() {
  try {
    throw new Error("Network Error");
  } catch (error) {
    console.log("Caught:", error.message);
  }
}

fetchData();
```

**What you'll learn:**
- ✅ async await errors
- ✅ try catch with async

---

<a id="program-7"></a>
### 🚀 Level 6 — Program 7: Nested Error Handling

```javascript
try {
  try {
    throw new Error("Inner error");
  } catch (inner) {
    console.log("Inner:", inner.message);
    throw inner;
  }
} catch (outer) {
  console.log("Outer:", outer.message);
}
```

**What you'll learn:**
- ✅ Nested errors
- ✅ Error propagation

---

<a id="program-8"></a>
### 🚀 Level 7 — Program 8: Finally Override Return (Interview Favorite)

```javascript
function test() {
  try {
    return "try";
  } finally {
    return "finally";
  }
}

console.log(test());
```

**Output:**

```
finally
```

**What you'll learn:**
- 🔥 `finally` overrides `return`

---

<a id="program-9"></a>
### 🚀 Level 8 — Program 9: Custom Error Class (Advanced)

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (err) {
  console.log(err.name);    // "ValidationError"
  console.log(err.message); // "Invalid input"
}
```

**What you'll learn:**
- ✅ Custom error classes
- ✅ Advanced error handling

---

<a id="program-10"></a>
### 🚀 Level 9 — Program 10: Real World Form Validation

```javascript
function login(username, password) {
  try {
    if (!username) throw new Error("Username required");
    if (!password) throw new Error("Password required");

    console.log("Login successful");
  } catch (error) {
    console.log(error.message);
  }
}

login("Aadi", "");
```

---

<a id="mastery-checklist"></a>
## 🧠 Mastery Checklist — After These You'll Master:

| # | Concept | Status |
|---|---------|--------|
| 1 | `try` `catch` | ⬜ |
| 2 | `finally` | ⬜ |
| 3 | `throw` | ⬜ |
| 4 | Custom errors | ⬜ |
| 5 | Async error handling | ⬜ |
| 6 | Promise error handling | ⬜ |
| 7 | Nested errors | ⬜ |
| 8 | Real world scenarios | ⬜ |
| 9 | Error propagation | ⬜ |
| 10 | `instanceof` error checking | ⬜ |

---

<a id="challenge"></a>
## 🔥 Best Practice Challenge (Try Yourself)

Create programs for:

| # | Challenge | Difficulty |
|---|-----------|------------|
| 1 | Divide numbers (handle divide by zero) | ⭐ |
| 2 | Login system error handling | ⭐⭐ |
| 3 | API fetch error handling | ⭐⭐⭐ |
| 4 | JSON parser with fallback | ⭐⭐ |
| 5 | File upload error simulation | ⭐⭐⭐ |

---

<a id="visual-diagram"></a>
## 📊 Error Handling Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CODE EXECUTION                        │
│                         │                                │
│                    ┌────▼────┐                           │
│                    │   TRY   │                           │
│                    │  Block  │                           │
│                    └────┬────┘                           │
│                         │                                │
│              ┌──────────┼──────────┐                     │
│              │                     │                     │
│        ❌ Error?              ✅ No Error?               │
│              │                     │                     │
│        ┌─────▼─────┐              │                     │
│        │   CATCH   │              │                     │
│        │   Block   │              │                     │
│        └─────┬─────┘              │                     │
│              │                     │                     │
│              └──────────┬──────────┘                     │
│                         │                                │
│                  ┌──────▼──────┐                         │
│                  │   FINALLY   │ ◄── ALWAYS RUNS         │
│                  │    Block    │     (even after return)  │
│                  └──────┬──────┘                         │
│                         │                                │
│                    ┌────▼────┐                           │
│                    │  NEXT   │                           │
│                    │  CODE   │                           │
│                    └─────────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Error Propagation Flow:

```
┌──────────────────────────────────────────────────┐
│            ERROR PROPAGATION (BUBBLING)            │
│                                                    │
│  function C() { throw new Error("💥") }           │
│       ▲                                            │
│       │ Error bubbles up                           │
│  function B() { C(); }                             │
│       ▲                                            │
│       │ Error bubbles up                           │
│  function A() {                                    │
│    try { B(); }     ◄── Caught here!               │
│    catch(e) { ... }                                │
│  }                                                 │
│                                                    │
│  If NOT caught anywhere:                           │
│  ❌ Uncaught Exception → App Crashes               │
│  🛡️ Global handler catches it as last resort       │
└──────────────────────────────────────────────────┘
```

---

<a id="bonus-questions"></a>
## 🏆 Bonus: 10 Rapid-Fire Interview Questions

| # | Question | Your Answer |
|---|----------|-------------|
| 1 | What's the difference between `throw Error()` and `throw new Error()`? | Both work, but `new Error()` is the standard convention. `Error()` without `new` also returns an Error object in JS. |
| 2 | What happens if you throw inside a `finally` block? | The new error replaces any previous error or return value. |
| 3 | How do you handle errors in `Promise.all()`? | If ANY promise rejects, the entire `Promise.all()` rejects. Use `Promise.allSettled()` to get all results. |
| 4 | What is `Promise.allSettled()` vs `Promise.all()`? | `allSettled` waits for ALL promises (fulfilled or rejected). `all` fails fast on first rejection. |
| 5 | Can `try/catch` catch errors thrown in a different thread (Web Worker)? | ❌ No. Web Workers communicate via `message` and `error` events. |
| 6 | What is an `AggregateError`? | An error containing multiple errors, thrown by `Promise.any()` when ALL promises reject. |
| 7 | Does `async function` always return a Promise? | ✅ Yes. Even if you return a plain value, it's wrapped in `Promise.resolve()`. |
| 8 | What happens with `await` on a rejected promise without `try/catch`? | It throws an unhandled promise rejection, which can crash Node.js. |
| 9 | Can you use `try/catch` with generators? | ✅ Yes. You can call `generator.throw(error)` to inject errors. |
| 10 | What is the `error` event on `window`? | A global event that fires for uncaught runtime errors in the browser. |

---

> 📝 **End of Section 4 — Error Handling Complete Notes**
> 
> **Next Steps:**
> - ✅ Read through all 13 Q&As
> - ✅ Code all 10 practice programs
> - ✅ Complete the 5 challenges
> - ✅ Review the cheat sheet before interviews
> - ✅ Check off the mastery checklist items as you learn them
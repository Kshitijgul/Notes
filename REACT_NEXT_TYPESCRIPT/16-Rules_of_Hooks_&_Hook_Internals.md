<a id="16-rules-of-hooks-and-hook-internals"></a>

[⬅ Previous Chapter](#15-useeffect-complete-mastery) | [📖 Main Index](#main-index) | [Next Chapter ➡](#17-useref-complete-guide)

---

# Chapter 16: Rules of Hooks & Hook Internals

## 📌 Learning Objectives

By the end of this chapter, you will:

- **Understand** what Hooks are and the specific problems they were created to solve
- **Know** the two Rules of Hooks by heart and explain WHY each rule exists
- **Explain** React's internal hooks storage mechanism — the linked list on each Fiber node
- **Demonstrate** exactly what breaks when you violate the rules and why
- **Use** `eslint-plugin-react-hooks` to enforce correct hook usage automatically
- **Answer 10+ interview questions** on hook internals confidently

---

<a id="chapter-index-table-16"></a>

## Chapter Index Table

| Topic No. | Topic Name | Subtopics |
|-----------|-----------|-----------|
| 16.1 | [What are Hooks? History](#161-what-are-hooks-history-pre-hooks-pain) | Pre-hooks pain<br>HOC wrapper hell<br>Logic reuse problem |
| 16.2 | [The Two Rules of Hooks](#162-the-two-rules-of-hooks) | Top level only<br>React functions only<br>Why these rules |
| 16.3 | [Internal Working — Hooks Linked List](#163-internal-working--hooks-linked-list) | Fiber memoizedState<br>Hook order tracking<br>Why conditions break React |
| 16.4 | [ESLint Hooks Plugin](#164-eslint-hooks-plugin) | rules-of-hooks<br>exhaustive-deps |
| 💡 | [Interview Questions](#-interview-questions) | 10+ with Answers |
| 🧪 | [Practice Problems](#-practice-problems) | 5 Theory Questions |
| ⚡ | [Quick Revision](#-quick-revision) | Key bullets, traps |
| 📌 | [Chapter Summary](#-chapter-summary) | Final takeaways |

---

## 16.1 What are Hooks? History (pre-hooks pain)

<a id="161-what-are-hooks-history-pre-hooks-pain"></a>

### What are Hooks?

**Hooks** are special functions that let you "hook into" React features (state, lifecycle, context, refs, etc.) from **functional components**. They were introduced in **React 16.8** (February 2019) and represent the most significant change to React since its creation.

```jsx
// Before Hooks (React 16.7 and earlier):
// State and lifecycle ONLY available in class components

class Counter extends Component {
  state = { count: 0 };
  componentDidMount() { document.title = `Count: 0`; }
  componentDidUpdate() { document.title = `Count: ${this.state.count}`; }
  render() {
    return <button onClick={() => this.setState(s => ({ count: s.count + 1 }))}>
      {this.state.count}
    </button>;
  }
}

// After Hooks (React 16.8+):
// State and lifecycle in FUNCTIONAL components — cleaner!
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

### Problem 1: Logic Reuse Was Hard — HOC Wrapper Hell

Before Hooks, sharing **stateful logic** between components required Higher-Order Components (HOCs) or Render Props — both of which created deeply nested "wrapper hell."

```jsx
// ❌ PRE-HOOKS: Sharing "window size" logic required a HOC
function withWindowSize(WrappedComponent) {
  return class extends Component {
    state = { width: window.innerWidth, height: window.innerHeight };
    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    render() {
      return <WrappedComponent windowSize={this.state} {...this.props} />;
    }
  };
}

// Sharing "user data" required ANOTHER HOC
function withUser(WrappedComponent) {
  return class extends Component {
    state = { user: null };
    componentDidMount() { fetchUser().then(user => this.setState({ user })); }
    render() { return <WrappedComponent user={this.state.user} {...this.props} />; }
  };
}

// Sharing "online status" required YET ANOTHER HOC
function withOnlineStatus(WrappedComponent) { /* ... */ }

// Using all three:
const MyComponent = withOnlineStatus(withUser(withWindowSize(BaseComponent)));
// ↑ THREE WRAPPERS! "Wrapper hell" — hard to debug, ugly DevTools tree
```

```jsx
// ✅ POST-HOOKS: Same logic as custom hooks — no wrappers needed!
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUser().then(setUser); }, []);
  return user;
}

function useOnlineStatus() { /* ... */ }

// Usage — zero wrappers:
function MyComponent() {
  const windowSize = useWindowSize();
  const user = useUser();
  const isOnline = useOnlineStatus();
  // Clean, flat, composable!
}
```

---

### Problem 2: Logic Scattered Across Lifecycle Methods

Before Hooks, related logic was split across different lifecycle methods, making it hard to follow.

```jsx
// ❌ PRE-HOOKS: Subscription logic split in THREE places
class ChatRoom extends Component {
  componentDidMount() {
    // SETUP: Subscribe (setup here...)
    ChatAPI.subscribeToRoom(this.props.roomId, this.handleMessage);
  }

  componentDidUpdate(prevProps) {
    // UPDATE: Re-subscribe if roomId changed (different method!)
    if (prevProps.roomId !== this.props.roomId) {
      ChatAPI.unsubscribeFromRoom(prevProps.roomId, this.handleMessage);
      ChatAPI.subscribeToRoom(this.props.roomId, this.handleMessage);
    }
  }

  componentWillUnmount() {
    // CLEANUP: Unsubscribe (completely separate method!)
    ChatAPI.unsubscribeFromRoom(this.props.roomId, this.handleMessage);
  }

  handleMessage = (msg) => this.setState(s => ({ messages: [...s.messages, msg] }));
  render() { return <MessageList messages={this.state.messages} />; }
}

// ✅ POST-HOOKS: All subscription logic co-located in ONE useEffect
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Setup, update, AND cleanup — all in one place!
    const handleMessage = (msg) => setMessages(prev => [...prev, msg]);
    ChatAPI.subscribeToRoom(roomId, handleMessage);
    return () => ChatAPI.unsubscribeFromRoom(roomId, handleMessage);
  }, [roomId]);  // Re-runs when roomId changes — handles update too!

  return <MessageList messages={messages} />;
}
```

---

### Problem 3: Class Components' `this` Confusion

```jsx
// ❌ PRE-HOOKS: 'this' binding caused constant bugs
class Button extends Component {
  handleClick() {
    console.log(this);  // undefined! 'this' not bound
    this.setState({ clicked: true });  // TypeError: Cannot read properties of undefined
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
    // Bug: handleClick loses 'this' context
  }
}

// Three different fixes — each with tradeoffs:
// 1. .bind(this) in constructor
// 2. Arrow function in JSX: onClick={() => this.handleClick()}
// 3. Arrow class field: handleClick = () => {...}

// ✅ POST-HOOKS: No 'this' at all — just plain functions!
function Button() {
  const handleClick = () => {  // Just a regular function
    console.log('Clicked!');   // 'this' doesn't exist — no confusion
  };
  return <button onClick={handleClick}>Click</button>;
}
```

---

### 🧠 Hinglish Intuition

Hooks se pehle, React mein stateful logic likhna ek **bureaucratic office** jaisa tha. "State chahiye? Pehle class banao, constructor mein super(props) likho, yeh bhi bind karo, woh bhi bind karo." HOC use karna? "Ek wrapper ke andar doosra wrapper, phir teesra wrapper — ab DevTools mein 7 layers ka tree hai."

Hooks ek **direct hotline** ki tarah hain. `useState(0)` — bas, state mil gayi. `useEffect(() => {...})` — bas, side effect hook ho gaya. Koi class nahi, koi wrapper nahi, koi `this` ki tension nahi.

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.2 The Two Rules of Hooks

<a id="162-the-two-rules-of-hooks"></a>

### Rule 1: Only Call Hooks at the Top Level

**Never call Hooks inside:**
- Conditions (`if`, `switch`)
- Loops (`for`, `while`, `forEach`)
- Nested functions
- `try` / `catch` blocks

```jsx
// ❌ RULE VIOLATION: Hook inside condition
function UserProfile({ userId, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Login />;  // Early return — fine for JSX
  }

  // ❌ WRONG: useState called conditionally
  // On some renders: called. On others (when !isAuthenticated): skipped.
  // React's hook order is now unpredictable!
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);

  return <UserCard user={user} />;
}

// ✅ CORRECT: All hooks at top level, condition AFTER hooks
function UserProfile({ userId, isAuthenticated }) {
  // ALL hooks called unconditionally at the top
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;  // Condition INSIDE effect — fine!
    fetchUser(userId).then(setUser);
  }, [userId, isAuthenticated]);

  if (!isAuthenticated) return <Login />;  // Condition AFTER all hooks

  return <UserCard user={user} />;
}
```

```jsx
// ❌ RULE VIOLATION: Hook inside loop
function CommentList({ comments }) {
  const commentData = [];

  for (let i = 0; i < comments.length; i++) {
    // ❌ WRONG: useState inside a loop
    // Number of hooks changes if comments.length changes!
    const [expanded, setExpanded] = useState(false);
    commentData.push({ ...comments[i], expanded, setExpanded });
  }

  return commentData.map(c => <Comment key={c.id} {...c} />);
}

// ✅ CORRECT: Move state to the child component
function Comment({ comment }) {
  // Hook at top level of the component that needs it
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p>{comment.text}</p>
      {expanded && <p>{comment.fullText}</p>}
      <button onClick={() => setExpanded(e => !e)}>
        {expanded ? 'Less' : 'More'}
      </button>
    </div>
  );
}

function CommentList({ comments }) {
  return comments.map(c => <Comment key={c.id} comment={c} />);
}
```

```jsx
// ❌ RULE VIOLATION: Hook inside nested function
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // ❌ WRONG: Hook inside a regular function called from event handler
    const [loading, setLoading] = useState(false);  // Violates rules!
    setLoading(true);
    // ...
  };

  return <button onClick={handleSearch}>Search</button>;
}

// ✅ CORRECT: All hooks at top level
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);  // Top level!

  const handleSearch = () => {
    setLoading(true);  // Just call the setter — hook itself is at top
    // ...
  };

  return <button onClick={handleSearch}>Search</button>;
}
```

---

### Rule 2: Only Call Hooks from React Functions

Hooks can ONLY be called from:
- ✅ Functional components
- ✅ Custom Hooks (functions starting with `use`)

Hooks CANNOT be called from:
- ❌ Regular JavaScript functions
- ❌ Class components
- ❌ Event handlers (directly)
- ❌ `setTimeout` / `setInterval` callbacks
- ❌ Third-party functions

```jsx
// ❌ WRONG: Calling hook from regular JavaScript function
function calculateTotals(items) {
  // This is a regular function, not a React component or custom hook
  const [total, setTotal] = useState(0);  // ❌ Violates rules!
  return total;
}

// ❌ WRONG: Calling hook from event handler
function App() {
  const handleClick = () => {
    const [data, setData] = useState(null);  // ❌ Inside event handler!
  };
}

// ✅ CORRECT: Hook in functional component
function Counter() {
  const [count, setCount] = useState(0);  // ✅ Top-level in component
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ✅ CORRECT: Hook in custom hook (function starting with 'use')
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);  // ✅ Custom hook
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

---

### Why These Rules Exist

The rules exist because of **how React internally tracks hooks**. This is covered in depth in Section 16.3, but the key insight:

> React identifies which `useState`, `useEffect`, etc. to return on each render by their **order of invocation** — not by name, not by key. React maintains an ordered list of hook "slots" for each component. The Nth call to any hook gets the Nth slot's data.

```
First render of Counter component:
  Call 1: useState(0) → slot 1 (count = 0)
  Call 2: useState('') → slot 2 (name = '')
  Call 3: useEffect(fn) → slot 3 (effect)

Second render:
  Call 1: useState(0) → slot 1 (count = 0) ✅ Same slot, correct!
  Call 2: useState('') → slot 2 (name = '') ✅ Same slot, correct!
  Call 3: useEffect(fn) → slot 3 (effect) ✅ Same slot, correct!

If Call 1 is skipped (condition):
  Call 1: useState('') → slot 1 (count = 0?) ❌ WRONG DATA!
  Call 2: useEffect(fn) → slot 2 (name = '') ❌ WRONG DATA!
  All subsequent hooks are misaligned!
```

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.3 Internal Working — Hooks Linked List

<a id="163-internal-working--hooks-linked-list"></a>

### How React Tracks Hook Order per Fiber

Every React component has a corresponding **Fiber node** in the Fiber tree. Each Fiber node has a property called `memoizedState` that stores a **linked list** — one node per hook call, in the order they were called.

```
Fiber Node for Counter:
{
  type: Counter,
  memoizedState: HookNode1 → HookNode2 → HookNode3 → null
                 (useState)   (useState)   (useEffect)
}

HookNode structure:
{
  memoizedState: [current value],  // For useState: current state value
                                   // For useEffect: effect object {create, deps}
  queue: {...},                    // Update queue (for useState)
  next: HookNode2,                 // Pointer to next hook in chain
}
```

---

### The Linked List in Action

```jsx
function UserForm({ userId }) {
  // Hook call #1 — creates HookNode1 in linked list
  const [name, setName] = useState('');

  // Hook call #2 — creates HookNode2 in linked list
  const [email, setEmail] = useState('');

  // Hook call #3 — creates HookNode3 in linked list
  const [loading, setLoading] = useState(false);

  // Hook call #4 — creates HookNode4 in linked list
  useEffect(() => {
    fetchUser(userId).then(u => {
      setName(u.name);
      setEmail(u.email);
    });
  }, [userId]);

  return <form>...</form>;
}
```

```
Fiber(UserForm).memoizedState:
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │ HookNode #1  │ → │ HookNode #2  │ → │ HookNode #3  │ → │ HookNode #4  │ → null
  │ useState     │    │ useState     │    │ useState     │    │ useEffect    │
  │ state: ''    │    │ state: ''    │    │ state: false │    │ effect: {...}│
  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
  (name)              (email)             (loading)            (fetch effect)
```

**On every re-render:**
React walks this linked list from the beginning. The Nth hook call reads from the Nth node. This is why ORDER IS EVERYTHING.

---

### React's Internal Hook Dispatcher

```javascript
// Simplified conceptual implementation of React's hook internals

let currentFiber = null;
let workInProgressHook = null;

// Called when React starts rendering a component
function renderWithHooks(fiber, component, props) {
  currentFiber = fiber;
  workInProgressHook = null;  // Reset linked list traversal pointer

  // This sets up the hook dispatcher based on whether it's:
  // - First render (mount): uses HooksDispatcherOnMount
  // - Re-render (update): uses HooksDispatcherOnUpdate
  ReactCurrentDispatcher.current = isMount
    ? HooksDispatcherOnMount
    : HooksDispatcherOnUpdate;

  const result = component(props);  // Call your component function!
  return result;
}

// What useState does on MOUNT (first render):
function mountState(initialState) {
  // Create a new hook node
  const hook = {
    memoizedState: typeof initialState === 'function'
      ? initialState()    // Lazy initialization
      : initialState,
    queue: { pending: null },
    next: null,
  };

  // Append to linked list
  if (workInProgressHook === null) {
    currentFiber.memoizedState = hook;  // First hook in the list
  } else {
    workInProgressHook.next = hook;     // Append to end
  }
  workInProgressHook = hook;

  return [hook.memoizedState, dispatchSetState.bind(null, currentFiber, hook.queue)];
}

// What useState does on UPDATE (re-render):
function updateState() {
  // Move to the NEXT hook in the linked list
  // This is why order MUST be the same every render
  workInProgressHook = workInProgressHook === null
    ? currentFiber.memoizedState        // Start from beginning
    : workInProgressHook.next;          // Move to next node

  const hook = workInProgressHook;

  // Process any pending updates from setState calls
  processUpdateQueue(hook);

  return [hook.memoizedState, dispatchSetState.bind(null, currentFiber, hook.queue)];
}
```

---

### Why Conditional Hooks Break React — Concrete Example

```jsx
// Let's trace what happens when you break Rule 1:

// Initial state (first render):
// Hook call order:
// 1. useState('Alice')   → HookNode1 {state: 'Alice'}
// 2. useState('alice@example.com') → HookNode2 {state: 'alice@example.com'}
// 3. useEffect(fetchFn, [userId]) → HookNode3 {effect: fetchFn}

function BuggyComponent({ userId, showEmail }) {
  // Always at top level — call #1
  const [name, setName] = useState('Alice');

  // CONDITIONALLY called — violation!
  if (showEmail) {
    // Call #2 (only when showEmail = true)
    const [email, setEmail] = useState('alice@example.com');
  }

  // Call #2 OR #3 depending on showEmail!
  useEffect(() => {
    fetchUser(userId).then(u => setName(u.name));
  }, [userId]);
}

// FIRST RENDER (showEmail = true):
// Linked list:  [name: 'Alice'] → [email: 'alice@...'] → [effect]
// Hooks:        useState          useState                 useEffect

// SECOND RENDER (showEmail = false):
// Hook call 1: useState → reads HookNode1 → gets 'Alice' ✅
// Hook call 2: useEffect → reads HookNode2 → gets EMAIL DATA! ❌
//              React gives useEffect the email state from HookNode2
//              The effect function is trying to use email data as effect config!
// HookNode3 is ORPHANED — React doesn't know what to do with it

// React throws: "Rendered more hooks than during the previous render"
// OR silently returns wrong state — worse!
```

---

### Visual: Aligned vs Misaligned Hooks

```
✅ CORRECT — hooks always in same order:

Render 1:  useState → useState → useEffect
           node1     node2     node3
           ↑         ↑         ↑
Render 2:  useState → useState → useEffect
           node1     node2     node3
           (correctly reads its own node each time)

❌ BROKEN — conditional hook:

Render 1 (showEmail=true):  useState → useState → useEffect
                             node1     node2     node3
                             name      email     effect

Render 2 (showEmail=false): useState → useEffect
                             node1     node2
                             name      EMAIL???? ← useEffect reads email node!
                                       node3 is abandoned
```

---

### Mount vs Update Dispatchers

```javascript
// React uses DIFFERENT hook implementations for mount vs update:

// On FIRST RENDER (mount):
const HooksDispatcherOnMount = {
  useState: mountState,        // Creates new linked list nodes
  useEffect: mountEffect,
  useRef: mountRef,
  // ...
};

// On RE-RENDER (update):
const HooksDispatcherOnUpdate = {
  useState: updateState,       // READS EXISTING linked list nodes
  useEffect: updateEffect,
  useRef: updateRef,
  // ...
};

// This is why calling useState outside React functions throws:
// React's dispatcher is null when called outside a render!
// "Invalid hook call. Hooks can only be called inside of the body
//  of a function component."
```

---

### React's Error Detection

React detects hook count mismatches in development:

```javascript
// React counts hooks during render
let hookCount = 0;
function mountState(initialState) {
  hookCount++;
  // ...
}

// After render, React stores the count
fiber.hookCount = hookCount;

// On next render, if count changes:
if (hookCount !== fiber.hookCount) {
  throw new Error('Rendered more/fewer hooks than during the previous render.');
}
```

**Common error messages:**
```
Error: Rendered more hooks than during the previous render.
Error: Rendered fewer hooks than during the previous render.
Error: React Hook "useState" is called conditionally. React Hooks must be
       called in the exact same order in every component render.
```

---

### The `use` Hook (React 19) — A New Mental Model

```jsx
// React 19 introduced `use()` — a hook that CAN be called conditionally!
// This is a special exception, not a violation of the rules.
import { use } from 'react';

function Comment({ id }) {
  if (!id) return null;  // Early return allowed BEFORE use()

  // 'use' can be called in conditions (unique exception)
  const comment = use(fetchComment(id));  // Suspense-compatible
  return <p>{comment.text}</p>;
}
// Note: 'use' follows its own rules — it's built differently from regular hooks
// Regular hooks (useState, useEffect, etc.) still follow the Two Rules
```

---

### 🧠 Hinglish Intuition

React ka hook system ek **numbered locker system** hai. Pehli render mein tumne 3 hooks call kiye — React ne 3 lockers banaye: Locker #1 (count state), Locker #2 (name state), Locker #3 (effect).

Doosri render mein React jaata hai: "Locker #1 kholo" — useState wala locker, "Locker #2 kholo" — doosra useState, "Locker #3 kholo" — useEffect. Sab sahi data milta hai.

Agar tune condition mein hook laga diya — Locker #2 skip ho gayi! Ab doosri render mein "Locker #2 kholo" bologe toh useEffect ka locker khulega — galat data! Isliye order same rehna ZARURI hai, locker numbers fixed hain.

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.4 ESLint Hooks Plugin

<a id="164-eslint-hooks-plugin"></a>

### eslint-plugin-react-hooks

React team provides an official ESLint plugin that enforces the Rules of Hooks automatically. This catches violations before they cause bugs.

```bash
# Installation
npm install --save-dev eslint-plugin-react-hooks

# For Vite React projects — already included by default!
```

```javascript
// .eslintrc.json (legacy format)
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",    // Enforces Rules of Hooks
    "react-hooks/exhaustive-deps": "warn"      // Enforces correct deps
  }
}

// eslint.config.js (modern flat config format — used by Vite)
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Equivalent to:
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
```

---

### Rule 1: `react-hooks/rules-of-hooks`

Detects and errors on all Rules of Hooks violations:

```jsx
// ❌ ESLint ERROR: react-hooks/rules-of-hooks
// "React Hook 'useState' is called conditionally. React Hooks must be
//  called in the exact same order in every component render."

function Profile({ showDetails }) {
  if (showDetails) {
    const [details, setDetails] = useState(null);  // ← ERROR here
  }
  const [name, setName] = useState('');
}

// ❌ ESLint ERROR: Hook called outside component
function helper() {
  const [value, setValue] = useState(0);  // ← ERROR: not in component/custom hook
}

// ❌ ESLint ERROR: Hook inside class component
class MyClass extends Component {
  render() {
    const [x, setX] = useState(0);  // ← ERROR: class component, not functional
    return <div>{x}</div>;
  }
}

// ✅ ESLint PASSES: Correct usage
function GoodComponent() {
  const [name, setName] = useState('');    // Top level ✅
  const [age, setAge] = useState(0);       // Top level ✅
  useEffect(() => {}, []);                 // Top level ✅
  return <div>{name}: {age}</div>;
}

// ✅ ESLint PASSES: Custom hook
function useCustomHook() {
  const [state, setState] = useState(null);  // In custom hook ✅
  return [state, setState];
}
```

---

### Rule 2: `react-hooks/exhaustive-deps`

Detects missing or unnecessary dependencies in `useEffect`, `useMemo`, `useCallback`:

```jsx
// ❌ ESLint WARN: Missing dependency
function Component({ userId }) {
  useEffect(() => {
    fetchUser(userId);  // Uses userId...
  }, []);               // ...but not in deps!
  // Warning: "React Hook useEffect has a missing dependency: 'userId'.
  //            Either include it or remove the dependency array."
}

// ✅ ESLint PASSES: Correct deps
function Component({ userId }) {
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);  // userId included ✅
}

// ❌ ESLint WARN: Unstable object in deps
function Component() {
  const options = { size: 10 };  // New object every render!
  useEffect(() => {
    doSomething(options);
  }, [options]);  // Warning: options is recreated every render
}

// ✅ Fix: Move outside component or use useMemo
const OPTIONS = { size: 10 };  // Outside — stable reference
function Component() {
  useEffect(() => {
    doSomething(OPTIONS);
  }, []);  // No deps needed — OPTIONS is stable
}
```

---

### How the Plugin Knows What's a Hook

The plugin uses React's naming convention: **any function starting with `use` (case-sensitive) is treated as a hook**.

```jsx
// Treated as a hook (starts with 'use'):
useState, useEffect, useRef, useCallback, useMemo, useContext,
useMyCustomHook, useDataFetcher, useLocalStorage, useAuth

// NOT treated as a hook (doesn't start with 'use'):
getState, fetchData, handleClick, processInput

// This is why custom hooks MUST start with 'use'
// The plugin enforces Rules of Hooks for all 'use*' functions
```

---

### Configuring Severity

```javascript
// eslint.config.js — configure severity levels
{
  rules: {
    "react-hooks/rules-of-hooks": "error",  // "error" = build fails, red underline
    "react-hooks/exhaustive-deps": "warn",  // "warn" = yellow underline, doesn't fail build
    // Options: "off", "warn", "error"
  }
}

// Recommendation:
// rules-of-hooks: "error" — violations cause actual bugs, must be errors
// exhaustive-deps: "warn" — important but some edge cases need suppression
```

---

### Legitimate Suppression (Rare!)

```jsx
// Sometimes (rarely) exhaustive-deps false-positives require suppression
// ALWAYS document WHY you're suppressing

useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  fetchInitialData();
  // Why suppressed: fetchInitialData is stable (defined outside component)
  // and we intentionally only want this to run on mount, not when it changes.
  // In a real scenario, wrapping in useCallback or moving outside would be better.
}, []);

// NEVER suppress rules-of-hooks:
// That rule has NO legitimate false positives.
// Suppressing it means you're definitely breaking the rules.
```

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 💡 Interview Questions

<a id="-interview-questions"></a>

### Conceptual Questions

---

**Q1. What are React Hooks and why were they introduced?**

**Answer:**
React Hooks are functions that let you use React features (state, lifecycle, context, refs) in functional components. They were introduced in React 16.8 (February 2019) to solve three major problems with class components:

1. **Logic reuse difficulty** — Sharing stateful logic required HOCs or render props, creating "wrapper hell" — deeply nested component trees that were hard to debug.

2. **Logic scattering** — Related code was split across `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. `useEffect` co-locates all related logic.

3. **`this` keyword confusion** — Class components required method binding and careful management of `this`. Functions have no `this` — cleaner mental model.

Hooks made functional components first-class citizens for stateful logic, enabling simpler code reuse via custom hooks.

---

**Q2. State the Two Rules of Hooks and explain WHY each rule exists.**

**Answer:**

**Rule 1: Only call Hooks at the top level.**
- Never call hooks inside conditions, loops, or nested functions.
- **Why:** React identifies each hook by its **call order**. React stores hooks in a linked list on the Fiber node — the Nth hook call reads from the Nth node. If hooks are skipped (conditions) or repeated (loops), the call order changes between renders, causing React to match hooks to wrong nodes, corrupting state.

**Rule 2: Only call Hooks from React functions.**
- Call from functional components or custom hooks only.
- **Why:** React's hook dispatcher is only active during a component render. When you call `useState` outside a component render, React's internal dispatcher is `null` — there's no Fiber node to attach the hook to, so the hook has nowhere to store its state.

---

**Q3. What is the hooks linked list? How does React use it?**

**Answer:**
React stores all of a component's hook data in a **linked list** on the component's Fiber node (`fiber.memoizedState`). Each hook call creates one node in this list.

```
Fiber.memoizedState → HookNode1 → HookNode2 → HookNode3 → null
                      (useState)  (useEffect)  (useRef)
```

On the first render (mount): React creates these nodes and stores initial state.

On subsequent renders (update): React traverses the list from the beginning. The first hook call reads `HookNode1`, the second reads `HookNode2`, etc.

This is why hook ORDER must be consistent — React has no names or keys to identify hooks; it uses position in the list. If a hook is skipped (conditional) or added (loop), the positions shift and React reads the wrong data for subsequent hooks.

---

**Q4. What error does React throw when you violate the Rules of Hooks?**

**Answer:**
React throws errors like:
- `"React Hook 'useState' is called conditionally. React Hooks must be called in the exact same order in every component render."`
- `"Rendered more hooks than during the previous render."`
- `"Rendered fewer hooks than during the previous render."`
- `"Invalid hook call. Hooks can only be called inside of the body of a function component."`

These are caught by `eslint-plugin-react-hooks` at development time (lint errors) and also thrown as runtime errors in development mode. React counts hooks per render and compares counts — a mismatch triggers the error.

---

**Q5. Why do custom hooks need to start with `use`?**

**Answer:**
The `use` prefix is a naming convention that serves two purposes:

1. **ESLint plugin enforcement** — `eslint-plugin-react-hooks` identifies what functions are hooks by the `use` prefix (case-sensitive). Functions starting with `use` are subjected to Rules of Hooks enforcement. Without `use`, the plugin wouldn't apply the rules, and you could accidentally violate them.

2. **Human readability** — The `use` prefix signals to other developers: "This function uses hooks internally. Don't call it conditionally or in loops. This is not a regular utility function."

If you name a custom hook `getUser()` instead of `useUser()`:
- ESLint won't enforce Rules of Hooks inside it
- Developers won't know it contains hooks
- If someone calls it conditionally, they'll get a subtle bug

---

**Q6. What is "wrapper hell" and how do Hooks solve it?**

**Answer:**
"Wrapper hell" refers to the deeply nested component tree created when using Higher-Order Components (HOCs) to share stateful logic. When a component needed multiple HOCs:

```jsx
// Pre-hooks: deeply nested wrappers
const Enhanced = withAuth(withTheme(withRouter(withData(BaseComponent))));
// DevTools shows: withAuth → withTheme → withRouter → withData → BaseComponent
// 5 levels of nesting for 4 shared behaviors!
```

React DevTools showed confusing 5-level-deep component trees that were hard to debug.

Hooks solve this by composing behaviors WITHOUT wrappers:
```jsx
// Post-hooks: flat composition
function Component() {
  const auth = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const data = useData();
  // Same behaviors, zero extra DOM nodes, clean DevTools tree
}
```

---

**Q7. Can you call a custom hook conditionally if you define it to handle the condition internally?**

**Answer:**
No — you still cannot call the custom hook conditionally. The rule applies to the CALL SITE, not the hook's implementation.

```jsx
// ❌ WRONG — calling custom hook conditionally
function Component({ showData }) {
  if (showData) {
    const data = useMyData();  // Violates rules! ESLint error.
  }
}

// ✅ CORRECT — call hook unconditionally, handle condition inside
function Component({ showData }) {
  const data = useMyData(showData);  // Always call it

  // OR: handle condition inside the hook implementation:
  function useMyData(enabled) {
    const [data, setData] = useState(null);
    useEffect(() => {
      if (!enabled) return;  // Condition INSIDE the hook is fine
      fetchData().then(setData);
    }, [enabled]);
    return enabled ? data : null;
  }
}
```

The hook's IMPLEMENTATION can have conditions inside it. The CALL to the hook must be unconditional.

---

**Q8. What is the difference between `HooksDispatcherOnMount` and `HooksDispatcherOnUpdate`?**

**Answer:**
React uses different hook implementations depending on whether the component is being rendered for the first time or re-rendering:

**`HooksDispatcherOnMount`** (first render):
- Creates new nodes in the Fiber's hook linked list
- Initializes state with `initialState` (or calls the lazy initializer function)
- Creates new effects, refs, callbacks

**`HooksDispatcherOnUpdate`** (re-render):
- READS EXISTING nodes from the linked list (doesn't create new ones)
- Processes the state update queue (applies `setState` calls)
- Checks if effect deps changed to determine if effect should re-run
- Returns memoized values if deps haven't changed

This is why hook order is critical — `updateState` moves through the linked list assuming the same order as `mountState` established.

---

**Q9. What does `react-hooks/exhaustive-deps` check and should you always follow it?**

**Answer:**
`exhaustive-deps` checks that all reactive values used inside `useEffect`, `useCallback`, or `useMemo` are listed in the dependency array. A reactive value is any state, prop, context value, or variable derived from them — anything that could change between renders.

**Should you always follow it?** Yes, almost always:
- Missing deps = stale closure bugs where effects use outdated values
- The warning is almost always correct

**When to investigate instead of suppress:**
1. Infinite loop from object/function dep → fix with `useMemo`/`useCallback`
2. Stable function from outside component → move outside or verify stability
3. Complex logic requiring different structure → refactor the code

**When suppression might be justified (rare):**
- Deliberately running effect only on mount (document the reason)
- When the dep is provably stable but the linter can't verify it

Never suppress `rules-of-hooks` — it has no false positives.

---

**Q10. How does React know that you've called hooks in a different order than the previous render?**

**Answer:**
React tracks hook count during render. In development mode:

1. On mount: React counts hooks as they're called and stores the count in the Fiber.
2. On update: React counts again during the re-render.
3. After the component function finishes: React compares the current count to the stored count.
4. If different → throws "Rendered more/fewer hooks than during the previous render."

The linked list structure also reveals misalignment — if you call `useEffect` and it reads from a `useState` node (because the expected `useState` was skipped), React detects the type mismatch and throws.

Additionally, `eslint-plugin-react-hooks` does static analysis of your code during development (not at runtime) — it can catch most violations before the code even runs.

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 🧪 Practice Problems

<a id="-practice-problems"></a>

### Theory Questions

---

**T1. Identify all hook violations in this code and explain why each is wrong:**

```jsx
function Dashboard({ userId, isPremium }) {
  if (isPremium) {
    const [premiumData, setPremiumData] = useState(null);
  }

  for (let i = 0; i < 3; i++) {
    const [tab, setTab] = useState(i === 0);
  }

  const loadData = () => {
    const [loaded, setLoaded] = useState(false);
    setLoaded(true);
  };

  useEffect(() => {
    fetchDashboard(userId);
  }, []);

  return <div />;
}
```

**Expected Answer:**
1. `useState` inside `if (isPremium)` → conditional hook — skipped when `isPremium` is false, breaking hook order
2. `useState` inside `for` loop → loop hook — number of calls changes if loop count changes, breaking hook order
3. `useState` inside `loadData()` function → hook inside regular function (not a component or custom hook)
4. Missing `userId` in `useEffect` deps → stale closure bug (exhaustive-deps violation, not a rules-of-hooks violation but still a bug)

---

**T2. Explain the linked list structure for this component:**

```jsx
function App() {
  const [a, setA] = useState(1);
  const [b, setB] = useState('hello');
  const ref = useRef(null);
  useEffect(() => {}, [a]);
  const memo = useMemo(() => a * 2, [a]);
  return <div ref={ref}>{a} {b} {memo}</div>;
}
```

**Expected Answer:**
The Fiber node for App has `memoizedState` pointing to a linked list of 5 nodes:

```
Node1 {type: useState, state: 1, queue: {...}, next: Node2}
  → Node2 {type: useState, state: 'hello', queue: {...}, next: Node3}
    → Node3 {type: useRef, ref: {current: null}, next: Node4}
      → Node4 {type: useEffect, effect: {deps: [1], create: fn}, next: Node5}
        → Node5 {type: useMemo, memoizedState: 2, deps: [1], next: null}
```

On every re-render, React traverses this list in order — each hook call reads from its corresponding position. If the order changes, subsequent hooks read wrong data.

---

**T3. Why does this code work even though `useState` is after a condition?**

```jsx
function Profile({ userId }) {
  if (!userId) return <p>No user</p>;  // Early return BEFORE any hooks
  const [user, setUser] = useState(null);  // Called AFTER the condition
  return <p>{user?.name}</p>;
}
```

**Expected Answer:**
This actually VIOLATES the Rules of Hooks, even though it might appear to work in some scenarios. React and ESLint will flag this.

The issue: When `userId` is falsy, the component returns early and `useState` is NOT called. When `userId` becomes truthy, `useState` IS called. The hook count changes between renders.

**Correct approach:**
```jsx
function Profile({ userId }) {
  const [user, setUser] = useState(null);  // Always called first
  if (!userId) return <p>No user</p>;      // Condition AFTER all hooks
  return <p>{user?.name}</p>;
}
```

Or extract the conditional content to a child component:
```jsx
function ProfilePage({ userId }) {
  if (!userId) return <p>No user</p>;  // Fine — no hooks in this component
  return <ProfileContent userId={userId} />;  // Component with hooks
}
function ProfileContent({ userId }) {
  const [user, setUser] = useState(null);  // Hooks at top of THIS component
  // ...
}
```

---

**T4. What's the difference in how React handles hook calls on mount vs update?**

**Expected Answer:**
**On mount (first render):**
- React uses `HooksDispatcherOnMount`
- Each hook call CREATES a new node in the linked list
- `useState(0)` → allocates node, sets `memoizedState = 0`
- Returns `[0, setterFunction]`

**On update (re-render):**
- React uses `HooksDispatcherOnUpdate`
- Each hook call READS the EXISTING node from the list (no new allocation)
- `useState(0)` → moves pointer to next node, reads `memoizedState`, processes any pending updates (from setState calls)
- The initial value `0` is IGNORED on update — only used on mount
- Returns `[currentState, setterFunction]`

This explains why `useState(computeExpensiveValue())` runs on every render — the argument is evaluated each time, even though it's only USED on mount. Solution: `useState(() => computeExpensiveValue())` (lazy initialization).

---

**T5. How does `eslint-plugin-react-hooks` know what functions are hooks without running the code?**

**Expected Answer:**
The plugin uses **static analysis** — it analyzes the source code structure without executing it. Specifically:

1. **Naming convention:** Any function identifier starting with `use` (case-sensitive, followed by an uppercase letter) is treated as a hook. This is why the convention is strict — the plugin relies on it.

2. **Call site analysis:** For each call to a `use*` function, the plugin checks:
   - Is it inside a conditional block? → Rule 1 violation
   - Is it inside a loop? → Rule 1 violation
   - Is it inside a nested function? → Rule 1 violation
   - Is it inside a React component or custom hook? → Rule 2 check

3. **Component detection:** The plugin identifies React components as either:
   - Functions returning JSX (identified by JSX syntax in the return value)
   - Functions with names starting with uppercase

4. **`exhaustive-deps`:** The plugin reads the effect body, finds all identifiers used (variables, props, state), compares to the deps array — warns if any reactive value is missing or unnecessary items are included.

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## ⚡ Quick Revision

<a id="-quick-revision"></a>

### Key Definitions

| Term | One-Line Definition |
|------|-------------------|
| **Hooks** | Functions to use React features in functional components (introduced 16.8) |
| **Rules of Hooks** | Only call at top level; only call from React functions |
| **Fiber node** | React's internal representation of a component instance |
| **memoizedState** | Fiber property storing the linked list of hook state |
| **Hook linked list** | Ordered chain of hook nodes — one per hook call, in call order |
| **HooksDispatcherOnMount** | Hook implementations used on first render (create nodes) |
| **HooksDispatcherOnUpdate** | Hook implementations used on re-renders (read existing nodes) |
| **HOC wrapper hell** | Deep component nesting from multiple Higher-Order Components |
| **eslint-plugin-react-hooks** | ESLint plugin enforcing Rules of Hooks automatically |
| **rules-of-hooks** | ESLint rule catching hook position violations |
| **exhaustive-deps** | ESLint rule catching missing/extra useEffect dependencies |
| **Custom hook** | A function starting with `use` that can call other hooks |

---

### The Two Rules — Memory Aid

```
Rule 1: TOP LEVEL ONLY
  ❌ if, else, switch
  ❌ for, while, forEach
  ❌ nested functions
  ✅ Always at the top of your component

Rule 2: REACT FUNCTIONS ONLY
  ✅ Functional components
  ✅ Custom hooks (use* functions)
  ❌ Regular functions
  ❌ Class components
  ❌ Event handlers directly
  ❌ setTimeout/setInterval callbacks
```

---

### Hook Linked List — Quick Mental Model

```
Each render: React walks the list top to bottom
Each hook call: reads one node from the list (in order)

Fiber.memoizedState:
  useState → useEffect → useRef → useMemo → null
  (node 1)   (node 2)   (node 3)  (node 4)

Same component, same order every render ✅
Different order = wrong data read ❌
Missing call = all subsequent hooks shift ❌
```

---

### Common Interview Traps

> [!IMPORTANT]
> **Trap 1:** "Hooks can be called in custom hooks conditionally."
> **Reality:** The CALL to a custom hook must be unconditional. The hook's IMPLEMENTATION can have conditions inside it.

> [!IMPORTANT]
> **Trap 2:** "useState's initial value is used every render."
> **Reality:** Initial value is ONLY used on mount. On updates, it's evaluated but ignored. Use lazy initialization `() => compute()` to avoid computing it every render.

> [!IMPORTANT]
> **Trap 3:** "Early return before hooks is fine."
> **Reality:** Early return before hooks violates Rule 1 — subsequent renders may not reach the hooks, changing the count. All hooks must come before any conditional returns.

> [!IMPORTANT]
> **Trap 4:** "Custom hooks don't need to follow Rules of Hooks."
> **Reality:** Custom hooks MUST follow the rules — both in how they call other hooks AND in how they're called.

> [!IMPORTANT]
> **Trap 5:** "You can suppress `rules-of-hooks` ESLint warnings for edge cases."
> **Reality:** `rules-of-hooks` has no legitimate false positives. Suppressing it means you're definitely breaking the rules. Restructure your code instead.

---

### Revision Bullets

- Hooks introduced React 16.8 — solved class component pain: HOC hell, logic scattering, `this` confusion
- Rule 1: Top level ONLY — no conditions, loops, nested functions
- Rule 2: React functions ONLY — functional components or custom hooks (use*)
- Hook storage: `fiber.memoizedState` = linked list, one node per hook call
- Mount: `HooksDispatcherOnMount` creates nodes | Update: `HooksDispatcherOnUpdate` reads nodes
- React identifies hooks by call ORDER, not name — order must be identical every render
- Conditional hook → misaligned linked list → wrong state returned → bug or error
- Error: "Rendered more/fewer hooks than during the previous render"
- Custom hooks MUST start with `use` — ESLint relies on this convention
- `eslint-plugin-react-hooks` provides two rules: `rules-of-hooks` (error) and `exhaustive-deps` (warn)
- `rules-of-hooks` has zero false positives — never suppress it
- `exhaustive-deps` prevents stale closure bugs — follow it, fix root causes don't suppress
- React 19's `use()` hook is a special exception — can be called conditionally (different internals)
- Hooks cannot be called from class components, regular functions, event handlers, or async callbacks

---

👉 <a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 📌 Chapter Summary

<a id="-chapter-summary"></a>

### Most Important Interview Points

1. **Hooks solve three class component problems** — HOC wrapper hell (logic reuse), lifecycle method scattering (logic co-location), and `this` keyword confusion. They make stateful logic composable via custom hooks without extra component nesting.

2. **Rule 1: Top level only** — Hooks must be called at the top of the component function, not inside conditions, loops, or nested functions. The order must be identical on every render.

3. **Rule 2: React functions only** — Only in functional components and custom hooks. Not in regular functions, class components, or callbacks.

4. **WHY these rules: the linked list** — React stores hook data in an ordered linked list on the Fiber node. The Nth hook call always reads the Nth node. If order changes, data is mismatched. There are no names or keys — only position.

5. **Mount vs Update dispatch** — `HooksDispatcherOnMount` creates nodes (first render). `HooksDispatcherOnUpdate` reads existing nodes (re-renders). Initial value passed to `useState` is only used during mount.

6. **Custom hooks must start with `use`** — This convention enables ESLint enforcement and signals to developers that the function contains hooks and must follow their rules.

7. **`eslint-plugin-react-hooks`** — Two rules: `rules-of-hooks` (error, no exceptions) and `exhaustive-deps` (warn, rare legitimate suppressions). Install it, follow it.

8. **Conditional hook = broken linked list** — If a hook is conditionally skipped, all subsequent hooks read one position ahead of their correct data. React throws in development, silently corrupts in production.

### Key Practical Takeaways

- Always put hooks before any conditional returns in your component
- Use the `use` prefix for ALL custom hooks — no exceptions
- Install `eslint-plugin-react-hooks` in every React project (Vite includes it by default)
- Never suppress `rules-of-hooks` ESLint errors — restructure instead
- When `exhaustive-deps` warns about infinite loops, fix with `useMemo`/`useCallback`
- Move logic to child components when you need different hook counts based on conditions

### Common Mistakes

❌ Putting hooks after conditional early returns
❌ Calling hooks inside `if` conditions — even simple ones
❌ Using hooks inside `for` loops to handle multiple items (move to child component)
❌ Calling hooks inside event handlers or callbacks
❌ Writing custom hooks without the `use` prefix
❌ Suppressing `rules-of-hooks` ESLint errors
❌ Thinking `useState`'s initial value is re-evaluated on every render update (it's ignored)
❌ Calling hooks inside class component methods
❌ Nesting custom hook calls inside another function inside a component

---

[⬅ Previous Chapter](#15-useeffect-complete-mastery) | [📖 Main Index](#main-index) | [Next Chapter ➡](#17-useref-complete-guide)

---

*Chapter 16 Complete — Rules of Hooks & Hook Internals | Part G*
<a id="15-useeffect-complete-mastery"></a>

[⬅ Previous Chapter](#14-component-lifecycle) | [📖 Main Index](#main-index) | [Next Chapter ➡](#16-rules-of-hooks-and-hook-internals)

---

# Chapter 15: useEffect — Complete Mastery

## 📌 Learning Objectives

By the end of this chapter, you will:

- **Define** what a side effect is and identify every category
- **Master** all three forms of `useEffect` — no deps, empty deps, with deps
- **Write** proper cleanup functions for timers, listeners, fetches, subscriptions
- **Diagnose** the stale closure problem and fix it correctly
- **Explain** the referential equality trap with objects and functions in deps
- **Apply** the 5 most common useEffect patterns in real code
- **Know** when NOT to use useEffect — derived state, event-triggered actions
- **Distinguish** `useEffect` vs `useLayoutEffect` vs `useInsertionEffect`
- **Understand** Strict Mode double-firing and write cleanup-safe effects
- **Write** correct async patterns in useEffect — IIFE, named function
- **Solve** race conditions using `AbortController` and ignore flags
- **Answer 15+ interview questions** on useEffect deeply

---

<a id="chapter-index-table-15"></a>

## Chapter Index Table

| Topic No. | Topic Name | Subtopics |
|-----------|-----------|-----------|
| 15.1 | [What is a Side Effect?](#151-what-is-a-side-effect-examples) | Data fetching, subscriptions, timers, DOM |
| 15.2 | [useEffect Syntax — All Forms](#152-useeffect-syntax--all-forms) | No deps / Empty deps / With deps |
| 15.3 | [Cleanup Function](#153-cleanup-function--when--why) | Timers, listeners, fetch, subscriptions |
| 15.4 | [Dependency Array Deep Dive](#154-dependency-array-deep-dive) | What goes in deps, stale closure, equality trap |
| 15.5 | [Common useEffect Patterns](#155-common-useeffect-patterns) | Fetch, listener, timer, subscription |
| 15.6 | [You Might Not Need an Effect](#156-you-might-not-need-an-effect) | Derived state, events, prop-reset |
| 15.7 | [useEffect vs useLayoutEffect](#157-useeffect-vs-uselayouteffect) | Timing, paint phase, useInsertionEffect |
| 15.8 | [Strict Mode Double-Firing](#158-strict-mode-double-firing) | Why, cleanup-safe patterns |
| 15.9 | [Async in useEffect](#159-async-in-useeffect--correct-pattern) | Why can't be async, IIFE, named function |
| 15.10 | [Race Conditions & AbortController](#1510-race-conditions--abortcontroller) | Stale response, AbortController, ignore flag |
| 💡 | [Interview Questions](#-interview-questions) | 15+ with Answers |
| 🧪 | [Practice Problems](#-practice-problems) | 5 Coding + 5 Theory + 2 Machine Coding |
| 🚀 | [Mini Project](#-mini-project) | Real-time Search with Debounce + AbortController |
| ⚡ | [Quick Revision](#-quick-revision) | Key bullets, traps |
| 📌 | [Chapter Summary](#-chapter-summary) | Final takeaways |

---

## 15.1 What is a Side Effect? Examples

<a id="151-what-is-a-side-effect-examples"></a>

### What is it?

A **side effect** is any operation that interacts with something **outside** the React component's render process. React's render phase must be **pure** — same input always produces same output, no external modifications. Anything that breaks this purity is a side effect.

```
PURE (no side effects):
  const doubled = value * 2;           // Just computation
  const filtered = items.filter(fn);  // Just computation
  return <p>{value}</p>;               // Just returning JSX

SIDE EFFECTS (interact with outside world):
  fetch('/api/data')                   // Network I/O
  localStorage.setItem('k', 'v')      // Browser storage
  document.title = 'New Title'         // DOM manipulation
  setInterval(fn, 1000)               // Timer setup
  socket.on('message', fn)            // External subscription
  console.log(value)                  // I/O operation
```

---

### Categories of Side Effects

```jsx
// 1. DATA FETCHING — network requests
useEffect(() => {
  fetch('/api/users').then(r => r.json()).then(setUsers);
}, []);

// 2. SUBSCRIPTIONS — real-time data streams
useEffect(() => {
  const socket = io('wss://api.example.com');
  socket.on('message', setMessages);
  return () => socket.disconnect();
}, []);

// 3. TIMERS — setTimeout, setInterval
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);

// 4. DOM MANIPULATION — accessing or modifying the DOM directly
useEffect(() => {
  document.title = `${count} notifications`;
}, [count]);

// 5. EVENT LISTENERS — adding listeners to global objects
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);

// 6. BROWSER STORAGE — reading/writing localStorage
useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

// 7. EXTERNAL LIBRARY INITIALIZATION
useEffect(() => {
  const map = new mapboxgl.Map({ container: mapRef.current });
  return () => map.remove();
}, []);

// 8. LOGGING & ANALYTICS
useEffect(() => {
  analytics.track('page_view', { page: currentPage });
}, [currentPage]);
```

---

### 🧠 Hinglish Intuition

Side effect aise hai jaise ek **invisible hand** jo component ke bahar kaam karta hai. Jab tum `<User name="Alice" />` render karte ho, woh sirf Alice ka naam dikhata hai — yeh pure hai. Lekin agar component background mein Alice ka data fetch kare, browser title update kare, ya koi timer chalaaye — yeh sab "side effects" hain. React bolti hai: "Render ke dauran sirf calculate karo, baaki sab kaam `useEffect` mein karo."

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.2 useEffect Syntax — All Forms

<a id="152-useeffect-syntax--all-forms"></a>

### The Three Forms

```jsx
import { useEffect } from 'react';

// FORM 1: No dependency array
useEffect(() => {
  // Runs after EVERY render (mount + every update)
  // Rarely useful — consider if you actually need this
});

// FORM 2: Empty dependency array
useEffect(() => {
  // Runs ONCE after first render (mount only)
  // Equivalent to componentDidMount
}, []);

// FORM 3: With dependency array
useEffect(() => {
  // Runs after mount AND whenever any dep value changes
  // Equivalent to componentDidMount + componentDidUpdate for those deps
}, [dep1, dep2, dep3]);
```

---

### Form 1: No Dependency Array

```jsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);

  // ❌ Runs after EVERY render — usually too frequent
  useEffect(() => {
    console.log('Rendered!');  // Logs on EVERY render
  });

  // When is no deps actually useful?
  // Almost never — you almost always want either [] or [deps]
  // One rare case: when you genuinely need to sync with EVERY render
  useEffect(() => {
    // This runs after every render — can be useful for:
    // - Debugging (log every render)
    // - Syncing to external non-reactive system after every update
  });

  return <p>Scroll: {scrollY}</p>;
}
```

---

### Form 2: Empty Dependency Array

```jsx
function AppInitializer() {
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(null);

  // Runs ONCE on mount — perfect for one-time setup
  useEffect(() => {
    // ✅ Initial data fetch
    fetchCurrentUser().then(setUser);

    // ✅ Load app configuration
    fetchAppConfig().then(setConfig);

    // ✅ Initialize third-party services
    analytics.initialize();

    // ✅ Register global event listeners
    const handler = (e) => handleGlobalError(e);
    window.addEventListener('error', handler);

    return () => {
      window.removeEventListener('error', handler);
    };
  }, []);  // ← [] = only mount

  return <App user={user} config={config} />;
}
```

---

### Form 3: With Dependencies

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs on mount AND whenever userId changes
  useEffect(() => {
    setLoading(true);
    setUser(null);

    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);  // ← Runs when userId changes

  return loading ? <Spinner /> : <UserCard user={user} />;
}

// Multiple dependencies:
function FilteredList({ category, sortOrder, page }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems({ category, sortOrder, page }).then(setItems);
  }, [category, sortOrder, page]);
  // Re-fetches when ANY of these three change

  return <List items={items} />;
}
```

---

### Execution Timing

```
RENDER PHASE    ←───────── React calls component function
                           Returns JSX
                           React diffs VDOM

DOM UPDATE      ←───────── React updates real DOM

                ↓ (browser may paint here)

EFFECT FIRES    ←───────── useEffect callback runs
                           (AFTER paint, asynchronously)
```

---

### 🧠 Hinglish Intuition

`useEffect` ke teen forms aise samjho:
- **No deps** = "Har baar class ke baad homework karo" — bahut zyada mehnat
- **Empty deps `[]`** = "Sirf pehle din school jaao" — ek baar setup
- **Deps array** = "Jab bhi subject badle, naya syllabus padho" — specific trigger

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.3 Cleanup Function — When & Why

<a id="153-cleanup-function--when--why"></a>

### What is Cleanup?

The cleanup function is the function you **return** from a `useEffect` callback. React calls it:
1. **Before** the component unmounts (removes from DOM)
2. **Before** the effect runs again (when deps change)

This ensures you never have "ghost" effects running after a component is gone.

---

### When Cleanup Runs

```jsx
useEffect(() => {
  console.log('Effect runs!');    // Runs on mount/dep-change
  return () => {
    console.log('Cleanup runs!'); // Runs before next effect OR on unmount
  };
}, [someValue]);

// Timeline when someValue changes: A → B → unmount:
// 1. Mount: "Effect runs!" (someValue = A)
// 2. Value changes to B: "Cleanup runs!" (cleaning A's effect) → "Effect runs!" (B)
// 3. Unmount: "Cleanup runs!" (cleaning B's effect)
```

---

### Pattern 1: Clear Timers

```jsx
function CountdownTimer({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;

    // Setup timer
    const id = setTimeout(() => {
      setRemaining(prev => prev - 1);
    }, 1000);

    // CLEANUP: Clear timer if component unmounts or remaining changes
    return () => {
      clearTimeout(id);  // Prevents multiple timers stacking up
    };
  }, [remaining]);  // Re-runs each second as remaining changes

  return <p>Time left: {remaining}s</p>;
}

// Interval cleanup:
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // ✅ MUST return cleanup — otherwise interval continues after unmount!
    return () => clearInterval(intervalId);
    // Without this: interval keeps running, tries to setState on unmounted component
    // → Memory leak + React warning
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
```

---

### Pattern 2: Remove Event Listeners

```jsx
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.round((scrollTop / docHeight) * 100));
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });

    // ✅ CLEANUP: Remove the exact same listener
    // Must use same function reference!
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);
  // Empty deps: add once, remove on unmount

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: `${progress}%`, height: '3px', backgroundColor: '#3b82f6' }} />
  );
}
```

---

### Pattern 3: Abort Fetch Requests

```jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => setUser(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Fetch failed:', err);
        }
        // AbortError is expected — ignore it
      });

    // CLEANUP: Abort the fetch if userId changes or component unmounts
    return () => controller.abort();
    // Without this: old fetch completes and tries to set state for wrong userId
    // → Race condition (see Section 15.10)
  }, [userId]);

  return user ? <UserCard user={user} /> : <Spinner />;
}
```

---

### Pattern 4: Unsubscribe from Subscriptions

```jsx
function LiveChat({ channelId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to channel
    const subscription = chatService.subscribe(channelId, (message) => {
      setMessages(prev => [...prev, message]);
    });

    // CLEANUP: Unsubscribe when channelId changes or component unmounts
    return () => {
      subscription.unsubscribe();
      // Or: chatService.unsubscribe(channelId, callback);
    };
  }, [channelId]);  // Re-subscribe when channelId changes

  return <MessageList messages={messages} />;
}
```

---

### What Happens Without Cleanup (Memory Leaks)

```jsx
// ❌ MEMORY LEAK — no cleanup
function LeakyComponent({ id }) {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick for id:', id);
      // If component unmounts and remounts with new id:
      // Old interval keeps running → accumulates over time
      // Each remount adds ANOTHER interval that never stops
    }, 1000);
    // No return statement = no cleanup = interval runs forever
  }, [id]);
}

// If this component mounts/unmounts 5 times:
// → 5 intervals all running simultaneously
// → 5 console.logs per second, 10, 15...
// → Eventually: performance degradation, memory exhaustion
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.4 Dependency Array Deep Dive

<a id="154-dependency-array-deep-dive"></a>

### What Goes in the Dependency Array

```
RULE: Include EVERY reactive value used inside the effect
      that could change between renders.

Reactive values:
  ✅ State variables (useState)
  ✅ Props
  ✅ Context values
  ✅ Variables derived from state/props
  ✅ Functions defined in component that use state/props
  ✅ Object/array values defined in component

NOT reactive (don't need to include):
  ❌ Stable references: setState/dispatch functions (guaranteed stable)
  ❌ Refs: ref.current (mutable, not reactive)
  ❌ Constants defined OUTSIDE the component
  ❌ Primitive constants inside component (unless they could change)
```

---

### The Stale Closure Problem

```jsx
// ❌ Classic stale closure bug
function IntervalCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);  // ← 'count' is captured at mount time (0)
      // count is ALWAYS 0 here — never updates!
      // This is a stale closure
    }, 1000);

    return () => clearInterval(id);
  }, []);  // ← Empty deps: effect runs once, count captured once (= 0)
  // Result: count goes to 1, then stays at 1 (0 + 1 = 1 every time)

  return <p>Count: {count}</p>;
}

// ✅ Fix 1: Add count to deps (but creates new interval every second)
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);  // Re-creates interval every time count changes
// Works but inefficient — new interval each second

// ✅ Fix 2: Functional updater (best for intervals)
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);  // ← prev = latest value, no stale closure!
  }, 1000);
  return () => clearInterval(id);
}, []);  // Empty deps is now correct — functional updater doesn't need count
```

---

### Objects and Functions in Deps — The Referential Equality Trap

```jsx
// ❌ PROBLEM: New object on every render → infinite loop
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // This object is created NEW on every render
  const options = { headers: { 'Authorization': 'Bearer token' } };

  useEffect(() => {
    fetch(`/api/users/${userId}`, options).then(...);
  }, [userId, options]);  // 'options' is a new object every render!
  // Every render: options changes (new reference) → effect runs → fetch → setUser → render → options changes → ...
  // INFINITE LOOP!
}

// ✅ Fix 1: Move object outside component (if it's constant)
const OPTIONS = { headers: { 'Authorization': 'Bearer token' } };  // Outside component

function UserProfile({ userId }) {
  useEffect(() => {
    fetch(`/api/users/${userId}`, OPTIONS).then(...);
  }, [userId]);  // OPTIONS is stable — outside component
}

// ✅ Fix 2: useMemo for dynamic objects
function UserProfile({ userId, authToken }) {
  const options = useMemo(() => ({
    headers: { 'Authorization': `Bearer ${authToken}` }
  }), [authToken]);  // Only recreates when authToken changes

  useEffect(() => {
    fetch(`/api/users/${userId}`, options).then(...);
  }, [userId, options]);  // options is now stable reference
}

// ✅ Fix 3: useCallback for functions
function SearchResults({ query, onResultsLoaded }) {
  // ❌ onResultsLoaded might be new function every parent render
  useEffect(() => {
    search(query).then(onResultsLoaded);
  }, [query, onResultsLoaded]);  // Might cause infinite loop!

  // ✅ Wrap in useCallback in parent:
  // const onResultsLoaded = useCallback((results) => setResults(results), []);
}
```

---

### eslint-plugin-react-hooks — exhaustive-deps

```jsx
// The ESLint plugin warns when deps are wrong
// Always follow its suggestions!

// ❌ ESLint warning: React Hook useEffect has a missing dependency: 'userId'
useEffect(() => {
  fetchUser(userId);  // Uses userId but...
}, []);  // ...not in deps!

// ✅ Fix: Add userId to deps
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ❌ Suppressing warnings with disable comment is usually wrong:
// eslint-disable-next-line react-hooks/exhaustive-deps
// Only do this if you KNOW what you're doing and have a documented reason

// ✅ Understanding when to move logic:
// If adding a dep causes infinite loops → the issue is usually:
// 1. Unstable function/object reference (fix with useCallback/useMemo)
// 2. Missing cleanup
// 3. Effect should not depend on that value (restructure the code)
```

---

### Dependency Comparison — How React Checks

```jsx
// React uses Object.is() to compare deps between renders:
Object.is(0, 0)           // true  → no re-run
Object.is('a', 'a')       // true  → no re-run
Object.is(null, null)     // true  → no re-run
Object.is({}, {})         // false → RE-RUN! (different references)
Object.is([], [])         // false → RE-RUN! (different references)
Object.is(fn, fn)         // depends on if same reference

// This is why objects and functions in deps are problematic —
// they usually get new references each render
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.5 Common useEffect Patterns

<a id="155-common-useeffect-patterns"></a>

### Pattern 1: Data Fetching Pattern

```jsx
function ProductList({ categoryId, page }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;  // Ignore-flag for race condition prevention
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/products?category=${categoryId}&page=${page}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        if (isMounted) {  // Only update state if still mounted
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [categoryId, page]);

  if (loading) return <ProductSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  return <Grid items={products} />;
}
```

---

### Pattern 2: Event Listener Pattern

```jsx
function useKeyPress(targetKey) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === targetKey) setIsPressed(true);
    };

    const handleKeyUp = (e) => {
      if (e.key === targetKey) setIsPressed(false);
    };

    // Add to window for global keypress detection
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey]);  // Re-bind if targetKey changes

  return isPressed;
}

// Usage:
function App() {
  const isEscapePressed = useKeyPress('Escape');
  const isEnterPressed = useKeyPress('Enter');

  return (
    <div>
      <p>Escape: {isEscapePressed ? 'Pressed' : 'Released'}</p>
      <p>Enter: {isEnterPressed ? 'Pressed' : 'Released'}</p>
    </div>
  );
}
```

---

### Pattern 3: Timer / Interval Pattern

```jsx
// useInterval custom hook — correct, cleanup-safe
function useInterval(callback, delay) {
  const callbackRef = useRef(callback);

  // Keep callbackRef.current updated without restarting interval
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;  // null delay = paused

    const id = setInterval(() => {
      callbackRef.current();  // Always calls latest callback
    }, delay);

    return () => clearInterval(id);
  }, [delay]);  // Only restart if delay changes
}

// Usage:
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => setTime(t => t + 1),
    isRunning ? 100 : null  // null = paused
  );

  return (
    <div>
      <p>{(time / 10).toFixed(1)}s</p>
      <button onClick={() => setIsRunning(r => !r)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
    </div>
  );
}
```

---

### Pattern 4: Subscription Pattern

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Generic external store subscription:
function useExternalStore(store) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return unsubscribe;  // Return the unsubscribe function as cleanup
  }, [store]);

  return state;
}
```

---

### Pattern 5: Document Title Pattern

```jsx
function useDocumentTitle(title, restoreOnUnmount = false) {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitle.current;
      }
    };
  }, [title, restoreOnUnmount]);
}

// Usage:
function ProductPage({ product }) {
  useDocumentTitle(`${product.name} | MyStore`, true);
  // Sets title when mounted, restores previous title when unmounted
  return <ProductDetail product={product} />;
}
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.6 You Might Not Need an Effect

<a id="156-you-might-not-need-an-effect"></a>

### The Overuse Problem

`useEffect` is one of the most misused hooks. Many developers reach for it by habit even when React renders would solve the problem more simply and efficiently.

> [!IMPORTANT]
> If you can compute something during render, do it during render. Only use `useEffect` for things that genuinely need to happen OUTSIDE React's render cycle.

---

### Anti-Pattern 1: Derived State in Effect

```jsx
// ❌ WRONG: Using effect to compute derived state
function Cart({ items }) {
  const [total, setTotal] = useState(0);

  // This is completely unnecessary!
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [items]);
  // Extra re-render: items changes → effect runs → setTotal → re-render
  // Two renders instead of one!

  return <p>Total: ${total}</p>;
}

// ✅ CORRECT: Compute during render
function Cart({ items }) {
  // Just compute it — no state, no effect, no extra render
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <p>Total: ${total}</p>;
}
```

---

### Anti-Pattern 2: Resetting State on Prop Change in Effect

```jsx
// ❌ WRONG: Using effect to reset state when prop changes
function UserForm({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName('');   // Reset when userId changes
    setEmail('');  // Extra re-render!
  }, [userId]);
  // Problem: One render with old data, THEN effect fires, THEN second render with reset

  return <form>...</form>;
}

// ✅ CORRECT: Use key prop to remount component
function UserForm({ userId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // When userId changes: React unmounts+remounts the component
  // useState re-initializes to '' automatically
  return <form>...</form>;
}

// Usage:
<UserForm key={userId} userId={userId} />
// ← key change = full component reset, no useEffect needed!
```

---

### Anti-Pattern 3: Event-Triggered Actions in Effect

```jsx
// ❌ WRONG: Using effect to respond to an event
function SubmitButton({ formData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      submitToServer(formData);  // Why use effect here?
      setIsSubmitted(false);
    }
  }, [isSubmitted, formData]);

  return <button onClick={() => setIsSubmitted(true)}>Submit</button>;
}

// ✅ CORRECT: Handle event directly in event handler
function SubmitButton({ formData }) {
  const handleSubmit = async () => {
    await submitToServer(formData);
    // Handle result directly
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

---

### Anti-Pattern 4: Chain of Effects

```jsx
// ❌ WRONG: Effects triggering other effects (effect chains)
function DataDisplay({ userId }) {
  const [userData, setUserData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUserData);
  }, [userId]);

  useEffect(() => {
    if (userData) setProcessedData(process(userData));
  }, [userData]);  // Chain: wait for userData, then process

  useEffect(() => {
    if (processedData) setDisplayData(format(processedData));
  }, [processedData]);  // Chain: wait for processed, then format

  // 3 re-renders instead of 1!
  return <p>{displayData?.name}</p>;
}

// ✅ CORRECT: One effect, all transformation in one place
function DataDisplay({ userId }) {
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(userData => {
        const processedData = process(userData);
        const formatted = format(processedData);
        setDisplayData(formatted);  // One setState = one re-render
      });
  }, [userId]);

  return <p>{displayData?.name}</p>;
}
```

---

### When useEffect IS Correct

```jsx
// ✅ Synchronizing with external system (fetch, subscription, timer)
useEffect(() => { fetch(url).then(setData); }, [url]);

// ✅ DOM manipulation that can't be done in render
useEffect(() => { document.title = title; }, [title]);

// ✅ Setting up/tearing down third-party libraries
useEffect(() => {
  const instance = new ThirdPartyLib(ref.current);
  return () => instance.destroy();
}, []);

// ✅ Listening to browser events
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.7 useEffect vs useLayoutEffect

<a id="157-useeffect-vs-uselayouteffect"></a>

### The Timing Difference

```
RENDER PHASE:     Component renders → Virtual DOM built
                                                         ↓
DOM MUTATION:     React updates the real DOM
                                                         ↓
useLayoutEffect:  ← Fires HERE (synchronously, before paint)
                                                         ↓
BROWSER PAINT:    Browser draws pixels to screen
                                                         ↓
useEffect:        ← Fires HERE (asynchronously, after paint)
```

---

### useLayoutEffect — Before Paint

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

// Use case: Measure DOM THEN update position before user sees flash
function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // ✅ useLayoutEffect: runs BEFORE paint
    // We can measure DOM and update position — user sees final position immediately
    if (tooltipRef.current && targetRef.current) {
      const target = targetRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();

      setPosition({
        top: target.bottom + 8,
        left: target.left - (tooltip.width / 2) + (target.width / 2),
      });
    }
  }, [text, targetRef]);
  // If we used useEffect instead:
  // → Tooltip renders at default position (0,0)
  // → Browser paints tooltip at wrong position
  // → useEffect fires, position updates
  // → Browser paints again — user sees FLASH of tooltip jumping!

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  );
}
```

```jsx
// Another useLayoutEffect use case: Scroll restoration
function ScrollableList({ items }) {
  const listRef = useRef(null);
  const prevCountRef = useRef(items.length);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // If items were added at the TOP, maintain scroll position
    if (items.length > prevCountRef.current) {
      const newItemsCount = items.length - prevCountRef.current;
      const itemHeight = 50;  // assume fixed height
      list.scrollTop += newItemsCount * itemHeight;
    }

    prevCountRef.current = items.length;
  }, [items]);

  return (
    <div ref={listRef} style={{ overflowY: 'auto', height: '400px' }}>
      {items.map(item => <div key={item.id}>{item.text}</div>)}
    </div>
  );
}
```

---

### When to Use Each

| | `useEffect` | `useLayoutEffect` |
|--|------------|------------------|
| **Timing** | After browser paint | Before browser paint |
| **Blocks paint?** | No (async) | Yes (synchronous) |
| **Use for** | 99% of cases — data fetch, subscriptions, logging | DOM measurements + position adjustments to prevent visual flash |
| **Performance** | Non-blocking | Blocks paint — use sparingly |
| **SSR compatible** | ✅ (runs on client) | ⚠️ (doesn't run on server — use carefully with SSR) |

> [!IMPORTANT]
> **Default to `useEffect`.** Only switch to `useLayoutEffect` when you can see a visual flash/flicker that needs to be prevented. `useLayoutEffect` blocks the browser from painting until your effect is done — overuse causes performance issues.

---

### useInsertionEffect — CSS-in-JS Use Case

```jsx
// useInsertionEffect: fires before useLayoutEffect and useEffect
// Specifically for CSS-in-JS libraries to inject styles before DOM reads

// Timing: DOM mutations → useInsertionEffect → useLayoutEffect → paint → useEffect

import { useInsertionEffect } from 'react';

// Used internally by styled-components, Emotion, etc.
function useCSS(rule) {
  useInsertionEffect(() => {
    if (!document.querySelector(`style[data-rule="${rule}"]`)) {
      const style = document.createElement('style');
      style.setAttribute('data-rule', rule);
      style.textContent = rule;
      document.head.appendChild(style);
    }
  });
}

// You almost never use this directly — it's for CSS-in-JS library authors
// Regular application code should use useEffect or useLayoutEffect
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.8 Strict Mode Double-Firing

<a id="158-strict-mode-double-firing"></a>

### Why React Fires Effects Twice in Development

In **React 18 Strict Mode** (development only), React intentionally:
1. Mounts the component
2. Unmounts it (fires cleanup)
3. Remounts it (fires effect again)

This is designed to **detect effects that are not properly cleaned up** — exposing bugs that would otherwise be silent.

```jsx
// In React 18 Strict Mode (dev only):
useEffect(() => {
  console.log('Effect!');
  return () => console.log('Cleanup!');
}, []);

// Console output in development:
// Effect!     ← First mount
// Cleanup!    ← React unmounts for testing
// Effect!     ← React remounts

// In production: Only fires once:
// Effect!
```

---

### Effects That Break Under Double-Firing (Bugs)

```jsx
// ❌ BUG: Animation that breaks on double-fire
function useAnimation(ref) {
  useEffect(() => {
    ref.current.classList.add('animate');
    // No cleanup! On double-fire: class added, class not removed, class added again
    // Animation state is corrupted
  }, []);
}

// ✅ FIX: Add cleanup
function useAnimation(ref) {
  useEffect(() => {
    ref.current.classList.add('animate');
    return () => ref.current.classList.remove('animate');
    // Now: add → remove → add → works correctly
  }, []);
}

// ❌ BUG: Counter that double-counts
function usePageView(pageId) {
  useEffect(() => {
    analytics.track('page_view', { pageId });
    // No cleanup! Double-fires in dev → 2 page views logged for 1 actual view
  }, [pageId]);
}

// ✅ FIX: Accept that analytics events may fire twice in dev
// This is actually OK — analytics should be idempotent or rate-limited in production
// OR use ignore flag to prevent the double-count:
function usePageView(pageId) {
  useEffect(() => {
    let shouldTrack = true;
    if (shouldTrack) analytics.track('page_view', { pageId });
    return () => { shouldTrack = false; };
  }, [pageId]);
}
```

---

### Writing Cleanup-Safe Effects

```jsx
// The rule: If cleanup reverses the effect, it's cleanup-safe

// ✅ Fetch + abort = cleanup-safe
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(setData);
  return () => controller.abort();
}, [url]);

// ✅ Subscribe + unsubscribe = cleanup-safe
useEffect(() => {
  const sub = store.subscribe(setState);
  return () => sub.unsubscribe();
}, []);

// ✅ setInterval + clearInterval = cleanup-safe
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);

// ✅ addEventListener + removeEventListener = cleanup-safe
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);

// How to verify: Run your cleanup. Does it UNDO the effect?
// If yes → cleanup-safe → Strict Mode won't break it
```

---

### 🧠 Hinglish Intuition

Strict Mode double-firing aise hai jaise school drill. Fire drill mein teacher sabko bahar nikalta hai — poori building khali. Check karta hai ki sab theek se baahar gaye ya nahi. Phir wapas andar. Yeh test hai — actual emergency nahi. React bhi test karta hai: "Agar component unmount ho toh sab cleanup hoga ya memory leak rahega?" Agar tumhara cleanup sahi hai, double-firing se koi fark nahi padega.

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.9 Async in useEffect — Correct Pattern

<a id="159-async-in-useeffect--correct-pattern"></a>

### Why You Can't Make useEffect Async Directly

```jsx
// ❌ INVALID — useEffect callback cannot be async
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);

// Why? Because async functions ALWAYS return a Promise.
// useEffect expects the return value to be either:
//   - undefined (no cleanup)
//   - a function (the cleanup function)
// A Promise is neither — React can't use it as a cleanup function.
// This causes: "Warning: An effect function must not return anything besides a function,
//              which is used for clean-up."
```

---

### Pattern 1: IIFE (Immediately Invoked Function Expression)

```jsx
useEffect(() => {
  // Outer function is sync (what useEffect expects)
  (async () => {
    // Inner IIFE is async
    const data = await fetchData();
    setData(data);
  })();

  // Can still return cleanup from outer function:
  return () => cleanup();
}, []);
```

---

### Pattern 2: Named Async Function Inside (Recommended)

```jsx
useEffect(() => {
  // Define async function inside
  async function loadData() {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Call it immediately
  loadData();

  // Cleanup is still possible — return sync function
  return () => {
    // e.g., abort controller
  };
}, []);

// ✅ Why this is better than IIFE:
// - Named functions appear in stack traces (easier debugging)
// - More readable than nested arrow functions
// - Easier to add additional logic
```

---

### Complete Async Pattern with AbortController

```jsx
function DataComponent({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name === 'AbortError') {
          // Expected — component unmounted or url changed
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup: abort the fetch
    return () => controller.abort();
  }, [url]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  return <DataDisplay data={data} />;
}
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 15.10 Race Conditions & AbortController

<a id="1510-race-conditions--abortcontroller"></a>

### The Race Condition Problem

A race condition occurs when multiple async operations are in-flight simultaneously and the results arrive out of order.

```jsx
// ❌ Race condition scenario:
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // User types: 'r' → 're' → 'rea' → 'reac' → 'react'
    // 5 fetches are triggered

    fetch(`/api/search?q=${query}`)
      .then(r => r.json())
      .then(data => setResults(data));
      // No cleanup! All 5 fetches run simultaneously
      // Network is unpredictable — 'react' might complete before 'reac'
      // Final result depends on which fetch COMPLETES last (not which started last!)
      // User might see results for 'reac' instead of 'react' — a BUG
  }, [query]);
}

// Timeline of the bug:
// t=0ms:  Fetch for 'r' starts
// t=50ms: Fetch for 're' starts
// t=100ms: Fetch for 'rea' starts
// t=150ms: Fetch for 'reac' starts
// t=200ms: Fetch for 'react' starts
// t=280ms: 'react' completes → setResults(reactResults) ✅
// t=350ms: 'reac' completes → setResults(reacResults) ❌ OVERWRITES!
// User sees results for 'reac' even though 'react' was the final query
```

---

### Fix 1: AbortController (Recommended)

```jsx
// ✅ AbortController cancels the previous in-flight request
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    async function search() {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }  // ← Attach signal
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Search failed:', err);
        }
        // AbortError: silently ignore — request was intentionally cancelled
      } finally {
        setLoading(false);
      }
    }

    search();

    return () => controller.abort();
    // When query changes: cleanup runs → previous fetch ABORTED
    // New effect runs → new fetch starts
    // Only the LATEST fetch can complete → no race condition!
  }, [query]);

  return loading ? <Spinner /> : <ResultList results={results} />;
}
```

---

### Fix 2: Ignore Flag

```jsx
// ✅ Ignore flag: let fetches complete but ignore outdated results
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let ignore = false;  // Flag for this specific effect instance

    async function search() {
      const data = await fetchSearch(query);

      if (!ignore) {
        // Only update state if THIS effect is still the latest
        // If query changed while fetching, ignore = true → skip setState
        setResults(data);
      }
    }

    search();

    return () => {
      ignore = true;  // Mark this effect as stale
      // When cleanup runs (query changed): ignore = true
      // If the old fetch completes after this, setResults is skipped
    };
  }, [query]);

  return <ResultList results={results} />;
}

// How it works:
// Fetch 1 (query='r') starts → ignore1 = false
// Fetch 2 (query='re') starts → ignore1 = true (cleanup ran!) → ignore2 = false
// Fetch 1 completes → ignore1 = true → setResults SKIPPED ✅
// Fetch 2 completes → ignore2 = false → setResults runs ✅
```

---

### AbortController vs Ignore Flag — Comparison

| | AbortController | Ignore Flag |
|--|----------------|-------------|
| **Cancels request** | ✅ Yes (saves bandwidth) | ❌ No (request completes) |
| **Browser support** | Modern browsers | All browsers |
| **Works with fetch** | ✅ Native support | ✅ Works with any async |
| **Works with axios** | ✅ With CancelToken | ✅ Yes |
| **Works with XHR** | ✅ xhr.abort() | ✅ Yes |
| **Simplicity** | Medium | Simple |
| **Recommendation** | ✅ Preferred for fetch | Use when AbortController isn't available |

---

### Race Condition in Image Carousel

```jsx
function ImageViewer({ imageId }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadImage() {
      const response = await fetch(`/api/images/${imageId}`, {
        signal: controller.signal
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      // ✅ Also cleanup the object URL on next effect run
      return url;  // Can't return cleanup from async, use ref instead
    }

    let objectUrl = null;
    const load = async () => {
      objectUrl = await loadImage();
    };
    load();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);  // Free memory
    };
  }, [imageId]);

  return imageUrl ? <img src={imageUrl} alt="Preview" /> : <Skeleton />;
}
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 💡 Interview Questions

<a id="-interview-questions"></a>

### Conceptual Questions

---

**Q1. What is a side effect in React? Give 5 examples.**

**Answer:**
A side effect is any operation that interacts with something outside React's render cycle — anything that cannot be pure computation returning JSX.

Examples:
1. **Data fetching** — `fetch('/api/users')`
2. **Subscriptions** — `socket.on('message', handler)`
3. **Timers** — `setInterval(tick, 1000)`
4. **DOM manipulation** — `document.title = 'New Title'`
5. **localStorage** — `localStorage.setItem('theme', 'dark')`

Side effects must be placed in `useEffect` (not directly in the render function) because React may call the render function multiple times in Concurrent Mode, and side effects in render would fire multiple times unexpectedly.

---

**Q2. Explain the three forms of `useEffect` dependency array.**

**Answer:**

1. **No array — `useEffect(fn)`:** Runs after EVERY render. Very rarely useful. Consider whether you actually need this behavior.

2. **Empty array — `useEffect(fn, [])`:** Runs ONCE after mount. Equivalent to `componentDidMount`. Used for one-time setup: initial data fetch, global event listeners, third-party library initialization.

3. **With deps — `useEffect(fn, [a, b, c])`:** Runs after mount AND whenever any listed dependency changes. Equivalent to `componentDidMount + componentDidUpdate` for those specific values.

The cleanup function returned by any form runs before unmount AND before the next effect run (when deps changed).

---

**Q3. What is the stale closure problem in `useEffect`? How do you fix it?**

**Answer:**
A stale closure occurs when `useEffect` captures a variable at the time of its creation and that variable's value becomes outdated in subsequent renders.

```jsx
// Bug:
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);  // count = 0 always (captured at mount)
  }, 1000);
  return () => clearInterval(id);
}, []);  // count not in deps — stale!

// Fix: Functional updater (best for state)
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);  // No stale closure — uses latest state
  }, 1000);
  return () => clearInterval(id);
}, []);

// OR: Add to deps (re-creates interval each second)
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```

---

**Q4. Why can't you make `useEffect` async? What's the correct pattern?**

**Answer:**
`useEffect` expects its callback to return either `undefined` or a cleanup function. An `async` function ALWAYS returns a `Promise` — React can't call a Promise as a cleanup function.

Correct patterns:

```jsx
// Pattern 1: Named async function inside (recommended)
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url).then(r => r.json());
    setData(data);
  }
  fetchData();
  return () => cleanup();
}, [url]);

// Pattern 2: IIFE
useEffect(() => {
  (async () => {
    const data = await fetch(url).then(r => r.json());
    setData(data);
  })();
}, [url]);
```

---

**Q5. What is the difference between `useEffect` and `useLayoutEffect`?**

**Answer:**
Both fire after React updates the DOM, but at different moments:

- **`useEffect`** — fires AFTER the browser has painted. Non-blocking (async). Used for 99% of effects: data fetching, subscriptions, event listeners.

- **`useLayoutEffect`** — fires synchronously BEFORE the browser paints. Blocking. Used when you need to measure DOM and adjust layout to prevent visual flashes (tooltips, scroll restoration, animations).

```
DOM update → useLayoutEffect → browser paint → useEffect
```

Default to `useEffect`. Only use `useLayoutEffect` when you see a visible flash/flicker.

---

**Q6. Why does React fire `useEffect` twice in Strict Mode? What should you do about it?**

**Answer:**
React 18 Strict Mode (development only) deliberately mounts → unmounts → remounts each component to detect effects that don't properly clean up. This reveals bugs that would cause memory leaks or broken state in production.

**What to do:**
1. Ensure every effect that sets something up also tears it down in cleanup
2. Write "cleanup-safe" effects where running cleanup + re-running doesn't change the final result
3. Don't be alarmed by double-firing in development — it's intentional
4. In production, effects run only once normally

```jsx
// Cleanup-safe:
useEffect(() => {
  const sub = subscribe();
  return () => sub.unsubscribe();  // Undo = subscribe + unsubscribe + subscribe = subscribed
}, []);
```

---

**Q7. What is a race condition in `useEffect`? How do you prevent it?**

**Answer:**
A race condition in effects occurs when multiple async operations are triggered (e.g., as the user types in a search box), and the results arrive out of order. An older request completing AFTER a newer one overwrites the newer result.

**Two prevention methods:**

1. **AbortController (recommended):** Cancels the previous fetch when deps change. The in-flight request is aborted on cleanup.

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(setData);
  return () => controller.abort();
}, [url]);
```

2. **Ignore flag:** Lets fetches complete but ignores outdated results.

```jsx
useEffect(() => {
  let ignore = false;
  fetch(url).then(data => { if (!ignore) setData(data); });
  return () => { ignore = true; };
}, [url]);
```

---

**Q8. What's wrong with using an object or function in the dependency array?**

**Answer:**
React compares deps using `Object.is()` (reference equality). Objects and functions created inside a component are recreated with new references on every render.

```jsx
// Problem:
const options = { page: 1 };  // New object every render
useEffect(() => {
  fetch('/api', options);
}, [options]);  // options changes every render → effect runs every render → infinite loop!

// Fixes:
// 1. Move outside component (if constant)
const OPTIONS = { page: 1 };  // Stable reference

// 2. useMemo for derived objects
const options = useMemo(() => ({ page }), [page]);

// 3. useCallback for functions
const handler = useCallback(() => doSomething(id), [id]);
```

---

**Q9. When should you NOT use `useEffect`?**

**Answer:**
Avoid `useEffect` when:

1. **Computing derived state** — compute during render instead:
   ```jsx
   // ❌ const [total, setTotal] = useState(0);
   // ❌ useEffect(() => { setTotal(items.reduce(...)); }, [items]);
   // ✅ const total = items.reduce(...);  // Just compute it
   ```

2. **Handling events** — put logic directly in the event handler:
   ```jsx
   // ❌ useEffect(() => { if (clicked) doSomething(); }, [clicked]);
   // ✅ const handleClick = () => doSomething();
   ```

3. **Resetting state when props change** — use `key` prop:
   ```jsx
   // ❌ useEffect(() => { reset(); }, [userId]);
   // ✅ <Component key={userId} />  // Remount = automatic reset
   ```

4. **Chaining effects** — do all transformations in one effect or during render.

---

**Q10. What is the `exhaustive-deps` ESLint rule and should you always follow it?**

**Answer:**
`exhaustive-deps` (from `eslint-plugin-react-hooks`) warns when reactive values used inside `useEffect` are not listed in the dependency array. Missing deps = stale closure bugs.

**Should you always follow it?** Yes, with understanding:
- When it warns, fix the root cause (add deps, use functional updater, move code, useMemo/useCallback)
- Suppressing with `// eslint-disable` should be rare and documented
- If adding a dep causes an infinite loop, the problem is usually an unstable reference — fix with `useMemo`/`useCallback`, not by omitting the dep

---

### Advanced Questions

---

**Q11. Explain the timing of `useEffect`, `useLayoutEffect`, and `useInsertionEffect`.**

**Answer:**
```
DOM update (React commits)
    ↓
useInsertionEffect  ← Inject styles (CSS-in-JS libraries only)
    ↓
useLayoutEffect     ← DOM measurements, position corrections (before paint)
    ↓
Browser paints
    ↓
useEffect           ← Data fetching, subscriptions (after paint)
```

- `useInsertionEffect`: For CSS-in-JS libraries to inject `<style>` tags before layout reads
- `useLayoutEffect`: For DOM measurements that affect layout (to prevent visual flash)
- `useEffect`: For everything else — non-blocking, runs after user sees UI

---

**Q12. How does `useEffect` cleanup work when deps change (not just on unmount)?**

**Answer:**
When dependencies change, React:
1. Renders the component with new values
2. Updates the DOM
3. Runs the PREVIOUS effect's cleanup function
4. Runs the NEW effect's callback

This means cleanup runs between each effect run, not just on unmount:

```jsx
useEffect(() => {
  console.log(`Subscribe to channel: ${channelId}`);
  const sub = subscribe(channelId);

  return () => {
    console.log(`Unsubscribe from channel: ${channelId}`); // channelId = OLD value
    sub.unsubscribe();
  };
}, [channelId]);

// Timeline when channelId changes A → B:
// 1. Render with B
// 2. DOM updated
// 3. Cleanup runs: "Unsubscribe from A"  ← Uses closure over A
// 4. Effect runs: "Subscribe to B"
```

---

**Q13. What is `useEffect` with empty deps NOT the same as `componentDidMount`?**

**Answer:**
They are SIMILAR but have one key difference: `useEffect(fn, [])` in **Concurrent Mode** might run the cleanup and re-run the effect even without unmounting (as seen in Strict Mode's intentional double-invoke).

Also:
- `componentDidMount` fires synchronously after DOM update (similar to `useLayoutEffect`)
- `useEffect(fn, [])` fires asynchronously AFTER the browser has painted

For DOM measurements that need to happen before paint: use `useLayoutEffect` to more closely match `componentDidMount` timing.

---

**Q14. A component fetches data, the user navigates away (unmount), the fetch completes — what happens?**

**Answer:**
Without cleanup: React tries to call `setState` on the unmounted component → React logs a warning: "Can't perform a React state update on an unmounted component."

In React 18, this warning is being phased out (it's considered a performance issue, not always a memory leak), but it's still bad practice.

With proper cleanup (AbortController):
```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(r => r.json()).then(setData);
  return () => controller.abort();
}, [url]);
// On unmount: controller.abort() → fetch throws AbortError → catch ignores it → no setState
```

---

**Q15. Can you run multiple effects for the same dependency? Is that recommended?**

**Answer:**
Yes — you can have multiple `useEffect` calls in one component, each with their own deps. They run in order top-to-bottom.

```jsx
function App({ userId }) {
  // Effect 1: Fetch user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Effect 2: Track analytics
  useEffect(() => {
    analytics.track('user_viewed', { userId });
  }, [userId]);

  // Effect 3: Update document title
  useEffect(() => {
    document.title = `User ${userId}`;
  }, [userId]);
}
```

**Recommendation:** Separate effects by CONCERN, not by dependency. Each effect should do one thing. This follows the single responsibility principle and makes each effect easier to reason about and test individually.

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 🧪 Practice Problems

<a id="-practice-problems"></a>

### Coding Questions

---

**1. Build a `useFetch` custom hook with loading, error, and abort**

```jsx
import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;

        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);  // options excluded intentionally (would need useMemo in real usage)

  return { data, loading, error };
}

// Demo component
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h2>useFetch Demo</h2>
      {loading && <div style={{ color: '#94a3b8' }}>⏳ Loading...</div>}
      {error && <div style={{ color: '#ef4444' }}>❌ Error: {error}</div>}
      {user && (
        <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Company: {user.company?.name}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5].map(id => (
          <button key={id} onClick={() => setUserId(id)}
            style={{ padding: '8px 14px', backgroundColor: userId === id ? '#3b82f6' : '#e2e8f0', color: userId === id ? '#fff' : '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            User {id}
          </button>
        ))}
      </div>
      <UserProfile userId={userId} />
    </div>
  );
}

export default App;
```

---

**2. Fix all the useEffect bugs in this component**

```jsx
// ❌ Bug-filled component — find and fix all 5 bugs
import { useState, useEffect } from 'react';

function BuggyDashboard({ userId, refreshInterval }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  // BUG 1: Async useEffect
  useEffect(async () => {
    const data = await fetch(`/api/users/${userId}`).then(r => r.json());
    setUser(data);
  }, [userId]);

  // BUG 2: No cleanup on interval
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);  // BUG 3: Stale closure
    }, refreshInterval);
  }, [refreshInterval]);

  // BUG 4: Object in deps (new object every render)
  const config = { userId, expanded: true };
  useEffect(() => {
    subscribeToMessages(config, setMessages);
  }, [config]);

  // BUG 5: Derived state in effect
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(messages.length * 10);
  }, [messages]);

  return <div>{count} | {total} | {user?.name}</div>;
}
```

```jsx
// ✅ Fixed version
import { useState, useEffect, useMemo } from 'react';

function FixedDashboard({ userId, refreshInterval }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  // Fix 1: Named async function inside
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        const data = await fetch(`/api/users/${userId}`, {
          signal: controller.signal
        }).then(r => r.json());
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }

    fetchUser();
    return () => controller.abort();
  }, [userId]);

  // Fix 2: Return cleanup | Fix 3: Functional updater
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1);  // Functional updater — no stale closure
    }, refreshInterval);
    return () => clearInterval(id);  // Cleanup!
  }, [refreshInterval]);

  // Fix 4: useMemo for stable object reference
  const config = useMemo(() => ({ userId, expanded: true }), [userId]);
  useEffect(() => {
    const unsub = subscribeToMessages(config, setMessages);
    return () => unsub();
  }, [config]);

  // Fix 5: Derive during render — no state, no effect
  const total = messages.length * 10;

  return <div>{count} | {total} | {user?.name}</div>;
}

export default FixedDashboard;
```

---

**3. Implement a debounced search with useEffect**

```jsx
import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
    // Each keystroke: clear previous timer, start new one
    // Only fires if user stops typing for 'delay' ms
  }, [value, delay]);

  return debouncedValue;
}

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  // Effect only runs when debounced value changes (400ms after last keystroke)
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function search() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?q=${debouncedQuery}`,
          { signal: controller.signal }
        );
        // Simulate with all users + filter client-side for demo
        const users = await response.json();
        const filtered = users.filter(u =>
          u.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    search();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div style={{ maxWidth: '480px', padding: '24px', fontFamily: 'sans-serif' }}>
      <h2>Debounced Search</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users..."
        style={{ width: '100%', padding: '10px 14px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }}
      />
      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
        Query: "{query}" | Debounced: "{debouncedQuery}" | 400ms delay
      </p>

      {loading && <p style={{ color: '#3b82f6' }}>🔍 Searching...</p>}
      {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
      {!loading && results.length === 0 && debouncedQuery && (
        <p style={{ color: '#94a3b8' }}>No results for "{debouncedQuery}"</p>
      )}

      <div style={{ marginTop: '12px' }}>
        {results.map(user => (
          <div key={user.id} style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '8px' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>{user.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DebouncedSearch;
```

---

**4. Demonstrate the race condition and its fix**

```jsx
import { useState, useEffect } from 'react';

// Simulate slow API with random delay
function fakeFetch(id, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, fetchTime: Date.now() });
    }, delay);
  });
}

function RaceConditionDemo() {
  const [userId, setUserId] = useState(1);
  const [userBuggy, setUserBuggy] = useState(null);
  const [userFixed, setUserFixed] = useState(null);
  const [log, setLog] = useState([]);

  const addLog = (msg) => setLog(prev => [{ msg, time: Date.now() }, ...prev.slice(0, 9)]);

  // ❌ BUGGY: Race condition
  useEffect(() => {
    const delay = Math.random() * 2000 + 500;  // 500-2500ms random
    addLog(`[BUGGY] Fetching user ${userId} (delay: ${delay.toFixed(0)}ms)`);
    fakeFetch(userId, delay).then(data => {
      addLog(`[BUGGY] Got user ${data.id}`);
      setUserBuggy(data);  // May set stale data!
    });
  }, [userId]);

  // ✅ FIXED: With ignore flag
  useEffect(() => {
    let ignore = false;
    const delay = Math.random() * 2000 + 500;
    addLog(`[FIXED] Fetching user ${userId} (delay: ${delay.toFixed(0)}ms)`);

    fakeFetch(userId, delay).then(data => {
      if (!ignore) {
        addLog(`[FIXED] Got user ${data.id} ✅`);
        setUserFixed(data);
      } else {
        addLog(`[FIXED] Ignored stale result for user ${data.id} 🚫`);
      }
    });

    return () => { ignore = true; };
  }, [userId]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Race Condition Demo</h2>
      <p style={{ color: '#64748b', fontSize: '13px' }}>
        Click rapidly between users to trigger race condition
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5].map(id => (
          <button key={id} onClick={() => setUserId(id)}
            style={{ padding: '8px 16px', backgroundColor: userId === id ? '#3b82f6' : '#e2e8f0', color: userId === id ? '#fff' : '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            User {id}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#fff5f5', border: '2px solid #fca5a5', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px', color: '#dc2626', fontSize: '14px' }}>❌ Buggy (No cleanup)</h3>
          {userBuggy ? (
            <p>Showing: User <strong>{userBuggy.id}</strong> (selected: {userId})</p>
          ) : <p>Loading...</p>}
          {userBuggy?.id !== userId && (
            <p style={{ color: '#dc2626', fontSize: '12px' }}>⚠️ WRONG USER SHOWN!</p>
          )}
        </div>

        <div style={{ padding: '16px', backgroundColor: '#f0fdf4', border: '2px solid #86efac', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px', color: '#16a34a', fontSize: '14px' }}>✅ Fixed (Ignore flag)</h3>
          {userFixed ? (
            <p>Showing: User <strong>{userFixed.id}</strong> (selected: {userId})</p>
          ) : <p>Loading...</p>}
          {userFixed?.id === userId && (
            <p style={{ color: '#16a34a', fontSize: '12px' }}>✓ Correct user shown</p>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
        {log.map((entry, i) => (
          <div key={i} style={{ fontSize: '11px', color: entry.msg.includes('BUGGY') ? '#fca5a5' : '#86efac', fontFamily: 'monospace', marginBottom: '2px' }}>
            {entry.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RaceConditionDemo;
```

---

**5. Build a real-time notification system with subscription cleanup**

```jsx
import { useState, useEffect, useCallback } from 'react';

// Simulated notification service
const notificationService = {
  handlers: {},
  subscribe(channel, callback) {
    if (!this.handlers[channel]) this.handlers[channel] = [];
    this.handlers[channel].push(callback);
    console.log(`Subscribed to: ${channel}`);

    // Send initial notification
    setTimeout(() => callback({ id: Date.now(), type: 'system', message: `Connected to ${channel}` }), 100);

    return () => {
      this.handlers[channel] = this.handlers[channel].filter(h => h !== callback);
      console.log(`Unsubscribed from: ${channel}`);
    };
  },
  emit(channel, notification) {
    this.handlers[channel]?.forEach(h => h(notification));
  },
};

// Simulate random notifications
let notifId = 1;
setInterval(() => {
  const channels = ['general', 'alerts', 'updates'];
  const types = ['info', 'warning', 'success', 'error'];
  const messages = ['System update', 'New message', 'Task complete', 'Alert triggered', 'User joined'];
  channels.forEach(ch => {
    if (Math.random() > 0.7) {
      notificationService.emit(ch, {
        id: notifId++,
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        channel: ch,
        time: new Date().toLocaleTimeString(),
      });
    }
  });
}, 2000);

function NotificationBadge({ count }) {
  if (!count) return null;
  return (
    <span style={{ backgroundColor: '#ef4444', color: '#fff', borderRadius: '12px', padding: '2px 6px', fontSize: '11px', fontWeight: '700', marginLeft: '6px' }}>
      {count > 99 ? '99+' : count}
    </span>
  );
}

function NotificationPanel({ channel }) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Subscribe when channel changes, unsubscribe on cleanup
    const unsubscribe = notificationService.subscribe(channel, (notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      setUnread(prev => prev + 1);
    });

    // Cleanup: unsubscribe when channel changes or component unmounts
    return unsubscribe;
  }, [channel]);

  const markAllRead = useCallback(() => setUnread(0), []);

  const typeColors = {
    info: '#dbeafe',
    warning: '#fef9c3',
    success: '#dcfce7',
    error: '#fee2e2',
    system: '#f3e8ff',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => { setIsOpen(o => !o); markAllRead(); }}
        style={{ padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#fff', display: 'flex', alignItems: 'center', fontFamily: 'sans-serif' }}
      >
        🔔 {channel}
        <NotificationBadge count={unread} />
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '4px', width: '300px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 100, maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '14px' }}>#{channel}</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{notifications.length} notifications</span>
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
              No notifications yet
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} style={{ padding: '10px 16px', borderBottom: '1px solid #f8fafc', backgroundColor: typeColors[notif.type] || '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' }}>{notif.type}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{notif.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#374151' }}>{notif.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeChannels, setActiveChannels] = useState(['general', 'alerts']);
  const ALL_CHANNELS = ['general', 'alerts', 'updates'];

  const toggleChannel = (ch) => {
    setActiveChannels(prev =>
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Notification System</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        Demonstrates useEffect subscription cleanup. Toggle channels to see subscribe/unsubscribe in console.
      </p>

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Active Channels:</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {ALL_CHANNELS.map(ch => (
            <button key={ch} onClick={() => toggleChannel(ch)}
              style={{ padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', backgroundColor: activeChannels.includes(ch) ? '#3b82f6' : '#fff', color: activeChannels.includes(ch) ? '#fff' : '#374151', fontSize: '13px' }}>
              {activeChannels.includes(ch) ? '✓ ' : ''}{ch}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {activeChannels.map(channel => (
          <NotificationPanel key={channel} channel={channel} />
        ))}
      </div>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
        💡 Notifications arrive every ~2s. Toggle a channel off to see it unsubscribe.
      </p>
    </div>
  );
}

export default App;
```

---

### Theory Questions

---

**T1. What is the "cleanup-safe" principle for `useEffect`? Why does it matter with Strict Mode?**

**Expected Answer:**
An effect is cleanup-safe if running the sequence `effect → cleanup → effect` produces the same result as running `effect` alone. This means the cleanup COMPLETELY undoes what the effect did.

Examples:
- `addEventListener` / `removeEventListener` → cleanup-safe
- `fetch` / `controller.abort()` → cleanup-safe
- `setInterval` / `clearInterval` → cleanup-safe

React Strict Mode double-invokes effects to verify they're cleanup-safe. If your effect is NOT cleanup-safe (e.g., no cleanup for an interval), Strict Mode exposes the bug — multiple intervals stack up, causing observable issues in dev.

---

**T2. What does the `eslint-plugin-react-hooks` rule `exhaustive-deps` actually check?**

**Expected Answer:**
It checks that all reactive values used inside `useEffect` (state, props, context values, variables derived from them, and functions defined in the component) are listed in the dependency array.

If you use `userId` inside the effect but don't include it in deps → stale closure → effect uses old `userId`. The rule warns and you should fix it.

When adding a dependency causes an infinite loop, the fix is not to suppress the warning but to:
1. Move the value outside the component (if it's constant)
2. Stabilize with `useMemo`/`useCallback`
3. Use functional updater (`setState(prev => ...)`)
4. Restructure the effect

---

**T3. Why can objects and functions in dependencies cause infinite loops?**

**Expected Answer:**
React compares deps using `Object.is()` (reference equality). Objects and functions defined inside a component are created with new references on every render:

```jsx
const options = { page: 1 };  // New object every render
// Object.is(previousOptions, options) = false → effect re-runs → renders → new object → ...
```

Solutions:
1. Move to outside the component (if truly constant)
2. `useMemo` for objects: `useMemo(() => ({ page }), [page])`
3. `useCallback` for functions: `useCallback(() => fn(id), [id])`
4. Only list the primitive values that the object depends on: `[page]` instead of `[options]`

---

**T4. When should you use `useLayoutEffect` instead of `useEffect`?**

**Expected Answer:**
Use `useLayoutEffect` when:
1. You need to read DOM layout (positions, sizes, scroll position) IMMEDIATELY after DOM changes
2. The result affects what the user sees next (positioning, animation start values)
3. Using `useEffect` would cause a visible flash or flicker

Classic cases:
- Positioning a tooltip based on its target's position
- Scroll position maintenance in chat or virtual lists
- DOM measurements for animation initial values

Important: `useLayoutEffect` blocks the browser from painting until your callback completes. For expensive operations, this causes perceived slowness. Only use it when visual correctness (preventing flicker) outweighs the performance cost.

---

**T5. Describe the difference between `AbortController` and the ignore flag pattern for preventing race conditions. When would you choose each?**

**Expected Answer:**

**AbortController:**
- Actively cancels the network request — no response is processed
- Saves bandwidth (request aborted mid-flight)
- Uses `controller.signal` passed to `fetch()`
- Works natively with `fetch` and some other APIs
- `AbortError` must be caught and ignored

**Ignore flag:**
- Lets the request complete but ignores the result
- Works with ANY async operation (not just fetch)
- Simpler to understand and implement
- Wastes bandwidth (request completes but result discarded)

**Choose AbortController** for fetch requests in production — saves server resources.
**Choose ignore flag** for non-fetch async operations or when AbortController isn't supported.

---

### Machine Coding Problems

---

**MC1: Build a complete Infinite Scroll component with useEffect**

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return [targetRef, isIntersecting];
}

// Fake API that returns paginated data
async function fetchItems(page, signal) {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

  const TOTAL = 100;
  const PER_PAGE = 10;
  const start = (page - 1) * PER_PAGE;

  if (start >= TOTAL) return { items: [], hasMore: false };

  return {
    items: Array.from({ length: Math.min(PER_PAGE, TOTAL - start) }, (_, i) => ({
      id: start + i + 1,
      title: `Article ${start + i + 1}`,
      excerpt: `This is the excerpt for article number ${start + i + 1}. It contains interesting content.`,
      category: ['Tech', 'Design', 'Business', 'Science'][Math.floor(Math.random() * 4)],
      readTime: Math.floor(Math.random() * 8) + 2,
    })),
    hasMore: start + PER_PAGE < TOTAL,
  };
}

function ArticleCard({ article }) {
  return (
    <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#3b82f6', backgroundColor: '#dbeafe', padding: '2px 8px', borderRadius: '10px' }}>
          {article.category}
        </span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{article.readTime} min read</span>
      </div>
      <h3 style={{ margin: '0 0 6px', fontSize: '16px', color: '#1e293b' }}>{article.title}</h3>
      <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{article.excerpt}</p>
    </div>
  );
}

function InfiniteScrollList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const [sentinelRef, isSentinelVisible] = useIntersectionObserver();

  // Load more when sentinel becomes visible
  useEffect(() => {
    if (isSentinelVisible && hasMore && !loading) {
      setPage(p => p + 1);
    }
  }, [isSentinelVisible, hasMore, loading]);

  // Fetch items when page changes
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchItems(page, controller.signal)
      .then(({ items: newItems, hasMore: more }) => {
        setItems(prev => [...prev, ...newItems]);
        setHasMore(more);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [page]);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Infinite Scroll Articles</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        {items.length} articles loaded | {hasMore ? 'More available' : 'All loaded!'}
      </p>

      {items.map(article => <ArticleCard key={article.id} article={article} />)}

      {/* Sentinel element — triggers load when visible */}
      <div ref={sentinelRef} style={{ height: '20px' }} />

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
          <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ marginTop: '8px', fontSize: '14px' }}>Loading more articles...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px', color: '#991b1b' }}>
          Error: {error}
        </div>
      )}

      {!hasMore && !loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '14px' }}>
          🎉 You've reached the end! ({items.length} articles total)
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default InfiniteScrollList;
```

---

**MC2: Build a real-time collaborative cursor tracker**

```jsx
import { useState, useEffect, useRef } from 'react';

// Simulate other users' cursors via random movement
function useFakeCursors(count = 3) {
  const [cursors, setCursors] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'][i],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      color: ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'][i],
    }))
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCursors(prev =>
        prev.map(cursor => ({
          ...cursor,
          x: Math.max(2, Math.min(98, cursor.x + (Math.random() - 0.5) * 6)),
          y: Math.max(2, Math.min(98, cursor.y + (Math.random() - 0.5) * 6)),
        }))
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return cursors;
}

function useMousePosition(containerRef) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  return position;
}

function CursorArrow({ x, y, name, color, isLocal = false }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-4px, -4px)',
      pointerEvents: 'none',
      transition: isLocal ? 'none' : 'left 0.1s linear, top 0.1s linear',
      zIndex: isLocal ? 10 : 5,
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ filter: `drop-shadow(0 1px 3px rgba(0,0,0,0.3))` }}>
        <path d="M0 0 L0 16 L5 11 L9 19 L11 18 L7 10 L14 10 Z" fill={color} />
      </svg>
      <div style={{
        position: 'absolute',
        top: '18px',
        left: '8px',
        backgroundColor: color,
        color: '#fff',
        padding: '2px 6px',
        borderRadius: '10px',
        fontSize: '11px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        fontFamily: 'sans-serif',
      }}>
        {isLocal ? 'You' : name}
      </div>
    </div>
  );
}

function CollaborativeCanvas() {
  const containerRef = useRef(null);
  const myPosition = useMousePosition(containerRef);
  const otherCursors = useFakeCursors(3);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const click = {
        id: Date.now(),
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      setClicks(prev => [...prev.slice(-19), click]);

      // Auto-remove click effect after 1s
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== click.id));
      }, 1000);
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Collaborative Cursor Tracker</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
        Move your mouse over the canvas. Demonstrates multiple useEffect patterns:
        mousemove listener, setInterval for fake cursors, click tracking.
      </p>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          backgroundColor: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '16px',
          cursor: 'none',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Other users' cursors */}
        {otherCursors.map(cursor => (
          <CursorArrow key={cursor.id} {...cursor} />
        ))}

        {/* Local user cursor */}
        <CursorArrow
          x={myPosition.x}
          y={myPosition.y}
          name="You"
          color="#3b82f6"
          isLocal
        />

        {/* Click effects */}
        {clicks.map(click => (
          <div key={click.id} style={{
            position: 'absolute',
            left: `${click.x}%`,
            top: `${click.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(59,130,246,0.3)',
            animation: 'ripple 1s ease-out forwards',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Instructions overlay */}
        <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
          Move mouse to move your cursor • Click to create ripple effects
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          from { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default CollaborativeCanvas;
```

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 🚀 Mini Project

<a id="-mini-project"></a>

### Real-time Search with Debounce + AbortController

---

### Problem Statement

Build a **GitHub User Search** — a real-time search component that demonstrates every key `useEffect` concept from Chapter 15: debouncing, AbortController for race conditions, loading states, error handling, cleanup, and proper async patterns.

---

### Features

- ✅ Real-time search with 400ms debounce (useEffect + cleanup)
- ✅ AbortController cancels in-flight requests (race condition fix)
- ✅ Loading, error, empty, and results states
- ✅ User card with avatar, repos, followers
- ✅ Search history (localStorage sync via useEffect)
- ✅ Keyboard navigation (useEffect event listener)
- ✅ Online/offline detection (subscription pattern)

---

### Implementation

```jsx
import { useState, useEffect, useCallback, useRef } from 'react';

// ================================================================
// HOOKS
// ================================================================
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);  // ← Cleanup clears timer
  }, [value, delay]);

  return debouncedValue;
}

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch {}
  }, [key, value]);

  return [value, setValue];
}

function useGitHubSearch(query) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setTotalCount(0);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function searchUsers() {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=8`,
          {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github.v3+json' },
          }
        );

        if (!response.ok) {
          if (response.status === 403) throw new Error('Rate limit exceeded. Try again later.');
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.items || []);
        setTotalCount(data.total_count || 0);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    searchUsers();
    return () => controller.abort();  // ← AbortController cleanup
  }, [query]);

  return { users, loading, error, totalCount };
}

// ================================================================
// COMPONENTS
// ================================================================
function OnlineIndicator({ isOnline }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: isOnline ? '#16a34a' : '#dc2626' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOnline ? '#22c55e' : '#ef4444' }} />
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}

function UserCard({ user, onSelect }) {
  return (
    <div
      onClick={() => onSelect(user)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#3b82f6'; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>{user.login}</p>
        <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>GitHub User</p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{ color: '#3b82f6', fontSize: '12px', textDecoration: 'none', flexShrink: 0 }}
      >
        View →
      </a>
    </div>
  );
}

function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>RECENT SEARCHES</span>
        <button onClick={onClear} style={{ fontSize: '11px', color: '#94a3b8', border: 'none', background: 'none', cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {history.map(term => (
          <button
            key={term}
            onClick={() => onSelect(term)}
            style={{ padding: '4px 12px', border: '1px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', backgroundColor: '#f8fafc', fontSize: '13px', color: '#374151' }}
          >
            🔍 {term}
          </button>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// MAIN APP
// ================================================================
function GitHubSearch() {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useLocalStorage('gh-search-history', []);
  const isOnline = useOnlineStatus();
  const inputRef = useRef(null);

  // Debounce the query — only search 400ms after user stops typing
  const debouncedQuery = useDebounce(query, 400);

  const { users, loading, error, totalCount } = useGitHubSearch(debouncedQuery);

  // Save to search history when debounced query changes and has results
  useEffect(() => {
    if (debouncedQuery && users.length > 0) {
      setSearchHistory(prev => {
        const filtered = prev.filter(h => h !== debouncedQuery);
        return [debouncedQuery, ...filtered].slice(0, 8);
      });
    }
  }, [debouncedQuery, users.length]);

  // Keyboard shortcut: '/' focuses search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUserSelect = useCallback((user) => {
    window.open(user.html_url, '_blank', 'noopener,noreferrer');
  }, []);

  const showSkeleton = loading && users.length === 0;
  const showResults = !loading || users.length > 0;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <h1 style={{ margin: '0 0 4px', color: '#f8fafc', fontSize: '28px', fontWeight: '800' }}>
            GitHub User Search
          </h1>
          <p style={{ margin: '0 0 12px', color: '#64748b', fontSize: '14px' }}>
            Real-time search with debounce + AbortController
          </p>
          <OnlineIndicator isOnline={isOnline} />
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '18px' }}>
            🔍
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search GitHub users... (Press / to focus)"
            style={{
              width: '100%',
              padding: '14px 44px',
              backgroundColor: '#1e293b',
              border: `2px solid ${query ? '#3b82f6' : '#334155'}`,
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
            >
              ×
            </button>
          )}
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '13px', color: '#64748b' }}>
          <span>
            {loading ? '⏳ Searching...' :
             debouncedQuery && totalCount ? `${totalCount.toLocaleString()} users found` :
             debouncedQuery && !loading ? '0 results' : ''}
          </span>
          <span style={{ fontSize: '11px' }}>
            Debounced: "{debouncedQuery}"
          </span>
        </div>

        {/* Search History */}
        {!query && (
          <SearchHistory
            history={searchHistory}
            onSelect={setQuery}
            onClear={() => setSearchHistory([])}
          />
        )}

        {/* Error State */}
        {error && (
          <div style={{ padding: '16px', backgroundColor: '#450a0a', border: '1px solid #fca5a5', borderRadius: '10px', marginBottom: '16px', color: '#fca5a5', fontSize: '14px' }}>
            ❌ {error}
          </div>
        )}

        {/* Offline Warning */}
        {!isOnline && (
          <div style={{ padding: '12px 16px', backgroundColor: '#422006', border: '1px solid #f59e0b', borderRadius: '10px', marginBottom: '16px', color: '#fbbf24', fontSize: '13px' }}>
            ⚠️ You're offline. Search results may not be available.
          </div>
        )}

        {/* Loading Skeletons */}
        {showSkeleton && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1px solid #334155', borderRadius: '10px', backgroundColor: '#1e293b' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#334155', animation: 'pulse 1.5s infinite' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: '120px', height: '14px', backgroundColor: '#334155', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ width: '80px', height: '12px', backgroundColor: '#334155', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {showResults && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {users.map(user => (
              <UserCard key={user.id} user={user} onSelect={handleUserSelect} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && debouncedQuery && users.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>👤</div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>No users found</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Try a different search term</p>
          </div>
        )}

        {/* Empty/initial state */}
        {!query && searchHistory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🐙</div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Search GitHub Users</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Type a username to get started</p>
            <p style={{ margin: '16px 0 0', fontSize: '12px', color: '#475569' }}>
              Press <kbd style={{ padding: '2px 6px', backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '4px' }}>/</kbd> to focus • <kbd style={{ padding: '2px 6px', backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '4px' }}>Esc</kbd> to clear
            </p>
          </div>
        )}

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: '#334155' }}>
          Concepts: useEffect • Debounce • AbortController • Race Condition Fix • Event Listeners • localStorage
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        input::placeholder { color: #475569; }
        kbd { font-family: monospace; }
      `}</style>
    </div>
  );
}

export default GitHubSearch;
```

---

### useEffect Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| `useEffect` with cleanup | Debounce timer cleanup |
| `AbortController` | `useGitHubSearch` — cancels in-flight requests |
| Race condition fix | AbortController in search effect |
| Lazy initialization | `useLocalStorage` — reads localStorage once on mount |
| Subscription pattern | `useOnlineStatus` — online/offline events |
| Event listener pattern | '/' keyboard shortcut |
| Async in useEffect | Named async function inside effect |
| Cleanup on unmount | All event listeners removed on unmount |
| `localStorage` sync | `useLocalStorage` effect syncs on change |
| No `useEffect` for derived state | `showSkeleton`, `showResults` computed during render |

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## ⚡ Quick Revision

<a id="-quick-revision"></a>

### Key Definitions

| Term | One-Line Definition |
|------|-------------------|
| **Side effect** | Any operation outside React's pure render — fetch, timer, DOM, storage |
| **useEffect** | Hook for running side effects after render |
| **Cleanup function** | Function returned from useEffect — runs before unmount and before next effect |
| **Stale closure** | Captured variable value that becomes outdated after re-renders |
| **Race condition** | Multiple async ops completing out of order, corrupting state |
| **AbortController** | Browser API to cancel fetch requests — primary race condition fix |
| **Debounce** | Delay execution until input stops — prevents excess API calls |
| **Ignore flag** | Boolean that marks a response as stale — secondary race condition fix |
| **useLayoutEffect** | Like useEffect but fires before browser paint — for DOM measurements |
| **useInsertionEffect** | Fires before layout reads — for CSS-in-JS library style injection |
| **Exhaustive deps** | ESLint rule requiring all reactive values in deps array |
| **Strict Mode** | Dev-only double-invocation to detect cleanup-safe bugs |

---

### Three useEffect Forms

```
useEffect(fn)           → Every render (rare)
useEffect(fn, [])       → Mount only (componentDidMount)
useEffect(fn, [a, b])   → Mount + when a or b changes
```

---

### Common Interview Traps

> [!IMPORTANT]
> **Trap 1:** `useEffect(async () => {...})` — async functions return Promises, not cleanup functions.
> **Fix:** Define `async function` inside and call it.

> [!IMPORTANT]
> **Trap 2:** Object/array in deps → infinite loop (new reference every render).
> **Fix:** `useMemo` for objects, `useCallback` for functions, or move outside component.

> [!IMPORTANT]
> **Trap 3:** Empty deps `[]` with stale closure (e.g., interval using state).
> **Fix:** Functional updater `setState(prev => ...)` or add to deps.

> [!IMPORTANT]
> **Trap 4:** `useEffect` for derived state → extra re-render.
> **Fix:** Compute during render, no state/effect needed.

> [!IMPORTANT]
> **Trap 5:** Missing cleanup → memory leaks and React warnings.
> **Fix:** Always return cleanup for timers, listeners, subscriptions, fetches.

> [!IMPORTANT]
> **Trap 6:** `useLayoutEffect` for everything → blocks paint unnecessarily.
> **Fix:** Use `useEffect` by default; `useLayoutEffect` only for DOM measurements preventing visual flash.

---

### Revision Bullets

- Side effects = fetch, timers, subscriptions, DOM manipulation, storage, analytics
- `useEffect(fn)` = every render | `useEffect(fn, [])` = mount | `useEffect(fn, [deps])` = mount + dep change
- Cleanup function runs: before unmount AND before next effect run (when deps change)
- Stale closure: captured variable becomes outdated — fix with functional updater or add to deps
- Objects/functions in deps = new reference each render = infinite loop
- `useMemo` for stable object deps, `useCallback` for stable function deps
- `async` useEffect: define async function inside, call it — never make useEffect async directly
- AbortController: `controller.abort()` in cleanup cancels pending fetch requests
- Ignore flag: `let ignore = false; return () => { ignore = true; }` — skip stale results
- `useLayoutEffect` fires before paint (blocking) — only for DOM measurements preventing flash
- `useEffect` fires after paint (non-blocking) — use for 99% of effects
- Strict Mode double-fires effects in dev — write cleanup-safe effects
- Don't use useEffect for: derived state, event responses, resetting state on prop change
- Do use useEffect for: external system sync, subscriptions, timers, DOM outside React
- `exhaustive-deps` ESLint rule: follow it — it prevents stale closure bugs

---

👉 <a href="#chapter-index-table-15">Go to Top 🔝</a>

---

## 📌 Chapter Summary

<a id="-chapter-summary"></a>

### Most Important Interview Points

1. **`useEffect` runs after render** — asynchronously after the browser has painted. Not during render (would break purity). Not synchronously after DOM update (that's `useLayoutEffect`).

2. **Three forms of deps array** — no array (every render), `[]` (mount only), `[deps]` (mount + dep change). Each has its use case.

3. **Always write cleanup** — every effect that sets something up (timer, listener, subscription, fetch) must return a cleanup function that tears it down. Missing cleanup = memory leaks.

4. **Stale closure** — closures capture values at creation time. Effects with empty deps capture state at mount. Fix: functional updater `setState(prev => ...)` or include in deps.

5. **Objects/functions in deps cause infinite loops** — new reference each render triggers effect which triggers render which creates new reference. Fix: `useMemo`/`useCallback`.

6. **Async in useEffect** — can't make useEffect async. Define named async function inside, call immediately. Always catch `AbortError` separately.

7. **Race conditions** — fix with AbortController (cancels requests) or ignore flag (skips stale results). AbortController is preferred for fetch.

8. **You might not need an effect** — derived state, event responses, prop-based resets. These anti-patterns cause extra renders and bugs. Compute during render or handle in event handlers.

9. **`useLayoutEffect` for DOM measurements** — only when you need to measure DOM and adjust layout BEFORE paint to prevent visual flash. Default to `useEffect`.

10. **Strict Mode double-firing** is intentional — reveals effects that aren't cleanup-safe. Write proper cleanup and the double-fire won't matter.

### Key Practical Takeaways

- Pattern: `const controller = new AbortController(); ... return () => controller.abort();`
- Pattern: `let ignore = false; ... return () => { ignore = true; };`
- Debounce with useEffect: `setTimeout` in effect, `clearTimeout` in cleanup
- Subscription: return the unsubscribe function directly from cleanup
- Async: `async function fetchData() {...} fetchData();` inside useEffect
- `useLayoutEffect` → `useEffect` migration is usually safe (add `[]` deps)
- eslint `exhaustive-deps` is your ally — follow its suggestions

### Common Mistakes

❌ `useEffect(async () => {...})` — returns Promise, not cleanup function
❌ Missing cleanup for timers, listeners, subscriptions
❌ Empty deps with stale closures (interval using state without functional updater)
❌ Objects/functions in deps causing infinite loops
❌ Using useEffect for derived state (extra renders, sync bugs)
❌ Using useEffect for event-triggered actions (use event handlers)
❌ Ignoring `exhaustive-deps` warnings by suppressing them
❌ Using `useLayoutEffect` by default (blocks paint, performance cost)
❌ Race conditions from not aborting previous fetches
❌ Not handling AbortError in catch blocks

---

[⬅ Previous Chapter](#14-component-lifecycle) | [📖 Main Index](#main-index) | [Next Chapter ➡](#16-rules-of-hooks-and-hook-internals)

---

*Chapter 15 Complete — useEffect: Complete Mastery | Part F*
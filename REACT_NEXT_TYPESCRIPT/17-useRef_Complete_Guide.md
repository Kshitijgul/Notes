<a id="17-useref-complete-guide"></a>

[⬅ Previous Chapter](#16-rules-of-hooks-and-hook-internals) | [📖 Main Index](#main-index) | [Next Chapter ➡](#18-usecontext-context-api)

---

# Chapter 17: useRef — Complete Guide

## 📌 Learning Objectives

By the end of this chapter, you will:

- **Understand** the two distinct use cases of `useRef` — mutable persistence and DOM access
- **Access** DOM elements directly via refs — focus, scroll, measure, animate
- **Store** mutable values that don't trigger re-renders — timer IDs, previous values, render counts
- **Implement** the previous value pattern used in many real-world scenarios
- **Forward refs** to child components using `React.forwardRef()`
- **Expose** custom imperative methods using `useImperativeHandle`
- **Identify** when to use refs vs state — the key architectural decision
- **Answer 10+ interview questions** on useRef deeply

---

<a id="chapter-index-table-17"></a>

## Chapter Index Table

| Topic No. | Topic Name | Subtopics |
|-----------|-----------|-----------|
| 17.1 | [useRef Basics — Two Use Cases](#171-useref-basics--two-use-cases) | Mutable persistence<br>DOM access<br>ref object shape |
| 17.2 | [DOM Access with useRef](#172-dom-access-with-useref) | ref attachment<br>Focus/scroll/measure<br>Ref callback |
| 17.3 | [Mutable Values (no re-render)](#173-mutable-values-no-re-render) | Timer IDs<br>Previous value pattern<br>Render count |
| 17.4 | [forwardRef — Passing Refs to Children](#174-forwardref--passing-refs-to-children) | React.forwardRef API<br>When & why |
| 17.5 | [useImperativeHandle](#175-useimperativehandle) | Exposing methods<br>When to use |
| 💡 | [Interview Questions](#-interview-questions) | 10+ with Answers |
| 🧪 | [Practice Problems](#-practice-problems) | 5 Coding + 5 Theory |
| 🚀 | [Mini Project](#-mini-project) | Custom Video Player with Ref Controls |
| ⚡ | [Quick Revision](#-quick-revision) | Key bullets, traps |
| 📌 | [Chapter Summary](#-chapter-summary) | Final takeaways |

---

## 17.1 useRef Basics — Two Use Cases

<a id="171-useref-basics--two-use-cases"></a>

### What is useRef?

`useRef` returns a **mutable ref object** — a plain JavaScript object with a single property `current`. This object persists across renders (like state) but **does NOT trigger a re-render when changed** (unlike state).

```jsx
import { useRef } from 'react';

const myRef = useRef(initialValue);
// Returns: { current: initialValue }

// Reading:
console.log(myRef.current);

// Writing (MUTABLE — no re-render triggered):
myRef.current = newValue;

// Unlike state:
// setState(newValue) → triggers re-render
// myRef.current = newValue → NO re-render
```

---

### The ref Object Shape

```jsx
// useRef always returns an object with ONE property: current
const countRef = useRef(0);
// { current: 0 }

const inputRef = useRef(null);
// { current: null }  → will be { current: <input DOM element> } after mount

const timerRef = useRef(null);
// { current: null }  → will store setInterval ID

// The object itself is STABLE — same object reference across ALL renders
// Only the .current property changes
const ref = useRef(42);
console.log(ref === ref);  // Always true — same object!
// But ref.current can change freely
```

---

### Two Use Cases Side by Side

```
useRef Use Case 1: MUTABLE VALUE STORE
  ─────────────────────────────────────
  • Store values that shouldn't trigger re-renders
  • Timer IDs, previous values, render counts
  • Interval IDs, animation frames
  • Mutable flags (is fetching, is mounted)
  • Change via: myRef.current = newValue

useRef Use Case 2: DOM ELEMENT ACCESS
  ─────────────────────────────────────
  • Direct access to underlying DOM node
  • Focus an input, scroll to position, measure dimensions
  • Third-party library initialization (e.g., map, chart)
  • Imperative animations
  • Attach via: <div ref={myRef} />
  • Access via: myRef.current (is the DOM node after mount)
```

---

### useRef vs useState — The Critical Distinction

```jsx
// useState: changes trigger re-render
const [count, setCount] = useState(0);
setCount(1);  // → React schedules re-render → component re-runs → UI updates

// useRef: changes do NOT trigger re-render
const countRef = useRef(0);
countRef.current = 1;  // → Nothing happens to React → UI stays the same

// When to use each:
// useState: data that should be VISIBLE in the UI
// useRef: data that should NOT be visible or shouldn't cause renders
//         (implementation details, DOM nodes, timers)
```

---

### 🧠 Hinglish Intuition

`useRef` ek **sticky note** hai jo React ke baahar rakhi hai. Tum kuch bhi likhte raho — React ko pata nahi chalega, woh re-render nahi karega. Isliye yeh perfect hai timer IDs store karne ke liye ya DOM elements access karne ke liye jab tum directly browser ko control karna chahte ho bina React ko involve kiye.

State ek **whiteboard** hai jo class mein sabko dikhai deti hai — change karo toh sab ko pata chalta hai (re-render). Ref ek **personal diary** hai — sirf tumhare liye, class ko inform nahi karta.

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.2 DOM Access with useRef

<a id="172-dom-access-with-useref"></a>

### Attaching a Ref to a DOM Element

```jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  // Step 1: Create the ref
  const inputRef = useRef(null);
  // Initially: { current: null }

  // Step 2: Attach to DOM element with ref prop
  // After render: React sets inputRef.current = <input DOM node>
  return <input ref={inputRef} type="text" />;

  // Step 3: Access DOM node in effects or event handlers
  // inputRef.current = the actual <input> DOM element
  // inputRef.current.focus()   → focuses the input
  // inputRef.current.value     → current value
  // inputRef.current.scrollIntoView() → scrolls it into view
}
```

---

### Use Case 1: Auto-Focus on Mount

```jsx
function SearchModal({ isOpen }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // After modal becomes visible, focus the input
      inputRef.current.focus();
      // This is imperatively focusing — not possible with declarative React
      // The 'autoFocus' HTML attribute doesn't work well with conditional rendering
    }
  }, [isOpen]);  // Run when modal opens

  if (!isOpen) return null;

  return (
    <div className="modal">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}
```

---

### Use Case 2: Scroll to Element

```jsx
function ChatWindow({ messages }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // ?.  = optional chaining — safe if ref not attached yet
  }, [messages]);  // Scroll whenever messages change

  // Scroll to top programmatically
  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToTop}>↑ Scroll to Top</button>
      <div
        ref={containerRef}
        style={{ height: '400px', overflowY: 'auto' }}
      >
        {messages.map(msg => (
          <div key={msg.id} className="message">{msg.text}</div>
        ))}
        {/* Invisible anchor div at the bottom */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
```

---

### Use Case 3: Measuring DOM Dimensions

```jsx
function ResponsiveChart() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial measurement
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    // Resize observer for ongoing measurements
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '300px' }}>
      {/* Only render chart when we know the dimensions */}
      {dimensions.width > 0 && (
        <canvas
          width={dimensions.width}
          height={dimensions.height}
          // Draw chart using canvas 2D context via another ref
        />
      )}
      <p style={{ fontSize: '12px', color: '#94a3b8' }}>
        Container: {dimensions.width.toFixed(0)} × {dimensions.height.toFixed(0)}px
      </p>
    </div>
  );
}
```

---

### Use Case 4: Third-Party Library Integration

```jsx
function MapComponent({ center, zoom }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);  // Store library instance in ref

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map (imperative third-party API)
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom,
    });

    // Cleanup: destroy map on unmount
    return () => {
      mapInstanceRef.current?.remove();
    };
  }, []);  // Initialize once

  // Update center imperatively when prop changes
  useEffect(() => {
    mapInstanceRef.current?.flyTo({ center, speed: 1.2 });
  }, [center]);

  useEffect(() => {
    mapInstanceRef.current?.setZoom(zoom);
  }, [zoom]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
}
```

---

### Ref Callback Pattern

Instead of a ref object, you can pass a **callback function** as the `ref` prop. React calls it with the DOM element when mounted and with `null` when unmounted.

```jsx
function MeasuredInput() {
  const [inputWidth, setInputWidth] = useState(0);

  // Ref callback: called with DOM element or null
  const measureRef = useCallback((node) => {
    if (node !== null) {
      // node = the DOM element (just mounted)
      setInputWidth(node.getBoundingClientRect().width);
    }
    // node = null when unmounted
  }, []);

  return (
    <>
      <input ref={measureRef} type="text" placeholder="Measure my width" />
      <p>Input width: {inputWidth}px</p>
    </>
  );
}

// When is ref callback better than useRef?
// When you need to respond to the ref being attached/detached
// useRef doesn't trigger re-renders when .current changes
// ref callback CAN trigger re-renders (by calling setState inside)
```

---

### When is ref.current Available?

```jsx
function Timeline() {
  const divRef = useRef(null);

  // During render: ref.current = null (DOM not created yet)
  console.log(divRef.current);  // null — called during render

  useEffect(() => {
    // After mount: ref.current = the DOM element
    console.log(divRef.current);  // <div> element ✅
  }, []);

  // During render AGAIN (re-render):
  // ref.current is the DOM element from the previous render ✅
  // (unless the element was conditionally removed)

  return <div ref={divRef}>Content</div>;
}
```

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.3 Mutable Values (no re-render)

<a id="173-mutable-values-no-re-render"></a>

### Pattern 1: Storing Timer IDs

```jsx
// ❌ Problem: Timer ID in state causes extra re-renders
function BadTimer() {
  const [timerId, setTimerId] = useState(null);  // Unnecessary state!

  const start = () => {
    const id = setInterval(() => console.log('tick'), 1000);
    setTimerId(id);  // Triggers re-render — wasteful!
  };

  const stop = () => {
    clearInterval(timerId);
    setTimerId(null);  // Another re-render — wasteful!
  };

  return <button onClick={start}>Start</button>;
}

// ✅ Solution: Timer ID in ref — no extra renders
function GoodTimer() {
  const timerRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  // isRunning in state (visible in UI) ✅
  // Timer ID in ref (implementation detail, invisible) ✅

  const start = () => {
    timerRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
    setIsRunning(true);  // Only UI-relevant state
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);  // Only UI-relevant state
  };

  return (
    <div>
      <button onClick={isRunning ? stop : start}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
```

---

### Pattern 2: Previous Value Pattern

One of the most useful patterns — store the value from the PREVIOUS render.

```jsx
function usePrevious(value) {
  const prevRef = useRef(undefined);

  // useEffect runs AFTER render
  // So during current render: prevRef.current = value from LAST render
  useEffect(() => {
    prevRef.current = value;
    // After this runs: prevRef.current = current render's value
    // Next render: prevRef.current will be THIS render's value
  });  // No deps — runs after every render

  return prevRef.current;  // Returns PREVIOUS render's value
}

// Usage:
function PriceTracker({ currentPrice }) {
  const previousPrice = usePrevious(currentPrice);

  const change = previousPrice !== undefined
    ? currentPrice - previousPrice
    : 0;

  return (
    <div>
      <p>Current: ${currentPrice}</p>
      <p>Previous: ${previousPrice ?? 'N/A'}</p>
      <p style={{ color: change > 0 ? '#22c55e' : change < 0 ? '#ef4444' : '#94a3b8' }}>
        Change: {change > 0 ? '+' : ''}{change.toFixed(2)}
      </p>
    </div>
  );
}
```

---

### Pattern 3: Render Count Tracker

```jsx
function useRenderCount() {
  const renderCount = useRef(0);
  renderCount.current++;  // Increment on every render, no re-render triggered!
  return renderCount.current;
}

function DebuggingComponent({ data }) {
  const renderCount = useRenderCount();

  return (
    <div>
      <p>Render count: {renderCount}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

// Practical use: detecting unnecessary re-renders during optimization
// If renderCount grows faster than expected → check if props/state change unnecessarily
```

---

### Pattern 4: Stale Closure Prevention with useRef

```jsx
// Problem: Event listener inside useEffect captures stale state
function SearchBox() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // ❌ Without ref: query is always '' (captured at mount)
        console.log('Current query at escape:', query);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);  // Empty deps — listener added once, but query is stale!

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// ✅ Fix: Use ref to always access latest value
function SearchBox() {
  const [query, setQuery] = useState('');
  const queryRef = useRef(query);

  // Keep ref in sync with state
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // ✅ queryRef.current is always the latest value
        console.log('Current query at escape:', queryRef.current);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);  // Empty deps OK now — we use ref, not stale closure

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

---

### Pattern 5: Is Mounted Check

```jsx
// Prevent "setState on unmounted component" warning (React 17)
function useMountedState() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}

function AsyncComponent() {
  const [data, setData] = useState(null);
  const isMounted = useMountedState();

  const fetchData = async () => {
    const result = await longRunningFetch();
    // Check if still mounted before setting state
    if (isMounted.current) {
      setData(result);
    }
    // Without this check: warning about setState on unmounted component
  };

  return <button onClick={fetchData}>Load</button>;
}
// Note: React 18+ has removed this warning, but pattern is still good practice
// Better: use AbortController to cancel the fetch entirely (Chapter 15)
```

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.4 forwardRef — Passing Refs to Children

<a id="174-forwardref--passing-refs-to-children"></a>

### The Problem

By default, `ref` is a special prop — React intercepts it and doesn't forward it to the component function as a prop.

```jsx
// ❌ ref is NOT accessible as a prop in child components
function CustomInput({ ref, ...props }) {
  // ref is undefined here!
  // React strips it — doesn't pass it to the function
  return <input ref={ref} {...props} />;  // ref is undefined!
}

// Usage:
const inputRef = useRef(null);
<CustomInput ref={inputRef} />  // ref doesn't reach CustomInput's props!
```

---

### The Solution: React.forwardRef()

```jsx
import { forwardRef, useRef } from 'react';

// forwardRef: wraps the component function, receives ref as SECOND argument
const CustomInput = forwardRef(function CustomInput(props, ref) {
  // ref = the ref passed by the parent
  const { label, ...inputProps } = props;

  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input
        ref={ref}          // ← Forward the ref to the DOM element
        className="input"
        {...inputProps}
      />
    </div>
  );
});

// Usage — now ref works on custom components!
function Parent() {
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div>
      <CustomInput
        ref={inputRef}          // ← ref now reaches the <input> DOM element
        label="Email"
        type="email"
        placeholder="Enter email"
      />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

---

### When forwardRef is Needed

```jsx
// forwardRef is needed when:
// 1. Building a reusable component library
//    (consumers want to access the underlying DOM element)

// 2. Form library integration
//    (React Hook Form, Formik need access to input elements)

// 3. Animation libraries
//    (need direct DOM access for animations)

// 4. Focus management
//    (parent needs to focus a specific input in a form)

// Common real-world example:
const TextField = forwardRef(function TextField(
  { label, error, helperText, ...inputProps },
  ref
) {
  const inputId = useId();

  return (
    <div className="text-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        ref={ref}        // The parent's ref reaches the DOM input
        {...inputProps}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && <p id={`${inputId}-error`} role="alert">{error}</p>}
      {helperText && <p>{helperText}</p>}
    </div>
  );
});

// Usage in a form:
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and focus first error field:
    if (!emailRef.current.value) {
      emailRef.current.focus();  // ✅ Direct DOM access via forwardRef
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField ref={emailRef} label="Email" type="email" />
      <TextField ref={passwordRef} label="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### forwardRef with TypeScript (Preview)

```typescript
// TypeScript: forwardRef with proper typing
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Generic: forwardRef<DOM element type, props type>
const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...props }, ref) {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} {...props} />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

// Usage with full type safety:
const inputRef = useRef<HTMLInputElement>(null);
<Input ref={inputRef} label="Name" type="text" />
```

---

### React 19: ref as a Regular Prop

```jsx
// React 19 DEPRECATES forwardRef!
// ref can now be passed as a regular prop to function components

// React 19 way (no forwardRef needed):
function CustomInput({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}

// Usage — same as before:
const inputRef = useRef(null);
<CustomInput ref={inputRef} label="Email" />

// forwardRef still works in React 19 for backward compatibility
// But new code should use the simpler prop pattern
```

> [!IMPORTANT]
> **React 19 change:** `ref` is now a regular prop in function components — no need for `forwardRef`. The old `forwardRef` API still works but is considered legacy. For React 18 and below, `forwardRef` is still required.

---

### 🧠 Hinglish Intuition

`forwardRef` ek **relay race** ki tarah hai. Parent ke paas ek baton (ref) hai. Normally, React baton uthaa leta hai aur child tak nahi pohonchne deta (ref prop ko intercept karta hai). `forwardRef` bolna hai: "React, yeh baton seedha child tak pohoncha do, khud mat rakh le."

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.5 useImperativeHandle

<a id="175-useimperativehandle"></a>

### What is useImperativeHandle?

`useImperativeHandle` lets you **customize what the parent sees** when it accesses `ref.current`. Instead of the raw DOM node, you expose a controlled API of methods.

```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

// Basic syntax:
useImperativeHandle(ref, () => ({
  // This object is what the parent gets via ref.current
  method1() { /* ... */ },
  method2() { /* ... */ },
}), [deps]);  // Optional deps — when to re-create the handle
```

---

### Why useImperativeHandle?

```
Without useImperativeHandle:
  Parent ref → points to the DOM element
  Parent has FULL access to all DOM methods and properties
  Parent might misuse the ref (call methods you don't intend to expose)

With useImperativeHandle:
  Parent ref → points to YOUR custom API object
  Parent only gets the methods YOU explicitly expose
  Encapsulation: internal implementation is hidden
```

---

### Example: Custom Input with Exposed Methods

```jsx
const SmartInput = forwardRef(function SmartInput(props, ref) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  // Expose a controlled API — NOT the raw DOM node
  useImperativeHandle(ref, () => ({
    // Parent can call: inputRef.current.focus()
    focus() {
      inputRef.current?.focus();
    },

    // Parent can call: inputRef.current.clear()
    clear() {
      setValue('');
      setHasError(false);
      inputRef.current?.focus();
    },

    // Parent can call: inputRef.current.validate()
    validate() {
      const isValid = value.length >= 3;
      setHasError(!isValid);
      return isValid;
    },

    // Parent can call: inputRef.current.getValue()
    getValue() {
      return value;
    },

    // ❌ NOT exposed: scrollIntoView, setAttribute, etc.
    // Parent CANNOT access the raw DOM — only our safe API
  }), [value]);  // Deps: re-create handle when value changes
  // (so getValue() always returns latest value)

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        onChange={e => { setValue(e.target.value); setHasError(false); }}
        style={{ border: `2px solid ${hasError ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', padding: '8px 12px' }}
        {...props}
      />
      {hasError && <p style={{ color: '#ef4444', fontSize: '12px' }}>Min 3 characters</p>}
    </div>
  );
});

// Parent uses the custom API:
function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = nameRef.current.validate();
    const isEmailValid = emailRef.current.validate();

    if (!isNameValid) {
      nameRef.current.focus();  // Focus first invalid field
      return;
    }
    if (!isEmailValid) {
      emailRef.current.focus();
      return;
    }

    console.log('Submitting:', {
      name: nameRef.current.getValue(),
      email: emailRef.current.getValue(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SmartInput ref={nameRef} placeholder="Name (min 3 chars)" />
      <SmartInput ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => {
        nameRef.current.clear();
        emailRef.current.clear();
      }}>
        Reset Form
      </button>
    </form>
  );
}
```

---

### When to Use useImperativeHandle (Sparingly!)

```jsx
// ✅ APPROPRIATE use cases:
// 1. Component library building — expose safe API for consumers
// 2. Focus management in complex forms
// 3. Encapsulating complex imperatives (video player controls)
// 4. When multiple parents need to control one component

// ❌ INAPPROPRIATE use cases:
// Using it to avoid lifting state up — fix with state
// Using it to bypass React's data flow — fix with props
// Using it for simple cases that could be props/callbacks

// The React rule of thumb:
// "If you can do it with props and state, do it with props and state.
//  Only reach for refs when you need to ESCAPE React's model."

// Example of overuse (WRONG):
const CounterRef = forwardRef(function Counter(props, ref) {
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increment: () => setCount(c => c + 1),  // ❌ Should be a prop/callback!
    reset: () => setCount(0),               // ❌ Should be a prop/callback!
    getCount: () => count,                  // ❌ Should be a prop!
  }));

  return <p>{count}</p>;
});
// This anti-pattern bypasses React's data flow unnecessarily
// Better: <Counter count={count} onIncrement={handleIncrement} />
```

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 💡 Interview Questions

<a id="-interview-questions"></a>

### Conceptual Questions

---

**Q1. What are the two main use cases of `useRef`? How are they different?**

**Answer:**
`useRef` has two distinct use cases:

1. **DOM element access** — Store a reference to a real DOM node. Attach via `ref={myRef}`. After mount, `myRef.current` is the DOM element. Used for: focus management, scroll control, measurements, third-party library initialization.

2. **Mutable value persistence** — Store any mutable value that should persist across renders without triggering re-renders. Used for: timer IDs, previous values, render counters, is-mounted flags, stale closure prevention.

**The critical difference between the two:** DOM refs are set by React after each render. Mutable value refs are set manually by your code whenever needed.

**Common:** Both return a `{ current: value }` object that persists across renders (same object reference throughout component lifetime) and does NOT trigger re-renders when `current` changes.

---

**Q2. What is the difference between `useRef` and `useState`?**

**Answer:**

| | useState | useRef |
|--|----------|--------|
| **Re-render on change** | ✅ Yes — triggers re-render | ❌ No — no re-render |
| **Visible in UI** | Should be visible | Usually not visible |
| **How to update** | `setState(newValue)` | `ref.current = newValue` |
| **Read latest value** | Only current render's snapshot | Always latest (mutable) |
| **Use for** | UI data, form values, toggles | Timers, DOM nodes, counters |

**Key insight:** If you want the component to re-render when data changes → use `useState`. If you just need to store something without causing re-renders → use `useRef`.

---

**Q3. Why can't you just pass `ref` as a regular prop to a child component?**

**Answer:**
`ref` is a special reserved prop in React (like `key`). React intercepts it before passing props to the component function — it never appears in `props`. Attempting to access `props.ref` returns `undefined`.

This is by design: React uses `ref` to attach to the DOM element or class instance after rendering. If it were a regular prop, it could conflict with the internal behavior.

`forwardRef()` solves this by wrapping the component and providing `ref` as an explicit second argument to the function, bypassing React's prop interception.

In **React 19**, this limitation was removed — `ref` can now be a regular prop in function components without `forwardRef`.

---

**Q4. Explain `forwardRef` with a practical example.**

**Answer:**
`forwardRef` allows a parent's ref to "pass through" a custom component and attach to a specific DOM element inside it.

```jsx
const CustomInput = forwardRef(function CustomInput(props, ref) {
  return <input ref={ref} className="custom" {...props} />;
});

// Parent:
const inputRef = useRef(null);
<CustomInput ref={inputRef} placeholder="Search" />

// After mount: inputRef.current = the <input> DOM element
// Parent can call: inputRef.current.focus()
```

**Without forwardRef:** `inputRef.current` would be `null` because React can't attach the ref to a custom component without instruction.

**Use when:** Building reusable components where consumers need DOM access, form libraries, focus management, animation.

---

**Q5. What is `useImperativeHandle` and when should you use it?**

**Answer:**
`useImperativeHandle` customizes the value exposed via `ref.current` when a parent holds a ref to your component. Instead of exposing the raw DOM node, you expose a custom object with specific methods.

```jsx
useImperativeHandle(ref, () => ({
  focus() { inputRef.current.focus(); },
  clear() { setInput(''); },
  validate() { return input.length > 0; },
}));
```

**Use when:**
- Building component library with controlled, safe APIs
- Exposing only specific operations (not full DOM access)
- Multiple parents need to trigger component actions

**Avoid when:**
- Props and callbacks would solve the problem (prefer React's data flow)
- You're trying to bypass state management (anti-pattern)

React's guideline: Prefer declarative (props/state) over imperative (refs) wherever possible.

---

**Q6. What is the "previous value pattern" using `useRef`?**

**Answer:**
Store the value from the PREVIOUS render using a ref that's updated in `useEffect`:

```jsx
function usePrevious(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;  // Runs AFTER render — so reads current render's value
  });                          // On NEXT render: prevRef.current = previous value
  return prevRef.current;      // Returns PREVIOUS render's value during this render
}
```

**Why this works:** `useEffect` runs after the component renders. When the component renders with a new `value`, it first returns `prevRef.current` (which holds the old value). Then `useEffect` runs and updates `prevRef.current` to the new value. On the NEXT render, `prevRef.current` holds what was the "current" value from the previous render.

**Use cases:** Detecting direction of change, comparing old vs new values, animation triggers based on value changes.

---

**Q7. Why store timer IDs in a ref instead of state?**

**Answer:**
Timer IDs are **implementation details** — they're not displayed in the UI and shouldn't cause re-renders:

```jsx
// ❌ State: causes unnecessary re-renders
const [timerId, setTimerId] = useState(null);
setTimerId(setInterval(fn, 1000));  // Triggers re-render!
clearInterval(timerId);
setTimerId(null);                   // Another re-render!

// ✅ Ref: no extra renders
const timerRef = useRef(null);
timerRef.current = setInterval(fn, 1000);  // No re-render
clearInterval(timerRef.current);           // No re-render
timerRef.current = null;                   // No re-render
```

The rule: visible UI data → state. Behind-the-scenes implementation details → ref.

---

**Q8. What is the ref callback pattern and when is it better than `useRef`?**

**Answer:**
A ref callback is a function passed as the `ref` prop instead of a ref object. React calls it with the DOM element on mount and `null` on unmount.

```jsx
const callbackRef = useCallback((node) => {
  if (node) {
    // node is the DOM element — just mounted
    setWidth(node.getBoundingClientRect().width);
  }
}, []);

<div ref={callbackRef}>...</div>
```

**Better than `useRef` when:**
- You need to run code when the ref is first attached (element mounted)
- `useRef` + `useEffect` with `[]` misses the attachment event if element is conditional
- You need the measurement immediately when element appears, not after full component mount

**`useRef` + `useEffect` limitation:**
```jsx
// Problem: If element is conditionally rendered, useEffect with [] runs once at mount
// But the element might not exist at mount time!
const ref = useRef(null);
useEffect(() => {
  // ref.current might be null if element is not rendered yet!
  measure(ref.current);
}, []);  // Only runs once — misses conditional rendering

// ✅ Ref callback: called every time element is mounted/unmounted
const callbackRef = useCallback((node) => {
  if (node) measure(node);  // Called every time element appears in DOM
}, []);
```

---

### Scenario-Based Questions

---

**Q9. A developer wants to reset a child form component from a parent. What's the right approach?**

**Answer:**
There are two correct approaches, depending on complexity:

**Approach 1: key prop (simplest)**
```jsx
function Parent() {
  const [formKey, setFormKey] = useState(0);
  return (
    <>
      <ChildForm key={formKey} />
      <button onClick={() => setFormKey(k => k + 1)}>Reset</button>
    </>
  );
}
// Changing key unmounts and remounts the form — all state resets
```

**Approach 2: Controlled props**
```jsx
// ChildForm receives formData and onChange from parent
// Parent controls the data — easy to reset by setting empty object
<ChildForm formData={formData} onChange={setFormData} />
<button onClick={() => setFormData({})}>Reset</button>
```

**Avoid: useImperativeHandle for reset** — this anti-pattern bypasses React's data flow when props/callbacks would work. Only use `useImperativeHandle` when the operation is genuinely imperative (like focus, play/pause animation, etc.).

---

**Q10. What happens when you read `ref.current` during render?**

**Answer:**
It depends on when the component renders:

**During the FIRST render (mount):**
- `ref.current` = the initial value (`null` for DOM refs)
- The DOM element hasn't been created yet
- Reading `inputRef.current` during render returns `null`

**During RE-RENDERS:**
- `ref.current` = the DOM element from the previous render (the actual DOM node persists)
- The DOM hasn't been updated yet for THIS render (React updates after render)
- Usually safe to read, but value may be slightly stale

**Best practice:** Only read `ref.current` in:
- Event handlers (after mount, before unmount)
- `useEffect`/`useLayoutEffect` callbacks (after DOM update)
- Not directly during render (for DOM refs — the DOM isn't ready)

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 🧪 Practice Problems

<a id="-practice-problems"></a>

### Coding Questions

---

**1. Build a `usePrevious` hook and demonstrate it in a counter with direction indicator**

```jsx
import { useState, useEffect, useRef } from 'react';

// Generic usePrevious hook
function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  }); // No deps — runs after every render
  return ref.current;
}

function DirectionalCounter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  const direction = prevCount === undefined ? 'initial'
    : count > prevCount ? 'up'
    : count < prevCount ? 'down'
    : 'same';

  const directionConfig = {
    up:      { icon: '↑', color: '#22c55e', bg: '#dcfce7' },
    down:    { icon: '↓', color: '#ef4444', bg: '#fee2e2' },
    same:    { icon: '→', color: '#94a3b8', bg: '#f1f5f9' },
    initial: { icon: '•', color: '#64748b', bg: '#f8fafc' },
  };
  const config = directionConfig[direction];

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', maxWidth: '300px' }}>
      <h2>Directional Counter</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '48px', fontWeight: '800', color: '#1e293b' }}>{count}</p>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94a3b8' }}>
            Previous: {prevCount ?? 'N/A'}
          </p>
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: config.bg,
          borderRadius: '8px',
          textAlign: 'center',
          minWidth: '60px',
        }}>
          <p style={{ margin: 0, fontSize: '28px', color: config.color }}>{config.icon}</p>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: config.color, fontWeight: '600' }}>
            {direction.toUpperCase()}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setCount(c => c - 1)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>-</button>
        <button onClick={() => setCount(0)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Reset</button>
        <button onClick={() => setCount(c => c + 1)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>+</button>
      </div>

      <p style={{ marginTop: '16px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
        Change: {prevCount !== undefined ? (count - prevCount > 0 ? '+' : '') + (count - prevCount) : 'N/A'}
      </p>
    </div>
  );
}

export default DirectionalCounter;
```

---

**2. Build a `useClickOutside` hook using refs**

```jsx
import { useRef, useEffect, useState, useCallback } from 'react';

function useClickOutside(callback) {
  const elementRef = useRef(null);
  const callbackRef = useRef(callback);

  // Keep callback ref current
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClick = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);  // Only set up once — callback handled via callbackRef

  return elementRef;
}

function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useClickOutside(() => setIsOpen(false));

  const handleRightClick = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const menuItems = ['Cut', 'Copy', 'Paste', 'Delete', 'Properties'];

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div
        onContextMenu={handleRightClick}
        style={{
          height: '300px',
          backgroundColor: '#f8fafc',
          border: '2px dashed #e2e8f0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94a3b8',
          cursor: 'context-menu',
          userSelect: 'none',
        }}
      >
        Right-click anywhere here for context menu
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            zIndex: 1000,
            overflow: 'hidden',
            minWidth: '150px',
          }}
        >
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => { alert(item); setIsOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContextMenu;
```

---

**3. Build an auto-resizing textarea using ref for measurement**

```jsx
import { useRef, useEffect, useState } from 'react';

function useAutoResize(value) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto so it can shrink
    textarea.style.height = 'auto';

    // Set height to scrollHeight (content height)
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);  // Resize whenever value changes

  return textareaRef;
}

function AutoResizeTextarea({ placeholder, maxRows = 10 }) {
  const [value, setValue] = useState('');
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useAutoResize(value);

  const handleChange = (e) => {
    setValue(e.target.value);
    setLineCount(e.target.value.split('\n').length);
  };

  const charCount = value.length;
  const maxChars = 500;
  const isNearLimit = charCount > maxChars * 0.8;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '480px', padding: '20px' }}>
      <h2>Auto-Resizing Textarea</h2>

      <div style={{
        border: '2px solid #d1d5db',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || "Start typing... I'll grow with you!"}
          maxLength={maxChars}
          style={{
            width: '100%',
            minHeight: '56px',
            maxHeight: `${maxRows * 24}px`,
            padding: '12px 16px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: '15px',
            lineHeight: '24px',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            overflowY: 'auto',
          }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#fafafa',
        }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Lines: {lineCount}
          </span>
          <span style={{
            fontSize: '12px',
            color: isNearLimit ? '#ef4444' : '#94a3b8',
            fontWeight: isNearLimit ? '700' : '400',
          }}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
        Uses useRef to measure scrollHeight and adjust height without re-renders
      </p>
    </div>
  );
}

export default AutoResizeTextarea;
```

---

**4. Demonstrate forwardRef with a reusable Input component**

```jsx
import { forwardRef, useRef, useState, useId } from 'react';

// Reusable Input component with forwardRef
const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onRightIconClick,
    type = 'text',
    ...rest
  },
  ref
) {
  const inputId = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '600',
            fontSize: '14px',
            color: error ? '#dc2626' : focused ? '#3b82f6' : '#374151',
            transition: 'color 0.15s',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <div style={{
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none',
          }}>
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}  // ← Forwarded ref attaches here
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: `10px ${rightIcon ? '40px' : '14px'} 10px ${leftIcon ? '40px' : '14px'}`,
            border: `2px solid ${
              error ? '#ef4444' :
              focused ? '#3b82f6' :
              '#d1d5db'
            }`,
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
            backgroundColor: '#fff',
          }}
          aria-invalid={!!error}
          aria-describedby={[
            error ? `${inputId}-error` : '',
            helperText ? `${inputId}-helper` : '',
          ].filter(Boolean).join(' ') || undefined}
          {...rest}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            style={{
              position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)', background: 'none', border: 'none',
              cursor: 'pointer', color: '#94a3b8', padding: '4px',
            }}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" style={{ margin: '4px 0 0', fontSize: '12px', color: '#ef4444' }}>
          ⚠ {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>
          {helperText}
        </p>
      )}
    </div>
  );
});

// Demo — Parent uses refs for focus management
function RegistrationForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const fields = [
    { ref: nameRef, name: 'name', type: 'text', label: 'Full Name', placeholder: 'Enter your name', leftIcon: '👤', helperText: 'As it appears on your ID' },
    { ref: emailRef, name: 'email', type: 'email', label: 'Email Address', placeholder: 'you@example.com', leftIcon: '📧' },
    { ref: passwordRef, name: 'password', label: 'Password', placeholder: 'Min 8 characters', leftIcon: '🔒', type: showPassword ? 'text' : 'password', rightIcon: showPassword ? '🙈' : '👁', onRightIconClick: () => setShowPassword(s => !s), helperText: 'At least 8 characters' },
  ];

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) { newErrors.name = 'Name is required'; }
    if (!form.email.includes('@')) { newErrors.email = 'Valid email required'; }
    if (form.password.length < 8) { newErrors.password = 'Min 8 characters required'; }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field using refs!
      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.password) passwordRef.current?.focus();
      return;
    }

    alert('Form submitted successfully!');
  };

  return (
    <div style={{ padding: '32px', maxWidth: '400px', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '24px' }}>Registration</h1>
      <form onSubmit={handleSubmit}>
        <Input ref={nameRef} {...fields[0]} value={form.name} onChange={handleChange('name')} error={errors.name} />
        <Input ref={emailRef} {...fields[1]} value={form.email} onChange={handleChange('email')} error={errors.email} />
        <Input ref={passwordRef} {...fields[2]} value={form.password} onChange={handleChange('password')} error={errors.password} />
        <button
          type="submit"
          style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
```

---

**5. Build a render performance tracker using useRef**

```jsx
import { useRef, useState, useEffect, memo } from 'react';

function useRenderPerformance(componentName) {
  const renderCount = useRef(0);
  const renderTimes = useRef([]);
  const startTime = useRef(performance.now());

  renderCount.current++;
  const renderTime = performance.now() - startTime.current;
  renderTimes.current.push(renderTime);
  if (renderTimes.current.length > 10) renderTimes.current.shift();

  startTime.current = performance.now();  // Reset for next render

  const avgTime = renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length;

  return {
    renderCount: renderCount.current,
    lastRenderTime: renderTime.toFixed(2),
    avgRenderTime: avgTime.toFixed(2),
  };
}

// Component being tracked
const ExpensiveList = memo(function ExpensiveList({ items, filter }) {
  const perf = useRenderPerformance('ExpensiveList');

  const filtered = items.filter(item =>
    filter ? item.name.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div>
      <div style={{ padding: '8px 12px', backgroundColor: '#fef9c3', borderRadius: '6px', marginBottom: '12px', fontSize: '12px', fontFamily: 'monospace' }}>
        Renders: {perf.renderCount} | Last: {perf.lastRenderTime}ms | Avg: {perf.avgRenderTime}ms
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {filtered.map(item => (
          <div key={item.id} style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
            {item.name} — {item.value}
          </div>
        ))}
      </div>
    </div>
  );
});

function PerformanceDemo() {
  const [filter, setFilter] = useState('');
  const [unrelatedState, setUnrelatedState] = useState(0);

  const items = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: ['Apple', 'Banana', 'Cherry', 'Date', 'Fig'][i % 5] + ` ${i + 1}`,
    value: (Math.random() * 100).toFixed(2),
  }));

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>Render Performance Tracker</h2>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
        useRef tracks render count and timing without causing extra renders
      </p>

      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Filter items..."
        style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '8px', boxSizing: 'border-box' }}
      />

      <button
        onClick={() => setUnrelatedState(c => c + 1)}
        style={{ padding: '6px 14px', marginBottom: '16px', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
      >
        Trigger Parent Re-render ({unrelatedState})
      </button>

      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
        💡 Parent re-renders don't re-render the memoized list (unless filter changes)
      </p>

      <ExpensiveList items={items} filter={filter} />
    </div>
  );
}

export default PerformanceDemo;
```

---

### Theory Questions

---

**T1. Why doesn't changing `ref.current` trigger a re-render?**

**Expected Answer:**
`useState` and React's rendering system are connected — when you call a setState function, React schedules a re-render of that component. React is explicitly notified.

`ref.current` is just a regular JavaScript object property mutation. React has NO mechanism to observe property changes on arbitrary objects. React doesn't watch `ref.current` for changes — there's nothing hooking into the JavaScript engine's property setter.

This is by design: React wants to be notified ONLY when you call state setters (which you explicitly choose). Silent mutations via refs allow "escape hatch" behavior for implementation details that shouldn't affect the UI rendering cycle.

---

**T2. When would you use a ref callback instead of `useRef`?**

**Expected Answer:**
Use ref callback when you need to run code at the MOMENT a specific DOM element appears or disappears:

1. **Conditional elements:** If the element is conditionally rendered, `useRef + useEffect([])` misses the event (effect runs once at mount, but element might not exist yet). Ref callback is called exactly when the element is added to/removed from the DOM.

2. **Measuring on mount:** Need dimensions immediately when element first appears — not just at component mount time.

3. **Triggering state updates based on DOM presence:** The ref callback can call `setState`, ref objects cannot (changing `.current` doesn't trigger renders).

The tradeoff: ref callbacks can cause extra renders (if they call setState). Use `useCallback` to stabilize the callback reference and avoid creating a new callback each render.

---

**T3. What happens if you store a DOM ref value in state?**

**Expected Answer:**
It works but is an anti-pattern. The DOM element (a non-serializable object) would be stored in state. This has downsides:

1. **Extra re-render:** `setState(domElement)` triggers a re-render unnecessarily
2. **React doesn't expect it:** State should contain serializable data, not DOM nodes
3. **Memory implications:** Keeping references to DOM nodes in state can prevent garbage collection
4. **Ref callback is the right tool:** If you need a DOM element to be available in state (to trigger a render), use a ref callback that calls `setState` with a boolean or dimension value, not the element itself

Correct pattern for "respond to element becoming available":
```jsx
const [isAvailable, setIsAvailable] = useState(false);
const elemRef = useRef(null);
const callbackRef = useCallback(node => {
  elemRef.current = node;        // Store element in ref (no render)
  setIsAvailable(node !== null); // Store boolean in state (causes render)
}, []);
```

---

**T4. Explain when `forwardRef` is necessary and when it's not.**

**Expected Answer:**

**forwardRef IS necessary when:**
- You want a parent's `useRef` to point to a DOM element INSIDE a custom component
- Building reusable UI library components (consumers need DOM access)
- Integrating with form libraries (React Hook Form calls `ref(element)` on inputs)
- Focus management across component boundaries

**forwardRef is NOT necessary when:**
- The DOM access stays inside the component (use an internal ref)
- You can solve the problem with props and state instead
- Using React 19 (ref is a regular prop now)
- The parent needs to call parent-defined logic (use callbacks instead)

```jsx
// forwardRef NOT needed:
function Input({ onFocus, ...props }) {
  const inputRef = useRef(null);
  // Internal ref — parent doesn't need direct access
  return <input ref={inputRef} onFocus={onFocus} {...props} />;
}

// forwardRef NEEDED:
const Input = forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
  // Parent's ref now points to this <input>
});
```

---

**T5. What is the difference between `useImperativeHandle` and `forwardRef`?**

**Expected Answer:**

**`forwardRef`** — A wrapper that allows the parent's ref to be passed through to the child component function as a second argument. The ref then typically points to a DOM element:
```jsx
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);
// Parent ref → <input> DOM node
```

**`useImperativeHandle`** — Used INSIDE a `forwardRef` component to REPLACE what the ref points to. Instead of the raw DOM element, you expose a custom object:
```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    getValue: () => inputRef.current.value,
    // NOT the DOM node — a custom API
  }));
  return <input ref={inputRef} {...props} />;
});
// Parent ref → { focus: fn, getValue: fn } — custom object, not DOM node
```

`forwardRef` is needed before `useImperativeHandle` — you need to receive the ref first before you can customize what it points to.

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 🚀 Mini Project

<a id="-mini-project"></a>

### Custom Video Player with Ref Controls

---

### Problem Statement

Build a **feature-rich custom video player** that uses `useRef` for imperative video control, `forwardRef` to expose player methods to parent components, and `useImperativeHandle` to create a clean player API. This project demonstrates all major `useRef` concepts in a real-world context.

---

### Features

- ✅ Play/Pause with useRef to control video element imperatively
- ✅ Seek (scrubber) using refs for time management
- ✅ Volume control using refs
- ✅ Fullscreen toggle via imperativeHandle
- ✅ `forwardRef` to expose player API to parent
- ✅ `useImperativeHandle` for clean player control interface
- ✅ Keyboard shortcuts using ref + event listener pattern
- ✅ Time display using refs (no re-render for every frame)
- ✅ Previous/current time tracking with usePrevious pattern

---

### Implementation

```jsx
import { useState, useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

// ================================================================
// usePrevious hook
// ================================================================
function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => { ref.current = value; });
  return ref.current;
}

// ================================================================
// TIME UTILITIES
// ================================================================
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ================================================================
// VIDEO PLAYER COMPONENT (with forwardRef + useImperativeHandle)
// ================================================================
const VideoPlayer = forwardRef(function VideoPlayer(
  { src, poster, onPlay, onPause, onTimeUpdate, onEnded },
  ref
) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const prevVolume = usePrevious(volume);
  const hideControlsTimerRef = useRef(null);

  // ====== EXPOSE PLAYER API VIA useImperativeHandle ======
  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current?.play();
    },
    pause() {
      videoRef.current?.pause();
    },
    seek(time) {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
      }
    },
    setVolume(vol) {
      if (videoRef.current) {
        videoRef.current.volume = Math.max(0, Math.min(vol, 1));
        setVolume(vol);
      }
    },
    mute() {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    },
    unmute() {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    },
    toggleFullscreen() {
      handleFullscreen();
    },
    getCurrentTime() {
      return videoRef.current?.currentTime ?? 0;
    },
    getDuration() {
      return videoRef.current?.duration ?? 0;
    },
    isPlaying() {
      return !videoRef.current?.paused;
    },
    setPlaybackRate(rate) {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);
      }
    },
  }), [duration]);

  // ====== SHOW/HIDE CONTROLS ======
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    return () => clearTimeout(hideControlsTimerRef.current);
  }, []);

  // ====== VIDEO EVENT HANDLERS ======
  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);  // Always show controls when paused
    onPause?.();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    onTimeUpdate?.(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
    setIsLoading(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    onEnded?.();
  };

  // ====== CONTROLS ======
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    const rect = progress.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * duration;
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted && volume === 0) {
      video.volume = prevVolume || 0.5;
      setVolume(prevVolume || 0.5);
    }
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const skipSeconds = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
  };

  // ====== FULLSCREEN DETECTION ======
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // ====== KEYBOARD SHORTCUTS ======
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement) &&
          document.activeElement !== document.body) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipSeconds(5);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipSeconds(-5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.min(1, volume + 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (videoRef.current) {
            const newVol = Math.max(0, volume - 0.1);
            videoRef.current.volume = newVol;
            setVolume(newVol);
          }
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          handleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, isPlaying]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  // ================================================================
  // RENDER
  // ================================================================
  return (
    <div
      ref={containerRef}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
      style={{
        position: 'relative',
        backgroundColor: '#000',
        borderRadius: isFullscreen ? 0 : '12px',
        overflow: 'hidden',
        cursor: showControls ? 'default' : 'none',
        userSelect: 'none',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* VIDEO ELEMENT */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        style={{ width: '100%', display: 'block', aspectRatio: '16/9' }}
      />

      {/* LOADING SPINNER */}
      {isLoading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          <div style={{
            width: '48px', height: '48px',
            border: '4px solid rgba(255,255,255,0.2)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div>
      )}

      {/* PLAY/PAUSE CENTER INDICATOR */}
      {!isPlaying && !isLoading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '72px', height: '72px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px',
          }}>
            ▶
          </div>
        </div>
      )}

      {/* CONTROLS OVERLAY */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          padding: '32px 16px 12px',
          transition: 'opacity 0.3s',
          opacity: showControls ? 1 : 0,
        }}
      >
        {/* PROGRESS BAR */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          style={{
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            cursor: 'pointer',
            marginBottom: '10px',
            position: 'relative',
          }}
          onMouseEnter={e => e.currentTarget.style.height = '6px'}
          onMouseLeave={e => e.currentTarget.style.height = '4px'}
        >
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#3b82f6',
            borderRadius: '2px',
            transition: 'width 0.1s linear',
          }} />
          <div style={{
            position: 'absolute',
            left: `${progress}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '12px', height: '12px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 0 2px #3b82f6',
          }} />
        </div>

        {/* BOTTOM CONTROLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px', padding: '4px 6px', lineHeight: 1 }}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Skip back/forward */}
          <button onClick={() => skipSeconds(-10)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', padding: '4px', lineHeight: 1 }} title="Back 10s">⏮</button>
          <button onClick={() => skipSeconds(10)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', padding: '4px', lineHeight: 1 }} title="Forward 10s">⏭</button>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={toggleMute}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', padding: '4px', lineHeight: 1 }}
              title="Mute (M)"
            >
              {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
            </button>
            <input
              type="range"
              min="0" max="1" step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              style={{ width: '70px', accentColor: '#3b82f6' }}
            />
          </div>

          {/* Time display */}
          <span style={{ fontSize: '13px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.9)' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Playback rate */}
          <select
            value={playbackRate}
            onChange={e => {
              const rate = parseFloat(e.target.value);
              if (videoRef.current) videoRef.current.playbackRate = rate;
              setPlaybackRate(rate);
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '12px',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(r => (
              <option key={r} value={r} style={{ backgroundColor: '#1e293b' }}>
                {r}×
              </option>
            ))}
          </select>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', padding: '4px', lineHeight: 1 }}
            title="Fullscreen (F)"
          >
            {isFullscreen ? '⊠' : '⛶'}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
});

// ================================================================
// PARENT — Uses the imperative API via ref
// ================================================================
function App() {
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({ time: '0:00', playing: false });

  // Parent can control the player imperatively via ref!
  const controls = [
    { label: '▶ Play', action: () => playerRef.current?.play() },
    { label: '⏸ Pause', action: () => playerRef.current?.pause() },
    { label: '⏮ Start', action: () => playerRef.current?.seek(0) },
    { label: '→ +30s', action: () => playerRef.current?.seek((playerRef.current?.getCurrentTime() || 0) + 30) },
    { label: '🔊 Max Vol', action: () => playerRef.current?.setVolume(1) },
    { label: '🔇 Mute', action: () => playerRef.current?.mute() },
    { label: '1.5× Speed', action: () => playerRef.current?.setPlaybackRate(1.5) },
    { label: '1× Normal', action: () => playerRef.current?.setPlaybackRate(1) },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ color: '#f8fafc', marginBottom: '8px' }}>🎬 Custom Video Player</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
          Demonstrates useRef, forwardRef, useImperativeHandle, usePrevious, and keyboard shortcuts
        </p>

        {/* VIDEO PLAYER */}
        <VideoPlayer
          ref={playerRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://www.w3schools.com/html/pic_trulli.jpg"
          onPlay={() => setPlayerState(s => ({ ...s, playing: true }))}
          onPause={() => setPlayerState(s => ({ ...s, playing: false }))}
          onTimeUpdate={(time) => setPlayerState(s => ({ ...s, time: formatTime(time) }))}
        />

        {/* EXTERNAL CONTROLS (via useImperativeHandle) */}
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#f8fafc', margin: '0 0 12px', fontSize: '14px', fontWeight: '600' }}>
            External Controls (via useImperativeHandle)
          </h3>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {controls.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#334155',
                  color: '#e2e8f0',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => e.target.style.backgroundColor = '#475569'}
                onMouseLeave={e => e.target.style.backgroundColor = '#334155'}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Status: {playerState.playing ? '▶ Playing' : '⏸ Paused'} | Time: {playerState.time}
          </div>
        </div>

        {/* KEYBOARD SHORTCUTS */}
        <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            ⌨️ Keyboard: <kbd style={{ backgroundColor: '#334155', color: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>Space/K</kbd> Play/Pause •
            <kbd style={{ backgroundColor: '#334155', color: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', margin: '0 2px', fontFamily: 'monospace' }}>←→</kbd> Skip 5s •
            <kbd style={{ backgroundColor: '#334155', color: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', margin: '0 2px', fontFamily: 'monospace' }}>↑↓</kbd> Volume •
            <kbd style={{ backgroundColor: '#334155', color: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', margin: '0 2px', fontFamily: 'monospace' }}>M</kbd> Mute •
            <kbd style={{ backgroundColor: '#334155', color: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>F</kbd> Fullscreen
          </p>
        </div>

        {/* CONCEPTS LEGEND */}
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>USEREF CONCEPTS IN THIS PROJECT</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px', color: '#64748b' }}>
            {[
              ['videoRef', 'Direct video element control'],
              ['progressRef', 'Click position calculation'],
              ['containerRef', 'Fullscreen + keyboard focus'],
              ['timerRef', 'Hide controls timer (no renders)'],
              ['forwardRef', 'Parent accesses player via ref'],
              ['useImperativeHandle', 'Safe player API (play, seek, etc.)'],
              ['usePrevious', 'Remember last volume before mute'],
              ['animFrameRef', 'Animation frame ID storage'],
            ].map(([concept, desc]) => (
              <div key={concept} style={{ display: 'flex', gap: '8px' }}>
                <code style={{ color: '#60a5fa', whiteSpace: 'nowrap' }}>{concept}</code>
                <span>— {desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

### useRef Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| DOM ref | `videoRef` → controls video element directly |
| Measurement ref | `progressRef` → calculate click position for seeking |
| Container ref | `containerRef` → fullscreen + keyboard event context |
| Timer ID ref | `hideControlsTimerRef` → stores setTimeout ID, no renders |
| forwardRef | `VideoPlayer` component exposes ref to parent |
| useImperativeHandle | Parent gets `play()`, `seek()`, `setVolume()` API |
| usePrevious | Remembers last volume before muting |
| Keyboard shortcut | Event listener stored in ref scope |
| Stale closure fix | `isPlaying` read via state, not captured closure |

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## ⚡ Quick Revision

<a id="-quick-revision"></a>

### Key Definitions

| Term | One-Line Definition |
|------|-------------------|
| **useRef** | Returns `{ current: value }` object that persists across renders without causing re-renders |
| **ref.current** | Mutable property — changes don't trigger re-renders |
| **DOM ref** | Ref attached to JSX element via `ref={myRef}` — gives DOM node access |
| **Mutable value ref** | Ref storing implementation details — timers, counts, flags |
| **Ref callback** | Function as `ref` prop — called with DOM element on mount/null on unmount |
| **forwardRef** | Wrapper enabling parent's ref to pass through to child component |
| **useImperativeHandle** | Customizes what parent sees via ref.current (replaces DOM node with custom API) |
| **Previous value pattern** | `useRef` + `useEffect` with no deps — stores last render's value |
| **Render count** | Increment `ref.current` each render — never triggers re-render |

---

### useRef vs useState Decision

```
DATA → VISIBLE IN UI → useState
DATA → NOT VISIBLE, just tracking → useRef

Timer ID       → useRef  (no UI change needed)
isPlaying flag → useState (shows in UI: Play/Pause button)
DOM node       → useRef  (not rendered — raw DOM)
error message  → useState (shown to user)
render count   → useRef  (debugging, shouldn't cause renders)
current value  → useState (drives conditional rendering)
previous value → useRef  (comparison only, no render needed)
```

---

### forwardRef Quick Reference

```jsx
// Wrap component with forwardRef:
const Input = forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});

// Parent attaches ref normally:
const inputRef = useRef(null);
<Input ref={inputRef} />
// inputRef.current → <input> DOM element

// React 19: No forwardRef needed!
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

---

### Common Interview Traps

> [!IMPORTANT]
> **Trap 1:** "Changing `ref.current` causes a re-render."
> **Reality:** No! That's the entire point of useRef. Only `useState` setter causes re-renders.

> [!IMPORTANT]
> **Trap 2:** "You can access DOM refs during render."
> **Reality:** During first render, DOM doesn't exist yet — `ref.current` is `null`. Access in `useEffect` or event handlers.

> [!IMPORTANT]
> **Trap 3:** "forwardRef is needed for all child components."
> **Reality:** Only when you want a parent's ref to reach inside the child's DOM. Internal refs don't need it.

> [!IMPORTANT]
> **Trap 4:** "useImperativeHandle replaces the need for props and state."
> **Reality:** It's an escape hatch for genuinely imperative operations. Prefer props/state for data flow.

> [!IMPORTANT]
> **Trap 5:** "The ref object changes reference between renders."
> **Reality:** The `ref` object itself is stable (same reference). Only `ref.current` changes.

---

### Revision Bullets

- `useRef(initialValue)` → returns `{ current: initialValue }` — same object reference always
- Changing `ref.current` = NO re-render | Calling `setState` = re-render
- DOM access: `<div ref={myRef} />` → `myRef.current = <div>` DOM node after mount
- DOM refs are `null` during render (first render), available in `useEffect` and event handlers
- Mutable value refs: timer IDs, render counts, previous values, stale closure prevention
- Previous value pattern: `useRef` + `useEffect()` (no deps) → last render's value
- Render count: `ref.current++` in component body — increments every render, no UI change
- `forwardRef(fn(props, ref) => ...)` → enables parent's ref to reach child's DOM
- React 19: `ref` is a regular prop — no `forwardRef` needed
- `useImperativeHandle(ref, () => ({ method1, method2 }))` → parent gets custom API not DOM
- Use `useImperativeHandle` sparingly — prefer props/callbacks/state
- Ref callback: function as `ref` prop → called with node on mount, `null` on unmount
- Ref callback better than `useRef` when: element is conditional, need to react to attachment
- `useCallback` stabilizes ref callbacks (prevents recreation each render)

---

👉 <a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 📌 Chapter Summary

<a id="-chapter-summary"></a>

### Most Important Interview Points

1. **useRef has two use cases** — DOM element access (attach via `ref={myRef}`) and mutable value storage (no re-render when changed). The `{ current: value }` object is the same reference across all renders.

2. **`ref.current` changes don't trigger re-renders** — this is the fundamental distinction from `useState`. Use refs for implementation details; use state for UI-visible data.

3. **DOM refs are null during render** — the DOM doesn't exist yet when the component function runs. Access `ref.current` in `useEffect`, `useLayoutEffect`, or event handlers.

4. **Previous value pattern** — `useRef` + `useEffect(fn)` with no deps stores the previous render's value. The effect runs after render, updating the ref. During the next render, `ref.current` = last render's value.

5. **Timer IDs in refs** — don't store timer IDs in state (causes unnecessary renders). They're implementation details — store in `useRef`.

6. **`forwardRef` passes parent's ref through a component** — normally `ref` is intercepted by React and doesn't reach the component function. `forwardRef` provides it as the second argument.

7. **React 19 removes need for `forwardRef`** — `ref` becomes a regular prop for function components. For React 18, `forwardRef` is still required.

8. **`useImperativeHandle` creates custom ref APIs** — instead of exposing the raw DOM node, expose only the methods you intend parents to use. Use sparingly — prefer props/state.

9. **Ref callback vs useRef** — ref callback (function as `ref` prop) is called when element is attached/detached. Better for conditional elements and when you need to react to DOM attachment.

10. **Stale closure prevention** — store the latest state value in a ref to make it accessible to event listeners added with empty deps: `useEffect(() => { stateRef.current = state; }, [state])`.

### Key Practical Takeaways

- Default: use `useState` → switch to `useRef` only when you don't want re-renders
- Use `ref.current?.method()` (optional chaining) to safely access potentially null refs
- `useCallback` stabilize ref callbacks to prevent recreation each render
- Use `forwardRef` for all component library inputs and interactive elements
- Pair `forwardRef` with `useImperativeHandle` for custom, safe APIs
- Three cleanup scenarios all use refs: clear timers, remove listeners, abort fetches
- Video/audio players, maps, charts → always use refs for third-party library instances

### Common Mistakes

❌ Expecting `ref.current` changes to trigger re-renders
❌ Reading DOM refs during render (null during first render)
❌ Storing implementation details (timer IDs) in state instead of refs
❌ Skipping `forwardRef` when parent needs DOM access inside child
❌ Overusing `useImperativeHandle` where props/callbacks would work
❌ Not using optional chaining (`?.`) when accessing possibly-null refs
❌ Using `useRef` for data that should appear in the UI (use `useState`)
❌ Forgetting to clean up refs in `useEffect` (timers, third-party instances)
❌ Creating unstable ref callbacks (without `useCallback`) causing infinite renders

---

[⬅ Previous Chapter](#16-rules-of-hooks-and-hook-internals) | [📖 Main Index](#main-index) | [Next Chapter ➡](#18-usecontext-context-api)

---

*Chapter 17 Complete — useRef: Complete Guide | Part G*
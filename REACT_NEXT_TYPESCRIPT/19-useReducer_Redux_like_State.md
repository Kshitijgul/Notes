<a id="19-usereducer-redux-like-state"></a>

[⬅ Previous Chapter](#18-usecontext-context-api) | [📖 Main Index](#main-index) | [Next Chapter ➡](#20-performance-hooks-usememo-usecallback-reactmemo)

---

# Chapter 19: useReducer — Redux-like State

## 📌 Learning Objectives

By the end of this chapter, you will:

- **Understand** the reducer mental model — `(state, action) => newState`
- **Write** pure reducer functions that handle complex state transitions
- **Structure** actions correctly — type, payload, and action creators
- **Know** when to use `useReducer` vs `useState`
- **Apply** lazy initialization with `useReducer`
- **Build** a complete application using `useReducer` for state management
- **Answer 10+ interview questions** on useReducer deeply

---

<a id="chapter-index-table-19"></a>

## Chapter Index Table

| Topic No. | Topic Name | Subtopics |
|-----------|-----------|-----------|
| 19.1 | [Reducer Basics](#191-reducer-basics) | (state, action) => newState<br>Pure functions |
| 19.2 | [Actions — Structure & Patterns](#192-actions--structure--patterns) | Type constants<br>Payload<br>Action creators |
| 19.3 | [Complete Todo App Example](#193-complete-todo-app-example) | Full reducer implementation |
| 19.4 | [useReducer vs useState](#194-usereducer-vs-usestate) | When to switch |
| 19.5 | [Lazy Initialization in useReducer](#195-lazy-initialization-in-usereducer) | Init function |
| 💡 | [Interview Questions](#-interview-questions) | 10+ with Answers |
| 🧪 | [Practice Problems](#-practice-problems) | 5 Coding + 5 Theory |
| 🚀 | [Mini Project](#-mini-project) | Full Todo App with useReducer |
| ⚡ | [Quick Revision](#-quick-revision) | Key bullets, traps |
| 📌 | [Chapter Summary](#-chapter-summary) | Final takeaways |

---

## 19.1 Reducer Basics

<a id="191-reducer-basics"></a>

### What is a Reducer?

A **reducer** is a pure function that takes the current state and an action, and returns the new state. This is the core mental model behind both `useReducer` and Redux.

```
reducer(currentState, action) → newState
```

The name comes from JavaScript's `Array.prototype.reduce()` — a function that "reduces" a sequence of values into a single accumulated value.

```javascript
// The classic Array.reduce:
const sum = [1, 2, 3, 4].reduce((acc, value) => acc + value, 0);
// accumulator starts at 0, each call: acc = current accumulated value

// A reducer for state is the SAME concept:
// accumulator = current state
// value = action (the thing that happened)
// result = new state
function counterReducer(state, action) {
  // state = current accumulated state
  // action = event that describes what happened
  // returns: new accumulated state
  if (action.type === 'INCREMENT') return state + 1;
  if (action.type === 'DECREMENT') return state - 1;
  return state;  // Default: return unchanged state
}
```

---

### useReducer Syntax

```jsx
import { useReducer } from 'react';

const [state, dispatch] = useReducer(reducer, initialState);
// state    = current state value
// dispatch = function to send actions to the reducer
// reducer  = the pure function (state, action) => newState
// initialState = starting state value

// Dispatching actions:
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'ADD_ITEM', payload: { id: 1, text: 'Hello' } });
dispatch({ type: 'SET_USER', payload: userData });
```

---

### Pure Reducer Functions

A reducer MUST be a **pure function**:
1. Same inputs ALWAYS produce same output
2. No side effects (no API calls, no localStorage writes, no random values)
3. Never mutate the existing state — always return NEW state

```jsx
// ✅ PURE reducer — always correct:
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;          // Returns NEW value
    case 'DECREMENT':
      return state - 1;          // Returns NEW value
    case 'RESET':
      return 0;                  // Returns NEW value
    case 'SET':
      return action.payload;     // Returns NEW value from action
    default:
      return state;              // Returns SAME state (no change)
  }
}

// ❌ IMPURE reducer — breaks everything:
function badReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      state.items.push(action.payload);  // ❌ Mutation!
      return state;                       // ❌ Same reference!

    case 'FETCH_DATA':
      fetch('/api/data');                // ❌ Side effect!
      return state;

    case 'SET_RANDOM':
      return Math.random();             // ❌ Not deterministic!

    default:
      return state;
  }
}
```

---

### Object State Reducer

```jsx
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };  // Spread + override

    case 'SET_EMAIL':
      return { ...state, email: action.payload };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: {
          ...state.address,          // Spread nested object
          ...action.payload,         // Override changed fields
        },
      };

    case 'RESET':
      return initialUserState;       // Return initial state

    default:
      return state;
  }
}

// Component:
function UserForm() {
  const [user, dispatch] = useReducer(userReducer, {
    name: '', email: '', address: { city: '', country: '' },
  });

  return (
    <form>
      <input
        value={user.name}
        onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })}
      />
      <input
        value={user.email}
        onChange={e => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
      />
    </form>
  );
}
```

---

### 🧠 Hinglish Intuition

Reducer ek **cashier** ki tarah hai dukaan mein. State = dukaan ka current stock. Action = customer ka order ("1 kilo apple chahiye" ya "yeh wapas karo"). Cashier (reducer) order padha aur naya stock calculate karta hai. Cashier kabhi apne mann se stock add/remove nahi karta, sirf order pe react karta hai. Aur ek hi cashier sab orders handle karta hai — clear, centralized, predictable.

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.2 Actions — Structure & Patterns

<a id="192-actions--structure--patterns"></a>

### Standard Action Structure

Actions are plain JavaScript objects. The only required field is `type`.

```javascript
// Minimal action:
{ type: 'INCREMENT' }

// With payload:
{ type: 'ADD_ITEM', payload: { id: 1, name: 'Apple', price: 2.99 } }

// With multiple properties (less common):
{ type: 'SET_USER', userId: 42, name: 'Alice', role: 'admin' }

// Convention: Flux Standard Action (FSA)
{
  type: 'ACTION_TYPE',           // Required: string describing what happened
  payload: any,                  // Optional: data the reducer needs
  error: true,                   // Optional: boolean, true if payload is Error
  meta: { source: 'api' },       // Optional: extra metadata
}
```

---

### Action Type Constants

```javascript
// ✅ Define types as constants — prevents typos
const COUNTER_ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  SET: 'SET',
};

// Better — use string literal union (TypeScript) or object freeze
const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',         // Namespaced (prevents collision)
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
  APPLY_COUPON: 'cart/applyCoupon',
});

// Usage:
dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
// vs. without constants:
dispatch({ type: 'cart/addItem', payload: product });
// Both work, but constants prevent: 'cart/addItme' typo bugs!
```

---

### Action Creators

Action creators are functions that create and return action objects. They:
1. Centralize action creation
2. Enable type checking (TypeScript)
3. Reduce repetitive object writing
4. Make testing easier

```javascript
// Basic action creators:
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
const reset = () => ({ type: 'RESET' });
const setValue = (value) => ({ type: 'SET', payload: value });

// Usage:
dispatch(increment());          // dispatch({ type: 'INCREMENT' })
dispatch(setValue(42));         // dispatch({ type: 'SET', payload: 42 })

// More complex action creators:
const addCartItem = (product) => ({
  type: CART_ACTIONS.ADD_ITEM,
  payload: {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  },
});

const updateQuantity = (itemId, delta) => ({
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: { itemId, delta },
});

const applyCoupon = (code) => {
  // Can have logic:
  const discount = validateCoupon(code);
  return {
    type: CART_ACTIONS.APPLY_COUPON,
    payload: { code, discount },
    error: discount === 0,
  };
};

// Usage:
dispatch(addCartItem(selectedProduct));
dispatch(updateQuantity(item.id, +1));
dispatch(applyCoupon('SAVE10'));
```

---

### Naming Conventions for Action Types

```javascript
// Convention 1: SCREAMING_SNAKE_CASE (classic Redux)
'ADD_TODO'
'REMOVE_ITEM'
'SET_LOADING'

// Convention 2: Namespaced (modern Redux Toolkit style)
'todos/addTodo'
'cart/removeItem'
'auth/setUser'

// Convention 3: Domain/Event style (descriptive)
'USER_LOGGED_IN'
'PAYMENT_PROCESSED'
'ERROR_OCCURRED'

// Pick one and be consistent in your codebase
```

---

### Complex Action Patterns

```jsx
// Multiple related fields in one action:
dispatch({
  type: 'SET_FORM_FIELD',
  payload: { field: 'email', value: 'alice@example.com' },
});

// Computed values in action creator:
const setFormField = (field, value) => ({
  type: 'SET_FORM_FIELD',
  payload: { field, value },
});

// Reducer handles it generically:
case 'SET_FORM_FIELD':
  return {
    ...state,
    form: { ...state.form, [action.payload.field]: action.payload.value },
  };

// Now ANY form field update uses ONE action type!
dispatch(setFormField('name', 'Alice'));
dispatch(setFormField('email', 'alice@example.com'));
dispatch(setFormField('phone', '9876543210'));
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.3 Complete Todo App Example

<a id="193-complete-todo-app-example"></a>

### State Shape Design

```javascript
// Always start by designing your state shape:
const initialTodoState = {
  todos: [],          // Array of todo objects
  filter: 'all',      // 'all' | 'active' | 'completed'
  nextId: 1,          // Auto-increment ID
  isLoading: false,   // Async operation flag
  error: null,        // Error message
};

// Todo object shape:
// { id: number, text: string, completed: boolean, createdAt: string }
```

---

### Complete Reducer

```javascript
const TODO_ACTIONS = {
  ADD: 'todos/add',
  TOGGLE: 'todos/toggle',
  DELETE: 'todos/delete',
  EDIT: 'todos/edit',
  SET_FILTER: 'todos/setFilter',
  CLEAR_COMPLETED: 'todos/clearCompleted',
  TOGGLE_ALL: 'todos/toggleAll',
  SET_LOADING: 'todos/setLoading',
  SET_ERROR: 'todos/setError',
};

function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
        nextId: state.nextId + 1,
      };

    case TODO_ACTIONS.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case TODO_ACTIONS.EDIT:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case TODO_ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case TODO_ACTIONS.TOGGLE_ALL: {
      const allCompleted = state.todos.every(todo => todo.completed);
      return {
        ...state,
        todos: state.todos.map(todo => ({ ...todo, completed: !allCompleted })),
      };
    }

    case TODO_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case TODO_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
      // OR: return state; (lenient — silently ignores unknown actions)
  }
}
```

---

### Action Creators

```javascript
const todoActions = {
  add: (text) => ({ type: TODO_ACTIONS.ADD, payload: text }),
  toggle: (id) => ({ type: TODO_ACTIONS.TOGGLE, payload: id }),
  delete: (id) => ({ type: TODO_ACTIONS.DELETE, payload: id }),
  edit: (id, text) => ({ type: TODO_ACTIONS.EDIT, payload: { id, text } }),
  setFilter: (filter) => ({ type: TODO_ACTIONS.SET_FILTER, payload: filter }),
  clearCompleted: () => ({ type: TODO_ACTIONS.CLEAR_COMPLETED }),
  toggleAll: () => ({ type: TODO_ACTIONS.TOGGLE_ALL }),
};
```

---

### Component Usage

```jsx
import { useReducer, useMemo, useState } from 'react';

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Derived state — computed during render (NOT stored in state)
  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':    return state.todos.filter(t => !t.completed);
      case 'completed': return state.todos.filter(t => t.completed);
      default:          return state.todos;
    }
  }, [state.todos, state.filter]);

  const activeCount = useMemo(
    () => state.todos.filter(t => !t.completed).length,
    [state.todos]
  );

  const hasCompleted = state.todos.some(t => t.completed);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    dispatch(todoActions.add(inputText));
    setInputText('');
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      dispatch(todoActions.edit(id, editText));
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b' }}>📝 Todo App</h1>

      {/* Add Todo */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {state.todos.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(todoActions.toggleAll())}
            title="Toggle All"
            style={{ padding: '0 12px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#fff', fontSize: '16px' }}
          >
            {state.todos.every(t => t.completed) ? '◉' : '○'}
          </button>
        )}
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Add
        </button>
      </form>

      {/* Filter Tabs */}
      {state.todos.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => dispatch(todoActions.setFilter(f))}
              style={{
                padding: '6px 16px', border: '1px solid #e2e8f0', borderRadius: '20px',
                cursor: 'pointer', fontSize: '13px', textTransform: 'capitalize',
                backgroundColor: state.filter === f ? '#3b82f6' : '#fff',
                color: state.filter === f ? '#fff' : '#64748b',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Todo List */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        {filteredTodos.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
            {state.filter === 'all' ? '🎉 Nothing to do!' : `No ${state.filter} todos`}
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                borderBottom: index < filteredTodos.length - 1 ? '1px solid #f1f5f9' : 'none',
                backgroundColor: '#fff',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(todoActions.toggle(todo.id))}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6' }}
              />

              {editingId === todo.id ? (
                <div style={{ flex: 1, display: 'flex', gap: '6px' }}>
                  <input
                    autoFocus
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEdit(todo.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    style={{ flex: 1, padding: '4px 8px', border: '2px solid #3b82f6', borderRadius: '4px', fontSize: '14px', outline: 'none' }}
                  />
                  <button onClick={() => saveEdit(todo.id)} style={{ padding: '4px 10px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Save</button>
                  <button onClick={cancelEdit} style={{ padding: '4px 10px', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                </div>
              ) : (
                <>
                  <span
                    style={{ flex: 1, fontSize: '15px', textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#94a3b8' : '#1e293b', cursor: 'text' }}
                    onDoubleClick={() => startEdit(todo)}
                    title="Double-click to edit"
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => startEdit(todo)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', padding: '4px' }}>✏️</button>
                  <button onClick={() => dispatch(todoActions.delete(todo.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '14px', padding: '4px' }}>🗑</button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {state.todos.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
          <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
          {hasCompleted && (
            <button
              onClick={() => dispatch(todoActions.clearCompleted())}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '13px', textDecoration: 'underline' }}
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoApp;
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.4 useReducer vs useState

<a id="194-usereducer-vs-usestate"></a>

### Side-by-Side Comparison

```jsx
// ===== SAME COUNTER — useState approach =====
function CounterWithState() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([0]);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  };

  const reset = () => {
    setCount(0);
    setHistory([0]);
  };
  // Problem: 3 separate setters, must call multiple in sync, easy to forget one!

  return <div>{count}</div>;
}

// ===== SAME COUNTER — useReducer approach =====
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const newCount = state.count + state.step;
      return { ...state, count: newCount, history: [...state.history, newCount] };
    }
    case 'DECREMENT': {
      const newCount = state.count - state.step;
      return { ...state, count: newCount, history: [...state.history, newCount] };
    }
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { count: 0, step: state.step, history: [0] };
    default:
      return state;
  }
};

function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0, step: 1, history: [0],
  });

  // All related state changes happen in ONE dispatch — always consistent!
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <p>History: {state.history.join(' → ')}</p>
    </div>
  );
}
```

---

### When to Choose Which

| Situation | useState | useReducer |
|-----------|----------|-----------|
| **Simple value** (number, string, bool) | ✅ Best | ❌ Overkill |
| **Independent state variables** | ✅ Separate useState | ❌ Unnecessary |
| **Related state updated together** | ❌ Risk of sync bugs | ✅ Atomic updates |
| **Multiple update paths (5+ handlers)** | ❌ Logic scattered | ✅ Centralized |
| **Next state depends on previous** | ✅ Functional updater | ✅ Both work |
| **Complex state logic** | ❌ Messy in handlers | ✅ Clean in reducer |
| **State logic needs testing** | ❌ Hard to isolate | ✅ Pure function test |
| **Other components need to trigger same update** | ❌ Props drilling | ✅ dispatch is stable |
| **History/undo features** | ❌ Complex | ✅ Natural fit |
| **Debugging state transitions** | ❌ Hard | ✅ Each action logged |

---

### The Decision Rule

```
Start with useState.
Switch to useReducer when you notice ANY of these:
  1. You have 4+ useState variables that change together
  2. Setting one state often requires reading another (risk of stale state)
  3. You find yourself calling setState multiple times in the same event handler
  4. Multiple different handlers do the same state update (DRY violation)
  5. Your state update logic is complex enough to benefit from isolated testing
```

---

### Practical Example: When useState Is Fine

```jsx
// ✅ useState is perfect here — simple, independent values
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // These four are independent — changing one doesn't require others
  // Email change doesn't affect password, etc.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Fine — single state change
    await login(email, password);
    setIsSubmitting(false);
  };

  return <form>...</form>;
}
```

---

### Practical Example: When useReducer is Better

```jsx
// ❌ useState getting complex — related state, multiple updates:
function DataGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  // 9 state variables — many must change together!

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelected([]);   // Must clear selection on page change!
    // Easy to forget setSelected when just calling setPage!
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');  // Must reset direction when field changes!
      setPage(1);         // Must reset to page 1!
      // Easy to miss one of these!
    }
  };
}

// ✅ useReducer handles this cleanly:
function gridReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return { ...state, page: action.payload, selected: [] }; // Atomic!

    case 'SORT':
      if (action.payload === state.sortField) {
        return { ...state, sortDir: state.sortDir === 'asc' ? 'desc' : 'asc' };
      }
      return { ...state, sortField: action.payload, sortDir: 'asc', page: 1 }; // Atomic!

    case 'LOAD_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null };

    case 'LOAD_ERROR':
      return { ...state, error: action.payload, loading: false };
    // All related state changes happen ATOMICALLY — no inconsistency possible
    default:
      return state;
  }
}
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.5 Lazy Initialization in useReducer

<a id="195-lazy-initialization-in-usereducer"></a>

### What is Lazy Initialization?

Just like `useState(() => compute())`, `useReducer` supports a third argument — an **initializer function**. This function is called once with the second argument to compute the initial state.

```jsx
// Syntax:
const [state, dispatch] = useReducer(reducer, initialArg, initFunction);
// initFunction(initialArg) = initial state (called once on mount)

// Without lazy init:
const [state, dispatch] = useReducer(reducer, {
  todos: loadFromLocalStorage(),  // ← Runs on EVERY render!
  filter: 'all',
});

// With lazy init:
const [state, dispatch] = useReducer(reducer, 'todos-key', (storageKey) => {
  // This function runs ONLY on mount
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : { todos: [], filter: 'all' };
  } catch {
    return { todos: [], filter: 'all' };
  }
});
```

---

### Practical Example: Todo with localStorage

```jsx
// Initial state function:
function initTodoState(savedKey) {
  const defaults = { todos: [], filter: 'all', nextId: 1 };
  try {
    const saved = localStorage.getItem(savedKey);
    return saved ? JSON.parse(saved) : defaults;
  } catch {
    return defaults;
  }
}

function TodoApp() {
  const STORAGE_KEY = 'my-todos';

  // Third argument = initializer function
  const [state, dispatch] = useReducer(todoReducer, STORAGE_KEY, initTodoState);
  // initTodoState(STORAGE_KEY) is called ONCE on mount
  // On re-renders: React uses stored state, ignores both args 2 and 3

  // Save to localStorage whenever state changes:
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <div>...</div>;
}
```

---

### Lazy Init for Reset Functionality

```jsx
// Another use case: resetting to initial state
function initCounter(initialCount) {
  return {
    count: initialCount,
    history: [initialCount],
    step: 1,
  };
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step],
      };
    case 'RESET':
      // ✅ Re-run init function with original initialArg to get clean state
      return initCounter(action.payload);
    // Using the init function ensures reset always produces valid initial state
    default:
      return state;
  }
}

function Counter({ startingCount = 0 }) {
  const [state, dispatch] = useReducer(counterReducer, startingCount, initCounter);

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      {/* Reset passes original initialArg back */}
      <button onClick={() => dispatch({ type: 'RESET', payload: startingCount })}>Reset</button>
    </div>
  );
}
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 💡 Interview Questions

<a id="-interview-questions"></a>

### Conceptual Questions

---

**Q1. What is a reducer and what are its three key properties?**

**Answer:**
A reducer is a pure function that takes the current state and an action, and returns the new state:

```javascript
reducer(state, action) → newState
```

Three key properties:
1. **Pure** — same inputs always produce same output. No random values, no Date.now(), no side effects inside the reducer.

2. **Immutable** — never mutate the state parameter. Always return new state objects/arrays. Mutations cause React to miss the update (same reference) and break time-travel debugging.

3. **Complete** — handles every case explicitly. The `default` case should return `state` unchanged (or throw for debugging). A reducer that returns `undefined` causes React errors.

---

**Q2. What is the difference between `useReducer` and `useState`?**

**Answer:**

| | useState | useReducer |
|--|----------|-----------|
| **API** | `[value, setValue]` | `[state, dispatch]` |
| **Update** | `setValue(newValue)` | `dispatch({ type, payload })` |
| **Logic** | In event handlers | Centralized in reducer |
| **Multiple fields** | Multiple useState calls | Single object in reducer |
| **Testing** | Test via UI | Test reducer as pure function |

**When to use which:**
- **useState**: Simple, independent values (strings, numbers, booleans)
- **useReducer**: Complex state, multiple related fields that change together, many update paths that need centralization

---

**Q3. Why must reducers be pure functions?**

**Answer:**
Reducers must be pure because:

1. **Predictability** — Same input always produces same output. You can reproduce any state by replaying actions, enabling time-travel debugging.

2. **React detection** — React uses reference equality to detect state changes. If you mutate state and return the same reference, React can't detect the change and won't re-render.

3. **Concurrent Mode** — React 18 may call your reducer multiple times for the same action to explore rendering alternatives. If reducers have side effects, they'd fire multiple times causing bugs.

4. **Testing** — Pure functions are trivially testable:
   ```javascript
   expect(counterReducer(0, { type: 'INCREMENT' })).toBe(1);
   ```
   No mocking, no async, no setup/teardown.

---

**Q4. What happens when you dispatch an unknown action type?**

**Answer:**
The correct behavior depends on your `default` case:

```javascript
// Option 1: Return unchanged state (lenient — production default)
default:
  return state;

// Option 2: Throw an error (strict — helps catch typos in dev)
default:
  throw new Error(`Unhandled action type: ${action.type}`);

// Redux Toolkit default: returns state (lenient) but logs warning
```

In production code, returning `state` is safer (won't crash if an unknown action somehow reaches the reducer). In development, throwing helps catch typos and missing cases.

---

**Q5. Explain the three arguments of `useReducer`.**

**Answer:**

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, initFn);
```

1. **`reducer`** — The `(state, action) => newState` function. Called by React when dispatch is called. Must be pure.

2. **`initialArg`** — Used to compute the initial state:
   - If no `initFn`: `initialState = initialArg` (evaluated once at mount)
   - If `initFn` provided: `initialState = initFn(initialArg)`

3. **`initFn` (optional)** — Lazy initialization function. Called with `initialArg` on mount only. Useful for expensive computations (localStorage reads, complex default state calculation). Allows resetting state by passing `initFn(newArg)` from inside the reducer on reset actions.

---

**Q6. Why is `dispatch` stable (same reference) across renders?**

**Answer:**
React guarantees that `dispatch` is stable — the same function reference across ALL renders of the component. This is intentional:

- React stores the dispatch function in a stable internal reference (like `useRef`)
- `dispatch` only needs to know WHICH state queue to send the action to — this doesn't change between renders
- The dispatcher doesn't close over the current state — it dispatches to a queue that React processes

**Practical implications:**
1. `dispatch` is safe in `useEffect` dependency arrays (won't cause re-runs)
2. `dispatch` is safe in `useCallback`/`useMemo` dependencies
3. `dispatch` can be put in its own Context and never trigger re-renders (Chapter 18 pattern)
4. You don't need `useCallback(() => dispatch(action), [dispatch])` — just `() => dispatch(action)` is fine

---

**Q7. How would you implement undo functionality with `useReducer`?**

**Answer:**

```javascript
function undoableReducer(state, action) {
  switch (action.type) {
    case 'UNDO':
      if (state.history.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future],
      };

    case 'REDO':
      if (state.future.length === 0) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
      };

    default:
      // Any other action modifies present and clears future
      const newPresent = innerReducer(state.present, action);
      if (newPresent === state.present) return state;  // No change
      return {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],  // Clear redo history when new action taken
      };
  }
}
```

---

**Q8. Can you put async operations in a reducer?**

**Answer:**
**No.** Reducers must be pure — no async operations, no API calls, no `setTimeout`, nothing with side effects.

Async operations go OUTSIDE the reducer, in:
1. **Event handlers** — fetch data, then dispatch with result
2. **`useEffect`** — side effects that respond to state changes
3. **Custom middleware** (Redux) — Redux Thunk, Redux Saga
4. **Before dispatch** — call async function, await result, then dispatch

```javascript
// ✅ Async OUTSIDE reducer:
const handleSubmit = async () => {
  dispatch({ type: 'FETCH_START' });  // Dispatch synchronously
  try {
    const data = await fetchApi('/users');  // Async happens here
    dispatch({ type: 'FETCH_SUCCESS', payload: data });  // Then dispatch result
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
};
// The reducer only handles pure synchronous state transitions
```

---

**Q9. What is the Flux Standard Action (FSA) convention?**

**Answer:**
FSA is a community convention for structuring actions consistently:

```javascript
{
  type: 'ACTION_TYPE',     // Required: string, describes event
  payload: any,            // Optional: all action data here
  error: boolean,          // Optional: true if payload is Error object
  meta: any,               // Optional: extra info (not part of the payload)
}
```

Rules:
1. Must have `type`
2. May have `payload`, `error`, `meta`
3. Must not have any other fields (no `data`, `value`, `id` at root level — put in `payload`)
4. If `error: true`, `payload` should be an `Error` object

Benefits: Consistent action structure across teams, enables generic middleware, improves readability.

---

**Q10. How do you test a reducer?**

**Answer:**
Reducers are the easiest part of React to test — pure functions with no dependencies:

```javascript
// No mocking, no React Testing Library, no DOM — just logic:
describe('todoReducer', () => {
  it('adds a todo', () => {
    const state = { todos: [], nextId: 1, filter: 'all' };
    const action = { type: 'todos/add', payload: 'Buy groceries' };
    const newState = todoReducer(state, action);
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe('Buy groceries');
    expect(newState.todos[0].completed).toBe(false);
    expect(newState.nextId).toBe(2);
  });

  it('does not mutate existing state', () => {
    const state = { todos: [{ id: 1, text: 'Test', completed: false }] };
    const newState = todoReducer(state, { type: 'todos/toggle', payload: 1 });
    expect(newState).not.toBe(state);           // New reference
    expect(newState.todos).not.toBe(state.todos); // New array
    expect(state.todos[0].completed).toBe(false); // Original unchanged
  });

  it('returns unchanged state for unknown actions', () => {
    const state = { todos: [], filter: 'all' };
    const newState = todoReducer(state, { type: 'UNKNOWN_ACTION' });
    expect(newState).toBe(state);  // Same reference — no change
  });
});
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 🧪 Practice Problems

<a id="-practice-problems"></a>

### Coding Questions

---

**1. Write a bank account reducer with full transaction history**

```jsx
import { useReducer, useMemo, useState } from 'react';

const initialBankState = {
  balance: 1000,
  transactions: [],
  transactionId: 1,
};

function bankReducer(state, action) {
  const createTransaction = (type, amount, description) => ({
    id: state.transactionId,
    type,
    amount,
    description,
    date: new Date().toISOString(),
    balanceAfter: state.balance + (type === 'credit' ? amount : -amount),
  });

  switch (action.type) {
    case 'DEPOSIT': {
      if (action.payload <= 0) return state;
      const txn = createTransaction('credit', action.payload, action.description || 'Deposit');
      return {
        ...state,
        balance: txn.balanceAfter,
        transactions: [txn, ...state.transactions],
        transactionId: state.transactionId + 1,
      };
    }

    case 'WITHDRAW': {
      if (action.payload <= 0 || action.payload > state.balance) return state;
      const txn = createTransaction('debit', action.payload, action.description || 'Withdrawal');
      return {
        ...state,
        balance: txn.balanceAfter,
        transactions: [txn, ...state.transactions],
        transactionId: state.transactionId + 1,
      };
    }

    case 'TRANSFER': {
      if (action.payload.amount <= 0 || action.payload.amount > state.balance) return state;
      const txn = createTransaction('debit', action.payload.amount, `Transfer to ${action.payload.to}`);
      return {
        ...state,
        balance: txn.balanceAfter,
        transactions: [txn, ...state.transactions],
        transactionId: state.transactionId + 1,
      };
    }

    default:
      return state;
  }
}

function BankApp() {
  const [state, dispatch] = useReducer(bankReducer, initialBankState);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [tab, setTab] = useState('deposit');

  const totalDeposited = useMemo(() =>
    state.transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0),
    [state.transactions]
  );

  const totalWithdrawn = useMemo(() =>
    state.transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0),
    [state.transactions]
  );

  const handleAction = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;

    if (tab === 'deposit') dispatch({ type: 'DEPOSIT', payload: value, description });
    else if (tab === 'withdraw') dispatch({ type: 'WITHDRAW', payload: value, description });
    else if (tab === 'transfer') dispatch({ type: 'TRANSFER', payload: { amount: value, to: description || 'Account' } });

    setAmount('');
    setDescription('');
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Balance */}
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '16px', color: '#fff', marginBottom: '24px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 4px', fontSize: '14px', opacity: 0.8 }}>Current Balance</p>
        <h1 style={{ margin: '0', fontSize: '40px', fontWeight: '800' }}>₹{state.balance.toFixed(2)}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', fontSize: '13px' }}>
          <span>↑ ₹{totalDeposited.toFixed(0)} In</span>
          <span>↓ ₹{totalWithdrawn.toFixed(0)} Out</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
        {['deposit', 'withdraw', 'transfer'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', textTransform: 'capitalize', backgroundColor: tab === t ? '#fff' : 'transparent', color: tab === t ? '#1e293b' : '#64748b', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Form */}
      <input style={inputStyle} type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder={`Amount to ${tab}`} />
      <input style={inputStyle} value={description} onChange={e => setDescription(e.target.value)} placeholder={tab === 'transfer' ? 'Recipient name' : 'Description (optional)'} />
      <button onClick={handleAction} style={{ width: '100%', padding: '12px', backgroundColor: tab === 'withdraw' ? '#ef4444' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', textTransform: 'capitalize' }}>
        {tab} ₹{amount || '0'}
      </button>

      {/* Transaction History */}
      {state.transactions.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: '#374151' }}>Recent Transactions</h3>
          {state.transactions.map(txn => (
            <div key={txn.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '1px solid #f1f5f9', borderRadius: '8px', marginBottom: '8px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{txn.description}</p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>
                  {new Date(txn.date).toLocaleString()} | Balance after: ₹{txn.balanceAfter.toFixed(2)}
                </p>
              </div>
              <span style={{ fontWeight: '700', color: txn.type === 'credit' ? '#22c55e' : '#ef4444', fontSize: '15px' }}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BankApp;
```

---

**2. Implement a form with useReducer (handles any field generically)**

```jsx
import { useReducer, useCallback } from 'react';

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' },
        touched: { ...state.touched, [action.field]: false },
      };

    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };

    case 'SET_ERRORS':
      return { ...state, errors: action.payload };

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isSubmitted: true };

    case 'RESET':
      return action.payload;  // Pass the entire initial state as payload

    default:
      return state;
  }
}

function useForm(initialValues, validate) {
  const initialState = {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isSubmitted: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const handleBlur = useCallback((field) => {
    dispatch({ type: 'TOUCH_FIELD', field });
    // Validate on blur
    const errors = validate(state.values);
    if (errors[field]) {
      dispatch({ type: 'SET_ERRORS', payload: { ...state.errors, [field]: errors[field] } });
    }
  }, [state.values, state.errors, validate]);

  const handleSubmit = useCallback(async (onSubmit) => {
    const errors = validate(state.values);
    if (Object.values(errors).some(Boolean)) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      // Touch all fields to show errors
      const allTouched = Object.keys(state.values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
      dispatch({ type: 'TOUCH_FIELD', field: Object.keys(allTouched)[0] });
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    await onSubmit(state.values);
    dispatch({ type: 'SUBMIT_SUCCESS' });
  }, [state.values, validate]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET', payload: initialState });
  }, []);

  return { ...state, handleChange, handleBlur, handleSubmit, reset };
}

// Usage:
function RegistrationForm() {
  const validate = useCallback((values) => ({
    username: !values.username ? 'Required' : values.username.length < 3 ? 'Min 3 chars' : '',
    email: !values.email ? 'Required' : !values.email.includes('@') ? 'Invalid email' : '',
    password: !values.password ? 'Required' : values.password.length < 6 ? 'Min 6 chars' : '',
    confirmPassword: values.confirmPassword !== values.password ? 'Passwords must match' : '',
  }), []);

  const { values, errors, touched, isSubmitting, isSubmitted, handleChange, handleBlur, handleSubmit, reset } = useForm({
    username: '', email: '', password: '', confirmPassword: '',
  }, validate);

  if (isSubmitted) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2>Registration Successful!</h2>
        <button onClick={reset} style={{ marginTop: '16px', padding: '10px 24px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Register Another
        </button>
      </div>
    );
  }

  const fields = [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'johndoe' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 chars' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Repeat password' },
  ];

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '32px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '24px' }}>Create Account</h2>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(async (vals) => { await new Promise(r => setTimeout(r, 1000)); console.log(vals); }); }}>
        {fields.map(f => (
          <div key={f.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600', fontSize: '14px' }}>{f.label}</label>
            <input
              type={f.type}
              value={values[f.name]}
              onChange={e => handleChange(f.name, e.target.value)}
              onBlur={() => handleBlur(f.name)}
              placeholder={f.placeholder}
              style={{ width: '100%', padding: '10px 12px', border: `2px solid ${touched[f.name] && errors[f.name] ? '#ef4444' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
            {touched[f.name] && errors[f.name] && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>{errors[f.name]}</p>
            )}
          </div>
        ))}

        <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '12px', backgroundColor: isSubmitting ? '#93c5fd' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: '700' }}>
          {isSubmitting ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
```

---

**3. Quiz game with useReducer**

```jsx
import { useReducer, useEffect } from 'react';

const QUESTIONS = [
  { id: 1, question: 'What does useReducer return?', options: ['[state, setState]', '[state, dispatch]', '[reducer, state]', '[action, state]'], answer: 1 },
  { id: 2, question: 'Reducers must be...?', options: ['Async functions', 'Pure functions', 'Class methods', 'Arrow functions only'], answer: 1 },
  { id: 3, question: 'What is an action\'s required property?', options: ['payload', 'data', 'type', 'value'], answer: 2 },
  { id: 4, question: 'useReducer is better than useState when...?', options: ['State is a string', 'Multiple state variables update together', 'You have only 1 state', 'State never changes'], answer: 1 },
];

const QUIZ_ACTIONS = {
  START: 'quiz/start',
  ANSWER: 'quiz/answer',
  NEXT: 'quiz/next',
  FINISH: 'quiz/finish',
  RESTART: 'quiz/restart',
  TICK: 'quiz/tick',
};

const initialQuizState = {
  status: 'idle',     // idle | active | answered | finished
  currentIndex: 0,
  selectedAnswer: null,
  score: 0,
  timeLeft: 15,
  answers: [],
};

function quizReducer(state, action) {
  switch (action.type) {
    case QUIZ_ACTIONS.START:
      return { ...initialQuizState, status: 'active' };

    case QUIZ_ACTIONS.ANSWER: {
      const correct = action.payload === QUESTIONS[state.currentIndex].answer;
      return {
        ...state,
        status: 'answered',
        selectedAnswer: action.payload,
        score: correct ? state.score + 1 : state.score,
        answers: [...state.answers, { questionId: QUESTIONS[state.currentIndex].id, selected: action.payload, correct }],
      };
    }

    case QUIZ_ACTIONS.NEXT:
      if (state.currentIndex >= QUESTIONS.length - 1) {
        return { ...state, status: 'finished' };
      }
      return {
        ...state,
        status: 'active',
        currentIndex: state.currentIndex + 1,
        selectedAnswer: null,
        timeLeft: 15,
      };

    case QUIZ_ACTIONS.TICK:
      if (state.timeLeft <= 1) {
        // Auto-submit wrong answer when time runs out
        return {
          ...state,
          status: 'answered',
          selectedAnswer: -1,  // No selection
          timeLeft: 0,
          answers: [...state.answers, { questionId: QUESTIONS[state.currentIndex].id, selected: -1, correct: false }],
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case QUIZ_ACTIONS.RESTART:
      return { ...initialQuizState };

    default:
      return state;
  }
}

function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);
  const question = QUESTIONS[state.currentIndex];
  const progress = ((state.currentIndex) / QUESTIONS.length) * 100;

  // Timer
  useEffect(() => {
    if (state.status !== 'active') return;
    const timer = setInterval(() => dispatch({ type: QUIZ_ACTIONS.TICK }), 1000);
    return () => clearInterval(timer);
  }, [state.status, state.currentIndex]);

  const getOptionStyle = (optIndex) => {
    if (state.status !== 'answered') {
      return { backgroundColor: '#fff', border: '2px solid #e2e8f0', color: '#1e293b' };
    }
    if (optIndex === question.answer) return { backgroundColor: '#dcfce7', border: '2px solid #86efac', color: '#166534' };
    if (optIndex === state.selectedAnswer && optIndex !== question.answer) return { backgroundColor: '#fee2e2', border: '2px solid #fca5a5', color: '#991b1b' };
    return { backgroundColor: '#fff', border: '2px solid #f1f5f9', color: '#94a3b8' };
  };

  if (state.status === 'idle') {
    return (
      <div style={{ textAlign: 'center', padding: '48px', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧠</div>
        <h1 style={{ marginBottom: '8px' }}>React Hooks Quiz</h1>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>{QUESTIONS.length} questions • 15 seconds each</p>
        <button onClick={() => dispatch({ type: QUIZ_ACTIONS.START })} style={{ padding: '14px 40px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '700' }}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (state.status === 'finished') {
    const pct = Math.round((state.score / QUESTIONS.length) * 100);
    return (
      <div style={{ textAlign: 'center', padding: '48px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{pct >= 75 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
        <h1 style={{ marginBottom: '8px' }}>Quiz Complete!</h1>
        <p style={{ fontSize: '48px', fontWeight: '800', color: pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444' }}>{pct}%</p>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>{state.score} out of {QUESTIONS.length} correct</p>
        <div style={{ marginBottom: '20px' }}>
          {state.answers.map((ans, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: ans.correct ? '#f0fdf4' : '#fff5f5', borderRadius: '8px', marginBottom: '6px', fontSize: '14px' }}>
              <span>Q{i + 1}: {QUESTIONS[i].question.slice(0, 40)}...</span>
              <span>{ans.correct ? '✅' : '❌'}</span>
            </div>
          ))}
        </div>
        <button onClick={() => dispatch({ type: QUIZ_ACTIONS.RESTART })} style={{ padding: '12px 32px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '550px', margin: '0 auto', padding: '32px', fontFamily: 'sans-serif' }}>
      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
          <span>Question {state.currentIndex + 1}/{QUESTIONS.length}</span>
          <span style={{ color: state.timeLeft <= 5 ? '#ef4444' : '#64748b', fontWeight: state.timeLeft <= 5 ? '700' : '400' }}>⏱ {state.timeLeft}s</span>
        </div>
        <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(state.timeLeft / 15) * 100}%`, backgroundColor: state.timeLeft <= 5 ? '#ef4444' : '#3b82f6', transition: 'width 1s linear, background-color 0.3s', borderRadius: '3px' }} />
        </div>
      </div>

      {/* Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', color: '#64748b' }}>Score</span>
        <span style={{ fontWeight: '700', color: '#22c55e' }}>{state.score}/{QUESTIONS.length}</span>
      </div>

      {/* Question */}
      <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#1e293b', lineHeight: '1.4' }}>{question.question}</h2>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => state.status === 'active' && dispatch({ type: QUIZ_ACTIONS.ANSWER, payload: idx })}
            disabled={state.status === 'answered'}
            style={{
              padding: '14px 18px', borderRadius: '10px', cursor: state.status === 'active' ? 'pointer' : 'default',
              textAlign: 'left', fontSize: '14px', fontWeight: '500', transition: 'all 0.15s',
              ...getOptionStyle(idx),
            }}
          >
            <span style={{ fontWeight: '700', marginRight: '10px' }}>{String.fromCharCode(65 + idx)}.</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Next */}
      {state.status === 'answered' && (
        <button
          onClick={() => dispatch({ type: QUIZ_ACTIONS.NEXT })}
          style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}
        >
          {state.currentIndex < QUESTIONS.length - 1 ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  );
}

export default Quiz;
```

---

**4. Shopping cart with useReducer**

```jsx
import { useReducer, useMemo } from 'react';

const PRODUCTS = [
  { id: 1, name: 'React Course', price: 2999, emoji: '⚛️' },
  { id: 2, name: 'TypeScript Book', price: 799, emoji: '📘' },
  { id: 3, name: 'VS Code Theme', price: 299, emoji: '🎨' },
  { id: 4, name: 'GitHub Pro', price: 999, emoji: '🐙' },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'QTY': {
      if (action.payload.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    case 'COUPON':
      return { ...state, coupon: action.payload === 'REACT20' ? 20 : 0 };
    default:
      return state;
  }
}

function CartApp() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], coupon: 0 });

  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);
  const discount = subtotal * (state.coupon / 100);
  const total = subtotal - discount;
  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Products */}
      <div style={{ flex: 1 }}>
        <h2>Products</h2>
        {PRODUCTS.map(p => {
          const inCart = state.items.find(i => i.id === p.id);
          return (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', border: '1px solid #e2e8f0', borderRadius: '10px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '28px' }}>{p.emoji}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '600' }}>{p.name}</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>₹{p.price}</p>
                </div>
              </div>
              {inCart ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => dispatch({ type: 'QTY', payload: { id: p.id, qty: inCart.qty - 1 } })} style={{ width: '28px', height: '28px', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>-</button>
                  <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{inCart.qty}</span>
                  <button onClick={() => dispatch({ type: 'QTY', payload: { id: p.id, qty: inCart.qty + 1 } })} style={{ width: '28px', height: '28px', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#3b82f6', color: '#fff', fontSize: '14px' }}>+</button>
                </div>
              ) : (
                <button onClick={() => dispatch({ type: 'ADD', payload: p })} style={{ padding: '6px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Add</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Cart */}
      <div style={{ width: '280px' }}>
        <h2>Cart {itemCount > 0 && `(${itemCount})`}</h2>
        {state.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
            <p style={{ fontSize: '32px' }}>🛒</p>
            <p>Cart is empty</p>
          </div>
        ) : (
          <>
            {state.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: '600' }}>{item.name}</p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>₹{item.price} × {item.qty}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '700' }}>₹{item.price * item.qty}</span>
                  <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '16px' }}>×</button>
                </div>
              </div>
            ))}

            <input
              placeholder="Coupon (try REACT20)"
              onChange={e => dispatch({ type: 'COUPON', payload: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '12px', fontSize: '13px', boxSizing: 'border-box' }}
            />

            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
              {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#22c55e' }}><span>Discount ({state.coupon}%)</span><span>-₹{discount}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '8px' }}><span>Total</span><span>₹{total}</span></div>
            </div>

            <button onClick={() => dispatch({ type: 'CLEAR' })} style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartApp;
```

---

**5. Implement useReducer with localStorage persistence**

```jsx
import { useReducer, useEffect } from 'react';

const STORAGE_KEY = 'notes-app';

// Lazy initializer — reads from localStorage once on mount
function initNotesState(storageKey) {
  const defaults = { notes: [], nextId: 1, searchQuery: '' };
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaults;
  } catch {
    return defaults;
  }
}

function notesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        notes: [
          { id: state.nextId, title: action.payload.title, content: action.payload.content, createdAt: Date.now(), updatedAt: Date.now() },
          ...state.notes,
        ],
        nextId: state.nextId + 1,
      };
    case 'UPDATE':
      return {
        ...state,
        notes: state.notes.map(n => n.id === action.payload.id ? { ...n, ...action.payload, updatedAt: Date.now() } : n),
      };
    case 'DELETE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload) };
    case 'SEARCH':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

function NotesApp() {
  // Lazy initialization from localStorage
  const [state, dispatch] = useReducer(notesReducer, STORAGE_KEY, initNotesState);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const filteredNotes = state.searchQuery
    ? state.notes.filter(n =>
        n.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    : state.notes;

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    dispatch({ type: 'ADD', payload: form });
    setForm({ title: '', content: '' });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    dispatch({ type: 'UPDATE', payload: { id: editingId, ...form } });
    setEditingId(null);
    setForm({ title: '', content: '' });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>📝 Notes ({state.notes.length})</h1>
        <button onClick={() => { setIsAdding(true); setEditingId(null); setForm({ title: '', content: '' }); }} style={{ padding: '8px 18px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          + New Note
        </button>
      </div>

      <input
        value={state.searchQuery}
        onChange={e => dispatch({ type: 'SEARCH', payload: e.target.value })}
        placeholder="Search notes..."
        style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }}
      />

      {(isAdding || editingId) && (
        <div style={{ padding: '16px', border: '2px solid #3b82f6', borderRadius: '12px', marginBottom: '16px', backgroundColor: '#eff6ff' }}>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Note title..." style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '8px', fontSize: '14px', fontWeight: '600', boxSizing: 'border-box' }} />
          <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Note content..." rows={4} style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button onClick={editingId ? handleUpdate : handleAdd} style={{ padding: '8px 18px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              {editingId ? 'Save Changes' : 'Add Note'}
            </button>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} style={{ padding: '8px 18px', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
        {filteredNotes.map(note => (
          <div key={note.id} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>{note.title}</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => { setEditingId(note.id); setForm({ title: note.title, content: note.content }); setIsAdding(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                <button onClick={() => dispatch({ type: 'DELETE', payload: note.id })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
              </div>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>{note.content || '(No content)'}</p>
            <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#94a3b8' }}>{new Date(note.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
        {filteredNotes.length === 0 && <p style={{ color: '#94a3b8', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>No notes found</p>}
      </div>
    </div>
  );
}

// Need useState too
import { useState } from 'react';
export default NotesApp;
```

---

### Theory Questions

---

**T1. Why is it important that reducers don't have side effects?**

**Expected Answer:**
1. **Predictability/testability** — Pure functions produce the same output for same input. You can test any state transition with `expect(reducer(state, action)).toEqual(expected)`.

2. **Time-travel debugging** — Redux DevTools can replay actions from history. If reducers have side effects, replaying would fire those effects again (API calls, mutations).

3. **Concurrent Mode** — React 18 may call reducers multiple times speculatively. Side effects in reducers would fire multiple times.

4. **Race conditions** — If a reducer fired an API call, concurrent renders would create multiple requests.

5. **Strict Mode** — React Strict Mode calls reducers twice in development to detect side effects. If a reducer is pure, this is harmless. If it has side effects, they fire twice.

---

**T2. What's the difference between action.payload and direct action properties?**

**Expected Answer:**
Both are valid, but `payload` follows the Flux Standard Action convention:

```javascript
// FSA style (recommended):
{ type: 'SET_USER', payload: { id: 1, name: 'Alice' } }

// Direct properties (less consistent):
{ type: 'SET_USER', id: 1, name: 'Alice' }
```

Benefits of using `payload`:
1. **Consistency** — all data is in one place, same pattern for every action
2. **Middleware compatibility** — error-handling middleware can check `action.error` and handle `action.payload` as an Error
3. **Tooling** — DevTools display is cleaner, `action.payload` is always the "data"
4. **Readability** — `action.payload.userId` is clearer than `action.userId` about what the property means

---

**T3. How do you handle async operations with `useReducer`?**

**Expected Answer:**
Reducers must be synchronous. Async operations go outside the reducer:

**Pattern 1: Dispatch before and after async:**
```javascript
const handleFetch = async () => {
  dispatch({ type: 'FETCH_START' });
  try {
    const data = await fetch(url).then(r => r.json());
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_ERROR', payload: err.message });
  }
};
```

**Pattern 2: useEffect for reactive fetching:**
```javascript
useEffect(() => {
  if (state.shouldFetch) {
    fetchData().then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }));
  }
}, [state.shouldFetch]);
```

The reducer handles RESULT actions — it never starts async operations.

---

**T4. What is the advantage of action creators over inline action objects?**

**Expected Answer:**
Action creators provide several advantages:

1. **DRY principle** — Define the action structure once, use everywhere
2. **Type safety** — In TypeScript, the return type ensures correct shape
3. **Testability** — Test action creators independently: `expect(addTodo('test')).toEqual({ type: 'ADD_TODO', payload: 'test' })`
4. **Abstraction** — Change action structure in one place
5. **Logic encapsulation** — Action creators can contain validation or computation:
   ```javascript
   const setPage = (page) => ({ type: 'SET_PAGE', payload: Math.max(1, page) });
   ```
6. **Autocomplete** — IDEs can suggest action creator names
7. **Debugging** — Action creator names appear in stack traces

---

**T5. When would you `throw` in a reducer's default case vs return `state`?**

**Expected Answer:**

**Return `state` (lenient):**
- Production code — unknown actions shouldn't crash the app
- When multiple reducers handle the same store (Redux combineReducers pattern)
- Third-party action types might pass through your reducer

**Throw error (strict):**
- During development to catch typos immediately
- When you own the entire state management and control all action creators
- Helps find bugs early: `dispatch({ type: 'INCRMENET' })` would throw instead of silently doing nothing

**Best practice — compromise:**
```javascript
default:
  if (process.env.NODE_ENV === 'development') {
    throw new Error(`Unknown action: ${action.type}`);
  }
  return state;
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 🚀 Mini Project

<a id="-mini-project"></a>

### Full Todo App with useReducer

A production-quality Todo app demonstrating all `useReducer` concepts: complex state shape, all CRUD operations, filtering, lazy initialization from localStorage, action creators, and derived state.

```jsx
import { useReducer, useMemo, useState, useEffect, useCallback, useRef } from 'react';

// ================================================================
// STATE, ACTIONS, REDUCER
// ================================================================
const FILTERS = { ALL: 'all', ACTIVE: 'active', COMPLETED: 'completed' };
const SORT = { CREATED: 'created', ALPHA: 'alpha', COMPLETED: 'completed' };
const PRIORITY = { HIGH: 'high', MEDIUM: 'medium', LOW: 'low' };

const ACTION = {
  ADD: 'todo/add',
  TOGGLE: 'todo/toggle',
  DELETE: 'todo/delete',
  EDIT: 'todo/edit',
  SET_FILTER: 'todo/setFilter',
  SET_SORT: 'todo/setSort',
  CLEAR_COMPLETED: 'todo/clearCompleted',
  TOGGLE_ALL: 'todo/toggleAll',
  SET_PRIORITY: 'todo/setPriority',
  ADD_TAG: 'todo/addTag',
  REMOVE_TAG: 'todo/removeTag',
};

function initState(key) {
  const defaults = {
    todos: [
      { id: 1, text: 'Learn useReducer', completed: true, priority: 'high', tags: ['react'], createdAt: Date.now() - 3600000 },
      { id: 2, text: 'Build a project', completed: false, priority: 'high', tags: ['react', 'project'], createdAt: Date.now() - 1800000 },
      { id: 3, text: 'Write tests', completed: false, priority: 'medium', tags: ['testing'], createdAt: Date.now() - 900000 },
      { id: 4, text: 'Deploy to production', completed: false, priority: 'low', tags: ['devops'], createdAt: Date.now() },
    ],
    filter: FILTERS.ALL,
    sort: SORT.CREATED,
    nextId: 5,
  };
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaults;
  } catch { return defaults; }
}

function todoReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD:
      return {
        ...state,
        todos: [{
          id: state.nextId,
          text: action.payload.text,
          completed: false,
          priority: action.payload.priority || PRIORITY.MEDIUM,
          tags: action.payload.tags || [],
          createdAt: Date.now(),
        }, ...state.todos],
        nextId: state.nextId + 1,
      };

    case ACTION.TOGGLE:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case ACTION.DELETE:
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };

    case ACTION.EDIT:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, text: action.payload.text, updatedAt: Date.now() } : t
        ),
      };

    case ACTION.SET_PRIORITY:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, priority: action.payload.priority } : t
        ),
      };

    case ACTION.ADD_TAG:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id && !t.tags.includes(action.payload.tag)
            ? { ...t, tags: [...t.tags, action.payload.tag] }
            : t
        ),
      };

    case ACTION.REMOVE_TAG:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...t, tags: t.tags.filter(tag => tag !== action.payload.tag) }
            : t
        ),
      };

    case ACTION.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTION.SET_SORT:
      return { ...state, sort: action.payload };

    case ACTION.CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter(t => !t.completed) };

    case ACTION.TOGGLE_ALL: {
      const allDone = state.todos.every(t => t.completed);
      return { ...state, todos: state.todos.map(t => ({ ...t, completed: !allDone })) };
    }

    default:
      return state;
  }
}

// ================================================================
// ACTION CREATORS
// ================================================================
const acts = {
  add: (text, priority = PRIORITY.MEDIUM, tags = []) => ({ type: ACTION.ADD, payload: { text, priority, tags } }),
  toggle: (id) => ({ type: ACTION.TOGGLE, payload: id }),
  delete: (id) => ({ type: ACTION.DELETE, payload: id }),
  edit: (id, text) => ({ type: ACTION.EDIT, payload: { id, text } }),
  setPriority: (id, priority) => ({ type: ACTION.SET_PRIORITY, payload: { id, priority } }),
  addTag: (id, tag) => ({ type: ACTION.ADD_TAG, payload: { id, tag } }),
  removeTag: (id, tag) => ({ type: ACTION.REMOVE_TAG, payload: { id, tag } }),
  setFilter: (filter) => ({ type: ACTION.SET_FILTER, payload: filter }),
  setSort: (sort) => ({ type: ACTION.SET_SORT, payload: sort }),
  clearCompleted: () => ({ type: ACTION.CLEAR_COMPLETED }),
  toggleAll: () => ({ type: ACTION.TOGGLE_ALL }),
};

// ================================================================
// COMPONENTS
// ================================================================
const PRIORITY_STYLES = {
  high:   { bg: '#fee2e2', text: '#991b1b', label: '🔴 High' },
  medium: { bg: '#fef9c3', text: '#854d0e', label: '🟡 Medium' },
  low:    { bg: '#dcfce7', text: '#166534', label: '🟢 Low' },
};

function TodoItem({ todo, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [newTag, setNewTag] = useState('');
  const [showTags, setShowTags] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    if (isEditing) editRef.current?.focus();
  }, [isEditing]);

  const saveEdit = () => {
    if (editText.trim()) dispatch(acts.edit(todo.id, editText.trim()));
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') { setIsEditing(false); setEditText(todo.text); }
  };

  const addTag = () => {
    if (newTag.trim()) {
      dispatch(acts.addTag(todo.id, newTag.trim().toLowerCase()));
      setNewTag('');
    }
  };

  const pStyle = PRIORITY_STYLES[todo.priority];

  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#fff',
      borderLeft: `4px solid ${pStyle.bg === '#fee2e2' ? '#ef4444' : pStyle.bg === '#fef9c3' ? '#f59e0b' : '#22c55e'}`,
      borderRadius: '0 10px 10px 0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      transition: 'all 0.15s',
    }}>
      {/* Main row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(acts.toggle(todo.id))}
          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#3b82f6', flexShrink: 0 }}
        />

        {isEditing ? (
          <input
            ref={editRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={saveEdit}
            style={{ flex: 1, padding: '4px 8px', border: '2px solid #3b82f6', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            style={{ flex: 1, fontSize: '14px', textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#94a3b8' : '#1e293b', cursor: todo.completed ? 'default' : 'text', lineHeight: '1.4' }}
            title={todo.completed ? '' : 'Double-click to edit'}
          >
            {todo.text}
          </span>
        )}

        <select
          value={todo.priority}
          onChange={e => dispatch(acts.setPriority(todo.id, e.target.value))}
          style={{ padding: '2px 6px', border: 'none', borderRadius: '10px', fontSize: '11px', cursor: 'pointer', backgroundColor: pStyle.bg, color: pStyle.text, fontWeight: '700' }}
        >
          {Object.keys(PRIORITY).map(p => (
            <option key={p} value={p.toLowerCase()}>{PRIORITY_STYLES[p.toLowerCase()].label}</option>
          ))}
        </select>

        <button onClick={() => setShowTags(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}>🏷</button>
        {!isEditing && !todo.completed && <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}>✏️</button>}
        <button onClick={() => dispatch(acts.delete(todo.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#ef4444' }}>🗑</button>
      </div>

      {/* Tags row */}
      {(todo.tags.length > 0 || showTags) && (
        <div style={{ marginTop: '8px', paddingLeft: '28px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {todo.tags.map(tag => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
              #{tag}
              {showTags && (
                <button onClick={() => dispatch(acts.removeTag(todo.id, tag))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e40af', padding: '0', lineHeight: 1, fontSize: '12px' }}>×</button>
              )}
            </span>
          ))}
          {showTags && (
            <div style={{ display: 'flex', gap: '4px' }}>
              <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} placeholder="tag" style={{ width: '60px', padding: '2px 6px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '11px', outline: 'none' }} />
              <button onClick={addTag} style={{ padding: '2px 8px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '11px' }}>+</button>
            </div>
          )}
        </div>
      )}

      <p style={{ margin: '6px 0 0 28px', fontSize: '10px', color: '#cbd5e1' }}>
        Created: {new Date(todo.createdAt).toLocaleDateString()}
        {todo.updatedAt && ` • Edited: ${new Date(todo.updatedAt).toLocaleDateString()}`}
      </p>
    </div>
  );
}

function AddTodoForm({ dispatch }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);
  const [tags, setTags] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const tagList = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    dispatch(acts.add(text.trim(), priority, tagList));
    setText('');
    setTags('');
    setPriority(PRIORITY.MEDIUM);
    setShowOptions(false);
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border-color 0.15s' }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <button type="button" onClick={() => setShowOptions(s => !s)} style={{ padding: '12px 14px', border: '2px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', backgroundColor: showOptions ? '#eff6ff' : '#fff', fontSize: '18px' }}>⚙️</button>
        <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>Add</button>
      </div>

      {showOptions && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Priority:</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }}>
              {Object.entries(PRIORITY_STYLES).map(([p, s]) => <option key={p} value={p}>{s.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Tags:</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="react, hooks (comma separated)" style={{ flex: 1, padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none', minWidth: '150px' }} />
          </div>
        </div>
      )}
    </form>
  );
}

// ================================================================
// MAIN APP
// ================================================================
function TodoApp() {
  const STORAGE_KEY = 'fullstack-todos-v2';
  const [state, dispatch] = useReducer(todoReducer, STORAGE_KEY, initState);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Derived state
  const { filteredTodos, stats } = useMemo(() => {
    let todos = [...state.todos];

    // Sort
    todos.sort((a, b) => {
      if (state.sort === SORT.ALPHA) return a.text.localeCompare(b.text);
      if (state.sort === SORT.COMPLETED) return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });

    // Filter
    const filtered = todos.filter(t => {
      if (state.filter === FILTERS.ACTIVE) return !t.completed;
      if (state.filter === FILTERS.COMPLETED) return t.completed;
      return true;
    });

    // Stats
    const active = state.todos.filter(t => !t.completed).length;
    const completed = state.todos.length - active;
    const byPriority = state.todos.reduce((acc, t) => {
      if (!t.completed) acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});

    return { filteredTodos: filtered, stats: { active, completed, total: state.todos.length, byPriority } };
  }, [state.todos, state.filter, state.sort]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>📝 Todo Master</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>useReducer + localStorage + Full CRUD</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Total', value: stats.total, color: '#3b82f6' },
            { label: 'Active', value: stats.active, color: '#f59e0b' },
            { label: 'Done', value: stats.completed, color: '#22c55e' },
          ].map(s => (
            <div key={s.label} style={{ padding: '12px', backgroundColor: '#fff', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: s.color }}>{s.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Priority breakdown */}
        {stats.active > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {Object.entries(stats.byPriority).map(([p, count]) => (
              <span key={p} style={{ padding: '4px 12px', backgroundColor: PRIORITY_STYLES[p].bg, color: PRIORITY_STYLES[p].text, borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                {PRIORITY_STYLES[p].label}: {count}
              </span>
            ))}
          </div>
        )}

        {/* Add Form */}
        <AddTodoForm dispatch={dispatch} />

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          {/* Toggle all */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {state.todos.length > 0 && (
              <button
                onClick={() => dispatch(acts.toggleAll())}
                style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', backgroundColor: '#fff' }}
              >
                {state.todos.every(t => t.completed) ? '○ Uncheck All' : '◉ Check All'}
              </button>
            )}
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Object.values(FILTERS).map(f => (
              <button key={f} onClick={() => dispatch(acts.setFilter(f))} style={{ padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', textTransform: 'capitalize', backgroundColor: state.filter === f ? '#3b82f6' : '#fff', color: state.filter === f ? '#fff' : '#64748b' }}>
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={state.sort} onChange={e => dispatch(acts.setSort(e.target.value))} style={{ padding: '5px 10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <option value={SORT.CREATED}>Newest</option>
            <option value={SORT.ALPHA}>A-Z</option>
            <option value={SORT.COMPLETED}>Status</option>
          </select>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <p style={{ fontSize: '40px', margin: '0 0 12px' }}>{state.filter === FILTERS.ALL ? '🎉' : '🔍'}</p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              {state.filter === FILTERS.ALL ? 'All done! Add something new.' : `No ${state.filter} todos`}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
            ))}
          </div>
        )}

        {/* Footer */}
        {state.todos.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#94a3b8', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
            <span>{stats.active} item{stats.active !== 1 ? 's' : ''} left</span>
            {stats.completed > 0 && (
              <button onClick={() => dispatch(acts.clearCompleted())} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '13px', textDecoration: 'underline' }}>
                Clear {stats.completed} completed
              </button>
            )}
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#cbd5e1', marginTop: '20px' }}>
          💾 Auto-saved to localStorage | Double-click to edit | 🏷 click for tags
        </p>
      </div>
    </div>
  );
}

export default TodoApp;
```

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## ⚡ Quick Revision

<a id="-quick-revision"></a>

### Key Definitions

| Term | One-Line Definition |
|------|-------------------|
| **Reducer** | Pure function: `(state, action) => newState` |
| **Action** | Plain object with `type` and optional `payload` describing what happened |
| **dispatch** | Function to send actions to the reducer — stable reference |
| **Action creator** | Function that creates and returns an action object |
| **Action type** | String constant identifying the action (e.g., `'todos/add'`) |
| **Pure function** | Same inputs → same outputs, no side effects |
| **Immutable update** | Create new state, never mutate existing |
| **Lazy initialization** | Third arg to useReducer — `initFn(initialArg)` called once on mount |
| **FSA** | Flux Standard Action — convention: `{ type, payload, error, meta }` |
| **Atomic update** | All related state changes happen in one dispatch, no inconsistency |

---

### useReducer Quick Template

```javascript
// 1. Action types
const ACTIONS = { ADD: 'add', REMOVE: 'remove', UPDATE: 'update' };

// 2. Reducer (pure function)
function myReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, items: [...state.items, action.payload] };
    case ACTIONS.REMOVE:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
}

// 3. Action creators
const myActions = {
  add: (item) => ({ type: ACTIONS.ADD, payload: item }),
  remove: (id) => ({ type: ACTIONS.REMOVE, payload: id }),
};

// 4. Component
const [state, dispatch] = useReducer(myReducer, { items: [] });
dispatch(myActions.add({ id: 1, name: 'Test' }));
```

---

### Common Interview Traps

> [!IMPORTANT]
> **Trap 1:** "Reducers can have API calls inside them."
> **Reality:** Reducers MUST be pure — no side effects. Async goes in event handlers or useEffect.

> [!IMPORTANT]
> **Trap 2:** "dispatch triggers re-render by itself."
> **Reality:** dispatch schedules a re-render by calling the reducer. The reducer's return value triggers the re-render. If reducer returns same state (same reference), React bails out.

> [!IMPORTANT]
> **Trap 3:** "useReducer is always better than useState."
> **Reality:** useState is better for simple, independent values. useReducer is better for complex related state with multiple update paths.

> [!IMPORTANT]
> **Trap 4:** "You can mutate state in a reducer."
> **Reality:** Never. Same reference = React doesn't detect change = no re-render. Always return new objects/arrays.

> [!IMPORTANT]
> **Trap 5:** "The third argument to useReducer is the initial state."
> **Reality:** Third arg is an INITIALIZER FUNCTION called with the second arg. `initFn(initialArg)` = initial state.

---

### Revision Bullets

- Reducer = pure function: `(state, action) => newState` — same inputs, same output, no side effects
- Action = `{ type: string, payload?: any }` — describes what happened
- `dispatch` is stable — same reference across ALL renders (safe in deps arrays)
- NEVER mutate state in reducer — always return new objects/arrays
- `switch (action.type)` with `default: return state` for unknown actions
- Action type constants prevent typos: `ACTIONS.ADD` not `'ADD'`
- Action creators: functions that create action objects — centralize and type-safe
- FSA convention: `{ type, payload, error?, meta? }` — consistent structure
- useReducer lazy init: `useReducer(reducer, initialArg, initFn)` — initFn called once
- `dispatch` + async: dispatch BEFORE and AFTER async — reducer stays sync
- Use useReducer when: 4+ related state variables, multiple handlers update same state, complex state logic
- Use useState when: simple independent values, no complex transitions
- Reducer is testable as pure function: no DOM, no React, no async needed
- All state changes in one dispatch = atomic = no inconsistency possible
- Derived state from reducer: compute during render with `useMemo`, don't store in state

---

👉 <a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 📌 Chapter Summary

<a id="-chapter-summary"></a>

### Most Important Interview Points

1. **Reducer is `(state, action) => newState`** — a pure function. Same inputs always produce same output. No side effects, no mutations, no randomness.

2. **Never mutate state in a reducer** — always return new objects/arrays using spread. Mutation gives same reference → `Object.is` returns true → React doesn't re-render.

3. **`dispatch` is stable** — same function reference across all renders (React guarantees this). Safe to put in dependency arrays and Context without causing re-renders.

4. **Actions are plain objects** — must have `type`, may have `payload`. FSA convention puts all data in `payload`. Action creators centralize creation.

5. **Reducers must be pure** — no API calls, no `Date.now()`, no `Math.random()`, no `localStorage` writes inside a reducer. Side effects go in event handlers or `useEffect`.

6. **`switch` with `default: return state`** — handles unknown actions gracefully. In dev, you may `throw` to catch typos.

7. **Lazy initialization** — third argument: `useReducer(reducer, key, initFn)`. `initFn(key)` called once on mount. Use for localStorage reads, expensive initial computation.

8. **useReducer vs useState** — useState for simple independent values; useReducer for complex related state with multiple update paths.

9. **Atomic updates** — all related state changes in ONE dispatch → no inconsistency possible. With multiple `useState` calls, forgetting one setter = bug.

10. **Reducer testing** — pure functions are trivially testable: `expect(reducer(state, action)).toEqual(expected)`. No mocking, no React, no DOM.

### Key Practical Takeaways

- Start with `useState`, switch to `useReducer` when state complexity grows
- Use action type constants (object or enum) to prevent typos
- Use action creators to centralize action creation (especially with TypeScript)
- Namespace action types: `'todos/add'` prevents collision in combined reducers
- Always handle the `default` case — return `state` for production, throw in development
- `dispatch` can be put in Context (Chapter 18) for global state without re-renders
- Use `useMemo` for derived state from reducer — don't store computed values in state

### Common Mistakes

❌ Side effects in reducers (API calls, localStorage, console.log)
❌ Mutating state directly (`state.items.push(item)`)
❌ Not handling `default` case (returns `undefined` — React error)
❌ Storing derived state in the reducer (total, filtered list) — compute instead
❌ Using useReducer for simple independent values (useState is simpler)
❌ Making `dispatch` async — it's synchronous
❌ Forgetting that lazy init function must be the third argument, not called: `useReducer(r, arg, fn)` not `useReducer(r, fn(arg))`
❌ Thinking `throw` in default case is always wrong — valid for strict development mode
❌ Not using action creators for repeated action patterns

---

[⬅ Previous Chapter](#18-usecontext-context-api) | [📖 Main Index](#main-index) | [Next Chapter ➡](#20-performance-hooks-usememo-usecallback-reactmemo)

---

*Chapter 19 Complete — useReducer: Redux-like State | Part G*
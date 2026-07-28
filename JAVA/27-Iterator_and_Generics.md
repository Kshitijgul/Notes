

<a id="27-iterator-generics"></a>

# 📘 Chapter 27: Iterator & Generics

> **Part E: Collection Framework**
> `Core` | `Type Safety` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-27"></a>

## 📚 Chapter 27 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 27.1 | [Iterator Interface](#271-iterator-interface) | Traversal Basics |
| 27.2 | [Iterator Methods](#272-iterator-methods) | hasNext, next, remove |
| 27.3 | [ListIterator](#273-listiterator) | Bidirectional |
| 27.4 | [Fail-Fast vs Fail-Safe](#274-fail-fast-fail-safe) | Iterator Types |
| 27.5 | [Spliterator (Java 8+)](#275-spliterator) | Parallel Iteration |
| 27.6 | [forEach() with Lambda](#276-foreach-lambda) | Modern Iteration |
| 27.7 | [What are Generics](#277-what-are-generics) | Type Parameters |
| 27.8 | [Why Generics](#278-why-generics) | Type Safety |
| 27.9 | [Generic Classes](#279-generic-classes) | Class<T> |
| 27.10 | [Generic Methods](#2710-generic-methods) | <T> method(T x) |
| 27.11 | [Generic Interfaces](#2711-generic-interfaces) | Interface<T> |
| 27.12 | [Bounded Type Parameters](#2712-bounded-type-parameters) | extends |
| 27.13 | [Multiple Bounds](#2713-multiple-bounds) | T extends A & B |
| 27.14 | [Wildcards — Unbounded](#2714-wildcards-unbounded) | ? |
| 27.15 | [Wildcards — Upper Bounded](#2715-wildcards-upper-bounded) | ? extends |
| 27.16 | [Wildcards — Lower Bounded](#2716-wildcards-lower-bounded) | ? super |
| 27.17 | [PECS Principle](#2717-pecs-principle) | Producer Extends Consumer Super |
| 27.18 | [Type Erasure](#2718-type-erasure) | Compile-time Only |
| 27.19 | [Generic Restrictions](#2719-generic-restrictions) | What You Can't Do |
| 🔥 | [Java vs Other Languages](#27-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#27-interview-questions) | 15+ Questions |
| 🧪 | [Practice Problems](#27-practice-problems) | 5 Coding + 5 Theory |

---

## 27.1 Iterator Interface

<a id="271-iterator-interface"></a>

### 📌 What is Iterator?

```
ITERATOR = Interface used to TRAVERSE (loop through) collections

FEATURES:
✅ Universal way to iterate ALL collections
✅ Can REMOVE elements safely during iteration
✅ Fail-fast (throws exception if modified)
✅ Unidirectional (only forward)

USES:
- for-each loop internally uses Iterator
- Manual iteration with more control
- Safe removal during iteration

Package: java.util
Method returning iterator: collection.iterator()

Every Collection provides iterator()
Every Iterable provides forEach()
```

### 📌 Basic Example

```java
import java.util.*;

public class IteratorDemo {
    public static void main(String[] args) {

        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        // ═══ Get Iterator ═══
        Iterator<String> it = list.iterator();

        // ═══ Traverse using hasNext() and next() ═══
        while (it.hasNext()) {
            String element = it.next();
            System.out.println(element);
        }

        // ═══ For-each loop (uses Iterator internally) ═══
        for (String s : list) {
            System.out.println(s);
        }
        // Equivalent to using Iterator

        // ═══ Works with any Collection ═══
        Set<String> set = new HashSet<>(Arrays.asList("X", "Y", "Z"));
        Iterator<String> setIt = set.iterator();

        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        Iterator<Map.Entry<String, Integer>> mapIt = map.entrySet().iterator();
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.2 Iterator Methods

<a id="272-iterator-methods"></a>

### 📌 Three Main Methods

```java
public interface Iterator<E> {
    boolean hasNext();        // Check if more elements
    E next();                 // Get next element
    default void remove();    // Remove last returned element
}
```

### 📌 Complete Example

```java
import java.util.*;

public class IteratorMethods {
    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // ═══ hasNext() + next() ═══
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer num = it.next();
            System.out.println(num);
        }

        // ═══ remove() - safe removal during iteration ═══
        List<Integer> list2 = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        Iterator<Integer> it2 = list2.iterator();

        while (it2.hasNext()) {
            Integer num = it2.next();
            if (num % 2 == 0) {
                it2.remove();   // ✅ Safe - use iterator's remove()!
            }
        }
        System.out.println(list2);   // [1, 3, 5]

        // ═══ ❌ WRONG: Modifying collection directly ═══
        List<Integer> list3 = new ArrayList<>(Arrays.asList(1, 2, 3));
        Iterator<Integer> it3 = list3.iterator();
        try {
            while (it3.hasNext()) {
                Integer num = it3.next();
                if (num == 2) {
                    list3.remove(num);   // ❌ ConcurrentModificationException!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Cannot modify during iteration!");
        }

        // ═══ Iterator can only be used ONCE ═══
        Iterator<Integer> once = list.iterator();
        while (once.hasNext()) {
            once.next();
        }
        // once is now exhausted - cannot reuse
        // Would need new iterator: list.iterator()
    }
}
```

### 📌 Method Details

```
hasNext():
- Returns true if more elements exist
- Doesn't advance the iterator
- Safe to call multiple times

next():
- Returns next element AND advances
- Throws NoSuchElementException if no more elements
- Must call hasNext() first

remove():
- Removes LAST returned element (from next())
- Must call next() BEFORE remove()
- Cannot call twice consecutively
- Optional operation (some iterators don't support)

Example:
Iterator<Integer> it = list.iterator();
// it.remove();   // ❌ IllegalStateException (haven't called next() yet)
it.next();
it.remove();      // ✅ OK
// it.remove();   // ❌ IllegalStateException (called twice)
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.3 ListIterator (Bidirectional)

<a id="273-listiterator"></a>

### 📌 More Powerful Iterator for Lists

```
ListIterator EXTENDS Iterator:

ADDITIONAL FEATURES:
✅ BIDIRECTIONAL (forward AND backward)
✅ Can ADD elements
✅ Can MODIFY (set) elements
✅ Provides INDEX information
✅ Only for List implementations

METHODS:
- Forward: hasNext(), next()
- Backward: hasPrevious(), previous()
- Modify: add(e), set(e)
- Info: nextIndex(), previousIndex()
- Remove: remove() (from Iterator)
```

### 📌 Complete Example

```java
import java.util.*;

public class ListIteratorDemo {
    public static void main(String[] args) {

        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        // ═══ Get ListIterator ═══
        ListIterator<String> lit = list.listIterator();

        // ═══ Forward iteration ═══
        System.out.println("--- Forward ---");
        while (lit.hasNext()) {
            int index = lit.nextIndex();
            String element = lit.next();
            System.out.println(index + ": " + element);
        }
        // Output:
        // 0: A
        // 1: B
        // 2: C
        // 3: D

        // ═══ Backward iteration ═══
        System.out.println("--- Backward ---");
        while (lit.hasPrevious()) {
            int index = lit.previousIndex();
            String element = lit.previous();
            System.out.println(index + ": " + element);
        }
        // Output:
        // 3: D
        // 2: C
        // 1: B
        // 0: A

        // ═══ Modify during iteration ═══
        ListIterator<String> lit2 = list.listIterator();
        while (lit2.hasNext()) {
            String elem = lit2.next();
            if (elem.equals("B")) {
                lit2.set("Z");         // Replace B with Z
                lit2.add("NEW");       // Add NEW after Z
            }
        }
        System.out.println(list);   // [A, Z, NEW, C, D]

        // ═══ Start from specific index ═══
        ListIterator<String> fromIndex = list.listIterator(2);
        // Starts iteration from index 2

        // ═══ Difference from Iterator ═══
        // Iterator: only forward, only remove()
        // ListIterator: bidirectional, add(), set(), remove(), indices
    }
}
```

### 📌 Iterator vs ListIterator

```
┌────────────────────┬────────────────┬────────────────┐
│  Feature           │  Iterator      │  ListIterator  │
├────────────────────┼────────────────┼────────────────┤
│  Direction         │  Forward only  │  Both          │
│  Available for     │  All Coll      │  Only List     │
│  hasNext/next      │  ✅ Yes        │  ✅ Yes        │
│  hasPrev/previous  │  ❌ No         │  ✅ Yes        │
│  remove()          │  ✅ Yes        │  ✅ Yes        │
│  add()             │  ❌ No         │  ✅ Yes        │
│  set()             │  ❌ No         │  ✅ Yes        │
│  Index info        │  ❌ No         │  ✅ Yes        │
└────────────────────┴────────────────┴────────────────┘

USE Iterator: For simple traversal
USE ListIterator: For List with modifications and bidirectional
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.4 Fail-Fast vs Fail-Safe Iterators

<a id="274-fail-fast-fail-safe"></a>

### 📌 Two Iterator Behaviors

```
FAIL-FAST ITERATORS:
✅ Throw ConcurrentModificationException on structural modification
✅ Use modCount internally to track changes
✅ Fast failure (best-effort)
✅ More memory efficient (no copy)
❌ Not thread-safe

Examples:
- ArrayList, LinkedList, Vector, Stack (from java.util)
- HashMap, HashSet, TreeMap, TreeSet
- Hashtable, LinkedHashMap, LinkedHashSet

FAIL-SAFE ITERATORS:
✅ No exception on modification
✅ Work on COPY/snapshot of collection
✅ Thread-safe
❌ More memory (copies data)
❌ May not reflect latest changes

Examples:
- CopyOnWriteArrayList
- CopyOnWriteArraySet
- ConcurrentHashMap
- All concurrent collections
```

### 📌 Complete Comparison

```
┌────────────────────────┬────────────────────┬────────────────────┐
│  Feature               │  Fail-Fast         │  Fail-Safe         │
├────────────────────────┼────────────────────┼────────────────────┤
│  On modification       │  Throws CME        │  No exception      │
├────────────────────────┼────────────────────┼────────────────────┤
│  Uses                  │  Original coll.    │  Snapshot/Copy     │
├────────────────────────┼────────────────────┼────────────────────┤
│  Performance           │  Faster            │  Slower (copy)     │
├────────────────────────┼────────────────────┼────────────────────┤
│  Memory                │  Less              │  More              │
├────────────────────────┼────────────────────┼────────────────────┤
│  Reflects changes      │  ✅ Yes            │  ❌ No (snapshot)  │
├────────────────────────┼────────────────────┼────────────────────┤
│  Thread-safe           │  ❌ No             │  ✅ Yes            │
└────────────────────────┴────────────────────┴────────────────────┘
```

### 📌 Fail-Fast Example

```java
import java.util.*;

public class FailFastDemo {
    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer num = it.next();
            System.out.println(num);
            if (num == 3) {
                list.add(100);   // ❌ Structural modification during iteration
            }
        }
        // Throws ConcurrentModificationException at next hasNext() call
    }
}
```

### 📌 Fail-Safe Example

```java
import java.util.concurrent.*;
import java.util.*;

public class FailSafeDemo {
    public static void main(String[] args) {

        List<Integer> list = new CopyOnWriteArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer num = it.next();
            System.out.println(num);
            if (num == 3) {
                list.add(100);   // ✅ NO exception! (works on snapshot)
            }
        }
        // Iterator won't see the new element (100)
        // Because it's iterating over snapshot

        System.out.println("Final: " + list);   // [1, 2, 3, 4, 5, 100]
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.5 Spliterator (Java 8+)

<a id="275-spliterator"></a>

### 📌 Splittable Iterator for Parallel Processing

```
SPLITERATOR:
✅ Introduced in Java 8
✅ Designed for PARALLEL iteration
✅ Can be SPLIT into multiple parts
✅ Used internally by Stream API
✅ Better than Iterator for streams

FEATURES:
- Can split into two spliterators (each processing half)
- Enables parallel processing
- More efficient than Iterator for parallel
- Has characteristics (SIZED, ORDERED, DISTINCT, etc.)
```

### 📌 Example

```java
import java.util.*;

public class SpliteratorDemo {
    public static void main(String[] args) {

        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // ═══ Get Spliterator ═══
        Spliterator<Integer> spliterator = list.spliterator();

        // ═══ Basic iteration ═══
        spliterator.forEachRemaining(System.out::println);
        // Prints: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

        // ═══ Split into two ═══
        Spliterator<Integer> spliterator2 = list.spliterator();
        Spliterator<Integer> split = spliterator2.trySplit();

        if (split != null) {
            System.out.println("--- First half ---");
            split.forEachRemaining(System.out::println);

            System.out.println("--- Second half ---");
            spliterator2.forEachRemaining(System.out::println);
        }

        // ═══ tryAdvance (like next() in Iterator) ═══
        Spliterator<Integer> sp = list.spliterator();
        sp.tryAdvance(n -> System.out.println("First: " + n));

        // ═══ Estimate size ═══
        Spliterator<Integer> sp2 = list.spliterator();
        System.out.println("Estimated size: " + sp2.estimateSize());

        // ═══ Used by Streams internally ═══
        list.stream()
             .parallel()   // Uses spliterator to divide work
             .forEach(System.out::println);
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.6 forEach() with Lambda

<a id="276-foreach-lambda"></a>

### 📌 Modern Iteration Style

```
forEach() (Java 8+):
✅ Default method in Iterable interface
✅ Takes a Consumer<T> lambda
✅ Cleaner syntax than for-loop
✅ Cannot break out (functional style)
✅ Not ideal for modification during iteration

Available on:
- All Collections (List, Set, Queue)
- Map has forEach() with BiConsumer
- Stream API
```

### 📌 Example

```java
import java.util.*;

public class ForEachDemo {
    public static void main(String[] args) {

        // ═══ List forEach ═══
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Lambda
        names.forEach(name -> System.out.println(name));

        // Method reference (cleaner)
        names.forEach(System.out::println);

        // ═══ Map forEach ═══
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 28);

        // BiConsumer
        ages.forEach((key, value) ->
            System.out.println(key + " → " + value)
        );

        // ═══ With complex operations ═══
        names.forEach(name -> {
            String upper = name.toUpperCase();
            System.out.println("Name: " + upper);
        });

        // ═══ Set forEach ═══
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3));
        set.forEach(System.out::println);

        // ═══ COMPARISON ═══

        // Traditional for-loop
        for (String name : names) {
            System.out.println(name);
        }

        // Iterator
        Iterator<String> it = names.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        // Lambda forEach (Java 8+, cleanest!)
        names.forEach(System.out::println);
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.7 What are Generics

<a id="277-what-are-generics"></a>

### 📌 Type Parameters for Type Safety

```
GENERICS = Type parameters for classes, methods, interfaces
           Allows working with different types safely

INTRODUCED: Java 5 (2004)

SYNTAX:
class Class<T> { }              → Generic class
<T> T method(T x) { }           → Generic method
interface I<T> { }               → Generic interface

NAMING CONVENTIONS (unofficial):
- T = Type (single generic)
- E = Element (collections)
- K = Key (map key)
- V = Value (map value)
- N = Number
- S, U, V = Multiple types

Example:
List<String>          → List of Strings
Map<String, Integer>  → Map with String keys, Integer values
Optional<User>        → Optional User

BEFORE GENERICS (Java 1.4):
List list = new ArrayList();
list.add("Hello");
list.add(123);
String s = (String) list.get(0);   // Explicit cast, unsafe

AFTER GENERICS (Java 5+):
List<String> list = new ArrayList<>();
list.add("Hello");
// list.add(123);   // ❌ Compile error!
String s = list.get(0);   // No cast needed
```

### 📌 Simple Example

```java
import java.util.*;

public class GenericsBasics {
    public static void main(String[] args) {

        // ═══ Non-generic (unsafe) ═══
        List oldList = new ArrayList();
        oldList.add("Hello");
        oldList.add(123);   // Anything allowed!
        oldList.add(new Date());

        String s = (String) oldList.get(0);   // ✅ OK
        // String s2 = (String) oldList.get(1);  // ❌ ClassCastException at runtime!

        // ═══ Generic (type-safe) ═══
        List<String> newList = new ArrayList<>();
        newList.add("Hello");
        // newList.add(123);   // ❌ Compile error!

        String s3 = newList.get(0);   // No cast needed
        // Type safety at COMPILE time!
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.8 Why Generics (Type Safety)

<a id="278-why-generics"></a>

### 📌 Benefits of Generics

```
1. TYPE SAFETY
   ✅ Errors caught at COMPILE time
   ✅ No ClassCastException at runtime

2. ELIMINATION OF CASTS
   ✅ No explicit casting needed
   ✅ Cleaner code

3. GENERIC ALGORITHMS
   ✅ Write once, use with any type
   ✅ Code reusability

4. BETTER API DESIGN
   ✅ Clear intent
   ✅ Self-documenting

5. RUNTIME SAFETY
   ✅ Fewer errors in production
```

### 📌 Before vs After Generics

```java
import java.util.*;

public class WhyGenerics {

    // ═══ WITHOUT Generics (Bad!) ═══
    public static void oldWay() {
        List list = new ArrayList();
        list.add("Hello");
        list.add(123);   // Not caught by compiler!

        for (Object obj : list) {
            String s = (String) obj;   // ❌ ClassCastException on 123!
            System.out.println(s);
        }
    }

    // ═══ WITH Generics (Good!) ═══
    public static void newWay() {
        List<String> list = new ArrayList<>();
        list.add("Hello");
        // list.add(123);   // ❌ Compile error - caught immediately!

        for (String s : list) {
            System.out.println(s);   // No cast needed
        }
    }

    // ═══ Reusable Generic Method ═══
    public static <T> void printList(List<T> list) {
        for (T item : list) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {

        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<String> strs = Arrays.asList("A", "B", "C");
        List<Double> dbls = Arrays.asList(1.1, 2.2, 3.3);

        printList(ints);   // Works with Integer!
        printList(strs);   // Works with String!
        printList(dbls);   // Works with Double!
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.9 Generic Classes

<a id="279-generic-classes"></a>

### 📌 Class with Type Parameter

```java
// ═══ Generic class ═══
class Box<T> {   // T is type parameter
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

public class GenericClassDemo {
    public static void main(String[] args) {

        // ═══ Different types ═══
        Box<Integer> intBox = new Box<>();
        intBox.set(42);
        Integer i = intBox.get();

        Box<String> strBox = new Box<>();
        strBox.set("Hello");
        String s = strBox.get();

        Box<Double> dblBox = new Box<>();
        dblBox.set(3.14);
        Double d = dblBox.get();

        // Type safety!
        // intBox.set("Wrong");   // ❌ Compile error!
    }
}

// ═══ Multiple type parameters ═══
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() {
        return "(" + key + ", " + value + ")";
    }
}

// Usage:
Pair<String, Integer> person = new Pair<>("Alice", 25);
Pair<String, Double> price = new Pair<>("Apple", 1.99);
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.10 Generic Methods

<a id="2710-generic-methods"></a>

### 📌 Method with Type Parameter

```java
import java.util.*;

public class GenericMethodDemo {

    // ═══ Generic method syntax ═══
    // <T> before return type
    public static <T> void printArray(T[] array) {
        for (T item : array) {
            System.out.println(item);
        }
    }

    // ═══ Multiple type parameters ═══
    public static <K, V> void printMap(Map<K, V> map) {
        for (Map.Entry<K, V> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }
    }

    // ═══ Generic method with return type ═══
    public static <T> T firstElement(List<T> list) {
        if (list.isEmpty()) return null;
        return list.get(0);
    }

    // ═══ Generic method with multiple types ═══
    public static <T, U> Pair<T, U> makePair(T first, U second) {
        return new Pair<>(first, second);
    }

    public static void main(String[] args) {

        // ═══ Auto type inference ═══
        Integer[] intArr = {1, 2, 3};
        printArray(intArr);   // T inferred as Integer

        String[] strArr = {"A", "B", "C"};
        printArray(strArr);   // T inferred as String

        // ═══ Get first element ═══
        List<String> names = Arrays.asList("Alice", "Bob");
        String first = firstElement(names);
        System.out.println(first);   // Alice

        // ═══ Multiple types ═══
        Pair<String, Integer> pair = makePair("Age", 25);
        System.out.println(pair);   // (Age, 25)
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.11 Generic Interfaces

<a id="2711-generic-interfaces"></a>

### 📌 Interface with Type Parameter

```java
// ═══ Generic interface ═══
interface Container<T> {
    void add(T item);
    T get(int index);
    int size();
}

// ═══ Implementation ═══
class StringContainer implements Container<String> {
    // Must specify type parameter!
    private List<String> items = new ArrayList<>();

    @Override
    public void add(String item) {
        items.add(item);
    }

    @Override
    public String get(int index) {
        return items.get(index);
    }

    @Override
    public int size() {
        return items.size();
    }
}

// ═══ Generic implementation ═══
class MyContainer<T> implements Container<T> {
    private List<T> items = new ArrayList<>();

    @Override
    public void add(T item) {
        items.add(item);
    }

    @Override
    public T get(int index) {
        return items.get(index);
    }

    @Override
    public int size() {
        return items.size();
    }
}

// ═══ Standard example: Comparable ═══
// Comparable<T> is a generic interface

class Student implements Comparable<Student> {
    int marks;

    public Student(int marks) { this.marks = marks; }

    @Override
    public int compareTo(Student other) {
        return this.marks - other.marks;
    }
}

// ═══ Usage ═══
Container<Integer> intContainer = new MyContainer<>();
intContainer.add(1);
intContainer.add(2);

Container<String> strContainer = new StringContainer();
strContainer.add("Hello");
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.12 Bounded Type Parameters (extends)

<a id="2712-bounded-type-parameters"></a>

### 📌 Restrict Type Parameters

```
BOUNDED TYPE PARAMETERS:
- Restrict what types can be used
- Use extends keyword (even for interfaces!)
- T extends X means T is X or SUBCLASS of X

WHY?
- Type safety
- Allow specific method calls on generic types
- Prevent unwanted types
```

### 📌 Example

```java
import java.util.*;

// ═══ Bounded type: T must be Number or subclass ═══
class NumberBox<T extends Number> {
    private T value;

    public NumberBox(T value) {
        this.value = value;
    }

    // Can call Number methods!
    public double asDouble() {
        return value.doubleValue();
    }

    public int asInt() {
        return value.intValue();
    }
}

// ═══ Bounded generic method ═══
class MathUtils {

    // T must extend Comparable<T>
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }

    // T must extend Number
    public static <T extends Number> double sum(List<T> list) {
        double total = 0;
        for (T num : list) {
            total += num.doubleValue();
        }
        return total;
    }
}

public class BoundedDemo {
    public static void main(String[] args) {

        // ═══ Valid uses ═══
        NumberBox<Integer> intBox = new NumberBox<>(42);
        NumberBox<Double> dblBox = new NumberBox<>(3.14);
        NumberBox<Float> fltBox = new NumberBox<>(2.5f);

        System.out.println(intBox.asDouble());   // 42.0

        // ═══ Invalid - String is not Number ═══
        // NumberBox<String> strBox = new NumberBox<>("hello");   // ❌ Error

        // ═══ Method calls ═══
        System.out.println(MathUtils.max(10, 20));           // 20
        System.out.println(MathUtils.max("Apple", "Banana")); // Banana

        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(MathUtils.sum(ints));   // 15.0

        List<Double> dbls = Arrays.asList(1.5, 2.5, 3.5);
        System.out.println(MathUtils.sum(dbls));   // 7.5
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.13 Multiple Bounds

<a id="2713-multiple-bounds"></a>

### 📌 Extend Multiple Interfaces (or one class + interfaces)

```java
import java.io.*;
import java.util.*;

// ═══ Multiple bounds ═══
// T must extend Number AND implement Comparable
class MultipleBoundsBox<T extends Number & Comparable<T>> {
    private T value;

    public MultipleBoundsBox(T value) {
        this.value = value;
    }

    public boolean isGreaterThan(T other) {
        return value.compareTo(other) > 0;   // From Comparable
    }

    public double asDouble() {
        return value.doubleValue();   // From Number
    }
}

// ═══ Rules for multiple bounds ═══
// class T extends A & B & C
// A can be class OR interface
// B, C must be interfaces
// If A is class, it must come FIRST

// ═══ Valid ═══
class Example1<T extends Number & Comparable<T> & Serializable> { }
// Multiple interfaces after Number

class Example2<T extends Comparable<T> & Serializable> { }
// All interfaces

// ═══ Invalid ═══
// class Example3<T extends Comparable<T> & Number> { }   // ❌ Class after interface
// class Example4<T extends String & Integer> { }         // ❌ Multiple classes

public class MultipleBoundsDemo {
    public static void main(String[] args) {

        MultipleBoundsBox<Integer> box = new MultipleBoundsBox<>(100);
        System.out.println(box.isGreaterThan(50));   // true
        System.out.println(box.asDouble());           // 100.0
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.14 Wildcards — Unbounded (?)

<a id="2714-wildcards-unbounded"></a>

### 📌 Wildcards Explained

```
WILDCARD = Unknown type parameter

TYPES:
1. UNBOUNDED: <?>          → Any type
2. UPPER BOUNDED: <? extends X>  → X or subclass
3. LOWER BOUNDED: <? super X>    → X or superclass

USE CASE:
- Method parameters when you don't care about specific type
- Read-only operations
- More flexible than specific generic types
```

### 📌 Unbounded Wildcard Example

```java
import java.util.*;

public class UnboundedWildcard {

    // ═══ Method accepts List of ANY type ═══
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }

    // ═══ Get size of any list ═══
    public static int getSize(List<?> list) {
        return list.size();
    }

    public static void main(String[] args) {

        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<String> strs = Arrays.asList("A", "B", "C");
        List<Double> dbls = Arrays.asList(1.1, 2.2);

        // ═══ Works with any type! ═══
        printList(ints);
        printList(strs);
        printList(dbls);

        // ═══ CANNOT add elements ═══
        List<?> unknown = new ArrayList<>();
        // unknown.add("Hello");   // ❌ Compile error!
        // Can't add anything (except null) because compiler doesn't know type
        unknown.add(null);   // ✅ Only null is safe
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.15 Wildcards — Upper Bounded (? extends)

<a id="2715-wildcards-upper-bounded"></a>

### 📌 Read-Only Restrictions

```
UPPER BOUNDED WILDCARD: <? extends T>
→ Represents T or SUBCLASS of T
→ Use when READING from generic type

RULE: Can READ (get) but cannot WRITE (add)
Because compiler doesn't know exact subtype
```

### 📌 Example

```java
import java.util.*;

public class UpperBoundedWildcard {

    // ═══ Accept List of Number or its subtypes ═══
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0;
        for (Number n : list) {   // Can READ as Number
            sum += n.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {

        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> dbls = Arrays.asList(1.5, 2.5, 3.5);
        List<Number> nums = Arrays.asList(1, 2.5, 3L);

        // ═══ Works with any Number subtype ═══
        System.out.println(sumOfList(ints));   // 6.0
        System.out.println(sumOfList(dbls));   // 7.5
        System.out.println(sumOfList(nums));   // 6.5

        // ═══ CANNOT ADD to upper bounded list ═══
        List<? extends Number> readOnly = new ArrayList<Integer>();
        // readOnly.add(1);      // ❌ Error!
        // readOnly.add(1.5);    // ❌ Error!
        // Compiler doesn't know if it's List<Integer> or List<Double>
        readOnly.add(null);   // ✅ Only null is safe

        // ═══ CAN READ ═══
        Number first = readOnly.get(0);   // If not empty
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.16 Wildcards — Lower Bounded (? super)

<a id="2716-wildcards-lower-bounded"></a>

### 📌 Write-Enabled Restrictions

```
LOWER BOUNDED WILDCARD: <? super T>
→ Represents T or SUPERCLASS of T
→ Use when WRITING to generic type

RULE: Can WRITE (add) T or its subclasses
      Can READ as Object only
```

### 📌 Example

```java
import java.util.*;

public class LowerBoundedWildcard {

    // ═══ Accept List of Integer or its superclass ═══
    public static void addNumbers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) {
            list.add(i);   // ✅ Can add Integer or subtypes
        }
    }

    public static void main(String[] args) {

        // ═══ Works with Integer or superclass ═══
        List<Integer> intList = new ArrayList<>();
        List<Number> numList = new ArrayList<>();
        List<Object> objList = new ArrayList<>();

        addNumbers(intList);   // ✅ Integer
        addNumbers(numList);   // ✅ Number (Integer's parent)
        addNumbers(objList);   // ✅ Object (Number's parent)

        System.out.println(intList);   // [1, 2, 3, 4, 5]
        System.out.println(numList);   // [1, 2, 3, 4, 5]

        // ═══ WOULDN'T work with Double ═══
        // List<Double> dblList = new ArrayList<>();
        // addNumbers(dblList);   // ❌ Error!
        // Double is NOT superclass of Integer

        // ═══ READING gives Object ═══
        List<? super Integer> lowerBounded = new ArrayList<Number>();
        lowerBounded.add(10);
        Object o = lowerBounded.get(0);   // Only Object type
        // Integer i = lowerBounded.get(0);   // ❌ Error!
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.17 PECS Principle (Producer Extends Consumer Super) ⭐

<a id="2717-pecs-principle"></a>

### 📌 Golden Rule for Generics

```
PECS: Producer Extends, Consumer Super

PRODUCER (READING):
Use <? extends T> when you READ from a collection
"Producer" - it produces values you consume

CONSUMER (WRITING):
Use <? super T> when you WRITE to a collection
"Consumer" - it consumes values you provide

RULE OF THUMB:
- Get FROM: extends
- Put TO: super
- BOTH: no wildcard, use T
```

### 📌 Complete Example

```java
import java.util.*;

public class PECSDemo {

    // ═══ Producer: Reading numbers (get) ═══
    // <? extends Number> = List produces Numbers to read
    public static double sum(List<? extends Number> producer) {
        double total = 0;
        for (Number n : producer) {   // READING
            total += n.doubleValue();
        }
        return total;
    }

    // ═══ Consumer: Writing numbers (add) ═══
    // <? super Integer> = List consumes Integers
    public static void addIntegers(List<? super Integer> consumer) {
        for (int i = 1; i <= 5; i++) {
            consumer.add(i);   // WRITING
        }
    }

    // ═══ BOTH producer and consumer (copy) ═══
    // Source: producer (read from), extends
    // Destination: consumer (write to), super
    public static <T> void copy(List<? extends T> src, List<? super T> dest) {
        for (T item : src) {
            dest.add(item);
        }
    }

    public static void main(String[] args) {

        // ═══ PRODUCER example ═══
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> dbls = Arrays.asList(1.5, 2.5);
        System.out.println(sum(ints));   // 6.0
        System.out.println(sum(dbls));   // 4.0

        // ═══ CONSUMER example ═══
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();
        addIntegers(numbers);
        addIntegers(objects);

        // ═══ COPY example (both) ═══
        List<Integer> source = Arrays.asList(1, 2, 3);
        List<Number> destination = new ArrayList<>();
        copy(source, destination);   // Integer → Number
    }
}
```

### 📌 PECS Rules Table

```
┌────────────────────┬───────────────────┬───────────────────┐
│  Operation         │  Wildcard         │  Example          │
├────────────────────┼───────────────────┼───────────────────┤
│  READ (Producer)   │  ? extends T      │  List<? extends   │
│                    │  Get FROM         │  Number>          │
│                    │                   │  (Read Numbers)   │
├────────────────────┼───────────────────┼───────────────────┤
│  WRITE (Consumer)  │  ? super T        │  List<? super    │
│                    │  Put TO           │  Integer>         │
│                    │                   │  (Write Integers) │
├────────────────────┼───────────────────┼───────────────────┤
│  BOTH (rare)       │  Just T (no wild) │  List<T>         │
│                    │                   │                   │
└────────────────────┴───────────────────┴───────────────────┘
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.18 Type Erasure

<a id="2718-type-erasure"></a>

### 📌 Generics Exist Only at Compile Time!

```
TYPE ERASURE:
- Generics are erased at COMPILE time
- Runtime has NO generic type information
- Java maintains backward compatibility

Example:
List<String> list = new ArrayList<>();

AT COMPILE TIME:
List<String> (compile-time checks)

AT RUNTIME:
List (no generic info!)

CONSEQUENCES:
- Cannot use instanceof with generic type
- Cannot create generic arrays
- Cannot use primitives as type parameters
- Runtime reflection is limited
```

### 📌 Example

```java
import java.util.*;

public class TypeErasureDemo {
    public static void main(String[] args) {

        List<String> strList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();

        // ═══ AT RUNTIME both are just ArrayList! ═══
        System.out.println(strList.getClass());   // class java.util.ArrayList
        System.out.println(intList.getClass());   // class java.util.ArrayList
        System.out.println(strList.getClass() == intList.getClass());   // true!

        // ═══ CANNOT check generic type at runtime ═══
        // if (strList instanceof List<String>) { }   // ❌ Compile error!

        // ═══ CANNOT create generic array ═══
        // List<Integer>[] arr = new List<Integer>[10];   // ❌ Error!

        // ═══ Only raw type check ═══
        if (strList instanceof List) {
            System.out.println("Yes, it's a List");
        }
    }
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

## 27.19 Generic Restrictions

<a id="2719-generic-restrictions"></a>

### 📌 What You CANNOT Do

```
1. ❌ CANNOT create instance of type parameter
   T obj = new T();   // Error

2. ❌ CANNOT create generic array
   List<Integer>[] arr = new List<Integer>[10];   // Error

3. ❌ CANNOT use primitives as type parameters
   List<int> list;   // Error (use List<Integer>)

4. ❌ CANNOT use static fields of type parameter
   class Test<T> {
       static T value;   // Error
   }

5. ❌ CANNOT use instanceof with generic type
   if (obj instanceof List<String>) { }   // Error

6. ❌ CANNOT overload methods based on erased types
   void method(List<String> list) { }
   void method(List<Integer> list) { }   // Both erase to List!

7. ❌ CANNOT extend Throwable
   class MyException<T> extends Exception { }   // Error

8. ❌ CANNOT use type parameter in exception clauses
   catch (T e) { }   // Error
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

<a id="27-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Iterator/Generics

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Iterators           │ Iterator   │ Iterators  │ iter()     │ Iterator   │
│                      │ interface  │ (pointers) │ __iter__   │ protocol   │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Bidirectional iter  │ ListIter   │ Bidirect   │ ❌ No      │ ❌ No     │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Fail-fast iterators │ ✅ Java-   │ ⚠️ Some    │ ❌ No      │ ❌ No     │
│                      │ specific   │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Generics            │ Type erasure│ Templates │ Duck typing│ No         │
│                      │ (compile   │ (compile)  │            │            │
│                      │ time only) │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Wildcards           │ ? extends, │ ❌ No      │ N/A        │ N/A        │
│  (PECS)              │ ? super    │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Bounded types       │ ✅ Yes     │ ✅ Concepts│ ❌ No      │ ❌ No     │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

<a id="27-interview-questions"></a>

## 💡 Chapter 27 — Interview Questions (15+)

---

**Q1. What is Iterator? Why use it?**

```
ITERATOR = Interface used to traverse collections uniformly.

WHY USE?
✅ Universal traversal across all collections
✅ Safe removal during iteration (remove())
✅ Fail-fast (detects concurrent modification)
✅ Encapsulates iteration logic

METHODS:
- hasNext() - check if more
- next() - get next and advance
- remove() - remove last returned element

Example:
List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3));
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
```

---

**Q2. Difference between Iterator and ListIterator?**

```
┌────────────────────┬────────────┬────────────────┐
│  Feature           │  Iterator  │  ListIterator  │
├────────────────────┼────────────┼────────────────┤
│  Direction         │  Forward   │  Both          │
│  Available for     │  All Coll  │  Only List     │
│  hasNext/next      │  ✅        │  ✅            │
│  hasPrev/previous  │  ❌        │  ✅            │
│  add()             │  ❌        │  ✅            │
│  set()             │  ❌        │  ✅            │
│  Index info        │  ❌        │  ✅            │
└────────────────────┴────────────┴────────────────┘

USE Iterator: Simple forward traversal
USE ListIterator: Bidirectional, modification needed
```

---

**Q3. What is fail-fast vs fail-safe iterator?**

```
FAIL-FAST:
✅ Throws ConcurrentModificationException
✅ Detects modification during iteration
✅ Best-effort mechanism
✅ Used by ArrayList, HashMap, etc.

FAIL-SAFE:
✅ No exception on modification
✅ Works on COPY of collection
✅ Thread-safe
✅ Used by ConcurrentHashMap, CopyOnWriteArrayList

Example FAIL-FAST:
List<Integer> list = new ArrayList<>();
for (Integer n : list) {
    list.add(100);   // ConcurrentModificationException!
}

Example FAIL-SAFE:
List<Integer> list = new CopyOnWriteArrayList<>();
for (Integer n : list) {
    list.add(100);   // ✅ No exception (works on snapshot)
}
```

---

**Q4. What are Generics? Why use them?**

```
GENERICS = Type parameters for classes, methods, interfaces

BEFORE (Java 1.4):
List list = new ArrayList();
list.add("Hello");
list.add(123);   // ❌ Anything allowed!
String s = (String) list.get(0);   // Explicit cast

AFTER (Java 5+):
List<String> list = new ArrayList<>();
list.add("Hello");
// list.add(123);   // ✅ Compile error!
String s = list.get(0);   // No cast

BENEFITS:
✅ Type safety at COMPILE time
✅ No explicit casts
✅ Generic algorithms (code reusability)
✅ Better API design
✅ Fewer runtime errors
```

---

**Q5. Explain PECS principle.**

```
PECS: Producer Extends, Consumer Super

PRODUCER (Reading from collection):
Use <? extends T>
"Produces" items you consume (get from)

CONSUMER (Writing to collection):
Use <? super T>
"Consumes" items you provide (put to)

RULE OF THUMB:
- Get FROM collection: extends
- Put TO collection: super
- BOTH: use T (no wildcard)

Example:
// Producer (reading Numbers)
double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

// Consumer (writing Integers)
void addInts(List<? super Integer> list) {
    for (int i = 1; i <= 5; i++) list.add(i);
}

// Copy: source is producer, dest is consumer
<T> void copy(List<? extends T> src, List<? super T> dest) {
    for (T item : src) dest.add(item);
}
```

---

**Q6. What is Type Erasure?**

```
TYPE ERASURE:
Generics exist ONLY at compile time.
Runtime has NO generic information.

Example:
List<String> strList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

At runtime, BOTH are just ArrayList!
strList.getClass() == intList.getClass()  // true

CONSEQUENCES:
❌ Cannot use instanceof with generics
❌ Cannot create generic arrays
❌ Cannot use primitives (int) as type params
❌ Cannot overload methods based on generics
❌ Cannot extend Throwable

Why? For backward compatibility with pre-Java 5 code.

At runtime:
List<String> becomes just List
List<Integer> becomes just List
```

---

**Q7. Wildcards: unbounded vs upper vs lower bounded?**

```
UNBOUNDED (<?>):
- Any type
- Can only read as Object
- Cannot add (except null)

Example: List<?>

UPPER BOUNDED (<? extends T>):
- T or subclass
- Can READ as T
- Cannot ADD (except null)

Example: List<? extends Number>
- Accepts List<Integer>, List<Double>, etc.

LOWER BOUNDED (<? super T>):
- T or superclass
- Can WRITE T or subclasses
- Read only as Object

Example: List<? super Integer>
- Accepts List<Integer>, List<Number>, List<Object>

MEMORY TRICK: PECS
- Producer: extends (READ)
- Consumer: super (WRITE)
```

---

### 🔴 Output-Based Questions

**Q8. Will this compile?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        for (int n : list) {
            if (n == 1) list.remove(Integer.valueOf(n));
        }
        System.out.println(list);
    }
}
```

```
❌ ConcurrentModificationException at runtime!

REASON: Modifying list during for-each iteration.
For-each uses Iterator internally.
Modifying underlying list throws exception.

FIX: Use Iterator.remove()
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    if (it.next() == 1) it.remove();
}
```

---

**Q9. What is the output?**

```java
import java.util.*;
public class Test {
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(max(10, 20));
        System.out.println(max("apple", "banana"));
    }
}
```

```
OUTPUT:
20
banana

REASON:
- Generic method with bounded type
- T must extend Comparable
- Integer, String both implement Comparable
- Returns the larger element
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

<a id="27-practice-problems"></a>

## 🧪 Chapter 27 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain Iterator and ListIterator with differences.

2. What is fail-fast vs fail-safe iterator? Give examples.

3. Explain Generics with type safety benefits.

4. Explain PECS principle with examples.

5. What is type erasure? What are its consequences?
```

### 💻 5 Coding Questions

```java
// Q1: Create generic Stack class
public class MyStack<T> {
    // TODO: push, pop, peek, isEmpty
}
```

```java
// Q2: Generic method to find max element
public class GenericMax {
    // TODO: <T extends Comparable<T>> T max(List<T> list)
}
```

```java
// Q3: Generic Pair class with multiple types
public class Pair<K, V> {
    // TODO: getKey, getValue, setValue
}
```

```java
// Q4: Iterator that filters odd numbers
public class OddFilter implements Iterable<Integer> {
    // TODO: Return iterator that returns only odd numbers
}
```

```java
// Q5: Generic method using PECS
public class CollectionCopy {
    // TODO: copy(List<? extends T> src, List<? super T> dest)
}
```

<a href="#chapter-index-table-27">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 27 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 27.1  Iterator Interface                                │
│  ✅ 27.2  Iterator Methods                                   │
│  ✅ 27.3  ListIterator                                       │
│  ✅ 27.4  Fail-Fast vs Fail-Safe                            │
│  ✅ 27.5  Spliterator (Java 8+)                             │
│  ✅ 27.6  forEach() with Lambda                             │
│  ✅ 27.7  What are Generics                                  │
│  ✅ 27.8  Why Generics                                       │
│  ✅ 27.9  Generic Classes                                    │
│  ✅ 27.10 Generic Methods                                    │
│  ✅ 27.11 Generic Interfaces                                 │
│  ✅ 27.12 Bounded Type Parameters                           │
│  ✅ 27.13 Multiple Bounds                                    │
│  ✅ 27.14 Wildcards - Unbounded                             │
│  ✅ 27.15 Wildcards - Upper Bounded                         │
│  ✅ 27.16 Wildcards - Lower Bounded                         │
│  ✅ 27.17 PECS Principle                                     │
│  ✅ 27.18 Type Erasure                                       │
│  ✅ 27.19 Generic Restrictions                               │
│                                                             │
│  ⭐ Next: File Handling & I/O (Chapter 28)                  │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
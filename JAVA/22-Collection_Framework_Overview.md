

<a id="22-collection-framework-overview"></a>

# 📘 Chapter 22: Collection Framework Overview

> **Part E: Collection Framework**
> `Core` | `Data Structures` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-22"></a>

## 📚 Chapter 22 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 22.1 | [What is Collections Framework](#221-what-is-collections-framework) | Definition, Purpose |
| 22.2 | [Need for Collections](#222-need-for-collections) | Array Limitations |
| 22.3 | [Benefits of Framework](#223-benefits-of-framework) | 8 Major Benefits |
| 22.4 | [Collections Hierarchy Diagram](#224-collections-hierarchy) | Complete Structure |
| 22.5 | [Iterable Interface](#225-iterable-interface) | Root of Collections |
| 22.6 | [Collection Interface](#226-collection-interface) | Base of All Collections |
| 22.7 | [Collection Methods](#227-collection-methods) | All Standard Methods |
| 22.8 | [List Interface Overview](#228-list-interface-overview) | Ordered, Indexed |
| 22.9 | [Set Interface Overview](#229-set-interface-overview) | No Duplicates |
| 22.10 | [Queue Interface Overview](#2210-queue-interface-overview) | FIFO |
| 22.11 | [Deque Interface Overview](#2211-deque-interface-overview) | Double-Ended Queue |
| 22.12 | [Map Interface Overview](#2212-map-interface-overview) | Key-Value Pairs |
| 22.13 | [Collections Utility Class](#2213-collections-utility-class) | Helper Methods |
| 22.14 | [Comparable Interface](#2214-comparable-interface) | Natural Ordering |
| 22.15 | [Comparator Interface](#2215-comparator-interface) | Custom Ordering |
| 22.16 | [Comparable vs Comparator](#2216-comparable-vs-comparator) | Complete Comparison |
| 🔥 | [Java vs Other Languages](#22-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#22-interview-questions) | 15+ Questions |
| 🧪 | [Practice Problems](#22-practice-problems) | 5 Coding + 5 Theory |

---

## 22.1 What is Collections Framework

<a id="221-what-is-collections-framework"></a>

### 📌 Definition

```
COLLECTIONS FRAMEWORK = A unified ARCHITECTURE for storing and
                        manipulating GROUPS OF OBJECTS in Java.

Provides:
✅ Ready-to-use DATA STRUCTURES (List, Set, Map, Queue)
✅ ALGORITHMS (sorting, searching, shuffling)
✅ INTERFACES defining common behavior
✅ IMPLEMENTATIONS (ArrayList, HashMap, HashSet, etc.)

Located in: java.util package

Introduced in: Java 1.2 (1998)

BEFORE Collections Framework:
→ Only Arrays, Vector, Stack, Hashtable
→ No standard interfaces
→ Inconsistent APIs

AFTER Collections Framework:
→ Unified interface-based design
→ Consistent methods across all collections
→ Rich implementations for every need
```

### 📌 Framework Components

```
COLLECTIONS FRAMEWORK has 3 parts:

1. INTERFACES (define what to do)
   → Iterable, Collection, List, Set, Map, Queue

2. IMPLEMENTATIONS (define how to do)
   → ArrayList, LinkedList, HashMap, HashSet, ArrayDeque

3. ALGORITHMS (utility operations)
   → sort(), reverse(), shuffle(), binarySearch()
   → In Collections utility class
```

### 📌 Simple Example

```java
import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {

        // ═══ List - ordered, allows duplicates ═══
        List<String> names = new ArrayList<>();
        names.add("Rahul");
        names.add("Priya");
        names.add("Amit");
        names.add("Rahul");   // Duplicate allowed
        System.out.println(names);   // [Rahul, Priya, Amit, Rahul]

        // ═══ Set - no duplicates ═══
        Set<String> uniqueNames = new HashSet<>(names);
        System.out.println(uniqueNames);   // [Rahul, Priya, Amit]

        // ═══ Map - key-value pairs ═══
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Rahul", 25);
        ages.put("Priya", 23);
        ages.put("Amit", 30);
        System.out.println(ages);   // {Rahul=25, Priya=23, Amit=30}

        // ═══ Queue - FIFO ═══
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println(queue.poll());   // 1 (first in, first out)
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
COLLECTIONS = Different types of STORAGE CONTAINERS

📚 LIBRARY MEIN dekho:
   → BOOKS SHELF (ordered by number) = LIST
   → UNIQUE STUDENT ID CARDS (no duplicates) = SET
   → DICTIONARY (word → meaning) = MAP
   → TICKET QUEUE (first come, first serve) = QUEUE
   → DEQUE (like a Metro line — enter/exit both sides) = DEQUE

Different containers for DIFFERENT NEEDS:

🏪 GROCERY STORE:
   - RACK OF PRODUCTS (List) → indexed, ordered
   - CATEGORIES (Set) → unique categories only
   - PRICE TAGS (Map) → product name → price
   - CHECKOUT COUNTER (Queue) → FIFO
   - CONVEYOR BELT (Deque) → add/remove from both ends

Framework = Collection of these organized containers
with STANDARD ways to use them!
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.2 Need for Collections (Array Limitations)

<a id="222-need-for-collections"></a>

### 📌 Problems with Arrays

```
Arrays have SEVERAL LIMITATIONS that Collections solve:

❌ ARRAY LIMITATIONS:
1. FIXED SIZE — cannot grow/shrink
2. NO built-in methods (search, sort limited)
3. Homogeneous — only ONE type
4. No key-value support
5. Manual resizing needed
6. Poor performance for insertion/deletion in middle
7. Not type-safe for mixed operations
```

### 📌 Array vs Collection Comparison

```java
import java.util.*;

public class ArrayVsCollection {
    public static void main(String[] args) {

        // ═══ ARRAY - Fixed size problem ═══
        int[] arr = new int[5];
        arr[0] = 1;
        arr[1] = 2;
        // arr[10] = 3;   // ❌ ArrayIndexOutOfBoundsException!
        // Cannot grow beyond 5!

        // ═══ ARRAYLIST - Dynamic size ═══
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.add(6);   // ✅ Grows automatically!
        list.add(7);   // ✅
        System.out.println(list.size());   // 7

        // ═══ ARRAY - No built-in operations ═══
        int[] arr2 = {5, 3, 1, 4, 2};
        // Manual sorting logic needed
        Arrays.sort(arr2);   // Static method from Arrays class

        // ═══ COLLECTION - Rich API ═══
        List<Integer> list2 = new ArrayList<>(Arrays.asList(5, 3, 1, 4, 2));
        Collections.sort(list2);              // ✅ Built-in
        Collections.reverse(list2);            // ✅ Built-in
        Collections.shuffle(list2);            // ✅ Built-in
        int max = Collections.max(list2);      // ✅ Built-in

        // ═══ ARRAY - No key-value ═══
        // Impossible to store name→age mapping

        // ═══ MAP - Key-value support ═══
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Rahul", 25);
        ages.put("Priya", 30);

        // ═══ ARRAY - Poor middle insertion ═══
        // Requires manual shifting of elements

        // ═══ LIST - Easy middle insertion ═══
        list.add(2, 99);   // Insert at index 2
        System.out.println(list);   // [1, 2, 99, 3, 4, 5, 6, 7]
    }
}
```

### 📌 Advantages of Collections Over Arrays

```
┌────────────────────────┬──────────────────┬──────────────────┐
│  Feature               │  Array           │  Collection      │
├────────────────────────┼──────────────────┼──────────────────┤
│  Size                  │  FIXED           │  DYNAMIC         │
│  Type safety           │  ✅ Yes          │  ✅ Yes (generics)│
│  Store objects         │  ✅ Both         │  ✅ Only objects │
│  Store primitives      │  ✅ YES          │  ❌ No (autobox) │
│  Built-in methods      │  Very few        │  RICH API        │
│  Insertion in middle   │  ❌ Manual       │  ✅ Built-in    │
│  Deletion              │  ❌ Manual       │  ✅ Built-in    │
│  Search                │  Manual/limited  │  ✅ Built-in    │
│  Sort                  │  Arrays.sort()   │  Collections.sort()│
│  Key-value pairs       │  ❌ NO           │  ✅ Map          │
│  Iterators             │  ❌ NO           │  ✅ YES          │
│  Thread-safe versions  │  ❌ NO           │  ✅ YES          │
│  Memory efficiency     │  Better          │  Slight overhead │
└────────────────────────┴──────────────────┴──────────────────┘
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.3 Benefits of Framework

<a id="223-benefits-of-framework"></a>

### 📌 8 Major Benefits

```
┌──────────────────────────────────────────────────────────────┐
│  BENEFITS OF COLLECTIONS FRAMEWORK                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. REDUCED PROGRAMMING EFFORT                                │
│     Ready-to-use data structures and algorithms              │
│     No need to implement from scratch                        │
│                                                              │
│  2. IMPROVED PROGRAM SPEED                                    │
│     Optimized implementations by experts                     │
│     Best algorithms chosen (e.g., TimSort for sorting)      │
│                                                              │
│  3. UNIFIED ARCHITECTURE                                      │
│     Consistent interfaces across all collections             │
│     Learn once, use everywhere                               │
│                                                              │
│  4. INTEROPERABILITY                                          │
│     Different collections work together seamlessly           │
│     Can convert between types easily                         │
│                                                              │
│  5. REDUCED EFFORT TO LEARN                                   │
│     Common methods (add, remove, size) across all           │
│                                                              │
│  6. REDUCED EFFORT TO DESIGN                                  │
│     Standard interfaces for custom implementations           │
│                                                              │
│  7. INCREASED SOFTWARE REUSE                                  │
│     Same collection classes usable everywhere                │
│                                                              │
│  8. RICH ALGORITHMS                                           │
│     Sorting, searching, shuffling, min/max, etc.             │
└──────────────────────────────────────────────────────────────┘
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.4 Collections Hierarchy Diagram ⭐

<a id="224-collections-hierarchy"></a>

### 📌 Complete Framework Structure

```
                    Iterable<E>
                        │
                        ▼
                   Collection<E>
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
      List<E>        Set<E>         Queue<E>
        │               │               │
        │               │               ▼
        │               │            Deque<E>
        │               │
        │               │
   ┌────┴────┐    ┌─────┴──────┐
   │         │    │            │
   ▼         ▼    ▼            ▼
ArrayList  LinkedList HashSet   TreeSet
Vector              LinkedHashSet
Stack

                  Map<K,V>  (Separate hierarchy!)
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
     HashMap    LinkedHashMap  TreeMap
     Hashtable  ConcurrentHashMap
```

### 📌 Detailed Hierarchy

```
INTERFACES:
    Iterable (Java 5)
      └── Collection
            ├── List
            │     ├── ArrayList
            │     ├── LinkedList
            │     ├── Vector
            │     └── Stack
            │
            ├── Set
            │     ├── HashSet
            │     ├── LinkedHashSet
            │     └── SortedSet (extends Set)
            │           └── NavigableSet (extends SortedSet)
            │                 └── TreeSet
            │
            └── Queue
                  ├── LinkedList (also implements List!)
                  ├── PriorityQueue
                  └── Deque (extends Queue)
                        ├── ArrayDeque
                        └── LinkedList

    Map (NOT extends Collection!)
      ├── HashMap
      ├── LinkedHashMap
      ├── Hashtable
      └── SortedMap (extends Map)
            └── NavigableMap (extends SortedMap)
                  └── TreeMap

    Concurrent (java.util.concurrent):
      ├── ConcurrentHashMap
      ├── CopyOnWriteArrayList
      ├── ArrayBlockingQueue
      └── LinkedBlockingQueue
```

### 📌 Key Points to Remember

```
IMPORTANT NOTES:

1. Map does NOT extend Collection interface
   → Map has different structure (key-value pairs)

2. LinkedList implements BOTH List and Deque
   → Can be used as List OR Queue OR Deque

3. Iterable is the ROOT of Collection framework
   → Since Java 5

4. All concrete classes implement multiple interfaces
   → ArrayList implements List, Collection, Iterable

5. Legacy classes (Vector, Stack, Hashtable) are synchronized
   → Modern alternatives: ArrayList, ArrayDeque, HashMap
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.5 Iterable Interface (Root)

<a id="225-iterable-interface"></a>

### 📌 The Foundation of All Collections

```
Iterable<E>:
→ ROOT of Collection hierarchy (since Java 5)
→ Represents anything that can be ITERATED
→ Enables enhanced for-each loop
→ Only ONE abstract method: iterator()

Since Java 8:
→ default forEach()
→ default spliterator()
```

### 📌 Iterable Methods

```java
public interface Iterable<T> {

    // Abstract method (must implement)
    Iterator<T> iterator();

    // Default methods (Java 8+)
    default void forEach(Consumer<? super T> action) { }
    default Spliterator<T> spliterator() { }
}
```

### 📌 Simple Example

```java
import java.util.*;

public class IterableDemo {
    public static void main(String[] args) {

        List<String> names = Arrays.asList("Rahul", "Priya", "Amit");

        // ═══ Method 1: Using iterator() directly ═══
        Iterator<String> it = names.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        // ═══ Method 2: Enhanced for-each (uses Iterable) ═══
        for (String name : names) {
            System.out.println(name);
        }

        // ═══ Method 3: forEach with lambda (Java 8+) ═══
        names.forEach(name -> System.out.println(name));

        // ═══ Method 4: Method reference (Java 8+) ═══
        names.forEach(System.out::println);
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.6 Collection Interface

<a id="226-collection-interface"></a>

### 📌 The Base of All Collection Classes

```
Collection<E>:
→ ROOT of collection framework (except Map)
→ Extends Iterable
→ Defines COMMON methods for all collections
→ Sub-interfaces: List, Set, Queue

NO direct implementation!
Always implemented through sub-interfaces (List, Set, Queue).
```

### 📌 Collection Interface Hierarchy

```java
public interface Collection<E> extends Iterable<E> {

    // Query operations
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();

    // Modification operations
    boolean add(E e);
    boolean remove(Object o);

    // Bulk operations
    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    void clear();

    // Equality
    boolean equals(Object o);
    int hashCode();

    // Java 8+
    default Stream<E> stream() { }
    default Stream<E> parallelStream() { }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.7 Collection Methods

<a id="227-collection-methods"></a>

### 📌 All Standard Methods

```java
import java.util.*;

public class CollectionMethodsDemo {
    public static void main(String[] args) {

        Collection<Integer> nums = new ArrayList<>();

        // ═══ ADDING ═══
        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.addAll(Arrays.asList(4, 5, 6));   // Add multiple
        System.out.println(nums);   // [1, 2, 3, 4, 5, 6]

        // ═══ SIZE / EMPTY ═══
        System.out.println(nums.size());        // 6
        System.out.println(nums.isEmpty());     // false

        // ═══ CONTAINS ═══
        System.out.println(nums.contains(3));   // true
        System.out.println(nums.contains(100)); // false
        System.out.println(nums.containsAll(Arrays.asList(1, 2))); // true

        // ═══ REMOVE ═══
        nums.remove(Integer.valueOf(3));        // Remove value 3
        System.out.println(nums);                // [1, 2, 4, 5, 6]

        nums.removeAll(Arrays.asList(1, 2));    // Remove multiple
        System.out.println(nums);                // [4, 5, 6]

        nums.retainAll(Arrays.asList(4, 5));    // Keep only these
        System.out.println(nums);                // [4, 5]

        // ═══ ITERATION ═══
        for (Integer num : nums) {
            System.out.println(num);
        }

        // Using iterator
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        // Java 8+ forEach
        nums.forEach(System.out::println);

        // ═══ CONVERT TO ARRAY ═══
        Object[] arr1 = nums.toArray();
        Integer[] arr2 = nums.toArray(new Integer[0]);

        // ═══ CLEAR ═══
        nums.clear();
        System.out.println(nums.isEmpty());   // true

        // ═══ STREAM (Java 8+) ═══
        List<Integer> newList = Arrays.asList(1, 2, 3, 4, 5);
        int sum = newList.stream()
                          .filter(n -> n % 2 == 0)
                          .mapToInt(Integer::intValue)
                          .sum();
        System.out.println(sum);   // 6 (2 + 4)
    }
}
```

### 📌 Method Summary Table

```
┌─────────────────────────┬───────────────────────────────────────┐
│  Method                 │  Purpose                              │
├─────────────────────────┼───────────────────────────────────────┤
│  add(E)                 │  Add element                          │
│  addAll(Collection)     │  Add all from another collection      │
│  remove(Object)         │  Remove specific element              │
│  removeAll(Collection)  │  Remove all matching                  │
│  retainAll(Collection)  │  Keep only matching                    │
│  clear()                │  Remove all elements                  │
│  contains(Object)       │  Check if element exists              │
│  containsAll(Collection)│  Check if all elements exist          │
│  isEmpty()              │  Check if collection is empty         │
│  size()                 │  Number of elements                   │
│  iterator()             │  Get iterator                         │
│  toArray()              │  Convert to Object[]                  │
│  toArray(T[])           │  Convert to typed array               │
│  equals(Object)         │  Compare content                      │
│  hashCode()             │  Hash code                            │
│  stream()               │  Get Stream (Java 8+)                 │
│  parallelStream()       │  Get parallel Stream (Java 8+)        │
│  forEach(Consumer)      │  Iterate with lambda (Java 8+)        │
└─────────────────────────┴───────────────────────────────────────┘
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.8 List Interface Overview

<a id="228-list-interface-overview"></a>

### 📌 List — Ordered, Indexed, Allows Duplicates

```
LIST INTERFACE:
✅ ORDERED collection (insertion order maintained)
✅ INDEXED (elements accessible by position 0, 1, 2...)
✅ ALLOWS DUPLICATES
✅ Supports positional operations (get, set at index)

Sub-interfaces & Implementations:
→ ArrayList — Dynamic array (fast random access)
→ LinkedList — Doubly linked list (fast insertion/deletion)
→ Vector — Legacy, synchronized ArrayList
→ Stack — Legacy, LIFO (extends Vector)
```

### 📌 List Additional Methods

```java
import java.util.*;

public class ListOverview {
    public static void main(String[] args) {

        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("A");   // Duplicate ALLOWED!

        // ═══ Positional access ═══
        String elem = list.get(1);           // "B"
        list.set(1, "X");                    // Replace at index
        list.add(1, "Z");                    // Insert at index

        // ═══ Search ═══
        int idx = list.indexOf("A");         // First occurrence
        int lastIdx = list.lastIndexOf("A"); // Last occurrence

        // ═══ Sublist ═══
        List<String> sub = list.subList(0, 2);   // [0, 2)

        // ═══ Iterator ═══
        ListIterator<String> it = list.listIterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

### 📌 List Implementations Comparison

```
┌────────────────┬──────────────┬──────────────┬──────────────┐
│  Feature       │  ArrayList   │  LinkedList  │  Vector      │
├────────────────┼──────────────┼──────────────┼──────────────┤
│  Data Struct   │  Dynamic Arr │  Doubly LL   │  Dynamic Arr │
│  Access (get)  │  O(1) fast   │  O(n) slow   │  O(1)        │
│  Insert/Delete │  O(n)        │  O(1) at ends│  O(n)        │
│  Memory        │  Less        │  More        │  Less        │
│  Thread-safe   │  ❌ No       │  ❌ No       │  ✅ Yes      │
│  Best for      │  Read-heavy  │  Insert/del  │  Legacy code │
└────────────────┴──────────────┴──────────────┴──────────────┘
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.9 Set Interface Overview

<a id="229-set-interface-overview"></a>

### 📌 Set — No Duplicates!

```
SET INTERFACE:
✅ NO DUPLICATES allowed
✅ Mathematical set concept
❌ NO indexed access (usually)
❌ Insertion order not guaranteed (except LinkedHashSet)

Implementations:
→ HashSet — Fast, uses hash table
→ LinkedHashSet — Maintains insertion order
→ TreeSet — Sorted set (uses Red-Black Tree)
```

### 📌 Set Example

```java
import java.util.*;

public class SetOverview {
    public static void main(String[] args) {

        // ═══ HashSet - fast, no order ═══
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Banana");
        hashSet.add("Apple");
        hashSet.add("Cherry");
        hashSet.add("Apple");   // ❌ Duplicate ignored
        System.out.println(hashSet);   // [Apple, Cherry, Banana] (any order)

        // ═══ LinkedHashSet - insertion order ═══
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.add("Banana");
        linkedSet.add("Apple");
        linkedSet.add("Cherry");
        System.out.println(linkedSet);   // [Banana, Apple, Cherry] (insertion order)

        // ═══ TreeSet - sorted order ═══
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("Banana");
        treeSet.add("Apple");
        treeSet.add("Cherry");
        System.out.println(treeSet);     // [Apple, Banana, Cherry] (alphabetical)

        // ═══ Common use: Remove duplicates ═══
        List<Integer> listWithDuplicates = Arrays.asList(1, 2, 3, 2, 1, 4);
        Set<Integer> unique = new HashSet<>(listWithDuplicates);
        System.out.println(unique);   // [1, 2, 3, 4]
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.10 Queue Interface Overview

<a id="2210-queue-interface-overview"></a>

### 📌 Queue — FIFO (First In, First Out)

```
QUEUE INTERFACE:
→ FIFO (First In, First Out) principle
→ Elements added at TAIL, removed from HEAD
→ Used for scheduling, buffering

Implementations:
→ LinkedList — Basic FIFO queue
→ PriorityQueue — Priority-based (not strict FIFO)
→ ArrayDeque — Double-ended queue

Sub-interface: Deque (Double-ended queue)
```

### 📌 Queue Methods

```java
import java.util.*;

public class QueueOverview {
    public static void main(String[] args) {

        Queue<String> queue = new LinkedList<>();

        // ═══ ADD to tail ═══
        queue.offer("A");   // ✅ Preferred (returns false if full)
        queue.offer("B");
        queue.offer("C");
        // queue.add("D");    // Alternative (throws exception if full)

        // ═══ VIEW head (without removing) ═══
        System.out.println(queue.peek());    // "A" (returns null if empty)
        // queue.element();  // Alternative (throws exception if empty)

        // ═══ REMOVE from head ═══
        System.out.println(queue.poll());    // "A" (returns null if empty)
        System.out.println(queue.poll());    // "B"
        // queue.remove();  // Alternative (throws exception if empty)

        System.out.println(queue);   // [C]
        System.out.println(queue.size());   // 1

        // ═══ PriorityQueue - priority order ═══
        Queue<Integer> pq = new PriorityQueue<>();
        pq.offer(3);
        pq.offer(1);
        pq.offer(2);
        System.out.println(pq.poll());   // 1 (smallest first)
        System.out.println(pq.poll());   // 2
        System.out.println(pq.poll());   // 3
    }
}
```

### 📌 Queue Methods Comparison

```
┌─────────────────┬──────────────────┬──────────────────┐
│  Operation      │  Throws Exception│  Returns Special │
├─────────────────┼──────────────────┼──────────────────┤
│  Insert (tail)  │  add(e)          │  offer(e)        │
│  Remove (head)  │  remove()        │  poll()          │
│  Examine (head) │  element()       │  peek()          │
└─────────────────┴──────────────────┴──────────────────┘

Prefer offer/poll/peek — they return null/false instead of throwing!
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.11 Deque Interface Overview

<a id="2211-deque-interface-overview"></a>

### 📌 Deque — Double-Ended Queue

```
DEQUE INTERFACE:
→ Double-Ended Queue
→ Can add/remove from BOTH ends
→ Can be used as Queue (FIFO) or Stack (LIFO)
→ Pronounced "deck"

Implementations:
→ ArrayDeque — Resizable array-based (RECOMMENDED)
→ LinkedList — Also implements Deque

BETTER THAN Stack (legacy class)!
```

### 📌 Deque Example

```java
import java.util.*;

public class DequeOverview {
    public static void main(String[] args) {

        Deque<Integer> deque = new ArrayDeque<>();

        // ═══ Add to FRONT (head) ═══
        deque.addFirst(1);
        deque.offerFirst(2);   // ✅ Preferred
        // Now: [2, 1]

        // ═══ Add to BACK (tail) ═══
        deque.addLast(3);
        deque.offerLast(4);
        // Now: [2, 1, 3, 4]

        System.out.println(deque);   // [2, 1, 3, 4]

        // ═══ Remove from FRONT ═══
        System.out.println(deque.pollFirst());   // 2

        // ═══ Remove from BACK ═══
        System.out.println(deque.pollLast());    // 4

        System.out.println(deque);   // [1, 3]

        // ═══ Use as STACK (LIFO) ═══
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);   // Add to front
        stack.push(2);
        stack.push(3);
        System.out.println(stack.pop());   // 3 (LIFO)
        System.out.println(stack.pop());   // 2

        // ═══ Use as QUEUE (FIFO) ═══
        Deque<Integer> queue = new ArrayDeque<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println(queue.poll());   // 1 (FIFO)
        System.out.println(queue.poll());   // 2
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.12 Map Interface Overview

<a id="2212-map-interface-overview"></a>

### 📌 Map — Key-Value Pairs

```
MAP INTERFACE:
→ Stores KEY-VALUE pairs (K, V)
→ Keys are UNIQUE
→ Values can be DUPLICATE
→ NO index access (uses keys)

IMPORTANT: Map does NOT extend Collection!
It has its own hierarchy.

Implementations:
→ HashMap — Fast, unordered
→ LinkedHashMap — Insertion order maintained
→ TreeMap — Sorted by keys
→ Hashtable — Legacy, synchronized
→ ConcurrentHashMap — Thread-safe modern version
```

### 📌 Map Methods

```java
import java.util.*;

public class MapOverview {
    public static void main(String[] args) {

        Map<String, Integer> ages = new HashMap<>();

        // ═══ PUT (add/update) ═══
        ages.put("Rahul", 25);
        ages.put("Priya", 30);
        ages.put("Amit", 28);
        ages.put("Rahul", 26);   // Updates existing (key must be unique)

        System.out.println(ages);   // {Rahul=26, Priya=30, Amit=28}

        // ═══ GET ═══
        System.out.println(ages.get("Priya"));         // 30
        System.out.println(ages.get("Unknown"));       // null
        System.out.println(ages.getOrDefault("X", 0)); // 0 (default)

        // ═══ CONTAINS ═══
        System.out.println(ages.containsKey("Rahul"));    // true
        System.out.println(ages.containsValue(30));        // true

        // ═══ REMOVE ═══
        ages.remove("Amit");
        System.out.println(ages);   // {Rahul=26, Priya=30}

        // ═══ SIZE / EMPTY ═══
        System.out.println(ages.size());     // 2
        System.out.println(ages.isEmpty());  // false

        // ═══ ITERATION ═══
        for (String key : ages.keySet()) {
            System.out.println(key);
        }

        for (Integer value : ages.values()) {
            System.out.println(value);
        }

        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }

        // ═══ Java 8+ forEach ═══
        ages.forEach((key, value) ->
            System.out.println(key + " → " + value)
        );

        // ═══ CLEAR ═══
        ages.clear();
    }
}
```

### 📌 Map vs Collection

```
KEY DIFFERENCES:
┌───────────────────┬─────────────────┬─────────────────┐
│  Feature          │  Collection     │  Map            │
├───────────────────┼─────────────────┼─────────────────┤
│  Storage          │  Single element │  Key-Value pair │
│  Root             │  Iterable       │  Map            │
│  Duplicates       │  Depends on impl│  Keys: NO       │
│                   │                 │  Values: YES    │
│  Access           │  Index/iterate  │  By key         │
│  Add method       │  add()          │  put(k, v)      │
│  Retrieve         │  get(index)     │  get(key)       │
└───────────────────┴─────────────────┴─────────────────┘
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.13 Collections Utility Class

<a id="2213-collections-utility-class"></a>

### 📌 Static Methods for Collections

```
Collections class (java.util.Collections):
→ Utility class with STATIC methods
→ Works on Collection objects
→ Provides algorithms: sort, search, shuffle, etc.
→ Cannot be instantiated (all methods static)

DON'T CONFUSE:
- Collection (interface)
- Collections (utility class)
```

### 📌 Common Methods

```java
import java.util.*;

public class CollectionsUtilityDemo {
    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>(Arrays.asList(5, 3, 1, 4, 2));

        // ═══ SORT ═══
        Collections.sort(list);
        System.out.println(list);   // [1, 2, 3, 4, 5]

        // ═══ REVERSE ═══
        Collections.reverse(list);
        System.out.println(list);   // [5, 4, 3, 2, 1]

        // ═══ SHUFFLE ═══
        Collections.shuffle(list);
        System.out.println(list);   // Random order

        // ═══ MIN / MAX ═══
        System.out.println(Collections.min(list));   // 1
        System.out.println(Collections.max(list));   // 5

        // ═══ BINARY SEARCH (list must be sorted!) ═══
        Collections.sort(list);
        int idx = Collections.binarySearch(list, 3);
        System.out.println(idx);   // 2

        // ═══ FREQUENCY ═══
        List<Integer> data = Arrays.asList(1, 2, 3, 2, 4, 2);
        int freq = Collections.frequency(data, 2);
        System.out.println(freq);   // 3

        // ═══ FILL ═══
        List<Integer> filled = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0));
        Collections.fill(filled, 99);
        System.out.println(filled);   // [99, 99, 99, 99, 99]

        // ═══ COPY ═══
        List<Integer> src = Arrays.asList(1, 2, 3);
        List<Integer> dst = new ArrayList<>(Arrays.asList(0, 0, 0));
        Collections.copy(dst, src);
        System.out.println(dst);   // [1, 2, 3]

        // ═══ UNMODIFIABLE ═══
        List<Integer> immutable = Collections.unmodifiableList(list);
        // immutable.add(100);   // ❌ UnsupportedOperationException

        // ═══ SYNCHRONIZED (thread-safe wrapper) ═══
        List<Integer> syncList = Collections.synchronizedList(new ArrayList<>());

        // ═══ EMPTY collections ═══
        List<Integer> emptyList = Collections.emptyList();
        Set<Integer> emptySet = Collections.emptySet();
        Map<String, Integer> emptyMap = Collections.emptyMap();

        // ═══ SINGLETON (single element) ═══
        List<Integer> single = Collections.singletonList(42);
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.14 Comparable Interface

<a id="2214-comparable-interface"></a>

### 📌 Natural Ordering

```
COMPARABLE INTERFACE:
→ Defines NATURAL ordering of objects
→ ONE method: compareTo(T o)
→ Class MUST IMPLEMENT this interface

Return values:
- Negative → this < other
- Zero     → this == other
- Positive → this > other

Used by:
→ Collections.sort()
→ Arrays.sort()
→ TreeSet, TreeMap (auto-sorted)
```

### 📌 Implementing Comparable

```java
import java.util.*;

class Student implements Comparable<Student> {

    private String name;
    private int marks;

    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    // ═══ Natural ordering — by marks ═══
    @Override
    public int compareTo(Student other) {
        return this.marks - other.marks;   // Ascending order
        // return other.marks - this.marks;   // Descending order
    }

    @Override
    public String toString() {
        return name + "(" + marks + ")";
    }

    public String getName() { return name; }
    public int getMarks() { return marks; }
}

public class ComparableDemo {
    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();
        students.add(new Student("Rahul", 85));
        students.add(new Student("Priya", 92));
        students.add(new Student("Amit", 78));

        Collections.sort(students);   // Uses compareTo (natural order)
        System.out.println(students);
        // [Amit(78), Rahul(85), Priya(92)]

        // Or use built-in Java 8+ method:
        students.sort(null);   // null = natural order
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.15 Comparator Interface

<a id="2215-comparator-interface"></a>

### 📌 Custom Ordering

```
COMPARATOR INTERFACE:
→ Defines CUSTOM ordering
→ SEPARATE class from the one being sorted
→ Method: compare(T o1, T o2)
→ Can have MULTIPLE comparators for same class

Used when:
→ Multiple sorting criteria needed
→ Sorting existing class (can't modify)
→ Third-party class sorting
```

### 📌 Implementing Comparator

```java
import java.util.*;

class Student {
    String name;
    int marks;

    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    @Override
    public String toString() {
        return name + "(" + marks + ")";
    }
}

// ═══ Comparator by name ═══
class SortByName implements Comparator<Student> {
    @Override
    public int compare(Student a, Student b) {
        return a.name.compareTo(b.name);   // Alphabetical
    }
}

// ═══ Comparator by marks (descending) ═══
class SortByMarksDesc implements Comparator<Student> {
    @Override
    public int compare(Student a, Student b) {
        return b.marks - a.marks;   // Higher marks first
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();
        students.add(new Student("Rahul", 85));
        students.add(new Student("Priya", 92));
        students.add(new Student("Amit", 78));

        // Sort by name (custom comparator)
        Collections.sort(students, new SortByName());
        System.out.println("By name: " + students);

        // Sort by marks descending
        Collections.sort(students, new SortByMarksDesc());
        System.out.println("By marks (desc): " + students);

        // ═══ Java 8+ Lambda comparators ═══
        students.sort((a, b) -> a.marks - b.marks);   // Ascending marks

        // Method reference
        students.sort(Comparator.comparingInt(s -> s.marks));

        // Reverse
        students.sort(Comparator.comparingInt((Student s) -> s.marks).reversed());

        // Multiple criteria
        students.sort(Comparator.comparing((Student s) -> s.name)
                                 .thenComparingInt(s -> s.marks));
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

## 22.16 Comparable vs Comparator ⭐

<a id="2216-comparable-vs-comparator"></a>

### 📌 Complete Comparison

```
┌────────────────────────┬──────────────────────┬──────────────────────┐
│  Feature               │  Comparable          │  Comparator          │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Package               │  java.lang           │  java.util           │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Method                │  compareTo(T o)      │  compare(T o1, T o2) │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Number of methods     │  1                   │  1 (functional)      │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Where implemented     │  In the class itself │  In separate class   │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Sort type             │  Natural ordering    │  Custom ordering     │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Number of criteria    │  ONE (built into     │  MULTIPLE possible   │
│                        │  the class)          │                      │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Modifies class?       │  YES (implements)    │  NO (external)       │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Sorting call          │  Collections.sort(list) │ Collections.sort │
│                        │                      │  (list, comparator)  │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Best for              │  Default sort order  │  Multiple sort ways  │
│                        │  Simple cases        │  Third-party classes │
└────────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 Complete Example Showing Both

```java
import java.util.*;

class Book implements Comparable<Book> {

    String title;
    double price;
    int rating;

    public Book(String title, double price, int rating) {
        this.title = title;
        this.price = price;
        this.rating = rating;
    }

    // ═══ Natural ordering: by title (Comparable) ═══
    @Override
    public int compareTo(Book other) {
        return this.title.compareTo(other.title);
    }

    @Override
    public String toString() {
        return String.format("%s ($%.2f, ⭐%d)", title, price, rating);
    }
}

// ═══ Custom sorting: by price (Comparator) ═══
class SortByPrice implements Comparator<Book> {
    @Override
    public int compare(Book a, Book b) {
        return Double.compare(a.price, b.price);
    }
}

// ═══ Custom sorting: by rating desc (Comparator) ═══
class SortByRatingDesc implements Comparator<Book> {
    @Override
    public int compare(Book a, Book b) {
        return b.rating - a.rating;
    }
}

public class ComparableComparatorDemo {
    public static void main(String[] args) {

        List<Book> books = new ArrayList<>();
        books.add(new Book("Java Basics", 25.99, 4));
        books.add(new Book("Python Guide", 19.99, 5));
        books.add(new Book("Data Structures", 39.99, 5));

        // ═══ Natural order (uses Comparable) ═══
        Collections.sort(books);
        System.out.println("By title: " + books);

        // ═══ Custom orders (uses Comparator) ═══
        Collections.sort(books, new SortByPrice());
        System.out.println("By price: " + books);

        Collections.sort(books, new SortByRatingDesc());
        System.out.println("By rating desc: " + books);

        // ═══ Java 8+ lambda comparators ═══
        books.sort((a, b) -> Double.compare(a.price, b.price));
        books.sort(Comparator.comparingDouble(b -> b.price));

        // ═══ Multi-level sorting ═══
        books.sort(Comparator.comparingInt((Book b) -> b.rating).reversed()
                    .thenComparingDouble(b -> b.price));
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

<a id="22-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Collections

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Collections library │ ✅ Rich    │ ✅ STL     │ ✅ Built-in│ ✅ Built-in│
│                      │ Framework  │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Unified hierarchy   │ ✅ YES     │ ⚠️ Multiple│ ⚠️ Multiple│ ⚠️ Multiple│
│  (Interface-based)   │            │ hierarchies│ types      │ types      │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Type safety         │ ✅ Generics│ ✅ Templates│ ❌ Dynamic│ ❌ Dynamic│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Comparable/         │ ✅ Both    │ operator<  │ __lt__     │ compareFn  │
│  Comparator          │            │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Iterator pattern    │ ✅ Built-in│ ✅ Iterators│ ✅ iter() │ ✅ Symbol. │
│                      │ (Iterable) │            │            │ iterator   │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Concurrent          │ ✅ Yes     │ ❌ No      │ ⚠️ Limited │ ❌ No     │
│  collections         │ (util.concurrent)│ (thread    │            │ (single-  │
│                      │            │ libs)      │            │ threaded)  │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Immutable views     │ ✅ Yes     │ ✅ const   │ ⚠️ Copy    │ Object.    │
│                      │ (unmodifi- │            │            │ freeze()   │
│                      │ ableList)  │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Stream API          │ ✅ Java 8+ │ ⚠️ C++20   │ ✅ Yes     │ ✅ Yes    │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. INTERFACE-BASED DESIGN:
   → Java's Collections have clear interface hierarchy
   → All Lists implement List, all Sets implement Set
   → Uniform API across implementations

2. COMPARABLE + COMPARATOR:
   → Java provides both patterns
   → Comparable for natural order (in class)
   → Comparator for custom order (external)

3. GENERICS FOR TYPE SAFETY:
   → List<Integer>, Map<String, User>
   → Compile-time type checking
   → No ClassCastException at runtime

4. CONCURRENT COLLECTIONS:
   → java.util.concurrent package
   → Thread-safe alternatives
   → ConcurrentHashMap, CopyOnWriteArrayList

5. IMMUTABLE VIEWS:
   → Collections.unmodifiableList()
   → List.of(), Map.of() (Java 9+)
   → True immutability support

6. STREAM API (Java 8+):
   → Functional-style operations
   → Filter, map, reduce
   → Parallel processing
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

<a id="22-interview-questions"></a>

## 💡 Chapter 22 — Interview Questions (15+)

---

### 🔵 Conceptual Questions

**Q1. What is Java Collections Framework?**

```
COLLECTIONS FRAMEWORK = Unified architecture for storing and
                        manipulating groups of objects.

Contains:
1. INTERFACES (List, Set, Map, Queue) — What to do
2. IMPLEMENTATIONS (ArrayList, HashMap) — How to do
3. ALGORITHMS (sort, search, etc.) — Utility operations

Location: java.util package
Introduced: Java 1.2 (1998)

BENEFITS:
✅ Ready-to-use data structures
✅ Optimized algorithms
✅ Consistent APIs
✅ Reduced programming effort
✅ Interoperability

Example:
List<Integer> list = new ArrayList<>();  // List interface
list.add(10);
Collections.sort(list);   // Utility class
```

---

**Q2. Why do we need Collections Framework? What are Array limitations?**

```
ARRAY LIMITATIONS:
1. FIXED SIZE — cannot grow/shrink
2. Only ONE data type
3. NO built-in operations
4. Poor middle insertion/deletion
5. No key-value support
6. Manual iteration
7. No thread-safe variants

COLLECTIONS SOLVE THESE:
✅ Dynamic sizing (ArrayList grows automatically)
✅ Rich API (add, remove, contains, sort)
✅ Multiple data structures (List, Set, Map, Queue)
✅ Key-value pairs (Map)
✅ Easy iteration (Iterator, forEach)
✅ Thread-safe versions available
✅ Interoperable with each other

Example: Adding items dynamically
int[] arr = new int[5];  // Fixed size
List<Integer> list = new ArrayList<>();  // Grows as needed
```

---

**Q3. Explain Collections Framework Hierarchy.**

```
Root: Iterable<E>
        │
        ▼
    Collection<E>
        │
        ├── List<E>
        │    ├── ArrayList
        │    ├── LinkedList
        │    └── Vector (→ Stack)
        │
        ├── Set<E>
        │    ├── HashSet
        │    │    └── LinkedHashSet
        │    └── SortedSet
        │         └── NavigableSet
        │              └── TreeSet
        │
        └── Queue<E>
             ├── PriorityQueue
             └── Deque<E>
                  ├── ArrayDeque
                  └── LinkedList (also implements List)

Map<K,V> (SEPARATE hierarchy, not in Collection!)
    ├── HashMap
    │    └── LinkedHashMap
    ├── Hashtable
    ├── ConcurrentHashMap
    └── SortedMap
         └── NavigableMap
              └── TreeMap

KEY POINTS:
✅ Iterable is ROOT
✅ Map is SEPARATE hierarchy
✅ LinkedList implements List AND Deque
✅ ArrayDeque preferred over Stack
```

---

**Q4. Difference between Collection and Collections?**

```
Collection (interface):
→ Top-level interface for collection framework
→ Represents a group of objects
→ Sub-interfaces: List, Set, Queue
→ Methods: add, remove, size, contains, etc.

Collections (class):
→ Utility class in java.util
→ Contains STATIC methods only
→ Cannot be instantiated
→ Provides algorithms: sort, reverse, shuffle
→ Also wrapper methods: synchronizedList, unmodifiableList

Example:
// Collection interface
Collection<Integer> col = new ArrayList<>();
col.add(10);

// Collections utility class
Collections.sort(col);         // Static method
Collections.reverse(col);       // Static method
List<Integer> sync = Collections.synchronizedList(new ArrayList<>());

DON'T CONFUSE THEM!
```

---

**Q5. Difference between List, Set, Queue, and Map?**

```
┌─────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│  Feature│  List        │  Set         │  Queue       │  Map         │
├─────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│  Order  │  Insertion   │  No order    │  FIFO        │  Depends     │
│         │  order       │  (except LHS)│              │              │
│  Dupes  │  ALLOWED     │  NOT allowed │  ALLOWED     │  Keys: NO    │
│         │              │              │              │  Values: YES │
│  Index  │  YES         │  NO          │  NO          │  By key      │
│  access │              │              │              │              │
│  Root   │  Collection  │  Collection  │  Collection  │  Map (sep)   │
│  Use    │  Ordered list│  Unique items│  Queue proc  │  Key-value   │
└─────────┴──────────────┴──────────────┴──────────────┴──────────────┘

List: [1, 2, 3, 2, 1]  (order + duplicates OK)
Set:  {1, 2, 3}         (no duplicates)
Queue: 1→2→3           (FIFO processing)
Map:  {a:1, b:2}        (key-value pairs)
```

---

**Q6. Difference between Comparable and Comparator?**

```
┌────────────────────┬──────────────────┬──────────────────┐
│  Feature           │  Comparable      │  Comparator      │
├────────────────────┼──────────────────┼──────────────────┤
│  Package           │  java.lang       │  java.util       │
│  Method            │  compareTo(T)    │  compare(T, T)   │
│  Sort order        │  Natural         │  Custom          │
│  Where implemented │  In the class    │  Separate class  │
│  Number of orders  │  ONE only        │  MULTIPLE        │
│  Class modification│  Required        │  NOT required    │
│  Sort call         │  Collections.sort│ Collections.sort │
│                    │  (list)          │  (list, comp)    │
└────────────────────┴──────────────────┴──────────────────┘

// Comparable (in class)
class Student implements Comparable<Student> {
    public int compareTo(Student other) {
        return this.marks - other.marks;
    }
}

// Comparator (separate)
class SortByName implements Comparator<Student> {
    public int compare(Student a, Student b) {
        return a.name.compareTo(b.name);
    }
}

USE:
Comparable — When there's ONE natural way to sort
Comparator — When you need MULTIPLE ways to sort
```

---

### 🟡 Scenario-Based Questions

**Q7. When would you use ArrayList vs LinkedList?**

```
USE ArrayList when:
✅ Frequent RANDOM ACCESS (get by index)
✅ Read-heavy operations
✅ Simple list operations
✅ Better memory efficiency

USE LinkedList when:
✅ Frequent INSERTIONS/DELETIONS in middle
✅ Need Deque functionality (Queue + Stack)
✅ Don't need random access

Comparison:
Operation          ArrayList    LinkedList
Access (get)      O(1) fast    O(n) slow
Insert at end     O(1)         O(1)
Insert at middle  O(n)         O(1) (if have ref)
Remove            O(n)         O(1) at ends
Memory            Less         More (extra pointers)

Example:
List<Integer> readHeavy = new ArrayList<>();     // Better for reads
List<Integer> writeHeavy = new LinkedList<>();   // Better for writes
```

---

### 🔴 Output-Based Questions

**Q8. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("A");
        list.add("C");
        System.out.println(list);
        System.out.println(list.size());
    }
}
```

```
OUTPUT:
[A, B, A, C]
4

REASON:
- List ALLOWS duplicates
- Insertion order maintained
- size() returns 4 (includes duplicates)
```

---

**Q9. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("A");
        set.add("B");
        set.add("A");
        set.add("C");
        System.out.println(set);
        System.out.println(set.size());
    }
}
```

```
OUTPUT:
[A, B, C]   (order may vary in HashSet)
3

REASON:
- Set does NOT allow duplicates
- "A" added only ONCE (second attempt ignored)
- size() returns 3
- HashSet doesn't guarantee order
```

---

**Q10. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("A", 3);
        System.out.println(map);
        System.out.println(map.size());
    }
}
```

```
OUTPUT:
{A=3, B=2}
2

REASON:
- Map keys are UNIQUE
- Second put with key "A" UPDATES the value (1 → 3)
- No new entry created
- size() returns 2 (unique keys)
```

---

**Q11. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(5, 3, 1, 4, 2));
        Collections.sort(list);
        System.out.println(list);
        Collections.reverse(list);
        System.out.println(list);
        System.out.println(Collections.max(list));
        System.out.println(Collections.min(list));
    }
}
```

```
OUTPUT:
[1, 2, 3, 4, 5]
[5, 4, 3, 2, 1]
5
1

REASON:
- Collections.sort() → ascending order
- Collections.reverse() → reverses list
- Collections.max() → returns 5
- Collections.min() → returns 1
```

---

**Q12. Can we use custom class in TreeSet? What happens?**

```java
import java.util.*;

class Employee {
    String name;
    int salary;
    Employee(String n, int s) { name = n; salary = s; }
}

public class Test {
    public static void main(String[] args) {
        TreeSet<Employee> set = new TreeSet<>();
        set.add(new Employee("Rahul", 50000));   // ClassCastException!
    }
}
```

```
OUTPUT: ClassCastException at runtime!

Error: "class Employee cannot be cast to class java.lang.Comparable"

REASON: TreeSet needs to SORT elements automatically.
- Employee must implement Comparable OR
- TreeSet must be created with a Comparator

FIX 1: Implement Comparable
class Employee implements Comparable<Employee> {
    @Override
    public int compareTo(Employee other) {
        return this.salary - other.salary;
    }
}

FIX 2: Provide Comparator
TreeSet<Employee> set = new TreeSet<>(
    (a, b) -> a.salary - b.salary
);
```

---

**Q13. What is the difference between add() and offer() in Queue?**

```
add() vs offer() in Queue:

add(E):
→ Adds element to queue
→ If queue is FULL → throws IllegalStateException

offer(E):
→ Adds element to queue
→ If queue is FULL → returns false (no exception)

Example:
Queue<Integer> queue = new LinkedList<>();
queue.add(1);      // Works
queue.offer(2);    // Works, returns true

// For bounded queue:
ArrayBlockingQueue<Integer> bq = new ArrayBlockingQueue<>(2);
bq.add(1);
bq.add(2);
bq.add(3);        // IllegalStateException!
bq.offer(3);      // Returns false (no exception)

RECOMMENDATION: Use offer() for safer code!
Same pattern for remove()/poll() and element()/peek()
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

<a id="22-practice-problems"></a>

## 🧪 Chapter 22 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain complete Collections Framework hierarchy with diagram.
   Why is Map not part of Collection interface?

2. Compare List, Set, Queue, and Map. When would you use each?
   Give real-world examples.

3. Explain Comparable vs Comparator in detail with code examples.
   How would you sort a list by multiple criteria?

4. What is the difference between Collection and Collections?
   List 5 useful methods from Collections utility class.

5. Explain Iterable interface and its role in Collections.
   How does enhanced for-loop work with it?
```

### 💻 5 Coding Questions

```java
// Q1: Employee sorting
// Create Employee class with name, salary, department
// Sort by:
// - salary (Comparable)
// - name (Comparator)
// - department then salary (multi-criteria)

public class EmployeeSort {
    // TODO: Implement Employee class and sortings
}
```

```java
// Q2: Deduplicate list
// Given list with duplicates, remove duplicates but maintain order
// Use appropriate Collection

import java.util.*;
public class Deduplicate {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "A", "C", "B", "D");
        // TODO: Remove duplicates maintaining order
        // Expected: [A, B, C, D]
    }
}
```

```java
// Q3: Word frequency counter
// Given a sentence, count frequency of each word
// Print in decreasing order of frequency

public class WordFrequency {
    public static void main(String[] args) {
        String sentence = "the quick brown fox jumps over the lazy dog the fox";
        // TODO: Count word frequencies and print sorted
    }
}
```

```java
// Q4: Implement a simple task scheduler
// Use PriorityQueue with tasks having priority
// Higher priority tasks come out first

import java.util.*;
class Task implements Comparable<Task> {
    String name;
    int priority;
    // TODO: Complete
}

public class TaskScheduler {
    // TODO: Add tasks, process them in priority order
}
```

```java
// Q5: Convert between collections
// Given a Map<String, Integer>
// Convert to List<String> of keys sorted by values

import java.util.*;
public class MapToSortedList {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Rahul", 85);
        scores.put("Priya", 92);
        scores.put("Amit", 78);

        // TODO: Get list of names sorted by score (desc)
        // Expected: [Priya, Rahul, Amit]
    }
}
```

<a href="#chapter-index-table-22">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 22 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 22.1  What is Collections Framework                     │
│  ✅ 22.2  Need for Collections — Array limitations          │
│  ✅ 22.3  Benefits — 8 major benefits                       │
│  ✅ 22.4  Hierarchy Diagram — Complete structure            │
│  ✅ 22.5  Iterable Interface — Root                         │
│  ✅ 22.6  Collection Interface                              │
│  ✅ 22.7  Collection Methods — All methods                  │
│  ✅ 22.8  List Interface — Overview                         │
│  ✅ 22.9  Set Interface — Overview                          │
│  ✅ 22.10 Queue Interface — Overview                        │
│  ✅ 22.11 Deque Interface — Overview                        │
│  ✅ 22.12 Map Interface — Overview                          │
│  ✅ 22.13 Collections Utility Class                         │
│  ✅ 22.14 Comparable Interface — Natural ordering           │
│  ✅ 22.15 Comparator Interface — Custom ordering            │
│  ✅ 22.16 Comparable vs Comparator — Comparison             │
│  ✅ 🔥    Java vs Others — Unique features                  │
│  ✅ 13+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: List Interface (Chapter 23)                       │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
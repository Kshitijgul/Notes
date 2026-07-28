

<a id="24-set-interface"></a>

# 📘 Chapter 24: Set Interface (HashSet, LinkedHashSet, TreeSet)

> **Part E: Collection Framework**
> `Core` | `No Duplicates Collection` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-24"></a>

## 📚 Chapter 24 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 24.1 | [Set Interface Features](#241-set-interface-features) | No Duplicates, Unordered |
| 24.2 | [Set Methods](#242-set-methods) | All Standard Methods |
| 24.3 | [HashSet Internal Working](#243-hashset-internal-working) | Backed by HashMap |
| 24.4 | [HashSet Hashing Mechanism](#244-hashset-hashing-mechanism) | How Uniqueness Works |
| 24.5 | [HashSet Capacity & Load Factor](#245-hashset-capacity-load-factor) | 16 Initial, 0.75 Load |
| 24.6 | [HashSet Rehashing](#246-hashset-rehashing) | Growing the Table |
| 24.7 | [HashSet Null Handling](#247-hashset-null-handling) | One Null Allowed |
| 24.8 | [LinkedHashSet](#248-linkedhashset) | Insertion Order Maintained |
| 24.9 | [TreeSet](#249-treeset) | Red-Black Tree, Sorted |
| 24.10 | [TreeSet NavigableSet Methods](#2410-treeset-navigable-methods) | Sorted Set Operations |
| 24.11 | [EnumSet](#2411-enumset) | Set of Enum Values |
| 24.12 | [Three Sets Comparison](#2412-three-sets-comparison) | HashSet vs LinkedHashSet vs TreeSet |
| 24.13 | [Hashing in Java](#2413-hashing-in-java) | hashCode + equals |
| 24.14 | [equals & hashCode Contract](#2414-equals-hashcode-contract) | Critical Contract |
| 24.15 | [Treeification (Java 8+)](#2415-treeification-java-8) | Chaining → Tree |
| 🔥 | [Java vs Other Languages](#24-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#24-interview-questions) | 15+ Questions |
| 🧪 | [Practice Problems](#24-practice-problems) | 5 Coding + 5 Theory |

---

## 24.1 Set Interface Features

<a id="241-set-interface-features"></a>

### 📌 What is Set?

```
SET INTERFACE:
✅ Collection that CANNOT contain DUPLICATE elements
✅ Mathematical set concept
✅ Extends Collection interface

Key Characteristics:
→ NO duplicate elements
→ At most ONE null (HashSet, LinkedHashSet)
→ TreeSet doesn't allow null
→ No indexed access (unlike List)
→ Uses equals() to check duplicates

Implementations:
1. HashSet      — Fast, unordered (uses hash table)
2. LinkedHashSet — Insertion order maintained
3. TreeSet       — Sorted order (Red-Black tree)
4. EnumSet      — Specialized set for enum types

Common Use Cases:
✅ Remove duplicates
✅ Check membership (fast contains())
✅ Set operations (union, intersection, difference)
✅ Unique element tracking
```

### 📌 Basic Example

```java
import java.util.*;

public class SetFeatures {
    public static void main(String[] args) {

        // ═══ Set does NOT allow duplicates ═══
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple");     // Duplicate - IGNORED
        set.add("Cherry");
        set.add("Banana");    // Duplicate - IGNORED

        System.out.println(set);        // [Apple, Banana, Cherry]
        System.out.println(set.size()); // 3 (not 5)

        // ═══ Fast membership check ═══
        System.out.println(set.contains("Apple"));   // true (O(1))
        System.out.println(set.contains("Mango"));    // false

        // ═══ Remove element ═══
        set.remove("Banana");
        System.out.println(set);   // [Apple, Cherry]

        // ═══ No indexed access ═══
        // set.get(0);   // ❌ No get() method in Set!

        // ═══ Common use: Remove duplicates from List ═══
        List<Integer> listWithDupes = Arrays.asList(1, 2, 3, 2, 1, 4, 5, 4);
        Set<Integer> uniqueSet = new HashSet<>(listWithDupes);
        System.out.println(uniqueSet);   // [1, 2, 3, 4, 5]
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.2 Set Methods

<a id="242-set-methods"></a>

### 📌 All Important Methods

```java
import java.util.*;

public class SetMethodsDemo {
    public static void main(String[] args) {

        Set<Integer> set = new HashSet<>();

        // ═══ ADDING ═══
        set.add(10);                           // Returns true (added)
        set.add(20);
        boolean added = set.add(10);           // Returns false (duplicate)
        set.addAll(Arrays.asList(30, 40, 50)); // Add multiple
        System.out.println(set);   // [50, 20, 40, 10, 30] (order may vary)

        // ═══ ACCESSING ═══
        int size = set.size();                 // 5
        boolean empty = set.isEmpty();         // false

        // ═══ CHECKING ═══
        boolean has = set.contains(20);        // true
        boolean hasAll = set.containsAll(Arrays.asList(10, 20));   // true

        // ═══ REMOVING ═══
        set.remove(20);                        // Remove specific element
        set.removeAll(Arrays.asList(30, 40));  // Remove multiple
        set.retainAll(Arrays.asList(10, 50));  // Keep only these
        set.removeIf(n -> n > 15);             // Remove based on condition
        System.out.println(set);

        // Add more for testing
        set.addAll(Arrays.asList(1, 2, 3, 4, 5));

        // ═══ ITERATION ═══
        // Method 1: for-each
        for (Integer num : set) {
            System.out.println(num);
        }

        // Method 2: Iterator
        Iterator<Integer> it = set.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }

        // Method 3: forEach (Java 8+)
        set.forEach(System.out::println);

        // ═══ CONVERT ═══
        Object[] arr = set.toArray();
        Integer[] intArr = set.toArray(new Integer[0]);
        List<Integer> asList = new ArrayList<>(set);

        // ═══ SET OPERATIONS ═══
        Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(3, 4, 5, 6, 7));

        // Union
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Union: " + union);   // [1,2,3,4,5,6,7]

        // Intersection
        Set<Integer> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        System.out.println("Intersection: " + intersection);   // [3,4,5]

        // Difference
        Set<Integer> difference = new HashSet<>(set1);
        difference.removeAll(set2);
        System.out.println("Difference: " + difference);   // [1,2]

        // ═══ CLEAR ═══
        set.clear();
        System.out.println(set.isEmpty());   // true

        // ═══ Java 9+ ═══
        Set<Integer> immutable = Set.of(1, 2, 3, 4, 5);
        System.out.println(immutable);
    }
}
```

### 📌 Set Methods Summary

```
┌─────────────────────────┬────────────────────────────────────┐
│  Method                 │  Purpose                           │
├─────────────────────────┼────────────────────────────────────┤
│  add(E)                 │  Add element (returns false if dup)│
│  addAll(Collection)     │  Add all elements                  │
│  remove(Object)         │  Remove specific element           │
│  removeAll(Collection)  │  Remove multiple                   │
│  retainAll(Collection)  │  Keep only these                   │
│  removeIf(Predicate)    │  Remove based on condition        │
│  clear()                │  Remove all                        │
│  contains(Object)       │  Check existence                   │
│  containsAll(Collection)│  Check multiple                    │
│  size()                 │  Number of elements                │
│  isEmpty()              │  Check if empty                    │
│  iterator()             │  Get iterator                      │
│  toArray()              │  Convert to array                  │
│  stream()               │  Get Stream (Java 8+)              │
│  forEach(Consumer)      │  Iterate (Java 8+)                 │
└─────────────────────────┴────────────────────────────────────┘
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.3 HashSet — Internal Working ⭐⭐⭐

<a id="243-hashset-internal-working"></a>

### 📌 HashSet is Backed by HashMap!

```
CRITICAL INSIGHT:
HashSet INTERNALLY uses a HashMap!

HashSet<E> internally has:
private transient HashMap<E, Object> map;

Where:
→ KEY = the element you add
→ VALUE = a dummy Object (PRESENT constant)

When you do: set.add("Apple")
It actually does: map.put("Apple", PRESENT)

WHY?
→ HashMap already provides O(1) add/remove/contains
→ HashMap ensures unique keys (perfect for Set behavior)
→ Reuse existing implementation

INTERNAL FIELDS:
private transient HashMap<E, Object> map;
private static final Object PRESENT = new Object();

Since it uses HashMap:
→ All HashMap features apply
→ Same performance characteristics
→ Same hashing mechanism
```

### 📌 HashSet Source Code (Simplified)

```java
public class HashSet<E> extends AbstractSet<E>
                        implements Set<E>, Cloneable, Serializable {

    // Internal HashMap
    private transient HashMap<E, Object> map;

    // Dummy value for all keys
    private static final Object PRESENT = new Object();

    // Default constructor
    public HashSet() {
        map = new HashMap<>();
    }

    public HashSet(int initialCapacity) {
        map = new HashMap<>(initialCapacity);
    }

    public HashSet(int initialCapacity, float loadFactor) {
        map = new HashMap<>(initialCapacity, loadFactor);
    }

    // ═══ ADD method ═══
    public boolean add(E e) {
        // Delegate to HashMap.put()
        // Returns null if key was NEW (added), else old value
        return map.put(e, PRESENT) == null;
    }

    // ═══ REMOVE method ═══
    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }

    // ═══ CONTAINS method ═══
    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    // ═══ SIZE method ═══
    public int size() {
        return map.size();
    }

    // ═══ ITERATOR ═══
    public Iterator<E> iterator() {
        return map.keySet().iterator();
    }
}
```

### 📌 Visualization

```
When you do:
Set<String> set = new HashSet<>();
set.add("A");
set.add("B");
set.add("C");

INTERNALLY:
map = HashMap<String, Object>

After add operations, map looks like:
┌────────────┬────────────┐
│  Key       │  Value     │
├────────────┼────────────┤
│  "A"       │  PRESENT   │
│  "B"       │  PRESENT   │
│  "C"       │  PRESENT   │
└────────────┴────────────┘

Set behavior:
set.contains("A") → map.containsKey("A") → true
set.remove("B") → map.remove("B") returns PRESENT (was there)
set.size() → map.size() → 3
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.4 HashSet — Hashing Mechanism ⭐

<a id="244-hashset-hashing-mechanism"></a>

### 📌 How Uniqueness is Ensured

```
When you add element to HashSet:

Step 1: Calculate HASHCODE
element.hashCode() → integer hash

Step 2: Determine BUCKET INDEX
index = (n - 1) & hash    (where n = capacity)

Step 3: Check bucket for duplicates
- If bucket empty → Add new entry
- If bucket has entries → Compare using equals()
  - If any equals() returns true → DUPLICATE, don't add
  - If none matches → Add to bucket (chaining)

FOR CONTAINS():
Step 1: Calculate hashCode of search element
Step 2: Find the bucket
Step 3: Compare elements in bucket using equals()
Step 4: Return true if found

WHY BOTH hashCode() AND equals()?
→ hashCode() → Locate the BUCKET quickly (O(1))
→ equals() → Confirm actual MATCH within bucket
```

### 📌 Hashing Process Visualization

```
Adding "Apple" to HashSet:

1. hashCode of "Apple" = 63476538
2. Bucket index = 63476538 & 15 = 10 (if capacity = 16)
3. Go to bucket[10]

If bucket[10] is empty:
bucket[10] → ["Apple"]

If bucket[10] has ["Orange"]:
Compare Apple.equals(Orange) → false
Add Apple to same bucket (collision handling):
bucket[10] → ["Orange"] → ["Apple"] (linked)

Adding "Apple" AGAIN:
1. Same hashCode → bucket[10]
2. bucket[10] has ["Orange", "Apple"]
3. Compare new "Apple".equals("Orange") → false
4. Compare new "Apple".equals("Apple") → TRUE!
5. DUPLICATE! Don't add.
```

### 📌 Example with Custom Class

```java
import java.util.*;

class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Person)) return false;
        Person p = (Person) obj;
        return name.equals(p.name) && age == p.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class HashSetCustom {
    public static void main(String[] args) {

        Set<Person> set = new HashSet<>();

        Person p1 = new Person("Rahul", 25);
        Person p2 = new Person("Priya", 30);
        Person p3 = new Person("Rahul", 25);   // Same as p1

        set.add(p1);
        set.add(p2);
        set.add(p3);   // Duplicate! Not added

        System.out.println(set.size());   // 2 (not 3)
        System.out.println(set);          // [Rahul(25), Priya(30)]
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.5 HashSet — Initial Capacity & Load Factor ⭐

<a id="245-hashset-capacity-load-factor"></a>

### 📌 The Critical Numbers

```
INITIAL CAPACITY: 16
(Number of buckets in the internal hash table)

LOAD FACTOR: 0.75 (75%)
(Threshold ratio for resizing)

THRESHOLD: capacity × load factor
= 16 × 0.75 = 12

When size REACHES threshold, HashSet REHASHES (resizes)!

WHY 16?
→ Power of 2 (efficient with bit operations)
→ Small enough for memory efficiency
→ Large enough to avoid initial resizing

WHY 0.75?
→ Balance between space and time efficiency
→ Higher (0.9): saves memory but more collisions
→ Lower (0.5): fewer collisions but wastes memory
→ 0.75 is optimal trade-off
```

### 📌 Constructors and Capacity

```java
import java.util.*;

public class HashSetConstructors {
    public static void main(String[] args) {

        // ═══ 1. Default (capacity 16, load 0.75) ═══
        HashSet<Integer> set1 = new HashSet<>();

        // ═══ 2. Custom initial capacity ═══
        HashSet<Integer> set2 = new HashSet<>(32);
        // Capacity 32, load 0.75
        // Threshold = 32 * 0.75 = 24

        // ═══ 3. Custom capacity and load factor ═══
        HashSet<Integer> set3 = new HashSet<>(16, 0.5f);
        // Capacity 16, load 0.5
        // Threshold = 16 * 0.5 = 8
        // Rehashes earlier (fewer collisions but more memory)

        HashSet<Integer> set4 = new HashSet<>(16, 0.9f);
        // Capacity 16, load 0.9
        // Threshold = 16 * 0.9 = 14
        // Rehashes later (more collisions but less memory)

        // ═══ 4. From another collection ═══
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        HashSet<Integer> set5 = new HashSet<>(list);
        // Capacity = max(16, list.size() * 4/3)

        // ═══ OPTIMIZATION: Specify capacity if you know size ═══
        // If you'll add 1000 elements:
        int expectedSize = 1000;
        int capacity = (int) (expectedSize / 0.75f) + 1;  // ~1334
        HashSet<Integer> optimized = new HashSet<>(capacity);
        // No resizing needed!
    }
}
```

### 📌 Load Factor Impact

```
LOAD FACTOR = elements / capacity

Load Factor: 0.5 (rehashes when 50% full)
✅ Fewer collisions, faster operations
❌ More memory usage

Load Factor: 0.75 (default, rehashes when 75% full)
✅ Good balance
✅ Java's recommended value

Load Factor: 0.9 (rehashes when 90% full)
✅ Less memory
❌ More collisions, slower operations

RULE OF THUMB:
→ Use default (0.75) in most cases
→ Reduce for fewer collisions (memory-intensive)
→ Increase for less memory (performance-intensive)
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.6 HashSet — Rehashing ⭐

<a id="246-hashset-rehashing"></a>

### 📌 Growing the Hash Table

```
REHASHING:
When size >= threshold, HashSet doubles capacity!

STEPS:
1. Create new array with DOUBLE capacity (16 → 32)
2. Recalculate hash for all existing elements
3. Rehash and place in new buckets
4. Update threshold

EXAMPLE:
Initial: capacity=16, load=0.75, threshold=12
Add 13th element → REHASH!
After rehash: capacity=32, threshold=24

Progression:
16 → 32 → 64 → 128 → 256 → 512 ...
Always DOUBLES (unlike ArrayList's 1.5x)

COST:
Rehashing is O(n) — expensive!
That's why capacity should be pre-allocated for large sets.
```

### 📌 Rehashing Example

```java
import java.util.*;

public class RehashingDemo {

    public static void main(String[] args) {

        HashSet<Integer> set = new HashSet<>();
        // Initial capacity: 16, threshold: 12

        // Add elements
        for (int i = 1; i <= 20; i++) {
            set.add(i);
            System.out.println("Added " + i + ", size=" + set.size());

            // Rehashing occurs between adding 12 and 13
            // Capacity: 16 → 32 (new threshold: 24)
        }

        // ═══ Optimization ═══
        // If you know you'll add many elements:
        HashSet<Integer> optimized = new HashSet<>(50);
        // Capacity 50, no rehashing until 37 elements

        for (int i = 1; i <= 30; i++) {
            optimized.add(i);   // No rehashing!
        }
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.7 HashSet — Null Handling

<a id="247-hashset-null-handling"></a>

### 📌 HashSet Allows ONE null

```java
import java.util.*;

public class HashSetNull {
    public static void main(String[] args) {

        // ═══ HashSet allows ONE null ═══
        Set<String> set = new HashSet<>();
        set.add("A");
        set.add(null);           // ✅ Allowed
        set.add("B");
        set.add(null);           // ⚠️ Duplicate null - IGNORED

        System.out.println(set);          // [null, A, B]
        System.out.println(set.size());   // 3 (only one null)
        System.out.println(set.contains(null));  // true

        // ═══ LinkedHashSet - also allows one null ═══
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.add(null);
        linkedSet.add(null);   // Ignored
        System.out.println(linkedSet.size());   // 1

        // ═══ TreeSet - NO NULL ALLOWED! ═══
        Set<String> treeSet = new TreeSet<>();
        try {
            treeSet.add(null);   // ❌ NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("TreeSet doesn't allow null!");
        }

        // WHY TreeSet doesn't allow null?
        // TreeSet uses Comparable.compareTo()
        // null.compareTo() → NullPointerException
    }
}
```

### 📌 Null Handling Summary

```
┌─────────────────┬──────────────────────────────┐
│  Set Type       │  Null Handling               │
├─────────────────┼──────────────────────────────┤
│  HashSet        │  ✅ ONE null allowed         │
│  LinkedHashSet  │  ✅ ONE null allowed         │
│  TreeSet        │  ❌ NO null (throws NPE)     │
│  EnumSet        │  ❌ NO null (throws NPE)     │
└─────────────────┴──────────────────────────────┘
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.8 LinkedHashSet — Insertion Order

<a id="248-linkedhashset"></a>

### 📌 HashSet + LinkedList

```
LinkedHashSet:
✅ Extends HashSet
✅ Maintains INSERTION ORDER
✅ Uses HashMap + Doubly-Linked List internally
✅ Slightly slower than HashSet (extra pointers)
✅ Same operations as HashSet

Internal: LinkedHashMap<E, Object>
```

### 📌 Example

```java
import java.util.*;

public class LinkedHashSetDemo {
    public static void main(String[] args) {

        // ═══ HashSet: NO order ═══
        Set<String> hashSet = new HashSet<>();
        hashSet.add("C");
        hashSet.add("A");
        hashSet.add("B");
        hashSet.add("D");
        System.out.println("HashSet: " + hashSet);   // [A, B, C, D] (random)

        // ═══ LinkedHashSet: INSERTION order ═══
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("C");
        linkedHashSet.add("A");
        linkedHashSet.add("B");
        linkedHashSet.add("D");
        System.out.println("LinkedHashSet: " + linkedHashSet);   // [C, A, B, D]

        // ═══ TreeSet: SORTED order ═══
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("C");
        treeSet.add("A");
        treeSet.add("B");
        treeSet.add("D");
        System.out.println("TreeSet: " + treeSet);   // [A, B, C, D] (sorted)

        // ═══ LinkedHashSet use case ═══
        // Remove duplicates but MAINTAIN insertion order
        List<Integer> listWithDupes = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 3);
        Set<Integer> unique = new LinkedHashSet<>(listWithDupes);
        System.out.println(unique);   // [3, 1, 4, 5, 9, 2, 6]
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.9 TreeSet — Red-Black Tree

<a id="249-treeset"></a>

### 📌 Sorted Set Implementation

```
TreeSet:
✅ Implements NavigableSet (extends SortedSet)
✅ Uses RED-BLACK TREE internally (self-balancing BST)
✅ SORTED order (natural or custom Comparator)
✅ NO null values allowed
✅ All operations: O(log n)
✅ Slower than HashSet but SORTED
✅ Great for range queries

Internal: TreeMap<E, Object>
```

### 📌 Basic TreeSet Example

```java
import java.util.*;

public class TreeSetDemo {
    public static void main(String[] args) {

        // ═══ Natural ordering ═══
        TreeSet<Integer> set = new TreeSet<>();
        set.add(50);
        set.add(20);
        set.add(80);
        set.add(10);
        set.add(30);

        System.out.println(set);   // [10, 20, 30, 50, 80] (sorted!)

        // ═══ String sorting ═══
        TreeSet<String> names = new TreeSet<>();
        names.add("Rahul");
        names.add("Amit");
        names.add("Priya");
        names.add("Neha");
        System.out.println(names);   // [Amit, Neha, Priya, Rahul]

        // ═══ Custom Comparator ═══
        TreeSet<Integer> desc = new TreeSet<>(Comparator.reverseOrder());
        desc.add(50);
        desc.add(20);
        desc.add(80);
        System.out.println(desc);   // [80, 50, 20]

        // ═══ First and Last ═══
        System.out.println(set.first());   // 10 (smallest)
        System.out.println(set.last());    // 80 (largest)
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.10 TreeSet — NavigableSet Methods

<a id="2410-treeset-navigable-methods"></a>

### 📌 Powerful Range Query Methods

```java
import java.util.*;

public class NavigableSetDemo {
    public static void main(String[] args) {

        TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50, 60, 70, 80, 90));
        System.out.println(set);   // [10, 20, 30, 40, 50, 60, 70, 80, 90]

        // ═══ Boundary Access ═══
        System.out.println(set.first());        // 10 (smallest)
        System.out.println(set.last());         // 90 (largest)

        // ═══ Relative Access ═══
        System.out.println(set.floor(35));      // 30 (largest <= 35)
        System.out.println(set.ceiling(35));    // 40 (smallest >= 35)
        System.out.println(set.lower(30));      // 20 (strictly < 30)
        System.out.println(set.higher(30));     // 40 (strictly > 30)

        // ═══ Polling (get and remove) ═══
        System.out.println(set.pollFirst());    // 10 (remove first)
        System.out.println(set.pollLast());     // 90 (remove last)
        System.out.println(set);                // [20, 30, 40, 50, 60, 70, 80]

        // ═══ Range Views ═══
        // headSet: elements less than 50
        SortedSet<Integer> head = set.headSet(50);
        System.out.println(head);   // [20, 30, 40]

        // tailSet: elements greater than or equal to 50
        SortedSet<Integer> tail = set.tailSet(50);
        System.out.println(tail);   // [50, 60, 70, 80]

        // subSet: elements from 30 (inclusive) to 70 (exclusive)
        SortedSet<Integer> sub = set.subSet(30, 70);
        System.out.println(sub);   // [30, 40, 50, 60]

        // ═══ Descending ═══
        // Iterate in reverse order
        NavigableSet<Integer> reverse = set.descendingSet();
        System.out.println(reverse);   // [80, 70, 60, 50, 40, 30, 20]

        // Iterator in reverse
        Iterator<Integer> descIt = set.descendingIterator();
        while (descIt.hasNext()) {
            System.out.print(descIt.next() + " ");   // 80 70 60 50...
        }
    }
}
```

### 📌 NavigableSet Methods Summary

```
┌────────────────────┬────────────────────────────────────────┐
│  Method            │  Purpose                               │
├────────────────────┼────────────────────────────────────────┤
│  first()           │  Smallest element                     │
│  last()            │  Largest element                       │
│  floor(e)          │  Largest <= e                          │
│  ceiling(e)        │  Smallest >= e                         │
│  lower(e)          │  Largest < e (strict)                  │
│  higher(e)         │  Smallest > e (strict)                 │
│  pollFirst()       │  Remove and return smallest            │
│  pollLast()        │  Remove and return largest             │
│  headSet(e)        │  All < e                                │
│  tailSet(e)        │  All >= e                              │
│  subSet(from, to)  │  Range [from, to)                      │
│  descendingSet()   │  Reverse ordered set                   │
└────────────────────┴────────────────────────────────────────┘
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.11 EnumSet

<a id="2411-enumset"></a>

### 📌 Specialized Set for Enums

```
EnumSet:
✅ Specialized Set for ENUM types
✅ VERY FAST (uses bit vectors internally)
✅ Memory efficient
✅ ALL elements must be from same enum type
✅ NULL not allowed

Cannot be instantiated with new (abstract class).
Use factory methods!
```

### 📌 EnumSet Example

```java
import java.util.*;

enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumSetDemo {
    public static void main(String[] args) {

        // ═══ Factory methods ═══

        // Empty EnumSet
        EnumSet<Day> empty = EnumSet.noneOf(Day.class);

        // All values
        EnumSet<Day> all = EnumSet.allOf(Day.class);
        System.out.println(all);   // [MONDAY, TUESDAY, ..., SUNDAY]

        // Specific values
        EnumSet<Day> weekdays = EnumSet.of(
            Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY
        );
        System.out.println(weekdays);

        // Range of values
        EnumSet<Day> workDays = EnumSet.range(Day.MONDAY, Day.FRIDAY);
        System.out.println(workDays);

        // Complement (opposite)
        EnumSet<Day> weekend = EnumSet.complementOf(weekdays);
        System.out.println(weekend);   // [SATURDAY, SUNDAY]

        // Copy
        EnumSet<Day> copy = EnumSet.copyOf(weekdays);

        // ═══ Add / Remove ═══
        weekdays.add(Day.SATURDAY);
        weekdays.remove(Day.MONDAY);

        // ═══ Very fast operations ═══
        // Uses bit manipulation internally
        // Much faster than HashSet<Day>
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.12 HashSet vs LinkedHashSet vs TreeSet ⭐⭐⭐

<a id="2412-three-sets-comparison"></a>

### 📌 Complete Comparison Table

```
┌────────────────────┬──────────────┬───────────────┬────────────────┐
│  Feature           │  HashSet     │  LinkedHashSet│  TreeSet       │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Internal Structure│  HashMap     │  LinkedHashMap│  TreeMap       │
│                    │              │  (Hash+LL)    │  (Red-Black    │
│                    │              │               │  Tree)         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Order             │  ❌ None     │  Insertion    │  Sorted        │
│                    │  (random)    │  order        │  (natural/     │
│                    │              │               │  custom)       │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Add/Remove        │  O(1)        │  O(1)         │  O(log n)      │
│  Contains          │              │               │                │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Null Allowed      │  ✅ ONE      │  ✅ ONE       │  ❌ NO         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Duplicate Allowed │  ❌ No       │  ❌ No        │  ❌ No         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Sorted            │  ❌ No       │  ❌ No        │  ✅ YES         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Memory            │  Low         │  Medium       │  High          │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Performance       │  Fastest     │  Slightly     │  Slower        │
│                    │              │  slower       │                │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Iterator          │  Fail-fast   │  Fail-fast    │  Fail-fast     │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Thread-safe       │  ❌ No       │  ❌ No        │  ❌ No         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Best Use Case     │  Fast unique │  Insertion    │  Sorted unique │
│                    │  storage     │  order needed │  data          │
└────────────────────┴──────────────┴───────────────┴────────────────┘
```

### 📌 When to Use Which

```
✅ USE HashSet when:
- Need fastest performance
- Don't care about order
- Just want unique elements
- Default choice for most cases

✅ USE LinkedHashSet when:
- Need to preserve insertion order
- Want predictable iteration order
- Slightly slower than HashSet is acceptable

✅ USE TreeSet when:
- Need SORTED order
- Need range queries (headSet, tailSet, subSet)
- Need floor/ceiling operations
- Willing to trade performance for sorted access
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.13 Hashing in Java (hashCode + equals) ⭐⭐⭐

<a id="2413-hashing-in-java"></a>

### 📌 The Foundation of HashSet/HashMap

```
HASHING = Converting object to integer (hash code)
         used to determine storage location

TWO METHODS INVOLVED:

1. hashCode()
   → Returns int (hash value)
   → From java.lang.Object
   → Used to find BUCKET
   → Should be consistent

2. equals()
   → Compare two objects for equality
   → Used to check DUPLICATES within bucket
   → Should be consistent with hashCode
```

### 📌 Default Implementation

```java
// Default from Object class:
public int hashCode() {
    // Returns memory address-based hash
    // Different for each object (even same content)
}

public boolean equals(Object obj) {
    return this == obj;   // Reference comparison
}

// ✅ For custom classes, you MUST override BOTH
// to make HashSet work correctly!
```

### 📌 Why Override Both?

```java
import java.util.*;

class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class WithoutOverride {
    public static void main(String[] args) {
        Set<Person> set = new HashSet<>();

        Person p1 = new Person("Rahul", 25);
        Person p2 = new Person("Rahul", 25);   // Same content

        set.add(p1);
        set.add(p2);   // Should be duplicate!

        System.out.println(set.size());   // 2 ❌ WRONG!

        // WHY? Object.hashCode() returns different values
        // for different object instances (even same content)
        // set.contains(new Person("Rahul", 25)) → false!

        // FIX: Override both hashCode() and equals()
    }
}
```

### 📌 Correct Implementation

```java
import java.util.*;

class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // ✅ MUST override equals()
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person p = (Person) obj;
        return age == p.age && Objects.equals(name, p.name);
    }

    // ✅ MUST override hashCode()
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

public class WithOverride {
    public static void main(String[] args) {
        Set<Person> set = new HashSet<>();

        Person p1 = new Person("Rahul", 25);
        Person p2 = new Person("Rahul", 25);

        set.add(p1);
        set.add(p2);

        System.out.println(set.size());   // 1 ✅ CORRECT!
        System.out.println(set.contains(new Person("Rahul", 25)));  // true
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.14 equals() and hashCode() Contract ⭐⭐⭐

<a id="2414-equals-hashcode-contract"></a>

### 📌 The MOST IMPORTANT Contract in Java!

```
CONTRACT RULES:

1. REFLEXIVE: x.equals(x) must return true

2. SYMMETRIC: x.equals(y) == y.equals(x)

3. TRANSITIVE: x.equals(y) && y.equals(z) → x.equals(z)

4. CONSISTENT: Multiple calls return same result

5. NULL: x.equals(null) must return false

6. hashCode CONSISTENCY:
   → If x.equals(y) → x.hashCode() == y.hashCode()
   → If x.hashCode() == y.hashCode() → NOT necessarily equal
   (Two unequal objects CAN have same hashCode)

7. hashCode CONSISTENT ACROSS CALLS:
   → Same object should return same hashCode
   → Unless fields used in hashCode change
```

### 📌 Contract Violation Example

```java
import java.util.*;

class BadPerson {
    String name;
    int age;

    BadPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // ❌ Only override equals(), NOT hashCode()!
    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof BadPerson)) return false;
        BadPerson p = (BadPerson) obj;
        return name.equals(p.name) && age == p.age;
    }
    // Missing hashCode() override!
}

public class ContractViolation {
    public static void main(String[] args) {
        Set<BadPerson> set = new HashSet<>();

        BadPerson p1 = new BadPerson("Rahul", 25);
        BadPerson p2 = new BadPerson("Rahul", 25);

        System.out.println(p1.equals(p2));           // true (equals OK)
        System.out.println(p1.hashCode() == p2.hashCode());  // false (BROKEN!)

        set.add(p1);
        System.out.println(set.contains(p2));   // false! ❌ BROKEN!

        // WHY? HashSet uses hashCode() to find bucket first.
        // Different hashCodes → different buckets → contains() fails!

        // ⚠️ NEVER override equals() without hashCode()!
    }
}
```

### 📌 IDE-Generated equals and hashCode

```java
import java.util.Objects;

class Person {
    String name;
    int age;
    String email;

    Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // Modern IDE-generated (Java 7+)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person person = (Person) o;
        return age == person.age &&
               Objects.equals(name, person.name) &&
               Objects.equals(email, person.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age, email);   // Use SAME fields
    }
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

## 24.15 Treeification in Java 8+

<a id="2415-treeification-java-8"></a>

### 📌 Major Performance Improvement

```
BEFORE JAVA 8:
HashMap/HashSet used LINKED LIST for collisions
Worst case: O(n) when many collisions

FROM JAVA 8:
When bucket has 8+ elements:
LINKED LIST → RED-BLACK TREE

Benefits:
✅ Better worst-case: O(log n) instead of O(n)
✅ Handles hash collisions better
✅ Protection against DDoS attacks

Thresholds:
TREEIFY_THRESHOLD = 8      (List → Tree)
UNTREEIFY_THRESHOLD = 6    (Tree → List)
MIN_TREEIFY_CAPACITY = 64  (Minimum table size)
```

### 📌 Visualization

```
BEFORE 8+ elements in bucket:
bucket[5] → [A] → [B] → [C] → [D] → [E]  (linked list)
Search: O(n)

WHEN 8+ elements (and capacity >= 64):
bucket[5] converts to Red-Black Tree
      D
    /   \
   B     F
  / \   / \
 A   C E   G
Search: O(log n)

When elements drop below 6:
Tree → Linked List
```

### 📌 Impact on Performance

```
Scenario: Many objects with same hashCode (bad hash function)

BEFORE Java 8:
100 elements in same bucket
Search: O(100) worst case

FROM Java 8:
100 elements → converted to tree
Search: O(log 100) ≈ O(7)

Massive improvement for edge cases!
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

<a id="24-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Set Interface

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Unordered set       │ HashSet    │ unordered_ │ set        │ Set        │
│                      │            │ set        │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Sorted set          │ TreeSet    │ set        │ N/A        │ N/A       │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Insertion order set │ LinkedHash │ N/A        │ dict (3.7+)│ Set       │
│                      │ Set        │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Range operations    │ ✅ Tree    │ ✅ Yes     │ ❌ No      │ ❌ No     │
│                      │ Set        │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Custom hashCode/    │ ✅ Override│ std::hash  │ __hash__   │ Not usable │
│  equals              │            │            │ __eq__     │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Treeification       │ ✅ Java 8+ │ ❌ No       │ ❌ No     │ ❌ No     │
│  (List→Tree)         │            │            │            │            │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

<a id="24-interview-questions"></a>

## 💡 Chapter 24 — Interview Questions (15+)

---

### 🔵 Conceptual Questions

**Q1. What is Set? What are its characteristics?**

```
SET = Collection that CANNOT contain DUPLICATES.

CHARACTERISTICS:
✅ No duplicate elements
✅ At most one null (HashSet, LinkedHashSet)
✅ TreeSet doesn't allow null
✅ No indexed access
✅ Uses equals() for uniqueness

IMPLEMENTATIONS:
- HashSet: Fast, unordered
- LinkedHashSet: Insertion order
- TreeSet: Sorted order
- EnumSet: For enums

USE CASES:
✅ Remove duplicates
✅ Membership testing
✅ Set operations (union, intersection)
✅ Unique element tracking
```

---

**Q2. How does HashSet work internally?**

```
HashSet INTERNALLY uses a HashMap!

Fields:
private transient HashMap<E, Object> map;
private static final Object PRESENT = new Object();

When you do: set.add("A")
Actually happens: map.put("A", PRESENT)

WHY?
- HashMap already provides O(1) operations
- HashMap ensures unique keys
- Reuse existing implementation

Operations:
- add(e) → map.put(e, PRESENT)
- remove(e) → map.remove(e)
- contains(e) → map.containsKey(e)
- size() → map.size()

All O(1) average time complexity.
```

---

**Q3. What is initial capacity and load factor of HashSet?**

```
INITIAL CAPACITY: 16 (number of buckets)
LOAD FACTOR: 0.75 (75%)
THRESHOLD: capacity × load = 16 × 0.75 = 12

When size reaches threshold:
→ Capacity DOUBLES (16 → 32 → 64 → 128...)
→ All elements rehashed to new buckets
→ This is called REHASHING

WHY 16?
- Power of 2 (efficient bit operations)
- Reasonable initial size

WHY 0.75?
- Balance between memory and performance
- Higher: less memory, more collisions
- Lower: more memory, fewer collisions
- 0.75 is optimal
```

---

**Q4. Difference between HashSet, LinkedHashSet, TreeSet?**

```
┌──────────────┬──────────────┬──────────────┬────────────────┐
│  Feature     │  HashSet     │  LinkedHash  │  TreeSet       │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  Order       │  ❌ None     │  Insertion   │  Sorted        │
│  Performance │  O(1) FAST   │  O(1)         │  O(log n)      │
│  Null        │  ✅ One      │  ✅ One       │  ❌ No         │
│  Structure   │  HashMap     │  LinkedHashMap│  TreeMap        │
│  Memory      │  Low         │  Medium      │  High          │
│  Sorted?     │  ❌ No       │  ❌ No       │  ✅ YES        │
│  Best for    │  Fast unique │  Order matter│  Sorted needed │
└──────────────┴──────────────┴──────────────┴────────────────┘

USE HashSet: Default (90% cases)
USE LinkedHashSet: Need insertion order
USE TreeSet: Need sorted or range queries
```

---

**Q5. Why must we override equals() and hashCode() together?**

```
CONTRACT:
If x.equals(y) is true → x.hashCode() == y.hashCode()

If you override ONLY equals():
→ Two equal objects may have different hashCodes
→ HashSet/HashMap won't find duplicates!
→ contains() will return false for equal objects

EXAMPLE:
class Person {
    String name;
    int age;

    // Only equals()
    @Override
    public boolean equals(Object o) { ... }
    // Missing hashCode()!
}

Set<Person> set = new HashSet<>();
set.add(new Person("A", 25));
set.contains(new Person("A", 25));   // false! ❌ BROKEN!

// Why? Two equal objects have different default hashCodes
// So they go to different buckets in HashSet

FIX: Always override both together!

@Override
public boolean equals(Object o) { ... }

@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

---

**Q6. What is treeification in HashMap/HashSet?**

```
TREEIFICATION (Java 8+):
When a bucket has 8+ elements, LINKED LIST converts to RED-BLACK TREE.

BEFORE Java 8:
bucket[5] → [A] → [B] → ... → [Z]  (Linked List)
Worst case search: O(n)

FROM Java 8:
bucket[5] → Red-Black Tree
Worst case search: O(log n)

THRESHOLDS:
- TREEIFY_THRESHOLD = 8   (List → Tree when 8+ elements)
- UNTREEIFY_THRESHOLD = 6 (Tree → List when 6 or less)
- MIN_TREEIFY_CAPACITY = 64 (Total table must be 64+)

BENEFITS:
✅ Better worst case: O(log n) vs O(n)
✅ Protection from DDoS with bad hash
✅ Improves performance in edge cases

Applies to: HashMap, HashSet, LinkedHashMap, LinkedHashSet
```

---

**Q7. TreeSet methods (NavigableSet)?**

```
Boundary methods:
- first() → smallest
- last() → largest

Relative methods:
- floor(e) → largest <= e
- ceiling(e) → smallest >= e
- lower(e) → strictly < e
- higher(e) → strictly > e

Polling (remove):
- pollFirst() → remove and return smallest
- pollLast() → remove and return largest

Range views:
- headSet(e) → all < e
- tailSet(e) → all >= e
- subSet(from, to) → range [from, to)

Descending:
- descendingSet() → reverse ordered set
- descendingIterator() → iterate reverse

Example:
TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 30, 40));
set.floor(25);       // 20
set.ceiling(25);     // 30
set.headSet(30);     // [10, 20]
set.tailSet(30);     // [30, 40]
```

---

### 🟡 Scenario-Based Questions

**Q8. Why doesn't TreeSet allow null?**

```
TreeSet uses Comparable.compareTo() for sorting.

When you add null:
- TreeSet tries to place it in sorted order
- Must call: null.compareTo(existingElement)
- Or: existingElement.compareTo(null)
- Both throw NullPointerException!

// TreeSet<Integer> set = new TreeSet<>();
// set.add(null);   // NullPointerException!

Workaround for custom comparator that handles null:
TreeSet<String> set = new TreeSet<>(
    Comparator.nullsFirst(Comparator.naturalOrder())
);
set.add(null);   // Now works!
set.add("A");
System.out.println(set);   // [null, A]
```

---

### 🔴 Output-Based Questions

**Q9. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        Set<Integer> set = new HashSet<>();
        set.add(3);
        set.add(1);
        set.add(2);
        set.add(1);   // Duplicate
        System.out.println(set.size());
        System.out.println(set);
    }
}
```

```
OUTPUT:
3
[1, 2, 3]  (order may vary in HashSet)

REASON:
- Duplicate 1 not added
- HashSet doesn't guarantee order
- size() shows 3 (unique elements)
```

---

**Q10. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        LinkedHashSet<String> set = new LinkedHashSet<>();
        set.add("Rahul");
        set.add("Amit");
        set.add("Priya");
        set.add("Neha");
        System.out.println(set);
    }
}
```

```
OUTPUT: [Rahul, Amit, Priya, Neha]

REASON:
LinkedHashSet maintains INSERTION order.
Elements printed in the order added.
```

---

**Q11. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(50);
        set.add(20);
        set.add(80);
        set.add(10);

        System.out.println(set.first());
        System.out.println(set.last());
        System.out.println(set.floor(30));
        System.out.println(set.ceiling(30));
    }
}
```

```
OUTPUT:
10        (smallest)
80        (largest)
20        (largest <= 30)
50        (smallest >= 30)
```

---

**Q12. Will this compile?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>();
        set.add("A");
        set.add(null);
        System.out.println(set);
    }
}
```

```
❌ Compiles but throws NullPointerException at runtime!

REASON:
TreeSet doesn't allow null.
When adding null, it tries to compare with existing elements
using compareTo(). Since null cannot be compared, NPE thrown.
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

<a id="24-practice-problems"></a>

## 🧪 Chapter 24 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain HashSet internal working. How is it backed by HashMap?

2. Compare HashSet, LinkedHashSet, and TreeSet in detail with
   time complexities.

3. Why must equals() and hashCode() be overridden together?
   Show example of what breaks if not.

4. Explain treeification in Java 8+. What are the thresholds?
   Why was it introduced?

5. Explain TreeSet's NavigableSet methods (floor, ceiling,
   headSet, tailSet, subSet) with examples.
```

### 💻 5 Coding Questions

```java
// Q1: Find duplicates in a list using Set
// Input: [1, 2, 3, 2, 4, 3, 5]
// Output: [2, 3] (duplicates)

import java.util.*;
public class FindDuplicates {
    // TODO: Use Set to find duplicates efficiently
}
```

```java
// Q2: Check if two lists have any common elements
// Input: [1, 2, 3] and [4, 5, 3]
// Output: true

public class HaveCommon {
    // TODO: Use Set intersection
}
```

```java
// Q3: Remove duplicates but maintain insertion order
// Input: [3, 1, 4, 1, 5, 9, 2, 6, 3]
// Output: [3, 1, 4, 5, 9, 2, 6]

public class DedupeOrdered {
    // TODO: Use appropriate Set implementation
}
```

```java
// Q4: Find K nearest values to given number in TreeSet
// TreeSet: [10, 20, 30, 40, 50]
// target = 35, k = 2
// Output: [30, 40]

public class KNearest {
    // TODO: Use TreeSet's floor/ceiling
}
```

```java
// Q5: Implement custom equals/hashCode for Point class
// Points (1,2) and (1,2) should be equal
// Test with HashSet

public class Point {
    // TODO: Complete class with proper equals/hashCode
}
```

<a href="#chapter-index-table-24">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 24 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 24.1  Set Interface Features                            │
│  ✅ 24.2  Set Methods                                        │
│  ✅ 24.3  HashSet Internal Working (backed by HashMap)      │
│  ✅ 24.4  HashSet Hashing Mechanism                         │
│  ✅ 24.5  HashSet Capacity (16) & Load Factor (0.75)        │
│  ✅ 24.6  HashSet Rehashing                                 │
│  ✅ 24.7  HashSet Null Handling                             │
│  ✅ 24.8  LinkedHashSet — Insertion Order                   │
│  ✅ 24.9  TreeSet — Red-Black Tree                          │
│  ✅ 24.10 TreeSet NavigableSet Methods                       │
│  ✅ 24.11 EnumSet                                            │
│  ✅ 24.12 HashSet vs LinkedHashSet vs TreeSet               │
│  ✅ 24.13 Hashing in Java (hashCode + equals)               │
│  ✅ 24.14 equals & hashCode Contract                        │
│  ✅ 24.15 Treeification in Java 8+                          │
│  ✅ 🔥    Java vs Others                                    │
│  ✅ 12+   Interview Questions                               │
│  ✅ 5     Theory + 5 Coding Problems                        │
│                                                             │
│  ⭐ Next: Map Interface (Chapter 25)                        │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
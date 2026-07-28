

<a id="25-map-interface"></a>

# 📘 Chapter 25: Map Interface (HashMap, TreeMap, ConcurrentHashMap)

> **Part E: Collection Framework**
> `Core` | `Key-Value Storage` | `MOST IMPORTANT Interview Topic`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-25"></a>

## 📚 Chapter 25 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 25.1 | [What is Map](#251-what-is-map) | Key-Value Pairs |
| 25.2 | [Map Methods](#252-map-methods) | All Standard Methods |
| 25.3 | [Map.Entry Interface](#253-map-entry-interface) | Individual Entries |
| 25.4 | [Map.of() & ofEntries()](#254-map-of-ofentries) | Java 9+ Immutable |
| 25.5 | [HashMap Internal Working](#255-hashmap-internal-working) | Deep Dive |
| 25.6 | [HashMap put() Flow](#256-hashmap-put-flow) | Step-by-Step |
| 25.7 | [HashMap get() Flow](#257-hashmap-get-flow) | Step-by-Step |
| 25.8 | [HashMap Capacity & Load](#258-hashmap-capacity-load) | 16, 0.75, 12 |
| 25.9 | [HashMap Rehashing](#259-hashmap-rehashing) | Doubling Capacity |
| 25.10 | [HashMap Treeification](#2510-hashmap-treeification) | Java 8+ Feature |
| 25.11 | [HashMap Null Key/Value](#2511-hashmap-null-handling) | One Null Key |
| 25.12 | [HashMap Time Complexity](#2512-hashmap-time-complexity) | Big O Analysis |
| 25.13 | [LinkedHashMap Insertion Order](#2513-linkedhashmap-insertion) | Ordered Map |
| 25.14 | [LinkedHashMap Access Order (LRU)](#2514-linkedhashmap-lru) | LRU Cache |
| 25.15 | [TreeMap Red-Black Tree](#2515-treemap-red-black-tree) | Sorted Map |
| 25.16 | [TreeMap NavigableMap Methods](#2516-treemap-navigable-methods) | Range Operations |
| 25.17 | [Hashtable Legacy](#2517-hashtable-legacy) | Old Synchronized |
| 25.18 | [ConcurrentHashMap](#2518-concurrenthashmap) | Modern Thread-Safe |
| 25.19 | [HashMap vs Hashtable vs ConcurrentHashMap](#2519-three-comparison) | Complete Comparison |
| 25.20 | [WeakHashMap & IdentityHashMap](#2520-weak-identity-hashmap) | Special Maps |
| 25.21 | [EnumMap](#2521-enummap) | Enum-Specific Map |
| 25.22 | [HashMap vs LinkedHashMap vs TreeMap](#2522-map-comparison) | All Maps Compared |
| 🔥 | [Java vs Other Languages](#25-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#25-interview-questions) | 20+ Questions |
| 🧪 | [Practice Problems](#25-practice-problems) | 5 Coding + 5 Theory |

---

## 25.1 What is Map

<a id="251-what-is-map"></a>

### 📌 Definition

```
MAP INTERFACE = Collection that stores KEY-VALUE PAIRS.

Key Characteristics:
✅ Each key is UNIQUE
✅ Each key maps to EXACTLY ONE value
✅ Values can be DUPLICATE
✅ Keys can be NULL (HashMap allows ONE null key)
✅ NOT part of Collection interface (separate hierarchy!)

IMPORTANT: Map extends → nothing (not Collection!)
But provides similar methods.

Implementations:
1. HashMap        — Fast, unordered
2. LinkedHashMap  — Insertion/Access order maintained
3. TreeMap        — Sorted by keys
4. Hashtable      — Legacy, synchronized
5. ConcurrentHashMap — Thread-safe modern version
6. WeakHashMap    — Weak references
7. IdentityHashMap — Uses == instead of equals
8. EnumMap        — Enum keys only
```

### 📌 Basic Example

```java
import java.util.*;

public class MapDemo {
    public static void main(String[] args) {

        // ═══ Create Map ═══
        Map<String, Integer> ages = new HashMap<>();

        // ═══ PUT (add/update) ═══
        ages.put("Rahul", 25);
        ages.put("Priya", 30);
        ages.put("Amit", 28);
        ages.put("Rahul", 26);   // ⚠️ Updates existing (key must be unique)

        System.out.println(ages);   // {Rahul=26, Priya=30, Amit=28}

        // ═══ GET (retrieve value) ═══
        int rahulAge = ages.get("Rahul");        // 26
        Integer unknown = ages.get("Unknown");    // null
        int defaultAge = ages.getOrDefault("Unknown", 0);   // 0

        // ═══ CHECK ═══
        boolean hasKey = ages.containsKey("Rahul");    // true
        boolean hasValue = ages.containsValue(28);      // true

        // ═══ REMOVE ═══
        ages.remove("Amit");
        System.out.println(ages);   // {Rahul=26, Priya=30}

        // ═══ SIZE ═══
        System.out.println(ages.size());   // 2

        // ═══ ITERATE ═══
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }

        // Just keys
        for (String key : ages.keySet()) {
            System.out.println(key);
        }

        // Just values
        for (Integer value : ages.values()) {
            System.out.println(value);
        }
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
MAP = PHONE DIRECTORY / DICTIONARY

📞 Phone Book:
   Name          → Number
   -----         → ------
   Rahul         → 9876543210
   Priya         → 9123456789
   Amit          → 9988776655

Name = KEY (unique)
Number = VALUE (can be different)

📖 Dictionary:
   Word          → Meaning
   -----         → -------
   Java          → Programming language
   Python        → Snake / Programming language
   Coffee        → Java (dark liquid)

Word = KEY (unique)
Meaning = VALUE

📇 Aadhaar Card:
   Aadhaar No.   → Person Details
   -----------   → --------------
   1234-5678-90  → Rahul Sharma, 25, Delhi
   9876-5432-10  → Priya Verma, 30, Mumbai

CANNOT have TWO people with SAME Aadhaar!
Aadhaar = Key (unique)
Details = Value

Yehi Map hai!
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.2 Map Methods

<a id="252-map-methods"></a>

### 📌 All Important Methods

```java
import java.util.*;

public class MapMethodsDemo {
    public static void main(String[] args) {

        Map<String, Integer> map = new HashMap<>();

        // ═══ ADDING / UPDATING ═══
        map.put("A", 1);                       // Add or update
        map.put("B", 2);
        map.put("C", 3);

        map.putIfAbsent("A", 100);             // Only if key absent
        // A is present, so 100 NOT added
        System.out.println(map.get("A"));      // 1

        map.putIfAbsent("D", 4);               // D absent, added
        System.out.println(map);                // {A=1, B=2, C=3, D=4}

        // Add all from another map
        Map<String, Integer> other = new HashMap<>();
        other.put("E", 5);
        other.put("F", 6);
        map.putAll(other);
        System.out.println(map);   // {A=1, B=2, C=3, D=4, E=5, F=6}

        // ═══ ACCESSING ═══
        int val = map.get("A");                 // 1
        Integer notFound = map.get("Z");         // null
        int withDefault = map.getOrDefault("Z", 0);   // 0

        int size = map.size();                  // 6
        boolean empty = map.isEmpty();          // false

        // ═══ CHECKING ═══
        boolean hasKey = map.containsKey("A");   // true
        boolean hasVal = map.containsValue(2);    // true

        // ═══ REMOVING ═══
        map.remove("F");                         // Remove by key
        map.remove("E", 5);                      // Remove only if value matches
        map.remove("D", 999);                    // Won't remove (value doesn't match)
        System.out.println(map);

        // ═══ VIEWS ═══
        Set<String> keys = map.keySet();
        Collection<Integer> values = map.values();
        Set<Map.Entry<String, Integer>> entries = map.entrySet();

        // ═══ MODERN METHODS (Java 8+) ═══

        // compute — apply function to key's value
        map.compute("A", (k, v) -> v == null ? 1 : v + 10);
        // If A absent: v is null, set to 1
        // If A present: add 10
        System.out.println(map.get("A"));   // 11

        // computeIfAbsent — only if key absent
        map.computeIfAbsent("X", k -> 100);
        // X absent, so compute and add
        System.out.println(map.get("X"));   // 100

        map.computeIfAbsent("A", k -> 999);
        // A present, do nothing
        System.out.println(map.get("A"));   // 11 (unchanged)

        // computeIfPresent — only if key present
        map.computeIfPresent("A", (k, v) -> v * 2);
        System.out.println(map.get("A"));   // 22 (11*2)

        // merge — combine values
        map.merge("A", 100, Integer::sum);
        // If A absent: set to 100
        // If A present: add 100 to current (22 + 100 = 122)
        System.out.println(map.get("A"));   // 122

        // replace
        map.replace("B", 200);              // Replace only if key exists
        map.replace("Y", 999);              // Y doesn't exist, no change

        // replaceAll — apply function to all values
        map.replaceAll((k, v) -> v * 2);
        System.out.println(map);

        // ═══ CLEAR ═══
        map.clear();
        System.out.println(map.isEmpty());   // true

        // ═══ Java 8+ forEach ═══
        Map<String, Integer> map2 = new HashMap<>();
        map2.put("A", 1);
        map2.put("B", 2);

        map2.forEach((k, v) ->
            System.out.println(k + " → " + v)
        );
    }
}
```

### 📌 Method Summary Table

```
┌─────────────────────────┬────────────────────────────────────┐
│  Method                 │  Purpose                           │
├─────────────────────────┼────────────────────────────────────┤
│  put(K, V)              │  Add or update entry               │
│  putIfAbsent(K, V)      │  Add only if key absent            │
│  putAll(Map)            │  Add all from another map          │
│  get(K)                 │  Get value by key                  │
│  getOrDefault(K, V)     │  Get or default if absent          │
│  remove(K)              │  Remove by key                     │
│  remove(K, V)           │  Remove only if value matches      │
│  containsKey(K)         │  Check key exists                  │
│  containsValue(V)       │  Check value exists                │
│  size()                 │  Number of entries                 │
│  isEmpty()              │  Check if empty                    │
│  clear()                │  Remove all                        │
│  keySet()               │  Get all keys                      │
│  values()               │  Get all values                    │
│  entrySet()             │  Get all entries                   │
│  compute(K, BiFunction) │  Compute new value                 │
│  computeIfAbsent(K, F)  │  Compute if absent                 │
│  computeIfPresent(K, F) │  Compute if present                │
│  merge(K, V, BiFunction)│  Merge values                      │
│  replace(K, V)          │  Replace value                     │
│  replaceAll(BiFunction) │  Replace all values                │
│  forEach(BiConsumer)    │  Iterate (Java 8+)                 │
└─────────────────────────┴────────────────────────────────────┘
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.3 Map.Entry Interface

<a id="253-map-entry-interface"></a>

### 📌 Individual Key-Value Pairs

```
Map.Entry<K, V> = Represents a single key-value pair

Methods:
- getKey() → Returns the key
- getValue() → Returns the value
- setValue(V) → Sets a new value (updates the map!)
```

### 📌 Example

```java
import java.util.*;

public class MapEntryDemo {
    public static void main(String[] args) {

        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // ═══ Get entrySet() ═══
        Set<Map.Entry<String, Integer>> entries = map.entrySet();

        // ═══ Iterate entries ═══
        for (Map.Entry<String, Integer> entry : entries) {
            String key = entry.getKey();
            Integer value = entry.getValue();
            System.out.println(key + " = " + value);
        }

        // ═══ Modify value via entry ═══
        for (Map.Entry<String, Integer> entry : entries) {
            if (entry.getKey().equals("A")) {
                entry.setValue(100);   // Updates map!
            }
        }
        System.out.println(map);   // {A=100, B=2, C=3}

        // ═══ Java 8+ Iteration ═══
        map.entrySet().forEach(entry ->
            System.out.println(entry.getKey() + " → " + entry.getValue())
        );

        // ═══ Stream on entries ═══
        map.entrySet().stream()
            .filter(e -> e.getValue() > 1)
            .forEach(e -> System.out.println(e.getKey()));

        // ═══ Create Entry manually (Java 9+) ═══
        Map.Entry<String, Integer> entry = Map.entry("D", 4);
        System.out.println(entry);   // D=4
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.4 Map.of() & Map.ofEntries()

<a id="254-map-of-ofentries"></a>

### 📌 Immutable Maps (Java 9+)

```java
import java.util.*;

public class ImmutableMapDemo {
    public static void main(String[] args) {

        // ═══ Map.of() — Up to 10 entries ═══
        Map<String, Integer> map1 = Map.of(
            "A", 1,
            "B", 2,
            "C", 3
        );
        System.out.println(map1);

        // ═══ Empty map ═══
        Map<String, Integer> empty = Map.of();

        // ═══ Single entry ═══
        Map<String, Integer> single = Map.of("Key", 100);

        // ═══ For MORE than 10 entries: Map.ofEntries() ═══
        Map<String, Integer> larger = Map.ofEntries(
            Map.entry("A", 1),
            Map.entry("B", 2),
            Map.entry("C", 3),
            Map.entry("D", 4),
            Map.entry("E", 5),
            Map.entry("F", 6),
            Map.entry("G", 7),
            Map.entry("H", 8),
            Map.entry("I", 9),
            Map.entry("J", 10),
            Map.entry("K", 11),
            Map.entry("L", 12)
            // Can have as many as you need
        );

        // ═══ IMMUTABLE — cannot modify ═══
        try {
            map1.put("Z", 99);   // ❌ UnsupportedOperationException!
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify immutable map");
        }

        // ═══ null NOT allowed ═══
        try {
            Map<String, Integer> withNull = Map.of("A", null);
            // ❌ NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("Cannot have null values");
        }

        // ═══ Duplicate keys NOT allowed ═══
        try {
            Map<String, Integer> dup = Map.of("A", 1, "A", 2);
            // ❌ IllegalArgumentException!
        } catch (IllegalArgumentException e) {
            System.out.println("Duplicate keys not allowed");
        }

        // ═══ Map.copyOf() — copy existing map ═══
        Map<String, Integer> mutable = new HashMap<>();
        mutable.put("A", 1);
        mutable.put("B", 2);

        Map<String, Integer> immutableCopy = Map.copyOf(mutable);
        // immutableCopy.put("C", 3);   // ❌ ERROR!
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.5 HashMap — Internal Working ⭐⭐⭐

<a id="255-hashmap-internal-working"></a>

### 📌 The Most Asked Interview Topic!

```
HashMap Internal Structure:
→ Array of Node<K, V> objects (called TABLE or BUCKETS)
→ Each bucket is a LINKED LIST (or TREE from Java 8+)
→ Uses HASH FUNCTION to determine bucket

INTERNAL FIELDS:
transient Node<K,V>[] table;       // Bucket array
transient int size;                 // Number of entries
int threshold;                       // resize threshold
final float loadFactor;              // 0.75

Node class:
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;         // Cached hash
    final K key;            // Key
    V value;                // Value
    Node<K,V> next;         // Next node (linked list)
}
```

### 📌 Visualization

```
HashMap capacity = 16
elementData = Node[]

After put("Apple", 1):
1. hash = hash("Apple") = 63476538
2. index = 63476538 & 15 = 10
3. Place at bucket[10]

Bucket layout:
bucket[0]  = null
bucket[1]  = null
...
bucket[10] = Node{hash, "Apple", 1, next=null}
...
bucket[15] = null

After put("Banana", 2), put("Cherry", 3):

bucket[3]  = Node{hash, "Banana", 2, next=null}
bucket[10] = Node{hash, "Apple", 1, next=null}
bucket[12] = Node{hash, "Cherry", 3, next=null}

COLLISION scenario:
If put("Ants", 4) also maps to bucket[10]:

bucket[10] = Node{"Apple", 1, next→} → Node{"Ants", 4, next=null}
                                     (Linked list!)
```

### 📌 HashMap Node Structure (Simplified)

```java
public class HashMap<K, V> {

    // Node class
    static class Node<K, V> implements Map.Entry<K, V> {
        final int hash;
        final K key;
        V value;
        Node<K, V> next;

        Node(int hash, K key, V value, Node<K, V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }

    // Fields
    transient Node<K, V>[] table;
    transient int size;
    int threshold;
    final float loadFactor;

    // Default values
    static final int DEFAULT_INITIAL_CAPACITY = 16;
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    static final int TREEIFY_THRESHOLD = 8;
    static final int UNTREEIFY_THRESHOLD = 6;
    static final int MIN_TREEIFY_CAPACITY = 64;
    static final int MAXIMUM_CAPACITY = 1 << 30;   // 2^30

    // Hash function
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.6 HashMap — put() Method Flow ⭐⭐⭐

<a id="256-hashmap-put-flow"></a>

### 📌 Step-by-Step Process

```
map.put("Apple", 1)

STEP 1: Calculate hash
hash = hash("Apple") = 63476538

STEP 2: Determine bucket index
n = table.length = 16
index = (n - 1) & hash = 15 & 63476538 = 10

STEP 3: Check if bucket is empty
if (table[index] == null) {
    table[index] = new Node(hash, "Apple", 1, null);
    size++;
} else {
    // Handle collision (Step 4)
}

STEP 4: Handle collision
Traverse the linked list at bucket[index]:
- If existing node with SAME key found:
  - Update value (return old value)
- If key NOT found:
  - Add new node at END of linked list

STEP 5: Check treeification
If linked list length > 8 AND table.length >= 64:
- Convert linked list to Red-Black Tree

STEP 6: Check for resize
If size > threshold (capacity * loadFactor):
- Call resize() → double capacity
- Rehash all elements

STEP 7: Return
- Return old value if key was present
- Return null if new entry
```

### 📌 Detailed Flow Diagram

```
put(K, V)
   │
   ▼
Calculate hash(K)
   │
   ▼
Calculate index = (n-1) & hash
   │
   ▼
Bucket[index] == null?
   │
   ├─ YES → Create new Node, size++
   │
   └─ NO → Traverse bucket
           │
           ▼
        Same key found?
           │
           ├─ YES → Update value, return old
           │
           └─ NO → Add new node at end
                   │
                   ▼
                Chain length > 8 AND capacity >= 64?
                   │
                   ├─ YES → Convert to Tree
                   │
                   └─ NO → Continue
                           │
                           ▼
                        size > threshold?
                           │
                           ├─ YES → Resize (double capacity, rehash)
                           │
                           └─ NO → Return
```

### 📌 Example Trace

```java
import java.util.*;

public class HashMapPutTrace {
    public static void main(String[] args) {

        HashMap<String, Integer> map = new HashMap<>();
        // Initial: capacity=16, size=0, threshold=12

        map.put("A", 1);
        // hash = hash("A") = 65
        // index = 65 & 15 = 1
        // bucket[1] = null → Add new node
        // Result: bucket[1] = {A=1}, size=1

        map.put("B", 2);
        // index = calculated
        // Add to appropriate bucket, size=2

        map.put("A", 100);   // Update existing key
        // Same hash, same bucket
        // Find node with key "A", update value
        // size stays 2 (no new node)

        // At size=13, resize() is triggered!
        // capacity: 16 → 32
        // threshold: 12 → 24
        // All elements rehashed
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.7 HashMap — get() Method Flow

<a id="257-hashmap-get-flow"></a>

### 📌 Retrieval Process

```
map.get("Apple")

STEP 1: Calculate hash
hash = hash("Apple") = 63476538

STEP 2: Determine bucket index
index = (n - 1) & hash = 10

STEP 3: Check bucket
if (table[index] == null) {
    return null;   // Key doesn't exist
}

STEP 4: Traverse bucket
Node current = table[index];
while (current != null) {
    // Compare hash first (fast integer comparison)
    if (current.hash == hash) {
        // Then compare keys using equals()
        if (current.key == key || (key != null && key.equals(current.key))) {
            return current.value;   // Found!
        }
    }
    current = current.next;
}
return null;   // Not found

TIME COMPLEXITY:
- Average: O(1)
- Worst (all in one bucket): O(n) with list, O(log n) with tree
```

### 📌 Example

```java
import java.util.*;

public class HashMapGetTrace {
    public static void main(String[] args) {

        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // ═══ get("A") ═══
        Integer val = map.get("A");
        // 1. hash = hash("A")
        // 2. index = hash & 15
        // 3. Go to bucket[index]
        // 4. Traverse linked list
        // 5. Find matching key
        // 6. Return value (1)

        // ═══ get("Z") — not present ═══
        Integer notFound = map.get("Z");
        // 1. hash = hash("Z")
        // 2. index = hash & 15
        // 3. bucket[index] is null or key not found
        // 4. Return null

        // ═══ getOrDefault ═══
        Integer safe = map.getOrDefault("Z", 0);   // Returns 0
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.8 HashMap — Initial Capacity, Load Factor, Threshold

<a id="258-hashmap-capacity-load"></a>

### 📌 Key Constants

```
INITIAL CAPACITY: 16
(Default number of buckets)

LOAD FACTOR: 0.75 (75%)
(When to resize)

THRESHOLD: capacity × load factor = 16 × 0.75 = 12
(Size at which resize happens)

MAXIMUM_CAPACITY: 2^30 (1,073,741,824)
(Absolute maximum)

TREEIFY_THRESHOLD: 8
(List → Tree conversion in single bucket)

UNTREEIFY_THRESHOLD: 6
(Tree → List conversion)

MIN_TREEIFY_CAPACITY: 64
(Minimum table size for treeification)
```

### 📌 Constructors

```java
import java.util.*;

public class HashMapConstructors {
    public static void main(String[] args) {

        // ═══ 1. Default ═══
        HashMap<String, Integer> map1 = new HashMap<>();
        // capacity=16, load=0.75, threshold=12

        // ═══ 2. Custom initial capacity ═══
        HashMap<String, Integer> map2 = new HashMap<>(32);
        // capacity=32, load=0.75, threshold=24

        // ═══ 3. Custom capacity and load factor ═══
        HashMap<String, Integer> map3 = new HashMap<>(16, 0.6f);
        // capacity=16, load=0.6, threshold=~9

        // ═══ 4. From another map ═══
        Map<String, Integer> other = Map.of("A", 1, "B", 2);
        HashMap<String, Integer> map4 = new HashMap<>(other);

        // ═══ Optimization ═══
        // If you know you'll add ~1000 elements:
        int expected = 1000;
        int capacity = (int) (expected / 0.75f) + 1;   // 1334
        HashMap<String, Integer> optimized = new HashMap<>(capacity);
        // No rehashing needed!
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.9 HashMap — Rehashing/Resize

<a id="259-hashmap-rehashing"></a>

### 📌 The Resize Process

```
REHASHING happens when:
size > threshold (capacity × loadFactor)

WHAT HAPPENS:
1. Create new table with DOUBLE capacity (16 → 32)
2. Calculate new threshold (24 for 32)
3. Rehash EVERY existing entry
4. New index = new_hash & (new_capacity - 1)
5. Move to new bucket

GROWTH:
16 → 32 → 64 → 128 → 256 → 512 → 1024 → ...
Always DOUBLES!

COST: O(n) — expensive operation!
That's why capacity should be pre-allocated.

INTERESTING FACT (Java 8+):
Elements go to either same bucket OR bucket+oldCapacity
This is due to the (n-1) & hash formula.
No full rehash needed - just check one bit!
```

### 📌 Example

```java
import java.util.*;

public class RehashingDemo {
    public static void main(String[] args) {

        HashMap<Integer, String> map = new HashMap<>();
        // Initial: capacity=16, threshold=12

        System.out.println("--- Adding 13 elements ---");
        for (int i = 1; i <= 13; i++) {
            map.put(i, "Value" + i);
            System.out.println("Added " + i + ", size=" + map.size());
            // At 13, resize triggers!
            // capacity: 16 → 32
            // threshold: 12 → 24
        }

        // ═══ Optimized version ═══
        // If you know approximate size:
        HashMap<Integer, String> optimized = new HashMap<>(50);
        // No resize needed for up to 37 elements
        // (50 * 0.75 = 37.5)
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.10 HashMap — Treeification (Java 8+)

<a id="2510-hashmap-treeification"></a>

### 📌 List → Tree Conversion

```
BEFORE Java 8:
Bucket collisions → LINKED LIST
Worst case: O(n) if many collisions

FROM Java 8:
When bucket has 8+ elements → RED-BLACK TREE
Worst case: O(log n)

THRESHOLDS:
- TREEIFY_THRESHOLD = 8   (list → tree)
- UNTREEIFY_THRESHOLD = 6 (tree → list)
- MIN_TREEIFY_CAPACITY = 64 (total table size)

CONDITIONS FOR TREEIFICATION:
1. Bucket has 8+ elements
2. Total table capacity >= 64
   (If < 64, just resize instead)

WHY?
✅ O(log n) worst case
✅ Protection against DDoS attacks
✅ Handles bad hash functions better
```

### 📌 Visualization

```
Chain length < 8:
bucket[5] → [A] → [B] → [C] → [D] → [E] → [F] → [G]
(Linked list)

Chain length >= 8 AND capacity >= 64:
Converts to Red-Black Tree:
        [D]
       /   \
     [B]   [F]
    /  \   /  \
  [A] [C] [E] [G]
  ...

If elements drop to <=6 in tree:
Converts back to Linked List
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.11 HashMap — Null Key/Value

<a id="2511-hashmap-null-handling"></a>

### 📌 Null Handling

```java
import java.util.*;

public class NullHandlingDemo {
    public static void main(String[] args) {

        HashMap<String, Integer> map = new HashMap<>();

        // ═══ ONE null KEY allowed ═══
        map.put(null, 100);
        map.put("A", 1);
        map.put(null, 200);   // Updates the null key's value

        System.out.println(map.get(null));   // 200

        // ═══ MULTIPLE null VALUES allowed ═══
        map.put("B", null);
        map.put("C", null);
        map.put("D", null);

        System.out.println(map);
        // {null=200, A=1, B=null, C=null, D=null}

        // ═══ HOW HASHMAP HANDLES NULL KEY ═══
        // hash(null) always returns 0
        // Null key always goes to bucket[0]
        // This is a special case in the code:

        /*
        static final int hash(Object key) {
            int h;
            return (key == null) ? 0 :
                   (h = key.hashCode()) ^ (h >>> 16);
        }
        */

        // ═══ Hashtable does NOT allow null ═══
        Hashtable<String, Integer> ht = new Hashtable<>();
        try {
            ht.put(null, 1);   // ❌ NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("Hashtable doesn't allow null keys");
        }

        // ═══ TreeMap does NOT allow null KEY ═══
        TreeMap<String, Integer> tm = new TreeMap<>();
        try {
            tm.put(null, 1);   // ❌ NullPointerException!
        } catch (NullPointerException e) {
            System.out.println("TreeMap doesn't allow null keys");
        }
        // But TreeMap ALLOWS null VALUES
        tm.put("A", null);   // ✅ OK
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.12 HashMap — Time Complexity

<a id="2512-hashmap-time-complexity"></a>

### 📌 Big O Analysis

```
┌────────────────────┬───────────────┬───────────────┐
│  Operation         │  Average      │  Worst Case   │
├────────────────────┼───────────────┼───────────────┤
│  put(K, V)         │  O(1)         │  O(log n)*    │
│  get(K)            │  O(1)         │  O(log n)*    │
│  remove(K)         │  O(1)         │  O(log n)*    │
│  containsKey(K)    │  O(1)         │  O(log n)*    │
│  containsValue(V)  │  O(n)         │  O(n)         │
│  size()            │  O(1)         │  O(1)         │
│  isEmpty()         │  O(1)         │  O(1)         │
│  clear()           │  O(n)         │  O(n)         │
│  Iteration         │  O(n)         │  O(n)         │
└────────────────────┴───────────────┴───────────────┘

* From Java 8+, worst case is O(log n) due to treeification
  Before Java 8, worst case was O(n) with linked list
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.13 LinkedHashMap — Insertion Order

<a id="2513-linkedhashmap-insertion"></a>

### 📌 HashMap + Doubly-Linked List

```
LinkedHashMap:
✅ Extends HashMap
✅ Maintains INSERTION ORDER (by default)
✅ Uses HashMap + Doubly-Linked List internally
✅ Slightly slower than HashMap
✅ Same operations as HashMap

Additional feature:
✅ Can be configured for ACCESS ORDER (LRU Cache)
```

### 📌 Example

```java
import java.util.*;

public class LinkedHashMapDemo {
    public static void main(String[] args) {

        // ═══ HashMap: NO order ═══
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("C", 3);
        hashMap.put("A", 1);
        hashMap.put("B", 2);
        System.out.println("HashMap: " + hashMap);
        // {A=1, B=2, C=3} (random order)

        // ═══ LinkedHashMap: INSERTION order ═══
        Map<String, Integer> linkedMap = new LinkedHashMap<>();
        linkedMap.put("C", 3);
        linkedMap.put("A", 1);
        linkedMap.put("B", 2);
        System.out.println("LinkedHashMap: " + linkedMap);
        // {C=3, A=1, B=2} (insertion order!)

        // ═══ TreeMap: SORTED order ═══
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("C", 3);
        treeMap.put("A", 1);
        treeMap.put("B", 2);
        System.out.println("TreeMap: " + treeMap);
        // {A=1, B=2, C=3} (sorted!)
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.14 LinkedHashMap — Access Order (LRU Cache) ⭐

<a id="2514-linkedhashmap-lru"></a>

### 📌 Perfect for LRU Cache!

```
LinkedHashMap can be configured to maintain ACCESS ORDER
instead of insertion order.

Constructor:
new LinkedHashMap<>(capacity, loadFactor, accessOrder)

If accessOrder = true:
→ Most recently accessed element goes to end
→ Least recently accessed stays at beginning
→ PERFECT for LRU Cache!
```

### 📌 LRU Cache Implementation

```java
import java.util.*;

public class LRUCacheDemo {

    // Custom LRU Cache using LinkedHashMap
    static class LRUCache<K, V> extends LinkedHashMap<K, V> {
        private final int capacity;

        public LRUCache(int capacity) {
            super(capacity, 0.75f, true);   // true = access order!
            this.capacity = capacity;
        }

        // Override this to remove eldest when full
        @Override
        protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
            return size() > capacity;
        }
    }

    public static void main(String[] args) {

        LRUCache<Integer, String> cache = new LRUCache<>(3);

        cache.put(1, "One");
        cache.put(2, "Two");
        cache.put(3, "Three");
        System.out.println(cache);   // {1=One, 2=Two, 3=Three}

        // Access key 1 → moves to end
        cache.get(1);
        System.out.println(cache);   // {2=Two, 3=Three, 1=One}

        // Add new element → eldest (2) removed
        cache.put(4, "Four");
        System.out.println(cache);   // {3=Three, 1=One, 4=Four}

        // Access key 3
        cache.get(3);
        System.out.println(cache);   // {1=One, 4=Four, 3=Three}

        // Add another → eldest (1) removed
        cache.put(5, "Five");
        System.out.println(cache);   // {4=Four, 3=Three, 5=Five}
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.15 TreeMap — Red-Black Tree

<a id="2515-treemap-red-black-tree"></a>

### 📌 Sorted Map Implementation

```
TreeMap:
✅ Implements NavigableMap (extends SortedMap)
✅ Uses RED-BLACK TREE (self-balancing BST)
✅ Keys sorted in natural order OR custom Comparator
✅ NO null KEYS allowed
✅ NULL VALUES allowed
✅ All operations: O(log n)
✅ Great for range queries and sorted iteration
```

### 📌 Example

```java
import java.util.*;

public class TreeMapDemo {
    public static void main(String[] args) {

        // ═══ Natural ordering ═══
        TreeMap<String, Integer> map = new TreeMap<>();
        map.put("Rahul", 25);
        map.put("Amit", 30);
        map.put("Priya", 22);
        map.put("Neha", 28);

        System.out.println(map);
        // {Amit=30, Neha=28, Priya=22, Rahul=25} (sorted by key!)

        // ═══ Custom Comparator (reverse) ═══
        TreeMap<String, Integer> desc = new TreeMap<>(Comparator.reverseOrder());
        desc.put("A", 1);
        desc.put("B", 2);
        desc.put("C", 3);
        System.out.println(desc);   // {C=3, B=2, A=1}

        // ═══ First/Last ═══
        TreeMap<Integer, String> numMap = new TreeMap<>();
        numMap.put(10, "Ten");
        numMap.put(20, "Twenty");
        numMap.put(30, "Thirty");
        numMap.put(40, "Forty");

        System.out.println(numMap.firstKey());       // 10
        System.out.println(numMap.lastKey());        // 40
        System.out.println(numMap.firstEntry());     // 10=Ten
        System.out.println(numMap.lastEntry());      // 40=Forty
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.16 TreeMap — NavigableMap Methods

<a id="2516-treemap-navigable-methods"></a>

### 📌 Powerful Range Operations

```java
import java.util.*;

public class NavigableMapDemo {
    public static void main(String[] args) {

        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(10, "A");
        map.put(20, "B");
        map.put(30, "C");
        map.put(40, "D");
        map.put(50, "E");
        map.put(60, "F");

        // ═══ Boundary Access ═══
        System.out.println(map.firstKey());          // 10
        System.out.println(map.lastKey());           // 60
        System.out.println(map.firstEntry());         // 10=A
        System.out.println(map.lastEntry());          // 60=F

        // ═══ Relative Access ═══
        System.out.println(map.floorKey(25));         // 20 (largest <= 25)
        System.out.println(map.ceilingKey(25));       // 30 (smallest >= 25)
        System.out.println(map.lowerKey(30));         // 20 (strictly < 30)
        System.out.println(map.higherKey(30));        // 40 (strictly > 30)

        // Entry versions
        System.out.println(map.floorEntry(25));       // 20=B
        System.out.println(map.ceilingEntry(25));     // 30=C

        // ═══ Poll (get and remove) ═══
        System.out.println(map.pollFirstEntry());     // 10=A (removed)
        System.out.println(map.pollLastEntry());      // 60=F (removed)
        System.out.println(map);                      // {20=B, 30=C, 40=D, 50=E}

        // ═══ Range Views ═══
        // headMap: keys < 40
        SortedMap<Integer, String> head = map.headMap(40);
        System.out.println(head);   // {20=B, 30=C}

        // tailMap: keys >= 30
        SortedMap<Integer, String> tail = map.tailMap(30);
        System.out.println(tail);   // {30=C, 40=D, 50=E}

        // subMap: keys from 20 (inclusive) to 40 (exclusive)
        SortedMap<Integer, String> sub = map.subMap(20, 40);
        System.out.println(sub);   // {20=B, 30=C}

        // ═══ Descending ═══
        NavigableMap<Integer, String> desc = map.descendingMap();
        System.out.println(desc);   // {50=E, 40=D, 30=C, 20=B}

        // Descending key set
        NavigableSet<Integer> descKeys = map.descendingKeySet();
        System.out.println(descKeys);   // [50, 40, 30, 20]
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.17 Hashtable — Legacy

<a id="2517-hashtable-legacy"></a>

### 📌 Old Synchronized Version

```java
import java.util.*;

public class HashtableDemo {
    public static void main(String[] args) {

        // ═══ Hashtable (Legacy) ═══
        Hashtable<String, Integer> ht = new Hashtable<>();
        ht.put("A", 1);
        ht.put("B", 2);
        ht.put("C", 3);

        System.out.println(ht);

        // ═══ Characteristics ═══
        // ✅ Thread-safe (all methods synchronized)
        // ❌ Slower than HashMap
        // ❌ NULL keys or values NOT allowed
        // ❌ Legacy class (Java 1.0)
        // ❌ Considered OBSOLETE

        try {
            ht.put(null, 1);   // ❌ NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Hashtable doesn't allow null keys");
        }

        try {
            ht.put("D", null);   // ❌ NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Hashtable doesn't allow null values");
        }

        // ═══ MODERN ALTERNATIVES ═══
        // For thread safety, use:
        // 1. ConcurrentHashMap (BEST for concurrent)
        // 2. Collections.synchronizedMap(new HashMap<>())
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.18 ConcurrentHashMap ⭐

<a id="2518-concurrenthashmap"></a>

### 📌 Modern Thread-Safe HashMap

```
ConcurrentHashMap:
✅ Thread-safe (better than Hashtable)
✅ HIGH performance in concurrent environment
✅ Uses SEGMENT LOCKING (Java 7)
✅ Uses NODE-LEVEL LOCKING (Java 8+)
✅ NO null keys or values
✅ Fail-safe iterator (no ConcurrentModificationException)

Java 7: Divided into 16 segments, each with own lock
Java 8+: Uses CAS (Compare-And-Swap) + synchronized on Node level
        Only locks the specific bucket, not entire map
        Much more concurrent!
```

### 📌 Example

```java
import java.util.concurrent.*;
import java.util.*;

public class ConcurrentHashMapDemo {
    public static void main(String[] args) {

        // ═══ Basic usage ═══
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // ═══ ATOMIC operations ═══
        // putIfAbsent: atomically add if key absent
        map.putIfAbsent("D", 4);

        // compute: atomic compute
        map.compute("A", (k, v) -> v == null ? 1 : v + 1);

        // computeIfAbsent
        map.computeIfAbsent("E", k -> 5);

        // merge
        map.merge("A", 10, Integer::sum);

        // ═══ THREAD SAFETY ═══
        // Multiple threads can safely modify map
        // NO ConcurrentModificationException

        // ═══ Iteration is FAIL-SAFE ═══
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            map.put("New" + entry.getKey(), 999);   // OK!
            // No exception, but iterator may not see new entries
        }

        // ═══ NULL NOT ALLOWED ═══
        try {
            map.put(null, 1);   // ❌ NullPointerException
        } catch (NullPointerException e) {
            System.out.println("ConcurrentHashMap doesn't allow null");
        }
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.19 HashMap vs Hashtable vs ConcurrentHashMap ⭐⭐

<a id="2519-three-comparison"></a>

### 📌 Complete Comparison

```
┌────────────────────┬──────────────┬──────────────┬────────────────┐
│  Feature           │  HashMap     │  Hashtable   │  Concurrent    │
│                    │              │              │  HashMap       │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Thread-safe       │  ❌ NO       │  ✅ YES      │  ✅ YES        │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Sync level        │  N/A         │  Method      │  Node/Segment  │
│                    │              │  (whole map) │  (partial)     │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Performance       │  FASTEST     │  Slow        │  FAST in       │
│                    │              │  (locks all) │  concurrent    │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Null key          │  ✅ One       │  ❌ No       │  ❌ No         │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Null values       │  ✅ Multiple │  ❌ No       │  ❌ No         │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Iterator          │  Fail-fast   │  Fail-fast   │  Fail-safe     │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Since Java        │  1.2         │  1.0 (legacy)│  1.5           │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Concurrent reads  │  ✅ (unsafe) │  Blocking    │  ✅ FULL       │
├────────────────────┼──────────────┼──────────────┼────────────────┤
│  Modern use        │  Single      │  ❌ Avoid    │  Multi-threaded│
│                    │  threaded    │              │                │
└────────────────────┴──────────────┴──────────────┴────────────────┘
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.20 WeakHashMap & IdentityHashMap

<a id="2520-weak-identity-hashmap"></a>

### 📌 Specialized Maps

```java
import java.util.*;

public class SpecialMapsDemo {
    public static void main(String[] args) {

        // ═══ WeakHashMap ═══
        // Keys are WEAK REFERENCES
        // If key has no strong reference elsewhere, GC can collect it
        // Entry is removed automatically!

        WeakHashMap<String, Integer> weakMap = new WeakHashMap<>();
        String key1 = new String("Key1");   // Strong reference
        weakMap.put(key1, 1);
        weakMap.put(new String("Key2"), 2);   // No strong reference elsewhere

        System.out.println(weakMap.size());   // 2

        key1 = null;   // Remove strong reference
        System.gc();   // Suggest GC

        try { Thread.sleep(100); } catch (Exception e) {}

        System.out.println(weakMap.size());   // Might be 0 (both collected)

        // USE CASE: Cache that shouldn't prevent GC

        // ═══ IdentityHashMap ═══
        // Uses == instead of equals() for comparison
        // Two objects equal ONLY if same reference

        IdentityHashMap<String, Integer> idMap = new IdentityHashMap<>();
        String s1 = new String("Key");
        String s2 = new String("Key");

        idMap.put(s1, 1);
        idMap.put(s2, 2);   // Different object, so different key!

        System.out.println(idMap.size());   // 2 (not 1!)
        System.out.println(s1.equals(s2));   // true
        System.out.println(s1 == s2);        // false

        // In regular HashMap, size would be 1
        // In IdentityHashMap, size is 2 (uses ==)

        // USE CASE: When object identity matters more than equality
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.21 EnumMap

<a id="2521-enummap"></a>

### 📌 Specialized Map for Enum Keys

```java
import java.util.*;

enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumMapDemo {
    public static void main(String[] args) {

        // ═══ EnumMap - VERY FAST for enum keys ═══
        EnumMap<Day, String> schedule = new EnumMap<>(Day.class);

        schedule.put(Day.MONDAY, "Team Meeting");
        schedule.put(Day.WEDNESDAY, "Code Review");
        schedule.put(Day.FRIDAY, "Sprint Demo");

        System.out.println(schedule);
        // {MONDAY=Team Meeting, WEDNESDAY=Code Review, FRIDAY=Sprint Demo}

        // ═══ FEATURES ═══
        // ✅ VERY FAST (uses internal array)
        // ✅ Ordered by enum's natural order
        // ✅ Memory efficient
        // ❌ Keys must be from ONE enum type
        // ❌ NULL keys NOT allowed
        // ✅ NULL values allowed
        // ❌ NOT thread-safe

        // ═══ ORDER is natural enum order ═══
        for (Map.Entry<Day, String> entry : schedule.entrySet()) {
            System.out.println(entry);
            // MONDAY=Team Meeting
            // WEDNESDAY=Code Review
            // FRIDAY=Sprint Demo
        }

        // ═══ Prefer EnumMap over HashMap for enum keys ═══
        // Faster + memory efficient
    }
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

## 25.22 HashMap vs LinkedHashMap vs TreeMap ⭐⭐⭐

<a id="2522-map-comparison"></a>

### 📌 Complete Comparison

```
┌────────────────────┬──────────────┬───────────────┬────────────────┐
│  Feature           │  HashMap     │  LinkedHashMap│  TreeMap       │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Internal Structure│  Hash table  │  Hash table + │  Red-Black Tree│
│                    │              │  Doubly LL    │                │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Order             │  ❌ None     │  Insertion    │  Sorted        │
│                    │              │  or Access    │                │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  get/put/remove    │  O(1)        │  O(1)         │  O(log n)      │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Null keys         │  ✅ One      │  ✅ One       │  ❌ No         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Null values       │  ✅ Yes      │  ✅ Yes       │  ✅ Yes        │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Memory            │  Low         │  Medium       │  High          │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Sorted            │  ❌ No       │  ❌ No        │  ✅ YES        │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Range queries     │  ❌ No       │  ❌ No        │  ✅ YES        │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Thread-safe       │  ❌ No       │  ❌ No        │  ❌ No         │
├────────────────────┼──────────────┼───────────────┼────────────────┤
│  Best for          │  Fast lookup │  Insertion    │  Sorted data,  │
│                    │  (default)   │  order needed │  range queries │
└────────────────────┴──────────────┴───────────────┴────────────────┘

USE HashMap: Default choice (most cases)
USE LinkedHashMap: When insertion/access order matters (LRU cache)
USE TreeMap: When keys must be sorted, need range operations
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

<a id="25-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Map Interface

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Hash-based map      │ HashMap    │ unordered_ │ dict       │ Map/Object │
│                      │            │ map        │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Sorted map          │ TreeMap    │ map        │ N/A        │ N/A       │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Ordered map         │ LinkedHash │ N/A        │ dict (3.7+)│ Map        │
│                      │ Map        │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Thread-safe         │ ✅ Concurr │ ⚠️ Manual  │ ⚠️ Limited │ ❌ No     │
│                      │ HashMap    │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Treeification       │ ✅ Java 8+ │ ❌ No      │ ❌ No      │ ❌ No     │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Range operations    │ ✅ TreeMap │ ✅ map     │ ❌ No      │ ❌ No     │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

<a id="25-interview-questions"></a>

## 💡 Chapter 25 — Interview Questions (20+)

---

**Q1. What is HashMap? Explain its internal working.**

```
HashMap = Hash table implementation storing KEY-VALUE pairs.

INTERNAL STRUCTURE:
- Array of Node<K,V> (called table or buckets)
- Each bucket is a Linked List (or Tree from Java 8+)
- Uses hash function to determine bucket

Node class:
static class Node<K,V> {
    int hash;
    K key;
    V value;
    Node<K,V> next;
}

WORKING:
1. put(K, V): Calculate hash → find bucket → add/update
2. get(K): Calculate hash → find bucket → search
3. Collision handling: Linked List → Tree (8+ elements)

DEFAULTS:
- Initial capacity: 16
- Load factor: 0.75
- Threshold: 12 (16 × 0.75)

Time complexity: O(1) average, O(log n) worst case (Java 8+)
```

---

**Q2. Explain HashMap put() method flow.**

```
put(K, V) FLOW:

Step 1: Calculate hash
hash = hash(key)

Step 2: Calculate bucket index
index = (n - 1) & hash

Step 3: Check if bucket is empty
if table[index] == null:
    Create new Node
    size++
    return null

Step 4: Handle collision
Traverse linked list at bucket[index]:
- If key already exists: update value, return old value
- If not: add new node at end

Step 5: Check treeification
if bucket size > 8 AND capacity >= 64:
    Convert list to Red-Black Tree

Step 6: Check for resize
if size > threshold:
    Resize (double capacity, rehash all)

Step 7: Return
```

---

**Q3. Difference between HashMap and Hashtable?**

```
┌──────────────────┬──────────────┬──────────────┐
│  Feature         │  HashMap     │  Hashtable   │
├──────────────────┼──────────────┼──────────────┤
│  Thread-safe     │  ❌ No       │  ✅ Yes      │
│  Performance     │  FAST        │  Slower      │
│  Null keys       │  ✅ 1 null   │  ❌ No       │
│  Null values     │  ✅ Multiple │  ❌ No       │
│  Iterator        │  Fail-fast   │  Fail-fast   │
│  Since           │  Java 1.2    │  Java 1.0    │
│  Legacy          │  ❌ No       │  ✅ Yes      │
│  Use             │  Default     │  Avoid       │
└──────────────────┴──────────────┴──────────────┘

For thread-safety today, use ConcurrentHashMap!
```

---

**Q4. Difference between HashMap and ConcurrentHashMap?**

```
┌──────────────────┬──────────────┬──────────────────┐
│  Feature         │  HashMap     │  ConcurrentHashMap│
├──────────────────┼──────────────┼──────────────────┤
│  Thread-safe     │  ❌ No       │  ✅ Yes          │
│  Sync level      │  N/A         │  Node level      │
│                  │              │  (Java 8+)       │
│  Performance     │  Fast        │  Fast concurrent │
│  Null keys       │  ✅ Yes      │  ❌ No           │
│  Null values     │  ✅ Yes      │  ❌ No           │
│  Iterator        │  Fail-fast   │  Fail-safe       │
│  ConcurrentMod   │  Throws Exp  │  No exception    │
│  Reads           │  Not safe    │  ✅ Fully safe   │
└──────────────────┴──────────────┴──────────────────┘
```

---

**Q5. Why HashMap doesn't allow duplicate keys?**

```
HashMap uses key's hashCode() and equals() to check uniqueness.

If you put same key twice:
1. Same hash calculated
2. Same bucket index
3. equals() check finds existing key
4. UPDATES value (doesn't add duplicate)

Result: size doesn't increase, value replaced.

Example:
map.put("A", 1);   // Adds
map.put("A", 2);   // Updates (A → 2)
map.size();        // 1 (not 2)
map.get("A");      // 2
```

---

**Q6. Load factor and rehashing in HashMap?**

```
LOAD FACTOR = 0.75 (default)
Determines when to resize

THRESHOLD = capacity × load factor
Default: 16 × 0.75 = 12

REHASHING:
When size > threshold:
1. Create new array with DOUBLE capacity
2. Recalculate hash for all entries
3. Move to new buckets

Growth: 16 → 32 → 64 → 128 → 256 → ...

WHY 0.75?
- Balance between memory and performance
- Optimal trade-off after research
- Java-recommended value
```

---

**Q7. What is treeification in HashMap?**

```
TREEIFICATION (Java 8+):
When bucket has 8+ elements, convert LINKED LIST to RED-BLACK TREE.

THRESHOLDS:
- TREEIFY_THRESHOLD = 8 (list → tree)
- UNTREEIFY_THRESHOLD = 6 (tree → list)
- MIN_TREEIFY_CAPACITY = 64 (min total capacity)

BENEFITS:
✅ O(log n) worst case (was O(n))
✅ Better performance with bad hash
✅ DDoS protection

Applies to: HashMap, HashSet, LinkedHashMap, etc.
```

---

**Q8. TreeMap uses which data structure?**

```
TreeMap uses RED-BLACK TREE.

WHY?
- Self-balancing Binary Search Tree
- Guarantees O(log n) for all operations
- Automatically balances after insertion/deletion

FEATURES:
✅ Keys sorted (natural or custom)
✅ All operations O(log n)
✅ Range operations (headMap, tailMap, subMap)
✅ Navigable methods (floor, ceiling, higher, lower)
❌ No null keys (but null values OK)
❌ Slower than HashMap

Use when:
- Need sorted keys
- Need range queries
- Willing to accept O(log n)
```

---

**Q9. LinkedHashMap for LRU Cache implementation?**

```
LinkedHashMap can maintain ACCESS ORDER:

new LinkedHashMap<>(capacity, loadFactor, ACCESS_ORDER);

If accessOrder = true:
- Recently accessed → moves to end
- Least recently used → at beginning

Override removeEldestEntry() to auto-remove oldest:

class LRUCache<K,V> extends LinkedHashMap<K,V> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);  // Access order!
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
        return size() > capacity;
    }
}

Perfect for LRU Cache implementation!
```

---

**Q10. What is fail-fast vs fail-safe iterator?**

```
FAIL-FAST:
✅ Throws ConcurrentModificationException on modification
✅ Detects unsafe changes during iteration
✅ Used by HashMap, ArrayList, HashSet

FAIL-SAFE:
✅ No exception on modification
✅ Works on COPY/snapshot of data
✅ Used by ConcurrentHashMap, CopyOnWriteArrayList

Example:
// FAIL-FAST
Map<K,V> map = new HashMap<>();
for (Map.Entry<K,V> e : map.entrySet()) {
    map.put("New", 1);   // ConcurrentModificationException!
}

// FAIL-SAFE
Map<K,V> map = new ConcurrentHashMap<>();
for (Map.Entry<K,V> e : map.entrySet()) {
    map.put("New", 1);   // ✅ No exception
}
```

---

**Q11-Q20 covered in code examples above with detailed explanations!**

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

<a id="25-practice-problems"></a>

## 🧪 Chapter 25 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain HashMap internal working in detail with put() flow.

2. Why is HashMap's default capacity 16 and load factor 0.75?

3. Explain treeification in Java 8+ HashMap.

4. Compare HashMap, Hashtable, and ConcurrentHashMap.

5. When would you use LinkedHashMap over HashMap?
   How to implement LRU Cache with LinkedHashMap?
```

### 💻 5 Coding Questions

```java
// Q1: Count word frequency
// Input: "the quick brown fox jumps over the lazy dog the fox"
// Output: {the=3, fox=2, quick=1, brown=1, ...}

import java.util.*;
public class WordFrequency {
    // TODO: Use HashMap
}
```

```java
// Q2: Find first non-repeating character
// Input: "programming"
// Output: 'p'

public class FirstNonRepeating {
    // TODO: Use LinkedHashMap
}
```

```java
// Q3: Group students by grade
// Students: [(A, 90), (B, 85), (C, 90), (D, 85)]
// Output: {90=[A,C], 85=[B,D]}

public class GroupBy {
    // TODO: Use HashMap with List values
}
```

```java
// Q4: Implement LRU Cache
// capacity = 3
// put(1, "one"), put(2, "two"), put(3, "three")
// get(1) → "one"
// put(4, "four") → removes 2 (least recent)

public class LRUCache<K, V> {
    // TODO: Use LinkedHashMap with access order
}
```

```java
// Q5: Sort map by values
// Input: {A=3, B=1, C=2}
// Output: {B=1, C=2, A=3}

public class SortByValues {
    // TODO: Convert to list, sort, put in LinkedHashMap
}
```

<a href="#chapter-index-table-25">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 25 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 25.1  What is Map                                       │
│  ✅ 25.2  Map Methods                                        │
│  ✅ 25.3  Map.Entry Interface                                │
│  ✅ 25.4  Map.of() & Map.ofEntries()                        │
│  ✅ 25.5  HashMap Internal Working                          │
│  ✅ 25.6  HashMap put() Flow                                │
│  ✅ 25.7  HashMap get() Flow                                │
│  ✅ 25.8  HashMap Capacity & Load Factor                    │
│  ✅ 25.9  HashMap Rehashing                                 │
│  ✅ 25.10 HashMap Treeification                             │
│  ✅ 25.11 HashMap Null Handling                             │
│  ✅ 25.12 HashMap Time Complexity                           │
│  ✅ 25.13 LinkedHashMap Insertion Order                     │
│  ✅ 25.14 LinkedHashMap Access Order (LRU)                  │
│  ✅ 25.15 TreeMap Red-Black Tree                            │
│  ✅ 25.16 TreeMap NavigableMap Methods                      │
│  ✅ 25.17 Hashtable Legacy                                  │
│  ✅ 25.18 ConcurrentHashMap                                 │
│  ✅ 25.19 HashMap vs Hashtable vs ConcurrentHashMap         │
│  ✅ 25.20 WeakHashMap & IdentityHashMap                     │
│  ✅ 25.21 EnumMap                                            │
│  ✅ 25.22 HashMap vs LinkedHashMap vs TreeMap               │
│                                                             │
│  ⭐ Next: Queue, Deque & PriorityQueue (Chapter 26)         │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
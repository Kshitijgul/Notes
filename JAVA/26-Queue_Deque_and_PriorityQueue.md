

<a id="26-queue-deque"></a>

# 📘 Chapter 26: Queue, Deque & PriorityQueue

> **Part E: Collection Framework**
> `Core` | `FIFO/LIFO Data Structures` | `Interview Important`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-26"></a>

## 📚 Chapter 26 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 26.1 | [Queue Interface (FIFO)](#261-queue-interface) | First In First Out |
| 26.2 | [Queue Methods](#262-queue-methods) | Throws vs Returns Special |
| 26.3 | [PriorityQueue Binary Heap](#263-priorityqueue-binary-heap) | Internal Structure |
| 26.4 | [PriorityQueue Custom Comparator](#264-priorityqueue-comparator) | Custom Priority |
| 26.5 | [PriorityQueue Time Complexity](#265-priorityqueue-time-complexity) | Big O Analysis |
| 26.6 | [Deque Interface](#266-deque-interface) | Double-Ended Queue |
| 26.7 | [ArrayDeque](#267-arraydeque) | Best for Stack/Queue |
| 26.8 | [LinkedList as Queue/Deque](#268-linkedlist-queue-deque) | Multiple Roles |
| 26.9 | [BlockingQueue](#269-blockingqueue) | Thread-Safe Queue |
| 26.10 | [Producer-Consumer Pattern](#2610-producer-consumer) | Classic Design |
| 🔥 | [Java vs Other Languages](#26-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#26-interview-questions) | 15+ Questions |
| 🧪 | [Practice Problems](#26-practice-problems) | 5 Coding + 5 Theory |

---

## 26.1 Queue Interface (FIFO)

<a id="261-queue-interface"></a>

### 📌 What is Queue?

```
QUEUE INTERFACE = Collection following FIFO principle
                  (First In, First Out)

Real World Analogy:
🚶 People in a queue at movie theater:
   - First person in line = First to buy ticket
   - Last person in line = Last to buy ticket

CHARACTERISTICS:
✅ FIFO ordering (typically)
✅ Elements added at TAIL (rear)
✅ Elements removed from HEAD (front)
✅ Can be bounded or unbounded

IMPLEMENTATIONS:
1. LinkedList     → Basic queue (also implements Deque)
2. PriorityQueue  → Priority-based (min-heap by default)
3. ArrayDeque     → Fast, no capacity restrictions
4. ArrayBlockingQueue → Thread-safe, bounded
5. LinkedBlockingQueue → Thread-safe, optionally bounded
6. PriorityBlockingQueue → Thread-safe priority queue

Package: java.util
Extends: Collection<E>
Sub-interfaces: Deque, BlockingQueue
```

### 📌 Basic Example

```java
import java.util.*;

public class QueueDemo {
    public static void main(String[] args) {

        // Queue is an interface, need concrete class
        Queue<String> queue = new LinkedList<>();

        // ═══ Add elements (at tail) ═══
        queue.offer("Alice");
        queue.offer("Bob");
        queue.offer("Charlie");
        queue.offer("David");

        System.out.println(queue);   // [Alice, Bob, Charlie, David]

        // ═══ View front (head) without removing ═══
        String front = queue.peek();
        System.out.println("Front: " + front);   // Alice

        // ═══ Remove from front (FIFO) ═══
        System.out.println(queue.poll());   // Alice (first in, first out!)
        System.out.println(queue.poll());   // Bob
        System.out.println(queue);          // [Charlie, David]

        // ═══ Size and empty check ═══
        System.out.println(queue.size());       // 2
        System.out.println(queue.isEmpty());    // false

        // ═══ FIFO Order Demonstration ═══
        Queue<Integer> nums = new LinkedList<>();
        for (int i = 1; i <= 5; i++) {
            nums.offer(i);   // Add: 1, 2, 3, 4, 5
        }

        // Removes in same order (FIFO):
        while (!nums.isEmpty()) {
            System.out.print(nums.poll() + " ");   // 1 2 3 4 5
        }
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
QUEUE = LINE / QUEUE waiting for something

🎟️ Cinema Ticket Counter:
   Position 1 → First person → First ticket
   Position 2 → Gets next
   Position 3 → Gets last

FIFO! First come, first serve!

📞 Customer Support Call Queue:
   Call 1 (came first) → Handled first
   Call 2 → Handled next
   Call 3 (came last) → Handled last

🖨️ Print Queue:
   Document 1 sent → Printed first
   Document 2 sent → Printed after
   Document 3 sent → Printed last

Java Queue:
queue.offer("A");   // A enters queue
queue.offer("B");   // B enters queue
queue.offer("C");   // C enters queue

queue.poll();       // A leaves (first in, first out)
queue.poll();       // B leaves
queue.poll();       // C leaves
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.2 Queue Methods

<a id="262-queue-methods"></a>

### 📌 Two Method Groups: Throws vs Returns Special

```
Queue provides TWO forms of each operation:

1. THROWS EXCEPTION (strict version):
   - add(e)       → throws if full
   - remove()     → throws if empty
   - element()    → throws if empty

2. RETURNS SPECIAL VALUE (lenient version):
   - offer(e)     → returns false if full
   - poll()       → returns null if empty
   - peek()       → returns null if empty

RECOMMENDED: Use offer/poll/peek (safer, no exceptions)
```

### 📌 Complete Comparison

```
┌─────────────────┬──────────────────┬──────────────────┐
│  Operation      │  Throws Exception│  Returns Special │
├─────────────────┼──────────────────┼──────────────────┤
│  Insert (tail)  │  add(e)          │  offer(e)        │
│                 │  throws          │  returns false   │
│                 │  IllegalStateExc │  if full         │
├─────────────────┼──────────────────┼──────────────────┤
│  Remove (head)  │  remove()        │  poll()          │
│                 │  throws          │  returns null    │
│                 │  NoSuchElementExc│  if empty        │
├─────────────────┼──────────────────┼──────────────────┤
│  Examine (head) │  element()       │  peek()          │
│                 │  throws          │  returns null    │
│                 │  NoSuchElementExc│  if empty        │
└─────────────────┴──────────────────┴──────────────────┘
```

### 📌 Detailed Example

```java
import java.util.*;

public class QueueMethodsDemo {
    public static void main(String[] args) {

        Queue<Integer> queue = new LinkedList<>();

        // ═══ ADD OPERATIONS ═══

        // Method 1: offer() (recommended)
        boolean added = queue.offer(10);   // Returns true
        queue.offer(20);
        queue.offer(30);
        System.out.println(queue);   // [10, 20, 30]

        // Method 2: add() (throws exception)
        queue.add(40);   // Returns true
        // For bounded queues, throws IllegalStateException if full

        // ═══ VIEW HEAD (without removing) ═══

        // Method 1: peek() (returns null if empty)
        Integer front = queue.peek();
        System.out.println("Peek: " + front);   // 10

        // Method 2: element() (throws exception if empty)
        Integer first = queue.element();
        System.out.println("Element: " + first);   // 10

        // ═══ REMOVE FROM HEAD ═══

        // Method 1: poll() (returns null if empty)
        Integer removed = queue.poll();
        System.out.println("Poll: " + removed);   // 10
        System.out.println(queue);   // [20, 30, 40]

        // Method 2: remove() (throws exception if empty)
        Integer rem = queue.remove();
        System.out.println("Remove: " + rem);   // 20

        // ═══ ON EMPTY QUEUE ═══
        Queue<Integer> empty = new LinkedList<>();

        // Safe methods (return null)
        System.out.println(empty.peek());   // null
        System.out.println(empty.poll());   // null

        // Unsafe methods (throw exceptions)
        try {
            empty.element();   // NoSuchElementException!
        } catch (NoSuchElementException e) {
            System.out.println("element() threw: " + e);
        }

        try {
            empty.remove();   // NoSuchElementException!
        } catch (NoSuchElementException e) {
            System.out.println("remove() threw: " + e);
        }

        // ═══ Standard collection methods ═══
        System.out.println(queue.size());       // 2
        System.out.println(queue.isEmpty());    // false
        System.out.println(queue.contains(30));  // true

        // Iteration
        for (Integer num : queue) {
            System.out.println(num);
        }
    }
}
```

### 📌 When to Use Which?

```
✅ USE offer/poll/peek (recommended):
- Safer (no exceptions)
- Better for bounded queues
- Preferred in production code
- Returns null/false on failure

✅ USE add/remove/element (avoid):
- When you WANT exceptions on failure
- Legacy code compatibility
- Fail-fast behavior needed

BEST PRACTICE:
Always use offer/poll/peek in modern code!
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.3 PriorityQueue — Binary Heap ⭐

<a id="263-priorityqueue-binary-heap"></a>

### 📌 What is PriorityQueue?

```
PriorityQueue:
✅ Elements ordered by PRIORITY (not FIFO!)
✅ Internal structure: BINARY HEAP (Min-Heap by default)
✅ Head is always MINIMUM (natural ordering)
✅ Can use Custom Comparator for different priority
✅ NO null elements allowed
✅ NOT thread-safe

USES:
- Dijkstra's algorithm (shortest path)
- Prim's algorithm (MST)
- Task scheduling by priority
- Top-K problems
- Event simulation
```

### 📌 Binary Heap Structure

```
Min-Heap (Parent ≤ Children):

              1
            /   \
           3     5
          / \   / \
         7   9 8  10

Array representation:
[1, 3, 5, 7, 9, 8, 10]

For node at index i:
- Left child: 2*i + 1
- Right child: 2*i + 2
- Parent: (i-1) / 2

Root (index 0) is always the MINIMUM!
```

### 📌 Basic Example

```java
import java.util.*;

public class PriorityQueueDemo {
    public static void main(String[] args) {

        // ═══ Default: Min-Heap ═══
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        minHeap.offer(30);
        minHeap.offer(10);
        minHeap.offer(50);
        minHeap.offer(20);
        minHeap.offer(40);

        System.out.println(minHeap);   // [10, 20, 50, 30, 40] (heap order)

        // Elements come OUT in ascending order
        System.out.println("--- Removing (ascending order) ---");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " ");   // 10 20 30 40 50
        }

        // ═══ Peek returns SMALLEST ═══
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(50);
        pq.offer(20);
        pq.offer(30);

        System.out.println(pq.peek());   // 20 (minimum)
        // Poll returns and removes minimum
        System.out.println(pq.poll());   // 20
        System.out.println(pq.peek());   // 30

        // ═══ IMPORTANT ═══
        // Iteration order is NOT sorted!
        PriorityQueue<Integer> pq2 = new PriorityQueue<>();
        pq2.addAll(Arrays.asList(5, 3, 8, 1, 4, 9, 2));

        // ❌ Iteration might not be sorted
        for (Integer n : pq2) {
            System.out.print(n + " ");   // Not in sorted order!
        }
        System.out.println();

        // ✅ For sorted access, use poll() in loop
        while (!pq2.isEmpty()) {
            System.out.print(pq2.poll() + " ");   // 1 2 3 4 5 8 9
        }
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.4 PriorityQueue — Custom Comparator

<a id="264-priorityqueue-comparator"></a>

### 📌 Change Priority Logic

```java
import java.util.*;

public class PriorityQueueComparator {
    public static void main(String[] args) {

        // ═══ Max-Heap (largest first) ═══
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.offer(30);
        maxHeap.offer(10);
        maxHeap.offer(50);
        maxHeap.offer(20);

        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");   // 50 30 20 10
        }
        System.out.println();

        // ═══ Custom comparator (by string length) ═══
        PriorityQueue<String> byLength = new PriorityQueue<>(
            (a, b) -> a.length() - b.length()
        );
        byLength.offer("Hello");
        byLength.offer("Hi");
        byLength.offer("World");
        byLength.offer("A");

        while (!byLength.isEmpty()) {
            System.out.println(byLength.poll());
        }
        // Output: A, Hi, Hello, World

        // ═══ Custom class with Comparable ═══
        PriorityQueue<Task> tasks = new PriorityQueue<>();
        tasks.offer(new Task("Task1", 3));
        tasks.offer(new Task("Task2", 1));
        tasks.offer(new Task("Task3", 2));

        while (!tasks.isEmpty()) {
            System.out.println(tasks.poll());
        }
        // Output: Task2 (1), Task3 (2), Task1 (3)

        // ═══ Multi-field sorting ═══
        PriorityQueue<Task> byPriorityThenName = new PriorityQueue<>(
            Comparator.comparingInt((Task t) -> t.priority)
                      .thenComparing(t -> t.name)
        );
    }
}

class Task implements Comparable<Task> {
    String name;
    int priority;

    Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    @Override
    public int compareTo(Task other) {
        return this.priority - other.priority;
    }

    @Override
    public String toString() {
        return name + "(" + priority + ")";
    }
}
```

### 📌 Real-World Example: Task Scheduler

```java
import java.util.*;

class Job {
    String name;
    int priority;   // 1 = highest, 10 = lowest
    long submitTime;

    Job(String name, int priority) {
        this.name = name;
        this.priority = priority;
        this.submitTime = System.currentTimeMillis();
    }

    @Override
    public String toString() {
        return name + "[P:" + priority + "]";
    }
}

public class JobScheduler {
    public static void main(String[] args) {

        // Priority queue sorted by priority (lowest number = highest priority)
        PriorityQueue<Job> jobs = new PriorityQueue<>(
            Comparator.comparingInt((Job j) -> j.priority)
                      .thenComparingLong(j -> j.submitTime)
        );

        jobs.offer(new Job("SendEmail", 5));
        jobs.offer(new Job("CriticalAlert", 1));
        jobs.offer(new Job("BackupData", 8));
        jobs.offer(new Job("SendReport", 3));

        System.out.println("Processing jobs:");
        while (!jobs.isEmpty()) {
            Job job = jobs.poll();
            System.out.println("Executing: " + job);
        }

        // Output:
        // CriticalAlert[P:1]
        // SendReport[P:3]
        // SendEmail[P:5]
        // BackupData[P:8]
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.5 PriorityQueue — Time Complexity

<a id="265-priorityqueue-time-complexity"></a>

### 📌 Big O Analysis

```
┌──────────────────────┬───────────────┬────────────────────┐
│  Operation           │  Time         │  Explanation       │
├──────────────────────┼───────────────┼────────────────────┤
│  offer(e) / add(e)   │  O(log n)     │  Heap sift-up      │
├──────────────────────┼───────────────┼────────────────────┤
│  poll() / remove()   │  O(log n)     │  Heap sift-down    │
├──────────────────────┼───────────────┼────────────────────┤
│  peek() / element()  │  O(1)         │  Root access       │
├──────────────────────┼───────────────┼────────────────────┤
│  size() / isEmpty()  │  O(1)         │  Just field check  │
├──────────────────────┼───────────────┼────────────────────┤
│  contains(o)         │  O(n)         │  Linear search     │
├──────────────────────┼───────────────┼────────────────────┤
│  remove(Object)      │  O(n)         │  Linear search     │
└──────────────────────┴───────────────┴────────────────────┘
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.6 Deque Interface

<a id="266-deque-interface"></a>

### 📌 Double-Ended Queue

```
DEQUE = "Double-Ended Queue" (pronounced "deck")

Can add/remove from BOTH ends:
- Add to front
- Add to back
- Remove from front
- Remove from back

USES:
- Stack (LIFO)
- Queue (FIFO)
- Both simultaneously

Extends: Queue interface
Implementations:
1. ArrayDeque    → Best (resizable array)
2. LinkedList    → Also implements Deque
```

### 📌 Deque Methods

```
┌────────────────────────┬────────────────────┬────────────────────┐
│  Operation             │  Throws Exception  │  Returns Special   │
├────────────────────────┼────────────────────┼────────────────────┤
│  Insert first          │  addFirst(e)       │  offerFirst(e)     │
│  Insert last           │  addLast(e)        │  offerLast(e)      │
│  Remove first          │  removeFirst()     │  pollFirst()       │
│  Remove last           │  removeLast()      │  pollLast()        │
│  Examine first         │  getFirst()        │  peekFirst()       │
│  Examine last          │  getLast()         │  peekLast()        │
└────────────────────────┴────────────────────┴────────────────────┘

STACK METHODS (LIFO):
- push(e)    → same as addFirst(e)
- pop()      → same as removeFirst()
- peek()     → same as peekFirst()
```

### 📌 Example

```java
import java.util.*;

public class DequeDemo {
    public static void main(String[] args) {

        Deque<Integer> deque = new ArrayDeque<>();

        // ═══ Add to both ends ═══
        deque.addLast(1);        // [1]
        deque.addLast(2);        // [1, 2]
        deque.addLast(3);        // [1, 2, 3]
        deque.addFirst(0);       // [0, 1, 2, 3]
        deque.addFirst(-1);      // [-1, 0, 1, 2, 3]

        System.out.println(deque);

        // ═══ View both ends ═══
        System.out.println(deque.peekFirst());   // -1
        System.out.println(deque.peekLast());    // 3

        // ═══ Remove from both ends ═══
        System.out.println(deque.pollFirst());   // -1
        System.out.println(deque.pollLast());    // 3
        System.out.println(deque);   // [0, 1, 2]

        // ═══ Use as STACK (LIFO) ═══
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        System.out.println(stack.pop());   // 3 (LIFO)
        System.out.println(stack.pop());   // 2
        System.out.println(stack.pop());   // 1

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

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.7 ArrayDeque

<a id="267-arraydeque"></a>

### 📌 The Best Deque Implementation

```
ArrayDeque:
✅ Resizable ARRAY-based Deque
✅ Faster than LinkedList
✅ Faster than Stack (legacy)
✅ NOT thread-safe
✅ NO null elements
✅ No capacity restrictions (grows as needed)

RECOMMENDED FOR:
- Stack implementation (use push/pop)
- Queue implementation (use offer/poll)
- Deque operations

WHY BETTER THAN STACK?
✅ Not synchronized (faster)
✅ Cleaner API
✅ Better performance
✅ Recommended by Java docs!
```

### 📌 ArrayDeque as Stack

```java
import java.util.*;

public class ArrayDequeAsStack {
    public static void main(String[] args) {

        // ═══ MODERN way to use Stack ═══
        Deque<Integer> stack = new ArrayDeque<>();

        // Push (LIFO)
        stack.push(1);   // [1]
        stack.push(2);   // [2, 1]  ← top is at front
        stack.push(3);   // [3, 2, 1]

        // Peek at top
        System.out.println(stack.peek());   // 3

        // Pop from top (LIFO)
        System.out.println(stack.pop());   // 3
        System.out.println(stack.pop());   // 2
        System.out.println(stack.pop());   // 1

        // ═══ OLD way (avoid!) ═══
        Stack<Integer> oldStack = new Stack<>();
        oldStack.push(1);
        oldStack.push(2);
        oldStack.pop();
        // Slower + synchronized unnecessarily + legacy
    }
}
```

### 📌 ArrayDeque as Queue

```java
public class ArrayDequeAsQueue {
    public static void main(String[] args) {

        Deque<String> queue = new ArrayDeque<>();

        // Add (FIFO)
        queue.offer("Alice");
        queue.offer("Bob");
        queue.offer("Charlie");

        // Poll (FIFO)
        System.out.println(queue.poll());   // Alice
        System.out.println(queue.poll());   // Bob
        System.out.println(queue.poll());   // Charlie

        // ═══ ArrayDeque is BEST for both Stack and Queue ═══
        // Better than LinkedList for both use cases!
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.8 LinkedList as Queue/Deque

<a id="268-linkedlist-queue-deque"></a>

### 📌 LinkedList Multiple Roles

```
LinkedList implements THREE interfaces:
✅ List<E>
✅ Queue<E>
✅ Deque<E>

Same class, different personalities!

WHEN TO USE LinkedList over ArrayDeque?
✅ Need List operations too (get by index)
✅ Otherwise prefer ArrayDeque (faster)
```

### 📌 Example

```java
import java.util.*;

public class LinkedListQueueDeque {
    public static void main(String[] args) {

        // ═══ As Queue ═══
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println(queue.poll());   // 1

        // ═══ As Deque ═══
        Deque<Integer> deque = new LinkedList<>();
        deque.addFirst(1);
        deque.addLast(2);
        deque.addFirst(0);
        System.out.println(deque);   // [0, 1, 2]

        // ═══ As List (get by index) ═══
        LinkedList<Integer> list = new LinkedList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        System.out.println(list.get(1));   // 2 (index-based)

        // Combined use
        LinkedList<Integer> multi = new LinkedList<>();
        multi.addFirst(1);   // As Deque
        multi.offer(2);      // As Queue
        multi.add(3);        // As List
        multi.get(0);        // As List
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.9 BlockingQueue (Multithreading Preview)

<a id="269-blockingqueue"></a>

### 📌 Thread-Safe Queue

```
BlockingQueue = Queue that supports operations that:
                WAIT for the queue to become non-empty (removing)
                WAIT for space to become available (inserting)

USED FOR: Multi-threaded Producer-Consumer scenarios

IMPLEMENTATIONS:
1. ArrayBlockingQueue    → Bounded, array-backed
2. LinkedBlockingQueue   → Optionally bounded
3. PriorityBlockingQueue → Priority-based, unbounded
4. SynchronousQueue      → No storage, direct handoff
5. DelayQueue            → Elements with delay
```

### 📌 Method Groups

```
┌────────────────────┬──────────────┬──────────────┬──────────────┐
│  Operation         │  Special     │  Blocks      │  Timeout     │
│                    │  Value       │              │              │
├────────────────────┼──────────────┼──────────────┼──────────────┤
│  Insert            │  offer(e)    │  put(e)      │  offer(e,t)  │
│                    │  returns     │  WAITS       │  waits until │
│                    │  false if    │  until space │  timeout     │
│                    │  full        │              │              │
├────────────────────┼──────────────┼──────────────┼──────────────┤
│  Remove            │  poll()      │  take()      │  poll(t)     │
│                    │  returns null│  WAITS       │  waits until │
│                    │  if empty    │  until data  │  timeout     │
└────────────────────┴──────────────┴──────────────┴──────────────┘
```

### 📌 Example

```java
import java.util.concurrent.*;

public class BlockingQueueDemo {
    public static void main(String[] args) throws InterruptedException {

        // ═══ Bounded queue (capacity = 3) ═══
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(3);

        queue.offer(1);
        queue.offer(2);
        queue.offer(3);

        // Try to add when full
        boolean added = queue.offer(4);   // Returns false (full)
        System.out.println("Added 4? " + added);

        // ═══ Blocking put (waits if full) ═══
        // Only in another thread!
        // queue.put(4);   // BLOCKS until space available

        // ═══ Blocking take (waits if empty) ═══
        System.out.println(queue.take());   // 1
        System.out.println(queue.take());   // 2

        // ═══ Timeout versions ═══
        queue.offer(5, 1, TimeUnit.SECONDS);   // Wait up to 1 second
        queue.poll(1, TimeUnit.SECONDS);        // Wait up to 1 second
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

## 26.10 Producer-Consumer Pattern

<a id="2610-producer-consumer"></a>

### 📌 Classic Multithreading Pattern

```
PRODUCER-CONSUMER:
- Producer thread creates data
- Consumer thread processes data
- Communicate via shared queue
- Producer waits when queue is full
- Consumer waits when queue is empty

PERFECT USE CASE for BlockingQueue!
```

### 📌 Complete Example

```java
import java.util.concurrent.*;

public class ProducerConsumerDemo {

    public static void main(String[] args) {

        // Shared queue (bounded)
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

        // ═══ Producer thread ═══
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    queue.put(i);   // Blocks if queue full
                    System.out.println("Produced: " + i);
                    Thread.sleep(500);   // Simulate work
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // ═══ Consumer thread ═══
        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    Integer value = queue.take();   // Blocks if empty
                    System.out.println("Consumed: " + value);
                    Thread.sleep(1000);   // Slower than producer
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();

        // Program shows how queue naturally regulates flow!
        // Producer waits when queue full
        // Consumer waits when queue empty
    }
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

<a id="26-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Queue/Deque

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Queue interface     │ Queue      │ queue      │ Queue      │ Array      │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Deque               │ ArrayDeque │ deque      │ collections│ Array      │
│                      │            │            │ .deque     │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Priority Queue      │ Priority   │ priority_  │ heapq      │ Manual     │
│                      │ Queue      │ queue      │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Blocking queue      │ ✅ Yes     │ ⚠️ Manual  │ ✅ queue   │ ❌ No      │
│                      │            │            │ .Queue     │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Two method groups   │ ✅ Yes     │ ❌ No      │ ❌ No      │ ❌ No      │
│  (throws vs return)  │            │            │            │            │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

<a id="26-interview-questions"></a>

## 💡 Chapter 26 — Interview Questions (15+)

---

**Q1. What is Queue? What's FIFO?**

```
QUEUE = Collection following FIFO (First In, First Out).

Real-world: Movie ticket queue
- First person in line → gets first ticket
- Last person in line → gets last ticket

CHARACTERISTICS:
✅ Elements added at TAIL
✅ Elements removed from HEAD
✅ FIFO order (typically)

IMPLEMENTATIONS:
- LinkedList (also Deque)
- PriorityQueue (priority-based)
- ArrayDeque (recommended for pure queue)
- BlockingQueue (thread-safe)

Example:
Queue<Integer> q = new LinkedList<>();
q.offer(1); q.offer(2); q.offer(3);
q.poll();   // 1 (FIFO)
q.poll();   // 2
q.poll();   // 3
```

---

**Q2. Difference between offer/add, poll/remove, peek/element?**

```
Queue has TWO method groups:

THROWS EXCEPTION (strict):
- add(e)      → IllegalStateException if full
- remove()    → NoSuchElementException if empty
- element()   → NoSuchElementException if empty

RETURNS SPECIAL VALUE (safe):
- offer(e)    → returns false if full
- poll()      → returns null if empty
- peek()      → returns null if empty

RECOMMENDED: Use offer/poll/peek (safer!)

Example:
Queue<Integer> q = new LinkedList<>();
q.offer(1);       // ✅ Returns true
q.poll();         // ✅ Returns 1
q.poll();         // ✅ Returns null (safe)

// vs

q.remove();       // ❌ Throws NoSuchElementException!
```

---

**Q3. What is PriorityQueue? How does it work?**

```
PriorityQueue = Queue ordered by PRIORITY (not FIFO)

INTERNAL: BINARY HEAP (Min-Heap by default)

Structure (Min-Heap):
       1
      / \
     3   5
    / \  |
   7  9  8

Root = smallest element

OPERATIONS:
- offer(e): O(log n) - sift up
- poll(): O(log n) - sift down
- peek(): O(1) - just root

BY DEFAULT: Natural ordering (min-heap)
Can use Comparator for custom ordering.

USES:
- Dijkstra's shortest path
- Prim's MST
- Task scheduling
- Top-K problems
- Event simulation

Example:
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3); pq.offer(1); pq.offer(2);
pq.poll();   // 1 (smallest!)
pq.poll();   // 2
pq.poll();   // 3

Max-Heap:
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Comparator.reverseOrder());
```

---

**Q4. What is Deque? Difference from Queue?**

```
DEQUE = Double-Ended Queue

Can add/remove from BOTH ends:
- Add to front
- Add to back
- Remove from front
- Remove from back

Can be used as:
✅ Queue (FIFO)
✅ Stack (LIFO)
✅ Both simultaneously

QUEUE vs DEQUE:
Queue: Add tail, Remove head (FIFO only)
Deque: Add/remove BOTH ends

IMPLEMENTATIONS:
- ArrayDeque (recommended!)
- LinkedList

Example:
Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(1);      // [1]
deque.addLast(2);       // [1, 2]
deque.addFirst(0);      // [0, 1, 2]

deque.pollFirst();      // 0
deque.pollLast();       // 2

// As Stack
deque.push(10);
deque.push(20);
deque.pop();            // 20 (LIFO)

// As Queue
deque.offer(30);
deque.offer(40);
deque.poll();            // First added
```

---

**Q5. ArrayDeque vs Stack?**

```
STACK (Legacy) vs ArrayDeque (Modern):

┌────────────────────┬──────────────┬──────────────┐
│  Feature           │  Stack       │  ArrayDeque  │
├────────────────────┼──────────────┼──────────────┤
│  Introduced        │  Java 1.0    │  Java 1.6    │
│  Synchronized      │  ✅ Yes      │  ❌ No       │
│  Performance       │  Slower      │  FASTER      │
│  Legacy            │  ✅ Yes      │  ❌ No       │
│  Recommended       │  ❌ Avoid    │  ✅ USE      │
│  Extends           │  Vector      │  AbstractCol│
└────────────────────┴──────────────┴──────────────┘

Java docs officially recommends ArrayDeque over Stack!

// ❌ AVOID (legacy)
Stack<Integer> stack = new Stack<>();

// ✅ USE (modern)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
stack.pop();   // 2
```

---

**Q6. What is BlockingQueue?**

```
BlockingQueue = Thread-safe queue that BLOCKS on:
- put() when queue is FULL
- take() when queue is EMPTY

USED FOR: Producer-Consumer patterns in multithreading

METHOD GROUPS:
1. offer/poll → returns special value
2. add/remove → throws exception
3. put/take → BLOCKS (waits)
4. offer(t)/poll(t) → wait with timeout

IMPLEMENTATIONS:
- ArrayBlockingQueue (bounded)
- LinkedBlockingQueue (optionally bounded)
- PriorityBlockingQueue
- SynchronousQueue
- DelayQueue

Example:
BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

// Producer
queue.put(1);   // Blocks if full

// Consumer
Integer val = queue.take();   // Blocks if empty
```

---

**Q7. Explain Producer-Consumer pattern.**

```
PRODUCER-CONSUMER:
- Producer thread creates data
- Consumer thread processes data
- Shared queue between them
- Producer WAITS when queue is full
- Consumer WAITS when queue is empty

Implementation using BlockingQueue:

BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

// Producer
Thread producer = new Thread(() -> {
    try {
        for (int i = 0; i < 100; i++) {
            queue.put(i);   // BLOCKS if full
            System.out.println("Produced: " + i);
        }
    } catch (InterruptedException e) { }
});

// Consumer
Thread consumer = new Thread(() -> {
    try {
        while (true) {
            int val = queue.take();   // BLOCKS if empty
            System.out.println("Consumed: " + val);
        }
    } catch (InterruptedException e) { }
});

producer.start();
consumer.start();

BENEFITS:
✅ Thread-safe
✅ Automatic flow control
✅ No explicit synchronization needed
```

---

### 🔴 Output-Based Questions

**Q8. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println(queue.poll());
        System.out.println(queue.peek());
        System.out.println(queue);
    }
}
```

```
OUTPUT:
1
2
[2, 3]

REASON:
- offer adds at tail: [1, 2, 3]
- poll removes head: returns 1, queue = [2, 3]
- peek shows head: 2 (doesn't remove)
```

---

**Q9. What is the output?**

```java
import java.util.*;
public class Test {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(30);
        pq.offer(10);
        pq.offer(20);
        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " ");
        }
    }
}
```

```
OUTPUT: 10 20 30

REASON:
PriorityQueue is Min-Heap by default.
Elements come out in ASCENDING order (smallest first).
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

<a id="26-practice-problems"></a>

## 🧪 Chapter 26 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain Queue interface and FIFO with real-world example.

2. Compare Queue and Deque interfaces. When would you use each?

3. Explain PriorityQueue with Binary Heap structure.
   How does custom comparator work?

4. Why is ArrayDeque preferred over Stack? Give examples.

5. Explain BlockingQueue and Producer-Consumer pattern
   with complete code example.
```

### 💻 5 Coding Questions

```java
// Q1: Find Top K largest elements
// Input: [3, 2, 1, 5, 6, 4], k = 2
// Output: [5, 6]

import java.util.*;
public class TopK {
    // TODO: Use PriorityQueue
}
```

```java
// Q2: Reverse a queue
// Input: [1, 2, 3, 4, 5]
// Output: [5, 4, 3, 2, 1]

public class ReverseQueue {
    // TODO: Use Stack or Deque
}
```

```java
// Q3: Implement Stack using Queue
// push, pop, peek, empty operations

public class StackUsingQueue {
    // TODO: Use one or two queues
}
```

```java
// Q4: Task Scheduler with priorities
// Tasks have priority (1-5, 1 = highest)
// Process in priority order

public class TaskScheduler {
    // TODO: Use PriorityQueue with custom comparator
}
```

```java
// Q5: Sliding Window Maximum
// arr = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

public class SlidingWindow {
    // TODO: Use Deque for O(n) solution
}
```

<a href="#chapter-index-table-26">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 26 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 26.1  Queue Interface (FIFO)                            │
│  ✅ 26.2  Queue Methods (throws vs returns)                 │
│  ✅ 26.3  PriorityQueue - Binary Heap                       │
│  ✅ 26.4  PriorityQueue - Custom Comparator                 │
│  ✅ 26.5  PriorityQueue - Time Complexity                   │
│  ✅ 26.6  Deque Interface                                    │
│  ✅ 26.7  ArrayDeque                                         │
│  ✅ 26.8  LinkedList as Queue/Deque                         │
│  ✅ 26.9  BlockingQueue                                      │
│  ✅ 26.10 Producer-Consumer Pattern                          │
│  ✅ 🔥    Java vs Others                                    │
│  ✅ 9+    Interview Questions                                │
│  ✅ 5     Theory + 5 Coding Problems                         │
│                                                             │
│  ⭐ Next: Iterator & Generics (Chapter 27)                  │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
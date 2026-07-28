

<a id="20-inner-classes"></a>

# 📘 Chapter 20: Inner Classes & Anonymous Classes

> **Part C: Object Oriented Programming (Core Java)**
> `Advanced OOP` | `Nested Classes` | `Interview Important`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-20"></a>

## 📚 Chapter 20 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 20.1 | [Types of Nested Classes](#201-types-of-nested-classes) | 4 Types Overview |
| 20.2 | [Inner Class (Non-static)](#202-inner-class) | Regular Inner Class |
| 20.3 | [Accessing Outer Class Members](#203-accessing-outer-class-members) | Access Rules |
| 20.4 | [Static Nested Class](#204-static-nested-class) | Independent Nested Class |
| 20.5 | [Local Inner Class](#205-local-inner-class) | Class Inside Method |
| 20.6 | [Anonymous Inner Class](#206-anonymous-inner-class) | Class Without Name |
| 20.7 | [Anonymous Class vs Lambda](#207-anonymous-class-vs-lambda) | Modern Alternative |
| 20.8 | [Use Cases](#208-use-cases) | When to Use Which |
| 🔥 | [Java vs Other Languages](#20-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#20-interview-questions) | 15+ Conceptual · Scenario · Output-based |
| 🧪 | [Practice Problems](#20-practice-problems) | 5 Coding + 5 Theory |

---

## 20.1 Types of Nested Classes

<a id="201-types-of-nested-classes"></a>

### 📌 What are Nested Classes?

```
NESTED CLASSES = Classes defined INSIDE another class.

Java allows classes to be nested inside:
→ Another class
→ A method
→ A block

BENEFITS:
✅ Logical grouping (helper classes)
✅ Increased encapsulation
✅ Cleaner code organization
✅ Access to outer class members
```

### 📌 4 Types of Nested Classes

```
┌──────────────────────────────────────────────────────────────┐
│                    NESTED CLASSES                            │
│                          │                                   │
│           ┌──────────────┼──────────────┐                    │
│           │              │              │                    │
│           ▼              ▼              ▼                    │
│      NON-STATIC       STATIC        SPECIAL                  │
│           │              │              │                    │
│           ▼              ▼              ▼                    │
│      Inner Class    Static Nested  Local & Anonymous         │
│     (Non-static)      Class          Inner Classes           │
└──────────────────────────────────────────────────────────────┘

1. INNER CLASS (Non-static)
   → Regular class inside another class
   → Access to outer class instance members

2. STATIC NESTED CLASS
   → Class with 'static' keyword inside another class
   → Only access to outer class STATIC members

3. LOCAL INNER CLASS
   → Class defined inside a METHOD or block
   → Very limited scope

4. ANONYMOUS INNER CLASS
   → Class without a name
   → Created and instantiated in ONE statement
   → Used for interface/abstract class implementation
```

### 📌 Overview Example

```java
public class OuterClass {

    int outerField = 100;
    static int staticField = 200;

    // ═══ 1. Inner Class (non-static) ═══
    class Inner {
        void show() {
            System.out.println("Inner class");
            System.out.println(outerField);   // ✅ Access instance
            System.out.println(staticField);  // ✅ Access static
        }
    }

    // ═══ 2. Static Nested Class ═══
    static class StaticNested {
        void show() {
            System.out.println("Static nested class");
            // System.out.println(outerField);   // ❌ ERROR!
            System.out.println(staticField);      // ✅ OK
        }
    }

    // ═══ 3. Local Inner Class (in method) ═══
    void method() {
        class LocalInner {
            void show() {
                System.out.println("Local inner class");
            }
        }
        LocalInner obj = new LocalInner();
        obj.show();
    }

    // ═══ 4. Anonymous Inner Class ═══
    Runnable r = new Runnable() {
        @Override
        public void run() {
            System.out.println("Anonymous class");
        }
    };
}
```

### 🌍 Real-World Analogy (Hinglish)

```
NESTED CLASSES = Nested rooms in a HOUSE

🏠 HOUSE (Outer class)
   ├── 🛋️  LIVING ROOM (Inner class)
   │       → Part of house, can access all house features
   │       → Cannot exist without house
   │
   ├── 🏢 GUEST HOUSE (Static nested class)
   │       → Separate but on same property
   │       → Can exist independently
   │       → Doesn't need main house
   │
   ├── 📦 STORAGE ROOM in a KITCHEN (Local inner)
   │       → Exists only inside kitchen
   │       → Cannot access it from outside kitchen
   │
   └── 🎪 TEMPORARY TENT for a party (Anonymous)
           → Set up for one event only
           → Used once, then removed
           → No permanent name

Har type ka apna purpose hai!
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.2 Inner Class (Non-static)

<a id="202-inner-class"></a>

### 📌 Regular Inner Class

```
INNER CLASS (Non-static Nested Class):
→ Class defined INSIDE another class (without static)
→ TIGHTLY COUPLED with outer class
→ Needs outer class INSTANCE to be created
→ Can access ALL outer class members (static + instance)
→ Each inner class instance is associated with ONE outer instance
```

### 📌 Complete Example

```java
public class OuterClass {

    private String outerName = "Outer";
    private int outerValue = 100;

    // ═══ Inner class (non-static) ═══
    class InnerClass {

        private String innerName = "Inner";

        void display() {
            System.out.println("Outer name: " + outerName);   // ✅ Access outer instance var
            System.out.println("Outer value: " + outerValue); // ✅ Access outer instance var
            System.out.println("Inner name: " + innerName);
        }
    }

    // Method that creates inner class instance
    void createInner() {
        InnerClass inner = new InnerClass();
        inner.display();
    }

    public static void main(String[] args) {

        // ═══ Method 1: Via outer method ═══
        OuterClass outer = new OuterClass();
        outer.createInner();

        // ═══ Method 2: Directly from main (needs outer instance!) ═══
        OuterClass outer2 = new OuterClass();
        OuterClass.InnerClass inner = outer2.new InnerClass();
        //                            ^^^^^^^^^^^^
        //                            Special syntax!
        inner.display();
    }
}

/*
Output:
Outer name: Outer
Outer value: 100
Inner name: Inner
Outer name: Outer
Outer value: 100
Inner name: Inner
*/
```

### 📌 Key Points

```
✅ Inner class HAS ACCESS to:
   → ALL outer class members (private, public, static, instance)
   → Even private members!

✅ Inner class INSTANCE:
   → Bound to ONE outer class instance
   → Cannot exist without outer instance

✅ Compiler generates:
   → OuterClass$InnerClass.class file

✅ Multiple inner instances per outer:
   → Each has own state
   → All share the same outer reference
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.3 Accessing Outer Class Members

<a id="203-accessing-outer-class-members"></a>

### 📌 Full Access to Outer Class

```java
public class OuterClass {

    private int x = 10;             // Private instance variable
    private static int y = 20;      // Private static variable

    private void privateMethod() {
        System.out.println("Private method");
    }

    // Inner class
    class InnerClass {

        private int x = 100;         // Same name as outer's x

        void display() {
            System.out.println(x);              // 100 (inner's x)
            System.out.println(this.x);          // 100 (inner's x)
            System.out.println(OuterClass.this.x); // 10 (outer's x) ← Special syntax!

            System.out.println(y);               // ✅ OK (static)
            privateMethod();                     // ✅ OK (access outer's private!)
        }
    }

    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        InnerClass inner = outer.new InnerClass();
        inner.display();
    }
}

/*
Output:
100
100
10
20
Private method
*/
```

### 📌 Referencing Outer 'this'

```java
class Outer {
    int x = 10;

    class Inner {
        int x = 20;

        void show() {
            int x = 30;           // Local variable
            System.out.println(x);              // 30 (local)
            System.out.println(this.x);          // 20 (Inner's this)
            System.out.println(Outer.this.x);    // 10 (Outer's this)
        }
    }

    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.show();
    }
}
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.4 Static Nested Class

<a id="204-static-nested-class"></a>

### 📌 Independent Nested Class

```
STATIC NESTED CLASS:
→ Class declared with 'static' keyword inside another class
→ Does NOT need outer class instance
→ Can ONLY access outer class STATIC members
→ Behaves like top-level class (but organized inside another)
→ More restricted than inner class

Object creation:
OuterClass.StaticNested obj = new OuterClass.StaticNested();
// NO need for outer instance!
```

### 📌 Complete Example

```java
public class OuterClass {

    int instanceVar = 100;           // Instance variable
    static int staticVar = 200;      // Static variable

    void instanceMethod() {
        System.out.println("Instance method");
    }

    static void staticMethod() {
        System.out.println("Static method");
    }

    // ═══ STATIC NESTED CLASS ═══
    static class StaticNested {

        void display() {
            // ❌ CANNOT access instance members directly
            // System.out.println(instanceVar);   // ERROR!
            // instanceMethod();                    // ERROR!

            // ✅ CAN access static members
            System.out.println(staticVar);      // OK
            staticMethod();                       // OK

            // ✅ CAN access instance via object
            OuterClass outer = new OuterClass();
            System.out.println(outer.instanceVar);   // OK
            outer.instanceMethod();                  // OK
        }
    }

    public static void main(String[] args) {

        // Create static nested class WITHOUT outer instance!
        OuterClass.StaticNested nested = new OuterClass.StaticNested();
        nested.display();
    }
}
```

### 📌 Real-World Example — Map.Entry

```java
// Standard Java Library uses static nested class:
Map<String, Integer> map = new HashMap<>();

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    // Map.Entry is a STATIC NESTED interface/class
    System.out.println(entry.getKey() + "=" + entry.getValue());
}

// Similarly, Node in LinkedList:
class LinkedList<E> {
    private static class Node<E> {   // Static nested class
        E data;
        Node<E> next;
        // ...
    }
}
// Node doesn't need LinkedList instance to be defined
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.5 Local Inner Class

<a id="205-local-inner-class"></a>

### 📌 Class Inside a Method

```
LOCAL INNER CLASS:
→ Class defined INSIDE a METHOD or BLOCK
→ Very LIMITED scope (only within the method)
→ Cannot use access modifiers (public, private, etc.)
→ CAN access final and effectively final local variables
→ CAN access outer class members
```

### 📌 Basic Example

```java
public class OuterClass {

    private String name = "Outer";

    void method() {

        int localVar = 10;   // Effectively final (not modified)

        // ═══ LOCAL INNER CLASS ═══
        class LocalInner {

            void display() {
                System.out.println("Outer name: " + name);         // ✅ Outer member
                System.out.println("Local var: " + localVar);      // ✅ Effectively final
            }
        }

        // Class can only be used INSIDE this method
        LocalInner obj = new LocalInner();
        obj.display();
    }

    // ❌ Cannot use LocalInner here (outside its method)
    // LocalInner obj = new LocalInner();  // ERROR!

    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        outer.method();
    }
}

/*
Output:
Outer name: Outer
Local var: 10
*/
```

### 📌 Rules for Local Inner Class

```
✅ CAN access:
   → Outer class members (static + instance)
   → Local variables (must be final or effectively final)
   → Method parameters (must be effectively final)

❌ CANNOT:
   → Use access modifiers (public, private, protected)
   → Have static members (except constants)
   → Be used outside the method where defined

✅ CAN:
   → Implement interfaces
   → Extend classes
```

### 📌 Effectively Final Variables

```java
public class Test {

    void method() {

        int x = 10;   // Effectively final (not modified after assignment)
        // int y = 20;  y = 30;  // NOT effectively final (modified)

        class LocalClass {
            void show() {
                System.out.println(x);   // ✅ OK - effectively final
                // System.out.println(y);  // ❌ ERROR if y was modified
            }
        }

        // x = 20;   // If uncommented, LocalClass wouldn't compile

        new LocalClass().show();
    }
}
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.6 Anonymous Inner Class ⭐

<a id="206-anonymous-inner-class"></a>

### 📌 Class Without a Name

```
ANONYMOUS INNER CLASS:
→ Inner class WITHOUT a name
→ Created and instantiated in ONE statement
→ Used for ONE-TIME use
→ Typically implements interface or extends class

SYNTAX:
new ClassOrInterface() {
    // Override methods
    // Or add new members
};

USES:
✅ Event handlers (GUI)
✅ Thread creation (Runnable)
✅ Callbacks
✅ Interface implementation for one-time use
```

### 📌 Anonymous Class Extending a Class

```java
class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

public class AnonymousDemo {
    public static void main(String[] args) {

        // ═══ Anonymous class extending Animal ═══
        Animal dog = new Animal() {   // ← Curly braces after ()

            @Override
            void sound() {
                System.out.println("Woof! Woof!");
            }
        };

        dog.sound();   // "Woof! Woof!"

        // dog is an INSTANCE of anonymous subclass of Animal
        // The subclass has no name!
    }
}
```

### 📌 Anonymous Class Implementing Interface

```java
interface Greeting {
    void sayHello();
}

public class AnonymousInterfaceDemo {
    public static void main(String[] args) {

        // ═══ Anonymous class implementing interface ═══
        Greeting g = new Greeting() {

            @Override
            public void sayHello() {
                System.out.println("Hello from anonymous class!");
            }
        };

        g.sayHello();
    }
}
```

### 📌 Common Use — Runnable

```java
public class AnonymousRunnable {
    public static void main(String[] args) {

        // ═══ Anonymous Runnable ═══
        Thread t = new Thread(new Runnable() {

            @Override
            public void run() {
                System.out.println("Thread running from anonymous class");
            }
        });

        t.start();

        // ═══ MODERN way (Lambda, Java 8+): ═══
        Thread t2 = new Thread(() -> System.out.println("Thread with lambda"));
        t2.start();
    }
}
```

### 📌 Anonymous Class Restrictions

```
❌ CANNOT:
   → Have a constructor (no name!)
   → Have static members (except constants)
   → Access non-final local variables (only effectively final)

✅ CAN:
   → Access outer class members
   → Override methods
   → Add new methods (but usable only via reference)
   → Extend one class OR implement one interface
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.7 Anonymous Class vs Lambda ⭐

<a id="207-anonymous-class-vs-lambda"></a>

### 📌 Modern Alternative — Lambda Expressions

```
Since Java 8, LAMBDA EXPRESSIONS provide a more concise
alternative to anonymous classes for functional interfaces.

FUNCTIONAL INTERFACE = Interface with ONE abstract method.
```

### 📌 Side-by-Side Comparison

```java
// ═══ Functional interface ═══
interface Calculator {
    int calculate(int a, int b);
}

public class AnonymousVsLambda {
    public static void main(String[] args) {

        // ═══ ANONYMOUS CLASS ═══
        Calculator addAnonymous = new Calculator() {
            @Override
            public int calculate(int a, int b) {
                return a + b;
            }
        };
        System.out.println(addAnonymous.calculate(5, 10));   // 15

        // ═══ LAMBDA EXPRESSION (Java 8+) ═══
        Calculator addLambda = (a, b) -> a + b;
        System.out.println(addLambda.calculate(5, 10));      // 15

        // ═══ Comparison ═══
        // Anonymous: 5 lines
        // Lambda: 1 line
        // Same functionality!
    }
}
```

### 📌 More Examples

```java
public class ManyExamples {
    public static void main(String[] args) {

        // ═══ Runnable ═══

        // Anonymous
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous Runnable");
            }
        };

        // Lambda (way cleaner!)
        Runnable r2 = () -> System.out.println("Lambda Runnable");

        // ═══ Comparator ═══

        // Anonymous
        java.util.Comparator<String> comp1 = new java.util.Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.length() - b.length();
            }
        };

        // Lambda
        java.util.Comparator<String> comp2 = (a, b) -> a.length() - b.length();

        // ═══ Custom functional interface ═══
        interface Greeting {
            void greet(String name);
        }

        // Anonymous
        Greeting g1 = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hello, " + name);
            }
        };

        // Lambda
        Greeting g2 = name -> System.out.println("Hello, " + name);
    }
}
```

### 📌 When to Use Which?

```
┌────────────────────────┬──────────────────┬──────────────────┐
│  Situation             │  Anonymous       │  Lambda          │
├────────────────────────┼──────────────────┼──────────────────┤
│  Functional interface  │  Verbose         │  ✅ PREFERRED    │
│  Multiple methods      │  ✅ REQUIRED     │  ❌ Can't        │
│  Extends class         │  ✅ REQUIRED     │  ❌ Can't        │
│  Need instance state   │  ✅ REQUIRED     │  ❌ Can't        │
│  this refers to        │  Anonymous class │  Enclosing class │
│  Java version          │  Any             │  Java 8+ only    │
└────────────────────────┴──────────────────┴──────────────────┘

USE LAMBDA when:
✅ Functional interface (single abstract method)
✅ Java 8+
✅ Want concise code

USE ANONYMOUS when:
✅ Interface has multiple abstract methods
✅ Extending abstract or concrete class
✅ Need to add instance variables
✅ Need to override multiple methods
✅ Pre-Java 8 environment
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

## 20.8 Use Cases

<a id="208-use-cases"></a>

### 📌 When to Use Each Type

```
┌──────────────────────┬────────────────────────────────────────┐
│  Nested Class Type   │  Best Use Cases                         │
├──────────────────────┼────────────────────────────────────────┤
│  INNER CLASS         │  ✅ Class strongly related to outer     │
│  (Non-static)        │  ✅ Needs access to outer instance data │
│                      │  ✅ Iterator implementations            │
│                      │  ✅ Event listeners with state          │
│                      │  Example: LinkedList.Iterator          │
├──────────────────────┼────────────────────────────────────────┤
│  STATIC NESTED       │  ✅ Related class not needing outer     │
│                      │  ✅ Utility class within class          │
│                      │  ✅ Builder pattern                     │
│                      │  ✅ Independent helper class            │
│                      │  Example: Map.Entry, StringBuilder     │
├──────────────────────┼────────────────────────────────────────┤
│  LOCAL INNER         │  ✅ Class used only in one method       │
│                      │  ✅ Complex algorithm helper            │
│                      │  ✅ Temporary implementation            │
│                      │  Rarely used in modern Java             │
├──────────────────────┼────────────────────────────────────────┤
│  ANONYMOUS INNER     │  ✅ Event handlers (Swing/AWT)          │
│                      │  ✅ Thread creation                     │
│                      │  ✅ Callbacks                           │
│                      │  ✅ One-time interface implementation   │
│                      │  Being replaced by lambdas (Java 8+)   │
└──────────────────────┴────────────────────────────────────────┘
```

### 📌 Real-World Examples

```java
// ═══ 1. Inner Class - Iterator ═══
class MyList<T> {
    private T[] elements;

    class MyIterator {   // Inner class needs access to outer's elements
        private int position = 0;

        boolean hasNext() {
            return position < elements.length;
        }

        T next() {
            return elements[position++];
        }
    }
}

// ═══ 2. Static Nested - Builder Pattern ═══
class Pizza {
    private String size;
    private String[] toppings;

    static class Builder {   // Independent of Pizza instance
        private String size;
        private String[] toppings;

        Builder size(String s) { this.size = s; return this; }
        Builder toppings(String... t) { this.toppings = t; return this; }

        Pizza build() {
            Pizza p = new Pizza();
            p.size = this.size;
            p.toppings = this.toppings;
            return p;
        }
    }
}

// Usage:
Pizza pizza = new Pizza.Builder()
    .size("Large")
    .toppings("Cheese", "Pepperoni")
    .build();

// ═══ 3. Anonymous - Event Handler ═══
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked!");
    }
});

// Modern with Lambda:
button.addActionListener(e -> System.out.println("Button clicked!"));
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

<a id="20-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Nested Classes

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Nested classes      │ ✅ 4 types │ ✅ Nested  │ ✅ Nested  │ ⚠️ Classes│
│                      │            │ classes    │ classes    │ in classes │
│                      │            │            │            │ (limited)  │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Non-static inner    │ ✅ Access  │ ❌ Nested  │ N/A        │ N/A       │
│  class access        │ outer's    │ classes    │            │            │
│  outer instance      │ private    │ don't have │            │            │
│                      │ members    │ automatic  │            │            │
│                      │            │ access     │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Anonymous classes   │ ✅ YES     │ ❌ No      │ ✅ Lambda- │ ✅ Anonymous│
│                      │            │            │ like       │ functions  │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Local classes       │ ✅ YES     │ ❌ No      │ ✅ (in fn) │ ✅ (in fn)│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Static nested       │ ✅ YES     │ ✅ Default │ ✅ YES     │ ❌ Not    │
│                      │            │ behavior   │            │ explicit  │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Access modifiers    │ ✅ ALL     │ ✅ ALL     │ Convention │ Convention│
│  on nested           │            │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Effectively final   │ ✅ Java 8+ │ ❌ No      │ N/A        │ N/A       │
│  local variables     │            │            │            │            │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. FOUR DISTINCT NESTED CLASS TYPES:
   → Java has clear categorization
   → Each with specific use cases

2. INNER CLASS ACCESS TO PRIVATE MEMBERS:
   → Inner class can access outer's private members
   → C++ requires 'friend' declaration

3. ANONYMOUS CLASSES:
   → Common Java pattern (pre-Java 8)
   → Replaced by lambdas for functional interfaces

4. EFFECTIVELY FINAL VARIABLES:
   → Local vars used in inner classes must be effectively final
   → Since Java 8

5. OUTER.this SYNTAX:
   → Unique syntax to reference outer class instance
   → Useful when variable names clash
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

<a id="20-interview-questions"></a>

## 💡 Chapter 20 — Interview Questions (15+)

---

### 🔵 Conceptual Questions

**Q1. What are the different types of nested classes in Java?**

```
Java has 4 types of nested classes:

1. INNER CLASS (Non-static Nested Class)
   → Regular class inside another class
   → Needs outer instance to be created
   → Can access ALL outer members

2. STATIC NESTED CLASS
   → Class with 'static' keyword inside another class
   → Does NOT need outer instance
   → Can only access outer's static members

3. LOCAL INNER CLASS
   → Class defined inside a METHOD
   → Very limited scope
   → Can access effectively final local variables

4. ANONYMOUS INNER CLASS
   → Class without a name
   → Created and instantiated in ONE statement
   → Used for one-time interface implementations

Each has specific use cases and rules!
```

---

**Q2. What is the difference between Inner Class and Static Nested Class?**

```
┌───────────────────────┬──────────────────┬──────────────────┐
│  Feature              │  Inner Class     │  Static Nested   │
├───────────────────────┼──────────────────┼──────────────────┤
│  Keyword              │  (no keyword)    │  static          │
│  Outer instance       │  REQUIRED        │  NOT required    │
│  Access outer         │  ALL members     │  Only static     │
│                       │  (static+instance│                  │
│  Object creation      │  outer.new Inner()│ new Outer.Nested()│
│  Memory efficient     │  Less            │  More            │
│  Behaves like         │  Part of outer   │  Top-level class │
│                       │  instance        │                  │
└───────────────────────┴──────────────────┴──────────────────┘

Inner class needs outer instance because it's "attached" to it.
Static nested class is independent.

// Inner
OuterClass outer = new OuterClass();
OuterClass.Inner inner = outer.new Inner();

// Static Nested
OuterClass.Nested nested = new OuterClass.Nested();
```

---

**Q3. What is an Anonymous Inner Class?**

```
ANONYMOUS INNER CLASS = Class without a name.

Created and instantiated in ONE statement.
Usually implements interface or extends class.

Syntax:
new ClassOrInterface() {
    // Override methods
    // Add new members
};

Example:
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Running");
    }
};

USES:
✅ Event handlers (Swing/AWT)
✅ Thread creation (Runnable)
✅ Callbacks
✅ One-time interface implementations

MODERN ALTERNATIVE:
→ Lambda expressions (Java 8+)
→ Only for functional interfaces (1 abstract method)

Runnable r = () -> System.out.println("Running");
```

---

**Q4. When would you use a Local Inner Class?**

```
LOCAL INNER CLASS = Class inside a METHOD.

Used RARELY. When needed:

✅ Complex helper class needed only inside one method
✅ Encapsulate implementation completely within method
✅ Access effectively final local variables

class Outer {
    void method() {
        final int x = 10;

        class LocalHelper {
            void doWork() {
                System.out.println(x);   // Access local var
            }
        }

        new LocalHelper().doWork();
    }
}

MODERN APPROACH:
→ Usually replaced by lambdas or method references
→ Rarely seen in modern Java code
→ Better to use regular class or static nested class
```

---

**Q5. Can an anonymous class access local variables?**

```
YES, but only if they are FINAL or EFFECTIVELY FINAL.

class Test {
    void method() {
        final int x = 10;       // final
        int y = 20;              // Effectively final (not modified)
        int z = 30;              // z = 40;  ← If modified, NOT effectively final

        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println(x);   // ✅ OK
                System.out.println(y);   // ✅ OK (effectively final)
                // System.out.println(z); // ❌ ERROR if z modified
            }
        };
        r.run();
    }
}

WHY?
Anonymous class object may outlive the method scope.
Capturing non-final variable would cause issues.
Effectively final = safer to capture.
```

---

**Q6. Difference between Anonymous Class and Lambda?**

```
┌───────────────────────┬──────────────────┬──────────────────┐
│  Feature              │  Anonymous       │  Lambda          │
├───────────────────────┼──────────────────┼──────────────────┤
│  Java version         │  Any             │  Java 8+ only    │
│  Syntax               │  Verbose (5+ ln) │  Concise (1 ln)  │
│  Interface methods    │  Any (multiple)  │  Only 1 (SAM)    │
│  Extends class        │  ✅ YES          │  ❌ NO           │
│  Instance variables   │  ✅ YES          │  ❌ NO           │
│  this keyword         │  Anonymous class │  Enclosing class │
│  Compilation          │  Creates .class  │  invokedynamic   │
└───────────────────────┴──────────────────┴──────────────────┘

// Anonymous (5 lines)
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Anonymous");
    }
};

// Lambda (1 line)
Runnable r2 = () -> System.out.println("Lambda");

USE LAMBDA when:
✅ Functional interface (1 abstract method)
✅ Simple implementation

USE ANONYMOUS when:
✅ Multiple methods
✅ Extending class
✅ Need instance state
✅ Complex initialization
```

---

**Q7. Can nested class have access modifiers?**

```
DEPENDS on the type:

┌───────────────────┬──────────────────────────────┐
│  Type              │  Access Modifiers Allowed   │
├───────────────────┼──────────────────────────────┤
│  Inner Class       │  ✅ All (public, private,   │
│                    │    protected, default)       │
│  Static Nested     │  ✅ All                      │
│  Local Inner       │  ❌ None (no modifiers)      │
│  Anonymous         │  ❌ None (no name!)          │
└───────────────────┴──────────────────────────────┘

Example:
public class Outer {
    public class Inner { }         // ✅ OK
    private class Inner2 { }        // ✅ OK
    static class Nested { }         // ✅ OK

    void method() {
        // public class Local { }   // ❌ ERROR!
        class Local { }             // ✅ OK (no modifier)
    }
}
```

---

### 🟡 Scenario-Based Questions

**Q8. What is Outer.this? When is it used?**

```
Outer.this = Refers to the OUTER class instance
             from within an INNER class.

Used when there's a naming conflict.

Example:
class Outer {
    int x = 10;

    class Inner {
        int x = 20;

        void show() {
            int x = 30;
            System.out.println(x);              // 30 (local)
            System.out.println(this.x);          // 20 (Inner's x)
            System.out.println(Outer.this.x);    // 10 (Outer's x) ← Special!
        }
    }
}

Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.show();

Output:
30
20
10

Outer.this is JAVA-SPECIFIC syntax to disambiguate!
```

---

### 🔴 Output-Based Questions

**Q9. What is the output?**

```java
public class Test {
    private int x = 10;

    class Inner {
        void show() {
            System.out.println(x);
        }
    }

    public static void main(String[] args) {
        Test outer = new Test();
        Test.Inner inner = outer.new Inner();
        inner.show();
    }
}
```

```
OUTPUT: 10

REASON:
- Inner class can access PRIVATE members of outer class
- Even though x is private, Inner has full access
- Because Inner is defined INSIDE Test

This is JAVA-SPECIFIC. In other languages,
inner classes may not have this privilege.
```

---

**Q10. Will this compile?**

```java
public class Test {
    static class Nested {
        void show() {
            System.out.println("Nested");
        }
    }

    public static void main(String[] args) {
        Nested obj = new Nested();
        obj.show();
    }
}
```

```
YES! Compiles and prints "Nested".

REASON:
- Nested is STATIC nested class
- Can be created WITHOUT outer instance
- new Nested() works (no need for outer.new)

If it were NON-STATIC:
class Inner { }   // (not static)

Then:
Inner obj = new Inner();   // ❌ ERROR!
// Must be: Test outer = new Test();
//          Test.Inner obj = outer.new Inner();
```

---

**Q11. Predict the output:**

```java
interface Greeting {
    void greet();
}

public class Test {
    public static void main(String[] args) {
        String name = "Rahul";

        Greeting g = new Greeting() {
            @Override
            public void greet() {
                System.out.println("Hello, " + name);
            }
        };
        g.greet();

        // name = "Priya";   // If uncommented?
    }
}
```

```
OUTPUT: Hello, Rahul

REASON:
- Anonymous class implementing Greeting
- Accesses local variable 'name'
- 'name' is EFFECTIVELY FINAL (not modified)

If uncomment `name = "Priya"`:
❌ COMPILE ERROR!
Reason: name would not be effectively final anymore
Anonymous class cannot access non-final local variable
```

---

**Q12. What is the output?**

```java
public class Test {
    int x = 100;

    class Inner {
        int x = 200;

        void show() {
            int x = 300;
            System.out.println(x + " " + this.x + " " + Test.this.x);
        }
    }

    public static void main(String[] args) {
        Test t = new Test();
        Test.Inner inner = t.new Inner();
        inner.show();
    }
}
```

```
OUTPUT: 300 200 100

REASON:
- x → local variable (300)
- this.x → Inner's instance variable (200)
- Test.this.x → Outer's instance variable (100)

Three-level scope resolution demonstrated!
```

---

**Q13. Can we have static members in inner class?**

```
NO! (Except for constants — static final)

class Outer {
    class Inner {
        // static int x = 10;              // ❌ ERROR!
        // static void method() { }         // ❌ ERROR!

        // ✅ EXCEPTION: static final (compile-time constants)
        static final int MAX = 100;         // ✅ OK
    }

    static class StaticNested {
        // static IS allowed here
        static int x = 10;                  // ✅ OK
        static void method() { }             // ✅ OK
    }
}

WHY?
Non-static inner class is tied to outer instance.
Having static members would be inconsistent.
Static nested class is independent, so no restriction.
```

---

**Q14. What does this code generate for compiled files?**

```java
public class Outer {
    class Inner { }
    static class Nested { }

    void method() {
        class LocalInner { }
        new Object() { };  // Anonymous
    }
}
```

```
Generated .class files:
1. Outer.class
2. Outer$Inner.class           ← Inner class
3. Outer$Nested.class          ← Static nested class
4. Outer$1LocalInner.class    ← Local inner class
5. Outer$1.class               ← Anonymous class

The $ (dollar) sign separates:
- Outer class name
- Inner class name

For anonymous: $1, $2, $3... (numbered)
```

---

**Q15. Why must local variables be effectively final for inner classes?**

```
REASON: Object lifetime vs local variable lifetime.

Local variables are on STACK — destroyed when method ends.
Inner class object might live LONGER (on Heap).

If inner class could modify local variable:
- After method ends, local variable is gone
- Inner class would have stale/invalid reference
- Data inconsistency

SOLUTION:
- Java compiler COPIES the value at capture time
- Value must not change (otherwise inconsistency)
- Hence: final or effectively final

Example issue:
void method() {
    int x = 10;
    Runnable r = () -> {
        // If x could change, which value to use?
        // Before or after modification?
        System.out.println(x);
    };
    // x = 20;  // Would cause issue
    r.run();
}
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

<a id="20-practice-problems"></a>

## 🧪 Chapter 20 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain all 4 types of nested classes in Java with syntax
   and use cases for each. When would you use which?

2. Compare Inner Class vs Static Nested Class with examples.
   Why does inner class need outer instance?

3. Explain Anonymous Inner Class vs Lambda Expressions.
   When is one better than the other?

4. What is "effectively final"? Why must local variables be
   final or effectively final when used in inner classes?

5. Explain access rules for inner classes. What can and cannot
   they access? Show examples with Outer.this syntax.
```

### 💻 5 Coding Questions

```java
// Q1: Create Outer and Inner class
// Outer has private field 'name'
// Inner accesses it and displays
// Show both ways to create Inner object

public class OuterInnerDemo {
    // TODO: Implement outer with inner class
}
```

```java
// Q2: Static Nested class for Builder pattern
// Pizza class with static Builder nested class
// Chain methods: size(), toppings(), addCheese()
// build() returns Pizza

public class PizzaBuilder {
    // TODO: Implement builder pattern
}
```

```java
// Q3: Anonymous class implementing Runnable
// Create 3 threads using anonymous inner classes
// Then rewrite same code using lambdas
// Compare both

public class ThreadDemo {
    // TODO: Show anonymous class + lambda versions
}
```

```java
// Q4: Local inner class in method
// Method takes a list of integers
// Local inner class filters even numbers
// Return filtered list

import java.util.*;
public class LocalInnerDemo {
    // TODO: Use local inner class for filtering
}
```

```java
// Q5: Iterator using inner class
// Custom MyList<T> class
// Non-static inner class implementing Iterator<T>
// Provides iterator() method

public class MyList<T> {
    // TODO: Implement with inner iterator class
}
```

<a href="#chapter-index-table-20">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 20 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 20.1  Types of Nested Classes — 4 types                 │
│  ✅ 20.2  Inner Class (Non-static) — Regular inner          │
│  ✅ 20.3  Accessing Outer Members — Full access rules       │
│  ✅ 20.4  Static Nested Class — Independent nested class    │
│  ✅ 20.5  Local Inner Class — Class inside method           │
│  ✅ 20.6  Anonymous Inner Class — Class without name        │
│  ✅ 20.7  Anonymous vs Lambda — Modern comparison           │
│  ✅ 20.8  Use Cases — When to use which                     │
│  ✅ 🔥    Java vs Others — 5 UNIQUE features                │
│  ✅ 15+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: Exception Handling (Chapter 21)                   │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)


<a id="19-final-keyword"></a>

# 📘 Chapter 19: Final Keyword

> **Part C: Object Oriented Programming (Core Java)**
> `Core` | `Immutability` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-19"></a>

## 📚 Chapter 19 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 19.1 | [What is final](#191-what-is-final) | Definition, Purpose, Where Used |
| 19.2 | [final Variable (Constant)](#192-final-variable) | Immutable Value |
| 19.3 | [Blank Final Variable](#193-blank-final-variable) | Uninitialized final |
| 19.4 | [Static Final Variable](#194-static-final-variable) | Class Constants |
| 19.5 | [final Reference Variable](#195-final-reference-variable) | Reference vs Object State |
| 19.6 | [final Method (Cannot Override)](#196-final-method) | Prevent Overriding |
| 19.7 | [final Class (Cannot Extend)](#197-final-class) | Prevent Inheritance |
| 19.8 | [final Parameter](#198-final-parameter) | Immutable Method Parameters |
| 19.9 | [final vs finally vs finalize](#199-final-vs-finally-vs-finalize) | Critical Comparison |
| 🔥 | [Java vs Other Languages](#19-java-vs-other-languages) | Unique final Features |
| 💡 | [Interview Questions](#19-interview-questions) | 15+ Conceptual · Scenario · Output-based |
| 🧪 | [Practice Problems](#19-practice-problems) | 5 Coding + 5 Theory |

---

## 19.1 What is final

<a id="191-what-is-final"></a>

### 📌 Definition

```
FINAL = A keyword that RESTRICTS modification.

Depending on WHERE it's used, final means:

┌───────────────┬────────────────────────────────────────┐
│  Applied to   │  Meaning                               │
├───────────────┼────────────────────────────────────────┤
│  Variable     │  Value CANNOT be changed (constant)   │
│  Method       │  CANNOT be overridden                 │
│  Class        │  CANNOT be extended (inherited)       │
│  Parameter    │  Parameter CANNOT be reassigned       │
└───────────────┴────────────────────────────────────────┘

PURPOSE:
✅ Enforce immutability
✅ Prevent misuse
✅ Improve performance (compiler optimizations)
✅ Design intent (this shouldn't change)
✅ Thread safety
```

### 📌 Where Can final Be Used?

```java
// ═══ 1. FINAL VARIABLES ═══
final int MAX = 100;         // Local constant
static final double PI = 3.14; // Class constant

// ═══ 2. FINAL METHODS ═══
final void method() { }       // Cannot be overridden

// ═══ 3. FINAL CLASSES ═══
final class Utility { }        // Cannot be extended

// ═══ 4. FINAL PARAMETERS ═══
void method(final int x) { }   // x cannot be reassigned

// ═══ 5. FINAL REFERENCE ═══
final StringBuilder sb = new StringBuilder();
// sb cannot point to another object
```

### 🌍 Real-World Analogy (Hinglish)

```
FINAL = "PERMANENT" / "LOCK KIYA HUA"

Real-life examples:

🔒 CONSTITUTION of a country:
   → Once made, cannot be easily changed
   → Similar to final class

🎂 BIRTHDAY:
   → Date of birth cannot change
   → Similar to final variable
   → DOB = "05-Jan-2000" (permanent)

🎓 UNIVERSITY DEGREE:
   → Once awarded, cannot change
   → Similar to final class methods

📱 iPhone MODEL:
   → iPhone 14 model number is FINAL
   → Cannot suddenly become iPhone 15
   → Similar to final class

Java Examples:
final int SPEED_LIMIT = 120;    // Cannot change
final class String { }           // Cannot extend
final void authenticate() { }    // Cannot override

Purpose: "This should NEVER change"
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.2 final Variable (Constant)

<a id="192-final-variable"></a>

### 📌 Immutable Variable

```
FINAL VARIABLE:
→ Once ASSIGNED, cannot be REASSIGNED
→ Value stays SAME throughout program
→ Acts as a CONSTANT
→ Must be initialized (either at declaration or later)

Convention:
→ Names in UPPER_SNAKE_CASE
→ Example: MAX_SIZE, PI, DEFAULT_NAME
```

### 📌 Types of Final Variables

```java
public class FinalVariableDemo {

    // ═══ 1. Static Final (Class Constant) ═══
    static final int MAX_USERS = 100;
    static final double PI = 3.14159;

    // ═══ 2. Instance Final ═══
    final String name;         // Blank final (initialized in constructor)

    // ═══ 3. Local Final ═══
    void method() {
        final int LIMIT = 50;   // Local constant
        // LIMIT = 100;   // ❌ COMPILE ERROR!
        System.out.println(LIMIT);
    }

    // Constructor
    FinalVariableDemo() {
        name = "Rahul";   // Blank final must be initialized
        // name = "Priya";  // ❌ ERROR (cannot reassign)
    }

    public static void main(String[] args) {

        FinalVariableDemo obj = new FinalVariableDemo();
        System.out.println(obj.name);        // Rahul
        System.out.println(MAX_USERS);        // 100
        System.out.println(PI);               // 3.14159

        // Cannot change:
        // MAX_USERS = 200;   // ❌ ERROR!
        // obj.name = "New";   // ❌ ERROR!
    }
}
```

### 📌 Attempting to Modify Final

```java
public class FinalModify {
    public static void main(String[] args) {

        final int MAX = 100;

        // ❌ COMPILE ERROR!
        // MAX = 200;
        // Error: "cannot assign a value to final variable MAX"

        // Cannot reassign even to same value:
        // MAX = 100;   // ❌ ERROR!

        // Cannot increment/decrement:
        // MAX++;       // ❌ ERROR!
        // MAX--;       // ❌ ERROR!

        System.out.println(MAX);   // 100
    }
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.3 Blank Final Variable

<a id="193-blank-final-variable"></a>

### 📌 Final Variable Without Initial Value

```
BLANK FINAL VARIABLE:
→ Declared as final BUT not initialized at declaration
→ MUST be initialized ONCE (in constructor for instance,
  in static block for static)
→ After initialization, cannot be changed

Uses:
✅ Value known only at runtime (from database, user input)
✅ Value depends on other calculations
```

### 📌 Instance Blank Final

```java
class Employee {

    final String name;      // Blank final (declared, not initialized)
    final int id;
    final String department;

    // MUST initialize in constructor
    Employee(String name, int id, String dept) {
        this.name = name;
        this.id = id;
        this.department = dept;
        // If any is not initialized → COMPILE ERROR!
    }
}

public class BlankFinalDemo {
    public static void main(String[] args) {

        Employee emp = new Employee("Rahul", 101, "IT");

        System.out.println(emp.name);        // Rahul
        System.out.println(emp.id);          // 101
        System.out.println(emp.department);   // IT

        // ❌ Cannot modify after initialization:
        // emp.name = "Priya";   // COMPILE ERROR!
    }
}
```

### 📌 Static Blank Final

```java
class Config {

    static final String DATABASE_URL;
    static final int MAX_CONNECTIONS;

    // MUST initialize in STATIC BLOCK
    static {
        DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
        MAX_CONNECTIONS = 100;

        // Can do complex initialization here
        // Read from properties file, etc.
    }
}

public class StaticBlankFinalDemo {
    public static void main(String[] args) {
        System.out.println(Config.DATABASE_URL);       // jdbc:mysql://...
        System.out.println(Config.MAX_CONNECTIONS);    // 100

        // ❌ Cannot modify:
        // Config.MAX_CONNECTIONS = 200;   // ERROR!
    }
}
```

### 📌 Rules for Blank Final

```
✅ INSTANCE blank final:
   → MUST be initialized in EVERY constructor
   → If class has multiple constructors, each must init

✅ STATIC blank final:
   → MUST be initialized in STATIC BLOCK
   → Or with a static method call

❌ CANNOT be initialized in:
   → Instance methods
   → Regular blocks
```

```java
class MultipleConstructors {
    final int x;

    MultipleConstructors() {
        x = 10;   // ✅ MUST initialize
    }

    MultipleConstructors(int val) {
        x = val;  // ✅ MUST initialize
    }

    // MultipleConstructors(String s) {
    //     // ❌ COMPILE ERROR! x not initialized
    // }
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.4 Static Final Variable

<a id="194-static-final-variable"></a>

### 📌 The True Class Constants

```
STATIC FINAL = Class-level CONSTANT

Combines:
→ static: One copy for whole class (shared)
→ final: Value cannot change

Perfect for CONSTANTS:
→ Math.PI
→ Integer.MAX_VALUE
→ Boolean.TRUE
→ Custom application constants

Convention: UPPER_SNAKE_CASE
Access: ClassName.CONSTANT
```

### 📌 Common Examples

```java
public class Constants {

    // ═══ Application constants ═══
    public static final String APP_NAME = "MyApp";
    public static final String VERSION = "1.0.0";
    public static final int MAX_LOGIN_ATTEMPTS = 3;
    public static final double TAX_RATE = 0.18;

    // ═══ Math constants ═══
    public static final double PI = 3.14159265358979;
    public static final double E = 2.71828182845904;
    public static final int MAX_VALUE = 2147483647;

    // ═══ File paths ═══
    public static final String CONFIG_FILE = "app.properties";
    public static final String LOG_FILE = "app.log";

    // ═══ HTTP status codes ═══
    public static final int HTTP_OK = 200;
    public static final int HTTP_NOT_FOUND = 404;
    public static final int HTTP_SERVER_ERROR = 500;
}

public class Test {
    public static void main(String[] args) {

        // Access via ClassName
        System.out.println(Constants.APP_NAME);              // MyApp
        System.out.println(Constants.MAX_LOGIN_ATTEMPTS);   // 3
        System.out.println(Constants.PI);                    // 3.14159...

        // Java built-in constants
        System.out.println(Math.PI);                          // 3.14159...
        System.out.println(Integer.MAX_VALUE);                // 2147483647
        System.out.println(Boolean.TRUE);                     // true
    }
}
```

### 📌 Interfaces Have Automatic static final

```java
interface Constants {

    // These are IMPLICITLY: public static final
    int MAX_SIZE = 100;
    String COMPANY = "TechCorp";
    double PI = 3.14;
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Constants.MAX_SIZE);   // 100
        System.out.println(Constants.COMPANY);    // TechCorp

        // Constants.MAX_SIZE = 200;  // ❌ ERROR! Constants!
    }
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.5 final Reference Variable ⭐

<a id="195-final-reference-variable"></a>

### 📌 Critical Distinction!

```
For OBJECT REFERENCES with final:

❌ Reference itself CANNOT change (cannot point to different object)
✅ Object's INTERNAL STATE CAN change (mutable object modification is OK!)

Example:
final List<Integer> list = new ArrayList<>();
list.add(1);        // ✅ OK (modifying object)
list.add(2);        // ✅ OK
list = new ArrayList<>();  // ❌ ERROR (reassigning reference)
```

### 📌 Detailed Example

```java
import java.util.ArrayList;
import java.util.List;

public class FinalReferenceDemo {
    public static void main(String[] args) {

        // ═══ Final reference to List ═══
        final List<String> list = new ArrayList<>();

        // ✅ CAN modify the OBJECT (add/remove elements)
        list.add("A");
        list.add("B");
        list.add("C");
        System.out.println(list);   // [A, B, C]

        list.remove(0);
        System.out.println(list);   // [B, C]

        // ❌ CANNOT reassign the REFERENCE
        // list = new ArrayList<>();   // COMPILE ERROR!

        // ═══ Final reference to StringBuilder ═══
        final StringBuilder sb = new StringBuilder("Hello");

        // ✅ Modify object
        sb.append(" World");
        sb.append("!");
        System.out.println(sb);     // Hello World!

        // ❌ Cannot reassign reference
        // sb = new StringBuilder("New");   // ERROR!

        // ═══ Final reference to array ═══
        final int[] arr = {1, 2, 3};

        // ✅ Modify array elements
        arr[0] = 100;
        arr[1] = 200;
        System.out.println(java.util.Arrays.toString(arr));   // [100, 200, 3]

        // ❌ Cannot reassign to new array
        // arr = new int[]{4, 5, 6};   // ERROR!
    }
}
```

### 📌 Why This Distinction Matters

```java
class Employee {
    String name;
}

class Test {
    static void modify(final Employee emp) {
        // ✅ CAN modify object's fields
        emp.name = "New Name";

        // ❌ CANNOT reassign reference
        // emp = new Employee();   // ERROR!
    }

    public static void main(String[] args) {
        Employee e = new Employee();
        e.name = "Original";

        modify(e);
        System.out.println(e.name);   // "New Name" (object modified!)
    }
}
```

### 📌 Truly Immutable — Combine with Immutable Classes

```java
// If you want TRULY immutable:
final String s = "Hello";   // Both reference AND content immutable
                             // (String is immutable class)

// For custom immutability, class must be immutable too:
final MyImmutable obj = new MyImmutable("value");
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.6 final Method (Cannot Override)

<a id="196-final-method"></a>

### 📌 Prevent Method Overriding

```
FINAL METHOD:
→ CANNOT be OVERRIDDEN by subclass
→ Child class inherits it but cannot change
→ Used when method's behavior should NEVER change

Reasons to make method final:
✅ Security (prevent malicious override)
✅ Correctness (algorithm shouldn't change)
✅ Performance (compiler can inline)
✅ Design intent (this is the final version)
```

### 📌 Basic Example

```java
class Bank {

    // Final method - cannot be overridden
    public final void authenticate() {
        System.out.println("Standard authentication process");
        // Critical logic that should not be changed
    }

    // Normal method - can be overridden
    public void showBalance() {
        System.out.println("Balance shown");
    }
}

class MyBank extends Bank {

    // ✅ Can override normal method
    @Override
    public void showBalance() {
        System.out.println("MyBank balance shown");
    }

    // ❌ CANNOT override final method!
    // @Override
    // public void authenticate() {   // COMPILE ERROR!
    //     System.out.println("Custom auth");
    // }
}
```

### 📌 Real-World Example — Template Method Pattern

```java
abstract class Report {

    // Final template method (cannot be overridden)
    public final void generateReport() {
        loadData();
        processData();
        formatReport();
        printReport();
    }

    // These can be overridden
    abstract void loadData();
    abstract void processData();
    abstract void formatReport();

    // This CAN'T be changed
    private final void printReport() {
        System.out.println("Report generated!");
    }
}

class SalesReport extends Report {

    @Override
    void loadData() {
        System.out.println("Loading sales data");
    }

    @Override
    void processData() {
        System.out.println("Processing sales");
    }

    @Override
    void formatReport() {
        System.out.println("Formatting sales report");
    }

    // Cannot override generateReport() - it's final!
    // Cannot override printReport() - it's final!
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.7 final Class (Cannot Extend)

<a id="197-final-class"></a>

### 📌 Prevent Inheritance

```
FINAL CLASS:
→ CANNOT be EXTENDED by any other class
→ No inheritance possible
→ All methods automatically become final (indirectly)
→ Used for security, immutability, thread safety

Common Examples:
→ String
→ Integer, Double, Float, Long (all wrapper classes)
→ Math
→ System
```

### 📌 Example

```java
// Final class
final class Vehicle {
    private String model;

    public Vehicle(String model) {
        this.model = model;
    }

    public String getModel() {
        return model;
    }
}

// ❌ CANNOT extend final class!
// class Car extends Vehicle {   // COMPILE ERROR!
//     ...
// }

// Only usage:
public class Test {
    public static void main(String[] args) {
        Vehicle v = new Vehicle("Toyota");
        System.out.println(v.getModel());   // Toyota
    }
}
```

### 📌 Why String is Final

```java
// String is declared as final in Java
public final class String { ... }

WHY?

1. IMMUTABILITY
   → Cannot change String content after creation
   → Prevents subclasses from making it mutable

2. STRING POOL SAFETY
   → Multiple references can share same String
   → Modifying would affect all references

3. SECURITY
   → Passwords, file paths, URLs use String
   → Prevent malicious classes overriding behavior

4. THREAD SAFETY
   → Immutable = automatically thread-safe

5. HASHCODE CACHING
   → String's hashCode is computed once, cached
   → Only possible because content never changes

6. CLASS LOADER SAFETY
   → Class names are Strings
   → Preventing modification prevents attacks
```

### 📌 When to Use Final Class

```
✅ USE final class when:
   → Object should be IMMUTABLE (like String)
   → Class contains SENSITIVE logic
   → You want to PREVENT inheritance
   → You need SIMPLE thread safety
   → Utility classes (Math, Collections)
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.8 final Parameter

<a id="198-final-parameter"></a>

### 📌 Immutable Method Parameters

```
FINAL PARAMETER:
→ Parameter CANNOT be REASSIGNED inside method
→ Prevents accidental modification
→ Sometimes required (e.g., in inner classes accessing outer variables)
```

### 📌 Example

```java
public class FinalParameter {

    // Final parameter
    static void method(final int x) {
        System.out.println(x);
        // x = 100;   // ❌ COMPILE ERROR!
        // Cannot reassign final parameter
    }

    static void processName(final String name) {
        System.out.println("Processing: " + name);
        // name = "Modified";   // ❌ ERROR!
    }

    public static void main(String[] args) {
        method(10);
        processName("Rahul");
    }
}
```

### 📌 Required for Inner Classes (Pre Java 8)

```java
// Before Java 8: Local variable used in inner class MUST be final

public class OuterClass {

    public void method() {
        final int count = 10;   // MUST be final (in Java 7 and below)

        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println(count);   // Uses outer's local variable
                // count = 20;   // Cannot modify (final)
            }
        };
        r.run();
    }
}

// From Java 8: "Effectively final" allowed (not required to write 'final')
public class Java8Version {

    public void method() {
        int count = 10;   // "Effectively final" (not modified after assignment)

        Runnable r = () -> System.out.println(count);   // Lambda works!
        r.run();
    }
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

## 19.9 final vs finally vs finalize ⭐⭐

<a id="199-final-vs-finally-vs-finalize"></a>

### 📌 Very Similar Names — VERY Different Purposes!

```
┌────────────────┬──────────────────────────────────────────────┐
│  Keyword       │  Purpose                                     │
├────────────────┼──────────────────────────────────────────────┤
│  final         │  Modifier — Restrict changes                  │
│                │  → Variable: cannot change                    │
│                │  → Method: cannot override                    │
│                │  → Class: cannot extend                       │
├────────────────┼──────────────────────────────────────────────┤
│  finally       │  Block — Always executes                      │
│                │  → After try-catch                            │
│                │  → For cleanup code                           │
├────────────────┼──────────────────────────────────────────────┤
│  finalize()    │  Method — Called before GC                    │
│                │  → Object destructor (like)                   │
│                │  → DEPRECATED since Java 9                    │
│                │  → NEVER GUARANTEED to run                    │
└────────────────┴──────────────────────────────────────────────┘
```

### 📌 Detailed Comparison

```java
public class FinalFinallyFinalize {

    // ═══ FINAL - Modifier (constant) ═══
    static final int MAX = 100;   // Cannot change

    // ═══ FINAL - Method (cannot override) ═══
    public final void method() { }

    // ═══ FINAL - Class (cannot extend) ═══
    public static final class Immutable { }

    public static void main(String[] args) {

        // ═══ FINALLY - Always executes ═══
        try {
            System.out.println("Try block");
            throw new RuntimeException("Error");
        } catch (Exception e) {
            System.out.println("Catch block: " + e.getMessage());
        } finally {
            System.out.println("Finally always runs");
            // Cleanup: close files, connections, etc.
        }

        /*
        Output:
        Try block
        Catch block: Error
        Finally always runs
        */
    }

    // ═══ FINALIZE() - Called before GC (DEPRECATED) ═══
    @Deprecated
    @Override
    protected void finalize() throws Throwable {
        // Called by GC before object is destroyed
        // DEPRECATED! Don't use in modern Java!
        System.out.println("Object being garbage collected");
        super.finalize();
    }
}
```

### 📌 Complete Comparison Table

```
┌────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  Feature       │  final          │  finally         │  finalize()     │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Type          │  Modifier       │  Block           │  Method         │
│                │  (keyword)      │  (in try-catch)  │  (in Object)    │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Purpose       │  Restriction    │  Cleanup code    │  Object cleanup │
│                │  (const, no     │  (guaranteed     │  (before GC)    │
│                │  override, no   │  execution)      │                 │
│                │  extend)        │                  │                 │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Usage         │  final int x    │  try-catch-      │  Called by JVM  │
│                │  final method() │  finally         │  before GC      │
│                │  final class    │                  │                 │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  When executed │  Compile time   │  Always after   │  Before GC       │
│                │  (constraint)   │  try/catch      │  (unpredictable) │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Guaranteed?   │  N/A            │  YES (mostly)   │  NO! (deprecated)│
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Modern Java   │  ✅ Widely used │  ✅ Widely used │  ❌ DEPRECATED  │
│                │                 │                  │  (Java 9+)      │
│                │                 │                  │  → Use try-with-│
│                │                 │                  │    resources    │
└────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### 📌 Example Showing All Three

```java
public class ThreeConcepts {

    // FINAL - constant
    static final String NAME = "Java";

    // FINAL method
    final void greet() {
        System.out.println("Hello from " + NAME);
    }

    // FINALIZE (deprecated, don't use in real code)
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object being GC'd");
    }

    public static void main(String[] args) {

        // FINALLY block
        try {
            System.out.println("Try");
            throw new Exception("Error");
        } catch (Exception e) {
            System.out.println("Catch");
        } finally {
            System.out.println("Finally");   // Always runs
        }

        // finalize() would be called by GC (unpredictable)
        ThreeConcepts obj = new ThreeConcepts();
        obj = null;
        System.gc();   // Request GC (not guaranteed)
    }
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

<a id="19-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — final Keyword

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  final variable      │ final      │ const      │ Convention │ const      │
│                      │ keyword    │            │ (UPPERCASE)│            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  final method        │ ✅ final   │ ✅ final   │ ❌ No      │ ❌ No     │
│  (no override)       │            │ (C++11)    │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  final class         │ ✅ final   │ ✅ final   │ Convention │ ❌ No     │
│  (no extend)         │            │ (C++11)    │ (@final)   │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  const reference     │ ✅ Reference│ const T&   │ N/A        │ const      │
│                      │ fixed, obj │            │            │            │
│                      │ mutable    │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  const object        │ ❌ No      │ ✅ const   │ ❌ No      │ Object.    │
│                      │ built-in   │ Object     │            │ freeze()   │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  finalize()          │ ✅ (deprecated│ Destructor│ __del__   │ ❌ No     │
│                      │ Java 9+)   │ (~Class)   │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  finally block       │ ✅ Yes     │ ❌ No      │ finally    │ finally    │
│                      │            │ (RAII      │            │            │
│                      │            │ instead)   │            │            │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. THREE VERY SIMILAR KEYWORDS:
   → final (modifier)
   → finally (block)
   → finalize() (method)
   → Different purposes but similar names — confuses beginners

2. FINAL REFERENCE ≠ IMMUTABLE OBJECT:
   → Only reference is fixed
   → Object's state can still change
   → Different from C++'s const

3. finalize() IS DEPRECATED:
   → Should not be used
   → Use try-with-resources or Cleaner API instead

4. IMPLICIT FINAL IN INTERFACES:
   → Interface variables are implicitly public static final
   → Interface methods are implicitly public abstract

5. EFFECTIVELY FINAL (Java 8+):
   → Variables not explicitly final but treated as final
   → Used in Lambda expressions
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

<a id="19-interview-questions"></a>

## 💡 Chapter 19 — Interview Questions (15+)

---

### 🔵 Conceptual Questions

**Q1. What is final keyword? Where can it be used?**

```
FINAL = Modifier that restricts modification.

WHERE final CAN BE USED:
1. VARIABLES → Value cannot change (constant)
2. METHODS → Cannot be overridden
3. CLASSES → Cannot be extended
4. PARAMETERS → Parameter cannot be reassigned

Examples:
final int MAX = 100;              // Constant
final void method() { }           // Cannot override
final class MyClass { }            // Cannot extend
void method(final int x) { }      // Parameter fixed

PURPOSE:
✅ Enforce immutability
✅ Design intent
✅ Thread safety
✅ Performance (compiler optimizations)
```

---

**Q2. What is the difference between final, finally, and finalize?**

```
┌────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  Feature       │  final          │  finally         │  finalize()     │
├────────────────┼─────────────────┼─────────────────┼─────────────────┤
│  Type          │  Keyword        │  Block           │  Method         │
│  Purpose       │  Restrict       │  Cleanup code    │  Object cleanup │
│                │  (const/no      │  (guaranteed)    │  (before GC)    │
│                │  override)      │                  │                 │
│  Usage         │  Modifier       │  try-catch-      │  In Object class│
│                │                 │  finally         │                 │
│  Execution     │  Compile time   │  Always runs    │  Before GC       │
│                │  constraint     │                  │  (unpredictable) │
│  Modern usage  │  ✅ Yes         │  ✅ Yes          │  ❌ DEPRECATED  │
└────────────────┴─────────────────┴─────────────────┴─────────────────┘

// FINAL - Modifier
final int MAX = 100;

// FINALLY - Block
try { } catch { } finally { /* always runs */ }

// FINALIZE() - Method (called before GC)
@Override protected void finalize() throws Throwable { }
```

---

**Q3. What happens if you make a class final?**

```
FINAL CLASS = Cannot be EXTENDED.

Effects:
✅ No subclasses possible
✅ All methods automatically final (indirectly)
✅ Inheritance blocked

Examples of final classes in Java:
→ String
→ Integer, Double, Float, etc.
→ Math
→ System

WHY MAKE A CLASS FINAL?
1. SECURITY (String — for password/URL handling)
2. IMMUTABILITY (String is truly immutable)
3. THREAD SAFETY (no way to break invariants)
4. UTILITY CLASSES (Math — no need to extend)
5. DESIGN DECISION (this class is complete)

final class Vehicle { }
// class Car extends Vehicle { }  // ❌ COMPILE ERROR!
```

---

**Q4. Can we make a constructor final?**

```
NO! Constructors CANNOT be final.

WHY?
→ final prevents OVERRIDING
→ Constructors are NEVER inherited or overridden anyway
→ No point in making them final!

// class Test {
//     final Test() { }   // ❌ COMPILE ERROR!
// }

Similarly, constructors cannot be:
❌ abstract
❌ static
❌ synchronized
❌ native
```

---

**Q5. What is a final reference variable?**

```
FINAL REFERENCE VARIABLE:
→ Reference itself is FIXED (cannot point to another object)
→ Object's STATE can still CHANGE (if object is mutable)

Example:
final List<String> list = new ArrayList<>();

list.add("A");         // ✅ OK (modifying object state)
list.add("B");         // ✅ OK
list.remove(0);        // ✅ OK

list = new ArrayList<>();   // ❌ ERROR! Cannot reassign reference

KEY POINT:
final on reference variable ONLY fixes the reference.
Object itself can be modified (unless class is immutable).

For truly immutable: Use immutable classes (String, Integer)
combined with final.
```

---

**Q6. Can you override a final method?**

```
NO! Final methods CANNOT be overridden.

class Parent {
    public final void method() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    // ❌ COMPILE ERROR!
    // public void method() {   // Cannot override final method
    //     System.out.println("Child");
    // }
}

WHY MAKE A METHOD FINAL?
→ Prevent overriding (security)
→ Ensure algorithm correctness
→ Performance (JIT can inline)
→ Template method pattern

Example:
class Bank {
    public final void authenticate() {
        // Critical security logic
        // Should not be overridden
    }
}
```

---

**Q7. What is a Blank Final Variable? How to initialize?**

```
BLANK FINAL = Final variable declared without initial value.

MUST be initialized:
→ INSTANCE blank final → in CONSTRUCTOR
→ STATIC blank final → in STATIC BLOCK

Example 1: Instance blank final
class Employee {
    final String name;   // Blank final

    Employee(String name) {
        this.name = name;   // MUST initialize in constructor
    }
}

Example 2: Static blank final
class Config {
    static final String URL;

    static {
        URL = "jdbc:mysql://...";   // MUST initialize in static block
    }
}

RULES:
✅ Every constructor MUST initialize instance blank final
✅ Static block MUST initialize static blank final
✅ Once initialized, cannot change
❌ Cannot initialize in regular methods
```

---

**Q8. Why is String class declared as final?**

```
String is FINAL in Java for several reasons:

1. IMMUTABILITY
   → Cannot modify String content
   → Prevents subclasses from making it mutable
   → Guarantees String immutability

2. STRING POOL SAFETY
   → Multiple references share same String
   → Modifying would affect all references
   → String pool depends on immutability

3. SECURITY
   → Passwords, file paths, URLs use String
   → Immutability prevents malicious modification

4. THREAD SAFETY
   → Immutable = automatically thread-safe
   → No synchronization needed

5. HASHCODE CACHING
   → hashCode calculated once
   → Cached because content never changes

6. CLASS LOADER SAFETY
   → Class names are Strings
   → Prevent class loading attacks

// String is defined as:
public final class String { ... }
```

---

### 🟡 Scenario-Based Questions

**Q9. Can a final variable be modified via reflection?**

```
YES, but it's DIFFICULT and NOT RECOMMENDED.

Using reflection:
Field field = MyClass.class.getDeclaredField("FINAL_VAR");
field.setAccessible(true);
Field modifiers = Field.class.getDeclaredField("modifiers");
modifiers.setAccessible(true);
modifiers.setInt(field, field.getModifiers() & ~Modifier.FINAL);
field.set(null, newValue);

BUT:
❌ Java 12+ made this harder
❌ In Java 17+, additional restrictions
❌ Considered bad practice
❌ Breaks the immutability contract

CONCLUSION:
final provides COMPILE-TIME guarantee.
Reflection can bypass it in some cases.
Don't rely on final for security in Java 17+.
```

---

**Q10. Can we declare local variable as final?**

```
YES! Local variables CAN be final.

public void method() {
    final int LIMIT = 100;    // ✅ OK
    final String NAME = "Java"; // ✅ OK

    // LIMIT = 200;   // ❌ ERROR!
    // NAME = "Kotlin"; // ❌ ERROR!
}

WHY MAKE LOCAL VARIABLE FINAL?
1. Prevent accidental modification
2. Required for inner classes (pre-Java 8)
3. Required for lambda expressions (or effectively final)
4. Better readability
5. Compiler optimizations
```

---

### 🔴 Output-Based Questions

**Q11. What is the output?**

```java
public class Test {
    static final int x;

    static {
        x = 100;
    }

    public static void main(String[] args) {
        System.out.println(x);
    }
}
```

```
OUTPUT: 100

REASON: Blank static final initialized in static block.
Static block runs when class loads.
x is set to 100 before main() runs.
```

---

**Q12. Will this compile?**

```java
public class Test {
    final int x;

    Test() {
        // Missing initialization!
    }
}
```

```
❌ COMPILE ERROR!

Error: "variable x might not have been initialized"

REASON: Blank final instance variable MUST be initialized
in EVERY constructor.

FIX:
Test() {
    x = 10;   // ✅ Must initialize
}
```

---

**Q13. What is the output?**

```java
import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
        final ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);

        // list = new ArrayList<>();   // Would this compile?
        System.out.println(list);
    }
}
```

```
OUTPUT: [1, 2, 3]

REASON:
→ list is final REFERENCE
→ Cannot reassign list (list = new ArrayList<>() would ERROR)
→ CAN modify object (add elements) ✅

Reference is fixed, object state can change!
```

---

**Q14. Will this compile?**

```java
final class MyClass {
    void method() { }
}

class Child extends MyClass {
    void method() { }
}
```

```
❌ COMPILE ERROR!

Error: "cannot inherit from final MyClass"

REASON: final class CANNOT be extended.

FIX: Remove 'final' from MyClass, OR
     Don't extend from MyClass.
```

---

**Q15. Predict the output:**

```java
public class Test {
    public static void main(String[] args) {
        final int x = 10;

        // Effectively final (not modified)
        int y = 20;

        Runnable r = () -> {
            System.out.println(x + y);
        };
        r.run();
    }
}
```

```
OUTPUT: 30

REASON:
- x is explicitly final
- y is EFFECTIVELY FINAL (not modified after assignment)
- Both can be accessed inside lambda expression
- Lambda can access final and effectively final local variables

Note: If y were modified later (y = 30;), it wouldn't be
effectively final, and lambda wouldn't compile.
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

<a id="19-practice-problems"></a>

## 🧪 Chapter 19 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain final variable, final method, and final class with
   examples. What is the difference between each?

2. What is a blank final variable? Show how to initialize
   instance and static blank final variables.

3. Explain the concept of final reference variable. Why can you
   modify the object but not reassign the reference?

4. Compare final, finally, and finalize() in detail with usage,
   purpose, and examples for each.

5. Why is the String class declared as final? Explain the 6 major
   reasons in detail.
```

### 💻 5 Coding Questions

```java
// Q1: Create an immutable Point class
// Fields: x, y (both final)
// Constructor to set values
// Only getters (no setters)
// Verify object cannot be modified after creation

public class Point {
    // TODO: Implement immutable class
}
```

```java
// Q2: Create a class with blank final variables
// Instance blank final: name, id
// Static blank final: COMPANY_NAME, MAX_EMPLOYEES
// Initialize appropriately

public class Company {
    // TODO: Implement with blank finals
}
```

```java
// Q3: Demonstrate final reference behavior
// Create a final List<String>
// Add elements (should work)
// Try to reassign to new list (should fail at compile time)

public class FinalReferenceDemo {
    // TODO: Show what works and what doesn't
}
```

```java
// Q4: Create Template Method pattern using final method
// Abstract class Report with final generateReport() method
// Subclasses implement other methods but can't override generateReport

public abstract class Report {
    // TODO: Implement template method pattern
}
```

```java
// Q5: Demonstrate final vs finally vs finalize
// Create a class showing all three:
// - Final variable, method, class
// - try-catch-finally block
// - finalize() method (with @Deprecated)

public class ThreeConceptsDemo {
    // TODO: Show all three in action
}
```

<a href="#chapter-index-table-19">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 19 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 19.1  What is final — Modifier explained                │
│  ✅ 19.2  final Variable — Constants                        │
│  ✅ 19.3  Blank Final Variable — Late initialization        │
│  ✅ 19.4  Static Final Variable — Class constants           │
│  ✅ 19.5  Final Reference — Reference vs object state       │
│  ✅ 19.6  Final Method — Cannot override                    │
│  ✅ 19.7  Final Class — Cannot extend                       │
│  ✅ 19.8  Final Parameter — Immutable parameters            │
│  ✅ 19.9  final vs finally vs finalize — Complete comparison│
│  ✅ 🔥    Java vs Others — 5 UNIQUE features                │
│  ✅ 15+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: Inner Classes & Anonymous Classes (Chapter 20)    │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
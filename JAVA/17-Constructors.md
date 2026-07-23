

<a id="17-constructors"></a>

# 📘 Chapter 17: Constructors

> **Part C: Object Oriented Programming (Core Java)**
> `Core` | `Object Initialization` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-17"></a>

## 📚 Chapter 17 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 17.1 | [What is a Constructor](#171-what-is-a-constructor) | Definition, Object Initialization |
| 17.2 | [Purpose of Constructor](#172-purpose-of-constructor) | Why We Need Constructors |
| 17.3 | [Rules for Constructors](#173-rules-for-constructors) | Complete Rules |
| 17.4 | [Default Constructor](#174-default-constructor) | No-arg Constructor |
| 17.5 | [Parameterized Constructor](#175-parameterized-constructor) | Constructor with Parameters |
| 17.6 | [Constructor Overloading](#176-constructor-overloading) | Multiple Constructors |
| 17.7 | [this Keyword](#177-this-keyword) | Refer to Current Object |
| 17.8 | [this() Constructor Chaining](#178-this-constructor-chaining) | Call Other Constructor |
| 17.9 | [super() in Constructor](#179-super-in-constructor) | Call Parent Constructor |
| 17.10 | [Constructor in Inheritance](#1710-constructor-in-inheritance) | Constructor Chain Flow |
| 17.11 | [Constructor vs Method](#1711-constructor-vs-method) | Key Differences |
| 17.12 | [Copy Constructor](#1712-copy-constructor) | Java Has No Built-in Copy Constructor |
| 17.13 | [Private Constructor (Singleton Pattern)](#1713-private-constructor) | Restrict Instantiation |
| 17.14 | [Can Constructor be final/abstract/static?](#1714-constructor-modifiers) | Modifier Rules |
| 17.15 | [Default Constructor Provided by Compiler](#1715-compiler-provided) | When and Why |
| 🔥 | [Java vs Other Languages](#17-java-vs-other-languages) | Unique Constructor Features |
| 💡 | [Interview Questions](#17-interview-questions) | 15+ Conceptual · Scenario · Output-based |
| 🧪 | [Practice Problems](#17-practice-problems) | 5 Coding + 5 Theory |

---

## 17.1 What is a Constructor

<a id="171-what-is-a-constructor"></a>

### 📌 Definition

```
CONSTRUCTOR = A special METHOD used to INITIALIZE OBJECTS
              when they are CREATED using 'new' keyword.

CHARACTERISTICS:
✅ Same name as the class
✅ NO return type (not even void!)
✅ Automatically called when object is created
✅ Used to initialize instance variables
✅ Can be overloaded

Called by: JVM (automatically during object creation)
```

### 📌 Basic Example

```java
class Student {

    String name;
    int age;

    // ═══ CONSTRUCTOR ═══
    // Same name as class, NO return type
    Student() {
        System.out.println("Constructor called!");
        name = "Unknown";
        age = 0;
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {

        // When 'new' is used, constructor is called AUTOMATICALLY
        Student s = new Student();
        // Output: "Constructor called!"

        System.out.println(s.name + ", " + s.age);
        // Output: "Unknown, 0"
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
CONSTRUCTOR = Naya PHONE kharidne jaisa hai

Jab tum naya phone kharidte ho:
1. Box open karo
2. Phone nikalo (object create karo)
3. AUTOMATICALLY: Setup wizard chalta hai (constructor)
   → Language select karo
   → WiFi connect karo
   → Google account setup karo
   → Ready to use!

Constructor = Setup wizard for objects
→ Automatically runs when object created
→ Initializes the object with default/user values
→ Object ready to use after constructor completes

Java Example:
Student s = new Student("Rahul", 22);
// new Student(...) → allocates memory
// Constructor Student(name, age) → sets initial values
// s → ready to use with name="Rahul", age=22
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.2 Purpose of Constructor

<a id="172-purpose-of-constructor"></a>

### 📌 Why Do We Need Constructors?

```
┌──────────────────────────────────────────────────────────────┐
│  PURPOSES OF CONSTRUCTORS                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. INITIALIZATION                                            │
│     Set initial values to instance variables                 │
│                                                              │
│  2. AUTOMATIC EXECUTION                                       │
│     Called automatically when object is created              │
│                                                              │
│  3. VALIDATION                                                │
│     Validate values before assignment                        │
│                                                              │
│  4. RESOURCE ALLOCATION                                       │
│     Open files, database connections                         │
│                                                              │
│  5. GUARANTEED SETUP                                          │
│     Object always in valid state                             │
│                                                              │
│  6. DEPENDENCY INJECTION                                      │
│     Receive required dependencies                            │
│                                                              │
│  7. IMMUTABLE OBJECT CREATION                                 │
│     Set final fields (cannot change later)                   │
└──────────────────────────────────────────────────────────────┘
```

### 📌 Without vs With Constructor

```java
// ═══ WITHOUT CONSTRUCTOR (Bad!) ═══
class BadStudent {
    String name;
    int age;
    double gpa;
}

public class Test {
    public static void main(String[] args) {
        BadStudent s = new BadStudent();
        // s.name = null, s.age = 0, s.gpa = 0.0 (defaults)

        s.name = "Rahul";      // Manual initialization
        s.age = 22;
        s.gpa = 8.5;

        // Multiple lines every time!
        // Easy to forget!
        // No validation!
    }
}

// ═══ WITH CONSTRUCTOR (Good!) ═══
class GoodStudent {
    String name;
    int age;
    double gpa;

    // Constructor
    GoodStudent(String name, int age, double gpa) {
        // Validation!
        if (age < 0) throw new IllegalArgumentException("Invalid age");
        if (gpa < 0 || gpa > 10) throw new IllegalArgumentException("Invalid GPA");

        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
}

public class Test2 {
    public static void main(String[] args) {
        // One line, all initialization done!
        GoodStudent s = new GoodStudent("Rahul", 22, 8.5);
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.3 Rules for Constructors

<a id="173-rules-for-constructors"></a>

### 📌 Complete Rules

```
┌──────────────────────────────────────────────────────────────┐
│  CONSTRUCTOR RULES                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ MUST FOLLOW:                                              │
│     1. Same NAME as the class                                │
│     2. NO return type (not even void!)                       │
│     3. Called AUTOMATICALLY when object is created           │
│                                                              │
│  ✅ CAN HAVE:                                                 │
│     1. Access modifiers (public, private, protected, default)│
│     2. Parameters (Parameterized constructor)                │
│     3. Multiple constructors (Overloading)                   │
│     4. Throws clause (throws Exception)                      │
│                                                              │
│  ❌ CANNOT BE:                                                │
│     1. final                                                 │
│     2. abstract                                              │
│     3. static                                                │
│     4. synchronized                                          │
│     5. native                                                │
│     6. Inherited (not inherited by subclass)                 │
│                                                              │
│  🔑 KEY BEHAVIOR:                                             │
│     • If no constructor defined → compiler adds default      │
│     • Only first statement can be super() or this()          │
│     • Return statement without value is allowed               │
│     • Cannot call constructor directly (except via this/super)│
└──────────────────────────────────────────────────────────────┘
```

### 📌 Valid & Invalid Constructor Examples

```java
class Test {

    // ✅ VALID - basic constructor
    Test() { }

    // ✅ VALID - with parameters
    Test(int x) { }

    // ✅ VALID - with access modifier
    public Test(String s) { }
    private Test(double d) { }

    // ✅ VALID - with throws clause
    Test(int x, int y) throws Exception { }

    // ❌ INVALID - return type (would make it a method)
    // int Test() { return 10; }

    // ❌ INVALID - void return type
    // void Test() { }

    // ❌ INVALID - static
    // static Test() { }

    // ❌ INVALID - final
    // final Test() { }

    // ❌ INVALID - abstract
    // abstract Test() { }

    // ❌ INVALID - different name (this becomes a method!)
    // void MyTest() { }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.4 Default Constructor

<a id="174-default-constructor"></a>

### 📌 What is Default Constructor?

```
DEFAULT CONSTRUCTOR:
→ Constructor WITHOUT any parameters
→ Also called: No-arg constructor
→ If YOU don't define ANY constructor, compiler adds a default one
→ Initializes fields to DEFAULT values (0, null, false)
```

### 📌 Example

```java
// ═══ Case 1: No constructor defined by developer ═══
class Test1 {
    int x;
    String name;

    // Compiler automatically adds:
    // Test1() {
    //     super();  // Calls Object() constructor
    // }
}

// ═══ Case 2: Default constructor defined by developer ═══
class Test2 {
    int x;
    String name;

    // Explicit default constructor
    Test2() {
        System.out.println("Default constructor called");
        x = 10;
        name = "Default";
    }
}

// ═══ Case 3: Only parameterized constructor ═══
class Test3 {
    int x;

    // Only parameterized — compiler does NOT add default!
    Test3(int x) {
        this.x = x;
    }
}

public class DefaultConstructorDemo {
    public static void main(String[] args) {

        // Case 1: Uses compiler-provided default
        Test1 t1 = new Test1();
        System.out.println(t1.x);      // 0 (default)
        System.out.println(t1.name);   // null (default)

        // Case 2: Uses developer's default
        Test2 t2 = new Test2();
        // Output: "Default constructor called"
        System.out.println(t2.x);      // 10
        System.out.println(t2.name);   // Default

        // Case 3: Cannot use no-arg
        // Test3 t3 = new Test3();   // ❌ ERROR!
        Test3 t3 = new Test3(100);   // ✅ Must provide argument
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.5 Parameterized Constructor

<a id="175-parameterized-constructor"></a>

### 📌 Constructor with Parameters

```java
class Student {

    String name;
    int age;
    double gpa;

    // ═══ Parameterized Constructor ═══
    Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    void display() {
        System.out.println(name + ", " + age + ", " + gpa);
    }
}

public class ParameterizedDemo {
    public static void main(String[] args) {

        // Passing values via constructor
        Student s1 = new Student("Rahul", 22, 8.5);
        Student s2 = new Student("Priya", 21, 9.2);
        Student s3 = new Student("Amit", 23, 7.8);

        s1.display();   // Rahul, 22, 8.5
        s2.display();   // Priya, 21, 9.2
        s3.display();   // Amit, 23, 7.8

        // Benefits:
        // ✅ Initialization in ONE line
        // ✅ Cannot forget to initialize
        // ✅ Object always in valid state
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.6 Constructor Overloading

<a id="176-constructor-overloading"></a>

### 📌 Multiple Constructors with Different Parameters

```java
class Student {

    String name;
    int age;
    double gpa;
    String department;

    // ═══ Constructor 1: No parameters (default) ═══
    Student() {
        this.name = "Unknown";
        this.age = 0;
        this.gpa = 0.0;
        this.department = "General";
    }

    // ═══ Constructor 2: Only name ═══
    Student(String name) {
        this.name = name;
        this.age = 18;
        this.gpa = 0.0;
        this.department = "General";
    }

    // ═══ Constructor 3: Name and age ═══
    Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0;
        this.department = "General";
    }

    // ═══ Constructor 4: All fields ═══
    Student(String name, int age, double gpa, String department) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        this.department = department;
    }

    void display() {
        System.out.println(name + " | " + age + " | " + gpa + " | " + department);
    }
}

public class OverloadingDemo {
    public static void main(String[] args) {

        // Multiple ways to create Student
        Student s1 = new Student();
        Student s2 = new Student("Rahul");
        Student s3 = new Student("Priya", 21);
        Student s4 = new Student("Amit", 22, 8.5, "CSE");

        s1.display();   // Unknown | 0 | 0.0 | General
        s2.display();   // Rahul | 18 | 0.0 | General
        s3.display();   // Priya | 21 | 0.0 | General
        s4.display();   // Amit | 22 | 8.5 | CSE

        // Flexibility to create objects in different ways!
    }
}
```

### 📌 Rules for Constructor Overloading

```
Same as method overloading:

✅ MUST DIFFER in:
   • Number of parameters, OR
   • Type of parameters, OR
   • Order of parameters

❌ CANNOT DIFFER only by:
   • Access modifier
   • Return type (constructors don't have one anyway)
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.7 this Keyword

<a id="177-this-keyword"></a>

### 📌 What is this Keyword?

```
this = Reference to the CURRENT OBJECT
     = "This particular object" being operated on

USES OF this:
1. Distinguish INSTANCE variables from LOCAL variables
2. Refer to current object's fields/methods
3. Pass current object as argument
4. Call another constructor (this())
5. Return current object
```

### 📌 Use 1: Instance vs Local Variable

```java
class Employee {

    String name;    // Instance variable
    int age;

    // ═══ WITHOUT this — parameters shadow instance vars ═══
    Employee(String name, int age) {
        name = name;    // ❌ Assigns parameter to itself!
        age = age;       // ❌ Same problem!
    }
}

// FIX: Use this
class EmployeeGood {

    String name;
    int age;

    Employee(String name, int age) {
        this.name = name;   // this.name = instance var, name = parameter
        this.age = age;     // ✅ Correctly assigns parameter to field
    }
}
```

### 📌 Use 2: Refer to Current Object's Members

```java
class Person {

    String name;

    void setName(String name) {
        this.name = name;   // this.name is the field
    }

    void displayInfo() {
        System.out.println(this.name);   // Access field via this
        this.greet();                     // Call method via this
    }

    void greet() {
        System.out.println("Hello!");
    }
}
```

### 📌 Use 3: Pass Current Object as Argument

```java
class Node {
    String data;

    Node(String data) {
        this.data = data;
        LinkedList.add(this);   // Pass current object to method
    }
}

class LinkedList {
    static void add(Node n) {
        System.out.println("Added: " + n.data);
    }
}

// Usage:
// new Node("A");  // Constructor automatically adds to LinkedList
```

### 📌 Use 4: Return Current Object (Method Chaining)

```java
class Builder {

    String result = "";

    Builder append(String s) {
        this.result += s;
        return this;   // Return current object!
    }

    String build() {
        return result;
    }
}

// Method chaining!
Builder b = new Builder();
String s = b.append("Hello ")
             .append("World")
             .append("!")
             .build();
System.out.println(s);   // "Hello World!"
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.8 this() Constructor Chaining ⭐

<a id="178-this-constructor-chaining"></a>

### 📌 Calling Another Constructor with this()

```
this() = Call ANOTHER constructor of the SAME class

RULES:
✅ Must be the FIRST statement in constructor
✅ Only ONE this() call allowed per constructor
✅ Cannot mix this() and super() in same constructor
✅ Prevents duplicate initialization code
```

### 📌 Example — Constructor Chaining

```java
class Employee {

    String name;
    int age;
    double salary;
    String department;

    // ═══ Constructor 1 ═══
    Employee() {
        this("Unknown", 25, 50000, "General");
        // Calls Constructor 4 with default values
        System.out.println("Constructor 1 finished");
    }

    // ═══ Constructor 2 ═══
    Employee(String name) {
        this(name, 25, 50000, "General");
        // Calls Constructor 4
        System.out.println("Constructor 2 finished");
    }

    // ═══ Constructor 3 ═══
    Employee(String name, int age) {
        this(name, age, 50000, "General");
        // Calls Constructor 4
        System.out.println("Constructor 3 finished");
    }

    // ═══ Constructor 4 — Main constructor ═══
    Employee(String name, int age, double salary, String department) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.department = department;
        System.out.println("Main constructor - all fields set");
    }

    void display() {
        System.out.println(name + " | " + age + " | " + salary + " | " + department);
    }
}

public class ChainingDemo {
    public static void main(String[] args) {

        Employee e = new Employee();
        // Output:
        // Main constructor - all fields set
        // Constructor 1 finished

        e.display();
        // Unknown | 25 | 50000.0 | General
    }
}
```

### 📌 Benefits of Constructor Chaining

```
✅ AVOID CODE DUPLICATION:
   Common initialization code written only ONCE

✅ SINGLE POINT OF CHANGE:
   Modify main constructor, all others benefit

✅ CLEANER CODE:
   Simple constructors delegate to main constructor

Example:
Without chaining: Same 4 lines in every constructor
With chaining: Just call this(defaults)
```

### 📌 Rules and Errors

```java
class Test {

    Test() {
        System.out.println("Before this()");
        // this();   // ❌ ERROR! Not first statement
    }

    Test(int x) {
        this();      // ✅ OK - first statement
        // this();   // ❌ ERROR! Cannot have two this() calls
        System.out.println("After this()");
    }

    Test(String s) {
        this();      // ✅ OK
        // super(); // ❌ ERROR! Cannot mix this() and super()
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.9 super() in Constructor

<a id="179-super-in-constructor"></a>

### 📌 Calling Parent Constructor

```
super() = Call PARENT class constructor

RULES:
✅ Must be the FIRST statement in child constructor
✅ Only ONE super() call allowed
✅ Cannot mix super() and this() in same constructor
✅ If not called explicitly, compiler adds super() automatically
```

### 📌 Example

```java
class Animal {

    String name;

    Animal() {
        System.out.println("Animal() called");
    }

    Animal(String name) {
        this.name = name;
        System.out.println("Animal(name) called");
    }
}

class Dog extends Animal {

    String breed;

    Dog() {
        // super();   ← Compiler adds this automatically!
        System.out.println("Dog() called");
    }

    Dog(String breed) {
        // super();   ← Compiler adds this automatically!
        this.breed = breed;
        System.out.println("Dog(breed) called");
    }

    Dog(String name, String breed) {
        super(name);   // ✅ Explicit call to Animal(name)
        this.breed = breed;
        System.out.println("Dog(name, breed) called");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        System.out.println("--- new Dog() ---");
        Dog d1 = new Dog();
        /*
        Output:
        Animal() called          ← super() implicit
        Dog() called
        */

        System.out.println("\n--- new Dog(\"Bulldog\") ---");
        Dog d2 = new Dog("Bulldog");
        /*
        Output:
        Animal() called          ← super() implicit (default constructor)
        Dog(breed) called
        */

        System.out.println("\n--- new Dog(\"Tommy\", \"Bulldog\") ---");
        Dog d3 = new Dog("Tommy", "Bulldog");
        /*
        Output:
        Animal(name) called      ← super(name) explicit
        Dog(name, breed) called
        */
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.10 Constructor in Inheritance ⭐

<a id="1710-constructor-in-inheritance"></a>

### 📌 How Constructors Work in Inheritance

```
IMPORTANT RULES:

1. Constructors are NOT INHERITED by child class
   (child creates its own constructors)

2. When child object is created:
   → PARENT constructor is called FIRST
   → THEN child constructor executes

3. Compiler adds super() as first statement (if not present)

4. If parent doesn't have no-arg constructor, MUST call super(args)
   explicitly in child constructor!
```

### 📌 Constructor Call Order

```java
class Grandparent {
    Grandparent() {
        System.out.println("1. Grandparent constructor");
    }
}

class Parent extends Grandparent {
    Parent() {
        // super();  ← implicit
        System.out.println("2. Parent constructor");
    }
}

class Child extends Parent {
    Child() {
        // super();  ← implicit
        System.out.println("3. Child constructor");
    }
}

public class InheritanceConstructor {
    public static void main(String[] args) {
        Child c = new Child();
        /*
        Output (Top to Bottom):
        1. Grandparent constructor
        2. Parent constructor
        3. Child constructor

        RULE: Parent constructors ALWAYS called first!
        */
    }
}
```

### 📌 When Parent Has No Default Constructor

```java
class Animal {

    String name;

    // Only parameterized — NO default constructor!
    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {

    // ❌ COMPILE ERROR!
    // Dog() { }   // Compiler adds super() but Animal() doesn't exist!

    // ✅ CORRECT: Must explicitly call parent's parameterized constructor
    Dog() {
        super("Unknown");   // Call Animal(String)
    }

    Dog(String name) {
        super(name);   // Pass name to parent
    }
}
```

### 📌 Constructor Chain with Fields

```java
class Employee {

    String name;
    double salary;

    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
        System.out.println("Employee: " + name);
    }
}

class Manager extends Employee {

    String department;
    double bonus;

    Manager(String name, double salary, String department, double bonus) {
        super(name, salary);   // Initialize parent's fields
        this.department = department;
        this.bonus = bonus;
        System.out.println("Manager: " + department);
    }

    void display() {
        System.out.println(name + " | " + salary + " | " + department + " | " + bonus);
    }
}

public class HierarchyDemo {
    public static void main(String[] args) {
        Manager m = new Manager("Rahul", 50000, "IT", 10000);
        /*
        Output:
        Employee: Rahul
        Manager: IT
        */
        m.display();
        // Rahul | 50000.0 | IT | 10000.0
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.11 Constructor vs Method ⭐

<a id="1711-constructor-vs-method"></a>

### 📌 Complete Comparison

```
┌───────────────────────┬──────────────────────┬──────────────────────┐
│  Feature              │  Constructor         │  Method              │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Name                 │  Same as class       │  Any valid name      │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Return type          │  NO return type       │  Must have return    │
│                       │  (not even void)     │  type (or void)      │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Purpose              │  Initialize object   │  Perform operations  │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Called               │  Automatically       │  Explicitly          │
│                       │  (via new)           │  (via object.method())│
├───────────────────────┼──────────────────────┼──────────────────────┤
│  When called          │  Only once, at       │  Any number of times │
│                       │  object creation     │                      │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Inherited            │  NO                  │  YES                 │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Overridden           │  NO                  │  YES                 │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Overloaded           │  YES                 │  YES                 │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Compiler adds        │  Default constructor │  Nothing             │
│  if missing           │  if none defined     │                      │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  final                │  Cannot be final     │  Can be final        │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  static               │  Cannot be static    │  Can be static       │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  abstract             │  Cannot be abstract  │  Can be abstract     │
└───────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 Example Showing Differences

```java
class Test {

    // ═══ CONSTRUCTOR ═══
    Test() {
        // No return type
        System.out.println("Constructor");
    }

    // ═══ METHOD (with same name — VALID but confusing!) ═══
    void Test() {   // ← Return type makes it a METHOD
        System.out.println("Method");
    }
}

public class Demo {
    public static void main(String[] args) {
        Test t = new Test();
        // Output: Constructor (called automatically)

        t.Test();
        // Output: Method (called explicitly)
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.12 Copy Constructor

<a id="1712-copy-constructor"></a>

### 📌 Java Has NO Built-in Copy Constructor!

```
Unlike C++, Java does NOT have automatic copy constructor.
You must WRITE one manually if needed.

COPY CONSTRUCTOR:
→ Takes another object of same class as parameter
→ Creates new object with same values
→ Useful for creating independent copies
```

### 📌 Implementation

```java
class Student {

    String name;
    int age;
    double gpa;

    // Regular constructor
    Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // ═══ COPY CONSTRUCTOR ═══
    Student(Student other) {
        this.name = other.name;
        this.age = other.age;
        this.gpa = other.gpa;
    }

    void display() {
        System.out.println(name + " | " + age + " | " + gpa);
    }
}

public class CopyConstructorDemo {
    public static void main(String[] args) {

        Student original = new Student("Rahul", 22, 8.5);
        Student copy = new Student(original);   // Copy constructor

        System.out.println("Original: ");
        original.display();

        System.out.println("Copy: ");
        copy.display();

        // Independent objects — changes to copy don't affect original
        copy.name = "Priya";
        original.display();   // Rahul | 22 | 8.5 (unchanged)
        copy.display();       // Priya | 22 | 8.5
    }
}
```

### 📌 Deep vs Shallow Copy Constructor

```java
class Address {
    String city;

    Address(String city) {
        this.city = city;
    }
}

class Employee {
    String name;
    Address address;

    // ═══ SHALLOW COPY CONSTRUCTOR ═══
    Employee(Employee other) {
        this.name = other.name;
        this.address = other.address;   // ⚠️ Same reference!
    }

    // ═══ DEEP COPY CONSTRUCTOR ═══
    // Employee(Employee other) {
    //     this.name = other.name;
    //     this.address = new Address(other.address.city);   // NEW object
    // }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.13 Private Constructor (Singleton Pattern) ⭐

<a id="1713-private-constructor"></a>

### 📌 Restricting Object Creation

```
PRIVATE CONSTRUCTOR:
→ Prevents object creation from OUTSIDE the class
→ Used in Singleton pattern
→ Used in utility classes (Math, Collections)

Common Use Cases:
1. Singleton pattern (only ONE instance)
2. Utility class (all static methods, no instances)
3. Factory pattern
```

### 📌 Singleton Pattern

```java
// ═══ Singleton Pattern ═══
class DatabaseConnection {

    // Static instance (only ONE)
    private static DatabaseConnection instance;

    // Private constructor — prevents 'new' from outside
    private DatabaseConnection() {
        System.out.println("Database connected");
    }

    // Public method to get the ONLY instance
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

public class SingletonDemo {
    public static void main(String[] args) {

        // Cannot do: new DatabaseConnection();   ❌ ERROR!

        // Must use getInstance()
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        System.out.println(db1 == db2);   // true (SAME instance!)

        db1.query("SELECT * FROM users");
    }
}
```

### 📌 Utility Class

```java
// ═══ Utility Class (like Math) ═══
class MathUtils {

    // Private constructor — nobody can create objects
    private MathUtils() {
        // Prevent instantiation
    }

    // All methods are static
    public static int add(int a, int b) {
        return a + b;
    }

    public static double sqrt(double x) {
        return Math.sqrt(x);
    }
}

// Usage:
// MathUtils m = new MathUtils();  // ❌ ERROR!
int sum = MathUtils.add(5, 10);    // ✅ Static call
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.14 Can Constructor be final/abstract/static?

<a id="1714-constructor-modifiers"></a>

### 📌 Constructor Modifier Rules

```
❌ CANNOT BE:

1. final — Constructors are NEVER inherited
   → No point in preventing override (can't override anyway)

2. abstract — Contradictory!
   → abstract = no body, must be overridden
   → constructor = has body, can't be overridden

3. static — Constructor is meant for object initialization
   → static means belongs to class, not object
   → Can't have static constructor

4. synchronized — Not allowed
   → Object doesn't exist yet during construction

5. native — Not allowed

✅ CAN BE:
- public
- private (Singleton)
- protected
- default (no modifier)
```

### 📌 Why Not?

```java
class Test {

    // ❌ final Test() { }
    // "modifier final not allowed here"
    // WHY? Constructors are NEVER inherited, so no override possible

    // ❌ abstract Test() { }
    // "modifier abstract not allowed here"
    // WHY? abstract methods have no body, but constructor must have body

    // ❌ static Test() { }
    // "modifier static not allowed here"
    // WHY? Constructor is for object creation (instance), not class

    // ❌ synchronized Test() { }
    // "modifier synchronized not allowed here"
    // WHY? Object doesn't exist yet, nothing to synchronize on
}
```

### 📌 Alternative Solutions

```
Want to prevent inheritance-like behavior?
→ Make CLASS final (not constructor)

Want abstract-like behavior?
→ Make CLASS abstract (not constructor)

Want static-like initialization?
→ Use STATIC BLOCK

class Test {
    static int count;

    static {   // Static initialization block
        count = 100;
        System.out.println("Static block runs once when class loads");
    }
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

## 17.15 Default Constructor Provided by Compiler ⭐

<a id="1715-compiler-provided"></a>

### 📌 When Does Compiler Provide?

```
COMPILER PROVIDES DEFAULT CONSTRUCTOR ONLY IF:
→ You did NOT define ANY constructor in your class

If you define ANY constructor (even parameterized),
compiler will NOT add default constructor!
```

### 📌 Examples

```java
// ═══ Case 1: No constructor defined ═══
class Test1 {
    int x;

    // Compiler adds:
    // Test1() {
    //     super();
    // }
}

// Usage: new Test1() works ✅

// ═══ Case 2: Only parameterized constructor ═══
class Test2 {
    int x;

    Test2(int x) {
        this.x = x;
    }

    // Compiler does NOT add default constructor
}

// Usage:
// new Test2()      ❌ ERROR!
// new Test2(10)    ✅ OK

// ═══ Case 3: Both defined ═══
class Test3 {
    int x;

    Test3() {
        this.x = 0;
    }

    Test3(int x) {
        this.x = x;
    }
}

// Usage:
// new Test3()      ✅ OK
// new Test3(10)    ✅ OK
```

### 📌 What Compiler-Provided Default Constructor Looks Like

```java
// If you write:
class MyClass {
    int x;
    String name;
}

// Compiler actually treats it as:
class MyClass {
    int x;         // default: 0
    String name;   // default: null

    // Compiler-added default constructor
    MyClass() {
        super();   // Call Object() constructor
    }
}

// Fields initialized to defaults BEFORE constructor runs
```

### 📌 Access Modifier of Default Constructor

```java
// Public class → default constructor is PUBLIC
public class A { }
// Compiler adds: public A() { super(); }

// Default (package-private) class → default constructor is DEFAULT
class B { }
// Compiler adds: B() { super(); }

// Compiler-provided default constructor's access matches class's access
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

<a id="17-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Constructors

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Constructor name    │ Same as    │ Same as    │ __init__   │ constructor│
│                      │ class      │ class      │ (any name  │ keyword    │
│                      │            │            │ underscore)│            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Return type         │ NO         │ NO         │ NO         │ NO        │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Default constructor │ ✅ Yes     │ ✅ Yes     │ ✅ Yes     │ ✅ Yes    │
│  (compiler-provided) │ (if none  │ (if none   │ (implicit) │ (implicit) │
│                      │ defined)   │ defined)   │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Overloading         │ ✅ Yes     │ ✅ Yes     │ ⚠️ Limited │ ⚠️ Limited│
│                      │            │            │ (default   │ (default   │
│                      │            │            │ params)    │ params)    │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Copy constructor    │ ❌ No      │ ✅ Yes     │ ⚠️ __copy__│ ❌ No     │
│  (built-in)          │ (manual)   │ (automatic)│            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Destructor          │ ❌ No      │ ✅ Yes     │ __del__    │ ❌ No     │
│                      │ (GC)       │ (~Class)   │            │ (GC)      │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Constructor         │ this()     │ Delegating │ ⚠️ Explicit│ super()   │
│  chaining            │            │ constructor│ __init__   │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Parent constructor  │ super()    │ Initializer│ super()    │ super()   │
│  call                │ (first     │ list       │ .__init__()│            │
│                      │ statement) │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Private constructor │ ✅ Yes     │ ✅ Yes     │ ⚠️ Convention│ ❌ Not    │
│                      │ (Singleton)│            │ (_prefix)  │ enforced   │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. NO COPY CONSTRUCTOR BY DEFAULT:
   → Java doesn't provide automatic copy constructor
   → Must write manually
   → C++ auto-generates one

2. NO DESTRUCTORS:
   → Garbage Collector handles cleanup
   → No delete/free
   → C++ has ~ClassName() destructor

3. STRICT FIRST STATEMENT RULE:
   → super() or this() MUST be first statement
   → Compiler adds super() implicitly if missing
   → C++ has initializer list (different mechanism)

4. NO STATIC CONSTRUCTOR:
   → Static block for one-time class initialization
   → No 'static constructor' concept

5. COMPILER-PROVIDED DEFAULT:
   → Only if NO constructor defined
   → Access modifier matches class access
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

<a id="17-interview-questions"></a>

## 💡 Chapter 17 — Interview Questions (15+)

---

### 🔵 Conceptual Questions

**Q1. What is a Constructor? Why do we need it?**

```
CONSTRUCTOR = Special method used to INITIALIZE OBJECTS.

CHARACTERISTICS:
✅ Same name as class
✅ NO return type (not even void)
✅ Called automatically when object is created (via new)
✅ Can be overloaded

WHY WE NEED:
1. INITIALIZATION - Set initial values to fields
2. VALIDATION - Validate values before assignment
3. RESOURCE ALLOCATION - Open files, connections
4. GUARANTEED SETUP - Object always in valid state

Example:
class Student {
    String name;
    int age;

    Student(String name, int age) {   // Constructor
        this.name = name;
        this.age = age;
    }
}

Student s = new Student("Rahul", 22);
// Constructor called automatically
```

---

**Q2. What is the difference between Constructor and Method?**

```
┌────────────────────┬──────────────────┬──────────────────┐
│  Feature           │  Constructor     │  Method          │
├────────────────────┼──────────────────┼──────────────────┤
│  Name              │  Same as class   │  Any valid name  │
│  Return type       │  NO              │  Yes (or void)   │
│  Called            │  Automatically   │  Explicitly      │
│  When              │  Object creation │  Any time        │
│  Inherited         │  NO              │  Yes             │
│  Overridden        │  NO              │  Yes             │
│  Overloaded        │  YES             │  YES             │
└────────────────────┴──────────────────┴──────────────────┘

Constructors are FOR object creation.
Methods are FOR object behavior.
```

---

**Q3. What is Default Constructor? When is it provided?**

```
DEFAULT CONSTRUCTOR = No-argument constructor.

Compiler AUTOMATICALLY provides default constructor
IF you don't define ANY constructor.

class Test1 {
    int x;
}
// Compiler adds: Test1() { super(); }

class Test2 {
    int x;
    Test2(int x) { this.x = x; }   // Parameterized only
}
// Compiler does NOT add default!
// new Test2() → ❌ ERROR
// new Test2(10) → ✅ OK

Default constructor:
→ Initializes fields to default values (0, null, false)
→ Calls super() to invoke parent constructor
→ Access modifier matches class access
```

---

**Q4. What is Constructor Overloading?**

```
CONSTRUCTOR OVERLOADING = Multiple constructors in the SAME class
                          with DIFFERENT parameters.

Rules (same as method overloading):
✅ Different number of parameters
✅ Different type of parameters
✅ Different order of parameters

class Student {
    Student() { }                             // No-arg
    Student(String name) { }                  // 1 param
    Student(String name, int age) { }         // 2 params
    Student(String name, int age, double gpa) { }  // 3 params
}

Benefits:
✅ Flexibility to create objects in different ways
✅ Default values for optional fields
✅ Better API design
```

---

**Q5. What is Constructor Chaining? Explain this() and super().**

```
CONSTRUCTOR CHAINING = Calling one constructor from another.

TWO TYPES:

1. WITHIN SAME CLASS — use this()
   → Calls another constructor of same class
   → Must be FIRST statement

class Test {
    Test() {
        this(10);   // Calls Test(int)
    }
    Test(int x) {
        System.out.println(x);
    }
}

2. FROM PARENT CLASS — use super()
   → Calls parent constructor
   → Must be FIRST statement
   → If not called, compiler adds super() automatically

class Child extends Parent {
    Child() {
        super();   // Calls Parent()
    }
}

RULES:
✅ this() or super() must be FIRST statement
✅ Only ONE this() or super() per constructor
✅ Cannot use BOTH in same constructor
```

---

**Q6. Can we have a constructor without any modifier?**

```
YES! Constructors can have any access modifier or no modifier at all.

class Test {
    Test() { }           // Default (package-private)
    public Test(int x) { }
    private Test(String s) { }
    protected Test(double d) { }
}

DEFAULT access → constructor is package-private
→ Accessible only within same package

PRIVATE constructor:
→ Used in Singleton pattern
→ Used in utility classes
→ Prevents external instantiation

class Singleton {
    private static Singleton instance;

    private Singleton() { }   // PRIVATE!

    public static Singleton getInstance() {
        if (instance == null)
            instance = new Singleton();
        return instance;
    }
}
```

---

**Q7. Why can't constructors be final, abstract, or static?**

```
1. FINAL:
   → final prevents OVERRIDING
   → Constructors are NEVER inherited or overridden
   → No point in making them final!

2. ABSTRACT:
   → abstract methods have NO body
   → Constructor MUST have body to initialize
   → Contradictory!

3. STATIC:
   → static means belongs to CLASS, not object
   → Constructor is for OBJECT initialization
   → Contradictory! (No object to initialize)

4. SYNCHRONIZED:
   → synchronizes on an object
   → Object doesn't exist yet during construction

Constructors CAN be:
✅ public
✅ private
✅ protected
✅ default (no modifier)
```

---

**Q8. What is Copy Constructor? Does Java have it built-in?**

```
COPY CONSTRUCTOR = Constructor that takes another object
                   of same class as parameter and creates a copy.

JAVA DOES NOT PROVIDE built-in copy constructor!
Must write manually.

Example:
class Student {
    String name;
    int age;

    // Regular constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Copy constructor (manual!)
    Student(Student other) {
        this.name = other.name;
        this.age = other.age;
    }
}

Student s1 = new Student("Rahul", 22);
Student s2 = new Student(s1);   // Copy

C++ has automatic copy constructor.
Java requires manual implementation.

Alternatives in Java:
→ clone() method (implement Cloneable)
→ Copy constructor (manual)
→ Serialization
→ Static factory method
```

---

### 🟡 Scenario-Based Questions

**Q9. Are constructors inherited by child class?**

```
NO! Constructors are NOT inherited.

WHY?
Constructors are specific to a class:
→ They contain class-specific initialization
→ Child class needs its OWN constructors

But CHILD can CALL parent constructor using super():

class Parent {
    Parent(int x) {
        System.out.println("Parent: " + x);
    }
}

class Child extends Parent {
    Child() {
        super(10);   // Call parent constructor
        System.out.println("Child");
    }
}

// Output:
// Parent: 10
// Child

If Parent has no default constructor,
Child MUST explicitly call super(args)!
```

---

**Q10. What if parent has only parameterized constructor?**

```java
class Animal {
    Animal(String name) {
        System.out.println("Animal: " + name);
    }
    // NO default constructor!
}

class Dog extends Animal {
    // Dog() { }   // ❌ COMPILE ERROR!
    // Compiler tries to add super() but Animal() doesn't exist!

    // ✅ CORRECT: Must explicitly call parent's constructor
    Dog() {
        super("Unknown");   // Must call Animal(String)
    }

    Dog(String name) {
        super(name);   // Pass name to Animal
    }
}
```

---

### 🔴 Output-Based Questions

**Q11. What is the output?**

```java
class Parent {
    Parent() { System.out.println("Parent()"); }
    Parent(int x) { System.out.println("Parent(int)"); }
}

class Child extends Parent {
    Child() {
        super(10);
        System.out.println("Child()");
    }
}

public class Test {
    public static void main(String[] args) {
        new Child();
    }
}
```

```
OUTPUT:
Parent(int)
Child()

REASON:
1. new Child() called
2. Child() constructor starts
3. super(10) → calls Parent(int) → prints "Parent(int)"
4. Returns to Child() → prints "Child()"
```

---

**Q12. Will this compile?**

```java
class Test {
    Test() {
        System.out.println("Test");
    }

    void Test() {
        System.out.println("Method");
    }
}
```

```
YES! Both compile.

- Test() → Constructor (no return type)
- void Test() → Method (has return type)

But VERY BAD PRACTICE:
- Method name same as class name is confusing
- Never do this in production code!

Usage:
Test t = new Test();     // "Test" (constructor)
t.Test();                 // "Method" (method call)
```

---

**Q13. What is the output?**

```java
class Test {
    int x;

    Test() {
        this(10);
        x += 5;
    }

    Test(int x) {
        this.x = x;
    }
}

public class Main {
    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.x);
    }
}
```

```
OUTPUT: 15

REASON:
1. new Test() called
2. Test() → this(10) → calls Test(int) with x=10
3. Test(int) sets this.x = 10
4. Returns to Test() → x += 5 → x = 15
5. Prints 15
```

---

**Q14. Will this compile?**

```java
class Test {
    Test() {
        System.out.println("Before");
        super();
        System.out.println("After");
    }
}
```

```
❌ COMPILE ERROR!

Error: "call to super must be first statement in constructor"

RULE: super() (or this()) MUST be the FIRST statement in constructor.

FIX:
class Test {
    Test() {
        super();   // ✅ First statement
        System.out.println("Before");
        System.out.println("After");
    }
}
```

---

**Q15. Predict the output:**

```java
class A {
    A() { System.out.println("A"); }
    A(int x) { System.out.println("A(int)"); }
}

class B extends A {
    B() {
        System.out.println("B");
    }

    B(int x) {
        super(x);
        System.out.println("B(int)");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
        System.out.println("---");
        new B(10);
    }
}
```

```
OUTPUT:
A                ← super() implicit in B()
B
---
A(int)           ← super(x) explicit in B(int)
B(int)

REASON:
- new B() → B() calls implicit super() → A() prints "A" → then "B"
- new B(10) → B(int) calls super(x)=super(10) → A(int) prints "A(int)" → then "B(int)"
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

<a id="17-practice-problems"></a>

## 🧪 Chapter 17 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain the difference between constructor and method.
   Why can't constructors have return types?

2. What is constructor chaining? Explain this() and super()
   with rules and examples. Why must they be first statements?

3. What is a copy constructor? Java doesn't provide it built-in.
   How do you implement it? Show shallow vs deep copy examples.

4. Explain constructor behavior in inheritance. Why is parent's
   constructor called first? What if parent doesn't have default
   constructor?

5. Explain the Singleton pattern using private constructor.
   Why is the constructor private? Show a complete implementation.
```

### 💻 5 Coding Questions

```java
// Q1: Create a Rectangle class with overloaded constructors
// - Default (creates 1x1 rectangle)
// - Constructor with side (creates square)
// - Constructor with length and width
// Use constructor chaining (this())

public class Rectangle {
    // TODO: Implement with proper chaining
}
```

```java
// Q2: Employee hierarchy with proper constructor chain
// Employee (name, salary)
// Manager extends Employee (name, salary, department, bonus)
// Director extends Manager (name, salary, department, bonus, teamSize)
// Use super() properly

public class EmployeeHierarchy {
    // TODO: Implement 3-level inheritance
    // Show constructor chain execution
}
```

```java
// Q3: Create a Singleton logger class
// - Private constructor
// - getInstance() method
// - Methods: logInfo(), logError()
// Test that only one instance is created

public class Logger {
    // TODO: Implement Singleton pattern
}
```

```java
// Q4: Copy constructor with deep copy
// Person class with name and Address (as object)
// Implement copy constructor that does DEEP copy
// Test that modifying copy doesn't affect original

public class DeepCopyDemo {
    // TODO: Address class + Person class
    // Show shallow vs deep copy
}
```

```java
// Q5: BankAccount with validation in constructor
// Fields: accountNumber, holderName, balance
// Validation:
// - accountNumber: not null, exactly 10 digits
// - holderName: not null, not empty
// - balance: >= 0
// Throw IllegalArgumentException for invalid data

public class BankAccount {
    // TODO: Complete class with validating constructor
}
```

<a href="#chapter-index-table-17">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 17 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 17.1  What is Constructor — Definition                  │
│  ✅ 17.2  Purpose of Constructor — Why needed                │
│  ✅ 17.3  Rules for Constructors — Complete rules           │
│  ✅ 17.4  Default Constructor — No-arg                       │
│  ✅ 17.5  Parameterized Constructor — With parameters       │
│  ✅ 17.6  Constructor Overloading — Multiple constructors   │
│  ✅ 17.7  this Keyword — Current object reference           │
│  ✅ 17.8  this() Constructor Chaining — Call another        │
│  ✅ 17.9  super() in Constructor — Parent constructor call  │
│  ✅ 17.10 Constructor in Inheritance — Chain flow           │
│  ✅ 17.11 Constructor vs Method — Complete comparison       │
│  ✅ 17.12 Copy Constructor — Manual implementation          │
│  ✅ 17.13 Private Constructor — Singleton pattern           │
│  ✅ 17.14 Constructor Modifiers — Cannot be final/abstract  │
│  ✅ 17.15 Default Constructor — Compiler-provided           │
│  ✅ 🔥    Java vs Others — 5 UNIQUE features                │
│  ✅ 15+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: Static Keyword (Chapter 18)                       │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
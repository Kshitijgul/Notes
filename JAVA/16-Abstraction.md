

<a id="16-abstraction"></a>

# 📘 Chapter 16: Abstraction

> **Part C: Object Oriented Programming (Core Java)**
> `Core` | `OOP Pillar #4` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-16"></a>

## 📚 Chapter 16 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 16.1 | [What is Abstraction](#161-what-is-abstraction) | Definition, Hide Complexity, Show Essentials |
| 16.2 | [Abstraction vs Encapsulation](#162-abstraction-vs-encapsulation) | Key Differences |
| 16.3 | [Abstract Class](#163-abstract-class) | Cannot Instantiate, Partial Implementation |
| 16.4 | [abstract Keyword](#164-abstract-keyword) | Where to Use, Rules |
| 16.5 | [Abstract Methods](#165-abstract-methods) | No Body, Must Override |
| 16.6 | [Concrete Methods in Abstract Class](#166-concrete-methods-abstract-class) | Regular Methods Allowed |
| 16.7 | [Rules for Abstract Class](#167-rules-for-abstract-class) | Complete Rules |
| 16.8 | [When to Use Abstract Class](#168-when-to-use-abstract-class) | Use Cases |
| 16.9 | [Interface](#169-interface) | 100% Abstract, Contract |
| 16.10 | [implements Keyword](#1610-implements-keyword) | Syntax, Multiple Implementation |
| 16.11 | [Interface Rules](#1611-interface-rules) | Complete Rules |
| 16.12 | [Multiple Interface Implementation](#1612-multiple-interface-implementation) | Multiple Inheritance Solution |
| 16.13 | [Interface Extending Interface](#1613-interface-extending-interface) | extends with interfaces |
| 16.14 | [Marker/Tagging Interface](#1614-marker-interface) | Serializable, Cloneable |
| 16.15 | [Functional Interface](#1615-functional-interface) | @FunctionalInterface, Lambda |
| 16.16 | [Default Methods (Java 8+)](#1616-default-methods) | Backward Compatibility |
| 16.17 | [Static Methods (Java 8+)](#1617-static-methods-interface) | Utility Methods |
| 16.18 | [Private Methods (Java 9+)](#1618-private-methods-interface) | Code Reuse in Interfaces |
| 16.19 | [Sealed Interfaces (Java 17+)](#1619-sealed-interfaces) | Restricted Implementation |
| 16.20 | [Abstract Class vs Interface](#1620-abstract-class-vs-interface) | Complete Comparison |
| 16.21 | [Comparable Interface](#1621-comparable-interface) | Natural Ordering |
| 16.22 | [Comparator Interface](#1622-comparator-interface) | Custom Ordering |
| 16.23 | [Cloneable Interface](#1623-cloneable-interface) | Shallow vs Deep Copy |
| 🔥 | [Java vs Other Languages](#16-java-vs-other-languages) | Unique Abstraction Features |
| 💡 | [Interview Questions](#16-interview-questions) | 20+ Conceptual · Scenario · Output-based |
| 🧪 | [Practice Problems](#16-practice-problems) | 5 Coding + 5 Theory |

---

## 16.1 What is Abstraction

<a id="161-what-is-abstraction"></a>

### 📌 Definition

```
ABSTRACTION = Hiding COMPLEX IMPLEMENTATION details
              and showing only ESSENTIAL FEATURES.

It is the FOURTH PILLAR of Object-Oriented Programming.

Core Idea:
→ Show WHAT the object does
→ Hide HOW it does it

Achieved in Java through:
1. ABSTRACT CLASSES (0-100% abstraction)
2. INTERFACES (100% abstraction — pre Java 8)

BENEFITS:
✅ Reduces complexity
✅ Increases reusability
✅ Improves security (hides implementation)
✅ Enables loose coupling
```

### 📌 Simple Example

```java
// ═══ ABSTRACTION EXAMPLE ═══

// Abstract class — provides abstraction
abstract class Vehicle {

    // Abstract method — WHAT to do (no HOW)
    abstract void start();

    // Concrete method — common behavior
    void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    // Provides implementation of HOW
    @Override
    void start() {
        System.out.println("Car starts with key");
    }
}

class ElectricCar extends Vehicle {
    // Different HOW
    @Override
    void start() {
        System.out.println("Electric car starts with button");
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        Vehicle v1 = new Car();
        Vehicle v2 = new ElectricCar();

        v1.start();   // "Car starts with key"
        v2.start();   // "Electric car starts with button"

        // USER doesn't know internal complexity
        // Just calls start() — abstraction!
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
ABSTRACTION = TV Remote 📺

TV Remote ka use kaise karte ho?
→ Power button dabao → TV on
→ Channel change karo
→ Volume badhao

Kya andar kaam hota hai?
→ IR signals bhejta hai
→ TV signal receive karta hai
→ Circuits activate hote hain
→ Display update hoti hai

Tumhe internal working KNOW NAHI karna!
Bas SIMPLE interface use karo (buttons).

Yehi hai Abstraction:
→ Complexity hidden
→ Simple interface exposed

Aur bhi examples:
🚗 Car driving — steering wheel se driving karo, engine internals mat sochao
📱 Smartphone — apps use karo, OS internals ki fikar mat karo
🏧 ATM — buttons dabao, banking system mat sochao
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.2 Abstraction vs Encapsulation

<a id="162-abstraction-vs-encapsulation"></a>

### 📌 Two Different Concepts (Often Confused!)

```
┌────────────────────────┬────────────────────┬────────────────────┐
│  Feature               │  Abstraction       │  Encapsulation     │
├────────────────────────┼────────────────────┼────────────────────┤
│  Purpose               │  Hide COMPLEXITY   │  Hide DATA         │
│                        │  Show WHAT          │  Wrap data+methods │
├────────────────────────┼────────────────────┼────────────────────┤
│  Focus                 │  Design level      │  Implementation     │
│                        │  What to do        │  How to hide       │
├────────────────────────┼────────────────────┼────────────────────┤
│  Achieved by           │  Abstract classes  │  Access modifiers  │
│                        │  Interfaces        │  (private + get/set)│
├────────────────────────┼────────────────────┼────────────────────┤
│  Hides                 │  Implementation    │  Data              │
│                        │  details           │                    │
├────────────────────────┼────────────────────┼────────────────────┤
│  Example               │  abstract methods  │  private fields    │
├────────────────────────┼────────────────────┼────────────────────┤
│  Answer                │  What object does  │  How data is       │
│                        │                    │  protected         │
└────────────────────────┴────────────────────┴────────────────────┘
```

### 📌 Example Showing Both

```java
// ═══ ABSTRACTION + ENCAPSULATION together ═══

abstract class BankAccount {

    // ENCAPSULATION - private data
    private double balance;
    private String accountNumber;

    // ENCAPSULATION - controlled access
    public double getBalance() { return balance; }
    public void setBalance(double b) {
        if (b >= 0) this.balance = b;
    }

    // ABSTRACTION - what to do (no how)
    abstract void calculateInterest();

    // Common concrete method
    public void deposit(double amount) {
        balance += amount;
    }
}

class SavingsAccount extends BankAccount {
    // ABSTRACTION - provides HOW
    @Override
    void calculateInterest() {
        setBalance(getBalance() + getBalance() * 0.04);
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.3 Abstract Class

<a id="163-abstract-class"></a>

### 📌 What is Abstract Class?

```
ABSTRACT CLASS = A class that CANNOT be INSTANTIATED
                (cannot create object directly)
                Serves as a BLUEPRINT for subclasses.

Features:
✅ Can have ABSTRACT methods (no body)
✅ Can have CONCRETE methods (with body)
✅ Can have INSTANCE variables
✅ Can have CONSTRUCTORS
✅ Can have static methods
✅ Can have final methods
❌ CANNOT be instantiated directly

Declared with 'abstract' keyword.
```

### 📌 Basic Example

```java
// ═══ Abstract class ═══
abstract class Shape {

    protected String color;   // Instance variable

    // Constructor (yes, abstract class can have!)
    public Shape(String color) {
        this.color = color;
    }

    // ABSTRACT method — subclass MUST implement
    abstract double area();

    // CONCRETE method — common to all shapes
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {

    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {

    private double length, width;

    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {

        // Shape s = new Shape("Red");   // ❌ ERROR! Cannot instantiate

        Shape circle = new Circle("Red", 5);
        Shape rect = new Rectangle("Blue", 4, 6);

        circle.displayColor();       // Inherited from Shape
        System.out.println(circle.area());   // 78.53...

        rect.displayColor();
        System.out.println(rect.area());     // 24.0
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.4 abstract Keyword

<a id="164-abstract-keyword"></a>

### 📌 Where to Use abstract

```
abstract keyword can be applied to:

1. CLASSES → Cannot be instantiated
2. METHODS → Must be overridden by subclass

RULES:
✅ abstract class CAN have concrete methods
✅ abstract method MUST be in abstract class
✅ Non-abstract class CANNOT have abstract methods
```

### 📌 Valid & Invalid Combinations

```java
// ✅ VALID
abstract class A {
    abstract void method1();      // OK
    void method2() { }             // OK
}

// ✅ VALID (abstract class with no abstract methods)
abstract class B {
    void method1() { }             // OK
    void method2() { }             // OK
}
// Purpose: Prevent instantiation, force subclassing

// ❌ INVALID: Non-abstract class with abstract method
// class C {
//     abstract void method();    // COMPILE ERROR!
// }

// ❌ INVALID: Wrong keyword combinations
// abstract final class D { }     // ERROR (final ≠ abstract)
// abstract static void x() { }   // ERROR
// abstract private void y() { }  // ERROR
// abstract synchronized void z() { }  // ERROR
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.5 Abstract Methods

<a id="165-abstract-methods"></a>

### 📌 Methods Without Body

```java
abstract class Vehicle {

    // ABSTRACT METHOD - just declaration, NO body
    abstract void start();        // ← No { } braces!

    abstract void stop();

    abstract double calculateSpeed();
}

class Car extends Vehicle {

    // MUST implement ALL abstract methods!

    @Override
    void start() {
        System.out.println("Car started");
    }

    @Override
    void stop() {
        System.out.println("Car stopped");
    }

    @Override
    double calculateSpeed() {
        return 100.0;
    }
}

// ❌ ERROR: If child doesn't implement all abstract methods
// class Bike extends Vehicle {
//     void start() { }
//     // Missing stop() and calculateSpeed() — ERROR!
// }

// ✅ FIX: Make Bike also abstract
abstract class Bike extends Vehicle {
    void start() { }
    // Concrete class MUST implement remaining abstract methods
}
```

### 📌 Rules for Abstract Methods

```
✅ MUST be in an abstract class
✅ NO method body (no { })
✅ MUST end with semicolon (;)
✅ Cannot be final
✅ Cannot be static
✅ Cannot be private
✅ Child class MUST override (or be abstract itself)
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.6 Concrete Methods in Abstract Class

<a id="166-concrete-methods-abstract-class"></a>

### 📌 Abstract Class Can Have Both!

```java
abstract class Animal {

    // ═══ CONCRETE METHOD (with body) ═══
    public void sleep() {
        System.out.println("Sleeping...");
    }

    public void eat() {
        System.out.println("Eating...");
    }

    // ═══ ABSTRACT METHOD (no body) ═══
    abstract void makeSound();

    // ═══ FINAL method (concrete, cannot override) ═══
    public final void breathe() {
        System.out.println("Breathing...");
    }

    // ═══ STATIC method ═══
    public static void showMessage() {
        System.out.println("Hello from Animal!");
    }
}

class Dog extends Animal {

    // Only MUST override abstract methods
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }

    // Can OVERRIDE concrete methods (optional)
    @Override
    public void sleep() {
        System.out.println("Dog sleeping in doghouse");
    }
}

public class Demo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.sleep();       // Overridden
        d.eat();         // Inherited (not overridden)
        d.makeSound();   // Implemented
        d.breathe();     // Inherited (final, cannot override)

        Animal.showMessage();  // Static call
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.7 Rules for Abstract Class

<a id="167-rules-for-abstract-class"></a>

### 📌 Complete Rules

```
┌──────────────────────────────────────────────────────────────┐
│  ABSTRACT CLASS RULES                                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ CAN have:                                                 │
│     • Abstract methods                                       │
│     • Concrete methods                                       │
│     • Constructor (though can't instantiate directly!)       │
│     • Instance variables                                     │
│     • Static variables                                       │
│     • Static methods                                         │
│     • Final methods                                          │
│     • main() method (can execute!)                           │
│     • Any access modifiers                                   │
│                                                              │
│  ❌ CANNOT:                                                   │
│     • Create direct object: new AbstractClass() ❌           │
│     • Be final (final + abstract makes no sense)             │
│     • Be private (nobody can extend it)                      │
│     • Static abstract methods (contradictory)                │
│                                                              │
│  MUST DO:                                                    │
│     • Child class MUST implement all abstract methods        │
│     • OR child must also be abstract                         │
└──────────────────────────────────────────────────────────────┘
```

### 📌 Yes, Abstract Class CAN Have main()!

```java
abstract class WithMain {

    abstract void method();

    // ✅ Main can be in abstract class!
    public static void main(String[] args) {
        System.out.println("Main executed in abstract class!");
        // Can even call:
        // new WithMain() {  // Anonymous class
        //     void method() { }
        // }.method();
    }
}
// Run: java WithMain
// Output: Main executed in abstract class!
```

### 📌 Yes, Abstract Class CAN Have Constructor!

```java
abstract class Vehicle {

    protected String type;

    // Constructor of abstract class!
    public Vehicle(String type) {
        this.type = type;
        System.out.println("Vehicle constructor: " + type);
    }

    abstract void start();
}

class Car extends Vehicle {

    public Car() {
        super("Car");   // Calls parent constructor
        System.out.println("Car constructor");
    }

    @Override
    void start() {
        System.out.println("Car starting...");
    }
}

// new Car();
// Output:
// Vehicle constructor: Car
// Car constructor
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.8 When to Use Abstract Class

<a id="168-when-to-use-abstract-class"></a>

### 📌 Perfect Use Cases

```
USE ABSTRACT CLASS WHEN:

✅ Common behavior + some abstract methods
✅ Need to share code among related classes
✅ Want to provide default implementation
✅ Have common state (instance variables)
✅ Need constructors for initialization
✅ Represent "IS-A" relationship strongly
✅ Want strict inheritance hierarchy

EXAMPLES:
→ Animal (Dog, Cat, Bird all share properties)
→ Vehicle (Car, Bike, Truck share features)
→ Employee (Manager, Developer share fields)
→ Shape (Circle, Rectangle, Triangle)
```

### 📌 Real-World Example

```java
// ═══ Perfect use case: Employee hierarchy ═══

abstract class Employee {

    // Common state
    protected String name;
    protected int id;
    protected double baseSalary;

    // Constructor for common initialization
    public Employee(String name, int id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }

    // Common concrete methods
    public void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name);
    }

    // Abstract method - each employee type calculates differently
    abstract double calculateSalary();
}

class Manager extends Employee {

    private double bonus;

    public Manager(String name, int id, double baseSalary, double bonus) {
        super(name, id, baseSalary);
        this.bonus = bonus;
    }

    @Override
    double calculateSalary() {
        return baseSalary + bonus;
    }
}

class Developer extends Employee {

    private double projectBonus;

    public Developer(String name, int id, double baseSalary, double projectBonus) {
        super(name, id, baseSalary);
        this.projectBonus = projectBonus;
    }

    @Override
    double calculateSalary() {
        return baseSalary + projectBonus + 5000;
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.9 Interface

<a id="169-interface"></a>

### 📌 What is an Interface?

```
INTERFACE = A CONTRACT that classes MUST follow.
           A blueprint for behavior (WHAT, not HOW).

Traditionally (before Java 8):
→ 100% ABSTRACT
→ All methods have NO body
→ All methods automatically: public abstract
→ All variables automatically: public static final

Since Java 8:
→ Can have DEFAULT methods (with body)
→ Can have STATIC methods (with body)

Since Java 9:
→ Can have PRIVATE methods

Interface is used to achieve:
✅ Full Abstraction
✅ Multiple Inheritance (Java's solution)
✅ Loose Coupling
```

### 📌 Basic Interface Example

```java
// ═══ Interface (all methods abstract by default) ═══
interface Animal {

    // These are IMPLICITLY: public abstract
    void eat();
    void sleep();
    void makeSound();
}

// Class IMPLEMENTS interface (not extends!)
class Dog implements Animal {

    @Override
    public void eat() {    // MUST be public!
        System.out.println("Dog eating");
    }

    @Override
    public void sleep() {
        System.out.println("Dog sleeping");
    }

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        // Interface a = new Interface();  // ❌ ERROR! Cannot instantiate

        Animal d = new Dog();    // OK - polymorphism
        d.eat();
        d.sleep();
        d.makeSound();
    }
}
```

### 📌 Interface Variables Are Constants!

```java
interface Constants {

    // These are IMPLICITLY:
    // public static final
    int MAX_SIZE = 100;
    String COMPANY = "TechCorp";
    double PI = 3.14159;
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Constants.MAX_SIZE);   // 100
        System.out.println(Constants.COMPANY);     // TechCorp
        System.out.println(Constants.PI);          // 3.14159

        // Constants.MAX_SIZE = 200;  // ❌ ERROR! Final
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.10 implements Keyword

<a id="1610-implements-keyword"></a>

### 📌 Syntax and Usage

```java
// Single interface
class MyClass implements Interface1 {
    // Must implement all abstract methods
}

// Multiple interfaces (Java's solution to multiple inheritance!)
class MyClass implements Interface1, Interface2, Interface3 {
    // Must implement all abstract methods from ALL interfaces
}

// Class extending another class AND implementing interfaces
class MyClass extends ParentClass implements Interface1, Interface2 {
    // extends comes BEFORE implements
    // ONLY ONE class can be extended
    // MULTIPLE interfaces can be implemented
}
```

### 📌 Complete Example

```java
// Multiple interfaces
interface Swimmer {
    void swim();
}

interface Runner {
    void run();
}

interface Flyer {
    void fly();
}

// Class implementing multiple interfaces
class Duck implements Swimmer, Runner, Flyer {

    @Override
    public void swim() {
        System.out.println("Duck swimming");
    }

    @Override
    public void run() {
        System.out.println("Duck running");
    }

    @Override
    public void fly() {
        System.out.println("Duck flying");
    }
}

public class ImplementsDemo {
    public static void main(String[] args) {
        Duck d = new Duck();
        d.swim();
        d.run();
        d.fly();

        // Polymorphism through interfaces
        Swimmer s = d;      // Duck is Swimmer
        Runner r = d;       // Duck is Runner
        Flyer f = d;        // Duck is Flyer
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.11 Interface Rules

<a id="1611-interface-rules"></a>

### 📌 Complete Rules

```
┌──────────────────────────────────────────────────────────────┐
│  INTERFACE RULES                                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  METHODS:                                                    │
│  • All methods are IMPLICITLY public abstract                │
│    (before Java 8)                                           │
│  • Java 8+: default methods allowed (with body)              │
│  • Java 8+: static methods allowed                           │
│  • Java 9+: private methods allowed                          │
│  • Cannot be final                                           │
│  • Cannot be protected                                       │
│                                                              │
│  VARIABLES:                                                  │
│  • All variables are IMPLICITLY: public static final         │
│  • MUST be initialized                                       │
│  • Are CONSTANTS                                             │
│                                                              │
│  CLASS RELATIONSHIP:                                         │
│  • CANNOT be instantiated                                    │
│  • NO constructors                                           │
│  • Class 'implements' interface                              │
│  • Interface 'extends' another interface                     │
│  • Class can implement MULTIPLE interfaces                   │
│  • Interface can extend MULTIPLE interfaces                  │
│                                                              │
│  IMPLEMENTATION:                                             │
│  • Implementing class MUST override all abstract methods    │
│  • OR class must be abstract                                 │
│  • Implementing method MUST be public                        │
└──────────────────────────────────────────────────────────────┘
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.12 Multiple Interface Implementation

<a id="1612-multiple-interface-implementation"></a>

### 📌 Java's Solution to Multiple Inheritance

```
Java DOES NOT allow multiple inheritance with classes.
BUT allows multiple inheritance with INTERFACES.

WHY interfaces work?
→ Interface methods are (traditionally) abstract
→ No implementation to inherit
→ No diamond problem
```

### 📌 Example

```java
interface Bird {
    void fly();
    void layEggs();
}

interface Mammal {
    void feedBaby();
    void breathe();
}

// Duck-billed platypus is a mammal that lays eggs!
class Platypus implements Bird, Mammal {

    @Override
    public void fly() {
        System.out.println("Platypus can't really fly!");
    }

    @Override
    public void layEggs() {
        System.out.println("Platypus lays eggs");
    }

    @Override
    public void feedBaby() {
        System.out.println("Platypus feeds milk to babies");
    }

    @Override
    public void breathe() {
        System.out.println("Platypus breathes air");
    }
}

public class MultipleInterfaces {
    public static void main(String[] args) {
        Platypus p = new Platypus();
        p.layEggs();      // From Bird
        p.feedBaby();     // From Mammal

        // Can treat as both types
        Bird bird = p;    // Polymorphism
        Mammal mammal = p; // Polymorphism
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.13 Interface Extending Interface

<a id="1613-interface-extending-interface"></a>

### 📌 Interfaces Use extends (Not implements)

```java
// ═══ Interface hierarchy ═══

interface Animal {
    void eat();
    void sleep();
}

// Interface can EXTEND another interface (not implement!)
interface WildAnimal extends Animal {
    void hunt();
}

// Can extend multiple interfaces!
interface Runner {
    void run();
}

interface Swimmer {
    void swim();
}

interface Amphibian extends Runner, Swimmer {
    void breathe();
}

// Implementing class must implement ALL inherited methods
class Frog implements Amphibian {

    @Override
    public void run() { System.out.println("Frog jumping"); }

    @Override
    public void swim() { System.out.println("Frog swimming"); }

    @Override
    public void breathe() { System.out.println("Frog breathing"); }
}

class Tiger implements WildAnimal {

    @Override
    public void eat() { System.out.println("Tiger eating"); }

    @Override
    public void sleep() { System.out.println("Tiger sleeping"); }

    @Override
    public void hunt() { System.out.println("Tiger hunting"); }
}
```

### 📌 Summary

```
class extends class          → SINGLE inheritance
class extends class          + implements interface1, interface2
interface extends interface  → SINGLE (multiple parents allowed!)
interface extends interface1, interface2  → MULTIPLE
class implements interface1, interface2   → MULTIPLE

Rules:
✅ class extends class (only ONE)
✅ class implements interfaces (MULTIPLE)
✅ interface extends interfaces (MULTIPLE)
❌ class implements class (NOT allowed)
❌ interface extends class (NOT allowed)
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.14 Marker/Tagging Interface

<a id="1614-marker-interface"></a>

### 📌 What is Marker Interface?

```
MARKER INTERFACE (Tagging Interface):
→ An interface with NO METHODS
→ Just "marks" a class for special treatment
→ JVM/frameworks check for this marker to enable behavior

Common Marker Interfaces:
1. Serializable  (java.io) — enables object serialization
2. Cloneable     (java.lang) — enables object.clone()
3. Remote        (java.rmi) — for RMI

Modern alternative: ANNOTATIONS
```

### 📌 Example — Serializable

```java
import java.io.*;

// ═══ Class marked as Serializable ═══
class User implements Serializable {   // ← Marker interface!

    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" + name + ", " + age + "}";
    }
}

public class MarkerInterfaceDemo {

    public static void main(String[] args) throws Exception {
        User user = new User("Rahul", 25);

        // Serialize (write to file)
        FileOutputStream fos = new FileOutputStream("user.ser");
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(user);   // Works because User implements Serializable
        oos.close();

        // Deserialize (read from file)
        FileInputStream fis = new FileInputStream("user.ser");
        ObjectInputStream ois = new ObjectInputStream(fis);
        User user2 = (User) ois.readObject();
        System.out.println(user2);   // User{Rahul, 25}
    }
}

// If User DIDN'T implement Serializable:
// → NotSerializableException at runtime!
```

### 📌 Example — Cloneable

```java
class Point implements Cloneable {   // ← Marker interface!

    int x, y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();   // Uses marker to enable cloning
    }
}

public class CloneableDemo {
    public static void main(String[] args) throws Exception {
        Point p1 = new Point(10, 20);
        Point p2 = (Point) p1.clone();   // Works because Cloneable

        System.out.println(p1.x + ", " + p1.y);   // 10, 20
        System.out.println(p2.x + ", " + p2.y);   // 10, 20
    }
}
```

### 📌 Custom Marker Interface

```java
// Custom marker interface
interface Deletable { }

class Document implements Deletable { }
class Image implements Deletable { }
class ImportantFile { }   // NOT deletable

// Check marker at runtime
public class MarkerCheck {
    public static void main(String[] args) {
        Object obj = new Document();

        if (obj instanceof Deletable) {
            System.out.println("Can be deleted");
        } else {
            System.out.println("Cannot be deleted");
        }
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.15 Functional Interface

<a id="1615-functional-interface"></a>

### 📌 SAM (Single Abstract Method) Interface

```
FUNCTIONAL INTERFACE = Interface with EXACTLY ONE abstract method.

Java 8+ feature — enables LAMBDA expressions!

Annotation: @FunctionalInterface (recommended but optional)
→ Compiler enforces the single abstract method rule
→ Prevents accidental addition of more abstract methods

Common Functional Interfaces:
→ Runnable       — void run()
→ Callable<V>    — V call()
→ Comparator<T>  — int compare(T, T)
→ Function<T,R>  — R apply(T)
→ Predicate<T>   — boolean test(T)
→ Consumer<T>    — void accept(T)
→ Supplier<T>    — T get()
```

### 📌 Creating Functional Interface

```java
// ═══ Custom Functional Interface ═══
@FunctionalInterface   // ← Enforces single abstract method
interface Greeting {
    void sayHello(String name);   // Only ONE abstract method

    // Can have default methods
    default void wave() {
        System.out.println("Waving hand!");
    }

    // Can have static methods
    static void staticMethod() {
        System.out.println("Static method");
    }
}

public class FunctionalDemo {
    public static void main(String[] args) {

        // ═══ Traditional way ═══
        Greeting g1 = new Greeting() {
            @Override
            public void sayHello(String name) {
                System.out.println("Hello, " + name);
            }
        };
        g1.sayHello("Rahul");

        // ═══ Lambda expression (concise!) ═══
        Greeting g2 = (name) -> System.out.println("Hi, " + name);
        g2.sayHello("Priya");

        // ═══ Method reference ═══
        Greeting g3 = System.out::println;
        // g3.sayHello("Amit");   // Prints "Amit"
    }
}
```

### 📌 Built-in Functional Interfaces

```java
import java.util.function.*;

public class BuiltInFunctional {
    public static void main(String[] args) {

        // ═══ Predicate<T> — returns boolean ═══
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println(isEven.test(4));   // true
        System.out.println(isEven.test(5));   // false

        // ═══ Function<T,R> — transforms input to output ═══
        Function<Integer, Integer> square = n -> n * n;
        System.out.println(square.apply(5));   // 25

        // ═══ Consumer<T> — accepts input, returns void ═══
        Consumer<String> printer = s -> System.out.println(s);
        printer.accept("Hello");   // Hello

        // ═══ Supplier<T> — no input, returns value ═══
        Supplier<Double> random = () -> Math.random();
        System.out.println(random.get());   // Some random number
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.16 Default Methods in Interface (Java 8+)

<a id="1616-default-methods"></a>

### 📌 Solving Backward Compatibility

```
Before Java 8: Adding method to interface → BROKE existing implementations!

Java 8 solution: DEFAULT methods
→ Methods with body in interface
→ Existing implementations don't break
→ New default behavior available
→ Can be overridden if needed

Syntax: default keyword
```

### 📌 Example

```java
// ═══ Interface with default method ═══
interface Vehicle {

    // Abstract method (must implement)
    void start();

    // Default method (has body!)
    default void horn() {
        System.out.println("Beep beep!");
    }

    default void airbag() {
        System.out.println("Airbag activated");
    }
}

// Implementation ONLY needs to implement abstract methods
class Car implements Vehicle {

    @Override
    public void start() {
        System.out.println("Car started");
    }

    // Doesn't need to override horn() or airbag()
    // Gets DEFAULT implementations for free!
}

class SportsCar implements Vehicle {

    @Override
    public void start() {
        System.out.println("Sports car started");
    }

    // OPTIONALLY override default method
    @Override
    public void horn() {
        System.out.println("HONK HONK! (Sports car horn)");
    }
}

public class DefaultMethodDemo {
    public static void main(String[] args) {
        Car c = new Car();
        c.start();     // "Car started"
        c.horn();      // "Beep beep!" (default)
        c.airbag();    // "Airbag activated" (default)

        SportsCar sc = new SportsCar();
        sc.horn();     // "HONK HONK!" (overridden)
    }
}
```

### 📌 Diamond Problem Resolution

```java
interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

// Class implementing both — DIAMOND PROBLEM!
class C implements A, B {
    // MUST override to resolve conflict
    @Override
    public void show() {
        A.super.show();   // Call A's default
        B.super.show();   // Call B's default
        System.out.println("C");
    }
}

public class DiamondDemo {
    public static void main(String[] args) {
        new C().show();
        // Output:
        // A
        // B
        // C
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.17 Static Methods in Interface (Java 8+)

<a id="1617-static-methods-interface"></a>

### 📌 Utility Methods in Interfaces

```java
interface Calculator {

    // Abstract method
    int calculate(int a, int b);

    // ═══ STATIC METHOD ═══
    static int add(int a, int b) {
        return a + b;
    }

    static int subtract(int a, int b) {
        return a - b;
    }
}

class MyCalculator implements Calculator {

    @Override
    public int calculate(int a, int b) {
        return a * b;
    }
}

public class StaticMethodDemo {
    public static void main(String[] args) {

        // Call static method via INTERFACE (not instance!)
        System.out.println(Calculator.add(5, 10));       // 15
        System.out.println(Calculator.subtract(10, 5));  // 5

        // Cannot call static via instance:
        MyCalculator c = new MyCalculator();
        // c.add(1, 2);   // ❌ ERROR!
        // Must use: Calculator.add(1, 2);
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.18 Private Methods in Interface (Java 9+)

<a id="1618-private-methods-interface"></a>

### 📌 Code Reuse in Default Methods

```java
interface MyInterface {

    // ═══ Default methods sharing common logic ═══
    default void method1() {
        System.out.println("method1");
        commonLogic();   // Call private helper
    }

    default void method2() {
        System.out.println("method2");
        commonLogic();   // Reuse private helper
    }

    // ═══ PRIVATE METHOD (Java 9+) ═══
    // Cannot be called from outside interface
    // Only accessible to other methods in this interface
    private void commonLogic() {
        System.out.println("Common logic executed");
    }

    // Private STATIC method (Java 9+)
    private static void logInfo() {
        System.out.println("Info logged");
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.19 Sealed Interfaces (Java 17+)

<a id="1619-sealed-interfaces"></a>

### 📌 Restricted Implementation

```java
// ═══ SEALED INTERFACE (Java 17+) ═══
// Only specified classes can implement it!

sealed interface Shape permits Circle, Rectangle, Triangle { }

// These are the ONLY classes that can implement Shape
final class Circle implements Shape { }
final class Rectangle implements Shape { }
final class Triangle implements Shape { }

// This is NOT allowed:
// final class Square implements Shape { }   // ❌ ERROR!

// Modifiers for permitted subclasses:
// → final: cannot be extended
// → sealed: another sealed hierarchy
// → non-sealed: open to any extension
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.20 Abstract Class vs Interface ⭐⭐⭐

<a id="1620-abstract-class-vs-interface"></a>

### 📌 Complete Comparison

```
┌────────────────────────┬──────────────────────┬──────────────────────┐
│  Feature               │  Abstract Class      │  Interface           │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Keyword               │  abstract class      │  interface           │
│  Inheritance           │  extends             │  implements          │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Methods               │  Abstract + Concrete │  All abstract (pre 8)│
│                        │                      │  Default + Static +  │
│                        │                      │  Private (Java 8, 9+)│
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Variables             │  All types           │  public static final │
│                        │                      │  (constants only)    │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Constructor           │  YES                 │  NO                  │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Multiple inheritance  │  NO (single only)    │  YES (multiple OK)   │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Access modifiers      │  Any                 │  Only public         │
│  for methods           │                      │                      │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Instantiation         │  NO                  │  NO                  │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Speed                 │  Slightly faster     │  Slightly slower     │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  State (variables)     │  YES                 │  NO (only constants) │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Purpose               │  Common code +       │  Contract            │
│                        │  Common state        │  Multiple inheritance│
├────────────────────────┼──────────────────────┼──────────────────────┤
│  When to use           │  IS-A + common code  │  CAN-DO capability   │
└────────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 When to Use Which?

```
USE ABSTRACT CLASS WHEN:
✅ You have common CODE to share (concrete methods)
✅ You have common STATE (instance variables)
✅ Need constructors for initialization
✅ Strong IS-A relationship
✅ Only one class per inheritance chain
✅ Related classes with common behavior

USE INTERFACE WHEN:
✅ Multiple inheritance needed
✅ Only method signatures needed (contract)
✅ Unrelated classes can share behavior
✅ Want polymorphism without inheritance
✅ Defining CAN-DO capability (Swimmable, Flyable)
✅ Working with unrelated classes
```

### 📌 CAN Use Both Together!

```java
// Abstract class provides common code
abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    abstract void sound();

    public void sleep() {
        System.out.println(name + " sleeping");
    }
}

// Interface provides capability
interface Swimmable {
    void swim();
}

interface Flyable {
    void fly();
}

// Class using BOTH
class Duck extends Animal implements Swimmable, Flyable {

    public Duck(String name) {
        super(name);
    }

    @Override
    void sound() {
        System.out.println(name + " quacks");
    }

    @Override
    public void swim() {
        System.out.println(name + " swimming");
    }

    @Override
    public void fly() {
        System.out.println(name + " flying");
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.21 Comparable Interface

<a id="1621-comparable-interface"></a>

### 📌 Natural Ordering

```java
// ═══ Comparable defines "natural ordering" ═══

class Student implements Comparable<Student> {

    String name;
    int marks;

    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    // ═══ compareTo() method — MUST implement ═══
    @Override
    public int compareTo(Student other) {
        // Returns:
        //   negative → this < other
        //   zero     → this == other
        //   positive → this > other

        // Sort by marks (ascending)
        return this.marks - other.marks;

        // For descending: return other.marks - this.marks;
        // For String comparison: return this.name.compareTo(other.name);
    }

    @Override
    public String toString() {
        return name + ":" + marks;
    }
}

public class ComparableDemo {
    public static void main(String[] args) {
        java.util.List<Student> students = new java.util.ArrayList<>();
        students.add(new Student("Rahul", 85));
        students.add(new Student("Priya", 92));
        students.add(new Student("Amit", 78));

        // Sort using natural ordering (via Comparable)
        java.util.Collections.sort(students);

        System.out.println(students);
        // [Amit:78, Rahul:85, Priya:92]
    }
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.22 Comparator Interface

<a id="1622-comparator-interface"></a>

### 📌 Custom Ordering

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
        return name + ":" + marks;
    }
}

// ═══ Custom Comparator ═══
class SortByName implements Comparator<Student> {
    @Override
    public int compare(Student a, Student b) {
        return a.name.compareTo(b.name);
    }
}

class SortByMarksDesc implements Comparator<Student> {
    @Override
    public int compare(Student a, Student b) {
        return b.marks - a.marks;   // Descending
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Rahul", 85));
        students.add(new Student("Priya", 92));
        students.add(new Student("Amit", 78));

        // Sort by name
        Collections.sort(students, new SortByName());
        System.out.println("By name: " + students);

        // Sort by marks descending
        Collections.sort(students, new SortByMarksDesc());
        System.out.println("By marks desc: " + students);

        // ═══ Using Lambda (Java 8+) ═══
        Collections.sort(students, (a, b) -> a.marks - b.marks);
        System.out.println("Lambda: " + students);

        // ═══ Method reference ═══
        students.sort(Comparator.comparingInt(s -> s.marks));
    }
}
```

### 📌 Comparable vs Comparator

```
┌────────────────────┬──────────────────────┬──────────────────────┐
│  Feature           │  Comparable          │  Comparator          │
├────────────────────┼──────────────────────┼──────────────────────┤
│  Method            │  compareTo(T)        │  compare(T, T)       │
│  Package           │  java.lang           │  java.util           │
│  Sort criteria     │  Natural ordering    │  Custom ordering     │
│  Multiple sorts    │  ONE only            │  MULTIPLE possible   │
│  Class modification│  YES (implement)     │  NO (separate class) │
│  Usage             │  Collections.sort(list)  │  Collections.sort(list, comp) │
└────────────────────┴──────────────────────┴──────────────────────┘
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

## 16.23 Cloneable Interface (Shallow vs Deep Copy)

<a id="1623-cloneable-interface"></a>

### 📌 Object Cloning

```java
// ═══ Class must implement Cloneable ═══

class Address {
    String city;

    public Address(String city) {
        this.city = city;
    }
}

// SHALLOW COPY (default clone behavior)
class ShallowStudent implements Cloneable {

    String name;
    Address address;

    public ShallowStudent(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();   // Shallow copy
    }
}

// DEEP COPY (custom clone implementation)
class DeepStudent implements Cloneable {

    String name;
    Address address;

    public DeepStudent(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        DeepStudent cloned = (DeepStudent) super.clone();
        // Manually clone nested objects
        cloned.address = new Address(this.address.city);   // Deep copy
        return cloned;
    }
}

public class CloneDemo {
    public static void main(String[] args) throws Exception {

        // ═══ Shallow Copy ═══
        Address addr1 = new Address("Delhi");
        ShallowStudent s1 = new ShallowStudent("Rahul", addr1);
        ShallowStudent s2 = (ShallowStudent) s1.clone();

        s2.name = "Priya";                // Only s2 changes
        s2.address.city = "Mumbai";        // BOTH change! (shared reference)

        System.out.println(s1.name);         // Rahul
        System.out.println(s1.address.city); // Mumbai ← ⚠️ Changed!

        // ═══ Deep Copy ═══
        Address addr2 = new Address("Delhi");
        DeepStudent d1 = new DeepStudent("Rahul", addr2);
        DeepStudent d2 = (DeepStudent) d1.clone();

        d2.name = "Priya";                // Only d2 changes
        d2.address.city = "Mumbai";        // Only d2's address changes!

        System.out.println(d1.name);         // Rahul
        System.out.println(d1.address.city); // Delhi ✅ Independent!
    }
}
```

### 📌 Shallow vs Deep Copy

```
SHALLOW COPY:
→ Copies field values as-is
→ For primitives: creates new copy
→ For objects: copies REFERENCE (both point to same object!)
→ Fast but shares nested objects

DEEP COPY:
→ Copies field values
→ For objects: creates NEW nested objects
→ Independent copies (no shared references)
→ Slower but truly independent

┌──────────────────────────────────────────────────────────────┐
│  When to Use What?                                           │
├──────────────────────────────────────────────────────────────┤
│  Shallow: When nested objects are immutable                  │
│  Deep:    When you need TRULY independent copies             │
└──────────────────────────────────────────────────────────────┘
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

<a id="16-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Abstraction

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Abstract classes    │ ✅ YES     │ ✅ YES     │ ✅ ABC     │ ❌ No     │
│                      │ (abstract) │ (pure      │ module     │ (convention│
│                      │            │ virtual)   │            │ only)     │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Interfaces          │ ✅ YES     │ ❌ Pure    │ ❌ Duck    │ ❌ Duck   │
│                      │            │ virtual    │ typing     │ typing    │
│                      │            │ classes    │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Multiple            │ ✅ (via    │ ✅ (classes│ ✅ (classes│ ❌        │
│  inheritance         │ interfaces)│ + MRO)     │ + MRO)     │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Default methods     │ ✅ Java 8+ │ ❌         │ N/A        │ N/A       │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Marker interfaces   │ ✅ YES     │ ❌         │ ❌         │ ❌        │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Functional          │ ✅ Java 8+ │ N/A        │ ✅ Any     │ ✅ First- │
│  interfaces          │            │            │ callable   │ class fn  │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Sealed              │ ✅ Java 17+│ ❌         │ ❌         │ ❌        │
│  hierarchies         │            │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Interface variables │ Constants  │ N/A        │ N/A        │ N/A       │
│                      │ only       │            │            │            │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. INTERFACES ARE FIRST-CLASS:
   → Java has dedicated 'interface' keyword
   → Multiple interface implementation allowed
   → C++ uses pure virtual classes as interfaces

2. NO DIAMOND PROBLEM:
   → Java's abstract methods in interfaces avoid diamond problem
   → Java 8 default methods have resolution rules

3. FUNCTIONAL INTERFACES (Java 8+):
   → Enables Lambda expressions
   → SAM (Single Abstract Method)
   → @FunctionalInterface annotation

4. MARKER INTERFACES:
   → Interfaces with NO methods
   → Used for tagging (Serializable, Cloneable)
   → Modern alternative: annotations

5. SEALED INTERFACES (Java 17+):
   → Restricted implementation
   → Only specified classes can implement
   → Better modeling of finite hierarchies
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

<a id="16-interview-questions"></a>

## 💡 Chapter 16 — Interview Questions (20+)

---

### 🔵 Conceptual Questions

**Q1. What is Abstraction? How is it achieved in Java?**

```
ABSTRACTION = Hiding COMPLEXITY, showing ESSENTIALS.
             Show WHAT, hide HOW.

ACHIEVED IN JAVA THROUGH:
1. ABSTRACT CLASS (0-100% abstraction)
   → Can have abstract + concrete methods
   → Can have state (variables)

2. INTERFACE (100% abstraction, pre-Java 8)
   → All methods abstract (traditionally)
   → Java 8+: default + static methods
   → Java 9+: private methods

Example:
Car abstraction — user knows steering, brake, accelerator.
User doesn't need to know engine mechanics!
```

---

**Q2. Difference between Abstraction and Encapsulation?**

```
ABSTRACTION:
→ Hides COMPLEXITY (implementation details)
→ Design-level concept
→ Achieved by abstract class + interface
→ Shows WHAT to do

ENCAPSULATION:
→ Hides DATA (variables)
→ Implementation-level concept
→ Achieved by access modifiers (private + getters/setters)
→ Shows HOW data is protected

Both work together for better OOP!
```

---

**Q3. What is Abstract Class? When to use it?**

```
ABSTRACT CLASS:
→ Cannot be instantiated
→ Can have abstract + concrete methods
→ Can have instance variables and constructors
→ Declared with 'abstract' keyword

USE WHEN:
✅ Have common CODE to share
✅ Have common STATE (variables)
✅ Need constructors
✅ Strong IS-A relationship
✅ Related classes need common base

Example:
abstract class Vehicle {
    protected String brand;

    public void showBrand() {
        System.out.println(brand);   // Common code
    }

    abstract void start();   // Different for each vehicle
}
```

---

**Q4. What is Interface? Why is it needed?**

```
INTERFACE:
→ Contract that classes must follow
→ 100% abstraction (traditionally)
→ Declared with 'interface' keyword
→ Class 'implements' interface

WHY NEEDED:
✅ Full abstraction (contract definition)
✅ Multiple inheritance (Java's solution)
✅ Loose coupling
✅ Polymorphism without inheritance
✅ Common behavior for unrelated classes

Java 8+ additions:
→ Default methods
→ Static methods

Java 9+ additions:
→ Private methods

Example:
interface Drawable {
    void draw();   // Any class can implement (Shape, Icon, etc.)
}
```

---

**Q5. Can Abstract class have constructors?**

```
YES! Abstract class CAN have constructors.

WHY?
→ To initialize state (fields)
→ Called via super() when child object is created
→ Enables inheritance of constructor logic

abstract class Vehicle {
    String type;

    public Vehicle(String type) {   // Constructor!
        this.type = type;
        System.out.println("Vehicle constructor: " + type);
    }

    abstract void start();
}

class Car extends Vehicle {
    public Car() {
        super("Car");   // Calls Vehicle constructor
    }

    void start() { }
}

// new Car() outputs: "Vehicle constructor: Car"

Important:
- You can't directly instantiate abstract class
- But CAN call abstract class constructor via super()
```

---

**Q6. Can Abstract class have main() method?**

```
YES! Abstract class can have main() method.

abstract class MyAbstract {

    abstract void method();

    public static void main(String[] args) {
        System.out.println("Main executed!");

        // Even can create anonymous class:
        new MyAbstract() {
            void method() {
                System.out.println("Anonymous method");
            }
        }.method();
    }
}

// Command: java MyAbstract
// Output: Main executed!

Static methods (like main) don't need object of the class.
So abstract class can have main() and be executed directly!
```

---

**Q7. Why doesn't Java allow multiple inheritance with classes but allows with interfaces?**

```
JAVA DOES NOT allow: class C extends A, B { }
WHY? To avoid DIAMOND PROBLEM.

Diamond Problem:
- A has method()
- B extends A, overrides method()
- C extends A, overrides method()
- D would extend both B and C → ambiguity!

Java's SOLUTION:
Multiple inheritance ONLY with INTERFACES.

Traditional interfaces have no method bodies:
→ No ambiguity — just method signatures
→ Implementation is class's responsibility

Java 8+ default methods CAN cause conflicts:
→ Class MUST override to resolve conflict
→ Use InterfaceName.super.method() to choose
```

---

**Q8. What is a Marker Interface? Give examples.**

```
MARKER INTERFACE (Tagging Interface):
→ Interface with NO methods
→ Just "marks" a class for special treatment
→ JVM/frameworks check for this marker

EXAMPLES:
1. Serializable (java.io)
   → Marks class as serializable
   → JVM enables object serialization

2. Cloneable (java.lang)
   → Marks class as cloneable
   → Object.clone() works only if implemented

3. Remote (java.rmi)
   → Marks interface for RMI

USAGE:
class User implements Serializable { }
class Point implements Cloneable { }

MODERN ALTERNATIVE:
→ Annotations (like @Deprecated, @Override)
→ More flexible than marker interfaces
```

---

**Q9. What is Functional Interface? Give example.**

```
FUNCTIONAL INTERFACE (SAM Interface):
→ Interface with EXACTLY ONE abstract method
→ Enables LAMBDA expressions (Java 8+)
→ Annotation: @FunctionalInterface (recommended)

EXAMPLES:
Built-in:
- Runnable      → void run()
- Comparator<T> → int compare(T, T)
- Predicate<T>  → boolean test(T)
- Function<T,R> → R apply(T)
- Consumer<T>   → void accept(T)
- Supplier<T>   → T get()

Custom:
@FunctionalInterface
interface MyFunc {
    void execute();   // Only ONE abstract method
    default void log() { }   // OK (default not counted)
    static void util() { }   // OK (static not counted)
}

// Lambda expression usage
MyFunc f = () -> System.out.println("Hello");
f.execute();
```

---

**Q10. Difference between Comparable and Comparator?**

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Feature        │  Comparable     │  Comparator     │
├─────────────────┼─────────────────┼─────────────────┤
│  Method         │  compareTo(T)   │  compare(T, T)  │
│  Package        │  java.lang      │  java.util      │
│  Sort order     │  Natural         │  Custom         │
│  Multiple sorts │  No (only ONE)  │  Yes (multiple) │
│  Class change   │  Yes (implement)│  No (separate)  │
└─────────────────┴─────────────────┴─────────────────┘

Comparable Example:
class Student implements Comparable<Student> {
    int marks;
    @Override
    public int compareTo(Student other) {
        return this.marks - other.marks;
    }
}
Collections.sort(list);   // Uses natural ordering

Comparator Example:
Comparator<Student> byName = (a, b) -> a.name.compareTo(b.name);
Comparator<Student> byMarks = (a, b) -> a.marks - b.marks;
Collections.sort(list, byName);   // Custom ordering
```

---

### 🟡 Scenario-Based Questions

**Q11. What is the difference between Shallow and Deep Copy?**

```
SHALLOW COPY:
- Copies field VALUES
- For objects: copies REFERENCE only
- Both objects share nested objects
- Fast

DEEP COPY:
- Copies field values
- For objects: creates NEW nested objects
- Independent copies (no sharing)
- Slower but truly independent

Example:
class Address { String city; }
class Person {
    String name;
    Address address;
}

// SHALLOW
Person p1 = new Person("A", new Address("Delhi"));
Person p2 = p1.clone();
p2.address.city = "Mumbai";   // Also changes p1!

// DEEP
p2.address = new Address(p1.address.city);
p2.address.city = "Mumbai";   // Doesn't change p1
```

---

### 🔴 Output-Based Questions

**Q12. Will this compile?**

```java
abstract class A {
    abstract void method();

    public static void main(String[] args) {
        // A a = new A();
    }
}
```

```
YES, it compiles! But if you uncomment `A a = new A();`
→ COMPILE ERROR: Cannot instantiate abstract class

Abstract class CAN have main() method.
Just can't create objects directly.
```

---

**Q13. What's wrong here?**

```java
interface Shape {
    void draw();
}

class Circle implements Shape {
    void draw() {
        System.out.println("Circle");
    }
}
```

```
❌ COMPILE ERROR!

Reason: Interface methods are IMPLICITLY public.
When implementing, method MUST be public.

class Circle implements Shape {
    public void draw() {   // ✅ Must be public!
        System.out.println("Circle");
    }
}

Cannot REDUCE visibility during implementation.
```

---

**Q14. What is the output?**

```java
interface A {
    default void show() { System.out.println("A"); }
}

interface B {
    default void show() { System.out.println("B"); }
}

class C implements A, B {
    public void show() {
        A.super.show();
        B.super.show();
    }
}

public class Test {
    public static void main(String[] args) {
        new C().show();
    }
}
```

```
OUTPUT:
A
B

REASON: Diamond problem resolution.
- C implements both A and B (both have show())
- MUST override to resolve conflict
- Uses A.super.show() and B.super.show() to call specific defaults
```

---

**Q15. What's wrong?**

```java
interface Vehicle {
    int wheels;      // ← ?

    void start();
}
```

```
❌ COMPILE ERROR!

Interface variables are IMPLICITLY: public static final
Must be INITIALIZED at declaration!

FIX:
interface Vehicle {
    int wheels = 4;   // ✅ Must initialize (constant!)

    void start();
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

<a id="16-practice-problems"></a>

## 🧪 Chapter 16 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain Abstraction with real-world examples. Compare
   Abstract Class vs Interface — when to use which?

2. Explain all types of methods allowed in interfaces from
   Java 8 through Java 17 (abstract, default, static, private).

3. Explain the Diamond Problem and how Java solves it.
   Show code example with default methods conflict.

4. Compare Comparable vs Comparator with examples.
   Show sorting a list of Student objects both ways.

5. Explain Shallow vs Deep Copy in detail. Give code examples
   showing when each is used. What are the pitfalls of shallow copy?
```

### 💻 5 Coding Questions

```java
// Q1: Create an abstract Shape class with concrete methods
// Abstract: area(), perimeter()
// Concrete: displayColor()
// Implement Circle, Rectangle, Triangle

public class ShapeSystem {
    // TODO: Complete abstract class and 3 implementations
}
```

```java
// Q2: Design a Payment system using interfaces
// Interface: PaymentMethod with pay(amount)
// Implementations: CreditCard, DebitCard, UPI, PayPal
// Show polymorphism

public class PaymentSystem {
    // TODO: Design flexible payment system
}
```

```java
// Q3: Multiple interface implementation
// Interfaces: Swimmer, Runner, Flyer
// Class Duck implements all three
// Show can be used as any interface type

public class DuckDemo {
    // TODO: Complete implementation
}
```

```java
// Q4: Sorting with Comparable and Comparator
// Student class with name, age, marks
// Sort by:
// - Natural order (marks) using Comparable
// - By name using Comparator
// - By age descending using lambda

public class SortingDemo {
    // TODO: Implement both approaches
}
```

```java
// Q5: Deep clone example
// Class Employee has Address (object)
// Implement Cloneable
// Show shallow vs deep copy difference

public class CloneDemo {
    // TODO: Show both shallow and deep copy
    // Demonstrate the difference in behavior
}
```

<a href="#chapter-index-table-16">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 16 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 16.1  What is Abstraction — 4th OOP Pillar              │
│  ✅ 16.2  Abstraction vs Encapsulation                      │
│  ✅ 16.3  Abstract Class — Cannot instantiate               │
│  ✅ 16.4  abstract Keyword — Where and how                  │
│  ✅ 16.5  Abstract Methods — No body                        │
│  ✅ 16.6  Concrete Methods in Abstract Class                │
│  ✅ 16.7  Rules for Abstract Class — Complete rules         │
│  ✅ 16.8  When to Use Abstract Class                        │
│  ✅ 16.9  Interface — Contract, 100% abstract               │
│  ✅ 16.10 implements Keyword — Syntax                       │
│  ✅ 16.11 Interface Rules — Complete rules                  │
│  ✅ 16.12 Multiple Interface Implementation                 │
│  ✅ 16.13 Interface Extending Interface                     │
│  ✅ 16.14 Marker Interface — Serializable, Cloneable        │
│  ✅ 16.15 Functional Interface — @FunctionalInterface       │
│  ✅ 16.16 Default Methods (Java 8+) — Backward compat       │
│  ✅ 16.17 Static Methods (Java 8+) — Utility methods         │
│  ✅ 16.18 Private Methods (Java 9+) — Code reuse            │
│  ✅ 16.19 Sealed Interfaces (Java 17+) — Restricted impl    │
│  ✅ 16.20 Abstract Class vs Interface — Complete comparison │
│  ✅ 16.21 Comparable — Natural ordering                     │
│  ✅ 16.22 Comparator — Custom ordering                      │
│  ✅ 16.23 Cloneable — Shallow vs Deep copy                  │
│  ✅ 🔥    Java vs Others — 5 UNIQUE features                │
│  ✅ 15+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: Constructors (Chapter 17)                         │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
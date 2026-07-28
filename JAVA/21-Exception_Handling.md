

<a id="21-exception-handling"></a>

# 📘 Chapter 21: Exception Handling

> **Part D: Exception Handling**
> `Core` | `Error Management` | `Interview Critical`

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Java • Core Java • Interview Preparation

⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

---

<a id="chapter-index-table-21"></a>

## 📚 Chapter 21 — Index Table

| No. | Topic | Subtopics |
|-----|-------|-----------|
| 21.1 | [What is an Exception](#211-what-is-an-exception) | Definition, Runtime Problems |
| 21.2 | [Error vs Exception](#212-error-vs-exception) | Recoverable vs Non-recoverable |
| 21.3 | [Exception Hierarchy](#213-exception-hierarchy) | Throwable Tree Structure |
| 21.4 | [Checked vs Unchecked](#214-checked-vs-unchecked) | Compile-time vs Runtime |
| 21.5 | [5 Keywords](#215-five-keywords) | try, catch, finally, throw, throws |
| 21.6 | [try-catch Block](#216-try-catch-block) | Basic Exception Handling |
| 21.7 | [Multiple catch Blocks](#217-multiple-catch-blocks) | Handle Different Exceptions |
| 21.8 | [Multi-catch Block](#218-multi-catch-block) | Java 7+ Feature |
| 21.9 | [Catch Block Order](#219-catch-block-order) | Specific to General |
| 21.10 | [finally Block](#2110-finally-block) | Always Executes |
| 21.11 | [When finally Does NOT Execute](#2111-when-finally-does-not-execute) | Edge Cases |
| 21.12 | [finally with return](#2112-finally-with-return) | Tricky Behavior |
| 21.13 | [try-with-resources](#2113-try-with-resources) | Automatic Resource Management |
| 21.14 | [AutoCloseable Interface](#2114-autocloseable-interface) | Custom Resources |
| 21.15 | [throw Keyword](#2115-throw-keyword) | Throwing Exceptions |
| 21.16 | [throws Keyword](#2116-throws-keyword) | Declaring Exceptions |
| 21.17 | [throw vs throws](#2117-throw-vs-throws) | Complete Comparison |
| 21.18 | [Exception Propagation](#2118-exception-propagation) | Call Stack Flow |
| 21.19 | [throws in Overriding](#2119-throws-in-overriding) | Rules for Inheritance |
| 21.20 | [Custom Exceptions](#2120-custom-exceptions) | Checked & Unchecked |
| 21.21 | [Exception Chaining](#2121-exception-chaining) | Wrapping Exceptions |
| 21.22 | [Common Runtime Exceptions](#2122-common-runtime-exceptions) | Most Important Ones |
| 21.23 | [Best Practices](#2123-best-practices) | Do's and Don'ts |
| 🔥 | [Java vs Other Languages](#21-java-vs-other-languages) | Unique Features |
| 💡 | [Interview Questions](#21-interview-questions) | 20+ Questions |
| 🧪 | [Practice Problems](#21-practice-problems) | 5 Coding + 5 Theory |

---

## 21.1 What is an Exception

<a id="211-what-is-an-exception"></a>

### 📌 Definition

```
EXCEPTION = An ABNORMAL EVENT or PROBLEM that occurs during
            program execution and DISRUPTS the normal flow.

Occurs when:
→ Invalid input (parsing wrong data)
→ Division by zero
→ Accessing null reference
→ Array index out of bounds
→ File not found
→ Network failure
→ Database errors

WITHOUT exception handling:
❌ Program CRASHES immediately
❌ User sees ugly error messages
❌ Data may be lost/corrupted

WITH exception handling:
✅ Program can RECOVER gracefully
✅ Show meaningful error messages
✅ Continue execution
✅ Log errors for debugging
```

### 📌 Simple Example

```java
public class ExceptionDemo {
    public static void main(String[] args) {

        // ═══ WITHOUT exception handling ═══
        int a = 10;
        int b = 0;
        // int result = a / b;   // ❌ ArithmeticException! Program crashes!
        // System.out.println(result);
        // System.out.println("This never runs");

        // ═══ WITH exception handling ═══
        try {
            int result = a / b;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            // "Error: / by zero"
        }

        System.out.println("Program continues!");   // ✅ Runs successfully!
    }
}
```

### 🌍 Real-World Analogy (Hinglish)

```
EXCEPTION = "GADI mein KHARABI"

🚗 Normal drive → Program running smoothly
⚠️ Suddenly tire punctured → EXCEPTION occurs!

WITHOUT preparation:
❌ Gadi rukk gayi
❌ Passengers phase gaye
❌ Journey barbaad

WITH preparation (spare tire):
✅ Try block → drive karte raho
✅ Catch block → puncture handle karo (spare lagao)
✅ Finally block → gaadi ke tools wapas rakho
✅ Journey continues!

Java Exception Handling:
try {
    // Drive normally (risky operations)
} catch (Puncture e) {
    // Handle the puncture
} finally {
    // Cleanup (put tools back)
}

Real Example:
try {
    int result = 10 / 0;   // Puncture!
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");   // Handle!
}
// Program continues!
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.2 Error vs Exception

<a id="212-error-vs-exception"></a>

### 📌 Two Different Concepts!

```
┌────────────────────────┬──────────────────────┬──────────────────────┐
│  Feature               │  Error               │  Exception           │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Definition            │  Serious problems    │  Recoverable issues  │
│                        │  (usually JVM)       │  (can be handled)    │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Recoverable?          │  ❌ NO (mostly)      │  ✅ YES              │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Handle?               │  ❌ Should NOT       │  ✅ SHOULD handle   │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Category              │  System-level        │  Program-level       │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Examples              │  OutOfMemoryError,   │  IOException,        │
│                        │  StackOverflowError, │  NullPointerException│
│                        │  VirtualMachineError │  ArithmeticException │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  When occur            │  JVM cannot recover  │  Bad input, bug,     │
│                        │                      │  invalid state       │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Class                 │  java.lang.Error     │  java.lang.Exception │
└────────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 Examples

```java
public class ErrorVsException {

    // ═══ ERROR examples (JVM-level, should NOT catch) ═══

    // StackOverflowError
    static void infiniteRecursion() {
        infiniteRecursion();   // Never returns
    }

    // OutOfMemoryError
    static void memoryHog() {
        int[] hugeArray = new int[Integer.MAX_VALUE];   // Not enough memory!
    }

    // ═══ EXCEPTION examples (application-level, SHOULD handle) ═══

    // ArithmeticException
    static void divideByZero() {
        int result = 10 / 0;
    }

    // NullPointerException
    static void nullAccess() {
        String s = null;
        s.length();
    }

    // ArrayIndexOutOfBoundsException
    static void arrayError() {
        int[] arr = {1, 2, 3};
        System.out.println(arr[10]);
    }

    public static void main(String[] args) {

        // Handle exceptions
        try {
            divideByZero();
        } catch (ArithmeticException e) {
            System.out.println("Exception handled: " + e.getMessage());
        }

        // DON'T handle errors like this (usually)
        // try {
        //     infiniteRecursion();
        // } catch (StackOverflowError e) {
        //     // Bad practice!
        // }
    }
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.3 Exception Hierarchy

<a id="213-exception-hierarchy"></a>

### 📌 The Throwable Tree

```
                    ┌──────────────┐
                    │   Object     │
                    └───────┬──────┘
                            │
                    ┌───────▼──────┐
                    │   Throwable  │
                    └───────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
        ┌─────▼──────┐             ┌─────▼──────┐
        │   Error    │             │  Exception │
        │ (Serious)  │             │(Recoverable│
        └─────┬──────┘             └─────┬──────┘
              │                           │
              ├── OutOfMemoryError        ├── IOException (CHECKED)
              ├── StackOverflowError      │   ├── FileNotFoundException
              ├── VirtualMachineError     │   └── EOFException
              └── ...                     │
                                          ├── SQLException (CHECKED)
                                          ├── ClassNotFoundException (CHECKED)
                                          │
                                          └── RuntimeException (UNCHECKED)
                                              ├── NullPointerException
                                              ├── ArithmeticException
                                              ├── ArrayIndexOutOfBoundsException
                                              ├── ClassCastException
                                              ├── NumberFormatException
                                              └── IllegalArgumentException
```

### 📌 The Full Picture

```java
// ═══ Class hierarchy in code form ═══

Object
  └── Throwable
        ├── Error (unrecoverable - don't catch!)
        │     ├── StackOverflowError
        │     ├── OutOfMemoryError
        │     └── VirtualMachineError
        │
        └── Exception
              ├── IOException (CHECKED)
              ├── SQLException (CHECKED)
              ├── ClassNotFoundException (CHECKED)
              ├── InterruptedException (CHECKED)
              │
              └── RuntimeException (UNCHECKED)
                    ├── NullPointerException
                    ├── ArithmeticException
                    ├── ArrayIndexOutOfBoundsException
                    ├── ClassCastException
                    ├── NumberFormatException
                    ├── IllegalArgumentException
                    └── ConcurrentModificationException
```

### 📌 Key Methods of Throwable

```java
try {
    // Some code that throws exception
    throw new Exception("Something went wrong");
} catch (Exception e) {

    // Methods available from Throwable class
    String msg = e.getMessage();          // Get error message
    String toStr = e.toString();          // ClassName: message
    e.printStackTrace();                  // Print stack trace
    Throwable cause = e.getCause();       // Get root cause
    StackTraceElement[] trace = e.getStackTrace();  // Get trace elements

    System.out.println(msg);
    System.out.println(toStr);
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.4 Checked vs Unchecked Exceptions ⭐

<a id="214-checked-vs-unchecked"></a>

### 📌 The Most Important Distinction

```
┌───────────────────────┬──────────────────────┬──────────────────────┐
│  Feature              │  Checked             │  Unchecked           │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Class hierarchy      │  Exception (not      │  RuntimeException    │
│                       │  RuntimeException)   │  (subclass)          │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Compile-time check   │  ✅ YES              │  ❌ NO               │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Must handle?         │  ✅ YES (mandatory)  │  ❌ NO (optional)    │
│                       │  (try-catch or       │                      │
│                       │  throws)             │                      │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  When detected        │  Compilation         │  Runtime             │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Root cause           │  External conditions │  Programming errors  │
│                       │  (file, network)     │  (bugs)              │
├───────────────────────┼──────────────────────┼──────────────────────┤
│  Examples             │  IOException,        │  NullPointerException│
│                       │  SQLException,       │  ArithmeticException │
│                       │  ClassNotFoundExcept │  ArrayIndexOutOfBounds│
└───────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 Checked Exceptions

```java
import java.io.*;

public class CheckedDemo {

    // ═══ Method throwing CHECKED exception ═══
    static void readFile(String path) throws IOException {   // MUST declare
        FileReader reader = new FileReader(path);
        // Read file...
    }

    public static void main(String[] args) {

        // ❌ WITHOUT handling — COMPILE ERROR!
        // readFile("data.txt");   // Error: unreported IOException

        // ✅ Method 1: try-catch
        try {
            readFile("data.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
    }

    // ✅ Method 2: Declare throws
    static void anotherMethod() throws IOException {
        readFile("data.txt");   // Pass exception up
    }
}
```

### 📌 Unchecked Exceptions

```java
public class UncheckedDemo {

    // No throws declaration needed!
    static int divide(int a, int b) {
        return a / b;   // Can throw ArithmeticException (unchecked)
    }

    public static void main(String[] args) {

        // ✅ No try-catch REQUIRED (but recommended!)
        int result = divide(10, 2);   // OK
        System.out.println(result);   // 5

        // Runtime error possible:
        // int bad = divide(10, 0);   // Throws ArithmeticException at RUNTIME

        // Better with try-catch:
        try {
            int bad = divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
    }
}
```

### 📌 Summary Comparison

```
CHECKED Exceptions:
✅ Compile-time enforced (MUST handle)
✅ For predictable, recoverable issues
✅ External factors (files, network, database)

Examples:
- IOException (file operations)
- SQLException (database)
- ClassNotFoundException
- InterruptedException

UNCHECKED Exceptions (RuntimeException):
✅ Runtime only (optional to handle)
✅ For programming errors (bugs)
✅ Should FIX the code, not just catch

Examples:
- NullPointerException (bug!)
- ArrayIndexOutOfBoundsException (bug!)
- ArithmeticException (bug!)
- ClassCastException (bug!)

RULE: If it's a checked exception, YOU MUST handle it or declare it.
      If it's unchecked, HANDLE IT if you want, but not required.
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.5 5 Keywords

<a id="215-five-keywords"></a>

### 📌 The Five Exception Handling Keywords

```
┌────────────┬──────────────────────────────────────────────────┐
│  Keyword   │  Purpose                                         │
├────────────┼──────────────────────────────────────────────────┤
│  try       │  Enclose code that might throw exception         │
├────────────┼──────────────────────────────────────────────────┤
│  catch     │  Handle specific exceptions                      │
├────────────┼──────────────────────────────────────────────────┤
│  finally   │  Code that ALWAYS executes (cleanup)             │
├────────────┼──────────────────────────────────────────────────┤
│  throw     │  Manually throw an exception                     │
├────────────┼──────────────────────────────────────────────────┤
│  throws    │  Declare exceptions method might throw           │
└────────────┴──────────────────────────────────────────────────┘
```

### 📌 All Five in One Example

```java
public class AllKeywords {

    // ═══ 'throws' keyword — declare in method ═══
    static void validateAge(int age) throws IllegalArgumentException {

        // ═══ 'throw' keyword — throw manually ═══
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        System.out.println("Age is valid: " + age);
    }

    public static void main(String[] args) {

        // ═══ 'try' block ═══
        try {
            validateAge(-5);
        }
        // ═══ 'catch' block ═══
        catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }
        // ═══ 'finally' block ═══
        finally {
            System.out.println("This always runs");
        }

        System.out.println("Program continues");
    }
}

/*
Output:
Caught: Age cannot be negative
This always runs
Program continues
*/
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.6 try-catch Block

<a id="216-try-catch-block"></a>

### 📌 Basic Exception Handling

```java
public class TryCatchDemo {
    public static void main(String[] args) {

        // ═══ Basic try-catch ═══
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);   // Throws exception
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid index!");
            System.out.println("Message: " + e.getMessage());
        }

        // Program continues after catch
        System.out.println("After try-catch");
    }
}

/*
Output:
Invalid index!
Message: Index 10 out of bounds for length 3
After try-catch
*/
```

### 📌 Flow of Execution

```
try {
    statement1;           ← Execute
    statement2;           ← If exception here → JUMP to catch
    statement3;           ← Skip if exception
    statement4;
} catch (Exception e) {
    handle_exception;     ← Execute if exception occurred
}
statement_after_catch;    ← Always execute (if no re-throw)
```

### 📌 What Happens Inside try Block?

```java
public class FlowExample {
    public static void main(String[] args) {

        try {
            System.out.println("1. Start");
            int a = 10 / 0;   // ❌ Exception!
            System.out.println("3. This won't run");   // SKIPPED
        } catch (ArithmeticException e) {
            System.out.println("2. Caught: " + e.getMessage());
        }

        System.out.println("4. Program continues");
    }
}

/*
Output:
1. Start
2. Caught: / by zero      ← Jumps here from exception
4. Program continues
*/
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.7 Multiple catch Blocks

<a id="217-multiple-catch-blocks"></a>

### 📌 Handle Different Exception Types

```java
public class MultipleCatchDemo {

    public static void main(String[] args) {

        try {
            String s = args[0];   // Might throw ArrayIndexOutOfBounds
            int num = Integer.parseInt(s);   // Might throw NumberFormat
            int result = 10 / num;   // Might throw Arithmetic
            System.out.println(result);
        }
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("No arguments provided!");
        }
        catch (NumberFormatException e) {
            System.out.println("Not a valid number!");
        }
        catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
        catch (Exception e) {
            System.out.println("Some other error!");
        }
    }
}

// Run with different inputs:
// java MultipleCatchDemo         → "No arguments provided!"
// java MultipleCatchDemo abc      → "Not a valid number!"
// java MultipleCatchDemo 0        → "Cannot divide by zero!"
// java MultipleCatchDemo 5        → "2" (success)
```

### 📌 Key Points

```
✅ ONLY ONE catch block executes (the matching one)
✅ If no matching catch → exception propagates up
✅ Order matters (specific to general)
✅ Can have multiple catch blocks for one try
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.8 Multi-catch Block (Java 7+)

<a id="218-multi-catch-block"></a>

### 📌 One catch for Multiple Exceptions

```java
public class MultiCatchDemo {
    public static void main(String[] args) {

        try {
            // Code that might throw multiple exception types
            String s = null;
            s.length();   // NullPointerException
            int x = 10 / 0;   // ArithmeticException
        }

        // ═══ MULTI-CATCH (Java 7+) ═══
        catch (NullPointerException | ArithmeticException e) {
            System.out.println("Handling: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
        }

        // Traditional way (still works):
        // catch (NullPointerException e) { ... }
        // catch (ArithmeticException e) { ... }
    }
}
```

### 📌 Rules for Multi-catch

```
✅ Use | (pipe) to separate exception types
✅ Reduces code duplication
✅ Cleaner code

⚠️ RESTRICTIONS:
❌ Cannot have parent-child relationship in same multi-catch
❌ Cannot reassign exception variable (it's implicitly final)

// ❌ ERROR: IOException is parent of FileNotFoundException
// catch (IOException | FileNotFoundException e) { }

// ❌ ERROR: Cannot reassign
// catch (IOException | SQLException e) {
//     e = new IOException();   // ERROR!
// }
```

### 📌 Benefits

```java
// ═══ WITHOUT multi-catch (repetitive) ═══
try {
    // ...
} catch (IOException e) {
    log(e);
    cleanup();
    throw e;
} catch (SQLException e) {
    log(e);
    cleanup();
    throw e;
} catch (ParseException e) {
    log(e);
    cleanup();
    throw e;
}

// ═══ WITH multi-catch (clean!) ═══
try {
    // ...
} catch (IOException | SQLException | ParseException e) {
    log(e);
    cleanup();
    throw e;
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.9 Catch Block Order ⭐

<a id="219-catch-block-order"></a>

### 📌 Specific to General Order

```
CRITICAL RULE:
Catch blocks must be ordered from SPECIFIC to GENERAL.
Parent class catch MUST come AFTER child class catch.

If parent catch comes first, child catch becomes UNREACHABLE → COMPILE ERROR!
```

### 📌 Correct vs Incorrect Order

```java
public class CatchOrderDemo {
    public static void main(String[] args) {

        // ═══ ✅ CORRECT ORDER: Specific → General ═══
        try {
            int[] arr = new int[5];
            arr[10] = 1;
        } catch (ArrayIndexOutOfBoundsException e) {   // Specific first
            System.out.println("Array index issue");
        } catch (RuntimeException e) {   // More general
            System.out.println("Runtime issue");
        } catch (Exception e) {   // Most general last
            System.out.println("General exception");
        }

        // ═══ ❌ WRONG ORDER: COMPILE ERROR! ═══
        /*
        try {
            // ...
        } catch (Exception e) {   // Most general FIRST
            // ...
        } catch (ArrayIndexOutOfBoundsException e) {   // ❌ UNREACHABLE!
            // COMPILE ERROR: exception has already been caught
        }
        */
    }
}
```

### 📌 The Hierarchy Matters

```
Exception (parent)
  └── RuntimeException
        ├── ArrayIndexOutOfBoundsException
        ├── NullPointerException
        └── ArithmeticException

CATCH ORDER (specific to general):
1. catch (ArrayIndexOutOfBoundsException e)   // Most specific
2. catch (RuntimeException e)                   // Middle
3. catch (Exception e)                          // Most general

If reversed → Compile error!
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.10 finally Block

<a id="2110-finally-block"></a>

### 📌 The Always-Executes Block

```
finally block:
→ Executes REGARDLESS of exception
→ Runs whether try succeeds OR catch handles exception
→ Perfect for CLEANUP code (close files, connections, etc.)
→ Cannot exist without try
```

### 📌 Basic Usage

```java
public class FinallyDemo {

    public static void main(String[] args) {

        // ═══ Case 1: No exception ═══
        try {
            System.out.println("Try block");
        } catch (Exception e) {
            System.out.println("Catch block");
        } finally {
            System.out.println("Finally block");   // ✅ Runs
        }
        // Output:
        // Try block
        // Finally block

        System.out.println("---");

        // ═══ Case 2: Exception caught ═══
        try {
            System.out.println("Try block");
            throw new RuntimeException("Error!");
        } catch (Exception e) {
            System.out.println("Catch block");
        } finally {
            System.out.println("Finally block");   // ✅ Runs
        }
        // Output:
        // Try block
        // Catch block
        // Finally block

        System.out.println("---");

        // ═══ Case 3: Only try-finally (no catch) ═══
        try {
            System.out.println("Try block");
        } finally {
            System.out.println("Finally block");   // ✅ Runs
        }
    }
}
```

### 📌 Common Use — Resource Cleanup

```java
import java.io.*;

public class CleanupDemo {

    public static void main(String[] args) {

        FileReader reader = null;
        try {
            reader = new FileReader("data.txt");
            // Read file...
        } catch (IOException e) {
            System.out.println("Error reading file");
        } finally {
            // ✅ ALWAYS close resources (even if exception)
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("File closed");
                } catch (IOException e) {
                    System.out.println("Error closing");
                }
            }
        }
    }
}

// Better: Use try-with-resources (Java 7+)
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.11 When finally Does NOT Execute

<a id="2111-when-finally-does-not-execute"></a>

### 📌 Rare Cases Where finally Doesn't Run

```
finally ALWAYS runs EXCEPT in these cases:

1. System.exit(0) — JVM terminates
2. JVM crashes (hardware failure, kill -9)
3. Infinite loop in try/catch (never exits)
4. Thread killed forcefully
5. Fatal errors (OutOfMemoryError sometimes)
```

### 📌 Examples

```java
public class FinallyNotExecuting {

    public static void main(String[] args) {

        // ═══ Case 1: System.exit() ═══
        try {
            System.out.println("Try");
            System.exit(0);   // JVM exits!
            System.out.println("Never runs");
        } catch (Exception e) {
            System.out.println("Catch");
        } finally {
            System.out.println("Finally");   // ❌ DOES NOT RUN!
        }

        // Only "Try" is printed. Finally is skipped!

        // ═══ Case 2: Infinite loop in try ═══
        try {
            while (true) { }   // Infinite loop
        } finally {
            System.out.println("Never reaches here");   // ❌
        }

        // ═══ Case 3: Fatal JVM error ═══
        // If JVM crashes, no finally
    }
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.12 finally with return ⭐

<a id="2112-finally-with-return"></a>

### 📌 Tricky Behavior — Interview Favorite!

```
IMPORTANT: If try/catch returns a value AND finally has return,
           FINALLY's return WINS!

Rule: finally always runs BEFORE the try/catch return.
```

### 📌 Case 1: finally Runs Before return

```java
public class FinallyReturn {

    static int test() {
        try {
            return 10;      // Executed first, but return delayed
        } finally {
            System.out.println("Finally runs BEFORE returning!");
            // finally executes HERE, before actually returning 10
        }
        // Returns 10
    }

    public static void main(String[] args) {
        int result = test();
        System.out.println("Result: " + result);
    }
}

/*
Output:
Finally runs BEFORE returning!
Result: 10
*/
```

### 📌 Case 2: finally OVERRIDES return

```java
public class FinallyOverride {

    static int test() {
        try {
            return 10;
        } finally {
            return 20;      // ⚠️ OVERRIDES try's return!
        }
    }

    public static void main(String[] args) {
        int result = test();
        System.out.println("Result: " + result);   // 20 (not 10!)
    }
}

/*
BAD PRACTICE! Never return from finally.
Confusing behavior — makes code hard to understand.
*/
```

### 📌 Case 3: Exception vs finally return

```java
public class FinallyException {

    static int test() {
        try {
            throw new RuntimeException("Error!");
        } finally {
            return 100;   // ⚠️ Exception is SWALLOWED!
        }
    }

    public static void main(String[] args) {
        int result = test();
        System.out.println("Result: " + result);   // 100
        // Exception is LOST! Very bad practice!
    }
}
```

> [!IMPORTANT]
> **NEVER return from finally block!** It can swallow exceptions and override return values. This is a common source of bugs.

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.13 try-with-resources (Java 7+) ⭐

<a id="2113-try-with-resources"></a>

### 📌 Automatic Resource Management

```
try-with-resources:
→ Automatically closes resources
→ No need for finally block!
→ Cleaner code
→ Works with any class implementing AutoCloseable

Introduced in Java 7.
```

### 📌 Old Way vs New Way

```java
import java.io.*;

public class TryWithResourcesDemo {

    // ═══ OLD WAY (verbose, error-prone) ═══
    static void oldWay() throws IOException {
        FileReader reader = null;
        BufferedReader br = null;
        try {
            reader = new FileReader("data.txt");
            br = new BufferedReader(reader);
            System.out.println(br.readLine());
        } finally {
            // Manual cleanup
            if (br != null) br.close();
            if (reader != null) reader.close();
        }
    }

    // ═══ NEW WAY (Java 7+) — CLEANER! ═══
    static void newWay() throws IOException {
        try (FileReader reader = new FileReader("data.txt");
             BufferedReader br = new BufferedReader(reader)) {

            System.out.println(br.readLine());
        }
        // Resources AUTOMATICALLY closed here!
        // No need for finally block
    }

    public static void main(String[] args) throws IOException {
        newWay();
    }
}
```

### 📌 Multiple Resources

```java
try (FileInputStream input = new FileInputStream("input.txt");
     FileOutputStream output = new FileOutputStream("output.txt");
     BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {

    // Use all three resources
    // They will be closed in REVERSE ORDER when block ends

} catch (IOException e) {
    System.out.println("Error: " + e.getMessage());
}
// All resources automatically closed
```

### 📌 Effectively Final Resources (Java 9+)

```java
// Java 9+ allows using already-declared resources

public class Java9TryWith {
    public static void main(String[] args) throws IOException {

        FileReader reader = new FileReader("data.txt");
        BufferedReader br = new BufferedReader(reader);

        try (reader; br) {   // Just names of resources!
            System.out.println(br.readLine());
        }
        // Both closed automatically
    }
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.14 AutoCloseable Interface

<a id="2114-autocloseable-interface"></a>

### 📌 For Custom Resources

```java
// ═══ AutoCloseable interface ═══
public interface AutoCloseable {
    void close() throws Exception;
}

// Any class implementing this can be used with try-with-resources
```

### 📌 Custom Resource Example

```java
class MyResource implements AutoCloseable {

    private String name;

    public MyResource(String name) {
        this.name = name;
        System.out.println("Opening: " + name);
    }

    public void doWork() {
        System.out.println("Working with: " + name);
    }

    @Override
    public void close() {
        System.out.println("Closing: " + name);
    }
}

public class CustomResourceDemo {
    public static void main(String[] args) {

        try (MyResource r1 = new MyResource("Resource1");
             MyResource r2 = new MyResource("Resource2")) {

            r1.doWork();
            r2.doWork();

        }
        // Both resources automatically closed in REVERSE ORDER!
    }
}

/*
Output:
Opening: Resource1
Opening: Resource2
Working with: Resource1
Working with: Resource2
Closing: Resource2      ← Closed in REVERSE order
Closing: Resource1
*/
```

### 📌 Closeable vs AutoCloseable

```
Closeable (Java 5):
→ Extends AutoCloseable
→ close() throws IOException only
→ Used mostly for I/O

AutoCloseable (Java 7):
→ Parent interface
→ close() throws Exception (any)
→ More general purpose
→ Used for try-with-resources

For custom classes → Use AutoCloseable (more flexible)
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.15 throw Keyword

<a id="2115-throw-keyword"></a>

### 📌 Throwing Exceptions Manually

```
throw:
→ Used to MANUALLY throw an exception
→ Followed by exception OBJECT
→ Only ONE throw per statement
→ Ends current method flow immediately
```

### 📌 Basic Usage

```java
public class ThrowDemo {

    static void checkAge(int age) {

        if (age < 0) {
            // ═══ THROW keyword — throw exception manually ═══
            throw new IllegalArgumentException("Age cannot be negative");
        }

        if (age < 18) {
            throw new RuntimeException("Must be 18 or older");
        }

        System.out.println("Age is valid: " + age);
    }

    public static void main(String[] args) {

        try {
            checkAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        try {
            checkAge(15);
        } catch (RuntimeException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        checkAge(25);   // Valid
    }
}

/*
Output:
Caught: Age cannot be negative
Caught: Must be 18 or older
Age is valid: 25
*/
```

### 📌 throw with Different Exception Types

```java
// Built-in exceptions
throw new NullPointerException("obj is null");
throw new IllegalArgumentException("Invalid argument");
throw new ArithmeticException("Math error");
throw new IndexOutOfBoundsException("Index invalid");

// Custom exceptions
throw new MyCustomException("Custom error");

// Exception with cause (chaining)
throw new RuntimeException("Failed", originalException);
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.16 throws Keyword

<a id="2116-throws-keyword"></a>

### 📌 Declaring Exceptions in Method Signature

```
throws:
→ DECLARES that a method might throw certain exceptions
→ Placed in METHOD SIGNATURE
→ For CHECKED exceptions, this or try-catch is REQUIRED
→ Can list MULTIPLE exceptions separated by commas
→ Caller must handle or re-declare
```

### 📌 Basic Usage

```java
import java.io.*;

public class ThrowsDemo {

    // ═══ Method declaring exceptions with throws ═══
    static void readFile(String path) throws FileNotFoundException, IOException {
        FileReader reader = new FileReader(path);   // Might throw FileNotFoundException
        // ... read file
        reader.close();   // Might throw IOException
    }

    // ═══ Multiple exceptions ═══
    static void multipleExceptions() throws IOException, SQLException, ClassNotFoundException {
        // Code that might throw these exceptions
    }

    public static void main(String[] args) {

        // Caller MUST handle checked exceptions
        try {
            readFile("data.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }

        // Or declare throws in caller:
        // public static void main(String[] args) throws IOException { ... }
    }
}
```

### 📌 throws for Runtime Exceptions (Optional)

```java
// ✅ NOT required (but allowed) for RuntimeException
static void method1() throws RuntimeException {
    throw new RuntimeException();
}

// Same as:
static void method2() {
    throw new RuntimeException();   // Works without throws
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.17 throw vs throws ⭐

<a id="2117-throw-vs-throws"></a>

### 📌 Complete Comparison

```
┌────────────────────────┬──────────────────────┬──────────────────────┐
│  Feature               │  throw               │  throws              │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Purpose               │  THROW an exception  │  DECLARE exceptions  │
│                        │  manually            │  method might throw  │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Position              │  Inside method body  │  Method signature    │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Followed by           │  Exception OBJECT    │  Exception CLASS     │
│                        │  throw new X();      │  throws X            │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Number                │  ONE at a time       │  MULTIPLE allowed    │
│                        │                      │  (comma-separated)   │
├────────────────────────┼──────────────────────┼──────────────────────┤
│  Purpose               │  Trigger exception   │  Delegate handling   │
│                        │                      │  to caller           │
└────────────────────────┴──────────────────────┴──────────────────────┘
```

### 📌 Side-by-Side Example

```java
public class ThrowVsThrows {

    // ═══ Method with 'throws' — declares exceptions ═══
    static void method1() throws IOException, SQLException {   // MULTIPLE
        // ═══ 'throw' — throws ONE exception ═══
        throw new IOException("File not found");   // ONE at a time
    }

    // ═══ Just declaration, no throw ═══
    static void method2() throws Exception {   // Only declaration
        System.out.println("No throw here");   // Doesn't actually throw
    }

    // ═══ Just throw, no declaration ═══
    static void method3() {   // No throws needed (RuntimeException)
        throw new RuntimeException("Runtime error");   // Only throw
    }

    public static void main(String[] args) {

        try {
            method1();
        } catch (IOException | SQLException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```

### 📌 Summary

```
throw:
→ ACTION (does something)
→ Actually throws exception
→ Inside method body
→ Followed by exception object

throws:
→ DECLARATION (informs)
→ Just declares what MIGHT be thrown
→ In method signature
→ Followed by exception class(es)

Analogy:
throw = "I'M THROWING A BALL RIGHT NOW"
throws = "I MIGHT THROW BALLS. BE CAREFUL!"
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.18 Exception Propagation

<a id="2118-exception-propagation"></a>

### 📌 How Exceptions Travel Up the Call Stack

```
When exception occurs:
1. Java looks for catch block in CURRENT method
2. If not found → PROPAGATES to CALLING method
3. Continues up the call stack
4. If never caught → Program terminates with error
```

### 📌 Example

```java
public class PropagationDemo {

    static void method1() {
        System.out.println("method1 start");
        method2();
        System.out.println("method1 end");   // Never runs if exception
    }

    static void method2() {
        System.out.println("method2 start");
        method3();
        System.out.println("method2 end");   // Never runs
    }

    static void method3() {
        System.out.println("method3 start");
        int result = 10 / 0;   // ArithmeticException!
        System.out.println("method3 end");   // Never runs
    }

    public static void main(String[] args) {

        try {
            method1();   // Caught here!
        } catch (ArithmeticException e) {
            System.out.println("Caught in main: " + e.getMessage());
        }
    }
}

/*
Output:
method1 start
method2 start
method3 start
Caught in main: / by zero

Exception propagated: method3 → method2 → method1 → main
*/
```

### 📌 Propagation Rules

```
UNCHECKED EXCEPTIONS:
✅ Propagate automatically up the call stack
✅ No need to declare in throws

CHECKED EXCEPTIONS:
✅ Also propagate up the call stack
❗ But each method MUST either:
   → Handle with try-catch, OR
   → Declare with throws
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.19 throws in Method Overriding

<a id="2119-throws-in-overriding"></a>

### 📌 Rules for Overriding Methods with throws

```
When overriding a method that throws checked exceptions:

FOR CHECKED EXCEPTIONS:
✅ Can throw SAME exception
✅ Can throw SUBCLASS of parent's exception
✅ Can throw FEWER exceptions
✅ Can throw NO exceptions
❌ CANNOT throw NEW checked exceptions
❌ CANNOT throw SUPERCLASS of parent's exception

FOR UNCHECKED EXCEPTIONS:
✅ Can throw ANY RuntimeException
✅ No restrictions
```

### 📌 Examples

```java
import java.io.*;

class Parent {

    // Parent method with throws
    public void method() throws IOException {
        System.out.println("Parent method");
    }
}

class Child1 extends Parent {

    // ✅ SAME exception — OK
    @Override
    public void method() throws IOException {
        System.out.println("Child1");
    }
}

class Child2 extends Parent {

    // ✅ SUBCLASS exception — OK
    @Override
    public void method() throws FileNotFoundException {
        System.out.println("Child2");
    }
}

class Child3 extends Parent {

    // ✅ NO exceptions — OK
    @Override
    public void method() {
        System.out.println("Child3");
    }
}

// ❌ INVALID EXAMPLES:

// class Child4 extends Parent {
//     @Override
//     public void method() throws Exception {   // ❌ ERROR!
//         // Parent throws IOException, child throws BROADER Exception
//     }
// }

// class Child5 extends Parent {
//     @Override
//     public void method() throws SQLException {   // ❌ ERROR!
//         // SQLException is not related to IOException
//     }
// }
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.20 Custom Exceptions

<a id="2120-custom-exceptions"></a>

### 📌 Creating Your Own Exception Classes

```
CUSTOM EXCEPTIONS:
→ User-defined exception classes
→ Extend Exception (checked) or RuntimeException (unchecked)
→ Better error messages for business logic
→ Domain-specific error handling
```

### 📌 Custom Checked Exception

```java
// ═══ Custom Checked Exception ═══
class InsufficientBalanceException extends Exception {

    public InsufficientBalanceException() {
        super();
    }

    public InsufficientBalanceException(String message) {
        super(message);
    }

    public InsufficientBalanceException(String message, Throwable cause) {
        super(message, cause);
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "Cannot withdraw " + amount + ". Current balance: " + balance
            );
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount);
    }
}

public class CustomCheckedDemo {
    public static void main(String[] args) {

        BankAccount acc = new BankAccount(1000);

        try {
            acc.withdraw(500);      // Success
            acc.withdraw(2000);      // Fails!
        } catch (InsufficientBalanceException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

### 📌 Custom Unchecked Exception

```java
// ═══ Custom Unchecked Exception ═══
class InvalidAgeException extends RuntimeException {

    public InvalidAgeException(String message) {
        super(message);
    }
}

class Person {
    private int age;

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new InvalidAgeException("Age must be between 0 and 150");
        }
        this.age = age;
    }
}

public class CustomUncheckedDemo {
    public static void main(String[] args) {

        Person p = new Person();

        try {
            p.setAge(-5);
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

### 📌 Best Practices for Custom Exceptions

```
✅ NAMING: End with "Exception"
   → InsufficientBalanceException
   → InvalidInputException

✅ EXTEND appropriate class:
   → Checked: extends Exception
   → Unchecked: extends RuntimeException

✅ PROVIDE constructors:
   → No-args
   → With message
   → With message + cause

✅ Include RELEVANT INFO in message

✅ USE only when built-in exceptions don't fit
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.21 Exception Chaining

<a id="2121-exception-chaining"></a>

### 📌 Wrapping Exceptions

```
EXCEPTION CHAINING:
→ Wrap one exception inside another
→ Preserves original exception (cause)
→ Adds context to error
→ Uses Throwable's getCause() method
```

### 📌 Example

```java
public class ExceptionChaining {

    static void loadUser() throws Exception {
        try {
            // Simulate low-level exception
            throw new IOException("Database connection failed");
        } catch (IOException e) {
            // Wrap in higher-level exception with cause
            throw new Exception("Cannot load user data", e);
            //                                          ^^^
            //                                    Original cause
        }
    }

    public static void main(String[] args) {
        try {
            loadUser();
        } catch (Exception e) {
            System.out.println("Main exception: " + e.getMessage());

            // Get the original cause
            Throwable cause = e.getCause();
            if (cause != null) {
                System.out.println("Root cause: " + cause.getMessage());
            }

            e.printStackTrace();
        }
    }
}

/*
Output:
Main exception: Cannot load user data
Root cause: Database connection failed
[Stack trace showing both exceptions]
*/
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.22 Common Runtime Exceptions

<a id="2122-common-runtime-exceptions"></a>

### 📌 Most Frequent Exceptions

```java
public class CommonExceptions {

    public static void main(String[] args) {

        // ═══ 1. NullPointerException ═══
        try {
            String s = null;
            s.length();
        } catch (NullPointerException e) {
            System.out.println("1. NPE: null reference accessed");
        }

        // ═══ 2. ArithmeticException ═══
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("2. Arithmetic: " + e.getMessage());
        }

        // ═══ 3. ArrayIndexOutOfBoundsException ═══
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("3. Array index: " + e.getMessage());
        }

        // ═══ 4. NumberFormatException ═══
        try {
            int num = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("4. Number format: " + e.getMessage());
        }

        // ═══ 5. ClassCastException ═══
        try {
            Object o = "Hello";
            Integer i = (Integer) o;
        } catch (ClassCastException e) {
            System.out.println("5. Cast: " + e.getMessage());
        }

        // ═══ 6. IllegalArgumentException ═══
        try {
            Thread t = new Thread();
            t.setPriority(20);   // Max is 10
        } catch (IllegalArgumentException e) {
            System.out.println("6. Illegal arg: " + e.getMessage());
        }

        // ═══ 7. ConcurrentModificationException ═══
        try {
            java.util.List<Integer> list = new java.util.ArrayList<>(
                java.util.Arrays.asList(1, 2, 3, 4));
            for (Integer i : list) {
                if (i == 2) list.remove(i);   // Concurrent modification!
            }
        } catch (java.util.ConcurrentModificationException e) {
            System.out.println("7. Concurrent modification");
        }

        // ═══ 8. StringIndexOutOfBoundsException ═══
        try {
            String s = "Hello";
            System.out.println(s.charAt(10));
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("8. String index: " + e.getMessage());
        }
    }
}
```

### 📌 Quick Reference Table

```
┌────────────────────────────────────┬──────────────────────────────────┐
│  Exception                          │  When It Occurs                  │
├────────────────────────────────────┼──────────────────────────────────┤
│  NullPointerException              │  Accessing null reference        │
│  ArithmeticException               │  Division by zero, math errors   │
│  ArrayIndexOutOfBoundsException    │  Invalid array index             │
│  StringIndexOutOfBoundsException   │  Invalid string index            │
│  NumberFormatException             │  Parsing invalid number string   │
│  ClassCastException                │  Invalid type cast               │
│  IllegalArgumentException          │  Invalid method argument         │
│  IllegalStateException             │  Method called at wrong time     │
│  UnsupportedOperationException     │  Operation not supported         │
│  ConcurrentModificationException   │  Modifying collection while     │
│                                    │  iterating                       │
│  StackOverflowError                │  Recursion too deep              │
│  OutOfMemoryError                  │  JVM out of memory               │
└────────────────────────────────────┴──────────────────────────────────┘
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

## 21.23 Exception Handling Best Practices

<a id="2123-best-practices"></a>

### 📌 Do's and Don'ts

```
✅ DO:

1. Catch SPECIFIC exceptions before general ones
2. Use try-with-resources for AutoCloseable resources
3. Log exceptions properly
4. Include useful error messages
5. Handle exceptions at appropriate level
6. Use custom exceptions for business logic
7. Chain exceptions to preserve context
8. Clean up resources in finally block
9. Fail fast — validate early

❌ DON'T:

1. Don't use empty catch blocks (swallow exceptions)
2. Don't catch Exception/Throwable unless necessary
3. Don't return from finally block
4. Don't throw Exception (be specific)
5. Don't catch and ignore
6. Don't use exceptions for flow control
7. Don't log AND rethrow (redundant)
8. Don't declare unnecessary throws
9. Don't catch NullPointerException (fix the code!)
```

### 📌 Bad vs Good Practices

```java
// ❌ BAD: Empty catch (swallows exception)
try {
    riskyOperation();
} catch (Exception e) {
    // Nothing here — exception lost!
}

// ✅ GOOD: Log and handle properly
try {
    riskyOperation();
} catch (Exception e) {
    logger.error("Operation failed", e);
    throw new RuntimeException("Cannot complete operation", e);
}

// ❌ BAD: Catching too broadly
try {
    // code
} catch (Exception e) {   // Catches everything
    // Handle
}

// ✅ GOOD: Specific catches
try {
    // code
} catch (IOException e) {
    // Handle IO error
} catch (SQLException e) {
    // Handle SQL error
}

// ❌ BAD: Using exceptions for flow control
try {
    int index = list.indexOf(item);
    return list.get(index);
} catch (Exception e) {
    return null;
}

// ✅ GOOD: Check first
if (list.contains(item)) {
    int index = list.indexOf(item);
    return list.get(index);
}
return null;
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

<a id="21-java-vs-other-languages"></a>

## 🔥 What Makes Java DIFFERENT — Exception Handling

```
┌──────────────────────┬────────────┬────────────┬────────────┬────────────┐
│  Feature             │  Java      │  C++       │  Python    │  JavaScript│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Checked exceptions  │ ✅ YES     │ ❌ No      │ ❌ No      │ ❌ No     │
│  (compile-time)      │ (unique!)  │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  throws declaration  │ ✅ YES     │ ❌ No      │ ❌ No      │ ❌ No     │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Multi-catch         │ ✅ Java 7+ │ ❌ No      │ ❌ No      │ ❌ No     │
│  (Type | Type)       │            │            │            │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  try-with-resources  │ ✅ Java 7+ │ RAII       │ with       │ ❌ No     │
│                      │            │ (destructors)│ statement │            │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  finally block       │ ✅ YES     │ ❌ (RAII)  │ ✅ finally │ ✅ finally│
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Exception chaining  │ ✅ getCause│ ✅ nested  │ ✅ __cause__│ ✅ .cause │
├──────────────────────┼────────────┼────────────┼────────────┼────────────┤
│  Type hierarchy      │ ✅ Strong  │ ⚠️ Any     │ ✅ Strong  │ ⚠️ Any    │
│                      │ (Throwable)│ (any type) │ (BaseException)│ (any)  │
└──────────────────────┴────────────┴────────────┴────────────┴────────────┘
```

### 🎯 Key UNIQUE Points

```
1. CHECKED EXCEPTIONS (Java's unique feature):
   → Compile-time enforcement
   → Forces handling or declaration
   → Controversial: some love it, some hate it
   → No other major language has this

2. throws IN METHOD SIGNATURE:
   → Java requires explicit declaration
   → Others don't require this

3. STRONG EXCEPTION HIERARCHY:
   → All exceptions extend Throwable
   → Clear hierarchy

4. MULTI-CATCH (Java 7+):
   → Handle multiple exception types in one catch

5. TRY-WITH-RESOURCES:
   → Automatic resource management
   → Similar to Python's with, RAII in C++
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

<a id="21-interview-questions"></a>

## 💡 Chapter 21 — Interview Questions (20+)

---

### 🔵 Conceptual Questions

**Q1. What is an Exception? Why do we handle exceptions?**

```
EXCEPTION = Abnormal event during program execution
            that disrupts normal flow.

WHY HANDLE EXCEPTIONS:
✅ Prevent program crashes
✅ Provide meaningful error messages
✅ Graceful recovery
✅ Log errors for debugging
✅ Better user experience
✅ Clean up resources
✅ Maintain data integrity

Without handling: Program terminates abruptly.
With handling: Program continues gracefully.

Example:
try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
}
System.out.println("Program continues!");
```

---

**Q2. Difference between Error and Exception?**

```
ERROR:
→ Serious problems (JVM-level)
→ CANNOT be recovered (usually)
→ Should NOT be caught
→ Examples: OutOfMemoryError, StackOverflowError
→ Class: java.lang.Error

EXCEPTION:
→ Recoverable issues (application-level)
→ CAN be recovered
→ SHOULD be handled
→ Examples: IOException, NullPointerException
→ Class: java.lang.Exception

Both extend Throwable.
Both can be caught technically, but Errors shouldn't be.
```

---

**Q3. Difference between Checked and Unchecked Exceptions?**

```
CHECKED EXCEPTIONS:
✅ Compile-time enforced (MUST handle or declare)
✅ Extends Exception (not RuntimeException)
✅ External conditions (files, network, DB)
✅ Examples: IOException, SQLException

UNCHECKED EXCEPTIONS:
✅ Runtime only (optional to handle)
✅ Extends RuntimeException
✅ Programming errors (bugs)
✅ Examples: NullPointerException, ArithmeticException

// CHECKED - MUST handle
void readFile() throws IOException { ... }

// UNCHECKED - optional
void divide() {
    int x = 10 / 0;   // No declaration needed
}

Java Compiler:
- Checked: "You MUST handle or declare!"
- Unchecked: "Handle if you want."
```

---

**Q4. What is the Exception Hierarchy?**

```
Object
  └── Throwable
        ├── Error (unrecoverable)
        │     ├── OutOfMemoryError
        │     ├── StackOverflowError
        │     └── VirtualMachineError
        │
        └── Exception (recoverable)
              ├── IOException (CHECKED)
              ├── SQLException (CHECKED)
              ├── ClassNotFoundException (CHECKED)
              │
              └── RuntimeException (UNCHECKED)
                    ├── NullPointerException
                    ├── ArithmeticException
                    ├── ArrayIndexOutOfBoundsException
                    ├── ClassCastException
                    └── NumberFormatException

KEY:
- All exceptions inherit from Throwable
- Error and Exception are siblings
- RuntimeException is child of Exception (all unchecked)
```

---

**Q5. Explain the 5 exception handling keywords.**

```
1. try - Enclose risky code
try {
    // code that might throw exception
}

2. catch - Handle specific exception
catch (ExceptionType e) {
    // handle exception
}

3. finally - Always executes (cleanup)
finally {
    // cleanup code
}

4. throw - Manually throw exception
throw new IOException("Error!");

5. throws - Declare exceptions in method signature
public void method() throws IOException { }

Complete example:
public void method() throws IOException {
    try {
        // risky code
    } catch (IOException e) {
        throw new RuntimeException(e);
    } finally {
        // cleanup
    }
}
```

---

**Q6. Difference between throw and throws?**

```
┌────────────────────┬──────────────────┬──────────────────┐
│  Feature           │  throw           │  throws          │
├────────────────────┼──────────────────┼──────────────────┤
│  Purpose           │  Throw exception │  Declare         │
│                    │  manually        │  exceptions      │
│  Position          │  Method body     │  Method signature│
│  Followed by       │  Exception       │  Exception class │
│                    │  OBJECT          │  (or classes)    │
│  Number allowed    │  ONE at a time   │  MULTIPLE (comma)│
│  Ends flow?        │  YES immediately │  NO (declaration)│
└────────────────────┴──────────────────┴──────────────────┘

Example:
public void method() throws IOException {   // throws (declaration)
    if (condition) {
        throw new IOException("Error");   // throw (action)
    }
}
```

---

**Q7. What is try-with-resources? When was it introduced?**

```
TRY-WITH-RESOURCES = Automatic resource management (Java 7+)

Automatically closes resources that implement AutoCloseable.
No need for finally block!

// OLD WAY (verbose, error-prone)
FileReader reader = null;
try {
    reader = new FileReader("file.txt");
    // use reader
} finally {
    if (reader != null) reader.close();   // Manual cleanup
}

// NEW WAY (Java 7+, clean!)
try (FileReader reader = new FileReader("file.txt")) {
    // use reader
}
// reader automatically closed!

BENEFITS:
✅ Cleaner code
✅ No memory leaks
✅ Multiple resources supported
✅ Resources closed in REVERSE order

REQUIREMENT:
→ Resource must implement AutoCloseable
```

---

**Q8. Can we have try without catch?**

```
YES! Two valid combinations:

1. try + finally (no catch)
   try {
       // code
   } finally {
       // cleanup
   }

2. try-with-resources (no explicit catch)
   try (Resource r = new Resource()) {
       // use resource
   }
   // Auto-closed, no catch needed

3. try + catch + finally (all three)

INVALID:
❌ try alone (must have catch or finally)

WHY finally without catch?
→ Cleanup that must happen even if exception occurs
→ Exception still propagates up
```

---

**Q9. What are Custom Exceptions? How to create one?**

```
CUSTOM EXCEPTIONS = User-defined exception classes
                    for domain-specific errors.

Steps to create:
1. Extend Exception (checked) or RuntimeException (unchecked)
2. Provide constructors
3. Optionally add custom fields

// CHECKED custom exception
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

// UNCHECKED custom exception
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}

Usage:
void withdraw(double amount) throws InsufficientBalanceException {
    if (amount > balance) {
        throw new InsufficientBalanceException(
            "Insufficient balance: " + balance
        );
    }
}

BENEFITS:
✅ Domain-specific error handling
✅ Better error messages
✅ Easier debugging
```

---

### 🟡 Scenario-Based Questions

**Q10. When does finally block NOT execute?**

```
finally ALWAYS executes EXCEPT:

1. System.exit(0) called
   try { System.exit(0); } finally { }   // ❌ finally NOT run

2. JVM crashes (kill -9, hardware failure)

3. Infinite loop in try/catch
   try { while(true) { } } finally { }   // ❌ NOT reached

4. Thread killed forcefully

5. Fatal errors (rare cases)

In ALL other cases (exceptions, normal completion, break, return),
finally executes.
```

---

### 🔴 Output-Based Questions

**Q11. What is the output?**

```java
public class Test {
    static int test() {
        try {
            return 1;
        } finally {
            return 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}
```

```
OUTPUT: 2

REASON: finally block's return OVERRIDES try's return!
try's return value is discarded when finally returns.

⚠️ BAD PRACTICE — never return from finally!
```

---

**Q12. What is the output?**

```java
public class Test {
    static int test() {
        try {
            throw new RuntimeException("Error");
        } finally {
            return 100;
        }
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}
```

```
OUTPUT: 100

REASON: finally block SWALLOWS the exception!
Return from finally overrides the exception.
Exception is LOST forever.

⚠️ VERY BAD PRACTICE — exceptions should propagate!
```

---

**Q13. Will this compile?**

```java
try {
    // code
} catch (Exception e) {
    // handle
} catch (ArithmeticException e) {
    // handle
}
```

```
❌ COMPILE ERROR!

Error: "exception ArithmeticException has already been caught"

REASON: Exception (parent) is caught FIRST.
Any subsequent child exception catch is UNREACHABLE.

FIX: Reverse the order (specific first):
try {
    // code
} catch (ArithmeticException e) {    // Specific first
    // handle
} catch (Exception e) {                // General last
    // handle
}
```

---

**Q14. What is the output?**

```java
public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("Try");
            System.exit(0);
            System.out.println("After exit");
        } catch (Exception e) {
            System.out.println("Catch");
        } finally {
            System.out.println("Finally");
        }
    }
}
```

```
OUTPUT: Try

REASON:
- "Try" printed
- System.exit(0) terminates JVM immediately
- "After exit" not reached
- "Finally" NOT executed (System.exit stops everything)
- "Catch" not reached (no exception)

Only "Try" printed!
```

---

**Q15. What is the output?**

```java
class MyException extends Exception {
    public MyException(String msg) {
        super(msg);
    }
}

public class Test {
    static void method() throws MyException {
        throw new MyException("Custom error");
    }

    public static void main(String[] args) {
        try {
            method();
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Class: " + e.getClass().getSimpleName());
        }
    }
}
```

```
OUTPUT:
Caught: Custom error
Class: MyException

REASON:
- MyException extends Exception
- catch(Exception e) catches subclasses too
- getMessage() returns "Custom error"
- getClass().getSimpleName() returns actual class name
```

---

**Q16. What happens if checked exception is not handled?**

```java
public class Test {
    public static void main(String[] args) {
        FileReader fr = new FileReader("file.txt");   // IOException
    }
}
```

```
❌ COMPILE ERROR!

Error: "unreported exception FileNotFoundException;
        must be caught or declared to be thrown"

REASON: FileNotFoundException is a CHECKED exception.
It MUST be either:
1. Caught with try-catch
2. Declared with throws in method signature

FIX 1:
public static void main(String[] args) {
    try {
        FileReader fr = new FileReader("file.txt");
    } catch (IOException e) {
        // handle
    }
}

FIX 2:
public static void main(String[] args) throws IOException {
    FileReader fr = new FileReader("file.txt");
}
```

---

**Q17. Can we catch multiple exceptions in one catch block?**

```
YES! Using multi-catch (Java 7+):

// Old way
try {
    // code
} catch (IOException e) {
    handle(e);
} catch (SQLException e) {
    handle(e);
} catch (ClassNotFoundException e) {
    handle(e);
}

// Multi-catch (Java 7+)
try {
    // code
} catch (IOException | SQLException | ClassNotFoundException e) {
    handle(e);   // Same handling for all
}

RESTRICTIONS:
❌ Cannot have parent-child in same multi-catch:
   catch (IOException | FileNotFoundException e)   // ERROR!
   (FileNotFoundException extends IOException)

❌ Cannot reassign exception (it's implicitly final):
   catch (IOException | SQLException e) {
       e = new IOException();   // ERROR!
   }
```

---

**Q18. Explain Exception Propagation.**

```
EXCEPTION PROPAGATION:
When exception occurs, it travels UP the call stack
until caught or program terminates.

Example:
static void method1() {
    method2();     // Exception thrown here propagates up
}

static void method2() {
    method3();
}

static void method3() {
    throw new RuntimeException("Error!");
}

public static void main(String[] args) {
    try {
        method1();
    } catch (RuntimeException e) {   // Caught here!
        System.out.println("Handled in main");
    }
}

Propagation path:
method3 → method2 → method1 → main (caught)

RULES:
- Unchecked: propagate automatically
- Checked: each method must handle or declare
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

<a id="21-practice-problems"></a>

## 🧪 Chapter 21 — Practice Problems

### 📝 5 Theory Questions

```
1. Explain complete exception hierarchy in Java with examples
   of each type (Error, Checked, Unchecked).

2. Compare Checked vs Unchecked Exceptions in detail. When
   would you use each? Give examples.

3. Explain try-with-resources with example. How is it better
   than try-catch-finally? What is AutoCloseable interface?

4. Explain throw vs throws in detail. When to use each?
   Show complete example demonstrating both.

5. How do you create custom exceptions? Show both checked and
   unchecked custom exceptions with real-world scenarios.
```

### 💻 5 Coding Questions

```java
// Q1: Create a Bank account with custom exceptions
// InsufficientBalanceException (checked)
// InvalidAmountException (unchecked)
// Methods: deposit(), withdraw(), transfer()

public class BankAccount {
    // TODO: Implement with custom exceptions
}
```

```java
// Q2: File reader with try-with-resources
// Read a text file line by line
// Handle FileNotFoundException, IOException
// Use try-with-resources

import java.io.*;
public class FileReader {
    // TODO: Implement file reading with proper exception handling
}
```

```java
// Q3: Chain of exceptions
// UserService calls DatabaseService calls ConnectionService
// Each throws its own exception, chained to previous
// Show root cause

public class ExceptionChainDemo {
    // TODO: Demonstrate exception chaining
}
```

```java
// Q4: Validator with multiple exceptions
// Validate: age (18+), email (contains @), phone (10 digits)
// Each throws specific exception
// Use multi-catch to handle

public class UserValidator {
    // TODO: Implement validation with proper exceptions
}
```

```java
// Q5: Resource management
// Create custom AutoCloseable resource
// Track opens/closes in static counter
// Use with try-with-resources
// Verify all resources closed

public class ResourceManagerDemo {
    // TODO: Implement AutoCloseable resource + demo
}
```

<a href="#chapter-index-table-21">Go to Top 🔝</a>

---

```
┌─────────────────────────────────────────────────────────────┐
│                  ✅ CHAPTER 21 COMPLETE                     │
│                                                             │
│  Topics Covered:                                            │
│  ✅ 21.1  What is Exception — Definition                    │
│  ✅ 21.2  Error vs Exception — Comparison                   │
│  ✅ 21.3  Exception Hierarchy — Throwable tree              │
│  ✅ 21.4  Checked vs Unchecked                              │
│  ✅ 21.5  5 Keywords — try, catch, finally, throw, throws   │
│  ✅ 21.6  try-catch Block — Basic handling                  │
│  ✅ 21.7  Multiple catch Blocks                             │
│  ✅ 21.8  Multi-catch (Java 7+)                             │
│  ✅ 21.9  Catch Block Order — Specific to General           │
│  ✅ 21.10 finally Block — Always executes                   │
│  ✅ 21.11 When finally Doesn't Execute                      │
│  ✅ 21.12 finally with return — Tricky behavior             │
│  ✅ 21.13 try-with-resources (Java 7+)                      │
│  ✅ 21.14 AutoCloseable Interface                           │
│  ✅ 21.15 throw Keyword — Manual throwing                   │
│  ✅ 21.16 throws Keyword — Declaring                        │
│  ✅ 21.17 throw vs throws — Complete comparison             │
│  ✅ 21.18 Exception Propagation — Call stack                │
│  ✅ 21.19 throws in Overriding — Rules                      │
│  ✅ 21.20 Custom Exceptions — Both types                    │
│  ✅ 21.21 Exception Chaining — getCause()                   │
│  ✅ 21.22 Common Runtime Exceptions                         │
│  ✅ 21.23 Best Practices — Do's and Don'ts                  │
│  ✅ 🔥    Java vs Others — Unique features                  │
│  ✅ 18+   Interview Questions with Detailed Answers         │
│  ✅ 5     Theory + 5 Coding Practice Problems               │
│                                                             │
│  ⭐ Next: Collection Framework Overview (Chapter 22)        │
└─────────────────────────────────────────────────────────────┘
```

[Go to Main Index 🔝](#main-index)
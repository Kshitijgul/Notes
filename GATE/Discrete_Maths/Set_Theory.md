# SET THEORY - Complete GATE Study Notes

## 📚 Table of Contents
1. Basic Concepts & Definitions
2. Set Representations
3. Types of Sets
4. Set Operations
5. Algebra of Sets (Laws/Identities)
6. Venn Diagrams
7. Cartesian Product
8. Relations
9. Types of Relations
10. Equivalence Relations & Partitions
11. Partial Order Relations (Posets)
12. Hasse Diagrams
13. Lattices
14. Functions (Mappings)
15. Types of Functions
16. Composition & Inverse Functions
17. Cardinality of Sets
18. Principle of Inclusion-Exclusion
19. Power Set
20. Important Formulas & GATE Tricks

---

---

## 1. BASIC CONCEPTS & DEFINITIONS

### What is a Set?
A **set** is a well-defined collection of distinct objects called **elements** or **members**.

### Notation
- Sets: Capital letters → A, B, C, S, T...
- Elements: Lowercase letters → a, b, c, x, y...
- **∈** → "belongs to" / "is an element of"
- **∉** → "does not belong to"

### Examples
```
A = {1, 2, 3, 4, 5}
3 ∈ A  ✓
7 ∉ A  ✓
```

### Key Properties of Sets
| Property | Meaning |
|----------|---------|
| **Well-defined** | No ambiguity about membership |
| **Distinct elements** | No repetition (duplicates ignored) |
| **Unordered** | {1,2,3} = {3,1,2} |

---

## 2. SET REPRESENTATIONS

### (a) Roster Method (Tabular/Listing)
List all elements explicitly within braces.
```
A = {2, 4, 6, 8, 10}
B = {a, e, i, o, u}
```

### (b) Set-Builder Method (Rule Method)
Describe elements by a property.
```
A = {x | x is an even natural number, x ≤ 10}
B = {x ∈ ℤ | x² < 20}
```

### (c) Semantic Description
```
A = Set of all vowels in English alphabet
```

---

## 3. TYPES OF SETS

### Empty Set (Null Set / Void Set)
- **Symbol**: ∅ or { }
- Contains **no elements**
- |∅| = 0
- **∅ is a subset of every set**
- ∅ ≠ {∅} (the latter has one element)

### Singleton Set
- Contains **exactly one** element
- Example: {5}, {∅}

### Finite Set
- Contains a countable number of elements
- Example: A = {1, 2, 3} → |A| = 3

### Infinite Set
- Contains uncountably/infinitely many elements
- Example: ℕ = {1, 2, 3, ...}

### Universal Set (U)
- The set containing **all elements under consideration**
- All other sets are subsets of U

### Equal Sets
- A = B if and only if they have **exactly the same elements**
- A = B ⟺ (A ⊆ B) ∧ (B ⊆ A)

### Equivalent Sets
- Same **cardinality** (same number of elements)
- A ~ B if |A| = |B|
- Example: {1,2,3} ~ {a,b,c}

### Disjoint Sets
- A ∩ B = ∅ (no common elements)

### Standard Number Sets
| Symbol | Set |
|--------|-----|
| ℕ | Natural numbers {1, 2, 3, ...} or {0, 1, 2, ...} |
| ℤ | Integers {..., -2, -1, 0, 1, 2, ...} |
| ℚ | Rational numbers |
| ℝ | Real numbers |
| ℂ | Complex numbers |

---

## 4. SUBSETS

### Subset (⊆)
- A ⊆ B if **every element** of A is also in B
- ∀x (x ∈ A → x ∈ B)

### Proper Subset (⊂)
- A ⊂ B if A ⊆ B **and** A ≠ B
- A is "strictly contained" in B

### Important Properties
```
1. Every set is a subset of itself: A ⊆ A
2. Empty set is a subset of every set: ∅ ⊆ A
3. If A ⊆ B and B ⊆ A, then A = B (Antisymmetry)
4. If A ⊆ B and B ⊆ C, then A ⊆ C (Transitivity)
```

### Number of Subsets
```
If |A| = n, then:
  • Total number of subsets = 2ⁿ
  • Number of proper subsets = 2ⁿ - 1
  • Number of non-empty subsets = 2ⁿ - 1
  • Number of non-empty proper subsets = 2ⁿ - 2
```

---

## 5. SET OPERATIONS

### (a) Union (A ∪ B)
```
A ∪ B = {x | x ∈ A OR x ∈ B}
```
Example: {1,2,3} ∪ {3,4,5} = {1,2,3,4,5}

### (b) Intersection (A ∩ B)
```
A ∩ B = {x | x ∈ A AND x ∈ B}
```
Example: {1,2,3} ∩ {3,4,5} = {3}

### (c) Difference (A - B or A \ B)
```
A - B = {x | x ∈ A AND x ∉ B}
```
Example: {1,2,3} - {3,4,5} = {1,2}

> **Note**: A - B ≠ B - A (in general)

### (d) Symmetric Difference (A △ B or A ⊕ B)
```
A △ B = (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)
```
Example: {1,2,3} △ {3,4,5} = {1,2,4,5}

### (e) Complement (A' or Aᶜ or Ā)
```
A' = U - A = {x | x ∈ U AND x ∉ A}
```

### Cardinality Formulas
```
|A ∪ B| = |A| + |B| - |A ∩ B|
|A - B| = |A| - |A ∩ B|
|A △ B| = |A| + |B| - 2|A ∩ B|
|A'| = |U| - |A|
```

---

## 6. ALGEBRA OF SETS (LAWS & IDENTITIES)

### ⭐ This is VERY IMPORTANT for GATE

| Law | Union Form | Intersection Form |
|-----|-----------|-------------------|
| **Identity** | A ∪ ∅ = A | A ∩ U = A |
| **Domination** | A ∪ U = U | A ∩ ∅ = ∅ |
| **Idempotent** | A ∪ A = A | A ∩ A = A |
| **Complement** | A ∪ A' = U | A ∩ A' = ∅ |
| **Double Complement** | (A')' = A | (A')' = A |
| **Commutative** | A ∪ B = B ∪ A | A ∩ B = B ∩ A |
| **Associative** | (A∪B)∪C = A∪(B∪C) | (A∩B)∩C = A∩(B∩C) |
| **Distributive** | A∪(B∩C) = (A∪B)∩(A∪C) | A∩(B∪C) = (A∩B)∪(A∩C) |
| **De Morgan's** | **(A∪B)' = A'∩B'** | **(A∩B)' = A'∪B'** |
| **Absorption** | A∪(A∩B) = A | A∩(A∪B) = A |

### Additional Important Identities
```
A - B = A ∩ B'
A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B
A △ B = B △ A                    (Commutative)
(A △ B) △ C = A △ (B △ C)        (Associative)
A ∩ (B △ C) = (A∩B) △ (A∩C)     (Distributive)
A △ ∅ = A                         (Identity)
A △ A = ∅                         (Self-inverse)
A △ U = A'
```

### ⚡ De Morgan's Laws (Generalized)
```
(A₁ ∪ A₂ ∪ ... ∪ Aₙ)' = A₁' ∩ A₂' ∩ ... ∩ Aₙ'
(A₁ ∩ A₂ ∩ ... ∩ Aₙ)' = A₁' ∪ A₂' ∪ ... ∪ Aₙ'
```

---

## 7. POWER SET

### Definition
The **power set** P(A) is the set of **all subsets** of A.

```
If A = {1, 2}, then:
P(A) = {∅, {1}, {2}, {1,2}}
```

### Properties
```
|P(A)| = 2^|A|
∅ ∈ P(A) always
A ∈ P(A) always

If |A| = n:
  |P(A)| = 2ⁿ
  |P(P(A))| = 2^(2ⁿ)
```

### GATE Favorite Questions
```
If |A| = 0 → |P(A)| = 1        → P(∅) = {∅}
If |A| = 1 → |P(A)| = 2
If |A| = 2 → |P(A)| = 4
If |A| = 3 → |P(A)| = 8
If |A| = n → |P(A)| = 2ⁿ
|P(P(∅))| = |P({∅})| = 2¹ = 2
|P(P(P(∅)))| = 2² = 4
```

---

## 8. CARTESIAN PRODUCT

### Definition
```
A × B = {(a, b) | a ∈ A and b ∈ B}
```

### Properties
```
|A × B| = |A| × |B|
A × B ≠ B × A  (in general, unless A = B or one is empty)
A × ∅ = ∅
A × (B ∪ C) = (A × B) ∪ (A × C)
A × (B ∩ C) = (A × B) ∩ (A × C)
```

### Example
```
A = {1, 2}, B = {a, b, c}
A × B = {(1,a), (1,b), (1,c), (2,a), (2,b), (2,c)}
|A × B| = 2 × 3 = 6
```

### n-ary Cartesian Product
```
A₁ × A₂ × ... × Aₙ = Set of all n-tuples (a₁, a₂, ..., aₙ)
A × A = A² (Cartesian square)
```

---

## 9. RELATIONS

### Definition
A **relation R** from set A to set B is a **subset** of A × B.
```
R ⊆ A × B
```
If (a, b) ∈ R, we write **aRb**

### Relation on a Set
A relation **from A to A** is called a **relation on A**.
```
R ⊆ A × A
```

### Number of Relations
```
From A to B: 2^(|A|×|B|) possible relations
On set A:    2^(|A|²) possible relations
```

### Representations of Relations

#### (a) Matrix Representation (Boolean Matrix)
```
For A = {1,2,3}, R = {(1,1), (1,2), (2,3), (3,1)}

M_R = | 1  1  0 |
      | 0  0  1 |
      | 1  0  0 |

M[i][j] = 1 if (aᵢ, aⱼ) ∈ R, else 0
```

#### (b) Directed Graph (Digraph)
- Each element → node
- (a, b) ∈ R → directed edge from a to b
- (a, a) ∈ R → self-loop at a

---

## 10. PROPERTIES OF RELATIONS (on set A)

### ⭐ This is the MOST IMPORTANT topic for GATE from Set Theory

### (a) Reflexive
```
∀a ∈ A, (a, a) ∈ R
```
- **Every element is related to itself**
- Matrix: All diagonal elements = 1
- Digraph: Self-loop at every node
- Number of reflexive relations on |A| = n: **2^(n²-n)**

### (b) Irreflexive
```
∀a ∈ A, (a, a) ∉ R
```
- **No element is related to itself**
- Matrix: All diagonal elements = 0
- Number of irreflexive relations: **2^(n²-n)**

> **Note**: A relation can be NEITHER reflexive NOR irreflexive!

### (c) Symmetric
```
∀a,b ∈ A, (a,b) ∈ R → (b,a) ∈ R
```
- Matrix: M = Mᵀ (symmetric matrix)
- Digraph: Every edge is bidirectional (or absent)
- Number of symmetric relations: **2^(n(n+1)/2)**

### (d) Antisymmetric
```
∀a,b ∈ A, [(a,b) ∈ R ∧ (b,a) ∈ R] → a = b
```
- Equivalently: if a ≠ b and (a,b) ∈ R, then (b,a) ∉ R
- Matrix: For i ≠ j, M[i][j] and M[j][i] **cannot both be 1**
- Digraph: No two distinct nodes have edges in both directions
- Number of antisymmetric relations: **2ⁿ × 3^(n(n-1)/2)**

> **Note**: A relation CAN be both symmetric AND antisymmetric!
> Example: R = {(1,1), (2,2)} on {1,2}

> **Note**: A relation can be NEITHER symmetric NOR antisymmetric!

### (e) Asymmetric
```
∀a,b ∈ A, (a,b) ∈ R → (b,a) ∉ R
```
- **Asymmetric = Antisymmetric + Irreflexive**
- No self-loops, no mutual edges

### (f) Transitive
```
∀a,b,c ∈ A, [(a,b) ∈ R ∧ (b,c) ∈ R] → (a,c) ∈ R
```
- Matrix: R² ⊆ R (i.e., M² has 1 only where M has 1)
- If (a,b) ∈ R and (b,c) ∈ R, check if (a,c) ∈ R

### Summary Table of Counts (|A| = n)

| Property | Number of Relations |
|----------|-------------------|
| Total | 2^(n²) |
| Reflexive | 2^(n²-n) |
| Irreflexive | 2^(n²-n) |
| Symmetric | 2^(n(n+1)/2) |
| Antisymmetric | 2ⁿ · 3^(n(n-1)/2) |
| Both Reflexive & Symmetric | 2^(n(n-1)/2) |
| Both Reflexive & Antisymmetric | 2^(n(n-1)/2) (? — actually need verification) |

### Quick Check Table for Properties

| | Reflexive | Irreflexive | Symmetric | Antisymmetric | Transitive |
|---|---|---|---|---|---|
| **Diagonal** | All 1s | All 0s | Any | Any | — |
| **Off-diagonal** | Any | Any | If (a,b) then (b,a) | If (a,b) & a≠b then NOT (b,a) | Chain check |

### GATE Trick: Checking Transitivity
```
For small sets, check ALL pairs:
If (a,b) ∈ R, look at all (b,c) ∈ R, verify (a,c) ∈ R.

Special cases:
- Empty relation ∅ is TRANSITIVE (vacuously true)
- {(1,2)} is transitive (no chain to check)
- {(1,2),(2,3)} is NOT transitive (missing (1,3))
- {(1,2),(2,1)} is NOT transitive (missing (1,1) and (2,2))
```

---

## 11. CLOSURES OF RELATIONS

### Definition
The **closure** of R with respect to property P is the **smallest** relation containing R that satisfies property P.

### (a) Reflexive Closure
```
r(R) = R ∪ Δ    where Δ = {(a,a) | a ∈ A} (diagonal/identity relation)
```
Matrix: Set all diagonal elements to 1.

### (b) Symmetric Closure
```
s(R) = R ∪ R⁻¹   where R⁻¹ = {(b,a) | (a,b) ∈ R}
```
Matrix: M_s = M ∨ Mᵀ (boolean OR of M and its transpose)

### (c) Transitive Closure
```
t(R) = R ∪ R² ∪ R³ ∪ ... ∪ Rⁿ
```
- **Warshall's Algorithm** computes this efficiently: O(n³)
- Matrix: Use boolean matrix multiplication and repeated OR

### ⭐ GATE Important Points on Closures
```
1. Reflexive closure always exists and is unique
2. Symmetric closure always exists and is unique
3. Transitive closure always exists and is unique
4. Antisymmetric closure may NOT exist
5. Order of closure operations matters for transitive + symmetric
```

### Warshall's Algorithm (Transitive Closure)
```
W₀ = M_R
For k = 1 to n:
    For i = 1 to n:
        For j = 1 to n:
            Wₖ[i][j] = Wₖ₋₁[i][j] ∨ (Wₖ₋₁[i][k] ∧ Wₖ₋₁[k][j])
Final matrix = Wₙ = Transitive closure
```

---

## 12. EQUIVALENCE RELATIONS

### Definition
A relation R on set A is an **equivalence relation** if it is:
1. **Reflexive**
2. **Symmetric**
3. **Transitive**

### Example
```
A = {1, 2, 3, 4, 5, 6}
R = "congruent modulo 3"
R = {(a,b) | a ≡ b (mod 3)}

Equivalence classes:
[1] = {1, 4}    (remainder 1)
[2] = {2, 5}    (remainder 2)
[3] = {3, 6}    (remainder 0)
```

### Equivalence Class
```
[a] = {x ∈ A | (a, x) ∈ R}
```

### Properties of Equivalence Classes
```
1. [a] is non-empty for all a ∈ A (reflexive ensures a ∈ [a])
2. [a] = [b] if and only if (a,b) ∈ R
3. [a] ∩ [b] = ∅ if (a,b) ∉ R
4. ∪ [a] = A (union of all equivalence classes = A)
```

### ⭐ Partition ↔ Equivalence Relation (Fundamental Theorem)

> **Every equivalence relation on A induces a PARTITION of A, and every partition of A induces an equivalence relation.**

### Partition
A partition of set A is a collection of non-empty, pairwise disjoint subsets whose union is A.
```
{A₁, A₂, ..., Aₖ} is a partition if:
1. Aᵢ ≠ ∅ for all i
2. Aᵢ ∩ Aⱼ = ∅ for i ≠ j
3. A₁ ∪ A₂ ∪ ... ∪ Aₖ = A
```

### Number of Equivalence Relations on |A| = n
= Number of partitions of set with n elements = **Bell Number B(n)**

| n | B(n) |
|---|------|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 15 |
| 5 | 52 |

### GATE Trick: Finding Bell Numbers
Use the **Bell Triangle**:
```
1
1  2
2  3  5
5  7  10  15
15  20  27  37  52
```

---

## 13. PARTIAL ORDER RELATIONS (POSET)

### Definition
A relation R on set A is a **partial order** if it is:
1. **Reflexive**
2. **Antisymmetric**
3. **Transitive**

The pair **(A, R)** or **(A, ≤)** is called a **Partially Ordered Set (POSET)**.

### Examples
```
(ℤ, ≤) — integers with ≤
(P(S), ⊆) — power set with subset relation
(ℤ⁺, |) — positive integers with divisibility
```

### Comparable & Incomparable Elements
```
In poset (A, ≤):
- a and b are COMPARABLE if a ≤ b or b ≤ a
- a and b are INCOMPARABLE otherwise
```

### Total Order (Linear Order / Chain)
- Every pair of elements is comparable
- Example: (ℤ, ≤)
- A totally ordered set is called a **chain**

### Antichain
- A subset where **no two distinct elements are comparable**

### Important Elements in a POSET

| Element | Definition |
|---------|-----------|
| **Minimal** | No element is less than it: ¬∃b ∈ A, b ≤ a ∧ b ≠ a |
| **Maximal** | No element is greater than it: ¬∃b ∈ A, a ≤ b ∧ b ≠ a |
| **Minimum (Least)** | Less than or equal to ALL elements: ∀b ∈ A, a ≤ b |
| **Maximum (Greatest)** | Greater than or equal to ALL elements: ∀b ∈ A, b ≤ a |

### ⚠️ Important Distinctions
```
- Minimal/Maximal can be MULTIPLE
- Minimum/Maximum is UNIQUE (if exists)
- If minimum exists, it is the ONLY minimal element
- Total order: minimal = minimum, maximal = maximum
```

### Upper & Lower Bounds (for subset B ⊆ A)

| Term | Definition |
|------|-----------|
| **Upper Bound (UB)** of B | Element a ∈ A such that b ≤ a for all b ∈ B |
| **Lower Bound (LB)** of B | Element a ∈ A such that a ≤ b for all b ∈ B |
| **LUB / Supremum / Join** | Least element among all upper bounds |
| **GLB / Infimum / Meet** | Greatest element among all lower bounds |

```
LUB = sup(B) = ∨B = least upper bound
GLB = inf(B) = ∧B = greatest lower bound
```

### ⭐ GATE Key Points
```
1. LUB and GLB need NOT be in B
2. If LUB ∈ B, then LUB = max(B)
3. If GLB ∈ B, then GLB = min(B)
4. LUB or GLB may NOT exist
5. If they exist, they are UNIQUE
```

---

## 14. HASSE DIAGRAM

### Construction Rules
Given a POSET (A, ≤):
1. **Remove self-loops** (reflexive edges understood)
2. **Remove transitive edges** (if a≤b and b≤c, don't draw a→c)
3. **Draw edges upward** (no need for arrows — larger elements above)

### Example
```
({1,2,3,4,6,12}, | )  where | means "divides"

        12
       / \
      4   6
      |   |
      2   3
       \ /
        1
```

### Reading from Hasse Diagram
- a ≤ b if there is an **upward path** from a to b
- Minimal elements: **bottom nodes** (no edges going down)
- Maximal elements: **top nodes** (no edges going up)

---

## 15. LATTICE

### Definition
A poset (L, ≤) is a **lattice** if for every pair of elements a, b ∈ L:
- **LUB(a, b)** exists → denoted **a ∨ b** (join)
- **GLB(a, b)** exists → denoted **a ∧ b** (meet)

### Types of Lattices

#### Bounded Lattice
Has both a **least element (0)** and a **greatest element (1)**
```
a ∨ 0 = a,   a ∧ 0 = 0
a ∨ 1 = 1,   a ∧ 1 = a
```

#### Complemented Lattice
Bounded lattice where every element has a **complement**:
```
For every a, ∃a' such that:
a ∨ a' = 1  and  a ∧ a' = 0
```

#### Distributive Lattice
```
a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)
a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)
```

#### Boolean Lattice (Boolean Algebra)
A lattice that is:
- **Complemented** + **Distributive** + **Bounded**

### ⭐ Important Lattice Properties

```
1. Every finite lattice is bounded
2. Every chain is a distributive lattice
3. Every totally ordered set is a lattice
4. (P(S), ⊆) is a Boolean lattice
5. (ℤ⁺, |) where |=divides: LUB = LCM, GLB = GCD
```

### Checking if a Poset is a Lattice
```
Compute LUB and GLB for EVERY pair:
- If any pair lacks LUB or GLB → NOT a lattice
```

### Non-Lattice Conditions (GATE Favorites)
The following Hasse diagrams are NOT lattices:

**Pentagon (N₅)** — has LUB/GLB but not distributive
**Diamond (M₃)** — has LUB/GLB but not distributive

```
A lattice is NON-DISTRIBUTIVE ⟺ it contains N₅ or M₃ as a sublattice
```

### Lattice Properties Table
| Property | Meet (∧) | Join (∨) |
|----------|----------|----------|
| Commutative | a∧b = b∧a | a∨b = b∨a |
| Associative | (a∧b)∧c = a∧(b∧c) | (a∨b)∨c = a∨(b∨c) |
| Idempotent | a∧a = a | a∨a = a |
| Absorption | a∧(a∨b) = a | a∨(a∧b) = a |

---

## 16. FUNCTIONS (MAPPINGS)

### Definition
A function **f: A → B** is a relation from A to B where **each element of A** is related to **exactly one element of B**.

```
A = Domain
B = Codomain
f(A) = Range (set of all actual output values)
Range ⊆ Codomain
```

### Conditions for a Relation to be a Function
```
1. Every element of A must have an image (total)
2. No element of A maps to more than one element of B (well-defined/single-valued)
```

### Number of Functions from A to B
```
If |A| = m, |B| = n:
Total functions = n^m
```

---

## 17. TYPES OF FUNCTIONS

### (a) One-to-One (Injective / Injection)
```
f(a₁) = f(a₂) → a₁ = a₂
```
- Different inputs → different outputs
- **|A| ≤ |B|** (necessary condition)
- Number of injections: **P(n, m) = n!/(n-m)!** when m ≤ n, else 0

### (b) Onto (Surjective / Surjection)
```
∀b ∈ B, ∃a ∈ A such that f(a) = b
```
- Range = Codomain
- Every element in B has a pre-image
- **|A| ≥ |B|** (necessary condition)
- Number of surjections: Uses **Inclusion-Exclusion / Stirling Numbers**

```
Number of surjections from m to n:
= Σᵢ₌₀ⁿ (-1)ⁱ C(n,i) (n-i)^m
= n! × S(m,n)  where S(m,n) is Stirling number of second kind
```

### (c) Bijective (Bijection)
```
Both injective AND surjective
```
- One-to-one correspondence
- **|A| = |B|** (necessary and sufficient for finite sets)
- Number of bijections = **n!** (when |A| = |B| = n)

### Summary Table (|A| = m, |B| = n)

| Type | Condition | Count |
|------|-----------|-------|
| Total functions | — | nᵐ |
| Injective | m ≤ n | n!/(n-m)! |
| Surjective | m ≥ n | Σ(-1)ⁱ C(n,i)(n-i)ᵐ |
| Bijective | m = n | n! |

---

## 18. SPECIAL FUNCTIONS

### Identity Function
```
I_A: A → A, I_A(a) = a for all a ∈ A
```

### Constant Function
```
f(a) = c for all a ∈ A (some fixed c ∈ B)
```

### Floor and Ceiling Functions
```
⌊x⌋ = greatest integer ≤ x
⌈x⌉ = smallest integer ≥ x
```

---

## 19. COMPOSITION OF FUNCTIONS

### Definition
```
If f: A → B and g: B → C, then
(g ∘ f): A → C, defined by (g ∘ f)(a) = g(f(a))
```

### Properties
```
1. g ∘ f ≠ f ∘ g  (not commutative in general)
2. h ∘ (g ∘ f) = (h ∘ g) ∘ f  (associative)
3. f ∘ I_A = f and I_B ∘ f = f  (identity)
4. If f and g are injective → g ∘ f is injective
5. If f and g are surjective → g ∘ f is surjective
6. If f and g are bijective → g ∘ f is bijective
```

### ⭐ GATE Important Composition Properties
```
If g ∘ f is injective → f is injective (g may not be)
If g ∘ f is surjective → g is surjective (f may not be)
If g ∘ f is bijective → f is injective AND g is surjective
```

---

## 20. INVERSE FUNCTION

### Definition
```
f: A → B is invertible (f⁻¹ exists) ⟺ f is BIJECTIVE
```

### Properties
```
f⁻¹ ∘ f = I_A
f ∘ f⁻¹ = I_B
(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹
(f⁻¹)⁻¹ = f
```

---

## 21. PRINCIPLE OF INCLUSION-EXCLUSION (PIE)

### Two Sets
```
|A ∪ B| = |A| + |B| - |A ∩ B|
```

### Three Sets
```
|A ∪ B ∪ C| = |A| + |B| + |C| 
               - |A∩B| - |B∩C| - |A∩C| 
               + |A∩B∩C|
```

### General Formula (n sets)
```
|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ... + (-1)ⁿ⁺¹|A₁∩A₂∩...∩Aₙ|
```

### Complement Form
```
|A₁' ∩ A₂' ∩ ... ∩ Aₙ'| = |U| - |A₁ ∪ A₂ ∪ ... ∪ Aₙ|
```
(Elements in NONE of the sets)

---

## 22. CARDINALITY OF SETS (Countability)

### Finite Sets
|A| is a natural number

### Countably Infinite
A set is **countably infinite** if there exists a **bijection** from ℕ to A.
- Denoted |A| = ℵ₀ (aleph-null)

### Countable
A set is **countable** if it is finite OR countably infinite.

### Uncountable
A set that is NOT countable.

### ⭐ Important Results for GATE

| Set | Countable? |
|-----|-----------|
| ℕ (Natural numbers) | ✅ Countably infinite |
| ℤ (Integers) | ✅ Countably infinite |
| ℚ (Rationals) | ✅ Countably infinite |
| ℤ × ℤ | ✅ Countably infinite |
| Set of all finite strings over finite alphabet | ✅ Countably infinite |
| Set of all rational numbers in [0,1] | ✅ Countably infinite |
| ℝ (Real numbers) | ❌ Uncountable |
| [0, 1] (Real interval) | ❌ Uncountable |
| ℝ - ℚ (Irrationals) | ❌ Uncountable |
| P(ℕ) (Power set of naturals) | ❌ Uncountable |
| Set of all functions from ℕ to {0,1} | ❌ Uncountable |
| Set of all languages over Σ | ❌ Uncountable |
| Set of all Turing Machines | ✅ Countably infinite |

### Cantor's Theorem
```
For any set A: |A| < |P(A)|
```
- There is no surjection from A to P(A)
- This proves P(ℕ) is uncountable

### Cantor's Diagonalization
- Used to prove ℝ is uncountable
- Also used in undecidability proofs in TOC

### Properties of Countable/Uncountable Sets
```
1. Countable ∪ Countable = Countable
2. Finite × Countable = Countable
3. Countable × Countable = Countable
4. Countable ∪ Uncountable = Uncountable
5. Subset of countable set = Countable
6. Superset of uncountable set = Uncountable
7. Countable union of countable sets = Countable
```

---

## 23. IMPORTANT GATE FORMULAS - QUICK REFERENCE

### Set Cardinality
```
|A ∪ B| = |A| + |B| - |A ∩ B|
|A - B| = |A| - |A ∩ B|
|A △ B| = |A ∪ B| - |A ∩ B| = |A| + |B| - 2|A ∩ B|
|P(A)| = 2^|A|
|A × B| = |A| · |B|
```

### Counting Relations (on set of size n)
```
Total relations:           2^(n²)
Reflexive:                 2^(n²-n) = 2^(n(n-1))
Irreflexive:               2^(n²-n)
Symmetric:                 2^(n(n+1)/2)
Antisymmetric:             2ⁿ · 3^(n(n-1)/2)
Reflexive & Symmetric:     2^(n(n-1)/2)
Equivalence relations:     Bell number B(n)
```

### Counting Functions (|A| = m, |B| = n)
```
Total functions:     nᵐ
Injections:          P(n,m) = n!/(n-m)!  if m ≤ n
Surjections:         Σᵢ₌₀ⁿ (-1)ⁱ C(n,i)(n-i)ᵐ  if m ≥ n
Bijections:          n!  if m = n
```

---

## 24. COMMON GATE QUESTION PATTERNS

### Pattern 1: Minimum/Maximum Cardinality Questions
```
Q: Given |A| = 10, |B| = 15, find min and max of |A ∩ B|

Max |A ∩ B| = min(|A|, |B|) = 10
Min |A ∩ B| = max(0, |A| + |B| - |U|)  (if U given)
           = 0  (if no constraint)
```

### Pattern 2: Number of Relations with Properties
```
Q: How many relations on {1,2,3} are both reflexive and symmetric?

Reflexive: diagonal fixed (all 1s) → n diagonal entries fixed
Symmetric: upper triangle determines lower triangle
Free choices = upper triangle entries = n(n-1)/2
Answer = 2^(n(n-1)/2) = 2^3 = 8
```

### Pattern 3: Equivalence Relation from Partition
```
Q: Partition {{1,4}, {2,3,5}} on {1,2,3,4,5}
Equivalence relation = ?

R = {(1,1),(4,4),(1,4),(4,1),
     (2,2),(3,3),(5,5),(2,3),(3,2),(2,5),(5,2),(3,5),(5,3)}
```

### Pattern 4: POSET Questions
```
Q: In ({1,2,3,4,5,6,8,12,24}, |), find LUB and GLB of {4,6}

LUB(4,6) = LCM(4,6) = 12
GLB(4,6) = GCD(4,6) = 2
```

### Pattern 5: Lattice Verification
```
Check if every pair has both LUB and GLB.
Draw Hasse diagram, verify for all pairs.
```

### Pattern 6: Function Composition
```
f(x) = 2x+1, g(x) = x²
(g ∘ f)(x) = g(f(x)) = g(2x+1) = (2x+1)²
(f ∘ g)(x) = f(g(x)) = f(x²) = 2x²+1
```

---

## 25. PREVIOUS YEAR GATE TOPICS FREQUENCY

| Topic | Frequency |
|-------|-----------|
| Relations (properties, counting) | ⭐⭐⭐⭐⭐ |
| Equivalence Relations & Partitions | ⭐⭐⭐⭐ |
| Functions (types, counting) | ⭐⭐⭐⭐ |
| Partial Orders / Hasse Diagrams | ⭐⭐⭐⭐ |
| Lattice properties | ⭐⭐⭐ |
| Set operations & identities | ⭐⭐⭐ |
| Inclusion-Exclusion | ⭐⭐⭐ |
| Countability | ⭐⭐⭐ |
| Power sets | ⭐⭐ |
| Closures (transitive) | ⭐⭐ |

---

## 26. PRACTICE PROBLEMS (GATE Style)

### Problem 1
```
Let A = {1,2,3,4}. How many relations on A are both 
reflexive and antisymmetric?

Solution:
Diagonal: Fixed as 1 (reflexive) → 4 entries fixed
Off-diagonal pairs: C(4,2) = 6 pairs
For each pair (i,j) where i≠j: 
  3 choices: (i,j) only, (j,i) only, neither
  (Cannot have both — antisymmetric)

Answer = 3^6 = 729
```

### Problem 2
```
How many equivalence relations on {1,2,3,4}?

Answer = B(4) = 15 (Bell number)

The 15 partitions:
{1,2,3,4}
{1,2,3},{4} and similar (4 ways)
{1,2},{3,4} and similar (3 ways)
{1,2},{3},{4} and similar (6 ways)
{1},{2},{3},{4} (1 way)
Total: 1+4+3+6+1 = 15 ✓
```

### Problem 3
```
f: {1,2,3,4,5} → {a,b,c,d,e}
How many bijective functions exist?

Answer = 5! = 120
```

### Problem 4
```
Is ({2,3,6,12,24,36}, |) a lattice?

Check: LCM(12,18)... wait, 18 isn't in the set.
Check LCM(4,6)... 4 isn't in the set.
Check all pairs:
LCM(24,36) = 72 — NOT in the set!
So LUB(24,36) doesn't exist → NOT a lattice
```

### Problem 5
```
In the poset (P({a,b,c}), ⊆), find:
- Total elements: 2³ = 8
- Maximal element: {a,b,c}
- Minimal element: ∅
- This is a Boolean lattice
- LUB(A,B) = A ∪ B
- GLB(A,B) = A ∩ B
```

---

## 27. QUICK REVISION CHEAT SHEET

```
╔═══════════════════════════════════════════════╗
║           SET THEORY CHEAT SHEET               ║
╠═══════════════════════════════════════════════╣
║ De Morgan: (A∪B)' = A'∩B'                     ║
║           (A∩B)' = A'∪B'                       ║
║                                                 ║
║ |P(A)| = 2ⁿ                                   ║
║ |A×B| = |A|·|B|                                ║
║                                                 ║
║ EQUIVALENCE = Reflexive+Symmetric+Transitive   ║
║ PARTIAL ORDER = Reflexive+Antisymmetric+Trans   ║
║                                                 ║
║ Equivalence Relations ↔ Partitions ↔ Bell Nos   ║
║ B(1)=1, B(2)=2, B(3)=5, B(4)=15, B(5)=52     ║
║                                                 ║
║ LATTICE: Every pair has LUB and GLB             ║
║ BOOLEAN LATTICE: Complemented+Distributive      ║
║                                                 ║
║ Functions: nᵐ total, n!/(n-m)! injections      ║
║ Bijection exists ⟹ |A|=|B|, count = n!         ║
║                                                 ║
║ f⁻¹ exists ⟺ f is bijective                   ║
║ (g∘f)⁻¹ = f⁻¹∘g⁻¹                             ║
║                                                 ║
║ ℚ: countable, ℝ: uncountable                    ║
║ Cantor: |A| < |P(A)| always                     ║
╚═══════════════════════════════════════════════╝
```

---

> **📌 Final Tips for GATE:**
> 1. Practice counting relations problems — they appear almost every year
> 2. Master Hasse diagrams and POSET element identification
> 3. Know Bell numbers up to B(5) = 52
> 4. Understand the correspondence: Equivalence Relation ↔ Partition
> 5. For function problems, clearly identify domain and codomain sizes
> 6. Countability questions link to Theory of Computation (Turing machines, languages)
> 7. De Morgan's Laws appear in Boolean Algebra and Propositional Logic too

---

*These notes cover the complete GATE syllabus for Set Theory in Discrete Mathematics. All topics from basic sets to advanced lattice theory and countability are included with formulas, examples, and GATE-specific tricks.*
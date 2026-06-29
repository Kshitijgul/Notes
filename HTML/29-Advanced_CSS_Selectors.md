<a id="chapter-29-advanced-css-selectors"></a>

# Chapter 29: Advanced CSS Selectors

[⬅ Previous Chapter](#chapter-28-css-selectors) | [📖 Main Index](#main-index) | [Next Chapter ➡](#chapter-30-css-cascade-specificity-inheritance)

---

## 📌 Learning Objectives

By the end of this chapter, you will:

* Master all CSS attribute selectors and their matching patterns
* Understand every pseudo-class category — user action, structural, form, and logical
* Know the difference between pseudo-classes and pseudo-elements
* Master `::before` and `::after` for generated content
* Apply `:hover`, `:focus`, `:active`, `:visited` for interactive states
* Use structural selectors like `:nth-child`, `:first-child`, `:last-child`, `:not`
* Understand modern logical pseudo-classes `:is()`, `:where()`, `:has()`
* Apply form pseudo-classes `:valid`, `:invalid`, `:required`, `:disabled`
* Build real-world UI patterns using only advanced CSS selectors
* Answer all advanced selector interview questions with confidence

---

<a id="chapter-index-table-29"></a>

## Chapter Index Table

| Topic No. | Topic Name | Subtopics |
|-----------|------------|-----------|
| 29.1 | [Attribute Selectors](#291-attribute-selectors) | `[attr]` `[attr=val]` `[attr^=val]` `[attr$=val]` `[attr*=val]` `[attr~=val]` `[attr\|=val]` |
| 29.2 | [User Action Pseudo-classes](#292-user-action-pseudo-classes) | `:hover` `:focus` `:focus-within` `:focus-visible` `:active` `:visited` |
| 29.3 | [Structural Pseudo-classes](#293-structural-pseudo-classes) | `:first-child` `:last-child` `:nth-child` `:nth-of-type` `:only-child` `:empty` |
| 29.4 | [Negation and Logical Pseudo-classes](#294-negation-and-logical-pseudo-classes) | `:not()` `:is()` `:where()` `:has()` |
| 29.5 | [Form and Input Pseudo-classes](#295-form-and-input-pseudo-classes) | `:required` `:optional` `:valid` `:invalid` `:disabled` `:enabled` `:checked` `:placeholder-shown` `:in-range` |
| 29.6 | [Pseudo-elements](#296-pseudo-elements) | `::before` `::after` `::first-line` `::first-letter` `::selection` `::placeholder` `::marker` `::backdrop` |
| 29.7 | [The `content` Property](#297-the-content-property) | Strings<br>Counters<br>`attr()` function<br>Images<br>Quotes |
| 29.8 | [Advanced Selector Patterns](#298-advanced-selector-patterns) | Real-world combinations<br>Pure CSS UI tricks |
| 29.9 | [Interview Questions](#299-interview-questions) | Conceptual<br>Scenario<br>Output-based<br>Advanced |
| 29.10 | [Practice Problems](#2910-practice-problems) | Coding<br>Theory<br>Machine Coding |
| 29.11 | [Mini Project](#2911-mini-project) | Advanced Selectors Showcase UI |
| 29.12 | [Quick Revision](#2912-quick-revision) | Key Points<br>Traps<br>Bullets |
| 29.13 | [Chapter Summary](#2913-chapter-summary) | Final Takeaways |

---

## 291 Attribute Selectors

<a id="291-attribute-selectors"></a>

### 🔷 What Are Attribute Selectors?

Attribute selectors target HTML elements based on the **presence or value of their HTML attributes**. They offer precise targeting without requiring extra classes — using the attributes that already exist in your HTML.

```css
/* Target elements that HAVE the attribute (any value) */
[disabled] { opacity: 0.5; cursor: not-allowed; }

/* Target elements where attribute equals EXACTLY this value */
input[type="email"] { border-color: #2563eb; }
```

---

### 🔷 Complete Attribute Selector Reference

```css
/* ===== 1. [attr] — Has attribute (any value or no value) ===== */
[disabled]  { opacity: 0.5; cursor: not-allowed; }
[required]  { border-left: 3px solid #e74c3c; }
[hidden]    { display: none; }
[draggable] { cursor: grab; }
[aria-expanded] { position: relative; }

/* ===== 2. [attr="value"] — Exact match ===== */
input[type="text"]     { border-radius: 6px; }
input[type="email"]    { padding-left: 2.5rem; }  /* Space for email icon */
input[type="password"] { letter-spacing: 0.15em; }
input[type="checkbox"] { width: 1.2rem; height: 1.2rem; accent-color: #2563eb; }
input[type="radio"]    { accent-color: #7c3aed; }
input[type="submit"]   { background: #2563eb; color: white; cursor: pointer; }
input[type="range"]    { accent-color: #16a34a; }

a[target="_blank"] { padding-right: 1.2em; }
a[target="_blank"]::after { content: ' ↗'; font-size: 0.75em; }

[role="button"] { cursor: pointer; }
[role="alert"]  { background: #fee2e2; border: 1px solid #fca5a5; }

/* ===== 3. [attr^="value"] — STARTS WITH (prefix) ===== */
/* ^ = caret = beginning */
a[href^="https"] { color: #16a34a; }           /* Secure links: green */
a[href^="http:"] { color: #dc2626; }           /* Insecure links: red */
a[href^="mailto:"] { color: #7c3aed; }         /* Email links: purple */
a[href^="tel:"]    { color: #0891b2; }         /* Phone links: teal */
a[href^="#"]       { color: #64748b; }         /* Anchor links: gray */
a[href^="/"]       { font-weight: 500; }       /* Internal root links */

[class^="icon-"]  { display: inline-flex; align-items: center; }
[id^="section-"]  { scroll-margin-top: 5rem; }  /* For sticky header offset */

/* ===== 4. [attr$="value"] — ENDS WITH (suffix) ===== */
/* $ = dollar = end */
a[href$=".pdf"]  { color: #dc2626; }
a[href$=".pdf"]::after  { content: ' 📄'; font-size: 0.8em; }
a[href$=".doc"]::after  { content: ' 📝'; font-size: 0.8em; }
a[href$=".zip"]::after  { content: ' 🗜️'; font-size: 0.8em; }
a[href$=".mp4"]::after  { content: ' 🎬'; font-size: 0.8em; }

img[src$=".png"]  { /* PNG-specific image styles */ }
img[src$=".svg"]  { /* SVG might need width/height */ }

/* ===== 5. [attr*="value"] — CONTAINS anywhere ===== */
/* * = anywhere within the value */
[class*="btn-"]  { display: inline-flex; align-items: center; gap: 0.4rem; }
[class*="icon"]  { font-style: normal; }
[class*="-error"] { color: #dc2626; }
[class*="-success"]{ color: #16a34a; }

a[href*="youtube.com"]::after  { content: ' ▶'; color: #dc2626; }
a[href*="github.com"]::after   { content: ' ⌥'; }
a[href*="twitter.com"]::after  { content: ' 🐦'; }

/* ===== 6. [attr~="value"] — WORD in space-separated list ===== */
/* ~ = tilde = word within space-separated list */
/* Useful for attributes that contain space-separated values */
[class~="featured"] { border-color: gold; }    /* Same as .featured */
[rel~="nofollow"]   { opacity: 0.7; }          /* Links with nofollow in rel list */
[rel~="external"]   { }
/* <a rel="noopener noreferrer nofollow"> — nofollow is one word in the list */

/* ===== 7. [attr|="value"] — Equals OR starts with value- (hyphen-separated) ===== */
/* | = pipe = exact match OR starts with value followed by hyphen */
/* Most common use: language codes */
[lang|="en"] { font-family: 'Segoe UI', sans-serif; }
/* Matches: lang="en", lang="en-US", lang="en-GB", lang="en-AU" */
/* Does NOT match: lang="english" */

[lang|="ar"] { direction: rtl; font-family: 'Noto Naskh Arabic', serif; }
[lang|="zh"] { font-family: 'Noto Sans CJK SC', sans-serif; }

/* ===== 8. Case-insensitive matching with [i] flag ===== */
/* Add 'i' before closing ] for case-insensitive comparison */
a[href$=".PDF" i] { color: red; }  /* Matches .pdf, .PDF, .Pdf */
input[type="TEXT" i] { }           /* Matches text, TEXT, Text */
[data-status="Active" i] { }       /* active, Active, ACTIVE all match */
```

---

### 🔷 Practical Attribute Selector Patterns

```css
/* ===== AUTO-STYLED LINK SYSTEM ===== */
/* No extra classes needed — use existing href attributes */

/* Base link reset */
a { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; }

/* External links (leave the current site) */
a[href^="http"]:not([href*="mysite.com"]) {
  color:      #2563eb;
  padding-right: 1rem;
}
a[href^="http"]:not([href*="mysite.com"])::after {
  content:   ' ↗';
  font-size: 0.75em;
  opacity:   0.7;
}

/* Secure HTTPS */
a[href^="https"]::before {
  content:     '🔒 ';
  font-size:   0.75em;
}

/* File type indicators */
a[href$=".pdf"]  { border-bottom: 2px solid #dc2626; }
a[href$=".doc"],
a[href$=".docx"] { border-bottom: 2px solid #2563eb; }
a[href$=".xls"],
a[href$=".xlsx"] { border-bottom: 2px solid #16a34a; }
a[href$=".zip"]  { border-bottom: 2px solid #d97706; }

/* Email and phone */
a[href^="mailto:"] { color: #7c3aed; font-style: italic; }
a[href^="tel:"]    { color: #0891b2; white-space: nowrap; }

/* Download links */
a[download] {
  display:     inline-flex;
  align-items: center;
  gap:         0.4rem;
  font-weight: 600;
}
a[download]::before { content: '⬇ '; }

/* ===== FORM STYLING WITHOUT EXTRA CLASSES ===== */
/* Style form elements by their attributes */

input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="url"],
input[type="tel"] {
  width:         100%;
  padding:       10px 14px;
  border:        2px solid #e2e8f0;
  border-radius: 8px;
  font-size:     1rem;
  transition:    border-color 0.2s;
}

input[required] {
  border-left-width: 4px;
}

input[disabled],
button[disabled] {
  opacity:        0.5;
  cursor:         not-allowed;
  pointer-events: none;
}

input[readonly] {
  background:  #f8fafc;
  cursor:      default;
  color:       #64748b;
}

/* Search input with icon space */
input[type="search"] {
  padding-left:  2.5rem;
  background:    url("data:image/svg+xml,...") no-repeat 0.75rem center;
  background-size: 1rem;
}
```

---

### 🧠 Hinglish Intuition

> Attribute selectors ek **filter system** ki tarah hain — jaise shopping site pe filter lagao:
>
> - `[type="email"]` = "Sirf email type ke inputs dikhao"
> - `[href^="https"]` = "Sirf secure links dikhao" (starts with https)
> - `[href$=".pdf"]` = "Sirf PDF links dikhao" (ends with .pdf)
> - `[href*="youtube"]` = "YouTube wale koi bhi link dikhao" (contains youtube)
>
> **Fayda:** HTML mein jo attributes already hain (type, href, disabled, required), unse styling karo — extra classes add karne ki zaroorat nahi. Clean HTML, powerful CSS.
>
> **Yaad karne ka trick:**
> - `^` = caret = top left corner = **STARTS** from beginning
> - `$` = dollar = end of something = **ENDS** at end
> - `*` = asterisk = wildcard = **ANYWHERE** in middle

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 292 User Action Pseudo-classes

<a id="292-user-action-pseudo-classes"></a>

### 🔷 What Are User Action Pseudo-classes?

User action pseudo-classes apply styles based on **how the user is interacting** with an element — hovering, focusing, clicking, or having visited a link.

```css
/* Pseudo-class syntax: element:pseudo-class */
a:hover  { color: darkblue; }    /* Mouse is over the link */
a:focus  { outline: 3px solid blue; } /* Element has keyboard focus */
a:active { color: red; }         /* Element is being clicked */
```

---

### 🔷 `:hover` — Mouse Over

```css
/* Basic hover */
a:hover { color: #1d4ed8; text-decoration-thickness: 2px; }
button:hover { background: #1d4ed8; transform: translateY(-1px); }

/* Card lift effect */
.card:hover {
  transform:  translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Image zoom */
.image-wrapper { overflow: hidden; border-radius: 8px; }
.image-wrapper img {
  transition: transform 0.4s ease;
}
.image-wrapper:hover img {
  transform: scale(1.08);
}

/* Reveal hidden content on hover */
.card .overlay {
  position:   absolute;
  inset:      0;
  background: rgba(37, 99, 235, 0.9);
  color:      white;
  display:    flex;
  align-items: center;
  justify-content: center;
  opacity:    0;
  transition: opacity 0.3s ease;
}
.card:hover .overlay { opacity: 1; }

/* Navigation dropdown on hover */
.nav-item .dropdown {
  display:    none;
  position:   absolute;
  top:        100%;
  left:       0;
  background: white;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-radius: 8px;
  min-width:  200px;
}
.nav-item:hover .dropdown { display: block; }

/* Change sibling on hover */
.card:hover .card-title { color: #2563eb; }
.card:hover .card-body  { color: #1e293b; }

/* Table row highlight */
tr:hover td { background: #eff6ff; }

/* ❌ Do NOT rely on :hover for critical functionality */
/* Touch devices (mobile) have no hover state — use :focus also */
```

---

### 🔷 `:focus` — Keyboard Focus

> [!IMPORTANT]
> **Never remove focus styles without replacement.** Keyboard users and assistive technology users depend on visible focus indicators. Removing `outline: none` without an alternative is an **accessibility violation** (WCAG 2.1 SC 2.4.7).

```css
/* ✅ Custom focus styles — visible and beautiful */
:focus {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
}

/* ✅ Focus styles for specific elements */
a:focus {
  outline:        2px solid #2563eb;
  outline-offset: 4px;
  border-radius:  3px;
}

input:focus,
textarea:focus,
select:focus {
  outline:      none;  /* ✅ Remove default outline */
  border-color: #2563eb;  /* ✅ Replace with custom style */
  box-shadow:   0 0 0 3px rgba(37, 99, 235, 0.15);
}

button:focus {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
}

/* ❌ NEVER: Remove focus without replacement */
/* * { outline: none; }  ← Accessibility disaster */
/* a:focus { outline: none; }  ← Keyboard users can't see where they are */
```

---

### 🔷 `:focus-visible` — Smart Focus (Modern)

`:focus-visible` shows focus styles **only when keyboard navigation is being used** — not when clicking with a mouse. This solves the aesthetic problem of focus outlines appearing on mouse clicks.

```css
/* Old approach: hide all focus outlines (BAD) */
:focus { outline: none; }  /* ❌ Accessibility disaster */

/* Better approach: focus-visible */
/* Remove focus ring for mouse users (they can see where they clicked) */
:focus:not(:focus-visible) {
  outline: none;
}

/* Keep focus ring for keyboard users (they need to know where focus is) */
:focus-visible {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
  border-radius:  4px;
}

/* Per-element focus-visible */
button:focus-visible {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
  box-shadow:     0 0 0 6px rgba(37,99,235,0.1);
}

a:focus-visible {
  outline:        2px solid currentColor;
  outline-offset: 4px;
  border-radius:  2px;
}

input:focus-visible {
  outline:      none;
  border-color: #2563eb;
  box-shadow:   0 0 0 3px rgba(37,99,235,0.2);
}
```

---

### 🔷 `:focus-within` — Parent Knows Child is Focused

`:focus-within` applies to a parent element when **any descendant inside it** has focus.

```css
/* Highlight the entire form group when any input inside is focused */
.form-group:focus-within {
  background:    #eff6ff;
  border-radius: 8px;
  padding:       12px;
  outline:       2px solid #93c5fd;
}

/* Float label effect — label moves up when input is focused */
.floating-label-group { position: relative; }
.floating-label-group label {
  position:   absolute;
  top:        12px;
  left:       14px;
  color:      #64748b;
  transition: all 0.2s ease;
  pointer-events: none;
  font-size:  1rem;
}
.floating-label-group:focus-within label {
  top:       -8px;
  left:      10px;
  font-size: 0.78rem;
  color:     #2563eb;
  background: white;
  padding:   0 4px;
}

/* Navigation: show back button area when search is focused */
.search-container:focus-within .search-back-btn {
  display: flex;
}

/* Card: show action buttons when card content is focused */
.card:focus-within .card-actions {
  opacity:    1;
  visibility: visible;
}
```

---

### 🔷 `:active` — Being Clicked

```css
/* Press-down effect on click */
button:active {
  transform:  translateY(1px) scale(0.98);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

/* Darker background on click */
.btn:active { background: #1d4ed8; }
.btn-danger:active { background: #991b1b; }

/* Link turns red when being pressed */
a:active { color: #dc2626; }

/* Card depth on click */
.card:active { transform: translateY(1px); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

/* Important: :active only lasts while the mouse button is held down */
```

---

### 🔷 `:visited` — Previously Visited Links

```css
/* Visited links turn purple (browser default) */
a:visited { color: #7c3aed; }

/* Subtle visited state */
a:visited { color: #6b21a8; text-decoration-color: #c4b5fd; }

/* Navigation: don't show visited state in menus */
nav a:visited { color: inherit; }  /* Override :visited in nav */

/* ⚠️ Security restriction: :visited can only change limited properties */
/* Allowed: color, background-color, border-color, outline-color, */
/*          column-rule-color, text-decoration-color, fill, stroke */
/* NOT allowed: width, height, position, display, etc. */
/* (Prevents fingerprinting browsing history) */

/* LVHA order — recommended to prevent override issues */
a:link    { color: #2563eb; }     /* L — unvisited link */
a:visited { color: #7c3aed; }     /* V — visited link */
a:hover   { color: #1d4ed8; }     /* H — hover */
a:active  { color: #dc2626; }     /* A — being clicked */
/* Remember: "LoVe HAte" */
```

---

### 🧠 Hinglish Intuition

> User action pseudo-classes ek **traffic signal** ki tarah hain — same road, different states, different behavior:
>
> - `:hover` = "Gaadi pass aa rahi hai" — yellow signal
> - `:focus` = "Intersection pe focus hai" — blinking light
> - `:active` = "Abhi gaadi guzar rahi hai" — active moment
> - `:visited` = "Ye road pehle use ki thi" — familiar path
>
> **`:focus-visible` modern approach hai** — mouse se click karo toh outline mat dikhao (user jaanta hai usne kya click kiya), keyboard se navigate karo toh outline dikhao (user ko visual indicator chahiye). Best of both worlds.
>
> **LVHA trick:** "LoVe HAte" — Link, Visited, Hover, Active — is order mein likhne se pseudo-classes sahi kaam karti hain.

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 293 Structural Pseudo-classes

<a id="293-structural-pseudo-classes"></a>

### 🔷 What Are Structural Pseudo-classes?

Structural pseudo-classes target elements based on their **position and relationship within the HTML document structure** — first child, last child, nth element, etc.

---

### 🔷 `:first-child` and `:last-child`

```css
/* :first-child — targets the FIRST child of its parent */
li:first-child { font-weight: bold; border-top: none; }
p:first-child  { margin-top: 0; }
tr:first-child { background: #1e293b; color: white; }  /* Header row */

/* :last-child — targets the LAST child of its parent */
li:last-child  { border-bottom: none; }
p:last-child   { margin-bottom: 0; }

/* Common pattern: remove margins from first/last child */
.card > *:first-child { margin-top: 0; }
.card > *:last-child  { margin-bottom: 0; }

/* Table styles */
table tr:first-child th { border-radius: 8px 8px 0 0; }
table tr:last-child  td { border-bottom: none; }

/* List styles */
.nav-list li:first-child a { border-radius: 8px 8px 0 0; }
.nav-list li:last-child  a { border-radius: 0 0 8px 8px; }
```

---

### 🔷 `:nth-child()` — The Powerful Structural Selector

`:nth-child(n)` targets elements based on their position among siblings.

```css
/* ===== KEYWORDS ===== */
li:nth-child(odd)  { background: #f8fafc; }   /* 1st, 3rd, 5th... */
li:nth-child(even) { background: #ffffff; }   /* 2nd, 4th, 6th... */

/* ===== SPECIFIC POSITION ===== */
li:nth-child(1) { font-weight: bold; }    /* 1st child */
li:nth-child(2) { color: #2563eb; }       /* 2nd child */
li:nth-child(3) { color: #16a34a; }       /* 3rd child */

/* ===== FORMULA: An + B ===== */
/* n starts at 0 and increments: 0, 1, 2, 3... */
/* Result: An + B for each value of n */

li:nth-child(3n)     { }  /* Every 3rd: 3, 6, 9, 12... */
li:nth-child(3n+1)   { }  /* Every 3rd starting at 1: 1, 4, 7, 10... */
li:nth-child(3n+2)   { }  /* Every 3rd starting at 2: 2, 5, 8, 11... */
li:nth-child(2n)     { }  /* Every 2nd (even): 2, 4, 6... same as even */
li:nth-child(2n+1)   { }  /* Every 2nd + 1 (odd): 1, 3, 5... same as odd */
li:nth-child(n+4)    { }  /* From 4th onwards: 4, 5, 6, 7... */
li:nth-child(-n+3)   { }  /* First 3: 3, 2, 1 (n=0,1,2 → 3,2,1) */
li:nth-child(n+3):nth-child(-n+7) { } /* From 3rd to 7th (range) */

/* ===== REAL-WORLD PATTERNS ===== */

/* Zebra table striping */
tbody tr:nth-child(odd)  { background: #f8fafc; }
tbody tr:nth-child(even) { background: #ffffff; }

/* Grid: 3-column layout, special first item */
.grid-item:nth-child(1) { grid-column: span 2; }  /* First spans 2 cols */

/* Highlight every 5th item */
.list-item:nth-child(5n) { color: #2563eb; font-weight: bold; }

/* First 3 items are featured */
.product-card:nth-child(-n+3) {
  border: 2px solid gold;
}

/* Skip first 2, style from 3rd onwards */
.card:nth-child(n+3) { opacity: 0.8; }

/* 3-column grid: middle column different */
.col:nth-child(3n+2) { background: #eff6ff; }

/* First item in each row of 4 columns */
.grid-item:nth-child(4n+1) { margin-left: 0; }
```

---

### 🔷 `:nth-child()` with Selector Argument (Modern CSS)

```css
/* Modern syntax: :nth-child(An+B of selector) */
/* Target nth element that matches the selector */

/* Every even .highlighted item (not every even child) */
li:nth-child(even of .highlighted) { background: yellow; }

/* Every 3rd paragraph (skipping other elements) */
p:nth-child(3n of p) { font-weight: bold; }
```

---

### 🔷 `:nth-of-type()` vs `:nth-child()`

> [!IMPORTANT]
> **Critical difference:**
> - `:nth-child(n)` counts **ALL siblings** regardless of type, then checks if the element matches
> - `:nth-of-type(n)` counts only **siblings of the same type**, then selects

```html
<div>
  <h2>Heading</h2>          <!-- 1st child, 1st h2 -->
  <p>First paragraph</p>    <!-- 2nd child, 1st p -->
  <p>Second paragraph</p>   <!-- 3rd child, 2nd p -->
  <p>Third paragraph</p>    <!-- 4th child, 3rd p -->
</div>
```

```css
/* p:nth-child(2) → matches "First paragraph" (the 2nd child, which IS a p) */
p:nth-child(2) { color: blue; }    /* "First paragraph" */

/* p:nth-child(1) → NO MATCH */
/* 1st child is <h2>, not <p>, so p:nth-child(1) finds nothing */
p:nth-child(1) { color: red; }    /* Nothing matched! */

/* p:nth-of-type(1) → matches "First paragraph" (1st p among ps) */
p:nth-of-type(1) { color: red; }  /* "First paragraph" */

/* p:nth-of-type(2) → matches "Second paragraph" (2nd p among ps) */
p:nth-of-type(2) { color: green; } /* "Second paragraph" */
```

---

### 🔷 More Structural Pseudo-classes

```css
/* ===== :only-child — element with no siblings ===== */
.card:only-child { width: 100%; }  /* Full width when only card */
p:only-child     { font-size: 1.5rem; font-style: italic; }

/* ===== :only-of-type — only element of its type among siblings ===== */
p:only-of-type { text-align: center; margin: 0 auto; max-width: 600px; }

/* ===== :empty — element with no children (including text) ===== */
/* Use for hiding empty containers */
.error-msg:empty { display: none; }  /* Hidden when no error text */
.badge:empty     { display: none; }  /* Hidden when no badge content */
td:empty         { background: #f8fafc; }

/* ===== :root — the root element (html in HTML docs) ===== */
/* Perfect for CSS custom properties */
:root {
  --color-primary:    #2563eb;
  --color-secondary:  #7c3aed;
  --font-size-base:   16px;
  --spacing-unit:     1rem;
  --border-radius:    8px;
}

/* ===== :target — element whose ID matches the URL fragment ===== */
/* URL: page.html#section-2 — targets <section id="section-2"> */
:target {
  scroll-margin-top: 5rem;  /* Offset for sticky header */
  animation:         highlight 2s ease;
}

@keyframes highlight {
  0%, 100% { background: transparent; }
  20%       { background: #fef3c7; }
}

/* Section gets highlighted when linked to */
section:target { outline: 3px solid #f59e0b; border-radius: 8px; }
```

---

### 🔷 `:first-of-type` and `:last-of-type`

```css
/* Select first/last element of a specific type among siblings */

/* First paragraph in any container */
p:first-of-type {
  font-size:   1.1rem;
  color:       #374151;
  font-weight: 500;
}

/* Last paragraph — remove bottom margin */
p:last-of-type { margin-bottom: 0; }

/* First image in article */
article img:first-of-type {
  float:        left;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

/* First h2 in section — no top margin */
section h2:first-of-type { margin-top: 0; }
```

---

### 🧠 Hinglish Intuition

> Structural pseudo-classes ek **roll-call system** ki tarah hain — sab elements queue mein khade hain, aur aap specific positions pe wale ko select karte ho:
>
> - `:first-child` = "Queue mein pehla" — border nahi, bold hai
> - `:last-child` = "Queue mein aakhri" — border nahi, same reason
> - `:nth-child(2n)` = "Har doosra" — zebra striping ke liye
>
> **`:nth-child` ka formula `An + B`:**
> - `n` = 0, 1, 2, 3, 4... (auto-increment)
> - `An + B` calculate karo: `3n + 1` = (3×0+1), (3×1+1), (3×2+1)... = 1, 4, 7, 10...
>
> **`:nth-child` vs `:nth-of-type`:**
> - `:nth-child` = "Queue mein position 3 pe jo bhi hai" (chahe h2, p, div kuch bhi)
> - `:nth-of-type` = "Sirf paragraphs mein se position 3 pe wala" (ignore karo baaki)

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 294 Negation and Logical Pseudo-classes

<a id="294-negation-and-logical-pseudo-classes"></a>

### 🔷 `:not()` — Negation

`:not(selector)` selects elements that do **NOT** match the given selector.

```css
/* Basic :not() usage */
/* Style all inputs EXCEPT checkboxes and radios */
input:not([type="checkbox"]):not([type="radio"]) {
  width:         100%;
  padding:       10px 14px;
  border:        2px solid #e2e8f0;
  border-radius: 8px;
}

/* All links EXCEPT nav links */
a:not(nav a) { text-decoration: underline; }

/* All buttons EXCEPT disabled ones */
button:not(:disabled) { cursor: pointer; }
button:not(:disabled):hover { background: #1d4ed8; }

/* All list items except first */
li:not(:first-child) { border-top: 1px solid #e2e8f0; }

/* All items except last */
.card:not(:last-child) { margin-bottom: 1.5rem; }

/* Target everything EXCEPT elements with a specific class */
p:not(.lead):not(.highlight) { color: #475569; }

/* All form elements except submit */
form input:not([type="submit"]),
form textarea,
form select {
  border: 2px solid #e2e8f0;
}

/* Links not going to current page */
a:not([aria-current="page"]):hover { text-decoration: underline; }

/* Specificity of :not() */
/* :not() itself adds 0 specificity — the ARGUMENT adds specificity */
:not(p)              /* (0,0,0) — argument p adds (0,0,1) */
:not(.card)          /* (0,1,0) — argument .card adds (0,1,0) */
:not(#hero)          /* (1,0,0) — argument #hero adds (1,0,0)! */
p:not(.special)      /* (0,1,1) — p(0,0,1) + .special(0,1,0) */

/* Modern :not() accepts complex selectors */
a:not(.btn, .nav-link, [download]) {
  /* All a tags except buttons, nav links, and download links */
  color: #2563eb;
}
```

---

### 🔷 `:is()` — Matches Any (Error-Forgiving)

`:is()` takes a **selector list** and matches any element that matches any selector in the list. It's the "any of these" selector.

```css
/* Without :is() — repetitive */
header h1, header h2, header h3,
main h1, main h2, main h3,
footer h1, footer h2, footer h3 {
  font-family: 'Inter', sans-serif;
}

/* With :is() — concise */
:is(header, main, footer) :is(h1, h2, h3) {
  font-family: 'Inter', sans-serif;
}

/* More examples */
/* Links in articles and sections */
:is(article, section) a {
  color:           #2563eb;
  text-decoration: underline;
}

/* Interactive elements that need focus styles */
:is(a, button, input, select, textarea):focus-visible {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
}

/* All heading levels */
:is(h1, h2, h3, h4, h5, h6) {
  line-height: 1.2;
  font-weight: 700;
}

/* Error/warning/success messages */
:is(.error, .warning, .success, [role="alert"]) {
  padding:       12px 16px;
  border-radius: 8px;
  border:        1px solid;
  font-weight:   500;
}

/* Specificity of :is() */
/* :is() takes the specificity of its MOST SPECIFIC argument */
:is(h1, .card, #hero)  /* Specificity: (1,0,0) — #hero is most specific */
:is(h1, h2, h3)        /* Specificity: (0,0,1) — all elements */
:is(.card, .btn)       /* Specificity: (0,1,0) — all classes */
```

---

### 🔷 `:where()` — Zero Specificity Grouping

`:where()` is identical to `:is()` in what it matches, BUT it always has **zero specificity**. This makes it extremely useful for reusable base styles that should be easy to override.

```css
/* :where() has ZERO specificity regardless of arguments */
:where(h1, h2, h3, h4, h5, h6) {
  font-family: 'Inter', sans-serif;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}
/* Specificity: (0,0,0) — can be overridden by ANYTHING */

/* This simple rule overrides the :where() above */
h1 { margin-bottom: 1.5rem; }  /* (0,0,1) > (0,0,0) */

/* Use case: CSS resets/base styles meant to be easily overridden */
:where(ul, ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
/* Component styles can easily override this: */
.nav ul { padding-left: 0; margin-bottom: 0; }  /* Wins without !important */

/* :where() in CSS cascade layers */
@layer base {
  :where(a) { color: #2563eb; text-decoration: underline; }
}
/* Any unlayered style overrides even without higher specificity */

/* Comparison: */
:is(h1, h2)   { color: blue; }  /* (0,0,1) — from element selectors */
:where(h1, h2){ color: blue; }  /* (0,0,0) — zero specificity! */
```

---

### 🔷 `:has()` — The Relational Pseudo-class (CSS Parent Selector)

`:has()` selects an element that **contains** elements matching the given selector. It's called the "parent selector" — a feature developers waited for over a decade.

```css
/* ===== BASIC :has() USAGE ===== */

/* Card that HAS an image */
.card:has(img) {
  padding:   0;          /* Remove padding — image fills card */
  overflow:  hidden;
}

/* Card that HAS no image */
.card:not(:has(img)) {
  padding: 2rem;
  background: #f8fafc;
}

/* Figure with a caption */
figure:has(figcaption) {
  border:        1px solid #e2e8f0;
  border-radius: 8px;
  overflow:      hidden;
}

/* ===== FORM PATTERNS ===== */

/* Form group containing an invalid input */
.form-group:has(input:invalid) label {
  color: #dc2626;
}

.form-group:has(input:invalid) {
  padding:    0.75rem;
  background: #fef2f2;
  border:     1px solid #fca5a5;
  border-radius: 8px;
}

/* Form group with a required field */
.form-group:has(input[required]) label::after {
  content: ' *';
  color:   #dc2626;
}

/* ===== NAVIGATION PATTERNS ===== */

/* Nav item that contains a dropdown */
.nav-item:has(.dropdown) > a::after {
  content:     ' ▾';
  font-size:   0.8em;
}

.nav-item:has(.dropdown):hover > a {
  background: rgba(255,255,255,0.1);
}

/* ===== LAYOUT PATTERNS ===== */

/* Section with more than 3 cards — switch layout */
.card-grid:has(.card:nth-child(4)) {
  grid-template-columns: repeat(4, 1fr);  /* Switch to 4 cols */
}

/* Article that has an aside */
article:has(aside) {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

/* ===== INTERACTIVE PATTERNS ===== */

/* Body changes when modal checkbox is checked */
body:has(#modal-toggle:checked) {
  overflow: hidden;  /* Prevent scroll when modal open */
}

.modal:has(#modal-toggle:checked) {
  display:    flex;
}

/* Page layout changes when sidebar is expanded */
.page:has(.sidebar.expanded) main {
  margin-left: 280px;
}

/* ===== REAL-WORLD EXAMPLES ===== */

/* Table row with a critical-level badge */
tr:has(.badge-critical) {
  background: #fff1f2;
  border-left: 4px solid #dc2626;
}

/* List item that has a sub-menu */
li:has(ul) > a {
  padding-right: 1.5rem;  /* Space for arrow */
}
li:has(ul) > a::after {
  content:  '›';
  position: absolute;
  right:    0.75rem;
}

/* Parent element that has a focused child */
.input-group:has(:focus) {
  border-color: #2563eb;
  box-shadow:   0 0 0 3px rgba(37,99,235,0.15);
}
```

> [!NOTE]
> `:has()` browser support: Chrome 105+, Firefox 121+, Safari 15.4+. Use with progressive enhancement — styles work without `:has()` and are enhanced with it.

---

### 🧠 Hinglish Intuition

> **`:not()`** = "Sabko style karo EXCEPT ye wale"
> Like: "Sab employees ko bonus do EXCEPT jo late aate hain"
>
> **`:is()`** = "In mein se koi bhi ho toh style karo"
> Like: "Agar CEO, Manager, ya Lead ho — same meeting room milti hai"
> Specificity = sabse specific argument ki
>
> **`:where()`** = Exactly `:is()` jaisa BUT zero specificity
> Like: "Default company policy" — easily override ho sakti hai department-wise
> Use karo base styles ke liye jo easily overrideable honi chahiye
>
> **`:has()`** = CSS ka "Parent Selector" — pehle available nahi tha, ab hai!
> "Agar kisi card ke andar image hai, toh padding remove karo"
> JavaScript ke bina parent element ko child ke basis pe style karna — revolutionary!

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 295 Form and Input Pseudo-classes

<a id="295-form-and-input-pseudo-classes"></a>

### 🔷 Form State Pseudo-classes

```css
/* ===== :required and :optional ===== */
input:required,
select:required,
textarea:required {
  border-left: 4px solid #e74c3c;
}

input:optional {
  border-left: 4px solid #e2e8f0;  /* Subtle for optional */
}

/* Label for required field */
.form-group:has(input:required) label::after {
  content: ' *';
  color:   #dc2626;
  font-weight: 700;
}

/* ===== :valid and :invalid ===== */
/* Applied after user interaction (with :user-invalid in modern CSS) */
input:valid {
  border-color: #16a34a;
  background:   url("data:image/svg+xml,...checkmark") no-repeat right 12px center;
  background-size: 1.2rem;
  padding-right: 2.5rem;
}

input:invalid {
  border-color: #dc2626;
  background:   url("data:image/svg+xml,...xmark") no-repeat right 12px center;
  background-size: 1.2rem;
  padding-right: 2.5rem;
}

/* Only show invalid state after user has interacted */
/* :user-invalid — modern, more UX-friendly */
input:user-invalid {
  border-color: #dc2626;
  box-shadow:   0 0 0 3px rgba(220,38,38,0.1);
}

/* Error message shown only for invalid field */
input:invalid + .error-msg { display: block; }
input:valid   + .error-msg { display: none; }

/* ===== :disabled and :enabled ===== */
input:disabled,
button:disabled,
select:disabled,
textarea:disabled {
  opacity:        0.5;
  cursor:         not-allowed;
  background:     #f1f5f9;
  border-color:   #e2e8f0;
  pointer-events: none;
}

input:enabled:hover { border-color: #94a3b8; }

/* ===== :read-only and :read-write ===== */
input:read-only {
  background:  #f8fafc;
  color:       #64748b;
  border-style: dashed;
  cursor:      default;
}

input:read-write:focus {
  border-color: #2563eb;
  box-shadow:   0 0 0 3px rgba(37,99,235,0.15);
}

/* ===== :checked — Checkboxes and Radio Buttons ===== */
input[type="checkbox"]:checked + label {
  color:          #16a34a;
  font-weight:    600;
  text-decoration: line-through;  /* Todo completed */
}

input[type="radio"]:checked + label {
  color:       #2563eb;
  font-weight: 600;
}

/* Custom styled checkbox */
.custom-checkbox input[type="checkbox"] {
  opacity:  0;
  width:    0;
  height:   0;
  position: absolute;
}

.custom-checkbox label {
  display:     flex;
  align-items: center;
  gap:         0.75rem;
  cursor:      pointer;
  user-select: none;
}

.custom-checkbox label::before {
  content:       '';
  width:         20px;
  height:        20px;
  border:        2px solid #cbd5e1;
  border-radius: 4px;
  flex-shrink:   0;
  transition:    all 0.2s;
}

.custom-checkbox input:checked + label::before {
  background:    #2563eb;
  border-color:  #2563eb;
  content:       '✓';
  color:         white;
  display:       flex;
  align-items:   center;
  justify-content: center;
  font-size:     0.8rem;
  font-weight:   700;
}

.custom-checkbox input:focus-visible + label::before {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
}

/* ===== :placeholder-shown ===== */
/* Matches when placeholder is visible (field is empty) */
input:placeholder-shown {
  border-style: dashed;  /* Show dashed when empty */
}

input:not(:placeholder-shown) {
  border-style: solid;   /* Solid when user has typed */
}

/* Floating label implementation */
.float-group { position: relative; }
.float-group input {
  width:      100%;
  padding:    1.5rem 1rem 0.5rem;
  border:     2px solid #e2e8f0;
  border-radius: 8px;
  font-size:  1rem;
}
.float-group label {
  position:   absolute;
  top:        1rem;
  left:       1rem;
  color:      #94a3b8;
  transition: all 0.2s ease;
  pointer-events: none;
  font-size:  1rem;
}
/* When input has content (placeholder NOT shown) — float the label */
.float-group input:not(:placeholder-shown) + label,
.float-group input:focus + label {
  top:       0.3rem;
  font-size: 0.72rem;
  color:     #2563eb;
  font-weight: 600;
}

/* ===== :in-range and :out-of-range ===== */
/* For inputs with min/max attributes */
input[type="number"]:in-range {
  border-color: #16a34a;
  background:   #f0fdf4;
}

input[type="number"]:out-of-range {
  border-color: #dc2626;
  background:   #fef2f2;
}

/* ===== :indeterminate ===== */
/* Checkbox in indeterminate state (set via JavaScript) */
input[type="checkbox"]:indeterminate + label {
  color: #d97706;
}
input[type="checkbox"]:indeterminate + label::before {
  background: #d97706;
  content: '–';
  color: white;
}
```

---

### 🔷 Complete Form with All Pseudo-classes

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Form Pseudo-classes</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; }
    form { background: white; padding: 2rem; border-radius: 12px; max-width: 480px; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

    .form-group { margin-bottom: 1.5rem; }

    label {
      display:       block;
      font-weight:   600;
      font-size:     0.9rem;
      color:         #374151;
      margin-bottom: 0.4rem;
    }

    input, textarea, select {
      width:         100%;
      padding:       10px 14px;
      border:        2px solid #e2e8f0;
      border-radius: 8px;
      font-size:     1rem;
      font-family:   inherit;
      transition:    border-color 0.2s, box-shadow 0.2s;
      outline:       none;
    }

    /* Enabled state hover */
    input:enabled:hover   { border-color: #94a3b8; }
    input:focus, select:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }

    /* Required field indicator */
    input:required { border-left: 4px solid #e74c3c; }
    input:optional { border-left: 4px solid transparent; }

    /* Validation states (after user interaction) */
    input:user-valid   { border-color: #16a34a; }
    input:user-invalid { border-color: #dc2626; background: #fff5f5; }

    /* Fallback for older browsers */
    input:valid:not(:placeholder-shown)   { border-color: #16a34a; }
    input:invalid:not(:placeholder-shown) { border-color: #dc2626; }

    /* Error message */
    .error-msg { display: none; font-size: 0.8rem; color: #dc2626; margin-top: 4px; }
    input:user-invalid + .error-msg,
    input:invalid:not(:placeholder-shown) + .error-msg { display: block; }

    /* Disabled */
    input:disabled { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; }

    /* Read-only */
    input:read-only { background: #f8fafc; color: #64748b; border-style: dashed; }

    /* Submit button */
    button[type="submit"] {
      width:         100%;
      background:    #2563eb;
      color:         white;
      border:        none;
      padding:       12px;
      border-radius: 8px;
      font-size:     1rem;
      font-weight:   600;
      cursor:        pointer;
      transition:    background 0.2s;
    }
    button[type="submit"]:hover   { background: #1d4ed8; }
    button[type="submit"]:active  { background: #1e40af; }
    button[type="submit"]:disabled{ opacity: 0.5; cursor: not-allowed; }
  </style>
</head>
<body>
  <form novalidate>
    <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem;">Registration Form</h2>

    <div class="form-group">
      <label for="name">Full Name (required)</label>
      <input type="text" id="name" name="name"
             required minlength="3" autocomplete="name"
             placeholder="Enter your name">
      <span class="error-msg">Please enter at least 3 characters</span>
    </div>

    <div class="form-group">
      <label for="email">Email Address (required)</label>
      <input type="email" id="email" name="email"
             required autocomplete="email"
             placeholder="you@example.com">
      <span class="error-msg">Please enter a valid email address</span>
    </div>

    <div class="form-group">
      <label for="age">Age (18–100)</label>
      <input type="number" id="age" name="age"
             min="18" max="100" placeholder="Your age">
    </div>

    <div class="form-group">
      <label for="website">Website (optional)</label>
      <input type="url" id="website" name="website"
             placeholder="https://yoursite.com"
             autocomplete="url">
    </div>

    <div class="form-group">
      <label for="user-id">User ID (read-only)</label>
      <input type="text" id="user-id" value="USR-12345" readonly>
    </div>

    <div class="form-group">
      <label for="promo">Promo Code (disabled)</label>
      <input type="text" id="promo" placeholder="SUMMER24" disabled>
    </div>

    <button type="submit">Create Account</button>
  </form>
</body>
</html>
```

---

### 🧠 Hinglish Intuition

> Form pseudo-classes ek **real-time feedback system** hain — jaise ek strict teacher jo turant bata deta hai sahi ya galat:
>
> - `:valid` = "Correct! ✓" — green border
> - `:invalid` = "Wrong! ✗" — red border
> - `:required` = "Ye toh bharna hi hai" — red left border
> - `:disabled` = "Ye option available nahi" — faded out
> - `:checked` = "Done!" — checkbox selected state
> - `:placeholder-shown` = "Field abhi bhi khali hai" — placeholder visible
>
> **UX tip:** `:invalid` immediately dikhaana bad UX hai — user ne type karna shuru bhi nahi kiya aur error dikh raha hai! Isliye `input:user-invalid` ya `input:not(:placeholder-shown):invalid` use karo — sirf jab user ne interact kiya ho tab invalid state dikhao.

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 296 Pseudo-elements

<a id="296-pseudo-elements"></a>

### 🔷 What Are Pseudo-elements?

Pseudo-elements create **virtual HTML elements** that don't exist in the actual DOM but can be styled and even populated with content using CSS. They use the `::` double-colon syntax (CSS3 standard).

```
Real HTML elements: <div>, <p>, <span>
Pseudo-elements:    ::before, ::after, ::first-line, ::first-letter
```

---

### 🔷 `::before` and `::after` — Generated Content

These are the most powerful pseudo-elements. They **insert content before or after** an element's actual content.

```css
/* Required: content property (even if empty) */
.element::before { content: ''; /* or any content */ }
.element::after  { content: ''; /* or any content */ }
```

---

### 🔷 `::before` — Insert Before Content

```css
/* ===== DECORATIVE ELEMENTS ===== */

/* Quotation marks for blockquotes */
blockquote::before {
  content:     '"';
  font-size:   4rem;
  color:       #2563eb;
  line-height: 0;
  vertical-align: -1rem;
  margin-right: 0.25rem;
  font-family: Georgia, serif;
}

/* Required field indicator */
.required::before {
  content:     '* ';
  color:       #dc2626;
  font-weight: 700;
}

/* Icon before navigation items */
.nav-item.home::before     { content: '🏠 '; }
.nav-item.settings::before { content: '⚙️ '; }
.nav-item.profile::before  { content: '👤 '; }

/* Counter/step number */
.step::before {
  content:       counter(step-counter);
  counter-increment: step-counter;
  display:       flex;
  align-items:   center;
  justify-content: center;
  width:         32px;
  height:        32px;
  background:    #2563eb;
  color:         white;
  border-radius: 50%;
  font-weight:   700;
  font-size:     0.875rem;
  flex-shrink:   0;
}

/* Checkbox custom style */
.custom-check input:checked ~ label::before {
  content: '✓';
  /* ... */
}

/* ===== STRUCTURAL ELEMENTS ===== */

/* Clearfix (old float clearing technique) */
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
}
.clearfix::after { clear: both; }

/* Full-bleed overlay */
.hero::before {
  content:    '';
  position:   absolute;
  inset:      0;         /* top/right/bottom/left: 0 */
  background: rgba(0,0,0,0.5);
  z-index:    1;
}

/* Gradient overlay on card image */
.card-image::before {
  content:    '';
  position:   absolute;
  inset:      0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%);
  z-index:    1;
}
```

---

### 🔷 `::after` — Insert After Content

```css
/* ===== DECORATIVE ELEMENTS ===== */

/* Closing quote */
blockquote::after {
  content:     '"';
  font-size:   4rem;
  color:       #2563eb;
  line-height: 0;
  vertical-align: -2rem;
  font-family: Georgia, serif;
}

/* Badge/tag after text */
.new::after {
  content:       'NEW';
  background:    #16a34a;
  color:         white;
  font-size:     0.6rem;
  font-weight:   700;
  padding:       2px 6px;
  border-radius: 4px;
  margin-left:   6px;
  vertical-align: middle;
  letter-spacing: 0.05em;
}

.sale::after {
  content:    'SALE';
  background: #dc2626;
  color:      white;
  font-size:  0.6rem;
  font-weight: 700;
  padding:    2px 6px;
  border-radius: 4px;
  margin-left: 6px;
  vertical-align: middle;
}

/* External link indicator */
a[target="_blank"]::after {
  content:   ' ↗';
  font-size: 0.75em;
  opacity:   0.7;
}

/* Breadcrumb separator */
.breadcrumb li:not(:last-child)::after {
  content:  ' / ';
  color:    #94a3b8;
  padding:  0 0.5rem;
}

/* Required asterisk */
label.required::after {
  content:     ' *';
  color:       #dc2626;
  font-weight: 700;
}

/* Tooltip */
[data-tooltip]::after {
  content:       attr(data-tooltip);
  position:      absolute;
  bottom:        calc(100% + 8px);
  left:          50%;
  transform:     translateX(-50%);
  background:    #1e293b;
  color:         white;
  padding:       6px 10px;
  border-radius: 6px;
  font-size:     0.8rem;
  white-space:   nowrap;
  opacity:       0;
  pointer-events: none;
  transition:    opacity 0.2s;
}
[data-tooltip]:hover::after { opacity: 1; }

/* ===== UNDERLINE EFFECTS ===== */

/* Animated underline on hover */
.hover-underline {
  position:        relative;
  text-decoration: none;
}
.hover-underline::after {
  content:    '';
  position:   absolute;
  bottom:     -2px;
  left:       0;
  right:      100%;   /* Start at 0 width */
  height:     2px;
  background: #2563eb;
  transition: right 0.3s ease;
}
.hover-underline:hover::after { right: 0; }  /* Expand to full width */

/* ===== GEOMETRIC SHAPES ===== */

/* CSS triangle (pointing down) for tooltips */
[data-tooltip]::before {
  content:    '';
  position:   absolute;
  bottom:     calc(100% + 2px);
  left:       50%;
  transform:  translateX(-50%);
  border:     6px solid transparent;
  border-top-color: #1e293b;
  opacity:    0;
  transition: opacity 0.2s;
}
[data-tooltip]:hover::before { opacity: 1; }

/* Corner ribbon */
.card.featured::after {
  content:       'FEATURED';
  position:      absolute;
  top:           16px;
  right:         -30px;
  background:    #2563eb;
  color:         white;
  font-size:     0.65rem;
  font-weight:   700;
  letter-spacing: 0.05em;
  padding:       4px 36px;
  transform:     rotate(45deg);
  text-transform: uppercase;
}
```

---

### 🔷 `::first-line` and `::first-letter`

```css
/* ::first-line — style the first line of a text block */
/* Only works on block-level elements */
article p::first-line {
  font-weight: 600;
  color:       #0f172a;
  font-size:   1.05em;
}

.intro::first-line {
  font-variant: small-caps;
  letter-spacing: 0.05em;
}

/* ::first-letter — style the first letter (drop cap effect) */
/* Only works on block-level elements */
article > p:first-of-type::first-letter {
  font-size:   3.5rem;
  font-weight: 700;
  line-height: 0.8;
  float:       left;
  margin-right: 8px;
  margin-top:  4px;
  color:       #2563eb;
  font-family: Georgia, serif;
}

/* Colorful first letter */
.fancy-paragraph::first-letter {
  font-size:   4rem;
  font-weight: 800;
  color:       #7c3aed;
  float:       left;
  margin:      0 0.1em 0 0;
  line-height: 0.75;
}
```

---

### 🔷 `::selection` — Text Selection Style

```css
/* Style the user's text selection */
::selection {
  background: #2563eb;
  color:      white;
}

/* Different selection in code blocks */
pre::selection,
code::selection {
  background: #7c3aed;
  color:      white;
}

/* Yellow highlight style */
.highlight::selection {
  background: #fef08a;
  color:      #1e293b;
}
```

---

### 🔷 `::placeholder` — Input Placeholder

```css
/* Style input placeholder text */
input::placeholder,
textarea::placeholder {
  color:      #94a3b8;
  font-style: italic;
  font-size:  0.9em;
}

/* Remove italic on focus */
input:focus::placeholder {
  color:      #cbd5e1;
  font-style: normal;
}

/* Make placeholder more visible */
.search-input::placeholder {
  color:       #64748b;
  font-weight: 400;
}
```

---

### 🔷 `::marker` — List Item Markers

```css
/* Style list bullets and numbers */
li::marker {
  color:     #2563eb;
  font-size: 1.2em;
}

ol li::marker {
  color:       #7c3aed;
  font-weight: 700;
  font-size:   0.875em;
}

/* Custom unicode marker */
.checklist li::marker {
  content: '✓  ';
  color:   #16a34a;
}

.warning-list li::marker {
  content: '⚠ ';
  color:   #d97706;
}
```

---

### 🔷 `::backdrop` — Behind Modal/Dialog

```css
/* Styles the full-screen background behind a <dialog> */
dialog::backdrop {
  background:   rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Semi-transparent colored backdrop */
.modal::backdrop {
  background: rgba(15, 23, 42, 0.8);
}
```

---

### 🧠 Hinglish Intuition

> Pseudo-elements ek **invisible assistant** ki tarah hain — DOM mein hain nahi, lekin CSS ke through kaam karte hain:
>
> `::before` = "Element se pehle kuch insert karo" — jaise envelope pe stamp lagana
> `::after`  = "Element ke baad kuch insert karo" — jaise letter pe signature karna
>
> **Key rule:** `::before` aur `::after` ka kaam karne ke liye `content` property **zaroori** hai — chahe empty string `''` hi ho. Bina `content` ke ye elements exist hi nahi karte.
>
> **Super use case:** `::before` aur `::after` ek element pe CSS triangles, overlays, badges, counters, tooltips banane dete hain — HTML touch kiye bina. Ye "CSS magic" hai!
>
> `::first-letter` = Drop cap — newspaper style pehla bada letter
> `::selection` = Text select karne par custom highlight color
> `::placeholder` = Input placeholder ka styling

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 297 The `content` Property

<a id="297-the-content-property"></a>

### 🔷 The `content` Property

The `content` property is **required for `::before` and `::after`** pseudo-elements and controls what is inserted.

```css
/* ===== STRING VALUES ===== */
.arrow::after     { content: ' →'; }
.new-badge::after { content: ' NEW'; }
.required::before { content: '* '; }
.breadcrumb li:not(:last-child)::after { content: ' / '; }

/* ===== EMPTY STRING (structural/decorative) ===== */
.overlay::before  { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.underline::after { content: ''; display: block; height: 2px; background: currentColor; }
.clearfix::after  { content: ''; display: table; clear: both; }

/* ===== ATTR() FUNCTION — use HTML attribute value ===== */
/* Dynamic content from HTML attributes — no JS needed! */

/* Use data-tooltip attribute as tooltip content */
[data-tooltip]::after { content: attr(data-tooltip); }
/* <button data-tooltip="Click to save">Save</button> */
/* ::after shows: "Click to save" */

/* Show href value after links (for print) */
@media print {
  a[href]::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
    color: #64748b;
  }
}

/* Show data attributes */
.price[data-currency]::before  { content: attr(data-currency); }
/* <span data-currency="₹" class="price">999</span> */
/* Shows: ₹999 */

.card[data-tag]::before {
  content:     attr(data-tag);
  /* Turns data-tag attribute into a visible badge */
}

/* ===== COUNTERS ===== */
/* CSS counters for automatic numbering */

/* Define counter on parent */
.steps-list {
  counter-reset: step-num;  /* Initialize counter to 0 */
}

/* Increment and display counter on each item */
.steps-list li {
  counter-increment: step-num;  /* Increase by 1 for each li */
  position:          relative;
  padding-left:      3rem;
  margin-bottom:     1.5rem;
}

.steps-list li::before {
  content:       counter(step-num);  /* Display counter value */
  position:      absolute;
  left:          0;
  width:         2rem;
  height:        2rem;
  background:    #2563eb;
  color:         white;
  border-radius: 50%;
  display:       flex;
  align-items:   center;
  justify-content: center;
  font-weight:   700;
  font-size:     0.875rem;
}

/* Nested counters */
ol {
  counter-reset: section;
  list-style-type: none;
}
li { counter-increment: section; }
li::before {
  content: counters(section, ".") " ";
  /* Output: 1, 1.1, 1.1.1, 1.2, 2, 2.1, etc. */
}

/* ===== IMAGES ===== */
/* Display an image as content (rare) */
.logo::before {
  content: url('/images/logo.svg');
}

/* ===== OPEN/CLOSE QUOTE ===== */
/* Use language-appropriate quotes */
q::before { content: open-quote; }
q::after  { content: close-quote; }

:lang(en) { quotes: '"' '"' '\'' '\''; }  /* "English quotes" */
:lang(fr) { quotes: '«' '»' '‹' '›'; }   /* «French guillemets» */
:lang(de) { quotes: '„' '"' '‚' '\'' ; }  /* „German quotes" */

/* ===== none and normal ===== */
/* Remove content from pseudo-element (hide it) */
.no-arrow::after { content: none; }    /* Hides ::after */
.reset::before   { content: normal; }  /* Browser default */
```

---

### 🧠 Hinglish Intuition

> `content` property ek **magic printer** ki tarah hai — `::before` aur `::after` ko kya print karna hai ye batata hai:
>
> - `content: 'hello'` = Exactly "hello" print karo
> - `content: ''` = Invisible element banao (structural use ke liye)
> - `content: attr(data-tip)` = HTML attribute ka value print karo
> - `content: counter(steps)` = Auto-numbered step print karo
>
> **Print mein links** wala trick bahut useful hai — `content: ' (' attr(href) ')'` se links ke URLs automatically print ho jaate hain, JavaScript ke bina.

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 298 Advanced Selector Patterns

<a id="298-advanced-selector-patterns"></a>

### 🔷 Real-World Pattern Library

```css
/* ===== PATTERN 1: Custom Tooltip System ===== */
[data-tooltip] {
  position: relative;
  cursor:   help;
}

[data-tooltip]::before,
[data-tooltip]::after {
  position:      absolute;
  left:          50%;
  transform:     translateX(-50%);
  opacity:       0;
  pointer-events: none;
  transition:    opacity 0.2s, transform 0.2s;
}

[data-tooltip]::after {
  content:       attr(data-tooltip);
  bottom:        calc(100% + 10px);
  background:    #1e293b;
  color:         white;
  padding:       6px 12px;
  border-radius: 6px;
  font-size:     0.78rem;
  white-space:   nowrap;
  font-style:    normal;
  font-weight:   400;
  transform:     translateX(-50%) translateY(4px);
}

[data-tooltip]::before {
  content:         '';
  bottom:          calc(100% + 4px);
  border:          5px solid transparent;
  border-top-color: #1e293b;
  transform:       translateX(-50%) translateY(4px);
}

[data-tooltip]:hover::before,
[data-tooltip]:hover::after,
[data-tooltip]:focus-visible::before,
[data-tooltip]:focus-visible::after {
  opacity:   1;
  transform: translateX(-50%) translateY(0);
}

/* ===== PATTERN 2: Progress Steps ===== */
.progress-steps {
  display:      flex;
  counter-reset: step;
  position:     relative;
}

.progress-steps::before {
  content:    '';
  position:   absolute;
  top:        20px;
  left:       40px;
  right:      40px;
  height:     2px;
  background: #e2e8f0;
  z-index:    0;
}

.step {
  flex:            1;
  text-align:      center;
  position:        relative;
  counter-increment: step;
}

.step::before {
  content:         counter(step);
  width:           40px;
  height:          40px;
  border-radius:   50%;
  background:      #e2e8f0;
  color:           #94a3b8;
  display:         flex;
  align-items:     center;
  justify-content: center;
  font-weight:     700;
  margin:          0 auto 0.5rem;
  position:        relative;
  z-index:         1;
  transition:      background 0.3s, color 0.3s;
}

.step.active::before {
  background: #2563eb;
  color:      white;
}

.step.completed::before {
  content:    '✓';
  background: #16a34a;
  color:      white;
}

/* ===== PATTERN 3: CSS-Only Tabs ===== */
/* Radio button + general sibling technique */
.tabs-container {
  max-width: 600px;
}

/* Hide actual radio inputs */
.tab-input { display: none; }

.tab-labels { display: flex; border-bottom: 2px solid #e2e8f0; }

.tab-label {
  padding:     10px 20px;
  cursor:      pointer;
  color:       #64748b;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition:  all 0.2s;
}

.tab-label:hover { color: #2563eb; }

.tab-content { display: none; padding: 1.5rem 0; }

/* When radio is checked, show its label as active and show its content */
#tab1:checked ~ .tab-labels label[for="tab1"],
#tab2:checked ~ .tab-labels label[for="tab2"],
#tab3:checked ~ .tab-labels label[for="tab3"] {
  color:        #2563eb;
  border-bottom-color: #2563eb;
  font-weight:  700;
}

#tab1:checked ~ .tab-panels .panel-1,
#tab2:checked ~ .tab-panels .panel-2,
#tab3:checked ~ .tab-panels .panel-3 {
  display: block;
}

/* ===== PATTERN 4: Card Hover Reveal ===== */
.reveal-card {
  position:      relative;
  overflow:      hidden;
  border-radius: 12px;
  cursor:        pointer;
}

.reveal-card img {
  display:    block;
  width:      100%;
  transition: transform 0.4s ease;
}

.reveal-card::after {
  content:       attr(data-title);
  position:      absolute;
  inset:         0;
  background:    linear-gradient(to top, rgba(37,99,235,0.95) 40%, transparent);
  color:         white;
  display:       flex;
  align-items:   flex-end;
  padding:       1.5rem;
  font-size:     1.1rem;
  font-weight:   700;
  opacity:       0;
  transform:     translateY(10px);
  transition:    opacity 0.3s, transform 0.3s;
}

.reveal-card:hover img { transform: scale(1.06); }
.reveal-card:hover::after { opacity: 1; transform: translateY(0); }

/* ===== PATTERN 5: Reading Progress Indicator ===== */
body {
  counter-reset: section;
}

section h2 {
  counter-increment: section;
}

section h2::before {
  content:       counter(section, decimal-leading-zero) '. ';
  color:         #94a3b8;
  font-weight:   400;
  font-size:     0.85em;
}

/* ===== PATTERN 6: Automatic Table of Contents Numbering ===== */
.toc { counter-reset: toc-item; }
.toc li { counter-increment: toc-item; list-style: none; }
.toc li::before {
  content:     counters(toc-item, '.') '  ';
  color:       #94a3b8;
  font-size:   0.85em;
}

/* ===== PATTERN 7: Truncated Text with Fade ===== */
.text-clamp {
  display:            -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow:           hidden;
  position:           relative;
}

/* Fade out at bottom */
.text-fade {
  position: relative;
  max-height: 4.5em;
  overflow:   hidden;
}
.text-fade::after {
  content:    '';
  position:   absolute;
  bottom:     0;
  left:       0;
  right:      0;
  height:     2em;
  background: linear-gradient(transparent, white);
}

/* ===== PATTERN 8: Zebra Cards with :nth-child ===== */
.card-list .card:nth-child(odd) {
  background:   #f8fafc;
  border-color: #e2e8f0;
}

.card-list .card:nth-child(even) {
  background:   #eff6ff;
  border-color: #bfdbfe;
}

/* ===== PATTERN 9: Focus Ring System ===== */
/* Global, accessible, beautiful focus rings */
:focus-visible {
  outline:        none;
  box-shadow:     0 0 0 3px white, 0 0 0 6px #2563eb;
  border-radius:  4px;
}

/* Dark background: invert the ring colors */
.dark-section :focus-visible {
  box-shadow: 0 0 0 3px #1e293b, 0 0 0 6px white;
}

/* ===== PATTERN 10: Smart Link Styling System ===== */
/* Complete link styling without any classes */
a                                { color: #2563eb; }
a:visited                        { color: #7c3aed; }
a:hover                          { color: #1d4ed8; }
a:focus-visible                  { outline: 2px solid #2563eb; border-radius: 2px; }
a[href^="https"]:not([href*="mysite.com"])::after { content: ' ↗'; font-size: 0.75em; }
a[href^="mailto:"]::before       { content: '✉ '; }
a[href^="tel:"]::before          { content: '📞 '; }
a[href$=".pdf"]::after           { content: ' (PDF)'; font-size: 0.8em; color: #dc2626; }
a[download]::before              { content: '⬇ '; }
a[aria-current="page"]           { font-weight: 700; text-decoration: none; pointer-events: none; }
```

---

### 🧠 Hinglish Intuition

> Advanced patterns ka combo — attribute selectors + pseudo-classes + pseudo-elements + combinators — ek **fully equipped kitchen** ki tarah hai. Alag-alag tools ko sath use karo, complex dishes bana sakte ho:
>
> - Tooltip: `[data-tooltip]` attribute + `::after` content `attr(data-tooltip)` + `:hover` visibility
> - CSS Tabs: Hidden `<input type="radio">` + `:checked` state + `~` general sibling to show content
> - Progress steps: `counter-increment` + `::before` content `counter()`
>
> **JavaScript ke bina** ye sab possible hai — purely CSS. This is the power of advanced selectors combined.

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 299 Interview Questions

<a id="299-interview-questions"></a>

### 💡 Interview Questions

---

#### 🔹 Conceptual Questions

**Q1. What is the difference between a pseudo-class and a pseudo-element?**

**Answer:**

| Feature | Pseudo-class | Pseudo-element |
|---------|-------------|----------------|
| **Syntax** | Single colon `:hover` | Double colon `::before` |
| **Targets** | Existing elements in specific states | Virtual elements (don't exist in DOM) |
| **Purpose** | Style based on state or position | Create and style virtual content |
| **Examples** | `:hover`, `:focus`, `:nth-child`, `:not()` | `::before`, `::after`, `::first-line` |
| **DOM existence** | Element exists; state changes | Creates virtual DOM node |

```css
/* Pseudo-class: targets existing a element when hovered */
a:hover { color: darkblue; }

/* Pseudo-element: creates virtual content INSIDE the a element */
a::after { content: ' →'; }
/* This inserts " →" after EVERY link's text — not in DOM, only in render */
```

The old CSS2 syntax used single colon for both (`a:before`), which is still supported. Modern CSS3 uses `::` for pseudo-elements to distinguish them from pseudo-classes.

---

**Q2. What does `::before` and `::after` create, and what is required for them to work?**

**Answer:**
`::before` and `::after` create **virtual child elements** — they appear as the first and last children of the selected element, but exist only in the CSS rendering layer, not in the actual HTML DOM.

They **require the `content` property** — without it, they don't render at all. Even an empty string `''` is needed for purely decorative elements.

```css
/* ❌ Does nothing — no content property */
.card::after { background: red; width: 100px; height: 100px; }

/* ✅ Works — content: '' creates the element even if invisible */
.card::after {
  content:    '';        /* Required! */
  display:    block;
  background: red;
  width:      100px;
  height:     100px;
}
```

**Key characteristics:**
- Can be positioned (position: absolute relative to parent)
- Can be sized, colored, animated
- NOT selectable via JavaScript (`document.querySelector('::after')` returns null)
- Cannot contain actual HTML elements
- `display: block` or `display: flex` needed for width/height to work (default is `inline`)

---

**Q3. What is `:focus-visible` and why is it preferred over `:focus`?**

**Answer:**
`:focus-visible` applies focus styles **only when the browser determines a focus indicator is necessary** — typically when using keyboard navigation. It doesn't apply when clicking with a mouse (because the click itself provides visual feedback).

**Why preferred:**

```css
/* Old approach — shows ugly outline even on mouse clicks */
:focus { outline: 3px solid blue; }
/* Problem: clicking a button with mouse shows the outline — annoying visually */

/* ❌ Terrible approach — removes focus for everyone */
:focus { outline: none; }
/* Accessibility disaster — keyboard users can't see where focus is */

/* ✅ Modern approach — best of both */
/* Mouse click: no outline (user can see what they clicked) */
/* Keyboard Tab: outline appears (user needs visual indicator) */
:focus-visible {
  outline:        3px solid #2563eb;
  outline-offset: 3px;
}
/* For browsers that don't support :focus-visible, the polyfill covers it */
```

Browser support is excellent (Chrome 86+, Firefox 85+, Safari 15.4+). Use `:focus-visible` for all modern projects.

---

**Q4. Explain `:nth-child(An+B)` with examples. What is the difference between `:nth-child` and `:nth-of-type`?**

**Answer:**
`:nth-child(An+B)` selects elements based on their position among siblings, where:
- `n` starts at 0 and increments: 0, 1, 2, 3...
- `A` is the cycle size (repeat every A elements)
- `B` is the offset (which position in the cycle)

```css
/* Formula examples */
li:nth-child(3)    /* Just the 3rd: n=0→3 */
li:nth-child(2n)   /* Even: 2,4,6,8... (n=0→0, n=1→2, n=2→4) */
li:nth-child(2n+1) /* Odd: 1,3,5,7... (n=0→1, n=1→3, n=2→5) */
li:nth-child(3n)   /* Every 3rd: 3,6,9... (n=0→0,skip; n=1→3; n=2→6) */
li:nth-child(3n+2) /* 2nd in each group of 3: 2,5,8... */
li:nth-child(-n+3) /* First 3: (n=0→3, n=1→2, n=2→1, n=3→0) */
li:nth-child(n+4)  /* From 4th onward: 4,5,6,7... */
```

**`:nth-child` vs `:nth-of-type`:**

```html
<div>
  <h2>Title</h2>    <!-- 1st child -->
  <p>Para 1</p>     <!-- 2nd child, 1st p -->
  <p>Para 2</p>     <!-- 3rd child, 2nd p -->
</div>
```

```css
p:nth-child(1)    /* NO MATCH: 1st child is h2, not p */
p:nth-child(2)    /* "Para 1": 2nd child IS a p */
p:nth-of-type(1)  /* "Para 1": 1st p among p elements */
p:nth-of-type(2)  /* "Para 2": 2nd p among p elements */
```

**Rule:** `:nth-child` counts ALL siblings. `:nth-of-type` counts only siblings of the SAME TYPE.

---

**Q5. What is `:has()` and why was it considered a breakthrough in CSS?**

**Answer:**
`:has()` is called the **CSS parent selector** — it allows selecting a parent element based on what it contains. This was impossible in CSS for over 20 years and required JavaScript.

```css
/* Select .card elements that CONTAIN an img */
.card:has(img) {
  padding: 0;         /* Remove padding when image present */
  overflow: hidden;
}

/* Form group containing an invalid input */
.form-group:has(input:invalid) label {
  color: #dc2626;     /* Red label when input is invalid */
}

/* Navigation item containing a sub-menu */
.nav-item:has(.dropdown) > a::after {
  content: ' ▾';    /* Add arrow if dropdown exists */
}
```

**Why breakthrough:** Previously, if you wanted to change a parent's style based on its child, you needed JavaScript to add a class to the parent. Now pure CSS can do it:

```javascript
// Old way: JavaScript needed
document.querySelectorAll('.card').forEach(card => {
  if (card.querySelector('img')) {
    card.classList.add('has-image');
  }
});
```

```css
/* New way: Pure CSS */
.card:has(img) { /* styles */ }
```

Browser support: Chrome 105+, Firefox 121+, Safari 15.4+.

---

#### 🔹 Scenario-Based Questions

**Q6. How would you style a link to automatically show a "(PDF)" label after it, change its color, and add a download icon — using only CSS, without modifying the HTML?**

**Answer:**

```css
/* Target links ending in .pdf using attribute selector */
a[href$=".pdf"] {
  color:    #dc2626;           /* Red for PDF links */
  position: relative;
}

/* Add PDF label after */
a[href$=".pdf"]::after {
  content:       ' (PDF)';
  font-size:     0.78em;
  font-weight:   700;
  color:         #dc2626;
  letter-spacing: 0.03em;
}

/* Add download icon before */
a[href$=".pdf"]::before {
  content:     '📄 ';
  font-size:   0.9em;
}

/* Hover state */
a[href$=".pdf"]:hover {
  color:           #b91c1c;
  text-decoration-thickness: 2px;
}
```

This requires zero HTML changes — the CSS uses the existing `href` attribute to identify PDF links automatically.

---

**Q7. A developer wants to remove the bullet points from navigation lists without affecting other lists on the page. What is the best CSS approach?**

**Answer:**

```css
/* ✅ Best approach: scope to nav with child combinator */
nav ul,
nav ol {
  list-style: none;
  padding:    0;
  margin:     0;
}

/* Or even more specific */
header nav > ul,
.main-nav > ul,
.main-nav > ul ul {  /* Including dropdown lists */
  list-style: none;
  padding:    0;
  margin:     0;
}

/* ✅ Alternative: use :is() for conciseness */
:is(nav, .nav-menu, [role="navigation"]) ul {
  list-style: none;
  padding:    0;
  margin:     0;
}
```

This approach ensures regular `<ul>` lists in `<main>`, `<article>`, or `<aside>` retain their bullet points. Only lists inside navigation elements are affected.

---

#### 🔹 Output-Based Questions

**Q8. What will `li:nth-child(3n+2)` select from a list of 9 items?**

**Answer:**
Formula `3n+2` where n = 0, 1, 2, 3...
- n=0: 3(0)+2 = **2**
- n=1: 3(1)+2 = **5**
- n=2: 3(2)+2 = **8**
- n=3: 3(3)+2 = 11 (beyond our 9 items)

**Selected: items 2, 5, 8** (every 3rd starting from the 2nd)

---

**Q9. What is the specificity of `a:not(#special)::after`?**

**Answer:**
Breaking down `a:not(#special)::after`:
- `a` = element selector = `(0,0,1)`
- `:not(#special)` = `:not()` itself adds 0, but `#special` INSIDE adds `(1,0,0)`
- `::after` = pseudo-element = `(0,0,1)`

Total: `(1,0,2)` — A=1 (from #special), B=0, C=2 (a + ::after)

---

#### 🔹 Advanced Questions

**Q10. What is the difference between `:is()` and `:where()` in terms of specificity? When would you use each?**

**Answer:**

Both `:is()` and `:where()` match the same elements when given the same selectors. The difference is **specificity**:

- **`:is()`** takes the specificity of its **most specific argument**
- **`:where()`** always has **zero specificity**

```css
/* :is() — specificity from arguments */
:is(h1, .title, #hero) { color: blue; }
/* Specificity: (1,0,0) — because #hero is most specific argument */

/* :where() — always zero specificity */
:where(h1, .title, #hero) { color: blue; }
/* Specificity: (0,0,0) — regardless of arguments */

/* Practical difference: */
:is(header, main, footer) a { color: blue; }  /* (0,0,2) */
:where(header, main, footer) a { color: blue; }  /* (0,0,1) — only 'a' counts */
```

**When to use each:**

Use **`:is()`** when you want normal specificity behavior — e.g., targeting elements in specific contexts where the specificity should prevent easy overriding.

Use **`:where()`** for **base/reset styles** that should be easily overridden:

```css
/* ✅ Use :where() for default styles (easy to override) */
:where(ul, ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
/* Any component can override this without fighting specificity */
.nav ul { padding: 0; margin: 0; }  /* Simple class selector wins */

/* ✅ Use :is() for component-level styles */
:is(.card, .panel, .modal) h2 {
  font-size: 1.25rem;
  font-weight: 700;
}
/* Retains normal specificity — not as easily overridden */
```

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 2910 Practice Problems

<a id="2910-practice-problems"></a>

### 🧪 Practice Problems

---

#### 🔷 Coding Questions

**Q1. Create a complete link auto-styling system using only attribute selectors:**

```css
/* Complete Link Auto-Styling System */
/* No extra classes needed — uses existing attributes */

/* Base */
a { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; transition: all 0.2s; }
a:visited { color: #7c3aed; }
a:hover   { color: #1d4ed8; }
a:active  { color: #dc2626; }
a:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 3px; }

/* Current page link */
a[aria-current="page"] { font-weight: 700; color: #2563eb; text-decoration: none; pointer-events: none; }

/* External links */
a[href^="http"]:not([href*="mysite.com"])::after { content: ' ↗'; font-size: 0.75em; opacity: 0.7; }
a[href^="https"]::before { content: ''; } /* Secure — no indicator needed (most are https) */

/* Email links */
a[href^="mailto:"] { color: #7c3aed; font-style: italic; }
a[href^="mailto:"]::before { content: '✉ '; font-style: normal; }

/* Phone links */
a[href^="tel:"] { color: #0891b2; white-space: nowrap; }
a[href^="tel:"]::before { content: '📞 '; }

/* Download links */
a[download] { font-weight: 600; }
a[download]::before { content: '⬇ '; }

/* File type indicators */
a[href$=".pdf"]::after  { content: ' (PDF)';  color: #dc2626; font-size: 0.78em; font-weight: 700; }
a[href$=".doc"]::after,
a[href$=".docx"]::after { content: ' (DOC)';  color: #2563eb; font-size: 0.78em; font-weight: 700; }
a[href$=".zip"]::after  { content: ' (ZIP)';  color: #d97706; font-size: 0.78em; font-weight: 700; }

/* Disabled links */
a[aria-disabled="true"] { color: #94a3b8; cursor: not-allowed; pointer-events: none; text-decoration: none; }

/* Print: show full URLs */
@media print {
  a[href]::after { content: ' (' attr(href) ')'; font-size: 0.8em; color: #64748b; }
}
```

---

**Q2. Build a CSS-only accordion using `:checked` and `+` adjacent sibling selector:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Accordion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; }

    /* Hide checkboxes */
    .accordion-toggle { display: none; }

    .accordion { border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }

    /* Each item */
    .accordion-item { border-bottom: 1px solid #e2e8f0; }
    .accordion-item:last-child { border-bottom: none; }

    /* Label acts as clickable header */
    .accordion-label {
      display:         flex;
      justify-content: space-between;
      align-items:     center;
      padding:         1rem 1.25rem;
      cursor:          pointer;
      font-weight:     600;
      color:           #1e293b;
      background:      #f8fafc;
      transition:      background 0.2s;
      user-select:     none;
    }
    .accordion-label:hover { background: #f1f5f9; }

    /* Arrow icon */
    .accordion-label::after {
      content:    '+';
      font-size:  1.25rem;
      font-weight: 400;
      color:      #94a3b8;
      transition: transform 0.3s, content 0.2s;
      line-height: 1;
    }

    /* Content panel — hidden by default */
    .accordion-content {
      max-height: 0;
      overflow:   hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      background: white;
    }

    .accordion-content-inner { padding: 1.25rem; color: #475569; line-height: 1.7; }

    /* When checkbox is checked: show content, rotate arrow */
    .accordion-toggle:checked + .accordion-label {
      background:  #eff6ff;
      color:       #2563eb;
    }

    .accordion-toggle:checked + .accordion-label::after {
      content:   '×';
      transform: rotate(45deg);
      color:     #2563eb;
    }

    /* Adjacent sibling: .accordion-content after .accordion-label */
    .accordion-toggle:checked + .accordion-label + .accordion-content {
      max-height: 500px;
    }

    /* Focus styles for accessibility */
    .accordion-toggle:focus-visible + .accordion-label {
      outline:        3px solid #2563eb;
      outline-offset: -3px;
    }
  </style>
</head>
<body>

  <h1 style="margin-bottom: 1.5rem; font-size: 1.5rem;">FAQ — CSS Only Accordion</h1>

  <div class="accordion">

    <div class="accordion-item">
      <input type="checkbox" id="q1" class="accordion-toggle">
      <label for="q1" class="accordion-label">What is CSS?</label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents. It controls layout, colors, fonts, spacing, and responsive behavior of web pages.</p>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <input type="checkbox" id="q2" class="accordion-toggle">
      <label for="q2" class="accordion-label">What are pseudo-elements?</label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>Pseudo-elements create virtual HTML elements that can be styled with CSS. The most common are <code>::before</code> and <code>::after</code>, which insert content before or after an element's actual content. They require the <code>content</code> property to render.</p>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <input type="checkbox" id="q3" class="accordion-toggle">
      <label for="q3" class="accordion-label">When should I use :is() vs :where()?</label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>Use <code>:is()</code> for normal specificity behavior where the specificity matches the most specific argument. Use <code>:where()</code> for base/reset styles that should be easily overridden — it always has zero specificity, making overrides simple.</p>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <input type="checkbox" id="q4" class="accordion-toggle">
      <label for="q4" class="accordion-label">What is the :has() pseudo-class?</label>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <p>The <code>:has()</code> pseudo-class is CSS's "parent selector." It allows you to style a parent element based on its children. For example, <code>.card:has(img)</code> styles cards that contain images. This was previously impossible without JavaScript.</p>
        </div>
      </div>
    </div>

  </div>

</body>
</html>
```

---

#### 🔷 Theory Questions

**T1.** What is the difference between `:nth-child(n+3)` and `:nth-child(-n+3)`? What elements do each select from a list of 10 items?

**T2.** Can you use `::before` and `::after` on replaced elements like `<img>` and `<input>`? Why or why not?

**T3.** What is the `LVHA` order for link pseudo-classes and why does order matter?

**T4.** Explain how `:focus-within` differs from `:focus`. Give a real-world use case.

**T5.** What CSS properties can be changed using `:visited`? Why is this list restricted?

---

#### 🔷 Machine Coding Problems

**MP1. Custom Form with CSS-Only Validation**
Build a registration form that:
- Shows red border and error message for invalid inputs (without JS)
- Shows green border for valid inputs
- Uses `:valid`, `:invalid`, `:user-invalid`, `:placeholder-shown`
- Required fields have `*` added via `::after` on their labels
- Custom styled checkboxes using `::before` and `:checked`

**MP2. CSS Tooltip System**
Build a complete tooltip system that:
- Uses `data-tooltip` attribute (no classes needed)
- Shows tooltip on `:hover` and `:focus-visible`
- Positions tooltip above the element with a CSS triangle arrow
- Uses `attr()` function in `content` property
- Includes fade animation
- Has variants: `data-tooltip-position="bottom"`, `data-tooltip-position="right"`

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 2911 Mini Project

<a id="2911-mini-project"></a>

### 🚀 Mini Project: Advanced CSS Selectors Showcase — Interactive Demo UI

---

#### 🔷 Problem Statement

Build a comprehensive **Advanced CSS Selectors Interactive Showcase** that demonstrates every advanced selector type covered in this chapter with live previews, syntax display, and interactive demonstrations.

---

#### 🔷 Features

* ✅ Attribute selectors demonstration with live link styling
* ✅ Interactive hover/focus/active state demos
* ✅ `:nth-child` visual selector demonstrating all patterns
* ✅ `:not()`, `:is()`, `:where()` comparison cards
* ✅ `::before` and `::after` live examples with counters
* ✅ CSS-only tooltip system in action
* ✅ Form pseudo-classes interactive demo
* ✅ Pure CSS accordion using `:checked` + `+` sibling
* ✅ Fully accessible and semantic HTML throughout

---

#### 🔷 Full Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Advanced CSS Selectors Showcase — Chapter 29 interactive demo of pseudo-classes, pseudo-elements, and attribute selectors.">
  <title>Advanced CSS Selectors | Chapter 29</title>

  <style>
    /* ============================================================
       TOKENS & RESET
       ============================================================ */
    :root {
      --c-attr:     #7c3aed;
      --c-action:   #2563eb;
      --c-struct:   #16a34a;
      --c-logic:    #d97706;
      --c-form:     #db2777;
      --c-pseudo:   #0891b2;
      --text:       #1e293b;
      --muted:      #64748b;
      --bg:         #f8fafc;
      --surface:    #ffffff;
      --border:     #e2e8f0;
      --font:       'Segoe UI', system-ui, sans-serif;
      --mono:       'JetBrains Mono', 'Courier New', monospace;
      --radius:     10px;
      --shadow:     0 2px 12px rgba(0,0,0,0.08);
    }

    *, *::before, *::after { box-sizing: border-box; }
    * { margin: 0; padding: 0; }
    body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; }
    img { max-width: 100%; display: block; }

    /* ============================================================
       SKIP LINK
       ============================================================ */
    .skip-link { position: absolute; top: -50px; left: 0; background: var(--c-action); color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; z-index: 9999; transition: top 0.2s; }
    .skip-link:focus { top: 0; }

    /* ============================================================
       HEADER
       ============================================================ */
    .site-header { background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 2.5rem 1rem; text-align: center; }
    .site-header .tag { display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #93c5fd; padding: 3px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 1rem; }
    .site-header h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
    .site-header p { color: #94a3b8; }

    /* ============================================================
       MAIN & SECTION
       ============================================================ */
    main { max-width: 1000px; margin: 0 auto; padding: 3rem 1rem 5rem; }

    .demo-section { margin-bottom: 3.5rem; }
    .section-title {
      font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem;
      padding-bottom: 0.75rem; border-bottom: 2px solid var(--border);
      display: flex; align-items: center; gap: 0.5rem;
    }
    .section-badge {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.06em; padding: 2px 10px; border-radius: 50px;
      font-family: var(--mono);
    }

    /* ============================================================
       DEMO CARD
       ============================================================ */
    .demo-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); margin-bottom: 1.25rem; }
    .demo-card-head { padding: 10px 16px; background: #f8fafc; border-bottom: 1px solid var(--border); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
    .demo-card-body { padding: 1.25rem; }

    /* ============================================================
       CODE BLOCK
       ============================================================ */
    .code { background: #0f172a; color: #e2e8f0; font-family: var(--mono); font-size: 0.78rem; padding: 1rem; border-radius: 8px; overflow-x: auto; line-height: 1.7; white-space: pre; margin-bottom: 1rem; }
    .ct { color: #f97316; } .ca { color: #60a5fa; } .cv { color: #86efac; } .cs { color: #c084fc; } .cc { color: #475569; font-style: italic; } .ck { color: #93c5fd; }

    /* ============================================================
       ATTRIBUTE SELECTOR DEMO
       ============================================================ */
    .link-demo-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
    .link-demo-list a { font-size: 0.9rem; padding: 6px 10px; border-radius: 6px; background: #f8fafc; display: block; transition: all 0.2s; }

    /* Live attribute selector styling */
    .link-demo a[href^="https"] { color: #16a34a; }
    .link-demo a[href^="https"]::before { content: '🔒 '; }
    .link-demo a[href^="mailto:"] { color: #7c3aed; font-style: italic; }
    .link-demo a[href^="mailto:"]::before { content: '✉ '; font-style: normal; }
    .link-demo a[href^="tel:"] { color: #0891b2; }
    .link-demo a[href^="tel:"]::before { content: '📞 '; }
    .link-demo a[href$=".pdf"]::after { content: ' (PDF)'; font-size: 0.78em; color: #dc2626; font-weight: 700; }
    .link-demo a[download]::before { content: '⬇ '; font-weight: 700; }
    .link-demo a[target="_blank"]::after { content: ' ↗'; font-size: 0.78em; opacity: 0.6; }

    /* ============================================================
       USER ACTION DEMO
       ============================================================ */
    .action-demo { display: flex; flex-wrap: wrap; gap: 1rem; }
    .action-btn {
      padding: 10px 20px; border-radius: 8px; border: 2px solid var(--border);
      font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit;
      background: white; color: var(--text); transition: all 0.2s; position: relative;
    }

    /* :hover demo */
    .action-btn.hover-demo:hover { background: #eff6ff; border-color: #2563eb; color: #2563eb; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(37,99,235,0.2); }

    /* :active demo */
    .action-btn.active-demo:active { transform: translateY(1px) scale(0.98); background: #dbeafe; }

    /* :focus-visible demo */
    .action-btn.focus-demo:focus-visible { outline: 3px solid #2563eb; outline-offset: 3px; background: #eff6ff; }

    /* data-tooltip demo */
    .action-btn[data-tooltip] { position: relative; }
    .action-btn[data-tooltip]::after {
      content: attr(data-tooltip);
      position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px);
      background: #1e293b; color: white; padding: 5px 10px; border-radius: 6px;
      font-size: 0.72rem; font-weight: 400; white-space: nowrap;
      opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s; z-index: 10;
    }
    .action-btn[data-tooltip]::before {
      content: ''; position: absolute; bottom: calc(100% + 2px); left: 50%;
      transform: translateX(-50%) translateY(4px); border: 5px solid transparent;
      border-top-color: #1e293b; opacity: 0; transition: opacity 0.2s, transform 0.2s;
    }
    .action-btn[data-tooltip]:hover::after,
    .action-btn[data-tooltip]:focus-visible::after {
      opacity: 1; transform: translateX(-50%) translateY(0);
    }
    .action-btn[data-tooltip]:hover::before,
    .action-btn[data-tooltip]:focus-visible::before {
      opacity: 1; transform: translateX(-50%) translateY(0);
    }

    /* ============================================================
       NTH-CHILD VISUAL DEMO
       ============================================================ */
    .nth-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
    .nth-item {
      width: 40px; height: 40px; border-radius: 8px; background: #f1f5f9;
      border: 2px solid #e2e8f0; display: flex; align-items: center;
      justify-content: center; font-weight: 700; font-size: 0.8rem; color: #94a3b8;
      transition: all 0.3s;
    }

    /* nth-child patterns applied */
    .nth-even .nth-item:nth-child(even)   { background: #eff6ff; border-color: #2563eb; color: #2563eb; }
    .nth-odd  .nth-item:nth-child(odd)    { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
    .nth-3n   .nth-item:nth-child(3n)     { background: #fef3c7; border-color: #d97706; color: #d97706; }
    .nth-n3   .nth-item:nth-child(-n+3)   { background: #fdf4ff; border-color: #7c3aed; color: #7c3aed; }
    .nth-from4 .nth-item:nth-child(n+4)   { background: #fff1f2; border-color: #dc2626; color: #dc2626; }

    .nth-label { font-size: 0.78rem; font-family: var(--mono); color: var(--muted); margin-bottom: 6px; }

    /* ============================================================
       PSEUDO-ELEMENT COUNTER DEMO
       ============================================================ */
    .counter-steps {
      counter-reset: step;
      display:       flex;
      flex-direction: column;
      gap:           1rem;
    }

    .counter-step {
      counter-increment: step;
      display:           flex;
      align-items:       flex-start;
      gap:               1rem;
      padding:           1rem;
      background:        #f8fafc;
      border-radius:     10px;
      border:            1px solid var(--border);
    }

    .counter-step::before {
      content:         counter(step);
      min-width:       36px;
      height:          36px;
      background:      #2563eb;
      color:           white;
      border-radius:   50%;
      display:         flex;
      align-items:     center;
      justify-content: center;
      font-weight:     800;
      font-size:       0.875rem;
      flex-shrink:     0;
    }

    .counter-step-title { font-weight: 700; margin-bottom: 3px; }
    .counter-step-desc  { font-size: 0.875rem; color: var(--muted); }

    /* ============================================================
       BEFORE/AFTER DEMOS
       ============================================================ */
    .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 500px) { .ba-grid { grid-template-columns: 1fr; } }

    .ba-demo-item { padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid var(--border); font-size: 0.9rem; }
    .ba-label { font-size: 0.7rem; font-family: var(--mono); color: var(--muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }

    /* Badge demo */
    .demo-new::after { content: ' NEW'; background: #16a34a; color: white; font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px; vertical-align: middle; letter-spacing: 0.04em; }

    /* Quote demo */
    .demo-quote { font-style: italic; border-left: 3px solid #2563eb; padding-left: 1rem; }
    .demo-quote::before { content: '"'; font-size: 2.5rem; color: #2563eb; line-height: 0; vertical-align: -0.6rem; margin-right: 4px; font-family: Georgia, serif; }

    /* Underline animation */
    .demo-underline { position: relative; text-decoration: none; display: inline-block; font-weight: 600; color: #2563eb; }
    .demo-underline::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 100%; height: 2px; background: #2563eb; transition: right 0.3s ease; }
    .demo-underline:hover::after { right: 0; }

    /* Selection demo */
    .demo-selection::selection { background: #7c3aed; color: white; }

    /* First letter */
    .demo-first-letter::first-letter { font-size: 2.5rem; font-weight: 800; color: #2563eb; float: left; margin: 0 6px 0 0; line-height: 0.8; font-family: Georgia, serif; }

    /* ============================================================
       FORM PSEUDO-CLASSES DEMO
       ============================================================ */
    .form-demo { display: flex; flex-direction: column; gap: 1rem; }

    .form-field { display: flex; flex-direction: column; gap: 4px; }
    .form-field label { font-size: 0.85rem; font-weight: 600; color: #374151; }
    .form-field input {
      padding: 9px 13px; border: 2px solid var(--border); border-radius: 8px;
      font-family: inherit; font-size: 0.9rem; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-field input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
    .form-field input:required { border-left-width: 4px; border-left-color: #dc2626; }
    .form-field input:user-valid   { border-color: #16a34a; }
    .form-field input:user-invalid { border-color: #dc2626; background: #fff5f5; }
    .form-field input:disabled { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; }
    .form-field input:read-only { background: #f8fafc; color: var(--muted); border-style: dashed; }
    .form-field .field-note { font-size: 0.72rem; color: var(--muted); }

    /* ============================================================
       LOGICAL PSEUDO-CLASSES
       ============================================================ */
    .logical-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .logical-card { background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; }
    .logical-card h3 { font-family: var(--mono); font-size: 0.9rem; color: var(--c-logic); margin-bottom: 0.5rem; }
    .logical-card p  { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
    .spec-pill { display: inline-block; background: #fef3c7; color: #92400e; font-size: 0.68rem; font-family: var(--mono); padding: 2px 8px; border-radius: 50px; margin-top: 6px; font-weight: 700; }

    /* ============================================================
       FOOTER
       ============================================================ */
    .site-footer { text-align: center; padding: 2rem; background: #1e293b; color: #64748b; font-size: 0.85rem; margin-top: 3rem; }
    .site-footer strong { color: #94a3b8; }

    /* ============================================================
       RESPONSIVE
       ============================================================ */
    @media (max-width: 640px) {
      .action-demo { flex-direction: column; }
      .ba-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>

<body>

  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header">
    <div class="tag">Chapter 29</div>
    <h1>Advanced CSS Selectors</h1>
    <p>Attribute Selectors · Pseudo-classes · Pseudo-elements · Live Demos</p>
  </header>

  <main id="main-content">

    <!-- ============================================================
         1. ATTRIBUTE SELECTORS
         ============================================================ -->
    <section class="demo-section" aria-labelledby="attr-heading">
      <h2 class="section-title" id="attr-heading">
        🔗 Attribute Selectors
        <span class="section-badge" style="background:rgba(124,58,237,0.1);color:var(--c-attr);">[attr^=] [attr$=] [attr*=]</span>
      </h2>

      <div class="demo-card">
        <div class="demo-card-head">Live link auto-styling — no extra classes needed</div>
        <div class="demo-card-body link-demo">
          <ul class="link-demo-list" aria-label="Link type examples">
            <li><a href="https://example.com" target="_blank">External HTTPS link (↗ + 🔒)</a></li>
            <li><a href="mailto:hello@example.com">Email link (✉ icon)</a></li>
            <li><a href="tel:+919876543210">Phone link (📞 icon)</a></li>
            <li><a href="/document.pdf">PDF document (label after)</a></li>
            <li><a href="/file.zip" download>Download link (⬇ icon)</a></li>
            <li><a href="/internal-page">Regular internal link</a></li>
          </ul>

          <div class="code" style="margin-top:1rem;"
><span class="cc">/* CSS — zero HTML changes */</span>
<span class="ck">a</span>[<span class="ca">href</span>^=<span class="cv">"https"</span>]<span class="cs">::before</span> { <span class="cs">content</span>: <span class="cv">'🔒 '</span>; }
<span class="ck">a</span>[<span class="ca">href</span>^=<span class="cv">"mailto:"</span>]<span class="cs">::before</span> { <span class="cs">content</span>: <span class="cv">'✉ '</span>; }
<span class="ck">a</span>[<span class="ca">href</span>$=<span class="cv">".pdf"</span>]<span class="cs">::after</span>   { <span class="cs">content</span>: <span class="cv">' (PDF)'</span>; }
<span class="ck">a</span>[<span class="ca">download</span>]<span class="cs">::before</span>           { <span class="cs">content</span>: <span class="cv">'⬇ '</span>; }
<span class="ck">a</span>[<span class="ca">target</span>=<span class="cv">"_blank"</span>]<span class="cs">::after</span>   { <span class="cs">content</span>: <span class="cv">' ↗'</span>; }</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         2. USER ACTION PSEUDO-CLASSES
         ============================================================ -->
    <section class="demo-section" aria-labelledby="action-heading">
      <h2 class="section-title" id="action-heading">
        🖱️ User Action Pseudo-classes
        <span class="section-badge" style="background:rgba(37,99,235,0.1);color:var(--c-action);">:hover :focus :active</span>
      </h2>

      <div class="demo-card">
        <div class="demo-card-head">Interactive — try hovering, clicking, and using Tab key</div>
        <div class="demo-card-body">
          <div class="action-demo">

            <button class="action-btn hover-demo" type="button">
              Hover Me (:hover)
            </button>

            <button class="action-btn active-demo" type="button">
              Click Me (:active)
            </button>

            <button class="action-btn focus-demo" type="button">
              Tab to Me (:focus-visible)
            </button>

            <button class="action-btn" type="button"
                    data-tooltip="This tooltip uses ::after + attr(data-tooltip)">
              Tooltip (:hover + ::after)
            </button>

          </div>

          <div class="code" style="margin-top:1rem;"
><span class="ck">.btn</span><span class="cs">:hover</span>        { <span class="ca">transform</span>: <span class="cv">translateY(-2px)</span>; }
<span class="ck">.btn</span><span class="cs">:active</span>       { <span class="ca">transform</span>: <span class="cv">translateY(1px)</span>; }
<span class="ck">.btn</span><span class="cs">:focus-visible</span> { <span class="ca">outline</span>: <span class="cv">3px solid #2563eb</span>; }
[<span class="ca">data-tooltip</span>]<span class="cs">::after</span> { <span class="ca">content</span>: <span class="cv">attr(data-tooltip)</span>; }</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         3. NTH-CHILD DEMO
         ============================================================ -->
    <section class="demo-section" aria-labelledby="nth-heading">
      <h2 class="section-title" id="nth-heading">
        🔢 Structural Pseudo-classes
        <span class="section-badge" style="background:rgba(22,163,74,0.1);color:var(--c-struct);">:nth-child :first :last</span>
      </h2>

      <div class="demo-card">
        <div class="demo-card-head">Visual demonstration of :nth-child patterns (10 items each)</div>
        <div class="demo-card-body">

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem;">

            <div>
              <p class="nth-label">:nth-child(even)</p>
              <div class="nth-grid nth-even" aria-label="Even items highlighted">
                <div class="nth-item">1</div><div class="nth-item">2</div>
                <div class="nth-item">3</div><div class="nth-item">4</div>
                <div class="nth-item">5</div><div class="nth-item">6</div>
                <div class="nth-item">7</div><div class="nth-item">8</div>
                <div class="nth-item">9</div><div class="nth-item">10</div>
              </div>
            </div>

            <div>
              <p class="nth-label">:nth-child(3n)</p>
              <div class="nth-grid nth-3n" aria-label="Every third item highlighted">
                <div class="nth-item">1</div><div class="nth-item">2</div>
                <div class="nth-item">3</div><div class="nth-item">4</div>
                <div class="nth-item">5</div><div class="nth-item">6</div>
                <div class="nth-item">7</div><div class="nth-item">8</div>
                <div class="nth-item">9</div><div class="nth-item">10</div>
              </div>
            </div>

            <div>
              <p class="nth-label">:nth-child(-n+3) — first 3</p>
              <div class="nth-grid nth-n3" aria-label="First 3 items highlighted">
                <div class="nth-item">1</div><div class="nth-item">2</div>
                <div class="nth-item">3</div><div class="nth-item">4</div>
                <div class="nth-item">5</div><div class="nth-item">6</div>
                <div class="nth-item">7</div><div class="nth-item">8</div>
                <div class="nth-item">9</div><div class="nth-item">10</div>
              </div>
            </div>

            <div>
              <p class="nth-label">:nth-child(n+4) — from 4th</p>
              <div class="nth-grid nth-from4" aria-label="Items from 4th onwards highlighted">
                <div class="nth-item">1</div><div class="nth-item">2</div>
                <div class="nth-item">3</div><div class="nth-item">4</div>
                <div class="nth-item">5</div><div class="nth-item">6</div>
                <div class="nth-item">7</div><div class="nth-item">8</div>
                <div class="nth-item">9</div><div class="nth-item">10</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         4. PSEUDO-ELEMENTS: ::BEFORE, ::AFTER, COUNTERS
         ============================================================ -->
    <section class="demo-section" aria-labelledby="pseudo-heading">
      <h2 class="section-title" id="pseudo-heading">
        ✨ Pseudo-elements
        <span class="section-badge" style="background:rgba(8,145,178,0.1);color:var(--c-pseudo);">::before ::after counter()</span>
      </h2>

      <!-- Counter demo -->
      <div class="demo-card" style="margin-bottom:1.25rem;">
        <div class="demo-card-head">CSS Counter with ::before — auto-numbered steps</div>
        <div class="demo-card-body">
          <ol class="counter-steps" style="list-style:none;" aria-label="Auto-numbered CSS steps">
            <li class="counter-step">
              <div><div class="counter-step-title">Install Node.js</div><div class="counter-step-desc">Download and install Node.js from nodejs.org</div></div>
            </li>
            <li class="counter-step">
              <div><div class="counter-step-title">Create Project</div><div class="counter-step-desc">Run <code>npm init</code> in your project folder</div></div>
            </li>
            <li class="counter-step">
              <div><div class="counter-step-title">Install Dependencies</div><div class="counter-step-desc">Run <code>npm install</code> to install packages</div></div>
            </li>
          </ol>
        </div>
      </div>

      <!-- Before/After examples -->
      <div class="demo-card">
        <div class="demo-card-head">::before and ::after live examples</div>
        <div class="demo-card-body">
          <div class="ba-grid">

            <div class="ba-demo-item">
              <div class="ba-label">::after — NEW badge</div>
              <p>Premium Plan <span class="demo-new">Features</span></p>
            </div>

            <div class="ba-demo-item">
              <div class="ba-label">::before — blockquote</div>
              <p class="demo-quote">Design is not just what it looks like. Design is how it works.</p>
            </div>

            <div class="ba-demo-item">
              <div class="ba-label">::after — animated underline (hover me)</div>
              <p><a href="#" class="demo-underline">Hover for animated underline</a></p>
            </div>

            <div class="ba-demo-item">
              <div class="ba-label">::first-letter — drop cap</div>
              <p class="demo-first-letter">Once upon a time in a land far away, there was a developer who loved CSS and built beautiful things.</p>
            </div>

          </div>

          <div class="code" style="margin-top:1rem;"
><span class="cc">/* CSS Counter */</span>
<span class="ck">ol</span> { <span class="ca">counter-reset</span>: <span class="cv">step</span>; }
<span class="ck">li</span> { <span class="ca">counter-increment</span>: <span class="cv">step</span>; }
<span class="ck">li</span><span class="cs">::before</span> { <span class="ca">content</span>: <span class="cv">counter(step)</span>; }

<span class="cc">/* attr() function */</span>
[<span class="ca">data-tooltip</span>]<span class="cs">::after</span> { <span class="ca">content</span>: <span class="cv">attr(data-tooltip)</span>; }

<span class="cc">/* First letter drop cap */</span>
<span class="ck">p</span><span class="cs">::first-letter</span> { <span class="ca">font-size</span>: <span class="cv">3.5rem</span>; <span class="ca">float</span>: <span class="cv">left</span>; }</div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         5. LOGICAL PSEUDO-CLASSES
         ============================================================ -->
    <section class="demo-section" aria-labelledby="logic-heading">
      <h2 class="section-title" id="logic-heading">
        🧠 Logical Pseudo-classes
        <span class="section-badge" style="background:rgba(217,119,6,0.1);color:var(--c-logic);">:not() :is() :where() :has()</span>
      </h2>

      <div class="logical-grid">

        <div class="logical-card">
          <h3>:not(selector)</h3>
          <p>Selects elements that do NOT match. Style all inputs except checkboxes, all links except nav links.</p>
          <div class="code" style="margin-top:0.75rem; font-size:0.72rem;"
>input<span class="cs">:not</span>([type=<span class="cv">"checkbox"</span>]) {
  width: <span class="cv">100%</span>;
}</div>
          <span class="spec-pill">Specificity = argument's</span>
        </div>

        <div class="logical-card">
          <h3>:is(sel1, sel2)</h3>
          <p>Matches any element in the list. Error-forgiving. Replaces long repetitive selector lists.</p>
          <div class="code" style="margin-top:0.75rem; font-size:0.72rem;"
><span class="cs">:is</span>(h1, h2, h3) {
  font-family: <span class="cv">'Inter'</span>;
}</div>
          <span class="spec-pill">Specificity = most specific arg</span>
        </div>

        <div class="logical-card">
          <h3>:where(sel1, sel2)</h3>
          <p>Identical to :is() but ZERO specificity. Perfect for base/reset styles that should be easily overridden.</p>
          <div class="code" style="margin-top:0.75rem; font-size:0.72rem;"
><span class="cs">:where</span>(ul, ol) {
  padding-left: <span class="cv">1.5rem</span>;
}</div>
          <span class="spec-pill">Specificity = always 0</span>
        </div>

        <div class="logical-card">
          <h3>:has(child)</h3>
          <p>Parent selector. Style a parent based on what it contains. Previously required JavaScript.</p>
          <div class="code" style="margin-top:0.75rem; font-size:0.72rem;"
>.card<span class="cs">:has</span>(img) {
  padding: <span class="cv">0</span>;
}</div>
          <span class="spec-pill">Chrome 105+ · Safari 15.4+</span>
        </div>

      </div>
    </section>

    <!-- ============================================================
         6. FORM PSEUDO-CLASSES
         ============================================================ -->
    <section class="demo-section" aria-labelledby="form-heading">
      <h2 class="section-title" id="form-heading">
        📋 Form Pseudo-classes
        <span class="section-badge" style="background:rgba(219,39,119,0.1);color:var(--c-form);">:valid :invalid :required :disabled</span>
      </h2>

      <div class="demo-card">
        <div class="demo-card-head">Type in the fields to see CSS validation states</div>
        <div class="demo-card-body">
          <form class="form-demo" novalidate aria-label="Form pseudo-classes demonstration">

            <div class="form-field">
              <label for="demo-email">Email (required, must be valid)</label>
              <input type="email" id="demo-email" name="email"
                     required placeholder="you@example.com" autocomplete="off">
              <span class="field-note">:required (red left border), :user-valid (green), :user-invalid (red)</span>
            </div>

            <div class="form-field">
              <label for="demo-age">Age (18–100 range)</label>
              <input type="number" id="demo-age" name="age"
                     min="18" max="100" placeholder="Enter 18-100">
              <span class="field-note">:in-range (green) / :out-of-range (red)</span>
            </div>

            <div class="form-field">
              <label for="demo-readonly">Read-only field</label>
              <input type="text" id="demo-readonly" value="USR-12345" readonly>
              <span class="field-note">:read-only (dashed border, gray text)</span>
            </div>

            <div class="form-field">
              <label for="demo-disabled">Disabled field</label>
              <input type="text" id="demo-disabled" value="Not editable" disabled>
              <span class="field-note">:disabled (opacity 0.5, not-allowed cursor)</span>
            </div>

            <!-- Number range visual -->
            <div class="form-field">
              <label for="demo-range">Quantity (1–10)</label>
              <input type="number" id="demo-range" min="1" max="10" placeholder="1-10"
                     style="width:120px;">
              <span class="field-note">Type > 10 or < 1 to see :out-of-range</span>
            </div>

          </form>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <p>
      <strong>Chapter 29: Advanced CSS Selectors</strong> —
      Attribute · Pseudo-classes · Pseudo-elements · Logical Selectors
    </p>
  </footer>

</body>
</html>
```

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 2912 Quick Revision

<a id="2912-quick-revision"></a>

### ⚡ Quick Revision

---

#### 🔷 Key Definitions

| Term | Definition |
|------|------------|
| **Attribute selector** | Targets elements by presence/value of HTML attributes: `[attr]`, `[attr=val]`, `[attr^=val]`, `[attr$=val]`, `[attr*=val]` |
| **Pseudo-class** | Targets existing elements in specific states: `:hover`, `:focus`, `:nth-child` |
| **Pseudo-element** | Creates virtual elements: `::before`, `::after`, `::first-line` |
| **`:hover`** | Element is being moused over |
| **`:focus`** | Element has keyboard/programmatic focus |
| **`:focus-visible`** | Focus only when keyboard navigation is used (not mouse click) |
| **`:focus-within`** | Parent element when ANY descendant has focus |
| **`:active`** | Element being clicked/pressed |
| **`:visited`** | Anchor link previously visited |
| **`:nth-child(An+B)`** | Positional selector; n=0,1,2...; counts ALL siblings |
| **`:nth-of-type`** | Like nth-child but counts only same-type siblings |
| **`:not()`** | Negation — matches elements NOT matching the argument |
| **`:is()`** | Matches ANY element in the list; takes most specific arg's specificity |
| **`:where()`** | Like `:is()` but always zero specificity |
| **`:has()`** | Parent selector — matches parent containing the described descendant |
| **`::before/::after`** | Generate virtual child elements; require `content` property |
| **`content`** | Property required for `::before`/`::after`; can use `attr()`, `counter()` |
| **`::selection`** | Styles user's text selection highlight |
| **`::placeholder`** | Styles input placeholder text |
| **`::marker`** | Styles list item bullet/number |
| **`counter-increment`** | Increments a CSS counter on each matching element |
| **`counter-reset`** | Initializes/resets a CSS counter |

---

#### 🔷 Important Facts

* **Attribute selectors specificity** = `(0,1,0)` — same as class selector
* **`^=`** = starts with; **`$=`** = ends with; **`*=`** = contains; **`~=`** = word in list; **`|=`** = equals or starts with value-
* **LVHA order**: Link → Visited → Hover → Active ("LoVe HAte")
* **Never `outline: none` without replacement** — accessibility violation
* **`:focus-visible`** — shows focus only for keyboard navigation, not mouse
* **`:nth-child` counts ALL siblings**; **`:nth-of-type` counts same-type only**
* **Formula `An+B`**: n starts at 0; `-n+3` = first 3; `n+4` = from 4th onwards
* **`:not()` specificity** = the argument's specificity (not zero)
* **`:is()` specificity** = most specific argument in the list
* **`:where()` specificity** = always zero, regardless of arguments
* **`:has()` is the "parent selector"** — Chrome 105+, Firefox 121+, Safari 15.4+
* **`::before` and `::after` REQUIRE `content` property** — even `content: ''` for structural use
* **`content: attr(data-x)`** — uses HTML attribute value as CSS content
* **`counter-increment`** + **`counter-reset`** = CSS automatic numbering
* **`::selection`** — limited properties: color, background-color, text-decoration
* **`:visited`** — limited properties: color, background-color, border colors (security)
* **`::first-letter` and `::first-line`** — only work on block-level elements

---

#### 🔷 Common Interview Traps

| Trap | Correct Answer |
|------|---------------|
| "Pseudo-classes and pseudo-elements are the same" | ❌ WRONG — pseudo-classes target states; pseudo-elements create virtual elements |
| ":before needs content" | ✅ TRUE — content property is required (even `''`) |
| "outline: none is fine for accessibility" | ❌ WRONG — keyboard users lose focus visibility; accessibility violation |
| ":nth-child and :nth-of-type are same" | ❌ WRONG — nth-child counts all siblings; nth-of-type counts same-type |
| ":is() and :where() work identically" | ❌ WRONG — :is() has specificity; :where() has zero |
| ":not() always has zero specificity" | ❌ WRONG — :not()'s argument contributes specificity |
| ":hover works on touch devices" | ❌ WRONG — touch devices have no hover state |
| "::before creates element in DOM" | ❌ WRONG — pseudo-elements exist only in rendering, not DOM |
| ":visited can change any property" | ❌ WRONG — only color, background-color, border-color, etc. |
| ":focus-visible same as :focus" | ❌ WRONG — :focus-visible only when keyboard nav; :focus always |

---

#### 🔷 Revision Bullets

* 🎯 **Attribute:** `[attr]` has it; `[attr="val"]` exact; `[attr^="val"]` starts; `[attr$="val"]` ends; `[attr*="val"]` contains
* 🎯 **LVHA order:** Link → Visited → Hover → Active (LoVe HAte mnemonic)
* 🎯 **`:focus-visible`** = keyboard focus only; **`:focus`** = always
* 🎯 **`:focus-within`** = parent gets styled when child is focused
* 🎯 **`:nth-child(2n)`** = even; **`:nth-child(2n+1)`** = odd; **`:nth-child(-n+3)`** = first 3
* 🎯 **`:not()`** specificity = argument's; **`:is()`** = most specific arg; **`:where()`** = zero
* 🎯 **`:has()`** = parent selector; Chrome/Firefox/Safari modern; revolutionary
* 🎯 **`::before`/`::after`** = require `content`; not in DOM; can be positioned
* 🎯 **`content: attr(data-x)`** = use HTML attribute as CSS content
* 🎯 **CSS counters:** `counter-reset` on parent; `counter-increment` on children; `content: counter(name)`
* 🎯 **`::selection`** = text highlight style; **`::placeholder`** = input placeholder; **`::marker`** = list bullet
* 🎯 **`:valid`/`:invalid`** = form validation states; use **`:user-invalid`** for better UX

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>

---

## 2913 Chapter Summary

<a id="2913-chapter-summary"></a>

### 📌 Chapter Summary

---

#### 🔷 Most Important Interview Points

1. **Pseudo-class vs Pseudo-element** — pseudo-classes (`:hover`, `:nth-child`) target existing elements in states. Pseudo-elements (`::before`, `::after`) create virtual elements. Double colon `::` for pseudo-elements.

2. **`::before` and `::after` require `content`** — Without the `content` property, these pseudo-elements don't render at all. Use `content: ''` for purely structural/decorative elements.

3. **Never remove `outline: none` without replacement** — This is an accessibility violation. Use `:focus-visible` for smart focus rings that show only during keyboard navigation.

4. **`:nth-child` vs `:nth-of-type`** — `:nth-child` counts ALL siblings then checks if element matches. `:nth-of-type` counts only same-type siblings. `p:nth-child(1)` may not match if 1st child is `<h2>`.

5. **`:not()`, `:is()`, `:where()` specificity** — `:not()` = argument's specificity. `:is()` = most specific argument. `:where()` = always zero. Use `:where()` for base styles, `:is()` for component styles.

6. **`:has()` is the parent selector** — Revolutionary. Previously impossible without JavaScript. `article:has(img)` styles article containing an image. Chrome 105+, Firefox 121+, Safari 15.4+.

7. **Attribute selectors don't need extra classes** — Use existing attributes: `[href^="https"]`, `[href$=".pdf"]`, `[disabled]`, `[required]`. Semantic, clean HTML with powerful CSS targeting.

8. **`content: attr()` for dynamic content** — `[data-tooltip]::after { content: attr(data-tooltip); }` creates tooltips from HTML data attributes. No JavaScript needed.

9. **CSS counters** — `counter-reset` on parent, `counter-increment` on children, `content: counter(name)` in `::before`. Auto-numbering without HTML changes or JavaScript.

10. **Form pseudo-classes for UX** — `:user-invalid` (preferred over `:invalid`) shows errors only after user interaction. `:required`, `:disabled`, `:checked`, `:placeholder-shown` enable rich form styling without JavaScript.

---

#### 🔷 Key Concepts Recap

| Category | Key Selectors | Main Use Case |
|----------|--------------|--------------|
| **Attribute** | `[attr^=]` `[attr$=]` `[attr*=]` | Auto-style links, forms by type |
| **Action** | `:hover` `:focus-visible` `:active` | Interactive UI states |
| **Structural** | `:nth-child` `:first-child` `:last-child` | Position-based styling |
| **Negation** | `:not()` | Exclude specific elements |
| **Logical** | `:is()` `:where()` `:has()` | Concise selectors, parent selection |
| **Form** | `:valid` `:invalid` `:checked` `:disabled` | Form state styling |
| **Generated** | `::before` `::after` + `content` | Decorative content, counters, tooltips |
| **Text** | `::first-letter` `::first-line` `::selection` | Typography effects |
| **Input** | `::placeholder` `::marker` | Input and list styling |

---

#### 🔷 What's Coming Next

Chapter 30 covers **CSS Cascade, Specificity, and Inheritance** in complete depth — the full algorithm browsers use to resolve CSS conflicts, including cascade layers (`@layer`), inheritance in detail, and the `initial`, `inherit`, `unset`, and `revert` keywords.

---

[⬅ Previous Chapter](#chapter-28-css-selectors) | [📖 Main Index](#main-index) | [Next Chapter ➡](#chapter-30-css-cascade-specificity-inheritance)

---

👉 <a href="#chapter-index-table-29">Go to Top 🔝</a>
# JavaScript Under the Hood (Part 1): From Source Code to the Call Stack

Every time you run a JavaScript program, a lot happens behind the scenes. Variables are allocated memory, execution contexts are created, functions are pushed onto the call stack, and the engine starts executing your code. But before we dive into all of that, let's first understand what JavaScript actually is and why it was created.

## An Introduction to JavaScript

### What is JavaScript?
- JavaScript is a programming language that was originally created in 1995 by Brendan Eich in just 10 days while he was working at Netscape.
- JavaScript is a high-level programming language primarily used to make web pages interactive. Today, it is also used to build servers, mobile applications, desktop software, and much more.

### Why was JavaScript created?
- JavaScript was created to make web pages **alive**. But what does "alive" mean? it means adding interactivity (e.g.,  animations, clickable buttons, popup menus, etc.) to the static web pages.
- Today, JavaScript isn't limited to browsers. With runtimes like Node.js, it can also be used to build backend applications and APIs, which allow you to add more functionality to a website.

> Did you know? When JavaScript was created, it initially had another name: “LiveScript”. 

### Where can JavaScript be used?
1. In your browser — every interactive website uses it (Facebook, YouTube, Gmail).
2. On servers — through Node.js, you can build backend APIs.
3. In mobile apps — using frameworks like React Native.
4. In desktop apps — VS Code itself is built using JavaScript (Electron).
5. In smart devices, games, robots, and much more.

Now that we know what JavaScript is, another question comes to mind: **How does JavaScript execute my code?** Before answering that, let's first understand **Who executes my code?**.
The answer is: **The JavaScript Engine**

## The JavaScript Engine

We already know what **JavaScript** is, but what exactly is this **engine**?

### The "Engine"
- A JavaScript engine is a piece of software responsible for executing JavaScript code. Every environment that runs JavaScript, whether it's a browser or Node.js, has its own JavaScript engine. 
- But this raises another question: **Why do we even need an engine?** 

### Why Do We Need a JavaScript Engine?
- JavaScript cannot execute code on its own. It needs an engine that understands JavaScript syntax and converts it into instructions the computer can execute. Every environment that runs JavaScript has its own engine. For example, Chrome and Node.js use V8, Firefox uses SpiderMonkey, and Safari uses JavaScriptCore.

### How Does the Engine Execute Code?
- Modern JavaScript engines process your code in three simple steps:
1. Parsing
2. Interpreting
3. Compiling

Together, these steps are part of a technique known as **Just-In-Time (JIT)** compilation, which helps JavaScript run quickly while remaining efficient.

```
┌─────────────────────────┐
│  JavaScript Source Code │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   JavaScript Engine     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Parses the Code       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Processes & Executes It │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Creates an Execution    │
│ Context                 │
└─────────────────────────┘
```

Now that we know who executes our code and how the engine processes it, let's look at what actually happens the moment JavaScript starts running our program. This is where the concept of an **Execution Context** comes in.

## Execution Context

Whenever JavaScript executes a program, it always runs inside an execution context.

### What is an Execution Context (EC)?
- An Execution Context is the **environment** in which a piece of JavaScript code is evaluated and executed. 
- Think of it as a sealed container that holds everything the code needs to run: its variables, functions, and the value of `this`.

```
┌──────────────────────┐
│   JavaScript Code    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Execution Context    │
├──────────────────────┤
│ • Variables          │
│ • Functions          │
│ • Memory             │
│ • this               │
└──────────────────────┘
```

### Why Do We Need an Execution Context (EC)?
- Let's look at an example:

```js
let greet = "Hello";
console.log(greet);
```
- We know that our code does not run as-is. The JavaScript Engine parses the code and then creates an execution context. The Execution context(EC) is necessary because it allocates memory for variables and functions before the code starts executing.
- So, in this example, the code isn't executed immediately. Before JavaScript starts running each line, the execution context first allocates memory for variables and functions.
- But how does JavaScript allocate memory before executing the code? Let's understand that by looking at the two phases of an execution context.

But before that comes the **types** of Execution Context.

### Types of Execution Context
1. **Global Execution Context (GEC)**
  - Whenever a JavaScript program starts executing, a Global Execution Context (GEC) is created.
  - A JavaScript program has only **one** Global Execution Context (GEC).
  - It is also known as the **Base Execution Context**.

2. **Function Execution Context (FEC)**
  - When we invoke (call) a function, a Function Execution Context gets created.
  - Each function call gets its own private context with its own variables.
  - When the function finishes, its FEC is destroyed. 
  - A Function Execution Context is created during the **Code Execution Phase** whenever a function is called.

### Phases of an Execution Context
This is one of the most important concepts in the whole topic. Every EC is built in two phases:

1. **Phase 1 — Memory Creation Phase**
Before any line runs, JS scans the code and sets up memory:
   - If there are any **variables** declared in the code, memory is allocated for the variable. The variables are set to **undefined** in this phase.
   - If there is a **function** declaration in the code, the entire function is stored in memory as-is. 
   - Also, in this phase, two special values become available:
     1. The global object (`window` in browsers).
     2. The global `this` value. 

2. **Phase 2 — Code Execution Phase**
The code execution starts in this phase.
  - Here, the real values are assigned to the global variables which were initially set **undefined** in Phase 1.
  - If there is a function call in the code, then it creates a Function Execution Context in this phase.
  - JavaScript waits until that function finishes executing before continuing with the remaining code.

### Examples 
```js
let username = "Vivek";

function greet() {
    let message = "Hello";
    console.log(message);
}

greet();

console.log(username);
```
- Now here's what happens:
 1. **Memory Creation Phase**
    - `username` => **undefined**
    - `greet` => full function stored.
    - `this` => set to `window` object.
 
 2. **Code Execution Phase**
    - `username` becomes **Vivek**
    - Then `greet()` is called => a new Function Execution Context is created
        - The new **Function Execution Context** has its own Memory Creation & Code Execution Phase:
           1. **Memory Creation Phase**
                - `message` => **undefined**

           2. **Code Execution Phase**     
              - **Hello** gets printed.

    - The FEC gets destroyed.
    - **Vivek** gets printed.

- Final Output: 
   - Hello
   - Vivek

```
┌──────────────────────────────────┐
│ Global Execution Context (GEC)   │
├──────────────────────────────────┤
│ • Memory Creation Phase          │
│ • Code Execution Phase           │
└───────────────┬──────────────────┘
                │
                │ greet()
                ▼
┌──────────────────────────────────┐
│ Function Execution Context (FEC) │
├──────────────────────────────────┤
│ • Memory Creation Phase          │
│ • Code Execution Phase           │
└───────────────┬──────────────────┘
                │
                │ Function ends
                ▼
        Return to the GEC
```

**Since memory is created before code executes, this leads us to one of JavaScript's most misunderstood concepts: Hoisting.**

## Hoisting

### What is Hoisting?
- Hoisting is JS's behaviour of **appearing** to move declarations of functions and variables to the top of their **scope**. 
- Important: nothing physically moves — this is just the **Creation Phase** allocating memory before the code runs.

### Why Does Hoisting Happen?
- In the Execution Context, memory is created before code executes. This leads to Hoisting.
- Let's take an example.
```js
console.log(name);
var name = "Vivek";
```

- The output of above code is **undefined**. But why? Suppose we use similar code in some other programming language. In that case, we may get an error saying the variable name is not declared, as we are trying to access it well before that.
- Let's visualize the **Global Execution Context** for the example which will give us more clarity:
  1. **Memory Creation Phase**
    - `name` => **undefined** 
  
  2. **Code Execution Phase**
    - `console.log(name)` => prints **undefined**
    - `name` => **Vivek**

- See what happened here in the **Code Execution Phase** the console.log() prints the value of `name` before it can even be assigned to its real value.

### Hoisting with var
- `var` declarations are hoisted and set to **undefined**.
- So you can access them before the line they're written on — you just get **undefined**, not an error.

```js
console.log(a); // undefined  (not an error!)
var a = 5;
console.log(a); // 5
```

### Hoisting with let & const
- `let` and `const` are hoisted too — but they are not initialized.
- From the start of their scope until the line where they are declared, they sit in the **Temporal Dead Zone (TDZ)**.
- So, accessing them before their declaration throws a **ReferenceError**.

```js
console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
const a = 5;

// OR

console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

### Temporal Dead Zone (TDZ)
- It is a specific region of a block scope where a variable exists but is completely inaccessible before its actual declaration line.
- Attempting to access, read, or write to a variable while it is trapped in the TDZ will immediately throw a **ReferenceError**.

- For this example, the **Global Execution Context (GEC)** is visualized below, showing the **Temporal Dead Zone (TDZ)**.
```js
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

```
┌────────────────────────────────────────────────────────────────────┐
│                   Global Execution Context (GEC)                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    |
│   Memory Creation Phase                                            │
│   ────────────────────────────────────────                         │
│   b  →  <uninitialized>   ← NOT undefined                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   Code Execution Phase                                             │
│   ────────────────────────────────────────                         │
│   console.log(b);                                                  │
│   ▲                                                                │
│   │                                                                │
│   │   [ERROR] Temporal Dead Zone (TDZ)                             │
│   │   Cannot access 'b' before initialization                      │
│   │                                                                │
│   let b = 10;   ← TDZ ends here                                    │
│                                                                    │
│   b = 10                                                           │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

> 💡 Remember
>
> Hoisting is not JavaScript moving your code.
> It's the result of the Memory Creation Phase, where memory is allocated before the Code Execution Phase begins.

## Call Stack

JavaScript can execute only one piece of code at a time. So whenever a function is called, JavaScript needs a way to remember where it currently is and which function should execute next. This is exactly what the **Call Stack** does.

### What is a Call Stack?
- The Call Stack is a data structure that tracks the execution of functions and keeps track of which function is currently running.
- It is a mechanism used by the JavaScript engine.
- It works on LIFO — Last In, First Out principle.

### Why Do We Need a Call Stack?
- Without the call stack, JavaScript would quickly break down for the following critical reasons:
1. Tracking where JavaScript currently is.
2. Executing functions in the correct order.

### How Does the Call Stack Work?
The Call Stack operates on a Last-In, First-Out (LIFO) principle. Think of it like a stack of books—the last book you put on top is the first one you must take off.

1. **Push**
   - When you call (invoke) a function => it gets added (pushed) to the top of the stack.

2. **Pop**
   - When a function returns / finishes => JavaScript removes (pops) it off the top of the stack.

### Call Stack Example
```js
function one() {
    console.log("One");
}

function two() {
    one();
    console.log("Two");
}

function three() {
    two();
    console.log("Three");
}

three();
```

**Step-by-step stack movement:**

| Step | Action | Stack (top → bottom) |
|------|--------|----------------------|
| 1 | `three()` called | three → GEC |
| 2 | `two()` called inside three | two → three → GEC |
| 3 | `one()` called inside two | one → two → three → GEC |
| 4 | `one()` finishes → prints | (pops one) two → three → GEC |
| 5 | `two()` finishes → prints | (pops two) three → GEC |
| 6 | `three()` finishes → prints | (pops three) GEC |

**Visualization**

**1. Initial Call Stack**
```
┌──────────────┐
│     GEC      │
└──────────────┘
```

**2. `three()` called**
```
┌──────────────┐
│    three()   │
├──────────────┤
│     GEC      │
└──────────────┘
```

**3. `two()` called**
```
┌──────────────┐
│    two()     │
├──────────────┤
│    three()   │
├──────────────┤
│     GEC      │
└──────────────┘
```

**4. `one()` called**
```
┌──────────────┐
│    one()     │
├──────────────┤
│    two()     │
├──────────────┤
│    three()   │
├──────────────┤
│     GEC      │
└──────────────┘
```

**5. `one()` finishes**
```
┌──────────────┐
│    two()     │
├──────────────┤
│    three()   │
├──────────────┤
│     GEC      │
└──────────────┘
```

**6. `two()` finishes**
```
┌──────────────┐
│    three()   │
├──────────────┤
│     GEC      │
└──────────────┘
```

**7. `three()` finishes**
```
┌──────────────┐
│     GEC      │
└──────────────┘
```

- **Output order:**
  - One
  - Two
  - Three

### Stack Overflow
- Since memory is finite, the Call Stack has a size limit.
- If functions keep getting pushed without ever popping (usually infinite recursion), the stack runs out of space and the engine throws:
```js
function loop() {
  loop(); // calls itself forever, never returns
}
loop(); // ❌ RangeError: Maximum call stack size exceeded
```
- Every recursive function must have a base case that stops the recursion, otherwise → stack overflow.

> 💡 Remember
>
> The Call Stack doesn't run your code — it just tracks *where* the engine currently is. LIFO in, LIFO out.

## Putting It All Together
- Now rather than introducing any new concept Let's solve an example for better clarity.

**1. Code**
```js
let username = "Vivek";

function greet() {
    console.log("Hello");
}

greet();

console.log(username);
```

**2. Execution Flow**
```
JavaScript Source Code
          │
          ▼
┌──────────────────────┐
│ JavaScript Engine    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Global Execution     │
│ Context Created      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Memory Creation      │
│ Phase                │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Code Execution       │
│ Phase                │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Function Call        │
│ greet()              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Function Execution   │
│ Context              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Console Output       │
│ Hello                │
│ Vivek                │
└──────────────────────┘
```

**3. Global Execution Context**
```
┌────────────────────────────────────────────┐
│ Global Execution Context                   │
├────────────────────────────────────────────┤
│ Memory Creation Phase                      │
├────────────────────────────────────────────┤
│ username → undefined                       │
│ greet    → Entire Function Stored          │
│ this     → window                          │
├────────────────────────────────────────────┤
│ Code Execution Phase                       │
├────────────────────────────────────────────┤
│ username = "Vivek"                         │
│ greet() ← Function Called                  │
│ console.log(username)                      │
└────────────────────────────────────────────┘
```

**4. Call Stack**
**1. Initial Call Stack**
```
┌──────────────┐
│     GEC      │
└──────────────┘
```
**2. `greet()` called**
```
┌──────────────┐
│   greet()    │
├──────────────┤
│     GEC      │
└──────────────┘
```
**3. `greet()` finishes**
```
┌──────────────┐
│     GEC      │
└──────────────┘
```

**5. Final Output**

```
Console

Hello
Vivek
```

## Final Summary (End the article with this)

- In this article, we followed the complete journey of a JavaScript program—from understanding what JavaScript is, to learning how the JavaScript Engine processes code, how an Execution Context is created, why Hoisting occurs, and finally how the Call Stack manages function execution.

- These concepts form the foundation of JavaScript. Once they become clear, understanding advanced topics like Closures, the Event Loop, Promises, and Async/Await becomes much easier.

- In the next part of this series, we'll dive deeper into how JavaScript handles asynchronous operations and explore the Event Loop in detail.
# An Introduction to JavaScript

Every time you run a JavaScript program, a lot happens behind the scenes. Variables are allocated memory, execution contexts are created, functions are pushed onto the call stack, and the engine starts executing your code. But before we dive into all of that, let's first understand what JavaScript actually is and why it was created.

## What is JavaScript?
- JavaScript is a programming language that was originally created in 1995 by Brendan Eich in just 10 days while he was working at Netscape.
- JavaScript is a high-level programming language primarily used to make web pages interactive. Today, it is also used to build servers, mobile applications, desktop software, and much more.

## Why was JavaScript created?
- JavaScript was created to make web pages **alive**. But what does "alive" mean? it means adding interactivity (e.g.,animations, clickable buttons, popup menus, etc.) to the static web pages.
- Today, JavaScript isn't limited to browsers. With runtimes like Node.js, it can also be used to build backend applications and APIs, which allow you to add more functionality to a website.

> Did you know? When JavaScript was created, it initially had another name: “LiveScript”. 

## Where can JavaScript be used?
1. In your browser — every interactive website uses it (Facebook, YouTube, Gmail).
2. On servers — through Node.js, you can build backend APIs.
3. In mobile apps — using frameworks like React Native.
4. In desktop apps — VS Code itself is built using JavaScript (Electron).
5. In smart devices, games, robots, and much more.

Now that we know what JavaScript is, another question comes to mind: **How does JavaScript execute my code?** Before answering that, let's first understand **Who executes my code?**.
The answer is: **The JavaScript Engine**

# The JavaScript Engine

We already know what **JavaScript** is, but what exactly is this **engine**?

## The "Engine"
- A JavaScript engine is a piece of software responsible for executing JavaScript code. Every environment that runs JavaScript, whether it's a browser or Node.js, has its own JavaScript engine. 
- But this raises another question: **Why do we even need an engine?** 

## Why Do We Need a JavaScript Engine?
- JavaScript cannot execute code on its own. It needs an engine that understands JavaScript syntax and converts it into instructions the computer can execute. Every environment that runs JavaScript has its own engine. For example, Chrome and Node.js use V8, Firefox uses SpiderMonkey, and Safari uses JavaScriptCore.

## How Does the Engine Execute Code?
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

# Execution Context

Whenever JavaScript executes a program, it always runs inside an execution context.

## What is an Execution Context (EC)?
- An Execution Context is the **environment** in which a piece of JavaScript code is evaluated and executed. 
- Think of it as a sealed container that holds everything the code needs to run: its variables, functions, and the value of **this**.

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

## Why Do We Need an Execution Context (EC)?
- Let's take an example:-

```js
let greet = "Hello";
console.log(greet);
```
- We know that our code does not run as-is. The JavaScript Engine parses the code and then creates an execution context. The Execution context(EC) is necessary because it allocates memory for variables and functions before the code starts executing.
- So, in this example, the code isn't executed immediately. Before JavaScript starts running each line, the execution context first allocates memory for variables and functions.
- But how does JavaScript allocate memory before executing the code? Let's understand that by looking at the two phases of an execution context.

But before that comes the **types** of Execution Context.

## Types of Execution Context
1. **Global Execution Context (GEC)**
  - Whenever a JavaScript program starts executing, a Global Execution Context (GEC) is created.
  - A JavaScript program has only **one** Global Execution Context (GEC).
  - It is also known as the **Base Execution Context**.

2. **Function Execution Context (FEC)**
  - When we invoke (call) a function, a Function Execution Context gets created.
  - Each function call gets its own private context with its own variables.
  - When the function finishes, its FEC is destroyed. 
  - A Function Execution Context is created during the **Code Execution Phase** whenever a function is called.

## Phases of an Execution Context
This is one of the most important concepts in the whole topic. Every EC is built in two phases:

1. **Phase 1 — Memory Creation Phase**
Before any line runs, JS scans the code and sets up memory:
   - If there are any **variables** declared in the code, memory is allocated for the variable. The variables are set to **undefined** in this phase.
   - If there is a **function** declaration in the code, the entire function is stored in memory as-is. 
   - Also, in this phase, two special values become available:
     1. The global object (**window** in browsers).
     2. The global **this** value. 

2. **Phase 2 — Code Execution Phase**
The code execution starts in this phase.
  - Here, the real values are assigned to the global variables which were initially set **undefined** in Phase 1.
  - If there is a function call in the code, then it creates a Function Execution Context in this phase.
  - JavaScript waits until that function finishes executing before continuing with the remaining code.

## Examples 
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
    - **username** => **undefined**
    - **greet** => full function stored.
    - **this** => set to **window** object.
 
 2. **Code Execution Phase**
    - **username** becomes **Vivek**
    - Then **greet()** is called => a new Function Execution Context is created
        - The new **Function Execution Context** has its own Memory Creation & Code Execution Phase:
           1. **Memory Creation Phase**
                - **message** => **undefined**

           2. **Code Execution Phase**     
              - **Hello** gets printed.

    - The FEC gets destroyed.
    - **Vivek** gets printed.

- Final Output: 
   - Hello
   - Vivek

```
Global Execution Context (GEC)
│
├── Memory Creation Phase
│
└── Code Execution Phase
         │
         ▼
   greet() is called
         │
         ▼
Function Execution Context (FEC)
│
├── Memory Creation Phase
│
└── Code Execution Phase
         │
         ▼
Return to GEC
```

**Since memory is created before code executes, this leads us to one of JavaScript's most misunderstood concepts: Hoisting.**
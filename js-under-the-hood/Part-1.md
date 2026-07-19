# An Introduction to JavaScript

Every time you run a JavaScript program, a lot happens behind the scenes. Variables are allocated memory, execution contexts are created, functions are pushed onto the call stack, and the engine starts executing your code. But before we dive into all of that, let's first understand what JavaScript actually is and why it was created.

## What is JavaScript?
- JavaScript is a programming language that was originally created in 1995 by Brendan Eich in just 10 days while he was working at Netscape.
- JavaScript is a high-level programming language primarily used to make web pages interactive. Today, it is also used to build servers, mobile applications, desktop software, and much more.

## Why was JavaScript created?
- JavaScript was created to make web pages **alive**. But what does "alive" means? it means adding interactivity(e.g.,aimations, clickable buttons, popup menus, etc.) to the static web pages.
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

Now that we know who executes our code and how the engine processes it, let's look at what actually happens the moment JavaScript starts running our program. This is where the concept of an **Execution Context** comes in.

# Execution Context

## What is an Execution Context?

2. Why Do We Need an Execution Context?

3. Types of Execution Context
   • Global Execution Context (GEC)
   • Function Execution Context (FEC)

4. Phases of an Execution Context
   • Memory Creation Phase
   • Code Execution Phase

5. Transition
   "Since memory is created before code executes, this leads us to one of JavaScript's most misunderstood concepts: Hoisting."
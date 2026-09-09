# Heading 1

## Heading 2

### Heading 3

**Bold**

*Italic*

- List
- List

1. First
2. Second

> Quote

`inline code`

```js
console.log("Hello");
```

![Image](image.png)

[MDN](https://developer.mozilla.org/)


I'd merge a few of the smaller sections like this:

Introduction — Authentication and Tokens
What is an Access Token?
What is a Refresh Token?
Access Token vs Refresh Token
The Complete Authentication Flow
Why Do Access Tokens Expire?
Where Should Tokens Be Stored?
JWT and Access Tokens
Security Considerations
What I Learned + Conclusion

Think of DSA like 3 levels of the same game:

🟢 Easy

Goal: Understand the pattern.

Read the question.
Think of brute force first.
Identify the obvious pattern/data structure.
Code it.
Check TC/SC.

If stuck for 15–20 min → see the hint/solution, understand it, close it, and code again yourself.

🟡 Medium

Goal: Combine patterns.

Understand the problem.
Think of brute force.
Ask: Can I optimize using HashMap, two pointers, sliding window, stack, binary search, etc.?
Try for 25–30 min.
If stuck → study the approach, then implement it yourself.
Revisit after a few days.
🔴 Hard

Goal: Learn advanced patterns.

Don't expect to solve most Hard problems initially.

Try for 30–45 min.
If completely stuck, study the solution.
Understand why the approach works.
Code it without looking.
Re-solve it later.
Your golden rule

Don't measure DSA progress by "how many I solved without help."

Measure it by:

Can I recognize the pattern and implement it myself after learning it?

For your current stage, I'd do roughly 70% Easy + 25% Medium + 5% Hard. Once your fundamentals become stronger, shift heavily toward Medium.


      int[] output = new int[nums.length];
        int prefix = 1;
        for(int i=0 ; i<nums.length; i++){
            output[i] = prefix;
            prefix += nums[i];
        }
        int suffix =1;
        
        return output;
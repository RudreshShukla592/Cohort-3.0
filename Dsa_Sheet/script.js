/* =========================================================
   DSA PROBLEM SET
   Curated ~87 problems, weighted by how often each pattern
   shows up in startup / product-focused interview rounds.
   Edit this array freely — id must stay unique per row.
========================================================= */
const problems = [
  // ---------- Arrays & Hashing (9) ----------
  { id: 1, name: "Two Sum", topic: "Arrays & Hashing", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum/" },
  { id: 2, name: "Contains Duplicate", topic: "Arrays & Hashing", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/contains-duplicate/" },
  { id: 3, name: "Valid Anagram", topic: "Arrays & Hashing", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-anagram/" },
  { id: 4, name: "Group Anagrams", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/group-anagrams/" },
  { id: 5, name: "Top K Frequent Elements", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { id: 6, name: "Product of Array Except Self", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: 7, name: "Longest Consecutive Sequence", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { id: 8, name: "Subarray Sum Equals K", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
  { id: 9, name: "Set Matrix Zeroes", topic: "Arrays & Hashing", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/set-matrix-zeroes/" },

  // ---------- Strings (6) ----------
  { id: 10, name: "Valid Palindrome", topic: "Strings", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-palindrome/" },
  { id: 11, name: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 12, name: "Longest Palindromic Substring", topic: "Strings", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: 13, name: "String to Integer (atoi)", topic: "Strings", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/string-to-integer-atoi/" },
  { id: 14, name: "Zigzag Conversion", topic: "Strings", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/zigzag-conversion/" },
  { id: 15, name: "Minimum Window Substring", topic: "Strings", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/minimum-window-substring/" },

  // ---------- Two Pointers (5) ----------
  { id: 16, name: "Two Sum II - Input Array Is Sorted", topic: "Two Pointers", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  { id: 17, name: "3Sum", topic: "Two Pointers", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/3sum/" },
  { id: 18, name: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/container-with-most-water/" },
  { id: 19, name: "Sort Colors", topic: "Two Pointers", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/sort-colors/" },
  { id: 20, name: "Trapping Rain Water", topic: "Two Pointers", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/trapping-rain-water/" },

  // ---------- Sliding Window (5) ----------
  { id: 21, name: "Best Time to Buy and Sell Stock", topic: "Sliding Window", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 22, name: "Longest Repeating Character Replacement", topic: "Sliding Window", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { id: 23, name: "Permutation in String", topic: "Sliding Window", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/permutation-in-string/" },
  { id: 24, name: "Fruit Into Baskets", topic: "Sliding Window", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/fruit-into-baskets/" },
  { id: 25, name: "Sliding Window Maximum", topic: "Sliding Window", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/sliding-window-maximum/" },

  // ---------- Binary Search (5) ----------
  { id: 26, name: "Binary Search", topic: "Binary Search", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/binary-search/" },
  { id: 27, name: "Search in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: 28, name: "Find Minimum in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: 29, name: "Koko Eating Bananas", topic: "Binary Search", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/koko-eating-bananas/" },
  { id: 30, name: "Median of Two Sorted Arrays", topic: "Binary Search", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },

  // ---------- Linked List (6) ----------
  { id: 31, name: "Reverse Linked List", topic: "Linked List", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: 32, name: "Merge Two Sorted Lists", topic: "Linked List", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 33, name: "Linked List Cycle", topic: "Linked List", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/linked-list-cycle/" },
  { id: 34, name: "Reorder List", topic: "Linked List", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/reorder-list/" },
  { id: 35, name: "Remove Nth Node From End of List", topic: "Linked List", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { id: 36, name: "Add Two Numbers", topic: "Linked List", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/add-two-numbers/" },

  // ---------- Stack / Queue (6) ----------
  { id: 37, name: "Valid Parentheses", topic: "Stack & Queue", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 38, name: "Next Greater Element I", topic: "Stack & Queue", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/next-greater-element-i/" },
  { id: 39, name: "Implement Queue using Stacks", topic: "Stack & Queue", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/implement-queue-using-stacks/" },
  { id: 40, name: "Min Stack", topic: "Stack & Queue", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/min-stack/" },
  { id: 41, name: "Evaluate Reverse Polish Notation", topic: "Stack & Queue", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: 42, name: "Daily Temperatures", topic: "Stack & Queue", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/daily-temperatures/" },

  // ---------- Recursion (3) ----------
  { id: 43, name: "Fibonacci Number", topic: "Recursion", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/fibonacci-number/" },
  { id: 44, name: "Pow(x, n)", topic: "Recursion", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/powx-n/" },
  { id: 45, name: "Generate Parentheses", topic: "Recursion", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/generate-parentheses/" },

  // ---------- Backtracking (4) ----------
  { id: 46, name: "Subsets", topic: "Backtracking", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/subsets/" },
  { id: 47, name: "Combination Sum", topic: "Backtracking", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/combination-sum/" },
  { id: 48, name: "Permutations", topic: "Backtracking", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/permutations/" },
  { id: 49, name: "Word Search", topic: "Backtracking", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/word-search/" },

  // ---------- Trees & BST (10) ----------
  { id: 50, name: "Invert Binary Tree", topic: "Trees & BST", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: 51, name: "Maximum Depth of Binary Tree", topic: "Trees & BST", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: 52, name: "Same Tree", topic: "Trees & BST", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/same-tree/" },
  { id: 53, name: "Subtree of Another Tree", topic: "Trees & BST", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { id: 54, name: "Binary Tree Level Order Traversal", topic: "Trees & BST", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: 55, name: "Validate Binary Search Tree", topic: "Trees & BST", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { id: 56, name: "Kth Smallest Element in a BST", topic: "Trees & BST", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { id: 57, name: "Lowest Common Ancestor of a BST", topic: "Trees & BST", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: 58, name: "Construct Binary Tree from Preorder and Inorder Traversal", topic: "Trees & BST", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { id: 59, name: "Binary Tree Maximum Path Sum", topic: "Trees & BST", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },

  // ---------- Heap (4) ----------
  { id: 60, name: "Last Stone Weight", topic: "Heap", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/last-stone-weight/" },
  { id: 61, name: "Kth Largest Element in an Array", topic: "Heap", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { id: 62, name: "Top K Frequent Words", topic: "Heap", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/top-k-frequent-words/" },
  { id: 63, name: "Find Median from Data Stream", topic: "Heap", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/find-median-from-data-stream/" },

  // ---------- Greedy (4) ----------
  { id: 64, name: "Maximum Subarray", topic: "Greedy", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/maximum-subarray/" },
  { id: 65, name: "Jump Game", topic: "Greedy", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/jump-game/" },
  { id: 66, name: "Gas Station", topic: "Greedy", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/gas-station/" },
  { id: 67, name: "Task Scheduler", topic: "Greedy", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/task-scheduler/" },

  // ---------- Graphs (6) ----------
  { id: 68, name: "Number of Islands", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-islands/" },
  { id: 69, name: "Clone Graph", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/clone-graph/" },
  { id: 70, name: "Course Schedule", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule/" },
  { id: 71, name: "Rotting Oranges", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/rotting-oranges/" },
  { id: 72, name: "Pacific Atlantic Water Flow", topic: "Graphs", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { id: 73, name: "Word Ladder", topic: "Graphs", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/word-ladder/" },

  // ---------- Dynamic Programming (8) ----------
  { id: 74, name: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/climbing-stairs/" },
  { id: 75, name: "House Robber", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/house-robber/" },
  { id: 76, name: "Coin Change", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/coin-change/" },
  { id: 77, name: "Longest Increasing Subsequence", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { id: 78, name: "Longest Common Subsequence", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-common-subsequence/" },
  { id: 79, name: "Word Break", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/word-break/" },
  { id: 80, name: "Unique Paths", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/unique-paths/" },
  { id: 81, name: "Partition Equal Subset Sum", topic: "Dynamic Programming", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/partition-equal-subset-sum/" },

  // ---------- Bit Manipulation (3) ----------
  { id: 82, name: "Single Number", topic: "Bit Manipulation", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/single-number/" },
  { id: 83, name: "Number of 1 Bits", topic: "Bit Manipulation", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-1-bits/" },
  { id: 84, name: "Counting Bits", topic: "Bit Manipulation", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/counting-bits/" },

  // ---------- Intervals (3) ----------
  { id: 85, name: "Merge Intervals", topic: "Intervals", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/merge-intervals/" },
  { id: 86, name: "Insert Interval", topic: "Intervals", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/insert-interval/" },
  { id: 87, name: "Non-overlapping Intervals", topic: "Intervals", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/non-overlapping-intervals/" },
];

/* =========================================================
   STATE
========================================================= */
const STORAGE_KEY = "dsa_tracker_progress_v1";
const TODAY_KEY = "dsa_tracker_today_v1";

let completed = loadProgress();
let state = {
  search: "",
  topic: "all",
  difficulty: "all",
  status: "all",
};

/* =========================================================
   PERSISTENCE
========================================================= */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    console.error("Could not read saved progress:", e);
    return new Set();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch (e) {
    console.error("Could not save progress:", e);
  }
}

function bumpTodayCount() {
  try {
    const today = new Date().toDateString();
    const raw = localStorage.getItem(TODAY_KEY);
    const data = raw ? JSON.parse(raw) : { date: today, count: 0 };
    if (data.date !== today) {
      data.date = today;
      data.count = 0;
    }
    data.count += 1;
    localStorage.setItem(TODAY_KEY, JSON.stringify(data));
    return data.count;
  } catch (e) {
    console.error("Could not update today count:", e);
    return 0;
  }
}

function getTodayCount() {
  try {
    const today = new Date().toDateString();
    const raw = localStorage.getItem(TODAY_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    return data.date === today ? data.count : 0;
  } catch (e) {
    return 0;
  }
}

/* =========================================================
   TOPIC LIST / FILTER OPTIONS
========================================================= */
function getTopics() {
  const order = [];
  problems.forEach(p => { if (!order.includes(p.topic)) order.push(p.topic); });
  return order;
}

function populateTopicFilter() {
  const select = document.getElementById("topicFilter");
  getTopics().forEach(topic => {
    const opt = document.createElement("option");
    opt.value = topic;
    opt.textContent = topic;
    select.appendChild(opt);
  });
}

function renderTopicRail() {
  const rail = document.getElementById("topicRail");
  rail.innerHTML = "";

  const allChip = makeChip("all", "All", problems.length);
  rail.appendChild(allChip);

  getTopics().forEach(topic => {
    const count = problems.filter(p => p.topic === topic).length;
    rail.appendChild(makeChip(topic, topic, count));
  });
}

function makeChip(value, label, count) {
  const chip = document.createElement("button");
  chip.className = "topic-chip" + (state.topic === value ? " active" : "");
  chip.innerHTML = `${label}<span class="chip-count">${count}</span>`;
  chip.addEventListener("click", () => {
    state.topic = value;
    document.getElementById("topicFilter").value = value;
    render();
  });
  return chip;
}

/* =========================================================
   FILTERING
========================================================= */
function getFilteredProblems() {
  return problems.filter(p => {
    if (state.search && !p.name.toLowerCase().includes(state.search.toLowerCase())) return false;
    if (state.topic !== "all" && p.topic !== state.topic) return false;
    if (state.difficulty !== "all" && p.difficulty !== state.difficulty) return false;
    if (state.status === "completed" && !completed.has(p.id)) return false;
    if (state.status === "pending" && completed.has(p.id)) return false;
    return true;
  });
}

/* =========================================================
   RENDER: LIST
========================================================= */
function renderList() {
  const listEl = document.getElementById("problemList");
  const emptyEl = document.getElementById("emptyState");
  const filtered = getFilteredProblems();

  listEl.innerHTML = "";

  if (filtered.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  const frag = document.createDocumentFragment();

  filtered.forEach(p => {
    const isDone = completed.has(p.id);

    const row = document.createElement("div");
    row.className = "problem-row" + (isDone ? " completed" : "");

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox" + (isDone ? " checked" : "");
    checkbox.setAttribute("role", "checkbox");
    checkbox.setAttribute("aria-checked", String(isDone));
    checkbox.setAttribute("tabindex", "0");
    checkbox.addEventListener("click", () => toggleComplete(p.id));
    checkbox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleComplete(p.id);
      }
    });

    const nameWrap = document.createElement("div");
    nameWrap.className = "prob-name";
    const link = document.createElement("a");
    link.href = p.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = p.name;
    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.textContent = "↗";
    nameWrap.appendChild(link);
    nameWrap.appendChild(arrow);

    const topicEl = document.createElement("div");
    topicEl.className = "prob-topic";
    topicEl.textContent = p.topic;

    const diffEl = document.createElement("div");
    const badge = document.createElement("span");
    badge.className = "diff-badge " + p.difficulty;
    badge.textContent = p.difficulty;
    diffEl.appendChild(badge);

    const platformEl = document.createElement("div");
    platformEl.className = "prob-platform";
    platformEl.textContent = p.platform;

    row.appendChild(checkbox);
    row.appendChild(nameWrap);
    row.appendChild(topicEl);
    row.appendChild(diffEl);
    row.appendChild(platformEl);

    frag.appendChild(row);
  });

  listEl.appendChild(frag);
}

function toggleComplete(id) {
  const wasCompleted = completed.has(id);
  if (wasCompleted) {
    completed.delete(id);
  } else {
    completed.add(id);
    bumpTodayCount();
  }
  saveProgress();
  render();
}

/* =========================================================
   RENDER: PROGRESS + STATS
========================================================= */
function renderProgress() {
  const total = problems.length;
  const done = completed.size;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById("completedCount").textContent = done;
  document.getElementById("totalCount").textContent = total;
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";

  ["Easy", "Medium", "Hard"].forEach(diff => {
    const all = problems.filter(p => p.difficulty === diff);
    const doneCount = all.filter(p => completed.has(p.id)).length;
    document.getElementById(diff.toLowerCase() + "Done").textContent = doneCount;
    document.getElementById(diff.toLowerCase() + "Total").textContent = all.length;
  });

  document.getElementById("todayCount").textContent = getTodayCount();
}

/* =========================================================
   MASTER RENDER
========================================================= */
function render() {
  renderTopicRail();
  renderList();
  renderProgress();
}

/* =========================================================
   EVENTS
========================================================= */
function setupEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderList();
  });

  document.getElementById("topicFilter").addEventListener("change", (e) => {
    state.topic = e.target.value;
    render();
  });

  document.getElementById("difficultyFilter").addEventListener("change", (e) => {
    state.difficulty = e.target.value;
    renderList();
  });

  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.status = btn.dataset.status;
      renderList();
    });
  });
}

/* =========================================================
   INIT
========================================================= */
function init() {
  populateTopicFilter();
  setupEvents();
  render();
}

document.addEventListener("DOMContentLoaded", init);
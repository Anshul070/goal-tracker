export interface TaskItem {
  n: string; // name
  d: string; // difficulty (Easy, Medium, Hard, Review, Reading, HLD, LLD, or "—")
  p: string; // pattern
}

export interface Day {
  day: string;
  items: TaskItem[];
}

export interface Week {
  num: number;
  title: string;
  intro: string;
  days: Day[];
  aiTitle: string;
  ai: string[];
  letbex: string[];
  resources: string[];
}

export interface Milestone {
  agentV1: string;
  agentV2: string;
  portfolioPiece: string;
}

export interface Level {
  xp: number;
  title: string;
  icon: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface RevisionItem {
  id: string;
  label: string;
  weekNum: number;
  addedAt: string;
  revisedAt?: string;
  status: "pending" | "revised";
}

export interface TaskFlat {
  id: string;
  weekNum: number;
  category: "dsa" | "ai" | "letbex";
  label: string;
  diff?: string;
  pattern?: string;
  day?: string;
  xp: number;
}

export const ROADMAP: Week[] = [
  { num: 1, title: "Arrays & Hashing",
    intro: "Foundation patterns: hashmaps for O(1) lookups, prefix sums, and Kadane's algorithm. Every problem reduces to 'can I avoid the nested loop with a hashmap or a single pass?'",
    days: [
      { day: "Monday", items: [{ n: "Two Sum", d: "Easy", p: "Hashing" }, { n: "Contains Duplicate", d: "Easy", p: "Hashing" }] },
      { day: "Tuesday", items: [{ n: "Valid Anagram", d: "Easy", p: "Hashing" }, { n: "Group Anagrams", d: "Medium", p: "Hashing" }] },
      { day: "Wednesday", items: [{ n: "Top K Frequent Elements", d: "Medium", p: "Hashing + Heap" }, { n: "Product of Array Except Self", d: "Medium", p: "Prefix/Suffix Product" }] },
      { day: "Thursday", items: [{ n: "Longest Consecutive Sequence", d: "Medium", p: "Hashing" }, { n: "Valid Sudoku", d: "Medium", p: "Hashing" }] },
      { day: "Friday", items: [{ n: "Best Time to Buy and Sell Stock", d: "Easy", p: "Single Pass" }, { n: "Maximum Subarray", d: "Medium", p: "Kadane's Algorithm" }] },
      { day: "Saturday", items: [{ n: "Subarray Sum Equals K", d: "Medium", p: "Prefix Sum + Hashing" }, { n: "Maximum Subarray (timed retry)", d: "Medium", p: "Kadane's Algorithm" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Two Sum + Group Anagrams from scratch, no notes", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Foundations (already complete)",
    ai: [
      "Deploy your streaming chat app to Vercel (vercel --prod) if not yet live.",
      "Push the repo to GitHub with a README explaining the system prompt toggle.",
      "Spend 30 min experimenting with temperature (0.2 vs 0.9) and note the difference — builds intuition for Week 5+.",
    ],
    letbex: [
      "10 Instagram DMs/day to the refined target profile (500-3,000 followers, no/bad website, photographers/coaches/consultants, Punjab/Haryana/NCR).",
      "Follow up with Vipul — get answers on pages/contact form/branding/style, then send a quote (₹8,000-₹15,000 based on scope).",
    ],
    resources: ["Striver's A2Z DSA Sheet — Arrays & Hashing", "NeetCode — Arrays & Hashing playlist (YouTube)"],
  },
  { num: 2, title: "Two Pointers & Sliding Window",
    intro: "Two pointers shrink O(n²) brute-force comparisons to O(n). Sliding window extends this to 'find the best contiguous subarray/substring' problems.",
    days: [
      { day: "Monday", items: [{ n: "Valid Palindrome", d: "Easy", p: "Two Pointers" }, { n: "Two Sum II (sorted array)", d: "Medium", p: "Two Pointers" }] },
      { day: "Tuesday", items: [{ n: "3Sum", d: "Medium", p: "Two Pointers + Sorting" }, { n: "Container With Most Water", d: "Medium", p: "Two Pointers" }] },
      { day: "Wednesday", items: [{ n: "Longest Substring Without Repeating Characters", d: "Medium", p: "Sliding Window" }, { n: "Longest Repeating Character Replacement", d: "Medium", p: "Sliding Window" }] },
      { day: "Thursday", items: [{ n: "Minimum Window Substring", d: "Hard", p: "Sliding Window" }, { n: "Find All Anagrams in a String", d: "Medium", p: "Sliding Window" }] },
      { day: "Friday", items: [{ n: "Permutation in String", d: "Medium", p: "Sliding Window" }, { n: "Max Consecutive Ones III", d: "Medium", p: "Sliding Window" }] },
      { day: "Saturday", items: [{ n: "Trapping Rain Water", d: "Hard", p: "Two Pointers" }, { n: "Sliding Window Maximum", d: "Hard", p: "Sliding Window + Deque" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Minimum Window Substring + Trapping Rain Water", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Embeddings & Vector Databases",
    ai: [
      "Learn what embeddings are and how cosine similarity measures semantic closeness.",
      "Set up a free Pinecone index OR enable pgvector on Supabase (pgvector is reusable for CenterX later).",
      "Embed 5-10 sample text snippets via the OpenAI/Google embeddings API, store them, and query for 'most similar' to a new snippet.",
      "Goal: be comfortable with the embed → store → query loop — foundation for next week's RAG project.",
    ],
    letbex: [
      "Continue 10 DMs/day — never let outreach drop to zero.",
      "If Vipul has responded with scope, send the formal quote and request 50% advance before starting.",
    ],
    resources: ["Pinecone — 'What are vector embeddings?' (YouTube, 10min)", "Supabase pgvector guide", "Striver's A2Z — Sliding Window & Two Pointers"],
  },
  { num: 3, title: "Binary Search",
    intro: "Binary search isn't just 'find element in sorted array' — it's 'search on the answer space' for optimization problems (Koko Eating Bananas, etc.).",
    days: [
      { day: "Monday", items: [{ n: "Binary Search", d: "Easy", p: "Classic Binary Search" }, { n: "Search Insert Position", d: "Easy", p: "Classic Binary Search" }] },
      { day: "Tuesday", items: [{ n: "Search a 2D Matrix", d: "Medium", p: "Binary Search on Grid" }, { n: "Find First and Last Position of Element in Sorted Array", d: "Medium", p: "Binary Search Boundaries" }] },
      { day: "Wednesday", items: [{ n: "Search in Rotated Sorted Array", d: "Medium", p: "Rotated Binary Search" }, { n: "Find Minimum in Rotated Sorted Array", d: "Medium", p: "Rotated Binary Search" }] },
      { day: "Thursday", items: [{ n: "Koko Eating Bananas", d: "Medium", p: "Binary Search on Answer" }, { n: "Time Based Key-Value Store", d: "Medium", p: "Binary Search + Design" }] },
      { day: "Friday", items: [{ n: "Find Peak Element", d: "Medium", p: "Binary Search on Answer" }, { n: "Capacity To Ship Packages Within D Days", d: "Medium", p: "Binary Search on Answer" }] },
      { day: "Saturday", items: [{ n: "Median of Two Sorted Arrays", d: "Hard", p: "Binary Search (partition)" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Search in Rotated Sorted Array + Koko Eating Bananas", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "RAG Pipeline Part 1 — 'Chat with your PDF'",
    ai: [
      "Learn document loaders and chunking strategies (fixed-size vs recursive vs semantic).",
      "Build the ingestion half: load a PDF (`pdf-parse`), split into chunks with LangChain.js text splitters, embed each chunk, store in your vector DB.",
      "By end of week: a script that takes any PDF and populates your vector store with searchable chunks.",
      "Use your resume PDF or the Letbex roadmap doc as test input — makes debugging more intuitive.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "If Vipul's project has started, keep outreach running in parallel — pipeline must never go to zero.",
    ],
    resources: ["LangChain.js RAG tutorial — document loaders", "Greg Kamradt's chunking strategy notebook (GitHub)", "Striver's A2Z — Binary Search"],
  },
  { num: 4, title: "Linked Lists",
    intro: "Linked list problems test pointer manipulation discipline — dummy nodes, fast/slow pointers, and in-place reversal. LRU Cache previews LLD interviews in Week 12.",
    days: [
      { day: "Monday", items: [{ n: "Reverse Linked List", d: "Easy", p: "In-place Reversal" }, { n: "Merge Two Sorted Lists", d: "Easy", p: "Two Pointers" }] },
      { day: "Tuesday", items: [{ n: "Reorder List", d: "Medium", p: "Fast/Slow + Reversal" }, { n: "Remove Nth Node From End of List", d: "Medium", p: "Fast/Slow Pointers" }] },
      { day: "Wednesday", items: [{ n: "Copy List with Random Pointer", d: "Medium", p: "Hashing + Linked List" }, { n: "Linked List Cycle", d: "Easy", p: "Floyd's Cycle Detection" }] },
      { day: "Thursday", items: [{ n: "Find the Duplicate Number", d: "Medium", p: "Floyd's Cycle Detection" }, { n: "Add Two Numbers", d: "Medium", p: "Linked List Simulation" }] },
      { day: "Friday", items: [{ n: "LRU Cache", d: "Medium", p: "Design + Hashmap + DLL" }] },
      { day: "Saturday", items: [{ n: "Merge k Sorted Lists", d: "Hard", p: "Divide & Conquer / Heap" }] },
      { day: "Sunday", items: [{ n: "Revision: redo LRU Cache + Merge k Sorted Lists from scratch", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "RAG Pipeline Part 2 — Query, Deploy & Test",
    ai: [
      "Build the retrieval half: embed the user question, retrieve top-K similar chunks, pass them as context to the LLM.",
      "Wire into a Next.js UI similar to Week 1's chat app (reuse most of that code — add the retrieval step before streamText).",
      "Deploy 'Chat with your PDF' to Vercel and test it with 3-5 real questions about the uploaded document.",
      "Push to GitHub with a README explaining the RAG architecture — this project is now portfolio-ready.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Build the second niche demo: a coach/consultant landing page — widens outreach beyond photographers.",
    ],
    resources: ["LangChain.js RAG tutorial — retrieval & generation", "Striver's A2Z — Linked Lists", "NeetCode — Linked List playlist"],
  },
  { num: 5, title: "Stacks & Queues + Agentic AI Begins",
    intro: "Lighter DSA week — only 6 problems — because this week's AI track (agentic AI, 1 of 3) is the highest-priority material in the entire plan. Don't let stacks eat into AI time.",
    days: [
      { day: "Monday", items: [{ n: "Valid Parentheses", d: "Easy", p: "Stack" }, { n: "Min Stack", d: "Medium", p: "Stack (Design)" }] },
      { day: "Tuesday", items: [{ n: "Evaluate Reverse Polish Notation", d: "Medium", p: "Stack" }, { n: "Generate Parentheses", d: "Medium", p: "Backtracking + Stack" }] },
      { day: "Wednesday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Daily Temperatures", d: "Medium", p: "Monotonic Stack" }] },
      { day: "Friday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Car Fleet", d: "Medium", p: "Monotonic Stack" }, { n: "Largest Rectangle in Histogram", d: "Hard", p: "Monotonic Stack" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Min Stack + Daily Temperatures from scratch", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Agentic AI 1/3 — Tool Use & ReAct",
    ai: [
      "Learn function calling / tool use with OpenAI/Anthropic API (or Vercel AI SDK's `tool()` helper).",
      "Learn the ReAct pattern: Reason → Act → Observe → repeat — the loop every agent runs.",
      "Build your first single-tool agent: give it ONE tool (calculator or weather lookup) and have it decide when to call it vs answer directly.",
      "Most important AI week in the entire plan — agentic AI is the highest-demand specialization in India for 2026. Don't rush it.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Send the coach/consultant demo (built last week) to 2-3 relevant prospects.",
    ],
    resources: ["OpenAI function calling guide", "'LangChain Agents explained' — Patrick Loeber (YouTube)", "Striver's A2Z — Stack & Queue"],
  },
  { num: 6, title: "Binary Trees & BST + Agentic AI Continues",
    intro: "Trees are mostly DFS/BFS template recognition. Once the traversal templates are drilled, the rest is variations on the same theme. Lighter DSA again to protect AI time.",
    days: [
      { day: "Monday", items: [{ n: "Invert Binary Tree", d: "Easy", p: "DFS" }, { n: "Maximum Depth of Binary Tree", d: "Easy", p: "DFS" }] },
      { day: "Tuesday", items: [{ n: "Diameter of Binary Tree", d: "Easy", p: "DFS" }, { n: "Balanced Binary Tree", d: "Easy", p: "DFS" }] },
      { day: "Wednesday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Binary Tree Level Order Traversal", d: "Medium", p: "BFS" }, { n: "Lowest Common Ancestor of a BST", d: "Medium", p: "BST Property" }] },
      { day: "Friday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Validate Binary Search Tree", d: "Medium", p: "DFS + BST Property" }, { n: "Kth Smallest Element in a BST", d: "Medium", p: "DFS (in-order)" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Validate BST + Level Order Traversal from scratch", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Agentic AI 2/3 — Multi-Tool Agents",
    ai: [
      "Extend last week's agent with multiple tools: a web search tool (Tavily, free tier) and a 'summarize text' tool.",
      "Implement the full agent loop: search → get results → summarize → return final answer, with the model choosing the order.",
      "Test with a genuinely open-ended question (e.g. 'What are the latest trends in X?') and observe how it plans tool calls.",
      "Keep a short log of what the agent does right and wrong — useful for Week 8's evals work.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "If you've landed a second client from the new demo, begin their project (50% advance first).",
    ],
    resources: ["Tavily API docs (free tier)", "Vercel AI SDK — tool calling + multi-step agents docs", "Striver's A2Z — Binary Tree"],
  },
  { num: 7, title: "Trees/Graphs Intro + Agentic AI Finishes",
    intro: "Transition from trees into graph traversal — Number of Islands and Clone Graph are the 'hello world' of graph BFS/DFS. Course Schedule introduces topological sort (recurs in Week 8).",
    days: [
      { day: "Monday", items: [{ n: "Binary Tree Right Side View", d: "Medium", p: "BFS" }, { n: "Construct Binary Tree from Preorder and Inorder Traversal", d: "Medium", p: "DFS + Recursion" }] },
      { day: "Tuesday", items: [{ n: "Number of Islands", d: "Medium", p: "Graph BFS/DFS" }, { n: "Clone Graph", d: "Medium", p: "Graph BFS/DFS + Hashing" }] },
      { day: "Wednesday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Course Schedule", d: "Medium", p: "Topological Sort" }, { n: "Pacific Atlantic Water Flow", d: "Medium", p: "Graph DFS (multi-source)" }] },
      { day: "Friday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Rotting Oranges", d: "Medium", p: "Multi-source BFS" }, { n: "Word Search", d: "Medium", p: "Backtracking + Grid DFS" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Number of Islands + Course Schedule from scratch", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Agentic AI 3/3 — Retries, Error Recovery & Deploy",
    ai: [
      "Add error handling: what happens if a tool call fails (e.g. search API times out)? Implement retry with backoff + fallback response.",
      "Add a max step count (hard cap, e.g. 5) with a graceful 'I couldn't complete this' message.",
      "Deploy 'Agent v1' to Vercel and write a README documenting tools, loop structure, and retries/limits.",
      "This deployed agent is now your flagship AI portfolio project for the rest of the plan.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Mid-plan check-in: review outreach numbers (messages sent, replies, demos sent, quotes given).",
    ],
    resources: ["Striver Graph Series — 50 problems (YouTube)", "Visualgo.net — visualize BFS/DFS", "Vercel AI SDK docs — error handling & retries"],
  },
  { num: 8, title: "Graphs Continued + AI Evals Begin",
    intro: "Heavier DSA week — Dijkstra's and topological sort variants are common at product companies. Alien Dictionary is a favorite at Adobe/Atlassian-tier interviews.",
    days: [
      { day: "Monday", items: [{ n: "Number of Connected Components in an Undirected Graph", d: "Medium", p: "Union Find / DFS" }, { n: "Course Schedule II", d: "Medium", p: "Topological Sort" }] },
      { day: "Tuesday", items: [{ n: "Surrounded Regions", d: "Medium", p: "Graph DFS (boundary)" }, { n: "Word Ladder", d: "Hard", p: "BFS (shortest path)" }] },
      { day: "Wednesday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Network Delay Time", d: "Medium", p: "Dijkstra's Algorithm" }, { n: "Min Cost to Connect All Points", d: "Medium", p: "MST (Prim's)" }] },
      { day: "Friday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Alien Dictionary", d: "Hard", p: "Topological Sort + Strings" }, { n: "Redundant Connection", d: "Medium", p: "Union Find" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Network Delay Time + Alien Dictionary from scratch", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Evals & Observability 1/2",
    ai: [
      "Set up promptfoo (open-source LLM eval framework) for your Agent v1.",
      "Write 8-10 test cases: realistic questions your agent should handle, with expected behaviors (e.g. 'should call search tool', 'should not hallucinate a source').",
      "Set up LangSmith (free tier) or a custom logging layer to trace every agent step — tool calls, inputs, outputs, latency.",
      "By end of week: run your eval suite and see a pass/fail report for your agent.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "If any project nears completion, request the testimonial + portfolio permission.",
    ],
    resources: ["promptfoo.dev — getting started", "LangSmith setup docs", "Striver's A2Z — Graph (Dijkstra + Union Find)"],
  },
  { num: 9, title: "Heaps & Priority Queues + AI Guardrails",
    intro: "Heaps power the 'Top K' and 'streaming median' problem families — Design Twitter ties heaps back to system design (you'll see this exact feed-ranking idea again in Week 12's HLD).",
    days: [
      { day: "Monday", items: [{ n: "Kth Largest Element in an Array", d: "Medium", p: "Heap (Quickselect alt.)" }, { n: "Last Stone Weight", d: "Easy", p: "Max Heap" }] },
      { day: "Tuesday", items: [{ n: "K Closest Points to Origin", d: "Medium", p: "Heap" }, { n: "Task Scheduler", d: "Medium", p: "Heap + Greedy" }] },
      { day: "Wednesday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Find Median from Data Stream", d: "Hard", p: "Two Heaps" }, { n: "Design Twitter", d: "Medium", p: "Heap + Hashing (Design)" }] },
      { day: "Friday", items: [{ n: "AI block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Merge k Sorted Lists (heap-based revisit)", d: "Hard", p: "Heap + K-way Merge" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Find Median from Data Stream + Task Scheduler", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Evals & Guardrails 2/2 — Agent v2",
    ai: [
      "Add rate limiting to your agent's API route (Upstash ratelimit — free tier).",
      "Add basic cost tracking: log token usage per request to estimate $ cost at scale.",
      "Fix any failing eval cases from Week 8 — iterate until your eval suite passes consistently.",
      "Deploy 'Agent v2' — evals + observability + rate limiting + guardrails = interview-ready. Update README describing v1→v2 changes.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Begin scoping the 'AI FAQ assistant' add-on for an existing/upcoming Letbex client — this is the Week 10-11 project.",
    ],
    resources: ["Upstash ratelimit docs", "Striver's A2Z — Heap", "NeetCode — Heap/Priority Queue playlist"],
  },
  { num: 10, title: "Dynamic Programming Intro + Letbex AI Feature",
    intro: "DP is pattern recognition over state transitions. Climbing Stairs and House Robber teach the 1D DP template; Longest Palindromic Substring and Coin Change extend it to strings and unbounded choices.",
    days: [
      { day: "Monday", items: [{ n: "Climbing Stairs", d: "Easy", p: "1D DP" }, { n: "House Robber", d: "Medium", p: "1D DP" }] },
      { day: "Tuesday", items: [{ n: "House Robber II", d: "Medium", p: "1D DP (circular)" }, { n: "Longest Palindromic Substring", d: "Medium", p: "2D DP / Expand from Center" }] },
      { day: "Wednesday", items: [{ n: "AI/Letbex block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Coin Change", d: "Medium", p: "Unbounded Knapsack" }, { n: "Maximum Product Subarray", d: "Medium", p: "1D DP" }] },
      { day: "Friday", items: [{ n: "AI/Letbex block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Longest Increasing Subsequence", d: "Medium", p: "1D DP" }, { n: "Word Break", d: "Medium", p: "1D DP + Hashing" }] },
      { day: "Sunday", items: [{ n: "Revision: redo Coin Change + Longest Increasing Subsequence", d: "Review", p: "Flashcards" }] },
    ],
    aiTitle: "Build the Client AI Feature",
    ai: [
      "Take your Agent v2 / RAG pipeline skills and build an 'AI FAQ Assistant' for a real Letbex client (Vipul or whichever is active).",
      "Embed the client's service info, pricing, and FAQs into your vector store (reuse Week 3-4 RAG pipeline).",
      "Build a simple chat widget the client can embed on their site — minimal UI, focus on reliability.",
      "Test it with 10+ realistic visitor questions before showing the client.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Present the AI FAQ assistant to the client as a premium add-on (₹3,000-5,000).",
    ],
    resources: ["Striver's A2Z — Dynamic Programming (1D DP)", "NeetCode — Dynamic Programming playlist"],
  },
  { num: 11, title: "DP/Greedy + Letbex AI Feature Finishes",
    intro: "Closing out DP with 2D problems (LCS, Unique Paths) and pivoting into Greedy (Jump Game, Gas Station) — Greedy proofs are about justifying 'why does the local choice work globally,' which interviewers probe directly.",
    days: [
      { day: "Monday", items: [{ n: "Longest Common Subsequence", d: "Medium", p: "2D DP" }, { n: "Partition Equal Subset Sum", d: "Medium", p: "0/1 Knapsack" }] },
      { day: "Tuesday", items: [{ n: "Unique Paths", d: "Medium", p: "2D DP" }, { n: "Decode Ways", d: "Medium", p: "1D DP" }] },
      { day: "Wednesday", items: [{ n: "AI/Letbex block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Thursday", items: [{ n: "Jump Game", d: "Medium", p: "Greedy" }, { n: "Gas Station", d: "Medium", p: "Greedy" }] },
      { day: "Friday", items: [{ n: "AI/Letbex block — no new DSA problem today", d: "—", p: "—" }] },
      { day: "Saturday", items: [{ n: "Merge Intervals", d: "Medium", p: "Greedy + Sorting" }, { n: "Non-overlapping Intervals", d: "Medium", p: "Greedy + Sorting" }] },
      { day: "Sunday", items: [{ n: "Begin System Design prep: read 'System Design Interview' (Alex Xu) Ch. 1-2", d: "Reading", p: "—" }] },
    ],
    aiTitle: "Finalize, Get Feedback, Write Case Study",
    ai: [
      "Polish the AI FAQ assistant based on client feedback from Week 10.",
      "Write a short case study for your portfolio: the problem, your RAG architecture, and real usage stats if possible.",
      "Add 'Built and deployed an agentic AI assistant' as a line item on your resume/portfolio with a link to the live project.",
      "By Sunday, both Agent v2 and the Letbex AI feature should be live and documented — your capstone AI deliverable.",
    ],
    letbex: [
      "10 DMs/day continues.",
      "Request a written testimonial for the AI feature specifically — 'AI-powered websites' becomes a new Letbex service line.",
    ],
    resources: ["Striver's A2Z — Greedy", "'System Design Interview' — Alex Xu, Vol 1 (Ch. 1-2)"],
  },
  { num: 12, title: "System Design (HLD + LLD) + Mock Interviews",
    intro: "No new DSA this week — pure system design and interview simulation. Each HLD design follows: Requirements → Scale estimates → API design → DB schema → Architecture → Bottlenecks → Deep dive.",
    days: [
      { day: "Monday", items: [{ n: "HLD: URL Shortener — full framework (requirements through deep dive)", d: "HLD", p: "Framework practice" }] },
      { day: "Tuesday", items: [{ n: "HLD: Rate Limiter — connect to Redis (used in CenterX)", d: "HLD", p: "Framework practice" }] },
      { day: "Wednesday", items: [{ n: "HLD: Twitter/Instagram Feed — connect to Week 9's heap-based feed ranking", d: "HLD", p: "Framework practice" }] },
      { day: "Thursday", items: [{ n: "HLD: WhatsApp / Chat System", d: "HLD", p: "Framework practice" }] },
      { day: "Friday", items: [{ n: "HLD: Uber / Ride Sharing", d: "HLD", p: "Framework practice" }] },
      { day: "Saturday", items: [{ n: "LLD: Parking Lot (SOLID principles, TS class modelling)", d: "LLD", p: "OOP Design" }, { n: "LLD: Library Management System", d: "LLD", p: "OOP Design" }] },
      { day: "Sunday", items: [{ n: "LLD: Splitwise or Amazon Cart/Orders + final review of all 12 weeks", d: "LLD", p: "OOP Design" }] },
    ],
    aiTitle: "Portfolio & Mock Interviews",
    ai: [
      "Schedule 4 mock interviews this week via Pramp or peers: 2 coding mocks (any week 1-11 DSA) + 2 system design mocks (HLD from this week).",
      "Final portfolio check: CenterX, Uniprint, YEUlink, WatchGuard, streaming chat app, RAG PDF app, Agent v2, and the Letbex AI feature should all be deployed and linked.",
      "Resume rewrite: ensure AI-fabricated metrics are removed/validated and new AI projects are added.",
      "End-of-plan reflection: revisit your roadmap doc and update the outreach log, income earned, and which phase of Path 1/Path 2 you're now in.",
    ],
    letbex: [
      "10 DMs/day continues — even during this heavy system-design week, per the #1 rule: pipeline must never go to zero.",
      "Update the Letbex outreach log with this week's numbers.",
    ],
    resources: ["'System Design Interview' — Alex Xu, Vol 1 (relevant chapters)", "Gaurav Sen — System Design playlist", "Pramp — free peer mock interviews"],
  },
];

export const MILESTONES: Milestone = {
  agentV1: "t-w7-ai2",
  agentV2: "t-w9-ai3",
  portfolioPiece: "t-w11-ai2",
};

export const XP_MAP: Record<string, number> = {
  Easy: 10,
  Medium: 15,
  Hard: 25,
  Review: 10,
  Reading: 10,
  HLD: 20,
  LLD: 20,
};

export const AI_XP = 20;
export const LB_XP = 15;

export const LEVELS: Level[] = [
  { xp: 0,    title: "Bootcamp Grad",        icon: "🌱" },
  { xp: 150,  title: "Array Slinger",        icon: "🔢" },
  { xp: 350,  title: "Pointer Wizard",       icon: "👉" },
  { xp: 600,  title: "Binary Search Sensei", icon: "🔍" },
  { xp: 900,  title: "List Untangler",       icon: "🔗" },
  { xp: 1250, title: "ReAct Apprentice",     icon: "🤖" },
  { xp: 1650, title: "Graph Whisperer",      icon: "🕸️" },
  { xp: 2000, title: "Agent Architect",      icon: "🛠️" },
  { xp: 2350, title: "Heap Lord",            icon: "⛰️" },
  { xp: 2700, title: "DP Tactician",         icon: "♟️" },
  { xp: 3070, title: "Staff Engineer",       icon: "🏆" },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first",      icon: "🎯", title: "First Commit",        desc: "Complete your first task." },
  { id: "week1",      icon: "🏁", title: "Week 1 Wrapped",      desc: "Finish every task in Week 1." },
  { id: "streak3",    icon: "🔥", title: "3-Day Streak",        desc: "Make progress 3 days in a row." },
  { id: "streak7",    icon: "🔥", title: "7-Day Streak",        desc: "Make progress 7 days in a row." },
  { id: "dsa25",      icon: "🧩", title: "25 Problems Solved",  desc: "Solve 25 DSA problems." },
  { id: "dsa50",      icon: "🧩", title: "50 Problems Solved",  desc: "Solve 50 DSA problems." },
  { id: "dsa90",      icon: "🧩", title: "90 Problems Solved",  desc: "Solve nearly every DSA problem in the plan." },
  { id: "agentv1",    icon: "🤖", title: "Agent v1 Deployed",   desc: "Ship your first agent with retries & error handling." },
  { id: "agentv2",    icon: "🚀", title: "Agent v2 Shipped",    desc: "Harden your agent with evals & guardrails." },
  { id: "portfolio",  icon: "📄", title: "Portfolio Piece Live",desc: "Add the AI assistant to your resume/portfolio." },
  { id: "sysdesign",  icon: "🏗️", title: "System Design Survivor", desc: "Complete all HLD + LLD designs in Week 12." },
  { id: "complete",   icon: "🏆", title: "12 Weeks Complete",   desc: "Finish the entire roadmap. You did it." },
];

export function xpForDsa(diff: string): number {
  return XP_MAP[diff] ?? 10;
}

export function buildTaskList(): TaskFlat[] {
  const tasks: TaskFlat[] = [];
  ROADMAP.forEach((w) => {
    w.days.forEach((d, di) => {
      d.items.forEach((it, ii) => {
        if (it.d === "—") return;
        tasks.push({
          id: `t-w${w.num}-d${di}-i${ii}`,
          weekNum: w.num,
          category: "dsa",
          label: it.n,
          diff: it.d,
          pattern: it.p,
          day: d.day,
          xp: xpForDsa(it.d),
        });
      });
    });
    w.ai.forEach((txt, i) => {
      tasks.push({
        id: `t-w${w.num}-ai${i}`,
        weekNum: w.num,
        category: "ai",
        label: txt,
        xp: AI_XP,
      });
    });
    w.letbex.forEach((txt, i) => {
      tasks.push({
        id: `t-w${w.num}-lb${i}`,
        weekNum: w.num,
        category: "letbex",
        label: txt,
        xp: LB_XP,
      });
    });
  });
  return tasks;
}

export const ALL_TASKS = buildTaskList();
export const TOTAL_XP = ALL_TASKS.reduce((s, t) => s + t.xp, 0);

export interface Stats {
  earnedXP: number;
  totalXP: number;
  doneCount: number;
  totalCount: number;
  dsaDone: number;
  dsaTotal: number;
  perWeek: Record<number, { total: number; done: number; totalXP: number; earnedXP: number }>;
  bestStreak: number;
  currentStreak: number;
  w12DsaTotal: number;
  w12DsaDone: number;
  overallPct: number;
}

export function computeStats(completed: Record<string, boolean>, activity: Record<string, number>): Stats {
  let earnedXP = 0;
  let doneCount = 0;
  let dsaDone = 0;
  let dsaTotal = 0;
  const perWeek: Record<number, { total: number; done: number; totalXP: number; earnedXP: number }> = {};
  ROADMAP.forEach((w) => {
    perWeek[w.num] = { total: 0, done: 0, totalXP: 0, earnedXP: 0 };
  });

  ALL_TASKS.forEach((t) => {
    perWeek[t.weekNum].total++;
    perWeek[t.weekNum].totalXP += t.xp;
    if (t.category === "dsa" && ["Easy", "Medium", "Hard"].includes(t.diff || "")) {
      dsaTotal++;
    }
    if (completed[t.id]) {
      earnedXP += t.xp;
      doneCount++;
      perWeek[t.weekNum].done++;
      perWeek[t.weekNum].earnedXP += t.xp;
      if (t.category === "dsa" && ["Easy", "Medium", "Hard"].includes(t.diff || "")) {
        dsaDone++;
      }
    }
  });

  // Streaks
  const activeDates = Object.keys(activity).filter((d) => activity[d] > 0).sort();
  let bestStreak = 0;
  let run = 0;
  let prev: string | null = null;

  activeDates.forEach((d) => {
    if (prev) {
      const prevDate = new Date(prev);
      const curDate = new Date(d);
      const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / 86400000);
      run = diffDays === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    if (run > bestStreak) {
      bestStreak = run;
    }
    prev = d;
  });

  // Current streak: consecutive days ending today or yesterday
  let currentStreak = 0;
  const today = new Date();
  for (let i = 0; i < 3000; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    if (activity[key] > 0) {
      currentStreak++;
    } else {
      if (i === 0) continue;
      else break;
    }
  }

  // Week 12 DSA completion (system design)
  const w12 = ROADMAP[11];
  let w12DsaTotal = 0;
  let w12DsaDone = 0;
  w12.days.forEach((d, di) =>
    d.items.forEach((it, ii) => {
      if (it.d === "—") return;
      w12DsaTotal++;
      if (completed[`t-w12-d${di}-i${ii}`]) {
        w12DsaDone++;
      }
    })
  );

  return {
    earnedXP,
    totalXP: TOTAL_XP,
    doneCount,
    totalCount: ALL_TASKS.length,
    dsaDone,
    dsaTotal,
    perWeek,
    bestStreak,
    currentStreak,
    w12DsaTotal,
    w12DsaDone,
    overallPct: ALL_TASKS.length ? (doneCount / ALL_TASKS.length) * 100 : 0,
  };
}

export function getLevel(xp: number) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) idx = i;
  }
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  const pct = next ? Math.min(100, ((xp - cur.xp) / (next.xp - cur.xp)) * 100) : 100;
  return { idx, cur, next, pct };
}

export function checkAchievements(stats: Stats, completed: Record<string, boolean>): Record<string, boolean> {
  return {
    first: stats.doneCount >= 1,
    week1: stats.perWeek[1].done === stats.perWeek[1].total,
    streak3: stats.bestStreak >= 3,
    streak7: stats.bestStreak >= 7,
    dsa25: stats.dsaDone >= 25,
    dsa50: stats.dsaDone >= 50,
    dsa90: stats.dsaDone >= 90,
    agentv1: !!completed[MILESTONES.agentV1],
    agentv2: !!completed[MILESTONES.agentV2],
    portfolio: !!completed[MILESTONES.portfolioPiece],
    sysdesign: stats.w12DsaDone === stats.w12DsaTotal && stats.w12DsaTotal > 0,
    complete: stats.overallPct >= 100,
  };
}

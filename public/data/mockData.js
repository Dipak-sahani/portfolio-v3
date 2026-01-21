// data/mockData.js
export const posts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content: "React Hooks have completely changed how we write React components. They allow us to use state and other React features without writing a class...",
    date: "2024-01-15",
    likes: 42,
    comments: 12
  },
  {
    id: 2,
    title: "Tailwind CSS Best Practices",
    content: "Tailwind CSS is a utility-first CSS framework that can help you build custom designs faster. Here are some best practices I've learned...",
    date: "2024-01-12",
    likes: 38,
    comments: 8
  },
  {
    id: 3,
    title: "Modern JavaScript Features You Should Know",
    content: "ES6+ brought many powerful features to JavaScript. Let's explore some of the most useful ones for modern web development...",
    date: "2024-01-10",
    likes: 56,
    comments: 15
  }
];

export const events = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Learn modern web development techniques and best practices",
    date: "2024-01-20",
    time: "2:00 PM - 5:00 PM",
    status: "upcoming",
    participants: 24
  },
  {
    id: 2,
    title: "React Conference 2024",
    description: "Annual React developers conference with industry experts",
    date: "2024-02-15",
    time: "9:00 AM - 6:00 PM",
    status: "upcoming",
    participants: 156
  },
  {
    id: 3,
    title: "Code Review Session",
    description: "Peer code review and feedback session",
    date: "2024-01-05",
    time: "4:00 PM - 6:00 PM",
    status: "past",
    participants: 18
  }
];

export const likedPosts = [
  {
    id: 1,
    title: "Introduction to GraphQL",
    author: "Jane Smith",
    authorAvatar: "👩",
    content: "GraphQL is a query language for APIs and a runtime for executing those queries with your existing data...",
    date: "2024-01-14",
    likes: 89
  },
  {
    id: 2,
    title: "Building RESTful APIs with Node.js",
    author: "Alex Johnson",
    authorAvatar: "👨",
    content: "Learn how to build robust and scalable REST APIs using Node.js and Express...",
    date: "2024-01-13",
    likes: 67
  }
];

export const comments = [
  {
    id: 1,
    postTitle: "Getting Started with React Hooks",
    content: "Great article! The examples really helped me understand the useState hook better.",
    date: "2024-01-16",
    likes: 5
  },
  {
    id: 2,
    postTitle: "Tailwind CSS Best Practices",
    content: "I've been using Tailwind for months but learned some new tricks from this post. Thanks!",
    date: "2024-01-13",
    likes: 3
  }
];

export const savedPosts = [
  {
    id: 1,
    title: "Complete Guide to CSS Grid",
    author: "Sarah Williams",
    content: "CSS Grid is a powerful layout system available in CSS. It's a 2-dimensional system...",
    date: "2024-01-18",
    views: 245,
    likes: 78
  },
  {
    id: 2,
    title: "TypeScript for React Developers",
    author: "Mike Chen",
    content: "TypeScript adds static typing to JavaScript, which can help catch errors early...",
    date: "2024-01-17",
    views: 189,
    likes: 64
  }
];
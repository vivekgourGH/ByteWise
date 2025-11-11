// EdTech Platform Data
export const courses = [
  {
    id: 1,
    title: "Complete React.js Bootcamp",
    instructor: "Dr. Sarah Wilson",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "12 weeks",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    students: 2340,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    description: "Master React.js from basics to advanced concepts including hooks, context, and modern patterns.",
    features: ["Live Sessions", "Projects", "Certificate", "Lifetime Access"],
    nextBatch: "2024-02-01",
    schedule: "Mon, Wed, Fri - 7:00 PM IST"
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "Intermediate",
    duration: "10 weeks",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    students: 1890,
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop",
    description: "Learn Python programming for data analysis, visualization, and machine learning.",
    features: ["Hands-on Projects", "Real Datasets", "Certificate", "Job Support"],
    nextBatch: "2024-01-25",
    schedule: "Tue, Thu, Sat - 8:00 PM IST"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    category: "Design",
    level: "Beginner",
    duration: "8 weeks",
    price: 249,
    originalPrice: 329,
    rating: 4.7,
    students: 1560,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    description: "Create stunning user interfaces and experiences with modern design principles.",
    features: ["Design Tools", "Portfolio Projects", "Mentorship", "Industry Insights"],
    nextBatch: "2024-02-05",
    schedule: "Mon, Wed - 6:30 PM IST"
  }
];

export const categories = [
  { id: 1, name: "Web Development", icon: "🌐", courses: 15 },
  { id: 2, name: "Data Science", icon: "📊", courses: 12 },
  { id: 3, name: "Design", icon: "🎨", courses: 8 },
  { id: 4, name: "Mobile Development", icon: "📱", courses: 10 }
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    role: "student",
    enrolledCourses: [1, 2],
    completedCourses: [],
    totalHours: 24
  }
];
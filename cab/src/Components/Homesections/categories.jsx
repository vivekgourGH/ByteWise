import React, { useState } from 'react';

const Categories = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleReadMoreToggle = (courseType) => {
    setExpandedCourse(prev => (prev === courseType ? null : courseType));
  };

  return (
    <section className="p-10 text-center text-black bg-gradient-to-br from-slate-50 to-purple-50">
      <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Choose Your Learning Path</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            type: "Web Development",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
            price: "From $299",
            description: "Master modern web development with React.js, Node.js, and full-stack technologies. Build real-world projects and get job-ready skills."
          },
          {
            type: "Data Science",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
            price: "From $349",
            description: "Learn Python, machine learning, and data analytics. Work with real datasets and build predictive models for business insights."
          },
          {
            type: "UI/UX Design",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
            price: "From $249",
            description: "Create beautiful and user-friendly designs. Master design tools, user research, and prototyping for modern applications."
          },
        ].map((course) => (
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105" key={course.type}>
            <div className="w-full aspect-[11/7] mb-4 overflow-hidden rounded-lg">
              <img
                src={course.image}
                alt={`${course.type} Course`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">{course.type}</h3>
            <p className="text-emerald-600 font-semibold">{course.price}</p>
            <button onClick={() => handleReadMoreToggle(course.type)} className="mt-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              {expandedCourse === course.type ? 'Read Less' : 'Read More'}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCourse === course.type ? 'max-h-40 opacity-100 pt-4' : 'max-h-0 opacity-0'
                }`}
            >
              <p className="text-sm text-slate-600 text-left">
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
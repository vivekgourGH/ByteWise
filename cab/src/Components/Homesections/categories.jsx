import React, { useState } from 'react';

const Categories = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleReadMoreToggle = (courseType) => {
    setExpandedCourse(prev => (prev === courseType ? null : courseType));
  };

  return (
    <section className="p-10 text-center text-black bg-gradient-to-br from-slate-50 to-purple-50">
      <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Pick Your Coding Adventure! 🎆</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            type: "Block Programming 🧩",
            image: "https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=300&h=200&fit=crop",
            price: "From ₹999",
            description: "Start coding with colorful blocks! Perfect for beginners aged 8-14. Create games, animations, and interactive stories without typing code.",
            ageGroup: "Ages 8-14"
          },
          {
            type: "Game Development 🎮",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop",
            price: "From ₹1299",
            description: "Build your own video games! Learn Python and JavaScript while creating fun games that you can play and share with friends.",
            ageGroup: "Ages 10-16"
          },
          {
            type: "Web Development 🌐",
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop",
            price: "From ₹1199",
            description: "Create your own websites! Learn HTML, CSS, and JavaScript to build cool websites that look amazing on phones and computers.",
            ageGroup: "Ages 12-17"
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
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg mb-2">
              <p className="text-sm font-medium text-purple-700">{course.ageGroup}</p>
            </div>
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
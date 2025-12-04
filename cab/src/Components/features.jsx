import React from 'react';
import { FaGraduationCap, FaUsers, FaCertificate, FaClock } from "react-icons/fa";

const Features = () => {
  const featuresData = [
    {
      title: "Kid-Friendly Teachers 👩‍🏫",
      desc: "Learn from amazing teachers who know how to make coding fun and easy for kids!",
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Fun & Interactive 🎮",
      desc: "Play games, build projects, and learn through exciting activities that keep you engaged!",
      icon: <FaGraduationCap className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Cool Certificates 🏆",
      desc: "Show off your coding skills with awesome certificates you can share with family and friends!",
      icon: <FaCertificate className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Learn Anytime ⏰",
      desc: "Study when it works for you! Weekend classes and flexible timing for busy students.",
      icon: <FaClock className="text-purple-600 text-4xl mb-4" />,
    },
  ];

  return (
    <section className="p-10 text-black bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-xl text-purple-600 font-semibold">WHY KIDS LOVE US ❤️</h2>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Coding Made Fun with ByteWise!</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-6 w-full max-w-6xl">
        {featuresData.map((item, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
            {item.icon}
            <h4 className="font-bold text-lg mb-2 text-slate-800">{item.title}</h4>
            <p className="text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
import React from 'react';
import { FaGraduationCap, FaUsers, FaCertificate, FaClock } from "react-icons/fa";

const Features = () => {
  const featuresData = [
    {
      title: "Expert Instructors",
      desc: "Learn from industry professionals with years of experience.",
      icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Interactive Learning",
      desc: "Engage with live sessions, projects, and hands-on exercises.",
      icon: <FaGraduationCap className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Industry Certificates",
      desc: "Get recognized certificates upon successful course completion.",
      icon: <FaCertificate className="text-purple-600 text-4xl mb-4" />,
    },
    {
      title: "Flexible Schedule",
      desc: "Learn at your own pace with lifetime access to course materials.",
      icon: <FaClock className="text-purple-600 text-4xl mb-4" />,
    },
  ];

  return (
    <section className="p-10 text-black bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-xl text-purple-600 font-semibold">WHY CHOOSE US</h2>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Learn Better With Bytwise</h3>
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
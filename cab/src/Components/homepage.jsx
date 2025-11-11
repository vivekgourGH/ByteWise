import React from "react";
import Landing from "./Homesections/landing.jsx";
import CourseBooking from "./Homesections/courseBooking.jsx";
import Categories from "./Homesections/categories.jsx";
import Features from "./features.jsx";
import Download from "./Homesections/download.jsx";
import Review from "./Homesections/review.jsx";
import Contact from "./Homesections/contact.jsx";
import Footer from "./footer.jsx";



const Homepage = () => {

  return (
    <div className="font-roboto text-gray-800">
      <Landing />
      <CourseBooking />
      <Categories />
      <Features />
      <Download />
      <Review />
      <Contact />
      <Footer />
    </div>
  );
};
 
export default Homepage;

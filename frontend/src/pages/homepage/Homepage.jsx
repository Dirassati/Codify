import './homepage.css'
import React from "react";
import Navbar from "./Navbar";
import Second from "./Second/Second";
import Third from "./Third/Third";
import Teachers from "./Teachers/Teachers";
import Testimonials from "./Testimonials/Testimonials";
import FAQSection from "./FAQ/FAQSection";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Second />
            <Third />
            <Teachers />
            <Testimonials />
            <FAQSection />
            <Footer />
    </>
  );
};

export default Homepage;
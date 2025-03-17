import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Testimonials.css";
import Profile from '../../../assets/images/Profile.png'

const testimonials = [
  {
    name: "Jennifer B",
    text: "Little Learners Academy has been a second home for my child. The caring staff and engaging programs have made her excited to go to school every day!",
    avatar: Profile,
  },
  {
    name: "David K",
    text: "Choosing Little Learners Academy for my daughter was the best decision. She has thrived in their nurturing and stimulating environment.",
    avatar: Profile,
  },
  {
    name: "Emily L",
    text: "My son's social and academic growth has been remarkable since joining Little Learners Academy. I am grateful for the supportive and dedicated teachers.",
    avatar: Profile,
  },
  {
    name: "Michael R",
    text: "An excellent learning environment that fosters both academic and emotional growth for children! Highly recommend.",
    avatar: Profile,
  },
  {
    name: "Sophia M",
    text: "The teachers here are incredibly dedicated and have helped my child excel in ways I never imagined!",
    avatar: Profile,
  },
  {
    name: "Chris T",
    text: "A wonderful experience for our family! The school offers great activities and an engaging curriculum.",
    avatar: Profile,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 3) % total);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 3 + total) % total);
  };

  return (
    <div className="testimonials-container">
      <div className="titles">
        <h2>Our Testimonials</h2>
        <p>Our testimonials are heartfelt reflections of the nurturing environment we provide.</p>
      </div>
      <div className="slider">
        <button className="nav-btn left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <div className="cards">
          {testimonials.slice(index, index + 3).map((testimonial, i) => (
            <div className="card" key={i}>
              <div className="avatar">
                <img src={testimonial.avatar} alt="User Avatar" />
              </div>
              <h3>{testimonial.name}</h3>
              <h5 className="stars">⭐⭐⭐⭐⭐</h5>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
        <button className="nav-btn right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

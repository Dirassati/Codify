import { useState } from "react";
import "./FAQSection.css";

const faqs = [
  {
    question: "What are the school hours at Little Learners Academy?",
    answer:
      "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. We also offer extended care options for parents who need early drop-off or late pick-up.",
  },
  {
    question: "How do you handle food allergies and dietary restrictions?",
    answer: "We take allergies seriously and provide special meal plans upon request.",
  },
  {
    question: "What is the teacher-to-student ratio at Little Learners Academy?",
    answer: "We maintain a low teacher-to-student ratio to ensure personalized attention.",
  },
  {
    question: "How do you handle discipline and behavior management?",
    answer: "We use positive reinforcement and structured discipline strategies.",
  },
  {
    question: "Is there a uniform policy for students?",
    answer: "Yes, students are required to wear the school uniform.",
  },
  {
    question: "What extracurricular activities are available for students?",
    answer: "We offer a variety of activities including sports, arts, and music clubs.",
  },
  {
    question: "How do I apply for admission to Little Learners Academy?",
    answer: "You can apply through our website or visit the admission office for assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <p className="faq-subtitle">
        Find all the essential information you need in our FAQ section, designed to address the most frequently asked questions and help you make informed decisions for your child's education.
      </p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
             <h1> {faq.question}</h1>
              <span className="toggle-icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <div className="line"></div>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
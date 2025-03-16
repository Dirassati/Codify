import React from "react";
import './Footer.css';


export default function Footer(){
    
    return (
        <footer className="footer">
        <div className="container_footer">
          <div className="section">
            <h3 className="title_footer">Company Info</h3>
            <ul className="list">
              <li><a href="/about" className="link">About Us</a></li>
              <li><a href="/carrier" className="link">Carrier</a></li>
              <li><a href="/hiring" className="link">We are hiring</a></li>
              <li><a href="/blog" className="link">Blog</a></li>
            </ul>
          </div>
          <div className="section">
    <h3 className="title_footer">Get In Touch</h3>
    <p><span className="icon">📞</span> <a href="tel:+14805550103" className="link">(480) 555-0103</a></p>
    <p><span className="icon">📍</span> <a href="https://www.google.com/maps?q=Your+Address" className="link" id="address">4517 Washington Ave. Manchester, Kentucky 39495</a></p>
    <p><span className="icon">✉️</span> <a href="mailto:debra.holt@example.com" className="link">debra.holt@example.com</a></p>
</div>

        </div>
      </footer>
    )
}
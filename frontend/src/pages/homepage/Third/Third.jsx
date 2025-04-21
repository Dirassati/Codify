import React from "react";
import "./Third.css";

export default function Third() {
  return (
    <div>
      
      <div className="all">
        <div className="first">
          <h1>15K</h1>
          <h5>Happy Customers</h5>
        </div>
        <div className="second">
          <h1>150K</h1>
          <h5>Successful Graduates</h5>
        </div>
        <div className="third">
          <h1>30</h1>
          <h5>Extracurricular Activities</h5>
        </div>
        <div className="fourth">
          <h1>100+</h1>
          <h5>Top Partners</h5>
        </div>
      </div>

            <div className="video-section">
        <div className="text-content">
          <div className="red-line"></div>
          <h2>Video in Live Action</h2>
          <p>
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
          <a href="#" className="learn-more">
            Learn More &gt;
          </a>
        </div>
        <div className="video-container">
          <img 
            src="https://s3-alpha-sig.figma.com/img/2f77/69f2/b2709839fa21c3c892b792dca24f25b4?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UJ3qMBr79tr3AT7Ijnwsl5l7GZGi5SeSYXvBsUJ~N4Xl1pujftU~ld3drsPNu-pp4RzPMjwFDBo0dn~-2mT1i0GRiwvD~UlXhWFcGmxiVnsQcnUPR~AkBTwaxaQw5cr6RdSbJdjxo38bEtWai~52vXHTchO85X8RD8I~ma0mvrz5QjdCZH9XY3kIXuTwtfwjnOfZR7KTl8XhEl5WVy0chSpCFuejzlNrHizhaPh-mieXPT-nbL3RDdrit2SpdiYuGDlfkzDU-oEeV-Sd2-qL57hdbZI6KByhEGPkp44D7vK9h~SRA0kFXFHdS50LSRTRrEd-6WGLp5iyu-zRv~VDXw__" 
            alt="Video" 
            className="video-thumbnail" 
          />
          <div className="play-button">
            <span className="play-icon">&#9654;</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

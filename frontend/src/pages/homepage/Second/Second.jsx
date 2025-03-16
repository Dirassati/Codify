
import React from "react";
import "./Second.css";
import chapeau from './chapeau.png';
import book from './book.png';
import clock from './clock.png';


export default function Second(){


return (
    <div className="body">
    <div className="container">

<div className="droit">
    <div className="textes">
    <h1>25K+ STUDENTS <br /> TRUST US</h1>
    <h4>Every day brings with it a fresh set of learning <br /> possibilities.</h4>
    </div>
   <div className="buttons">
    <button className="Get">Get Quote Now</button>
    <button className="Learn">Learn More</button>
   </div>

</div>
<div className="gauch">

</div>
    </div>
    <div className="boxe">
        <div className="boxes">
    <div className="text">
        <div className="circle"><img src={chapeau} alt="" /></div>
        
        <h3>Expert instruction</h3>
    </div>
    <div className="line"></div>
    <div>
        
        <p>The gradual accumulation of 
information about atomic and 
small-scale behaviour...</p>
    </div>
</div>
<div className="boxes">
    <div className="text">
        <div className="circle"><img src={clock} alt="" /></div>
        
        <h3>Expert instruction</h3>
    </div>
    <div className="line"></div>
    <div>
        
        <p>The gradual accumulation of 
information about atomic and 
small-scale behaviour...</p>
    </div>
</div>
<div className="boxes">
    <div className="text">
        <div className="circle"><img src={book} alt="" /></div>
        
        <h3>Expert instruction</h3>
    </div>
    <div className="line"></div>
    <div>
        
        <p>The gradual accumulation of 
information about atomic and 
small-scale behaviour...</p>
    </div>
</div>
</div>
</div>
)

}
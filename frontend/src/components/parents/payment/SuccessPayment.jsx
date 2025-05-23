import Sidebar from './Sidebar';
import Header from './Header';
import './SuccessPayment.css';

const SuccessPayment = () => {
  const orderNumber = '123RGR231567Y'; // Hardcoded as per the image; you can pass this via navigation state if needed

  return (
    <div className="success-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="success-container">
          <div className="confirmation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h2>Order #{orderNumber} Confirmed</h2>
            <button className="generate-receipt-btn">Generate Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
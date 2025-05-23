import Sidebar from './Sidebar';
import Header from './Header';
import './PaymentSummary.css';
import { useNavigate } from 'react-router-dom';

  


const PaymentSummary = () => {
    const navigate = useNavigate();

  const handleConfirmPayment = () => {
    navigate('/payment/summary/Success');
  };
  return (
    <div className="payment-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="payment-summary-container">
          <div className="payment-details">
            <h2 className="title">Payment</h2>

            <div className="pay-with">
              <span>Pay With:</span>
              <label className="radio-label">
                <input type="radio" name="method" defaultChecked />
                <span className="radio-custom"></span>
                Card
              </label>
            </div>

            <p className="pin-instruction">Enter your 4-digit card pin to confirm this payment</p>
            <div className="pin-inputs">
              <input type="password" maxLength="1" />
              <input type="password" maxLength="1" />
              <input type="password" maxLength="1" />
              <input type="password" maxLength="1" />
            </div>

            <button className="confirm-btn" onClick={handleConfirmPayment}>Confirm Payment</button>
            <p className="privacy-text">
              Your personal data will be used to process your order, support your experience throughout this website,
              and for other purposes described in our privacy policy.
            </p>
          </div>

          <div className="payment-summary-box">
            <button className="place-order-btn">Place Order</button>
            <p className="agreement-text">
              By placing your order, you agree to our school <strong>Privacy policy</strong> and
              <strong> Conditions of use</strong>.
            </p>
            <hr />
            <div className="fee-line"><span>Study fees</span><span>245176 DA</span></div>
            <div className="fee-line"><span>Transportation costs</span><span>8000 DA</span></div>
            <div className="fee-line"><span>Lunch fees</span><span>8000 DA</span></div>
            <div className="fee-line"><span>Sport fees</span><span>5500 DA</span></div>
            <hr />
            <div className="total-line"><strong>Order Total:</strong><strong>315000 DA</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;

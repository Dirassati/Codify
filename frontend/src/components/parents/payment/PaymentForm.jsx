import './PaymentForm.css';
import { useNavigate } from 'react-router-dom';
const PaymentForm = () => {
 const navigate = useNavigate();
  const handleConfirm = () => {
    navigate('/payment/summary');
  };
  return (
    <div className="payment-form-container">
      <div className="payment-form">
        <h2 className="title">Payment</h2>
        <div className="pay-with">
          <span>Pay With:</span>
          <label className="radio-label">
            <input type="radio" name="payment-method" defaultChecked />
            <span className="radio-custom"></span>
            Card
          </label>
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9101 1121"
            className="input-field"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="input-field small"
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              className="input-field small"
            />
          </div>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span className="checkbox-custom"></span>
            Save card details
          </label>
        </div>
      <button className="confirm-btn" onClick={handleConfirm}>
      Pay
     </button>
        <p className="disclaimer">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
        </p>
      </div>
      <div className="order-summary">
        <button className="place-order-button">Place Order</button>
        <p className="terms">
          By placing your order, you agree to our school Privacy policy and Conditions of use.
        </p>
        <div className="summary-details">
          <div className="summary-item">
            <span>Study fees</span>
            <span>245176 DA</span>
          </div>
          <div className="summary-item">
            <span>Transportation costs</span>
            <span>8000 DA</span>
          </div>
          <div className="summary-item">
            <span>Lunch fees</span>
            <span>8000 DA</span>
          </div>
          <div className="summary-item">
            <span>Sport fees</span>
            <span>5500 DA</span>
          </div>
          <div className="summary-total">
            <span>ORDER TOTAL:</span>
            <span>315000 DA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
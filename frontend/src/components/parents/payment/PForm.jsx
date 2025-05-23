import Header from './Header';
import Sidebar from './Sidebar';
import PaymentForm from './PaymentForm';
import './PForm.css';

const PForm = () => {
  return (
    <div className="payment-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <PaymentForm />
      </div>
    </div>
  );
};

export default PForm;
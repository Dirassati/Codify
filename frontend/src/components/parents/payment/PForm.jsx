import SearchHeader from '../SearchHeader';

import PaymentForm from './PaymentForm';
import './PForm.css';

const PForm = () => {
  return (
    <div className="payment-page">
     
      <div className="main-content">
        <SearchHeader />
        <PaymentForm />
      </div>
    </div>
  );
};

export default PForm;
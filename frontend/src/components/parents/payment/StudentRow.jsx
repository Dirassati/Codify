import './StudentRow.css';
import { useNavigate } from 'react-router-dom';

const StudentRow = ({ name, grade, paymentStatus }) => {
  const navigate = useNavigate();

  const getGradeClass = () => {
    switch (grade) {
      case 'VII A': return 'grade-orange';
      case 'VII B': return 'grade-yellow';
      default: return 'grade-yellow';
    }
  };

  const getPaymentClass = () => {
    return paymentStatus === 'Paid' ? 'payment-paid' : 'payment-unpaid';
  };

  const handleClick = () => {
    navigate('/parent/payment/Form');
  };

  return (
    <div className="student-row" onClick={handleClick}>
      <input type="checkbox" onClick={(e) => e.stopPropagation()} />
      <div className="student-name">
        <div className="avatar"></div>
        <span>{name}</span>
      </div>
      <button className={`grade-button ${getGradeClass()}`}>{grade}</button>
      <button className={`payment-button ${getPaymentClass()}`}>{paymentStatus}</button>
    </div>
  );
};

export default StudentRow;

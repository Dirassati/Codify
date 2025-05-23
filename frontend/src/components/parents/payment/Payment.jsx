import Header from './Header';
import Sidebar from './Sidebar';
import StudentRow from './StudentRow';
import './Payment.css';

const Payment = () => {
  const students = [
    { name: 'Samantha William', grade: 'VII A', paymentStatus: 'Unpaid' },
    { name: 'Samantha William', grade: 'VII B', paymentStatus: 'Unpaid' },
    { name: 'Samantha William', grade: 'VII B', paymentStatus: 'Paid' },
  ];

  return (
    <div className="payment-page">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <h2 className="title">Dirassati</h2>
          <div className="table-header">
            <input type="checkbox" />
            <span>Student Name</span>
            <span>Grade</span>
            <span>The State of Payment</span>
          </div>
          {students.map((student, index) => (
            <StudentRow key={index} {...student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;

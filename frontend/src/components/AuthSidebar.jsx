import { TransactionBarChart } from './Chart';
import { MdTrendingUp } from 'react-icons/md';

const mockTransactions = [
  { _id: '1', title: 'Jan', amount: 120, type: 'expense', date: '2025-01-01' },
  { _id: '2', title: 'Feb', amount: 150, type: 'expense', date: '2025-02-01' },
  { _id: '3', title: 'Mar', amount: 350, type: 'expense', date: '2025-03-01' },
  { _id: '4', title: 'Apr', amount: 220, type: 'expense', date: '2025-04-01' },
  { _id: '5', title: 'May', amount: 90, type: 'expense', date: '2025-05-01' },
  { _id: '6', title: 'Jun', amount: 250, type: 'expense', date: '2025-06-01' },
  { _id: '7', title: 'Jul', amount: 390, type: 'expense', date: '2025-07-01' },
];

const AuthSidebar = () => {
  return (
    <div className="auth-sidebar">
      <div className="auth-shape top-shape"></div>
      <div className="auth-shape bottom-shape"></div>
      
      <div className="auth-sidebar-content">
        <div className="auth-showcase-card auth-top-card">
          <div className="icon-circle">
            <MdTrendingUp />
          </div>
          <div>
            <p className="card-lbl">Track Your Income & Expenses</p>
            <h3 className="card-val">$430,000</h3>
          </div>
        </div>

        <div className="auth-showcase-card auth-bottom-card">
          <div className="card-header">
            <div>
              <h4>All Transactions</h4>
              <p>2nd Jan to 21th Dec</p>
            </div>
            <button className="btn-view-more">View More</button>
          </div>
          <div className="auth-chart-wrapper">
             <TransactionBarChart recentTransactions={mockTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;

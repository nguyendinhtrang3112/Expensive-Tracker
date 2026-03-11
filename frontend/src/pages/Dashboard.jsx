import { useEffect, useContext, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { MainChart, BalancePieChart, TransactionBarChart } from '../components/Chart';
import { MdFileDownload } from 'react-icons/md';
import { FcMoneyTransfer, FcIdea, FcLineChart, FcSafe, FcClapperboard, FcBriefcase, FcCurrencyExchange, FcGraduationCap, FcShop, FcLike, FcDvdLogo, FcGlobe, FcInTransit, FcReading } from 'react-icons/fc';
import { exportToExcel } from '../utils/export';
import './Dashboard.css';

const Dashboard = () => {
    const { getDashboardStats, dashboardStats, incomes, expenses, getIncomes, getExpenses } = useContext(TransactionContext);

    useEffect(() => {
        getDashboardStats();
        getIncomes();
        getExpenses();
    }, [getDashboardStats, getIncomes, getExpenses]);

    const getIconPrefix = (category, type) => {
        if (type === 'income') {
            switch(category) {
                case 'Salary': return <FcMoneyTransfer />;
                case 'Freelance': return <FcIdea />;
                case 'Investments': return <FcLineChart />;
                case 'Stocks': return <FcCurrencyExchange />;
                case 'Bank': return <FcSafe />;
                case 'Youtube': return <FcClapperboard />;
                case 'Business': return <FcBriefcase />;
                default: return <FcMoneyTransfer />;
            }
        } else {
            switch(category) {
                case 'Education': return <FcGraduationCap />;
                case 'Groceries': return <FcShop />;
                case 'Health': return <FcLike />;
                case 'Subscriptions': return <FcDvdLogo />;
                case 'Travelling': return <FcGlobe />;
                case 'Takeaways': return <FcInTransit />;
                case 'Clothing': return <FcReading />;
                default: return <FcShop />;
            }
        }
    }

    return (
        <div className="dashboard-container">
            <div className="page-header">
                <div>
                    <h2>Dashboard Overview</h2>
                    <p className="subtitle" style={{ margin: 0 }}>Welcome back, track your expenses here.</p>
                </div>
                <button className="btn btn-primary" onClick={() => exportToExcel(incomes, expenses)}>
                    <MdFileDownload /> Export to Excel
                </button>
            </div>
            
            {dashboardStats && (
                <>
                    <div className="summary-cards">
                        <div className="summary-card card">
                            <div className="card-info">
                                <h3>Total Balance</h3>
                                <p className="amount" style={{ color: dashboardStats.balance >= 0 ? 'var(--text-main)' : 'var(--danger-color)'}}>
                                    ${dashboardStats.balance.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="summary-card card">
                            <div className="card-info">
                                <h3>Total Income</h3>
                                <p className="amount" style={{ color: 'var(--success-color)'}}>
                                    +${dashboardStats.totalIncome.toLocaleString()}
                                </p>
                            </div>
                            <div className="spark-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>↗</div>
                        </div>
                        <div className="summary-card card">
                            <div className="card-info">
                                <h3>Total Expenses</h3>
                                <p className="amount" style={{ color: 'var(--danger-color)'}}>
                                    -${dashboardStats.totalExpense.toLocaleString()}
                                </p>
                            </div>
                            <div className="spark-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)' }}>↘</div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="main-chart-section card">
                            <h3>Financial Overview</h3>
                            <p className="subtitle">Income vs Expenses over time</p>
                            <MainChart incomes={incomes} expenses={expenses} />
                        </div>

                        <div className="side-charts">
                            <div className="side-chart-card card">
                                <h3>Structure</h3>
                                <BalancePieChart 
                                    balance={dashboardStats.balance} 
                                    income={dashboardStats.totalIncome} 
                                    expense={dashboardStats.totalExpense} 
                                />
                                <div className="pie-legend">
                                    <span><div className="dot" style={{backgroundColor: '#10B981'}}></div> Income</span>
                                    <span><div className="dot" style={{backgroundColor: '#8b5cf6'}}></div> Expenses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottom-grid">
                        <div className="recent-transactions card">
                            <div className="header-row">
                                <h3>Recent Transactions</h3>
                            </div>
                            {dashboardStats.recentTransactions?.length > 0 ? (
                                <ul className="transaction-list">
                                    {dashboardStats.recentTransactions.map((t) => (
                                        <li key={t._id} className="transaction-item">
                                            <div className="t-info">
                                                <div className="t-icon" style={{ backgroundColor: t.type === 'income' ? '#ecfdf5' : '#f5f3ff' }}>
                                                    {getIconPrefix(t.category, t.type)}
                                                </div>
                                                <div>
                                                    <h4>{t.title}</h4>
                                                    <p>{new Date(t.date).toLocaleDateString('en-GB')} • {t.category}</p>
                                                </div>
                                            </div>
                                            <div className={`t-amount ${t.type}`}>
                                                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-data">No recent transactions available.</p>
                            )}
                        </div>
                        
                        <div className="bar-chart-card card">
                            <div className="header-row">
                                <h3>Latest Activity</h3>
                            </div>
                            <TransactionBarChart recentTransactions={dashboardStats.recentTransactions} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;

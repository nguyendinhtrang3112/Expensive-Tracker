import { useState, useContext, useEffect, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { MdDelete, MdAdd, MdFileDownload } from 'react-icons/md';
import { FcReading, FcGraduationCap, FcShop, FcInTransit, FcDvdLogo, FcLike, FcGlobe } from 'react-icons/fc';
import { SingleAreaChart, SingleBarChart } from '../components/Chart';
import { exportToExcel } from '../utils/export';
import './Transactions.css';

const Expenses = () => {
    const { addExpense, getExpenses, expenses, deleteExpense, error } = useContext(TransactionContext);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', amount: '', date: '', category: '', description: ''
    });

    useEffect(() => {
        getExpenses();
    }, [getExpenses]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExpense({ ...formData, amount: Number(formData.amount) });
            setFormData({ title: '', amount: '', date: '', category: '', description: '' });
            setShowForm(false);
        } catch (err) {
             console.log(err);
        }
    };

    // Prepare chart data
    const chartData = useMemo(() => {
        const dataMap = new Map();
        expenses.forEach(exp => {
            const date = new Date(exp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            if (!dataMap.has(date)) dataMap.set(date, { date, amount: 0 });
            dataMap.get(date).amount += exp.amount;
        });
        return Array.from(dataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [expenses]);

    const getIconPrefix = (category) => {
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

    return (
        <div className="transaction-page">
            <div className="page-header">
                <div>
                    <h2>Expense Overview</h2>
                    <p className="subtitle" style={{ margin: 0 }}>Track your spending over time</p>
                </div>
                <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger-color)' }} onClick={() => setShowForm(!showForm)}>
                    <MdAdd /> {showForm ? 'Close Form' : 'Add Expense'}
                </button>
            </div>

            {showForm && (
                <div className="form-section card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Expense</h3>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="horizontal-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="input-field" placeholder="Groceries"
                                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Amount ($)</label>
                            <input type="number" className="input-field" placeholder="50"
                                value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" className="input-field"
                                value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className="input-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                                <option value="" disabled>Select Category</option>
                                <option value="Education">Education</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Health">Health</option>
                                <option value="Subscriptions">Subscriptions</option>
                                <option value="Takeaways">Takeaways</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Travelling">Travelling</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Description</label>
                            <input type="text" className="input-field" placeholder="Add a reference"
                                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--danger-color)', height: '45px', width: '100%' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="charts-row">
                <div className="chart-card card">
                    <SingleAreaChart data={chartData} dataKey="amount" color="#f43f5e" />
                </div>
                <div className="chart-card card">
                    <SingleBarChart data={chartData} dataKey="amount" color="#fda4af" />
                </div>
            </div>

            <div className="list-section card">
                <div className="list-header">
                    <h3>Expense Sources</h3>
                    <button className="btn btn-outline" onClick={() => exportToExcel([], expenses)}>
                        <MdFileDownload /> Download
                    </button>
                </div>
                
                <div className="list-container neat-list">
                    {expenses.map((expense) => (
                        <div key={expense._id} className="neat-item">
                            <div className="neat-icon" style={{ backgroundColor: '#fff1f2' }}>
                                {getIconPrefix(expense.category)}
                            </div>
                            <div className="neat-details">
                                <h4>{expense.title}</h4>
                                <p>{new Date(expense.date).toLocaleDateString('en-GB')} • {expense.description}</p>
                            </div>
                            <div className="neat-append">
                                <button className="neat-delete" onClick={() => deleteExpense(expense._id)}>
                                    <MdDelete />
                                </button>
                                <div className="neat-amount danger-text">-${expense.amount.toLocaleString()} <span className="trend-down">↘</span></div>
                            </div>
                        </div>
                    ))}
                    {expenses.length === 0 && <p className="no-data">No expenses recorded yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default Expenses;

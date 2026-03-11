import { useState, useContext, useEffect, useMemo } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { MdDelete, MdAdd, MdFileDownload } from 'react-icons/md';
import { FcMoneyTransfer, FcBriefcase, FcIdea, FcLineChart, FcSafe, FcClapperboard, FcCurrencyExchange } from 'react-icons/fc';
import { SingleAreaChart, SingleBarChart } from '../components/Chart';
import { exportToExcel } from '../utils/export';
import './Transactions.css';

const Income = () => {
    const { addIncome, getIncomes, incomes, deleteIncome, error } = useContext(TransactionContext);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', amount: '', date: '', category: '', description: ''
    });

    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addIncome({ ...formData, amount: Number(formData.amount) });
            setFormData({ title: '', amount: '', date: '', category: '', description: '' });
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    // Prepare chart data
    const chartData = useMemo(() => {
        const dataMap = new Map();
        incomes.forEach(inc => {
            const date = new Date(inc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            if (!dataMap.has(date)) dataMap.set(date, { date, amount: 0 });
            dataMap.get(date).amount += inc.amount;
        });
        return Array.from(dataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [incomes]);

    const getIconPrefix = (category) => {
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
    }

    return (
        <div className="transaction-page">
            <div className="page-header">
                <div>
                    <h2>Income Overview</h2>
                    <p className="subtitle" style={{ margin: 0 }}>Track your earnings over time</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <MdAdd /> {showForm ? 'Close Form' : 'Add Income'}
                </button>
            </div>

            {showForm && (
                <div className="form-section card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Income</h3>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="horizontal-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="input-field" placeholder="Salary"
                                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Amount ($)</label>
                            <input type="number" className="input-field" placeholder="1000"
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
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investments">Investments</option>
                                <option value="Business">Business</option>
                                <option value="Stocks">Stocks</option>
                                <option value="Bank">Bank Transfer</option>
                                <option value="Youtube">Youtube</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Description</label>
                            <input type="text" className="input-field" placeholder="Add a reference"
                                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button type="submit" className="btn btn-primary" style={{ height: '45px', width: '100%' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="charts-row">
                <div className="chart-card card">
                    <SingleAreaChart data={chartData} dataKey="amount" color="#8b5cf6" />
                </div>
                <div className="chart-card card">
                    <SingleBarChart data={chartData} dataKey="amount" color="#c4b5fd" />
                </div>
            </div>

            <div className="list-section card">
                <div className="list-header">
                    <h3>Income Sources</h3>
                    <button className="btn btn-outline" onClick={() => exportToExcel(incomes, [])}>
                        <MdFileDownload /> Download
                    </button>
                </div>
                
                <div className="list-container neat-list">
                    {incomes.map((income) => (
                        <div key={income._id} className="neat-item">
                            <div className="neat-icon">
                                {getIconPrefix(income.category)}
                            </div>
                            <div className="neat-details">
                                <h4>{income.title}</h4>
                                <p>{new Date(income.date).toLocaleDateString('en-GB')} • {income.description}</p>
                            </div>
                            <div className="neat-append">
                                <button className="neat-delete" onClick={() => deleteIncome(income._id)}>
                                    <MdDelete />
                                </button>
                                <div className="neat-amount success-text">+${income.amount.toLocaleString()} <span className="trend-up">↗</span></div>
                            </div>
                        </div>
                    ))}
                    {incomes.length === 0 && <p className="no-data">No incomes recorded yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default Income;

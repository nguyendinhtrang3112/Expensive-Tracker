import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MdDashboard, MdAddCard, MdMoneyOff, MdLogout } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <aside className="sidebar card">
            <div className="sidebar-header">
                <div className="user-avatar">
                   {user?.name?.charAt(0) || 'U'}
                </div>
                <h3>{user?.name || 'User'}</h3>
                <p>Expense Tracker</p>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/"><MdDashboard className="icon" /> Dashboard</Link>
                    </li>
                    <li className={location.pathname === '/income' ? 'active' : ''}>
                        <Link to="/income"><MdAddCard className="icon" /> Income</Link>
                    </li>
                    <li className={location.pathname === '/expenses' ? 'active' : ''}>
                        <Link to="/expenses"><MdMoneyOff className="icon" /> Expenses</Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={logout}>
                    <MdLogout className="icon" /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

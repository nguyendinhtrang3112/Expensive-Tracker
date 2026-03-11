import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthSidebar from '../../components/AuthSidebar';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData, navigate);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-header">
          <h2>Expense Tracker</h2>
        </div>
        
        <div className="auth-form-wrapper">
          <div className="auth-title-section">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Please enter your details to log in</p>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group clean-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="clean-input" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>
            <div className="form-group clean-input-group">
              <label>Password</label>
              <input 
                type="password" 
                className="clean-input" 
                placeholder="Min 8 Characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">LOGIN</button>
          </form>
          <p className="auth-link">
            Don't have an account? <Link to="/register">SignUp</Link>
          </p>
        </div>
      </div>
      
      <div className="auth-right">
        <AuthSidebar />
      </div>
    </div>
  );
};

export default Login;

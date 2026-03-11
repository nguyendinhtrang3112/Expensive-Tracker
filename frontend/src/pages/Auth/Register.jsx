import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FcBusinesswoman } from 'react-icons/fc';
import AuthSidebar from '../../components/AuthSidebar';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await register(formData, navigate);
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
            <h2>Create an Account</h2>
            <p className="auth-subtitle">Join us today by entering your details below.</p>
          </div>

          <div className="avatar-selector">
            <div className="avatar-circle">
              <FcBusinesswoman size={40} />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group clean-input-group">
                <label>First Name</label>
                <input type="text" className="clean-input" placeholder="John"
                  value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
              </div>
              <div className="form-group clean-input-group">
                <label>Last Name</label>
                <input type="text" className="clean-input" placeholder="Doe"
                  value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
              </div>
            </div>
            <div className="form-group clean-input-group">
              <label>Email Address</label>
              <input type="email" className="clean-input" placeholder="alex@timetoprogram.com"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group clean-input-group">
              <label>Password</label>
              <input type="password" className="clean-input" placeholder="Min 8 Characters"
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            </div>
            <div className="form-group clean-input-group">
              <label>Confirm Password</label>
              <input type="password" className="clean-input" placeholder="Confirm Password"
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block">SIGN UP</button>
          </form>
          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <AuthSidebar />
      </div>
    </div>
  );
};

export default Register;

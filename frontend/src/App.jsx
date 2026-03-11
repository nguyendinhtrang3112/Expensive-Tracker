import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Income from './pages/Income';
import Expenses from './pages/Expenses';

// Components
import Sidebar from './components/Sidebar';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <TransactionProvider>
        <div className="app-container">
          {user && <Sidebar />}
          <main className={user ? "main-content" : ""} style={{ width: user ? 'auto' : '100%', padding: user ? '2rem' : '0' }}>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
              <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </TransactionProvider>
    </BrowserRouter>
  );
}

export default App;

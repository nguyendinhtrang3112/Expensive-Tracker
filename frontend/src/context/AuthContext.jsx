import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      setUser(profile.result);
    }
  }, []);

  const login = async (formData, navigate) => {
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('profile', JSON.stringify(data));
      setUser(data.result);
      navigate('/');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const register = async (formData, navigate) => {
    try {
      const { data } = await API.post('/auth/register', formData);
      localStorage.setItem('profile', JSON.stringify(data));
      setUser(data.result);
      navigate('/');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

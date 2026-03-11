import { createContext, useState, useEffect, useCallback } from 'react';
import API from '../api';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [error, setError] = useState(null);

    const getIncomes = useCallback(async () => {
        try {
            const response = await API.get('/transactions/get-incomes');
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    }, []);

    const getExpenses = useCallback(async () => {
        try {
            const response = await API.get('/transactions/get-expenses');
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    }, []);

    const getDashboardStats = useCallback(async () => {
        try {
            const response = await API.get('/transactions/dashboard-stats');
            setDashboardStats(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching stats');
        }
    }, []);

    const addIncome = async (income) => {
        try {
            await API.post('/transactions/add-income', income);
            getIncomes();
            getDashboardStats();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income');
            throw err;
        }
    };

    const addExpense = async (expense) => {
        try {
            await API.post('/transactions/add-expense', expense);
            getExpenses();
            getDashboardStats();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense');
            throw err;
        }
    };

    const deleteIncome = async (id) => {
        try {
            await API.delete(`/transactions/delete-income/${id}`);
            getIncomes();
            getDashboardStats();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income');
        }
    };

    const deleteExpense = async (id) => {
        try {
            await API.delete(`/transactions/delete-expense/${id}`);
            getExpenses();
            getDashboardStats();
        } catch (err) {
             setError(err.response?.data?.message || 'Error deleting expense');
        }
    };

    return (
        <TransactionContext.Provider value={{
            incomes, expenses, dashboardStats, error,
            getIncomes, getExpenses, getDashboardStats,
            addIncome, addExpense, deleteIncome, deleteExpense
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

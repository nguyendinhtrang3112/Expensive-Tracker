import express from 'express';
import { addIncome, getIncomes, deleteIncome, addExpense, getExpenses, deleteExpense, getDashboardStats } from '../controllers/transactionController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// protect all routes
router.use(auth);

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .get('/dashboard-stats', getDashboardStats);

export default router;

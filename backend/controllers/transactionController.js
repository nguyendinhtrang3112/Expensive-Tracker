import Transaction from '../models/Transaction.js';

export const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        const income = new Transaction({
            title,
            amount,
            category,
            description,
            date,
            user: req.userId,
            type: "income"
        });
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getIncomes = async (req, res) => {
    try {
        const incomes = await Transaction.find({ type: "income", user: req.userId }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({ message: 'Income Deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        const expense = new Transaction({
            title,
            amount,
            category,
            description,
            date,
            user: req.userId,
            type: "expense"
        });
        await expense.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Transaction.find({ type: "expense", user: req.userId }).sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({ message: 'Expense Deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getDashboardStats = async (req, res) => {
  try {
      const expenses = await Transaction.find({ type: "expense", user: req.userId }).sort({ date: -1 })
      const incomes = await Transaction.find({ type: "income", user: req.userId }).sort({ date: -1 })
      
      const totalIncome = incomes.reduce((acc, current) => acc + current.amount, 0);
      const totalExpense = expenses.reduce((acc, current) => acc + current.amount, 0);
      const balance = totalIncome - totalExpense;

      const recentTransactions = await Transaction.find({ user: req.userId }).sort({ date: -1 }).limit(5);

      res.status(200).json({
          totalIncome,
          totalExpense,
          balance,
          recentTransactions
      })
  } catch (error) {
      res.status(500).json({ message: 'Server Error' })
  }
}

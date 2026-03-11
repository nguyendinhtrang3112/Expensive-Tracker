import * as XLSX from 'xlsx';

export const exportToExcel = (incomes, expenses) => {
    // Format Incomes
    const incomeData = incomes.map(i => ({
        Date: new Date(i.date).toLocaleDateString(),
        Title: i.title,
        Amount: i.amount,
        Category: i.category,
        Description: i.description,
        Type: 'Income'
    }));

    // Format Expenses
    const expenseData = expenses.map(e => ({
        Date: new Date(e.date).toLocaleDateString(),
        Title: e.title,
        Amount: -e.amount, // Negate for clarity
        Category: e.category,
        Description: e.description,
        Type: 'Expense'
    }));

    const allData = [...incomeData, ...expenseData].sort((a, b) => new Date(a.Date) - new Date(b.Date));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add sheets
    const wsAll = XLSX.utils.json_to_sheet(allData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Transactions");

    const wsIncomes = XLSX.utils.json_to_sheet(incomeData);
    XLSX.utils.book_append_sheet(wb, wsIncomes, "Incomes");

    const wsExpenses = XLSX.utils.json_to_sheet(expenseData);
    XLSX.utils.book_append_sheet(wb, wsExpenses, "Expenses");

    // Save the file
    XLSX.writeFile(wb, "Expense_Tracker_Report.xlsx");
};

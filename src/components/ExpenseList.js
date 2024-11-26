import React, { useEffect, useState } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  
  const handleRemoveExpense = (index) => {
    const expenseToRemove = expenses[index];

    
    const shouldReturnBudget = window.confirm(
      `Do you want to return the amount of ${expenseToRemove.amount} to the budget?`
    );

    if (shouldReturnBudget) {
      
      const currentBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };

      
      const updatedBudget = {
        totalBudget: currentBudget.totalBudget,
        amountSpent: currentBudget.amountSpent - expenseToRemove.amount,
      };

      
      localStorage.setItem('budget', JSON.stringify(updatedBudget));
    }

   
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    
   
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleRemoveExpense(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;

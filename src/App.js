import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SetBudget from './components/SetBudget';
import BudgetStatus from './components/BudgetStatus';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Route with Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="set-budget" element={<SetBudget />} />
            <Route path="budget-status" element={<BudgetStatus />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="expense-list" element={<ExpenseList />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

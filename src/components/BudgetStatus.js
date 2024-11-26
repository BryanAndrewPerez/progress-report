import React, { useState, useEffect } from 'react';


const BudgetModal = ({ isOpen, onClose, onUpdate }) => {
  const [amount, setAmount] = useState(0);
  const [operation, setOperation] = useState('add'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && !isNaN(amount)) {
      onUpdate(amount, operation);
      onClose(); 
    }
  };

  if (!isOpen) return null; 

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Update Budget</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
          />
          <select onChange={(e) => setOperation(e.target.value)} value={operation}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};


const BudgetStatus = () => {
  const [budgetStatus, setBudgetStatus] = useState({ totalBudget: 0, amountSpent: 0 });
  const [timeframe, setTimeframe] = useState(''); 
  const [timestamp, setTimestamp] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
   
    const savedBudget = JSON.parse(localStorage.getItem('budget')) || { totalBudget: 0, amountSpent: 0 };
    const savedTimeframe = localStorage.getItem('timeframe');
    const savedTimestamp = localStorage.getItem('timestamp');
    
   
    if (savedBudget && savedTimeframe && savedTimestamp) {
      const currentTimestamp = new Date().getTime();
      const timePassed = currentTimestamp - parseInt(savedTimestamp);

     
      const expirationDuration =
        savedTimeframe === 'Daily' ? 24 * 60 * 60 * 1000 :
        savedTimeframe === 'Weekly' ? 7 * 24 * 60 * 60 * 1000 :
        savedTimeframe === 'Monthly' ? 30 * 24 * 60 * 60 * 1000 :
        0;

      
      if (timePassed >= expirationDuration) {
        localStorage.removeItem('budget');
        localStorage.removeItem('timestamp');
        localStorage.removeItem('timeframe');
        setBudgetStatus({ totalBudget: 0, amountSpent: 0 });
      } else {
        
        setBudgetStatus(savedBudget);
        setTimeframe(savedTimeframe);
        setTimestamp(savedTimestamp);
      }
    }
  }, []);

  const updateBudget = (amount, operation) => {
    let newTotalBudget = budgetStatus.totalBudget;
    let newAmountSpent = budgetStatus.amountSpent;

   
    if (operation === 'add') {
      newTotalBudget += amount;
    } else if (operation === 'subtract') {
      newTotalBudget -= amount;
    }

    
    const updatedBudget = { totalBudget: newTotalBudget, amountSpent: newAmountSpent };
    localStorage.setItem('budget', JSON.stringify(updatedBudget));

    
    setBudgetStatus(updatedBudget);
  };

  return (
    <div>
      <h2>Budget Status</h2>
      <div>
        <p>Total Budget: {budgetStatus.totalBudget}</p>
        <p>Amount Spent: {budgetStatus.amountSpent}</p>
        <p>Remaining Budget: {budgetStatus.totalBudget - budgetStatus.amountSpent}</p>
        <p>Timeframe: {timeframe || 'N/A'}</p>
      </div>

      
      <button onClick={() => setIsModalOpen(true)}>Update Budget</button>

      
      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpdate={updateBudget} />
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
};

export default BudgetStatus;

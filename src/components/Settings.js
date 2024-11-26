import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [account, setAccount] = useState({ username: '', email: '', password: '' });

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/account', account);
      
    } catch (error) {
      console.error('Failed to update account', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/account');

    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdateAccount}>
        <input type="text" placeholder="Username" onChange={(e) => setAccount({ ...account, username: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setAccount({ ...account, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setAccount({ ...account, password: e.target.value })} />
        <button type="submit">Update Account</button>
      </form>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;

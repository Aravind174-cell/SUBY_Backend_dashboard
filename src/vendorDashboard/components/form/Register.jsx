import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath'; // Ensure this is defined correctly

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Changed to false initially

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    setError(''); // Clear previous errors on form submit

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register vendor. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      setUsername('');
      setEmail('');
      setPassword('');
      alert('Vendor registered successfully!');
      showLoginHandler(); // If you want to show the login screen after registration

    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message); // Set the error message for displaying in UI
    } finally {
      setLoading(false); // Set loading to false after the request is finished
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        
        {/* Display error if there's any */}
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <br />

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

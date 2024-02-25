import React, { useState } from 'react';

const Login = ({ onLogin, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        onLogin();
        setSuccessMessage('Login successful!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 1000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <h2 style={styles.heading}>Login</h2>
        <form style={styles.form}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="button" onClick={handleLogin} style={styles.button}>
            Login
          </button>

          {errorMessage && <p style={{ ...styles.message, color: '#FF5252' }}>{errorMessage}</p>}
          {successMessage && <p style={{ ...styles.message, color: '#4CAF50' }}>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  loginContainer: {
    width: '400px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginTop: '8rem',
    transition: 'box-shadow 0.3s ease',
  },
  heading: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '10px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;

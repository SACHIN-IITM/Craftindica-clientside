import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewEmployeeRecordForm from './NewForm';
import DepartmentSalarySummary from './Departmental-ss';
import DetailedDepartmentSalarySummary from './Detailed-Departmental-ss';
import Login from './Login';
import DashBoard from './DashBoard';
import SalaryStatistics from './Salary-ss';
import ContractSalarySummary from './Contract-ss';
import "./App.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    if (storedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
      setAuthenticated(false);
      localStorage.removeItem('authenticated');
      return <Navigate to="/" />;
    }
    console.error('API error:', error);
    return null;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        {authenticated && (
          <>
            <Route path="/dashboard" element={<DashBoard onLogout={handleLogout} />} />
            <Route path="/salary-summary" element={<SalaryStatistics onError={handleApiError} />} />
            <Route path="/add-record" element={<NewEmployeeRecordForm onError={handleApiError} />} />
            <Route path="/contract-based-salary-summary" element={<ContractSalarySummary onError={handleApiError} />} />
            <Route path="/department-salary-summary" element={<DepartmentSalarySummary onError={handleApiError} />} />
            <Route path="/detailed-department-salary-summary" element={<DetailedDepartmentSalarySummary onError={handleApiError} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

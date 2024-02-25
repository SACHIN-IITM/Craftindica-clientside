import React from 'react';
import Navbar from './Navbar';
import ApiButtonComponent from './ApiButton';
import EmployeeList from './IndexForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import './DashBoard.css';

export default function DashBoard({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the provided logout function
        navigate('/'); // Navigate to the home page
    };

    return (
        <>
            <div className="navbar">
                <Navbar />
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', position:' absolute' , top: '2rem', right: '4rem'}} onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: '5px' }} />
                    Logout
                </div>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-header" >
                    <h2>Welcome to the Employee Dashboard</h2>
                </div>
                <div className="button-grid">
                    <ApiButtonComponent text={"Salary Summary"} path={'/salary-summary'} />
                    <ApiButtonComponent text={"Contract-based Summary"} path={'/contract-based-salary-summary'} />
                    <ApiButtonComponent text={"Departmental Summary"} path={'/department-salary-summary'} />
                    <ApiButtonComponent text={"Detailed Departmental Summary"} path={'/detailed-department-salary-summary'} />
                    <button onClick={() => navigate('/add-record')} className="api-button" style={{ marginLeft: '10rem' }}>
                        Add New Employee
                    </button>
                </div>
                <EmployeeList />
            </div>
        </>
    );
}

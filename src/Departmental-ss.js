import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DepartmentSalarySummary = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartmentSalarySummary = async () => {
            try {
                const response = await fetch('https://craftindica-serverside.onrender.com/api/department-salary-summary');
                if (!response.ok) {
                    throw new Error('Failed to fetch departmental salary summary');
                }

                const data = await response.json();
                setSummaryData(data);
            } catch (error) {
                setError('Error fetching departmental salary summary');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentSalarySummary();
    }, []);

    return (
        <div className="row mt-3">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="col-8 offset-2">
                <h3 className="text-center mb-4" style={{textAlign:'center'}}>Departmental Salary Summary</h3>
                {loading ? (
                    <p>Loading departmental salary summary...</p>
                ) : (
                    <TableContainer component={Paper} className="custom-table-container">
                        <Table className="custom-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header-cell"><b>Department</b></TableCell>
                                    <TableCell className="header-cell"><b>Mean Salary</b></TableCell>
                                    <TableCell className="header-cell"><b>Min Salary</b></TableCell>
                                    <TableCell className="header-cell"><b>Max Salary</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {summaryData.map(department => (
                                    <TableRow key={department.department}>
                                        <TableCell>{department.department}</TableCell>
                                        <TableCell>{department.mean_salary}</TableCell>
                                        <TableCell>{department.min_salary}</TableCell>
                                        <TableCell>{department.max_salary}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default DepartmentSalarySummary;

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DetailedDepartmentSalarySummary = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailedDepartmentSalarySummary = async () => {
            try {
                const response = await fetch('https://craftindica-serverside.onrender.com/api/detailed-department-salary-summary');
                if (!response.ok) {
                    throw new Error('Failed to fetch detailed departmental salary summary');
                }

                const data = await response.json();
                setSummaryData(data);
            } catch (error) {
                setError('Error fetching detailed departmental salary summary');
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedDepartmentSalarySummary();
    }, []);

    return (
        <div className="row mt-3">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="col-8 offset-2">
                <h3 className="text-center mb-4" style={{textAlign:'center'}}>Detailed Departmental Salary Summary</h3>
                {loading ? (
                    <p>Loading detailed departmental salary summary...</p>
                ) : (
                    <TableContainer component={Paper} className="custom-table-container">
                        <Table className="custom-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header-cell"><b>Department</b></TableCell>
                                    <TableCell className="header-cell"><b>Sub-Department</b></TableCell>
                                    <TableCell className="header-cell"><b>Mean Salary</b></TableCell>
                                    <TableCell className="header-cell"><b>Min Salary</b></TableCell>
                                    <TableCell className="header-cell"><b>Max Salary</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {summaryData.map(item => (
                                    <TableRow key={`${item.department}-${item.sub_department}`}>
                                        <TableCell>{item.department}</TableCell>
                                        <TableCell>{item.sub_department}</TableCell>
                                        <TableCell>{item.mean_salary}</TableCell>
                                        <TableCell>{item.min_salary}</TableCell>
                                        <TableCell>{item.max_salary}</TableCell>
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

export default DetailedDepartmentSalarySummary;

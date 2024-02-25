import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SalaryStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/salary-statistics')
            .then(response => response.json())
            .then(data => {
                setStatistics(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching salary statistics:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="row mt-3">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="col-8 offset-2">
                <h3 className="text-center mb-4" style={{textAlign:'center'}}>Salary Statistics</h3>
                {loading ? (
                    <p>Loading salary statistics...</p>
                ) : (
                    <TableContainer component={Paper} className="custom-table-container">
                        <Table className="custom-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header-cell"><b>Statistic</b></TableCell>
                                    <TableCell className="header-cell"><b>Value</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mean Salary</TableCell>
                                    <TableCell>{statistics.mean_salary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Min Salary</TableCell>
                                    <TableCell>{statistics.min_salary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Max Salary</TableCell>
                                    <TableCell>{statistics.max_salary}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default SalaryStatistics;

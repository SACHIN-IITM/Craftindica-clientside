import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ContractSalarySummary = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContractSalarySummary = async () => {
            try {
                const response = await fetch('https://localhost:3000/api/contract-salary-summary');
                if (!response.ok) {
                    throw new Error('Failed to fetch contract salary summary');
                }

                const data = await response.json();
                setSummaryData(data);
            } catch (error) {
                setError('Error fetching contract salary summary');
            } finally {
                setLoading(false);
            }
        };

        fetchContractSalarySummary();
    }, []);

    return (
        <div className="row mt-3">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="col-4 offset-2">
                <h3 className="text-center mb-4" style={{textAlign:'center'}} >Contract-based Salary Summary</h3>
                {loading ? (
                    <p>Loading contract-based salary summary...</p>
                ) : (
                    <TableContainer component={Paper} className="custom-table-container">
                        <Table className="custom-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="header-cell" style={{ width: '50%' }}><b>Statistic</b></TableCell>
                                    <TableCell className="header-cell" style={{ width: '50%' }}><b>Value</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mean Salary</TableCell>
                                    <TableCell>{summaryData.mean_salary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Min Salary</TableCell>
                                    <TableCell>{summaryData.min_salary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Max Salary</TableCell>
                                    <TableCell>{summaryData.max_salary}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default ContractSalarySummary;

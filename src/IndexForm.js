import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const EmployeeList = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/employees')
            .then(response => response.json())
            .then(data => setEmployeeData(data))
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete-record/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setEmployeeData(prevData => prevData.filter(employee => employee.id !== id));
                console.log(data.message);
            } else {
                console.error('Error deleting record:', data.message);
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-12">
                <h3 className="text-center mb-4" style={{ textAlign: 'center' }}>Employee List</h3>
                <TableContainer component={Paper} style={{ background: '#f9f9f9' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Name</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Salary</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Currency</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Department</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Sub-Department</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>On Contract</TableCell>
                                <TableCell className="header-cell" style={{ fontWeight: 'bold', color: '#333' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.salary}</TableCell>
                                    <TableCell>{employee.currency}</TableCell>
                                    <TableCell>{employee.department}</TableCell>
                                    <TableCell>{employee.sub_department}</TableCell>
                                    <TableCell>{employee.on_contract ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDelete(employee.id)}
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            style={{ color: '#fff', background: '#d32f2f' }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default EmployeeList;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Navbar from './Navbar';

const NewEmployeeRecordForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        salary: '',
        currency: '',
        department: '',
        sub_department: '',
        on_contract: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://craftindica-serverside.onrender.com/api/add-record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Record added successfully');
                navigate('/');  
            } else {
                console.error('Failed to add record');
            }
        } catch (error) {
            console.error('Error occurred while adding record:', error);
        }

        setFormData({
            name: '',
            salary: '',
            currency: '',
            department: '',
            sub_department: '',
            on_contract: false,
        });
    };

    return (
        <div className="row mt-3">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="col-8 offset-2" style={{ margin: '1rem' }}>
                <h3 style={{ textAlign: 'center' }}>Create a New Employee Record</h3>
                <form onSubmit={handleSubmit} noValidate className="needs-validation" encType="multipart/form-data">
                    <TextField
                        name="name"
                        label="Name"
                        placeholder="Enter name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        name="salary"
                        label="Salary"
                        placeholder="Enter salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        name="currency"
                        label="Currency"
                        placeholder="USD"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        title="Please enter a valid currency code (e.g., USD)"
                        value={formData.currency}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        name="department"
                        label="Department"
                        placeholder="Enter department"
                        type="text"
                        value={formData.department}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <TextField
                        name="sub_department"
                        label="Sub-Department"
                        placeholder="Enter sub-department"
                        type="text"
                        value={formData.sub_department}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name="on_contract" checked={formData.on_contract} onChange={handleInputChange} />}
                            label="On Contract"
                        />
                    </FormGroup>

                    <Button className="add-btn mt-3" type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewEmployeeRecordForm;

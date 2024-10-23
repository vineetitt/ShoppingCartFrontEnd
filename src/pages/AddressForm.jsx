import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orderService'; 
import { toast } from 'react-toastify';

const AddressForm = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    // const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handlePlaceOrder = async () => {
        if (!address || !city || !postalCode) {
            toast.error("Please fill out all the fields!");
            return;
        }

        try {
            await placeOrder(userId);  
            toast.success("Order placed successfully!");
            // navigate("/order-success"); 
        } catch (error) {
            toast.error("Error placing order!");
        }
    };

    return (
        <Card style={{ maxWidth: 500, margin: 'auto', padding: '20px' }}>
            <CardContent>
                <Typography variant="h6">Shipping Address</Typography>
                <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </Button>
            </CardContent>
        </Card>
    );
};

export default AddressForm;

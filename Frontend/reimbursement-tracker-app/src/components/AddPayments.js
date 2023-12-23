import React, { useState } from 'react';
import axios from 'axios';
import './AddPayments.css';

const AddPayment = () => {
  const [paymentData, setPaymentData] = useState({
    Username: '',
    CardNumber: '',
    ExpiryDate: '',
    CVV: '',
    PaymentAmount: 0,
    PaymentDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
    // Clear the validation error for the current field when the user starts typing
    setErrors({ ...errors, [name]: undefined });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.Username.trim()) {
      newErrors.Username = 'Please enter a valid Username.';
    }

    if (!paymentData.CardNumber.trim()) {
      newErrors.CardNumber = 'Please enter a valid Card Number.';
    }

    if (!paymentData.ExpiryDate.trim()) {
      newErrors.ExpiryDate = 'Please enter a valid Expiry Date.';
    }

    if (!paymentData.CVV.trim()) {
      newErrors.CVV = 'Please enter a valid CVV.';
    }

    if (!paymentData.PaymentAmount || paymentData.PaymentAmount <= 0) {
      newErrors.PaymentAmount = 'Please enter a valid Payment Amount.';
    }

    if (!paymentData.PaymentDate.trim()) {
      newErrors.PaymentDate = 'Please enter a valid Payment Date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out the required fields correctly.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7007/api/PaymentDetails', paymentData);

      console.log('Payment added successfully:', response.data);
      alert('Payment added successfully');

      // Add RequestId and PaymentId to local storage
      localStorage.setItem('RequestId', response.data.RequestId);
      localStorage.setItem('PaymentId', response.data.PaymentId);
    } catch (error) {
      console.error('Error adding payment:', error.response?.data);
      alert('Failed to add payment. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2 className='heading'>Add Payment</h2>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Username">Username:</label>
            <input
              type="text"
              id="Username"
              name="Username"
              value={paymentData.Username}
              onChange={handleInputChange}
            />
            {errors.Username && <div className="error">{errors.Username}</div>}
          </div>

          <div>
            <label htmlFor="CardNumber">Card Number:</label>
            <input
              type="text"
              id="CardNumber"
              name="CardNumber"
              value={paymentData.CardNumber}
              onChange={handleInputChange}
            />
            {errors.CardNumber && <div className="error">{errors.CardNumber}</div>}
          </div>

          <div>
            <label htmlFor="ExpiryDate">Expiry Date:</label>
            <input
              type="text"
              id="ExpiryDate"
              name="ExpiryDate"
              value={paymentData.ExpiryDate}
              onChange={handleInputChange}
            />
            {errors.ExpiryDate && <div className="error">{errors.ExpiryDate}</div>}
          </div>

          <div>
            <label htmlFor="CVV">CVV:</label>
            <input
              type="text"
              id="CVV"
              name="CVV"
              value={paymentData.CVV}
              onChange={handleInputChange}
            />
            {errors.CVV && <div className="error">{errors.CVV}</div>}
          </div>

          <div>
            <label htmlFor="PaymentAmount">Payment Amount:</label>
            <input
              type="number"
              id="PaymentAmount"
              name="PaymentAmount"
              value={paymentData.PaymentAmount}
              onChange={handleInputChange}
            />
            {errors.PaymentAmount && <div className="error">{errors.PaymentAmount}</div>}
          </div>

          <div>
            <label htmlFor="PaymentDate">Payment Date:</label>
            <input
              type="datetime-local"
              id="PaymentDate"
              name="PaymentDate"
              value={paymentData.PaymentDate}
              onChange={handleInputChange}
            />
            {errors.PaymentDate && <div className="error">{errors.PaymentDate}</div>}
          </div>

          <button type="submit">Add Payment</button>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
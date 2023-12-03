import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetPaymentDetails = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://localhost:7007/api/PaymentDetails');
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payment details:', error.response.data);
      setError('Failed to fetch payment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h2>Payment Details</h2>

      <button onClick={fetchPaymentDetails} disabled={loading}>
        Get All Payments
      </button>

      {loading && <p>Loading payment details...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {paymentData.map((payment) => (
          <li key={payment.PaymentId }>
            <p>Payment ID: {payment.PaymentId}</p>
            <p>Request ID: {payment.RequestId}</p>
            <p>Card Number: {payment.CardNumber}</p>
            <p>Expiry Date: {payment.ExpiryDate}</p>
            <p>CVV: {payment.CVV}</p>
            <p>Payment Amount: {payment.PaymentAmount}</p>
            <p>Payment Date: {payment.PaymentDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetPaymentDetails;

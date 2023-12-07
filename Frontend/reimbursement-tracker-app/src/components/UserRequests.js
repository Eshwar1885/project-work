import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateRequest from './UpdateRequest';
import './UserRequests.css';

const UserRequests = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        // Get the username from localStorage
        const username = localStorage.getItem('username');

        if (username) {
          // Send a GET request to fetch user-specific requests
          const response = await axios.get(`https://localhost:7007/api/Request/user/${username}`);
          setUserRequests(response.data);
        } else {
          console.log('Username not found in localStorage. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching user requests:', error);
      }
    };

    fetchUserRequests();
  }, []);

  const handleDeleteRequest = async (requestId) => {
    // Show a confirmation alert before deleting
    const isConfirmed = window.confirm("Do you really want to delete the request? Once deleted, it cannot be undone.");
  
    if (isConfirmed) {
      try {
        // Send a DELETE request to delete the request on the server
        await axios.delete(`https://localhost:7007/api/Request/${requestId}`);
        
        // Update the user requests after deleting
        const updatedRequests = userRequests.filter((request) => request.requestId !== requestId);
        setUserRequests(updatedRequests);
  
        // Notify the user after successful deletion
        window.alert(`Request with ID ${requestId} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    } else {
      // Notify the user that the request was not deleted
      window.alert('Deletion canceled. The request was not deleted.');
    }
  }

  const handleUpdateRequest = (request) => {
    setSelectedRequest(request);
    setUpdateModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateModalOpen(false);
    setSelectedRequest(null);
    // Optionally, update the user requests after a successful update
  };


  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div>
      <h2>User Requests</h2>
      <div className="request-container">
        {userRequests.map((request) => (
          <div key={request.requestId} className="request-box">
            <h3>Request ID: {request.requestId}</h3>
            <p>Expense Category: {request.expenseCategory}</p>
            <p>Amount: {request.amount}</p>
            <p>Document: {request.document}</p>
            <p>Description: {request.description}</p>
            <p>Request Date: {new Date(request.requestDate).toLocaleString()}</p>
            <div className="actions">
              <button onClick={() => handleDeleteRequest(request.requestId)} className="btn btn-danger">Delete</button>
              <button onClick={() => handleUpdateRequest(request)} className="btn btn-primary">Update</button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedRequest && isUpdateModalOpen && (
        <UpdateRequest
          request={selectedRequest}
          onUpdateSuccess={handleUpdateSuccess}
          onClose={handleCloseUpdateModal}
        />
      )}
    </div>
  );
};

export default UserRequests;
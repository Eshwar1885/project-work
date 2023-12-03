import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateTracking from './UpdateTracking';
import './Requests.css';

const ViewTracking = ({ trackingDetails, onClose }) => {
  return (
    <div>
      <h2>View Tracking</h2>
      <label>
        Request ID:
        <input type="text" name="requestId" value={trackingDetails.requestId} readOnly />
      </label>
      <label>
        Tracking ID:
        <input type="text" name="trackingSId" value={trackingDetails.trackingId} readOnly />
      </label>
      <label>
        Tracking Status:
        <input type="text" name="trackingStatus" value={trackingDetails.trackingStatus} readOnly />
      </label>
      
      <label>
        Approval Date:
        <input  name="approvalDate" value={trackingDetails.approvalDate || ''} readOnly />
      </label>
      <label>
        Reimbursement Date:
        <input name="reimbursementDate" value={trackingDetails.reimbursementDate || ''} readOnly />
      </label>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewTrackingDetails, setViewTrackingDetails] = useState(null);
  const [updateTrackingDetails, setUpdateTrackingDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7007/api/Request');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewTrackingClick = async (requestId) => {
    try {
      const response = await axios.get(`https://localhost:7007/api/Tracking/request/${requestId}`);
      setViewTrackingDetails(response.data);
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };

  const handleUpdateTrackingClick = async (requestId) => {
    try {
      const response = await axios.get(`https://localhost:7007/api/Tracking/request/${requestId}`);
      setUpdateTrackingDetails(response.data);
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };

  const handleCloseViewTrackingModal = () => {
    setViewTrackingDetails(null);
  };

  const handleCloseUpdateTrackingModal = () => {
    setUpdateTrackingDetails(null);
  };

  return (
    <div>
      <h2>Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Username</th>
            <th>Expense Category</th>
            <th>Amount</th>
            <th>Document</th>
            <th>Description</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.requestId}>
              <td>{request.requestId}</td>
              <td>{request.username}</td>
              <td>{request.expenseCategory}</td>
              <td>{request.amount}</td>
              <td>{request.document}</td>
              <td>{request.description}</td>
              <td>{new Date(request.requestDate).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    handleViewTrackingClick(request.requestId);
                  }}
                  className="btn btn-secondary btn-small"
                >
                  View Tracking
                </button>
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    handleUpdateTrackingClick(request.requestId);
                  }}
                  className="btn btn-secondary btn-small"
                >
                  Update Tracking
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for View Tracking */}
      {selectedRequest && viewTrackingDetails && (
        <div className="modal">
          <div className="modal-content">
            <ViewTracking trackingDetails={viewTrackingDetails} onClose={handleCloseViewTrackingModal} />
          </div>
        </div>
      )}

      {/* Modal for Update Tracking Form */}
      {selectedRequest && updateTrackingDetails && (
        <div className="modal">
          <div className="modal-content">
            <UpdateTracking
              requestId={selectedRequest.requestId}
              trackingDetails={updateTrackingDetails}
              onUpdateTracking={() => {
                // Handle update tracking logic here if needed
                handleCloseUpdateTrackingModal();
              }}
              onClose={handleCloseUpdateTrackingModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
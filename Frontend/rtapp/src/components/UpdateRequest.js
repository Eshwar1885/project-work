import React, { useState, useEffect } from "react";
import axios from "axios";
import './UpdateRequest.css';

function UpdateRequest({ request, onClose }) {
    const [requestId, setRequestId] = useState(0);
    const [username, setUsername] = useState("string");
    const [expenseCategory, setExpenseCategory] = useState("string");
    const [amount, setAmount] = useState(0);
    const [document, setDocument] = useState("string");
    const [description, setDescription] = useState("string");
    const [requestDate, setRequestDate] = useState("2023-12-01T14:15:29.821Z");

    useEffect(() => {
        // Set the state with the request details when the component mounts
        setRequestId(request.requestId);
        setUsername(request.username);
        setExpenseCategory(request.expenseCategory);
        setAmount(request.amount);
        setDocument(request.document);
        setDescription(request.description);
        setRequestDate(request.requestDate);
    }, [request]);

    const updateRequest = () => {
        const updatedRequest = {
            "requestId": requestId,
            "username": username,
            "expenseCategory": expenseCategory,
            "amount": amount,
            "document": document,
            "description": description,
            "requestDate": requestDate
        };

        // Include the request ID in the URL
        axios.put(`https://localhost:7007/api/Request`, updatedRequest)
            .then(response => {
                console.log(response.data);
                alert("Request Updated Successfully");
                onClose(); // Close the modal after updating
            })
            .catch(error => {
                console.error("Error updating request:", error);
                alert("Failed to update request");
                console.log(error.response?.data);
            });
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Request</h2>

                <label htmlFor="requestId">Request ID</label>
                <input id="requestId" type="text" value={requestId} readOnly />

                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="expenseCategory">Expense Category</label>
                <input id="expenseCategory" type="text" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} />

                <label htmlFor="amount">Amount</label>
                <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <label htmlFor="document">Document</label>
                <input id="document" type="text" value={document} onChange={(e) => setDocument(e.target.value)} />

                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="requestDate">Request Date</label>
                <input id="requestDate" type="text" value={requestDate} onChange={(e) => setRequestDate(e.target.value)} />

                <div className="button-container">
                    <button onClick={updateRequest} className="btn btn-primary">Update Request</button>
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateRequest;
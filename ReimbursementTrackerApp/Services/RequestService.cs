using ReimbursementTrackerApp.Interfaces;
using ReimbursementTrackerApp.Models.DTOs;
using ReimbursementTrackerApp.Models;
using ReimbursementTrackerApp.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReimbursementTrackerApp.Services
{
    /// <summary>
    /// Service class for managing reimbursement requests.
    /// </summary>
    public class RequestService : IRequestService
    {
        private readonly IRepository<int, Request> _requestRepository;
        private readonly IRepository<int, Tracking> _trackingRepository;
        private readonly IRepository<string, User> _userRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="RequestService"/> class.
        /// </summary>
        /// <param name="requestRepository">The repository for reimbursement requests.</param>
        /// <param name="trackingRepository">The repository for tracking information related to requests.</param>
        /// <param name="userRepository">The repository for user information.</param>
        public RequestService(
            IRepository<int, Request> requestRepository,
            IRepository<int, Tracking> trackingRepository,
            IRepository<string, User> userRepository)
        {
            _requestRepository = requestRepository;
            _trackingRepository = trackingRepository;
            _userRepository = userRepository;
        }

        private RequestDTO CreateRequestDTOFromModel(Request request)
        {
            return new RequestDTO
            {
                RequestId = request.RequestId,
                ExpenseCategory = request.ExpenseCategory,
                Amount = request.Amount,
                Document = request.Document,
                Description = request.Description,
                RequestDate = request.RequestDate,
                Username = request.Username
            };
        }

        /// <summary>
        /// Adds a new reimbursement request.
        /// </summary>
        /// <param name="requestDTO">The request information to be added.</param>
        /// <returns>Returns true if the addition is successful; otherwise, throws a UserNotFoundException.</returns>
        public bool Add(RequestDTO requestDTO)
        {
            var user = _userRepository.GetAll()
                .FirstOrDefault(r => r.Username == requestDTO.Username);

            if (user != null)
            {
                var request = new Request
                {
                    ExpenseCategory = requestDTO.ExpenseCategory,
                    Amount = requestDTO.Amount,
                    Document = requestDTO.Document,
                    Description = requestDTO.Description,
                    RequestDate = DateTime.Now,
                    Username = requestDTO.Username
                };

                _requestRepository.Add(request);

                var tracking = new Tracking
                {
                    TrackingStatus = "Pending",
                    ApprovalDate = null,
                    ReimbursementDate = null,
                    Request = request
                };

                _trackingRepository.Add(tracking);

                return true;
            }

            throw new UserNotFoundException();
        }

        /// <summary>
        /// Removes a reimbursement request based on the request ID.
        /// </summary>
        /// <param name="requestId">The ID of the request to be removed.</param>
        /// <returns>Returns true if the removal is successful; otherwise, throws a RequestNotFoundException.</returns>
        public bool Remove(int requestId)
        {
            var request = _requestRepository.Delete(requestId);

            if (request != null)
            {
                return true;
            }

            throw new RequestNotFoundException();
        }

        /// <summary>
        /// Updates a reimbursement request based on the provided RequestDTO.
        /// </summary>
        /// <param name="requestDTO">Updated request information.</param>
        /// <returns>Returns the updated RequestDTO if the update is successful; otherwise, throws a RequestNotFoundException.</returns>
        public RequestDTO Update(RequestDTO requestDTO)
        {
            var existingRequest = _requestRepository.GetById(requestDTO.RequestId);

            if (existingRequest != null)
            {
                existingRequest.ExpenseCategory = requestDTO.ExpenseCategory;
                existingRequest.Amount = requestDTO.Amount;
                existingRequest.Document = requestDTO.Document;
                existingRequest.Description = requestDTO.Description;

                _requestRepository.Update(existingRequest);

                return CreateRequestDTOFromModel(existingRequest);
            }

            throw new RequestNotFoundException();
        }

        /// <summary>
        /// Updates a reimbursement request's tracking status based on the request ID and tracking status.
        /// </summary>
        /// <param name="requestId">The ID of the request to be updated.</param>
        /// <param name="trackingStatus">The updated tracking status.</param>
        /// <returns>Returns the updated RequestDTO if the update is successful; otherwise, throws a RequestNotFoundException or TrackingNotFoundException.</returns>
        public RequestDTO Update(int requestId, string trackingStatus)
        {
            var existingRequest = _requestRepository.GetById(requestId);

            if (existingRequest != null)
            {
                var existingTracking = _trackingRepository.GetAll()
                    .FirstOrDefault(t => t.RequestId == requestId);

                if (existingTracking != null)
                {
                    existingTracking.TrackingStatus = trackingStatus;
                    _trackingRepository.Update(existingTracking);

                    return CreateRequestDTOFromModel(existingRequest);
                }
                else
                {
                    throw new TrackingNotFoundException();
                }
            }

            throw new RequestNotFoundException();
        }

        /// <summary>
        /// Gets a reimbursement request based on the request ID.
        /// </summary>
        /// <param name="requestId">The ID of the request to retrieve.</param>
        /// <returns>Returns the RequestDTO if the request is found; otherwise, throws a RequestNotFoundException.</returns>
        public RequestDTO GetRequestById(int requestId)
        {
            var existingRequest = _requestRepository.GetById(requestId);

            if (existingRequest != null)
            {
                return CreateRequestDTOFromModel(existingRequest);
            }

            throw new RequestNotFoundException();
        }

        /// <summary>
        /// Gets a reimbursement request based on the expense category.
        /// </summary>
        /// <param name="expenseCategory">The expense category of the request to retrieve.</param>
        /// <returns>Returns the RequestDTO if the request is found; otherwise, throws a RequestNotFoundException.</returns>
        public RequestDTO GetRequestByCategory(string expenseCategory)
        {
            var existingRequest = _requestRepository.GetAll()
                .FirstOrDefault(r => r.ExpenseCategory == expenseCategory);

            if (existingRequest != null)
            {
                return CreateRequestDTOFromModel(existingRequest);
            }

            throw new RequestNotFoundException();
        }

        /// <summary>
        /// Gets all reimbursement requests for a specific user.
        /// </summary>
        /// <param name="username">The username of the user.</param>
        /// <returns>Returns a collection of RequestDTO representing all requests for the specified user.</returns>
        public IEnumerable<RequestDTO> GetRequestsByUsername(string username)
        {
            var requests = _requestRepository.GetAll()
            .Where(r => r.Username == username).ToList();

            var requestDTOs = new List<RequestDTO>();

            foreach (var existingRequest in requests)
            {
                requestDTOs.Add(CreateRequestDTOFromModel(existingRequest));
            }

            return requestDTOs;
        }

        /// <summary>
        /// Gets all reimbursement requests.
        /// </summary>
        /// <returns>Returns a collection of RequestDTO representing all requests.</returns>
        public IEnumerable<RequestDTO> GetAllRequests()
        {
            var requests = _requestRepository.GetAll();

            var requestDTOs = new List<RequestDTO>();

            foreach (var existingRequest in requests)
            {
                requestDTOs.Add(CreateRequestDTOFromModel(existingRequest));
            }

            return requestDTOs;
        }
    }
}

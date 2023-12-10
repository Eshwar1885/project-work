using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using ReimbursementTrackerApp.Contexts;
using ReimbursementTrackerApp.Exceptions;
using ReimbursementTrackerApp.Interfaces;
using ReimbursementTrackerApp.Models;
using ReimbursementTrackerApp.Models.DTOs;
using ReimbursementTrackerApp.Repositories;
using ReimbursementTrackerApp.Services;
using System.Linq;
namespace ReimbursementTrackerApp.Tests;
[TestFixture]
public class UserProfileServiceTests
{

    IRepository<int, UserProfile> repository;
    [SetUp]
    public void Setup()
    {
        var dbOptions = new DbContextOptionsBuilder<RTAppContext>()
                            .UseInMemoryDatabase("dbTestUserProfile")
                            .Options;

        RTAppContext context = new RTAppContext(dbOptions);
        repository = new UserProfileRepository(context);

    }


    [Test]
    public void RemoveProfile_Success()
    {
        IUserProfileService userProfileService = new UserProfileService(repository);
        // Arrange
        var userProfileDTO = new UserProfileDTO
        {
            Username = "testUser",
            FirstName = "John",
            LastName = "Doe",
            City = "New York",
            ContactNumber = "1234567890",
            BankAccountNumber = "9876543210"
        };

        // Add the profile
        userProfileService.Add(userProfileDTO);

        // Act
        var result = userProfileService.Remove("testUser");

        // Assert
        Assert.IsTrue(result);
    }

}
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ReimbursementTrackerApp.Services;
using ReimbursementTrackerApp.Interfaces;
using ReimbursementTrackerApp.Models.DTOs;
using ReimbursementTrackerApp.Exceptions;
using ReimbursementTrackerApp.Repositories;
using ReimbursementTrackerApp.Contexts;
using ReimbursementTrackerApp.Models;
using NuGet.Protocol.Core.Types;

namespace ReimbursementTrackerApp.Tests
{
    [TestFixture]
    public class UserProfileServiceTests
    {
        IRepository<int, User> userRepository;
        private UserProfileRepository repository;

        [SetUp]
        public void Setup()
        {
            var dbOptions = new DbContextOptionsBuilder<RTAppContext>()
                 .UseInMemoryDatabase("dbTestCustomer")
                .Options;
            RTAppContext context = new RTAppContext(dbOptions);
            repository = new UserProfileRepository(context);
        }
        [Test]
        public void AddUserProfileTest()
        {
            //Arrange
            IUserProfileService profileService = new UserProfileService(repository);
            var userprofileDTO = new UserProfileDTO
            {
                Username = "testUser",
                FirstName = "John",
                LastName = "Doe",
                City = "New York",
                ContactNumber = "1234567890",
                BankAccountNumber = "9876543210"
            };
            var userprofileDIO2 = new UserProfileDTO
            {
                Username = "test2@gmail.com",
                FirstName = "User",
                LastName = "Test",
                City = "Japan",
                ContactNumber = "234564626",
                BankAccountNumber = "13189456165"
            };
            //Act
            var result = profileService.Add(userprofileDTO);
            profileService.Add(userprofileDIO2);
        }

        [Test]
        public void GetProfiles()
        {
            //Arrange
            IUserProfileService profileService=new UserProfileService(repository);
            
            //Act
           var result = profileService.GetUserProifleById(1);
        
            //Assert
            Assert.IsNotNull(result);
            //Assert.AreEqual(1, result.Count());
        }

        [Test]
        public void UpdateProfile()
        {
            //Arrange
            IUserProfileService profileService = new UserProfileService(repository);
            var userprofileDTO = new UserProfileDTO()
            {
                Username = "testUser",
                FirstName = "John",
                LastName = "Dosky",
                City = "Dallas",
                ContactNumber = "123456789012345",
                BankAccountNumber = "987654321001321"
            };
            //Act
            var result = profileService.Update(testUser, UserProfileDTO);

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Dallas", result.City);
        }






    }
}
    
        
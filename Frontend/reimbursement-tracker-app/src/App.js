import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddProfile from './components/AddProfile';
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UpdateProfile';
import Menu from './components/Menu';
import UserProfiles from './components/UserProfiles';
import AddRequest from './components/AddRequest';
import Requests from './components/Requests';
import GetPayments from './components/GetPayments';
import AddPayment from './components/AddPayments';
import UserRequests from './components/UpdateRequests';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/user-profiles" element={<UserProfiles />} />
          <Route path="/add-request" element={<AddRequest/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/AddPayment" element={<AddPayment/>}/>
          <Route path="/GetPayments" element={<GetPayments/>}/>
          <Route path="/user-requests" element={<UserRequests/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
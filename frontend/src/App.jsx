import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AddCarItemPageAdmin from './pages/admin/AddCarItemPageAdmin';
import CarDashboardAdmin from './pages/admin/CarDashboardAdmin';
import EditCarForm from './pages/admin/EditCarFrom'
import DashboardEndUser from './pages/end-user/CarBorrowEndUser';
import BorrowCarForm from './pages/end-user/BorrowCarForm'
import ConfirmBorrow from './pages/end-user/ConfirmBorrow';
import ProfileEndUser from './pages/end-user/ProfileEndUser';

function App() {

  return (
    <div className="App">
      <Router>
        <>
          <Routes>
            <Route path='' element={<LandingPage />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='end-user'>
              <Route path='' index element={<ProfileEndUser/>}></Route>
              <Route path='cardashboard' element={<DashboardEndUser />}></Route>
              <Route path='cardashboard/borrowCarForm/:itemId' element={<BorrowCarForm />}></Route>
              <Route path='cardashboard/borrowCarForm/confirm' element={<ConfirmBorrow />}></Route>
            </Route>
            <Route path='admin'>
              <Route path='cardashboard' element={<CarDashboardAdmin />}></Route>
              <Route path='addcar' element={<AddCarItemPageAdmin />}></Route>
              <Route path='editcar/:itemId/:carID/:carType' element={<EditCarForm />}></Route>
            </Route>
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;

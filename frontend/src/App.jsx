import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardEndUser from './pages/end-user/DashboardEndUser';
import Register from './pages/Register';
import Login from './pages/Login';
import AddCarItemPageAdmin from './pages/admin/AddCarItemPageAdmin';
import CarDashboardAdmin from './pages/admin/CarDashboardAdmin';
import LandingPage from './pages/LandingPage';
import EditCarForm from './pages/admin/EditCarFrom'



function App() {


  return (
    <div className="App">
      <Router>
        <div className='container'>
          <Routes>
            <Route path='' element={<LandingPage />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='end-user'>
              <Route path='cardashboard' element={<DashboardEndUser />}></Route>
            </Route>
            <Route path='admin'>
              <Route path='cardashboard' element={<CarDashboardAdmin />}></Route>
              <Route path='addcar' element={<AddCarItemPageAdmin />}></Route>
              <Route path='editcar/:itemId/:carID/:carType' element={<EditCarForm />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;

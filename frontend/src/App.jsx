import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/end-user/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import AddCarItemPage from './pages/admin/AddCarItemPage';



function App() {
  

  return (
    <div className="App">
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin/addcar' element={<AddCarItemPage/>}></Route>
          <Route path='/admin/cardashboard' element={<AddCarItemPage/>}></Route>
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;

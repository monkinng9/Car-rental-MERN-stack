import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';



function App() {
  

  return (
    <div className="App">
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;

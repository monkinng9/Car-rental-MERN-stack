import React from 'react'
import AddCarItemForm from '../../components/admin/AddCarItemForm';
import { Link } from 'react-router-dom';

function AddCarItemPageAdmin() {
  return (
    <header className="App-header">
      <h1>Admin: Add Car Item {"  "} <span><Link to="/admin/cardashboard">Dashboard</Link></span></h1>
      <div><AddCarItemForm /></div>
    </header>
  )
}

export default AddCarItemPageAdmin
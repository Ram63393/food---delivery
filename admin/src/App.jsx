import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const backendURL="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add backendURL={backendURL}/>}/>\
          <Route path="/list" element={<List backendURL={backendURL}/>}/>
          <Route path="/orders" element={<Orders backendURL={backendURL}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

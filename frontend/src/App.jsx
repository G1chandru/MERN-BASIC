import React from 'react'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import {  BrowserRouter  , Routes , Route } from   "react-router-dom";
import Todolist from './pages/Todolist';
import Admin from './pages/Admin';


const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/todo" element={<Todolist />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App

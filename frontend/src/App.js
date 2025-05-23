//App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';
import Dashboard from './components/Dashboard';
import TaskAdd from './components/TaskAdd';


function App() {
  const headStyle = {
    textAlign: "center",
  }
  return (
    <div>
      <h1 className='pt-4' style={headStyle}>Task Mangement App</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/view' element={<Todo/>}></Route>
         
          <Route path='/add' element={<TaskAdd/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
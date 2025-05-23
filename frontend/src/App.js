// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';
import Dashboard from './components/Dashboard';
import TaskAdd from './components/TaskAdd';
import AuthProfile from './components/AuthProfile';

function App() {
  const headStyle = {
    textAlign: "center",
  };

  return (
    <div>
      <h1 className='pt-4' style={headStyle}>Task Management App</h1>
      <AuthProfile />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/view' element={<Todo />} />
          <Route path='/add' element={<TaskAdd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

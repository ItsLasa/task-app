import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('http://127.0.0.1:3001/getTodoList')
        .then((res) => setTodoList(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  const totalTasks = todoList.length;
  const pendingTasks = todoList.filter(task => task.status === 'Pending').length;
  const completedTasks = todoList.filter(task => task.status === 'Done').length;

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 mt-10">
      <div className="flex flex-col items-center mb-6">
        {isAuthenticated && user && (
          <>
            
            <h1 className="text-2xl font-semibold">Welcome, {user.name} 👋</h1>
          </>
        )}

{!isAuthenticated && (
  <div className="text-center ">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the Task App</h1>
    <p className="text-gray-600 mb-6">Manage your daily tasks efficiently and stay productive.</p>
    
    <img
      src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
      alt="Task Management"
      className="mx-auto mb-6 w-48 h-48"
    />

    
  </div>
)}



        
      </div>

      {/* Show summary & buttons only when signed in */}
      {isAuthenticated && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto text-center border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Task Summary</h2>
            <div className="text-gray-700 space-y-1">
              <p>Total Tasks: <span className="font-bold">{totalTasks}</span></p>
              <p>Pending: <span className="text-yellow-600 font-semibold">{pendingTasks}</span></p>
              <p>Completed: <span className="text-green-600 font-semibold">{completedTasks}</span></p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              to="/view"
              className="bg-gray-900 hover:bg-gray-700 text-white px-5 py-2 rounded transition"
            >
              View Tasks
            </Link>
            <Link
              to="/add"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded transition"
            >
              Add Task
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

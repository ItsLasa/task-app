import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/getTodoList')
      .then((res) => setTodoList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const totalTasks = todoList.length;
  const pendingTasks = todoList.filter(task => task.status === 'Pending').length;
  const completedTasks = todoList.filter(task => task.status === 'Done').length;

  return (
    <div className="p-8 mt-10">
      <h1 className="text-2xl  mb-4 text-center">Welcome to the Dashboard</h1>

      {/* Task Summary */}
      <div className="bg-green-100 p-4 rounded shadow mb-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">Task Summary</h2>
        <p>Total Tasks: <span className="font-bold">{totalTasks}</span></p>
        <p>Pending: <span className="text-yellow-700 font-semibold">{pendingTasks}</span></p>
        <p>Completed: <span className="text-green-700 font-semibold">{completedTasks}</span></p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center items-center">
        <Link to="/view" className="bg-gray-800 text-white px-4 py-2 rounded">View Tasks</Link>
        <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</Link>
      </div>
    </div>
  );
};

export default Dashboard;

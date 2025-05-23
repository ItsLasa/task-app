import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function TaskAdd() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedAssigned, setEditedAssigned] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newAssigned, setNewAssigned] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");

    // Fetch tasks from database
    useEffect(() => {
        axios.get('http://127.0.0.1:3001/getTodoList')
            .then(result => {
                setTodoList(result.data)
            })
            .catch(err => console.log(err))
    }, [])

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTitle(rowData.title);
            setEditedDescription(rowData.description);
            setEditedAssigned(rowData.assigned);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline ? new Date(rowData.deadline).toISOString().slice(0, 16) : "");
        } else {
            setEditableId(null);
            setEditedTitle("");
            setEditedDescription("");
            setEditedAssigned("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };

    // Function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if (!newTitle || !newDescription || !newAssigned || !newStatus) {
            alert("Title, Description, Assigned, and Status fields must be filled out.");
            return;
        }

        axios.post('http://127.0.0.1:3001/addTodoList', { 
            title: newTitle, 
            description: newDescription, 
            assigned: newAssigned, 
            status: newStatus, 
            deadline: newDeadline 
        })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Function to save edited data to the database
    const saveEditedTask = (id) => {
        const editedData = {
            title: editedTitle,
            description: editedDescription,
            assigned: editedAssigned,
            status: editedStatus,
            deadline: editedDeadline,
        };

        // Validate required fields
        if (!editedTitle || !editedDescription || !editedAssigned || !editedStatus) {
            alert("Title, Description, Assigned, and Status fields must be filled out.");
            return;
        }

        // Updating edited data to the database through updateById API
        axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData)
            .then(result => {
                console.log(result);
                setEditableId(null);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Delete task from database
    const deleteTask = (id) => {
        axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id)
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="text-center">Todo List</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Assigned To</th>
                                    <th>Status</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {Array.isArray(todoList) ? (
                                <tbody>
                                    {todoList.map((data) => (
                                        <tr key={data._id}>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTitle}
                                                        onChange={(e) => setEditedTitle(e.target.value)}
                                                    />
                                                ) : (
                                                    data.title
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedDescription}
                                                        onChange={(e) => setEditedDescription(e.target.value)}
                                                    />
                                                ) : (
                                                    data.description
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedAssigned}
                                                        onChange={(e) => setEditedAssigned(e.target.value)}
                                                    />
                                                ) : (
                                                    data.assigned
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <select
                                                        className="form-control"
                                                        value={editedStatus}
                                                        onChange={(e) => setEditedStatus(e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Done">Done</option>
                                                    </select>
                                                ) : (
                                                    data.status
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        value={editedDeadline}
                                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                                    />
                                                ) : (
                                                    data.deadline ? new Date(data.deadline).toLocaleString() : 'No deadline'
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}>
                                                        Edit
                                                    </button>
                                                )}
                                                <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="6">Loading tasks...</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <h2 className="text-center">Add Task</h2>
                    <form className="bg-light p-4">
                        <div className="mb-3">
                            <label>Title</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Description"
                                onChange={(e) => setNewDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Assigned To</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Assignee"
                                onChange={(e) => setNewAssigned(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select
                                className="form-control"
                                onChange={(e) => setNewStatus(e.target.value)}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Deadline (optional)</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <button onClick={addTask} className="btn btn-success">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskAdd;
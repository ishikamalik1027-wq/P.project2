import { useState, useEffect } from "react";
import api from "../axiosConfig";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // GET TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //  ADD TASK
  const addTask = async () => {
    if (!title || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/tasks", { title, dueDate });

    console.log("TASK ADDED:", res.data);
      setTitle("");
      setDueDate("");
      fetchTasks(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  //  DELETE TASK (FIXED)
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* ADD FORM */}
      <div className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id} className="border">
                <td className="p-2">{task.title}</td>
                <td className="p-2">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;

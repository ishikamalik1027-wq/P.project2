import { useState, useEffect } from "react";
import api from "../axiosConfig";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Active");

  const [editingProject, setEditingProject] = useState(null);

  // GET CLIENTS
  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // GET PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD PROJECT
  const addProject = async () => {

    if (!name || !client) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await api.post("/projects", {
        name,
        client,
        status
      });

      setProjects([...projects, res.data]);

      setName("");
      setClient("");
      setStatus("Active");

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      console.log("Deleting ID:", id);

      await api.delete(`/projects/${id}`);

      setProjects(
        projects.filter(project => project._id !== id)
      );

    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  // UPDATE PROJECT
  const updateProject = async () => {
    try {
      const res = await api.put(
        `/projects/${editingProject._id}`,
        editingProject
      );

      setProjects(
        projects.map(project =>
          project._id === editingProject._id ? res.data : project
        )
      );

      setEditingProject(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Projects
      </h2>

      {/*  ADD PROJECT */}
      <div className="space-y-2 mb-6">

        <input
          className="border p-2 w-full"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        >
          <option value="">Select Client</option>

          {clients.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Pending</option>
        </select>

        <button
          onClick={addProject}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>

      </div>

      {/* TABLE */}
      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Project</th>
            <th className="p-2">Client</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>

          {projects.map(project => (

            <tr key={project._id} className="border">

              <td className="p-2">{project.name}</td>

              {/* Show client name */}
              <td className="p-2">
                {
                  project.clientId?.name || "N/A"
                }
              </td>

              <td className="p-2">{project.status}</td>

              <td className="p-2">

                <button
                  onClick={() => setEditingProject(project)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* EDIT FORM */}
      {editingProject && (

        <div className="mt-6 border p-4 bg-gray-100">

          <h3 className="text-xl font-bold mb-2">
            Edit Project
          </h3>

          <input
            className="border p-2 mb-2 w-full"
            value={editingProject.name}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                name: e.target.value
              })
            }
          />

          <select
            className="border p-2 mb-2 w-full"
            value={editingProject.clientId}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                clientId: e.target.value
              })
            }
          >
            {clients.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 mb-2 w-full"
            value={editingProject.status}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                status: e.target.value
              })
            }
          >
            <option>Active</option>
            <option>Pending</option>
          </select>

          <button
            onClick={updateProject}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>

          <button
            onClick={() => setEditingProject(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      )}

    </div>
  );
}

export default Projects;

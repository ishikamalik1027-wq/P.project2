import { useState, useEffect } from "react";
import api from "../axiosConfig";

function Clients() {

  const [clients, setClients] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [search, setSearch] = useState("");

  const [editingClient, setEditingClient] = useState(null);

  // GET CLIENTS
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD CLIENT
  const addClient = async () => {

    if (!name || !email || !company) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await api.post("/clients", {
        name,
        email,
        company
      });

      setClients([...clients, res.data]);

      setName("");
      setEmail("");
      setCompany("");

    } catch (err) {
      console.log("ADD CLIENT ERROR:", err.response?.data || err.message);
      alert("Failed to add client ❌");
    }
  };

  // DELETE CLIENT
  const deleteClient = async (id) => {
    try {
      await api.delete(`/clients/${id}`);

      setClients(
        clients.filter(client => client._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE CLIENT
  const updateClient = async () => {
    try {
      const res = await api.put(
        `/clients/${editingClient._id}`,
        editingClient
      );

      setClients(
        clients.map(client =>
          client._id === editingClient._id ? res.data : client
        )
      );

      setEditingClient(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Clients
      </h2>

      {/* SEARCH */}
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search Client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ADD CLIENT */}
      <div className="space-y-2 mb-6">

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          onClick={addClient}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>

      </div>

      {/* TABLE */}
      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Company</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>

          {clients
            .filter(client =>
              client.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((client) => (

              <tr key={client._id} className="border">

                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.company}</td>

                <td className="p-2">

                  <button
                    onClick={() => setEditingClient(client)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteClient(client._id)}
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
      {editingClient && (

        <div className="mt-6 border p-4 bg-gray-100">

          <h3 className="text-xl font-bold mb-2">
            Edit Client
          </h3>

          <input
            className="border p-2 mb-2 w-full"
            value={editingClient.name}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                name: e.target.value
              })
            }
          />

          <input
            className="border p-2 mb-2 w-full"
            value={editingClient.email}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                email: e.target.value
              })
            }
          />

          <input
            className="border p-2 mb-2 w-full"
            value={editingClient.company}
            onChange={(e) =>
              setEditingClient({
                ...editingClient,
                company: e.target.value
              })
            }
          />

          <button
            onClick={updateClient}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </button>

          <button
            onClick={() => setEditingClient(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      )}

    </div>
  );
}

export default Clients;

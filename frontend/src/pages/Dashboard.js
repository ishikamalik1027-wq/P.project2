import { useState, useEffect } from "react";
import api from "../axiosConfig";
import { Bar } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [logs, setLogs] = useState([]);

  //LOAD ALL DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clientsRes = await api.get("/clients");
      const projectsRes = await api.get("/projects");
      const logsRes = await api.get("/time");

      setClients(clientsRes.data);
      setProjects(projectsRes.data);
      setLogs(logsRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  //PROJECT STATUS
  const activeProjects = projects.filter(
    p => p.status === "Active"
  ).length;

  const pendingProjects = projects.filter(
    p => p.status === "Pending"
  ).length;

  // TOTAL HOURS
  const totalHours = logs.reduce(
  (sum, log) => sum + Number(log.hours || log.duration || 0),
  0
);


  // TOTAL BUDGET
  const totalBudget = projects.reduce(
    (sum, project) => sum + Number(project.budget || 0),
    0
  );

  // USED BUDGET
  const usedBudget = projects.reduce((sum, project) => {

  const projectHours = logs
    .filter(log => log.projectId?._id === project._id)
    .reduce((s, l) => s + Number(l.hours || l.duration || 0), 0);

  return sum + (projectHours * (project.hourlyRate || 0));

}, 0);


  //  REMAINING
  const remainingBudget = totalBudget - usedBudget;

  //  CHART DATA
  const chartData = {
  labels: ["Clients", "Projects", "Active", "Pending", "Hours"],
  datasets: [
    {
      label: "Dashboard Stats",
      data: [
        clients.length,
        projects.length,
        activeProjects,
        pendingProjects,
        totalHours
      ],
      backgroundColor: [
        "#3B82F6",
        "#10B981",
        "#8B5CF6",
        "#EF4444",
        "#F59E0B"
      ]
    }
  ]
};


  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      {/* STATS */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-4 rounded hover:scale-105 transition">
          Total Clients
          <h3 className="text-2xl">{clients.length}</h3>
        </div>

        <div className="bg-green-500 text-white p-4 rounded hover:scale-105 transition">
          Total Projects
          <h3 className="text-2xl">{projects.length}</h3>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded hover:scale-105 transition">
          Active Projects
          <h3 className="text-2xl">{activeProjects}</h3>
        </div>

        <div className="bg-red-500 text-white p-4 rounded hover:scale-105 transition">
          Pending Projects
          <h3 className="text-2xl">{pendingProjects}</h3>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded hover:scale-105 transition">
          Used Budget
          <h3 className="text-2xl">₹{usedBudget}</h3>
        </div>

        <div className="bg-indigo-500 text-white p-4 rounded hover:scale-105 transition">
          Remaining Budget
          <h3 className="text-2xl">₹{remainingBudget}</h3>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white p-6 shadow rounded">
        <Bar data={chartData} />
      </div>

    </div>

  );
}

export default Dashboard;

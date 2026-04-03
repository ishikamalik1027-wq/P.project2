import { useState, useEffect } from "react";
import api from "../axiosConfig";
import jsPDF from "jspdf";

function TimeEntry() {

  const [projects, setProjects] = useState([]);
  const [logs, setLogs] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // DATE FILTER
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


useEffect(() => {

  api.get("/projects")
    .then(res => setProjects(res.data));

  api.get("/time/unbilled")
    .then(res => setLogs(res.data));

}, []);


  // ADD TIME
  const addTime = () => {

    const newLog = {
      projectId,
      hours,
      date,
      description
    };

    api.post("/time", newLog)
  .then(res => {
    setLogs([...logs, res.data]);
  });
  }

  // FILTER LOGS

  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.date);

    return (
      (!startDate || logDate >= new Date(startDate)) &&
      (!endDate || logDate <= new Date(endDate))
    );
  });

  //  GENERATE PDF

  const generateInvoice = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE", 80, 10);

    let y = 30;
    let total = 0;

    filteredLogs.forEach((log) => {

      doc.text(
  `${log.projectId?.clientId?.name || "Client"} | ${log.projectId?.name}`,
  10,
  y
);


      doc.text(`${log.hours || log.duration} hrs`, 150, y);

      total += Number(log.hours || log.duration);

      y += 10;
    });

    doc.text(`Total: ₹${total * 500}`, 10, y + 10);

    doc.save("invoice.pdf");

    markAsBilled();
  };

  // MARK AS BILLED

  const markAsBilled = () => {

    const ids = filteredLogs.map(log => log._id);

    api.put("/time/mark-billed", { ids })
  .then(() => {
    alert("Invoice Generated!");
    setLogs([]);
  });

  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Manual Time Entry
      </h2>

      {/* ===================== */}
      {/* DATE FILTER */}
      {/* ===================== */}
      <div className="flex gap-2 mb-4">

        <input
          type="date"
          className="border p-2"
          placeholder="Start date"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2"
          placeholder="End date"
          onChange={(e) => setEndDate(e.target.value)}
        />

      </div>

      {/* ===================== */}
      {/* FORM */}
      {/* ===================== */}
      <div className="space-y-2 mb-6">

        <select
          className="border p-2 w-full"
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option>Select Project</option>

          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}

        </select>

        <input
          className="border p-2 w-full"
          placeholder="Hours Worked"
          onChange={(e) => setHours(e.target.value)}
        />

        {/* <input
          type="date"
          className="border p-2 w-full"
          onChange={(e) => setDate(e.target.value)}
        /> */}

        <input
          className="border p-2 w-full"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTime}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Time
        </button>

      </div>

      {/* ===================== */}
      {/* TABLE */}
      {/* ===================== */}
      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Client</th>
            <th className="p-2">Project</th>
            <th className="p-2">Hours</th>
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>

        <tbody>

          {filteredLogs.map(log => (
            <tr key={log._id}>

              <td className="p-2">
                {log.projectId?.clientId?.name || "—"}
              </td>

              <td className="p-2">
                {log.projectId?.name}
              </td>

              <td className="p-2">
                {log.hours || log.duration}
              </td>

              <td className="p-2">
                {log.date}
              </td>

              <td className="p-2">
                {log.description}
              </td>

            </tr>
          ))}

        </tbody>
      </table>

      {/* ===================== */}
      {/* PDF BUTTON */}
      {/* ===================== */}
      <button
        onClick={generateInvoice}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Generate Invoice PDF
      </button>

    </div>
  );
}

export default TimeEntry;

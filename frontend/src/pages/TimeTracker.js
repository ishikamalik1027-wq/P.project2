import { useState, useEffect } from "react";
import api from "../axiosConfig"; 

function TimeTracker() {

  const [currentLog, setCurrentLog] = useState(
    JSON.parse(localStorage.getItem("currentLog"))
  );

  const [seconds, setSeconds] = useState(
    Number(localStorage.getItem("seconds")) || 0
  );

  const [running, setRunning] = useState(
    localStorage.getItem("running") === "true"
  );

  // TIMER LOGIC
  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  // SAVE STATE
  useEffect(() => {
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("running", running);
    localStorage.setItem("currentLog", JSON.stringify(currentLog));
  }, [seconds, running, currentLog]);

  // start
  const startTimer = () => {

    api.post("/time/start", {
  projectId: "123"
})
.then(res => {
  setCurrentLog(res.data);
  setRunning(true);
});
  };

  // STOP
  const stopTimer = () => {

    if (!currentLog) {
      alert("Start timer first!");
      return;
    }

    api.post(`/time/stop/${currentLog._id}`)
.then(() => {
  setCurrentLog(null);
  setRunning(false);
  setSeconds(0);
  alert("Time Logged!");
});
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Time Tracker
      </h2>

      {/* ⏱️ TIMER UI */}
      <h3 className="text-xl mb-4">
        ⏱️ {seconds} sec
      </h3>

      <button
        onClick={startTimer}
        disabled={running}
        className="bg-green-500 text-white px-4 py-2 rounded mr-4"
      >
        Start Timer
      </button>

      <button
        onClick={stopTimer}
        disabled={!running}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Stop Timer
      </button>

    </div>
  );
}

export default TimeTracker;

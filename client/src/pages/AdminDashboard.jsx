import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../services/api";

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchTickets() {
      const data = await getAllTickets(token);

      if (data.tickets) {
        setTickets(data.tickets);
      }
    }

    fetchTickets();
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }

  return (
    <div>
      <h1>Thread</h1>

      <h2>Admin Dashboard</h2>

      <p>Welcome, {user?.name}</p>

      <button onClick={handleLogout}>Logout</button>

      <h2>Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              onClick={() => navigate(`/admin/tickets/${ticket._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{ticket.title}</h3>

              <p>{ticket.description}</p>

              <p>Priority: {ticket.priority}</p>

              <p>Status: {ticket.status}</p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
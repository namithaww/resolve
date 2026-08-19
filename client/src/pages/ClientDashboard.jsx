import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyTickets } from "../services/api";

function ClientDashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTickets() {
      const data = await getMyTickets(token);

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

      <div>
        <h2>Welcome, {user?.name}</h2>

        <Link to="/client/ticket">
          <button>Raise Ticket</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets raised yet.</p>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <div key={ticket._id}>
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

export default ClientDashboard;
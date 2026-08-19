import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById } from "../services/api";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTicket() {
      const data = await getTicketById(id, token);

      if (data.ticket) {
        setTicket(data.ticket);
      }
    }

    fetchTicket();
  }, [id, token]);

  if (!ticket) {
    return <p>Loading ticket...</p>;
  }

  return (
    <div>
      <button onClick={() => navigate("/admin")}>
        ← Back to Tickets
      </button>

      <h1>{ticket.title}</h1>

      <p>{ticket.description}</p>

      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <p>
        <strong>Status:</strong> {ticket.status}
      </p>

      <hr />

      <section>
        <h2>AI Analysis</h2>

        <p>
          AI analysis will appear here after we connect
          the OpenAI service.
        </p>
      </section>

      <hr />

      <section>
        <h2>Git Activity</h2>

        <p>
          Repository information and code changes will
          appear here after Git integration.
        </p>
      </section>

      <hr />

      <button>
        Mark as Resolved
      </button>
    </div>
  );
}

export default TicketDetails;
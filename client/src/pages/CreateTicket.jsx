import { useState } from "react";
import { createTicket } from "../services/api";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = await createTicket(
      {
        title,
        description,
        priority,
      },
      token
    );

    if (data.ticket) {
      alert("Ticket created");

      setTitle("");
      setDescription("");
      setPriority("medium");
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <h1>Raise a Ticket</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;
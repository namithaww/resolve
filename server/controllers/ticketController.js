const ticketService = require("../services/ticketService");

async function createTicket(req, res) {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const ticket = await ticketService.createTicket({
      title,
      description,
      priority,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create ticket",
    });
  }
}

async function getAllTickets(req, res) {
  try {
    const tickets = await ticketService.getTickets();

    res.json({
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
}

async function getMyTickets(req, res) {
  try {
    const tickets = await ticketService.getTicketsByUser(
      req.user.userId
    );

    res.json({
      tickets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
}

async function getTicket(req, res) {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json({
      ticket,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch ticket",
    });
  }
}

module.exports = {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicket,
};
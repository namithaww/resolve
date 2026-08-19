const { getDB } = require("../config/db");

async function createTicket({ title, description, priority, userId }) {
  const db = getDB();

  const ticket = {
    title,
    description,
    priority: priority || "medium",
    status: "open",
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("tickets").insertOne(ticket);

  return {
    ...ticket,
    _id: result.insertedId,
  };
}

async function getTickets() {
  const db = getDB();

  return db
    .collection("tickets")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

async function getTicketsByUser(userId) {
  const db = getDB();

  return db
    .collection("tickets")
    .find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .toArray();
}

async function getTicketById(ticketId) {
  const db = getDB();

  const { ObjectId } = require("mongodb");

  return db.collection("tickets").findOne({
    _id: new ObjectId(ticketId),
  });
}

module.exports = {
  createTicket,
  getTickets,
  getTicketsByUser,
  getTicketById,
};
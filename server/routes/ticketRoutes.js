const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicket,
} = require("../controllers/ticketController");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("client"),
  createTicket
);

router.get(
  "/my",
  authenticate,
  authorize("client"),
  getMyTickets
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllTickets
);

router.get(
  "/:id",
  authenticate,
  getTicket
);

module.exports = router;
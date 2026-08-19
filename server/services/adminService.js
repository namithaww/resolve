const { getDB } = require("../config/db");
const bcrypt = require("bcryptjs");

async function createAdmin({ name, email, password }) {
  const db = getDB();

  const existingAdmin = await db.collection("users").findOne({
    email,
  });

  if (existingAdmin) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = {
    name,
    email,
    password: hashedPassword,
    role: "admin",
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(admin);

  return {
    id: result.insertedId,
    name,
    email,
    role: "admin",
  };
}

module.exports = {
  createAdmin,
};
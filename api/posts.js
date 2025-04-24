// api/posts.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method === "POST") {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      const user = await prisma.user.create({
        data: { name, location },
      });

      return res.status(200).json({ message: "Saved User", id: user.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};

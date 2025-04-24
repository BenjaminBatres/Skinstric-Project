const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "PUT") {
    const { id, image } = req.body;

    if (!id || !image) {
      return res.status(400).json({ message: "ID and image are required" });
    }

    try {
      await prisma.user.update({
        where: { id: parseInt(id) },
        data: { image },
      });

      return res.status(200).json({ message: "Image uploaded successfully!" });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};

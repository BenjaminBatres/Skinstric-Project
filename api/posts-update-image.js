// api/update-image.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Image put request

module.exports = async (req, res) => {
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
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};

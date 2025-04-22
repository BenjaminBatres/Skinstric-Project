// api/posts.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  // Handling POST requests to create a new user
  if (req.method === 'POST') {
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

  // Handling PUT requests to update user image
  if (req.method === 'PUT') {
    const { id } = req.query;  // Use query params for dynamic routes in serverless
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
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

  // Fallback for unsupported methods
  return res.status(405).json({ message: "Method Not Allowed" });
};

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const prisma = new PrismaClient();

app.post("/api/posts", async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await prisma.user.create({
      data: { name, location },
    });

    res.json({ message: "Saved User", id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { image },
    });

    res.json({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

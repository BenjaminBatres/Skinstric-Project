// api/posts.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    try {
      const user = await prisma.user.create({
        data: { name, location },
      });
      return res.status(200).json({ message: 'Saved User', id: user.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

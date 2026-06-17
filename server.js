const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Error:', err));

// ─── SCHEMAS ───────────────────────────────────────
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// ─── TEST ROUTE ────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// ─── ROUTES ────────────────────────────────────────
app.get('/api/blogs', async (req, res) => {
  try {
    console.log('Fetching blogs...');
    const blogs = await Blog.find().sort({ date: -1 });
    console.log('Blogs found:', blogs.length);
    res.json(blogs);
  } catch (err) {
    console.log('Blog error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Message.create({ name, email, message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.log('Contact error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── START SERVER ──────────────────────────────────
app.listen(8000, () => {
  console.log('🚀 Server running on http://localhost:8000');
});
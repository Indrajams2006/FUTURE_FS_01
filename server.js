const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Error:', err));

const messageSchema = new mongoose.Schema({
  name: String, email: String, message: String,
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const blogSchema = new mongoose.Schema({
  title: String, content: String,
  date: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

const adminSchema = new mongoose.Schema({
  email: String, password: String
});
const Admin = mongoose.model('Admin', adminSchema);

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.post('/api/admin/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.json({ message: 'Admin already exists' });
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed });
    res.json({ success: true, message: 'Admin created!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/blogs', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
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
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📩 Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(8000, () => {
  console.log('🚀 Server running on http://localhost:8000');
});
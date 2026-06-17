import { useState, useEffect } from "react";

function Dashboard({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/api/messages", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setMessages(data) : setMessages([]))
      .catch(() => setMessages([]));
  }, []);

  const handleBlogSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blog)
      });
      const data = await res.json();
      if (data._id) {
        setStatus("✅ Blog post added!");
        setBlog({ title: "", content: "" });
      }
    } catch {
      setStatus("❌ Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Add Blog Post</h3>
          <input
            type="text"
            placeholder="Blog Title"
            value={blog.title}
            onChange={e => setBlog({ ...blog, title: e.target.value })}
          />
          <textarea
            placeholder="Blog Content"
            rows="5"
            value={blog.content}
            onChange={e => setBlog({ ...blog, content: e.target.value })}
          />
          <button onClick={handleBlogSubmit}>Publish Post</button>
          {status && <p>{status}</p>}
        </div>
        <div className="dashboard-card">
          <h3>Contact Messages ({messages.length})</h3>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div className="message-card" key={i}>
                <strong>{msg.name}</strong> — {msg.email}
                <p>{msg.message}</p>
                <span>{new Date(msg.date).toDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
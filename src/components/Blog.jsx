import { useState, useEffect } from "react";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
   fetch("http://localhost:8000/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
      })
      .catch(() => setBlogs([]));
  }, []);

  return (
    <section id="blog">
      <h2>Blog</h2>
      <p className="section-sub">Thoughts on tech, learning, and development.</p>
      {blogs.length === 0 ? (
        <p className="no-blog">Coming soon — stay tuned! 🚀</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 120)}...</p>
              <span>{new Date(blog.date).toDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Blog;
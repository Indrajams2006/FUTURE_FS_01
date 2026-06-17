function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      desc: "Personal portfolio built with React.js and Node.js with MongoDB database and email notifications.",
      tech: "React | Node.js | MongoDB"
    },
    {
      title: "Coming Soon",
      desc: "More projects are in development. Stay tuned!",
      tech: "..."
    }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <span className="tech-tag">{project.tech}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
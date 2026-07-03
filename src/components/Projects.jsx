function Projects() {
  const projects = [
    {
      title: "Personal Portfolio Website",
      desc: "Full stack portfolio built with React.js, Node.js, MongoDB with admin dashboard, blog section and email notifications.",
      tech: "React | Node.js | MongoDB",
      link: "https://future-fs-01-eight-ebon.vercel.app"
    },
    {
      title: "Cross-Platform Notes App",
      desc: "A notes application built for multiple platforms with real-time sync and cloud storage.",
      tech: "React Native | Node.js | MongoDB",
      link: "https://github.com/Indrajams2006/notes-app"
    },
    {
      title: "Location-Based Service App",
      desc: "An app that provides services based on user location with real-time tracking.",
      tech: "React | Maps API | Node.js",
      link: "https://github.com/Indrajams2006/location-app"
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
            <a href={project.link} target="_blank" className="project-link">
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
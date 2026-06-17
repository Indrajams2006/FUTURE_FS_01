function Skills() {
  const skills = [
    "Java", "Python", "C", "Data Structures",
    "OOP", "HTML", "CSS", "JavaScript",
    "Git & GitHub", "React.js (Learning)"
  ];

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>{skill}</div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
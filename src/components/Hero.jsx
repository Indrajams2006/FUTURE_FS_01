function Hero() {
  return (
    <section className="hero">
      <img src="/profile.jpg" alt="Indraja M S" className="profile-img" />
      <h1>Hello, I'm Indraja M S</h1>
      <h2>B.Tech Computer Science Engineering Student</h2>
      <p>
        Computer Science and Engineering student at St. Joseph's College
        of Engineering and Technology, Palai, currently entering the
        third year of the B.Tech program. Passionate about software
        development, full-stack web technologies, and problem-solving.
      </p>
      <a href="/resume.pdf" download className="hero-btn">
        Download Resume
      </a>
    </section>
  );
}

export default Hero;
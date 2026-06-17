function Navbar({ onAdminClick }) {
  return (
    <nav>
      <h2>Indraja M S</h2>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button onClick={onAdminClick} className="admin-btn">Admin</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
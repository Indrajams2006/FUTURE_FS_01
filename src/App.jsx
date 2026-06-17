import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("home");

  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard onLogout={() => setPage("home")} />;
  }

  return (
    <>
      <Navbar onAdminClick={() => setPage("login")} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
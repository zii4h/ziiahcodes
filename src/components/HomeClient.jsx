"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import useReveal from "@/hooks/useReveal";
import NavigationDock from "./NavigationDock";
import ProjectGrid from "./ProjectGrid";

const DiscordPresence = lazy(() => import("./DiscordPresence"));

const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=ziiah.codes%40gmail.com";
const emailAccountChooserUrl = `https://accounts.google.com/AccountChooser?service=mail&continue=${encodeURIComponent(gmailComposeUrl)}`;

function openEmailAccountChooser(event) {
  event.preventDefault();
  window.open(emailAccountChooserUrl, "_blank", "noopener,noreferrer,width=900,height=700");
}

  const skills = {
    "Libraries & Frameworks": ["ReactJS", "NextJS", "NodeJS", "ShadCN UI", "Astro", "Vanilla JS"],
    "Tools & Platforms": ["GitHub", "Kiro IDE", "Vite", "Vercel", "Docker", "Jira-Notion", "Figma", "Framer-Canva", "Affinity", "MS Office Tools"],
    "Programming Languages": ["JavaScript", "TypeScript", "Python", "Ruby", "HTML-CSS-JS"],
    "Database & Workbench": ["SQL", "MySQL", "Oracle", "Supabase / PostgreSQL", "XAMPP / phpMyAdmin", "Snowflake", "DataDog"],
    "Artificial Intelligence": ["OpenAI", "Claude", "Gemini", "Ollama", "MCP"], 
  };

  const devProjects = [
    {
      name: "LlamaBot", year: "2026",
      desc: "A lightweight web chatbot that runs locally using Ollama models and can be dropped into any website with minimal setup. Built for clients.",
      tech: ["ollama - llama 3.2", "JavaScript", "HTML", "CSS"],
      links: [{ label: "Source", url: "https://github.com/zii4h/LlamaBot" }],
      thumb: "/project-img/llama-bot.png",
    },
    {
      name: "Notion-to-Jupyter Converter", year: "2025",
      desc: "Python script that converts Notion markdowns into Jupyter Notebook (.ipynb), with support for code blocks and embedded images.",
      tech: ["Python", "nbformat", "Personal Use"],
      links: [{ label: "Source", url: "https://github.com/zii4h/Notion-to-Jupyter" }],
      thumb: "/project-img/jupyter.png",
    },
    {
      name: "CLIZiiah", year: "2025",
      desc: "A terminal-style interface that organizes and displays my personal links. Built as a project to learn TypeScript.",
      tech: ["TypeScript", "SCSS", "HTML"],
      links: [
        { label: "Demo", url: "https://ziiah.vercel.app/" },
        { label: "Source", url: "https://github.com/zii4h/CLIZiiah" },
      ],
      thumb: "/project-img/CLI.png",
    },
    {
      name: "JOVA", year: "2026",
      desc: "A mobile-first alternative to spreadsheets for organizing job applications, tracking hiring stages, and reviewing progress through analytics and AI-powered insights.",
      tech: ["Flutter", "Dart", "Supabase", "Gemini AI Analysis"],
      links: [
        { label: "Demo", url: "https://zii4h.github.io/Jova/" },
        { label: "Source", url: "https://github.com/zii4h/Jova" },
      ],
      thumb: "/project-img/jova.png",
    },
  ];

  const designProjects = [


    {
      name: "LoVi", year: "2025",
      desc: "Streams Lofi music with pixel interfaces and customizable ambience noise. Built for studying and relaxation.",
      tech: ["TypeScript", "JavaScript", "HTML"],
      links: [{ label: "Website", url: "https://lov1-pi.vercel.app/" }],
      thumb: "/project-img/lovi.png",
    },  
    {
      name: "Shulte Table Game", year: "2025",
      desc: "A number clicking game designed to improve focus and reaction speed by identifying numbers in sequence as quickly as possible.",
      tech: ["Figma", "HTML", "CSS", "JavaScript"],
      links: [
        { label: "Demo", url: "https://zii4h.github.io/Schulte-Table-Game/" },
        { label: "Source", url: "https://github.com/zii4h/Schulte-Table-Game" },],
      thumb: "/project-img/Schulte.png",
    },
  ];

  const certs = [
    {
      name: "Oracle Data Platform Foundations Associate",
      issuer: "Oracle",
      date: "Issued Oct 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
    {
      name: "JavaScript",
      issuer: "Cisco Networking Academy",
      date: "Issued Sep 2025",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
    },
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Issued Sep 2025",
      img: "https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.svg",
    },
    {
      name: "Introduction to SQL",
      issuer: "Simplilearn",
      date: "Issued Sep 2025",
      img: "https://tse2.mm.bing.net/th/id/OIP.2aiBRDQfykNAXEwa5kSEXQHaEK?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "CompTIA IT Fundamentals+",
      issuer: "CompTIA",
      date: "Issued Mar 2024",
      img: "https://opportunityindex.org/wp-content/uploads/2013/08/CompTIA_Logo_png_format-768x172.png",
    },
  ];

export default function HomeClient() {
  useReveal();
  const [activeTab, setActiveTab] = useState("dev");
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, []);

  return (
    <>
      <div className="top-bar" />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-current">
          <svg viewBox="0 0 24 24" className="breadcrumb-icon">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
        </span>
      </div>

      <main className="page" id="main-content">
        <div className="hero reveal">
          <div className="hero-left">
            <div className="hero-text">
              <h1 className="hero-name">hi, ziah here.<span className="blink-cursor">|</span></h1>
              <p className="hero-bio">
                - Data nerd with an SQL obsession
                <br />- Based in PH
                <br />- Still updating this site 
              </p>
              <div className="hero-socials">
                
                <div className="social-icons">
                <a
                  href={emailAccountChooserUrl}
                  onClick={openEmailAccountChooser}
                  aria-label="Email"
                  className="say-hi-button"
                >
                  <span style={{ fontSize: 13, whiteSpace: "nowrap" }}>say hi  &gt;&gt;</span>
                  <i className="fas fa-envelope"></i>
                </a>
              
                  <a href="https://github.com/zii4h" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com/in/sophiakeziahpineda" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://threads.net/@sphy.keziah" target="_blank" rel="noreferrer" aria-label="Threads">
                    <i className="fab fa-threads"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Suspense fallback={null}>
            <DiscordPresence />
          </Suspense>
        </div>

        {/* ABOUT */}
        <div className="section reveal" id="about">
          <p className="section-label">ABOUT</p>
          <p className="about-text">
            I'm <strong>Sophia Keziah</strong> <em>aka</em> "Ziah" in online spaces. I'm a
            Computer Science student with a designer's eye ~ specializing in building and scaling
            SaaS products used by end-users. I build from scratch, think in systems, and design for
            user experience.
            <br />
            <br />
            Within academe, I'm diving deeper into DBMS tools like Snowflake, PostgreSQL, and
            MySQL, built on a solid foundation in SQL. A journey I'm all in for. 🛠️
          </p>
        </div>

        {/* WORK — WIP */}
        <div className="section reveal"></div>

        {/* EDUCATION */}
        <div className="section reveal" id="education">
          <p className="section-label">EDUCATION</p>
          <div className="entry-list">
            <div className="entry">
              <div className="entry-logo">
                <img src="/photos/hau-logo.webp" alt="Holy Angel University logo" width="44" height="44" loading="lazy" decoding="async" />
              </div>
              <div className="entry-info">
                <div className="entry-title">Holy Angel University</div>
                <div className="entry-sub">Bachelor of Science in Computer Science (BSCS)</div>
              </div>
              <div className="entry-date">July 2024 – Present</div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="section reveal">
          <p className="section-label">SKILLS</p>
          <div className="skills-wrap" id="skills-wrap">
            {Object.entries(skills).map(([category, tags]) => (
              <div className="skills-category" key={category}>
                <h3 className="skills-category-label">{category}</h3>
                <div className="skills-tags-row">
                  {tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="section reveal" id="projects">
          <div className="projects-header">
            <div className="pill">PROJECTS</div>
            <h2 className="big-title">Check out my latest works</h2>
            <p className="sub-desc">
              Projects I've built, learned from, and improved. <br />
              Here are a few of my favorites.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="tab-wrap">
              <button
                className={`tab-btn ${activeTab === "dev" ? "active" : ""}`}
                onClick={() => setActiveTab("dev")}
                aria-pressed={activeTab === "dev"}
                aria-controls="projects-dev"
              >
                Development
              </button>
              <button
                className={`tab-btn ${activeTab === "design" ? "active" : ""}`}
                onClick={() => setActiveTab("design")}
                aria-pressed={activeTab === "design"}
                aria-controls="projects-design"
              >
                Design
              </button>
            </div>
          </div>
          <ProjectGrid id="projects-dev" projects={devProjects} hidden={activeTab !== "dev"} />
          <ProjectGrid id="projects-design" projects={designProjects} hidden={activeTab !== "design"} />
        </div>

        {/* CERTIFICATES */}
        <div className="section reveal">
          <div className="projects-header">
            <div className="pill">CERTIFICATES</div>
            <h2 className="big-title">Browse my achievements</h2>
            <p className="sub-desc">
              Certifications and awards that showcase my journey of continuous learning and
              expertise in the field.
            </p>
          </div>
          <div className="certs-grid" id="certs-grid">
            {certs.map((cert) => (
              <article className="cert-card reveal" key={cert.name}>
                <img className="cert-img" src={cert.img} alt={cert.issuer + " logo"} width="80" height="80" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
                <h3 className="cert-name">{cert.name}</h3>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
              </article>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="contact-section reveal">
          <div className="pill">CONTACT</div>
          <h2 className="big-title" style={{ marginBottom: "10px" }}>
            Let's Connect:
          </h2>
          <p className="contact-desc">
            Thanks for stopping by! Reach me on my{" "}
            <a href="https://threads.net/@sphy.keziah" target="_blank" rel="noreferrer" className="underline link-blue" aria-label="Threads">
              Threads
            </a>
            ,{" "}
            <a href="https://discordapp.com/users/829753058082553887" target="_blank" rel="noreferrer" className="underline link-blue" aria-label="Discord">
              Discord
            </a>
            ,{" "}
            <a href="https://linkedin.com/in/sophiakeziahpineda" target="_blank" rel="noreferrer" className="underline link-blue" aria-label="LinkedIn">
              LinkedIn
            </a>
            , or{" "}
            <a href={emailAccountChooserUrl} onClick={openEmailAccountChooser} className="underline link-blue" aria-label="Email">              email!
            </a>{" "}
            <br />
            I'm always open to questions, ideas, or even random tech chats. :)
          </p>
        </div>

        <span className="footer-note">
          © 2026 Sophia Keziah.{" "}
          <a
            href="https://github.com/zii4h/ziiahcodes"
            className="footer-link"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" style={{ fontSize: 11 }}></i>
            Source.
          </a>
        </span>
      </main>

      <NavigationDock activePage="home" onHomeClick={scrollToTop} />

      <div
        className="lanyard-fixed"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      ></div>
    </>
  );
}





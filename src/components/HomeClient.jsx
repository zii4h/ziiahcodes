"use client";

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import Link from "next/link";
import useReveal from "@/hooks/useReveal";

const DiscordPresence = lazy(() => import("./DiscordPresence"));

export default function HomeClient() {
  useReveal();
  const [activeTab, setActiveTab] = useState("dev");
  const stackRef = useRef(null);
  const skillsWrapRef = useRef(null);
  const projectsGridRef = useRef(null);
  const certsGridRef = useRef(null);

  const skills = {
    "Libraries & Frameworks": ["ReactJS", "NextJS", "NodeJS", "ShadCN UI", "Astro", "Vanilla JS"],
    "Tools & Platforms": ["GitHub", "Kiro IDE", "Vite", "Vercel", "Docker", "Jira-Notion", "Figma", "Framer-Canva", "Affinity", "MS Office Tools"],
    "Programming Languages": ["JavaScript", "TypeScript", "Python", "Ruby", "HTML-CSS-JS"],
    "Database & Workbench": ["SQL", "MySQL", "Oracle", "Supabase / PostgreSQL", "XAMPP / phpMyAdmin", "Snowflake", "DataDog"],
    "Artificial Intelligence": ["Guardrails", "Claude", "OpenAI", "Ollama", "GPT-4"],
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
      name: "Shulte Table Game", year: "2025",
      desc: "A number clicking game designed to improve focus and reaction speed by identifying numbers in sequence as quickly as possible.",
      tech: ["Figma", "HTML", "CSS", "JavaScript"],
      links: [
        { label: "Demo", url: "https://zii4h.github.io/Schulte-Table-Game/" },
        { label: "Source", url: "https://github.com/zii4h/Schulte-Table-Game" },
      ],
      thumb: "/project-img/Schulte.png",
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
  ];

  const designProjects = [
    {
      name: "LoVi", year: "2025",
      desc: "Streams Lofi music with pixel interfaces and customizable ambience noise. Built for studying and relaxation.",
      tech: ["TypeScript", "JavaScript", "HTML"],
      links: [{ label: "Website", url: "https://lov1-pi.vercel.app/" }],
      thumb: "/project-img/lovi.png",
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

  const switchTab = (tab, button) => {
    setActiveTab(tab);
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
  };

  const scrollToTop = useCallback(() => {
    const start = window.scrollY;
    const duration = 500;
    let startTime = null;
    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }, []);

  const scrollToProjects = () => {
    setActiveTab("dev");
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDesignProjects = () => {
    setActiveTab("design");
    const el = document.getElementById("projects");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    let cards = [];

    const buildCards = () => {
      stack.innerHTML = "";
      cards = [];
      const cardData = [
        { type: "coffee", bg: "#c8a882", label: "hello!!!" },
        { type: "code", bg: "#1e1e2e", label: "</>aaa" },
        { type: "stats", bg: "#1a2a4a", label: "idk what is this" },
      ];
      cardData.forEach((d, i) => {
        const el = document.createElement("div");
        el.className = "stack-card";
        const offset = cardData.length - 1 - i;
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3,
          ty = offset * 4;
        el.dataset.rot = rot;
        el.dataset.tx = tx;
        el.dataset.ty = ty;
        el.style.cssText = `z-index:${i + 1};transform:rotate(${rot}deg) translate(${tx}px,${ty}px);`;
        el.style.background = d.bg;
        el.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:flex-end;padding:12px"><span style="color:rgba(255,255,255,0.9);font-size:11px;font-weight:600">${d.label}</span></div>`;
        addDrag(el);
        stack.appendChild(el);
        cards.push(el);
      });
    };

    function addDrag(el) {
      let startX = 0, startY = 0, curX = 0, curY = 0, dragging = false;
      const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
      const getY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);
      el.addEventListener("mousedown", start);
      el.addEventListener("touchstart", start, { passive: true });
      function start(e) {
        if (el !== cards[cards.length - 1]) return;
        dragging = true;
        el.classList.add("dragging");
        startX = getX(e);
        startY = getY(e);
        el.style.transition = "none";
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", end);
        document.addEventListener("touchmove", move, { passive: false });
        document.addEventListener("touchend", end);
      }
      function move(e) {
        if (!dragging) return;
        if (e.cancelable) e.preventDefault();
        curX = getX(e) - startX;
        curY = getY(e) - startY;
        const rot = curX * 0.08;
        el.style.transform = `translate(${curX}px,${curY}px) rotate(${rot}deg)`;
      }
      function end() {
        if (!dragging) return;
        dragging = false;
        el.classList.remove("dragging");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
        if (Math.abs(curX) > 60 || Math.abs(curY) > 60) {
          const dir = curX > 0 ? 1 : -1;
          el.style.transition = "transform .35s ease,opacity .35s";
          el.style.transform = `translate(${dir * 500}px,${curY - 80}px) rotate(${dir * 30}deg)`;
          el.style.opacity = "0";
          setTimeout(() => {
            const removed = cards.pop();
            cards.unshift(removed);
            stack.insertBefore(removed, stack.firstChild);
            removed.style.transition = "none";
            removed.style.opacity = "1";
            restack();
          }, 350);
        } else {
          restack();
        }
        curX = 0;
        curY = 0;
      }
    }

    function restack() {
      cards.forEach((c, i) => {
        const isTop = i === cards.length - 1;
        const offset = cards.length - 1 - i;
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3,
          ty = offset * 4;
        c.style.zIndex = i + 1;
        if (isTop) {
          c.style.transition = "transform .25s ease";
          c.style.transform = "rotate(0deg) translate(0,0)";
        } else {
          c.style.transition = "transform .25s ease";
          c.style.transform = `rotate(${rot}deg) translate(${tx}px,${ty}px)`;
        }
      });
    }

    buildCards();
  }, []);

  useEffect(() => {
    if (skillsWrapRef.current) {
      skillsWrapRef.current.innerHTML = Object.entries(skills)
        .map(
          ([category, tags]) => `
          <div class="skills-category">
            <span class="skills-category-label">${category}</span>
            <div class="skills-tags-row">
              ${tags.map((s) => `<span class="skill-tag">${s}</span>`).join("")}
            </div>
          </div>
        `
        )
        .join("");
    }
  }, []);

  useEffect(() => {
    if (certsGridRef.current) {
      certsGridRef.current.innerHTML = certs
        .map(
          (c) => `
        <div class="cert-card reveal">
          <img class="cert-img" src="${c.img}" alt="${c.issuer} logo" onerror="this.style.display='none'" />
          <div class="cert-name">${c.name}</div>
          <div class="cert-issuer">${c.issuer}</div>
          <div class="cert-date">${c.date}</div>
        </div>
      `
        )
        .join("");
    }
  }, []);

  const currentProjects = activeTab === "dev" ? devProjects : designProjects;

  useEffect(() => {
    if (projectsGridRef.current && currentProjects.length > 0) {
      projectsGridRef.current.innerHTML = currentProjects
        .map(
          (p) => `
        <div class="project-card reveal">
          <div class="project-thumb" style="${
            p.thumb.startsWith("#")
              ? `background-color:${p.thumb};`
              : `background-image:url(${p.thumb}); background-size:cover; background-position:center;`
          }"></div>
          <div class="project-body">
            <div class="project-name">${p.name}</div>
            <div class="project-year">${p.year}</div>
            <div class="project-desc">${p.desc}</div>
            <div class="tech-wrap">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
            <div class="project-links">
              ${p.links.map((l) => `<a class="proj-link" href="${l.url}" target="_blank" rel="noreferrer">🌐 ${l.label}</a>`).join("")}
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }, [activeTab, currentProjects]);

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

      {/* Nav toggle to /misc */}
      <Link
        href="/misc"
        className="theme-toggle"
        style={{ '--toggle-rotation': '0deg' }}
        title="Misc"
      >
        <svg viewBox="0 0 24 24">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </Link>

      <div className="page">
        <div className="hero reveal">
          <div className="hero-left">
            <div className="hero-text">
              <h1 className="hero-name">hi, ziah here.<span className="blink-cursor">|</span></h1>
              <p className="hero-bio">
                - Data nerd with an SQL obsession.
                <br />- Based in PH.
                <br />- IDK what to write here.
                <br />- I like food.
              </p>
              <div className="hero-socials">
                
                <div className="social-icons">
                <a href="mailto:ziiah.codes@gmail.com" target="_blank" rel="noreferrer" aria-label="Email"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    outline: "1px solid rgba(187, 187, 187, 0.54)",
                    border: "none",
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontSize: 16,
                    opacity: 1,
                  }}>
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
                <img src="/photos/hau-logo.png" alt="Holy Angel University logo" />
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
          <div className="skills-wrap" id="skills-wrap" ref={skillsWrapRef}></div>
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
                onClick={(e) => switchTab("dev", e.target)}
              >
                Development
              </button>
              <button
                className={`tab-btn ${activeTab === "design" ? "active" : ""}`}
                onClick={(e) => switchTab("design", e.target)}
              >
                Design
              </button>
            </div>
          </div>
          <div className="projects-grid" id="projects-grid" ref={projectsGridRef}></div>
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
          <div className="certs-grid" id="certs-grid" ref={certsGridRef}></div>
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
            <a href="mailto:ziiah.codes@gmail.com" target="_blank" rel="noreferrer" className="underline link-blue" aria-label="Email">
              email!
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
      </div>

      {/* FLOATING DOCK */}
      <div className="dock">
        <div className="dock-item" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
          <span className="dock-tooltip">Home</span>
        </div>
        <div className="dock-sep"></div>
        <Link href="/misc" className="dock-item">
          <svg viewBox="0 0 24 24">
            <path d="M4 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM4 15a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="dock-tooltip">Misc</span>
        </Link>
      </div>

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

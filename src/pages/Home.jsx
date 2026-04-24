import { useState, useEffect, useRef, useCallback, lazy } from "react";
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';
const DiscordPresence = lazy(() => import('../components/DiscordPresence.jsx'));

export default function Home() {
  useReveal();
  const [activeTab, setActiveTab] = useState("dev");
  const stackRef = useRef(null);
  const skillsWrapRef = useRef(null);
  const projectsGridRef = useRef(null);
  const certsGridRef = useRef(null);

const skills = [
  "SQL",
  "Oracle",
  "PostgreSQL",
  "XAMPP",
  "DB Design",
  "React-Vite",
  "HTML-CSS-JS",
  "Python",
  "Ruby",
  "Git",
  "Jira-Notion",
  "MS Office Tools",
  "Framer-Canva",
  "Web Dev",
  "Systems Analysis",
];

  const devProjects = [
    { name: 'Lorem Project One', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
    { name: 'Lorem Project Two', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
    { name: 'Lorem Project Three', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
    { name: 'Lorem Project Four', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
    { name: 'Lorem Project Five', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
    { name: 'Lorem Project Six', year: '2025', desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tech: ['React', 'TypeScript', 'Tailwind', 'Vite'], links: ['Website', 'Source'], thumb: '#2a4a7a' },
  ];

  const designProjects = [
    { name: 'Lorem Landing Project', year: '2024', desc: 'Lorem ipsum design focused landing page for mobile application showcasing UI components.', tech: ['HTML', 'CSS', 'JavaScript'], links: ['Website', 'Source'], thumb: '#1a3a1a' },
  ];

  const certs = [
    { name: 'Lorem Certificate One', issuer: 'Lorem Org', date: 'Issued 03/03/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Lorem Certificate Two', issuer: 'Lorem Institute', date: 'Issued 02/02/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Lorem Certificate Three', issuer: 'Lorem Org', date: 'Issued 03/03/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Lorem Certificate Four', issuer: 'Lorem Microsoft', date: 'Issued 05/05/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Lorem Certificate Five', issuer: 'Lorem Microsoft', date: 'Issued 05/05/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Lorem Certificate Six', issuer: 'Lorem Microsoft', date: 'Issued 06/06/2024', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  ];

  const switchTab = (tab, button) => {
    setActiveTab(tab);
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
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
      stack.innerHTML = '';
      cards = [];
      const cardData = [
        { type: "coffee", bg: "#c8a882", label: "hello!!!" },
        { type: "code", bg: "#1e1e2e", label: "</>aaa" },
        { type: "stats", bg: "#1a2a4a", label: "idk what is this" },
      ];
      cardData.forEach((d, i) => {
        const el = document.createElement('div');
        el.className = 'stack-card';
        const offset = (cardData.length - 1 - i);
        const rot = (i % 2 === 0 ? 1 : -1) * (offset * 2.5);
        const tx = offset * 3, ty = offset * 4;
        el.dataset.rot = rot;
        el.dataset.tx = tx;
        el.dataset.ty = ty;
        el.style.cssText = `z-index:${i + 1};transform:rotate(${rot}deg) translate(${tx}px,${ty}px);`;
        if (d.type === 'lanyard') {
          el.innerHTML = `<div class="card-inner"><div class="lanyard-hole"></div><div class="avatar">SKP</div><div class="hello-badge">HELLO!</div><div class="i-am-text">test</div></div>`;
        } else {
          el.style.background = d.bg;
          el.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:flex-end;padding:12px"><span style="color:rgba(255,255,255,0.9);font-size:11px;font-weight:600">${d.label}</span></div>`;
        }
        addDrag(el);
        stack.appendChild(el);
        cards.push(el);
      });
    };

    function addDrag(el) {
      let startX = 0, startY = 0, curX = 0, curY = 0, dragging = false;
      const getX = e => e.touches ? e.touches[0].clientX : e.clientX;
      const getY = e => e.touches ? e.touches[0].clientY : e.clientY;
      el.addEventListener('mousedown', start);
      el.addEventListener('touchstart', start, { passive: true });
      function start(e) {
        if (el !== cards[cards.length - 1]) return;
        dragging = true;
        el.classList.add('dragging');
        startX = getX(e);
        startY = getY(e);
        el.style.transition = 'none';
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', end);
        document.addEventListener('touchmove', move, { passive: false });
        document.addEventListener('touchend', end);
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
        el.classList.remove('dragging');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
        document.removeEventListener('touchmove', move);
        document.removeEventListener('touchend', end);
        if (Math.abs(curX) > 60 || Math.abs(curY) > 60) {
          const dir = curX > 0 ? 1 : -1;
          el.style.transition = 'transform .35s ease,opacity .35s';
          el.style.transform = `translate(${dir * 500}px,${curY - 80}px) rotate(${dir * 30}deg)`;
          el.style.opacity = '0';
          setTimeout(() => {
            const removed = cards.pop();
            cards.unshift(removed);
            stack.insertBefore(removed, stack.firstChild);
            removed.style.transition = 'none';
            removed.style.opacity = '1';
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
        const tx = offset * 3, ty = offset * 4;
        c.dataset.rot = rot;
        c.dataset.tx = tx;
        c.dataset.ty = ty;
        c.style.zIndex = i + 1;
        if (isTop) {
          c.style.transition = 'transform .25s ease';
          c.style.transform = 'rotate(0deg) translate(0,0)';
        } else {
          c.style.transition = 'transform .25s ease';
          c.style.transform = `rotate(${rot}deg) translate(${tx}px,${ty}px)`;
        }
      });
    }

    buildCards();
  }, []);

  useEffect(() => {
    if (skillsWrapRef.current) {
      skillsWrapRef.current.innerHTML = skills
        .map(s => `<span class="skill-tag">${s}</span>`)
        .join('');
    }
  }, []);

  useEffect(() => {
    if (certsGridRef.current) {
      certsGridRef.current.innerHTML = certs.map(c => `
        <div class="cert-card reveal">
          <img class="cert-img" src="${c.img}" alt="${c.issuer} logo" onerror="this.style.display='none'" />
          <div class="cert-name">${c.name}</div>
          <div class="cert-issuer">${c.issuer}</div>
          <div class="cert-date">${c.date}</div>
        </div>
      `).join('');
    }
  }, []);

  const currentProjects = activeTab === 'dev' ? devProjects : designProjects;
  useEffect(() => {
    if (projectsGridRef.current && currentProjects.length > 0) {
      projectsGridRef.current.innerHTML = currentProjects.map(p => `
        <div class="project-card reveal">
          <div class="project-thumb" style="background:${p.thumb}">${p.name.split(':')[0]}</div>
          <div class="project-body">
            <div class="project-name">${p.name}</div>
            <div class="project-year">${p.year}</div>
            <div class="project-desc">${p.desc}</div>
            <div class="tech-wrap">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <div class="project-links">${p.links.map(l => `<span class="proj-link">🌐 ${l}</span>`).join('')}</div>
          </div>
        </div>
      `).join('');
    }
  }, [activeTab, currentProjects]);

  return (
    <>
      <div className="page">

        <div className="hero reveal">
          <div className="hero-left">
            <div className="hero-text">
              <h1 className="hero-name">Hi, I'm Ziah :)</h1>
              <p className="hero-bio">
                Yep, another dev profile. SQL geek. Curious CS student exploring data systems while building real-world experience through freelance work.
              </p>
              <div className="hero-socials">
                <span className="connect-text">let's connect!</span>
                <div className="social-icons">
                  <a href="https://github.com/zii4h" target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://linkedin.com/in/sophiakeziahpineda" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://threads.net/@sphy.keziah" target="_blank" rel="noreferrer">
                    <i className="fab fa-threads"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <DiscordPresence />
        </div>

        {/* ABOUT */}
        <div className="section reveal" id="about">
          <p className="section-label">ABOUT</p>
          <p className="about-text">
            I am a Computer Science student at{" "}
            <a href="https://www.hau.edu.ph/" className="underline" target="_blank" rel="noopener noreferrer">
              Holy Angel University
            </a> focused on data systems and database-driven development.
            {" "}
            I primarily work with SQL and relational databases such as MySQL and PostgreSQL (via Supabase), building and analyzing structured data systems. I also have experience with HTML, CSS, JavaScript, and React, which I use to support data-driven interfaces and projects.
            {" "}
            My work includes{" "}
            <a href="#projects" className="underline" onClick={scrollToProjects}>
              personal projects
            </a>{" "}
            and a{" "}
            <a onClick={scrollToDesignProjects} className="underline">
              real estate intranet system
            </a> designed to streamline internal workflows for agents.
            {" "}
            I am currently strengthening my understanding of data modeling and ERD design to better structure complex systems.
          </p>
        </div>

        {/* WORK */}
        <div className="section reveal">
          <p className="section-label">WORK EXPERIENCE</p>
          <div className="entry-list">
            <div className="entry">
              <div className="entry-logo">TEST</div>
              <div className="entry-info">
                <div className="entry-title">COMPANY NAME</div>
                <div className="entry-sub">Role</div>
              </div>
              <div className="entry-date">Jan 2024 – Jan 2024</div>
            </div>
            <div className="entry">
              <div className="entry-logo">TEST</div>
              <div className="entry-info">
                <div className="entry-title">COMPANY NAME</div>
                <div className="entry-sub">Intern</div>
              </div>
              <div className="entry-date">Jan 2024 – Jan 2024</div>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="section reveal" id="education">
          <p className="section-label">EDUCATION</p>
          <div className="entry-list">
            <div className="entry">
              <div className="entry-logo">HAU</div>
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
            <div className="pill">MY PROJECTS</div>
            <h2 className="big-title">Check out my latest works</h2>
            <p className="sub-desc">Projects I’ve built, learned from, and improved. <br/>Here are a few of my favorites.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="tab-wrap">
              <button
                className={`tab-btn ${activeTab === 'dev' ? 'active' : ''}`}
                onClick={(e) => switchTab('dev', e.target)}
              >
                Development
              </button>
              <button
                className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
                onClick={(e) => switchTab('design', e.target)}
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
            <p className="sub-desc">Certifications and awards that showcase my journey of continuous learning and expertise in the field.</p>
          </div>
          <div className="certs-grid" id="certs-grid" ref={certsGridRef}></div>
        </div>

        {/* CONTACT */}
        <div className="contact-section reveal">
          <div className="pill">CONTACT</div>
          <h2 className="big-title" style={{ marginBottom: '10px' }}>Get in Touch</h2>
          <p className="contact-desc">
            Thanks for stopping by! Looking for my next role in tech. Let's connect on{' '}
            <a href="#" className="underline link-blue">Twitter</a>,{' '}
            <a href="#" className="underline link-blue">Threads</a>{' '}
            or{' '}
            <a href="mailto:your@email.com" className="underline link-blue">email me</a>
            . I'm always open to questions, ideas, or even random tech chats. :)
          </p>
        </div>

      </div>

      {/* FLOATING DOCK */}
      <div className="dock">
        
        <div className="dock-item" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
          <span className="dock-tooltip">Home</span>
        </div>

      {/* social links *
        <div className="dock-sep"></div>
        <div className="dock-item">
          <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
          </svg>
          <span className="dock-tooltip">LinkedIn</span>
        </div>

        <div className="dock-item">
          <svg viewBox="0 0 24 24" style={{ fill: 'var(--text)', stroke: 'none' }}>
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0112 6.84c.97.005 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
          </svg>
          <span className="dock-tooltip">GitHub</span>
        </div>

        <div className="dock-item">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="dock-tooltip">Instagram</span>
        </div>
        */} 
        
        <div className="dock-sep"></div>
        <Link to="/misc" className="dock-item">
        <svg viewBox="0 0 24 24">  {/* grid icon sa dock */}
          <path d="M4 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM4 15a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
          <span className="dock-tooltip">Misc</span>
        </Link>
      </div>

      <div className="lanyard-fixed" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}></div>
    </>
  );
}
import "./index.css";
import { useState, useEffect, useRef, useCallback } from "react";

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("dev");
  const stackRef = useRef(null);
  const skillsWrapRef = useRef(null);
  const projectsGridRef = useRef(null);
  const certsGridRef = useRef(null);

  const cardData = [
    { type: "coffee", bg: "#c8a882", label: "hello!!!" },
    { type: "code", bg: "#1e1e2e", label: "</>aaa" },
    { type: "stats", bg: "#1a2a4a", label: "idk what is this" },
  ];

  const skills = [
    "test", "test", "test", "test", "testestes", "test", "test", 
    "test", "tet sete", "set", ".test", "test", "test", 
    "test", "test", "stet", "estse", "setest", "test", 
    "test", "test"
  ];

  const devProjects = [
  {name:'Lorem Project One',year:'2025',desc:'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',tech:['React','TypeScript','Tailwind','Vite'],links:['Website','Source'],thumb:'#2a4a7a'},
  {name:'Lorem Coffee App',year:'2025',desc:'Lorem ipsum dolor sit amet minimal interface for managing digital products and user interactions.',tech:['React','Node','Express','MongoDB'],links:['Website','Source'],thumb:'#3a2a1a'},
  {name:'Lorem Movie Tracker',year:'2025',desc:'Lorem ipsum movie tracking application with rating and search functionality powered by external APIs.',tech:['React','TypeScript','Vite'],links:['Website','Source'],thumb:'#1a1a2a'},
  {name:'Lorem Travel Log',year:'2025',desc:'Lorem ipsum travel journaling platform to record locations and visualize user journeys.',tech:['React','React Router','Supabase'],tech:['React','React Router','JavaScript'],links:['Website','Source'],thumb:'#1a3a2a'},
  {name:'Lorem Todo System',year:'2024–2025',desc:'Lorem ipsum task management system designed to improve productivity and workflow organization.',tech:['React','JavaScript','DaisyUI'],links:['Website','Source'],thumb:'#1a2a3a'},
  {name:'Lorem Landing Page',year:'2024',desc:'Lorem ipsum landing page designed for marketing and conversion optimization purposes.',tech:['HTML','CSS','JavaScript'],links:['Website','Source'],thumb:'#2a3a1a'},
];

const designProjects = [
  {name:'Lorem Landing Project',year:'2024',desc:'Lorem ipsum design focused landing page for mobile application showcasing UI components.',tech:['HTML','CSS','JavaScript'],links:['Website','Source'],thumb:'#1a3a1a'},
];

/* dev note: placeholder certificates data */
const certs = [
  {name:'Lorem Certificate One',issuer:'Lorem Org',date:'Issued 03/03/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name:'Lorem Certificate Two',issuer:'Lorem Institute',date:'Issued 02/02/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name:'Lorem Certificate Three',issuer:'Lorem Org',date:'Issued 03/03/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name:'Lorem Certificate Four',issuer:'Lorem Microsoft',date:'Issued 05/05/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name:'Lorem Certificate Five',issuer:'Lorem Microsoft',date:'Issued 05/05/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name:'Lorem Certificate Six',issuer:'Lorem Microsoft',date:'Issued 06/06/2024',img:'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
];

  const toggleTheme = () => {
    setDark(!dark);
  };

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
      if(!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - ease));
      if(progress < 1){
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const themeIcon = dark ? (
    <svg id="theme-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ) : (
    <svg id="theme-icon" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    let cards = [];

    const buildCards = () => {
      stack.innerHTML = '';
      cards = [];
      
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
        
      
        /* dev note: need to find a fix here. */
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
      skillsWrapRef.current.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    }
  }, []);

  useEffect(() => {
    if (certsGridRef.current) {
      certsGridRef.current.innerHTML = certs.map(c => `
        <div class="cert-card">
          <img class="cert-img" src="${c.img}" alt="${c.issuer} logo" onerror="this.style.display='none'" />
          <div class="cert-name">${c.name}</div>
          <div class="cert-issuer">${c.issuer}</div>
          <div class="cert-date">${c.date}</div>
        </div>
      `).join('');
    }
  }, []);

  const currentProjects = activeTab === 'dev' ? devProjects : designProjects;

  return (
    <>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        id="themeBtn" 
        title="Toggle theme"
      >
        {themeIcon}
      </button>

      <div className={`page ${dark ? 'dark' : ''}`}>

        <div className="hero">
          <div className="hero-left">
            <h1 className="hero-name">Hi, I'm Ziah 👋</h1>
            <p className="hero-bio">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel gravida arcu. Vestibulum feugiat, sapien ultrices fermentum congue, quam velit venenatis sem
            </p>
          </div>
          <div className="card-stack-wrap" id="cardStack" ref={stackRef}></div>
        </div>

        {/* ABOUT */}
        <div className="section">
          <p className="section-label">About</p>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,{' '}
            <a href="#" className="underline">sed do eiusmod tempor</a>,{' '}
            <a href="#" className="underline">incididunt ut labore et dolore</a>{' '}
            and <a href="#" className="underline">magna aliqua ut enim ad minim</a>.{' '}
            Ut enim ad minim veniam, quis nostrud exercitation{' '}
            <a href="#" className="underline">ullamco laboris nisi ut aliquip</a>{' '}
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in{' '}
            <a href="#" className="underline">voluptate velit esse cillum dolore</a>{' '}
            eu fugiat nulla pariatur.
          </p>
        </div>

        {/* WORK */}
        <div className="section">
          <p className="section-label">Work Experience</p>
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
      <div className="section" id="education">
        <p className="section-label">Education</p>

        <div className="entry-list">

          <div className="entry">
            <div className="entry-logo">HAU</div>
            <div className="entry-info">
              <div className="entry-title">Holy Angel University</div>
              <div className="entry-sub">Bachelor's Degree in Information Technology (BSIT)</div>
            </div>
            <div className="entry-date">July 2024 – Present</div>
          </div>

          {/* SECOND ENTRY COMMENTED OUT
          <div className="entry">
            <div className="entry-logo">EA</div>
            <div className="entry-info">
              <div className="entry-title">Nicanor David Vergara High School</div>
              <div className="entry-sub">Information and Communications Technology (ICT)</div>
            </div>
            <div className="entry-date">June 2022 – Apr 2024</div>
          </div>
          */}

        </div>
      </div>

        {/* SKILLS */}
        <div className="section">
          <p className="section-label">Skills</p>
          <div className="skills-wrap" id="skills-wrap" ref={skillsWrapRef}></div>
        </div>

        {/* PROJECTS */}
        <div className="section">
          <div className="projects-header">
            <div className="pill">My Projects</div>
            <h2 className="big-title">Check out my latest works</h2>
            <p className="sub-desc">
              lorem ipsum here and there.
              
            </p>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
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
        <div className="section">
          <div className="projects-header">
            <div className="pill">Certificates</div>
            <h2 className="big-title">Browse my achievements</h2>
            <p className="sub-desc">
              my certificationssss hereee
            </p>
          </div>
          <div className="certs-grid" id="certs-grid" ref={certsGridRef}></div>
        </div>

        <div className="contact-section">
          <div className="pill">Contact</div>
          <h2 className="big-title" style={{ marginBottom: '10px' }}>
            Get in Touch
          </h2>

          <p className="contact-desc">
            Thanks for stopping by! If you want to talk, just DM me on{' '}
            <a href="#" className="underline link-blue">Twitter</a>,{' '}
            <a href="#" className="underline link-blue">Threads</a>{' '}
            or{' '}
            <a href="mailto:your@email.com" className="underline link-blue">
              email me
            </a>
            . I’m always open to questions, ideas, or even random tech chats.
          </p>
        </div>
              </div>

      <p className="back-top" onClick={scrollToTop}>
        Back to top
      </p>

      {/* FLOATING DOCK */}
      <div className="dock">
        <div className="dock-item" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10"/>
          </svg>
          <span className="dock-tooltip">Home</span>
        </div>
        <div className="dock-sep"></div>
        <div className="dock-item">
          <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none"/>
          </svg>
          <span className="dock-tooltip">LinkedIn</span>
        </div>
        <div className="dock-item">
          <svg viewBox="0 0 24 24" style={{fill: 'var(--text)', stroke: 'none'}}>
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0112 6.84c.97.005 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.16c0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z"/>
          </svg>
          <span className="dock-tooltip">GitHub</span>
        </div>
        <div className="dock-item">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          <span className="dock-tooltip">Instagram</span>
        </div>
      </div>

      {useEffect(() => {
        if (projectsGridRef.current && currentProjects.length > 0) {
          projectsGridRef.current.innerHTML = currentProjects.map(p => `
            <div class="project-card">
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
      }, [activeTab, currentProjects])}
    </>
  );
}
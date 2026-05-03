import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import Misc from './Misc.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const themeIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
    </svg>
  );

const Breadcrumb = () => (
  <div className="breadcrumb">
    {isHome ? (
      <span className="breadcrumb-current">
        <svg viewBox="0 0 24 24" className="breadcrumb-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
        </svg>
      </span>
    ) : (
      <>
        <Link to="/" className="breadcrumb-home">
          <svg viewBox="0 0 24 24" className="breadcrumb-icon" strokeWidth="6">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
        </Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">
          <svg viewBox="0 0 24 24" className="breadcrumb-page-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
          </svg>
          Misc
        </span>
      </>
    )}
  </div>
);

  
  return (
    <>
      <ScrollToTop />
      <div className="top-bar" />
      <Breadcrumb />
      <Link
        to={isHome ? "/misc" : "/"}
        className="theme-toggle"
        style={{ transform: isHome ? 'rotate(0deg)' : 'rotate(180deg)' }}
        title={isHome ? "Misc" : "Home"}
      >
        {themeIcon}
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/misc" element={<Misc />} />
      </Routes>
    </>
  );
}
import { useState, useCallback } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import Misc from './Misc.jsx';

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
          <svg viewBox="0 0 24 24" className="breadcrumb-icon">
            <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
          </svg>
        </span>
      ) : (
        <>
          <Link to="/" className="breadcrumb-home">
            <svg viewBox="0 0 24 24" className="breadcrumb-icon">
              <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
            </svg>
          </Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">
            <svg viewBox="0 0 24 24" className="breadcrumb-page-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Misc
          </span>
        </>
      )}
    </div>
  );

  return (
    <>
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
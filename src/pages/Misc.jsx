import { Link } from 'react-router-dom';

export default function Misc() {
  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
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
      </div>

      <div className="page">
        {/* misc content d2 */}
      </div>
    </>
  );
}
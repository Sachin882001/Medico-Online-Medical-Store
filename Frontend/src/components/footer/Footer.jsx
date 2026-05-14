import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-white" style={{backgroundColor:"Black"}}>
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          {/* Logo */}
          <a className="d-flex align-items-center text-white text-decoration-none">
            <span className="h4 mb-0 font-weight-bold">Medico</span>
          </a>

          {/* Copyright & Link */}
          <p className="mb-0 text-center text-white text-sm">
            © 2024 Medico —
            <Link to="/" className="text-white ms-1" rel="noopener noreferrer" target="_blank">
              @emedico
            </Link>
          </p>

          {/* Social Media Icons */}
          <div className="d-flex justify-content-center">
            {/* Facebook */}
            <a className="text-white me-3" href="#" aria-label="Facebook">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="bi bi-facebook" viewBox="0 0 16 16" width="24" height="24">
                <path d="M9.1 3H8V2c0-.6.1-1 .5-1H10V0h-2.2C6.6 0 5.7.9 5.7 2v1.3H4v2.6h1.7v7h2.7V6.9H11l.4-2.6z" />
              </svg>
            </a>

            {/* Twitter */}
            <a className="text-white me-3" href="#" aria-label="Twitter">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="bi bi-twitter" viewBox="0 0 16 16" width="24" height="24">
                <path d="M5 15c6 0 9-5 9-9v-.4a6.6 6.6 0 001.6-1.7 6.9 6.9 0 01-2 .6A3.6 3.6 0 0015 3a7.1 7.1 0 01-2.3.9A3.6 3.6 0 0010.6 2a3.6 3.6 0 00-3.6 3.6 10.2 10.2 0 01-7.5-3.8 3.6 3.6 0 001.1 4.8A3.6 3.6 0 01.7 9.8v.1A3.6 3.6 0 003 12a3.6 3.6 0 01-1.6.1A3.6 3.6 0 005 15z" />
              </svg>
            </a>

            {/* Instagram */}
            <a className="text-white me-3" href="#" aria-label="Instagram">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="bi bi-instagram" viewBox="0 0 16 16" width="24" height="24">
                <rect width={16} height={16} rx={4} />
                <path d="M8 5.5A2.5 2.5 0 105.5 8 2.5 2.5 0 008 5.5zM11.5 4a.5.5 0 01.5.5V5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5h1z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a className="text-white" href="#" aria-label="LinkedIn">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="bi bi-linkedin" viewBox="0 0 16 16" width="24" height="24">
                <path d="M3.5 3.5A2.5 2.5 0 116 6a2.5 2.5 0 01-2.5-2.5zM3 7h5v8H3V7zM7 7h5v1.5H7V7zM7 11h5v1.5H7V11zM12.5 3H14v9h-1.5V3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

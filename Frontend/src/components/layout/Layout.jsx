import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

/* eslint-disable react/prop-types */
const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

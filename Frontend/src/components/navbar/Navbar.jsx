// // import { Link, useNavigate } from "react-router-dom";
// // import SearchBar from "../searchBar/SearchBar";
// // import { useSelector } from "react-redux";

// // const Navbar = () => {
// //   // Get user from localStorage
// //   const user = JSON.parse(localStorage.getItem("users"));

// //   // Navigate
// //   const navigate = useNavigate();

// //   // Logout function
// //   const logout = () => {
// //     localStorage.removeItem("users"); // Clear only the specific key
// //     navigate("/login");
// //   };

// //   // CartItems
// //   const cartItems = useSelector((state) => state.cart);

// //   // NavList Data
// //   const navList = (
// //     <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
// //       <li className="nav-item">
// //         <Link className="nav-link" to="/" aria-label="Home">
// //           Home
// //         </Link>
// //       </li>
// //       <li className="nav-item">
// //         <Link className="nav-link" to="/allproduct" aria-label="All Products">
// //           All Product
// //         </Link>
// //       </li>
// //       {!user && (
// //         <>
// //           <li className="nav-item">
// //             <Link className="nav-link" to="/signup" aria-label="Signup">
// //               Signup
// //             </Link>
// //           </li>
// //           <li className="nav-item">
// //             <Link className="nav-link" to="/login" aria-label="Login">
// //               Login
// //             </Link>
// //           </li>
// //         </>
// //       )}
// //       {user?.role === "user" && (
// //         <li className="nav-item">
// //           <Link className="nav-link" to="/user-dashboard" aria-label="User Dashboard">
// //             User
// //           </Link>
// //         </li>
// //       )}
// //       {user?.role === "admin" && (
// //         <li className="nav-item">
// //           <Link className="nav-link" to="/admin-dashboard" aria-label="Admin Dashboard">
// //             Admin
// //           </Link>
// //         </li>
// //       )}
// //       {user && (
// //         <li className="nav-item">
// //           <button className="nav-link btn btn-link" onClick={logout} aria-label="Logout">
// //             Logout
// //           </button>
// //         </li>
// //       )}
// //       <li className="nav-item">
// //         <Link className="nav-link" to="/cart" aria-label="Cart">
// //           Cart({cartItems.length})
// //         </Link>
// //       </li>
// //     </ul>
// //   );

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-pink-600 sticky-top">
// //       <div className="container-fluid">
// //         <Link className="navbar-brand" to="/">
// //           <h2 className="text">Medico</h2>
// //         </Link>
// //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// //           <span className="navbar-toggler-icon"></span>
// //         </button>
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           {navList}
// //         </div>
// //         <SearchBar />
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice"; // Adjust the path as needed
import "../../App.css";

const Navbar = () => {
  const role = JSON.parse(localStorage.getItem("role")); // Get user role from localStorage
  const navigate = useNavigate(); // Navigate
  const dispatch = useDispatch(); // Initialize dispatch
  const cartItems = useSelector((state) => state.cart); // CartItems

  // Logout function
  const logout = () => {
    // Dispatch the resetCart action to clear the cart in Redux
    dispatch(resetCart());
    
    // Remove user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("lastName");
    localStorage.removeItem("firstName");

    // Navigate to the login page
    navigate("/login");
  };

  // NavList Data
  const navList = (
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex">
      <li className="nav-item">
        <Link className="nav-link " to="/" aria-label="Home"style={{ color: 'black' }}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " to="/allproduct" aria-label="All Products"style={{ color: 'black' }}>
          All Product
        </Link>
      </li>
      {!role && (
        <>
          <li className="nav-item">
            <Link className="nav-link " to="/signup" aria-label="Signup" style={{ color: 'black' }}>
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/login" aria-label="Login" style={{ color: 'black' }}>
              Login
            </Link>
          </li>
        </>
      )}
      {role === "USER" && (
        <li className="nav-item">
          
          <Link className="nav-link" to="/user-dashboard" aria-label="User Dashboard" style={{ color: 'black' }}>
  User
</Link>

        </li>
      )}
      {role === "ADMIN" && (
        <li className="nav-item">
          <Link className="nav-link " to="/admin-dashboard" aria-label="Admin Dashboard"style={{ color: 'black' }}>
            Admin
          </Link>
        </li>
      )}
      {role && (
        <li className="nav-item">
          <button className="nav-link btn btn-link " onClick={logout} aria-label="Logout"style={{ color: 'black' }}>
            Logout
          </button>
        </li>
      )}
      <li className="nav-item">
        <Link className="nav-link " to="/cart" aria-label="Cart"style={{ color: 'black' }}>
          Cart({cartItems.length})
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light  sticky-top" style={{backgroundColor:"#88D8C0"}}>
      <div className="container-fluid" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <h2 className=" mb-0"style={{ color: 'black' }}>Medico</h2>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex justify-content-center flex-grow-1">
          <SearchBar/> {/* Adjust the width of the SearchBar */}
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;










// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "../searchBar/SearchBar";
// import { useSelector } from "react-redux";
// import "../../App.css";

// const Navbar = () => {
//   const role = JSON.parse(localStorage.getItem("role")); // Get user role from localStorage
//   const navigate = useNavigate(); // Navigate
//   const cartItems = useSelector((state) => state.cart); // CartItems
// }

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("cart");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("lastName");
//     localStorage.removeItem("firstName");
//     navigate("/login");
//   };

//   // CartItems
//   const cartItems = useSelector((state) => state.cart);

//   // NavList Data
//   const navList = (
//     <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
//       <li className="nav-item">
//         <Link className="nav-link text-primary" to="/" aria-label="Home">
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link text-primary" to="/allproduct" aria-label="All Products">
//           All Product
//         </Link>
//       </li>
//       {!user && (
//         <>
//           <li className="nav-item">
//             <Link className="nav-link text-primary" to="/signup" aria-label="Signup">
//               Signup
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-primary" to="/login" aria-label="Login">
//               Login
//             </Link>
//           </li>
//         </>
//       )}
//       {user?.role === "user" && (
//         <li className="nav-item">
//           <Link className="nav-link text-primary" to="/user-dashboard" aria-label="User Dashboard">
//             User
//           </Link>
//         </li>
//       )}
//       {user?.role === "admin" && (
//         <li className="nav-item">
//           <Link className="nav-link text-primary" to="/admin-dashboard" aria-label="Admin Dashboard">
//             Admin
//           </Link>
//         </li>
//       )}
//       {user && (
//         <li className="nav-item">
//           <button className="nav-link btn btn-link text-primary" onClick={logout} aria-label="Logout">
//             Logout
//           </button>
//         </li>
//       )}
//       <li className="nav-item">
//         <Link className="nav-link text-primary" to="/cart" aria-label="Cart">
//           Cart({cartItems.length})
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-warning sticky-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <h2 className="text-white">Medico</h2> {/* Text color changes on hover */}
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           {navList} {/* Ensure each nav link uses the .nav-link class */}
//         </div>
//         <SearchBar />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

















// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import "../../App.css" // Import your custom CSS

// const Navbar = () => {
//   const role = JSON.parse(localStorage.getItem("role")); // Get user role from localStorage
//   const navigate = useNavigate(); // Navigate
//   const cartItems = useSelector((state) => state.cart); // CartItems

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("cart");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("lastName");
//     localStorage.removeItem("firstName");
//     navigate("/login");
//   };

//   // NavList Data
//   const navList = (
//     <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex justify-content-center">
//       <li className="nav-item">
//         <Link className="nav-link text-white" to="/" aria-label="Home">
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link className="nav-link text-white" to="/allproduct" aria-label="All Products">
//           All Products
//         </Link>
//       </li>
//       {!role && (
//         <>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/signup" aria-label="Signup">
//               Signup
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link text-white" to="/login" aria-label="Login">
//               Login
//             </Link>
//           </li>
//         </>
//       )}
//       {role === "USER" && (
//         <li className="nav-item">
//           <Link className="nav-link text-white" to="/user-dashboard" aria-label="User Dashboard">
//             User
//           </Link>
//         </li>
//       )}
//       {role === "ADMIN" && (
//         <li className="nav-item">
//           <Link className="nav-link text-white" to="/admin-dashboard" aria-label="Admin Dashboard">
//             Admin
//           </Link>
//         </li>
//       )}
//       {role && (
//         <li className="nav-item">
//           <button className="nav-link btn btn-link text-white" onClick={logout} aria-label="Logout">
//             Logout
//           </button>
//         </li>
//       )}
//       <li className="nav-item">
//         <Link className="nav-link text-white" to="/cart" aria-label="Cart">
//           Cart({cartItems.length})
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-danger">
//       <div className="container">
//         <Link className="navbar-brand text-white" to="/">
//           Medico
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           {navList}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

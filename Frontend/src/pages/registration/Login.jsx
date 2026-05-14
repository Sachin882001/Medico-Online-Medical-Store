/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }
  
    setLoading(true);
    try {

        const response = await axios.post("http://localhost:8080/api/login", userLogin);
        console.log(response.data); // Log the response to inspect the structure
        const { "jwt-token": token, role, user, firstName, lastName } = response.data;
     
      
  
      // Store the token and user info in local storage
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", JSON.stringify(role));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("firstName", JSON.stringify(firstName));
      localStorage.setItem("lastName", JSON.stringify(lastName));
  
      // Clear the login form
      setUserLogin({
        email: "",
        password: "",
      });
  
      toast.success("Login Successfully");
      setLoading(false);
  
      // Navigate based on the user's role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {loading && <Loader />}
      <div className="bg-light px-4 py-5 border border-secondary rounded shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>

        <div className="mb-3">
          <input type="email" name="email" placeholder="Email Address" value={userLogin.email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} className="form-control" />
        </div>

        <div className="mb-4">
          <input type="password" placeholder="Password" value={userLogin.password} onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} className="form-control" />
        </div>

        <div className="mb-4">
          <button type="button" onClick={userLoginFunction} className="btn btn-primary w-100">
            Login
          </button>
        </div>

        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <Link className="text-primary" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

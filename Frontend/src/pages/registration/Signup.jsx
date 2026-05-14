/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "user",
  });

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.firstName === "" ||
      userSignup.lastName === "" ||
      userSignup.mobileNumber === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/register", userSignup);

      const user = response.data;

      localStorage.setItem("users", JSON.stringify(user));

      setUserSignup({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {loading && <Loader />}
      <div
        className="bg-light px-4 py-5 border border-secondary rounded shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center text-primary mb-4">Signup</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            value={userSignup.firstName}
            onChange={(e) =>
              setUserSignup({ ...userSignup, firstName: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            value={userSignup.lastName}
            onChange={(e) =>
              setUserSignup({ ...userSignup, lastName: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Mobile Number"
            value={userSignup.mobileNumber}
            onChange={(e) =>
              setUserSignup({ ...userSignup, mobileNumber: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={userSignupFunction}
            className="btn btn-primary w-100"
          >
            Signup
          </button>
        </div>

        <div className="text-center">
          <p>
            Have an account?{" "}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

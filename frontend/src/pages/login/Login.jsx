import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.email === "admin@gmail.com" && data.password === "admin") {
        // dispatch(login(data));
        localStorage.setItem(
          "token",
          JSON.stringify({ email: data.email, role: "Admin" })
        );
        navigate("/adminHome");
        window.location.assign("/adminHome");

        toast.success("Logged In Successfully");
      } else {
        const res = await axios.post(
          `http://${window.location.hostname}:5000/user/login`,
          data
        );
        dispatch(login(res.data));
        navigate("/");

        toast.success("Logged In Successfully");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="px-md-5 px-sm-0 py-md-5 py-sm-0 bg-warning text-dark">
      <div className="mt-2">
        <Navbar />
        <div className="container-fluid bg-light py-md-5 py-sm-5  px-md-5 px-sm-0 bg-opacity-50 ">
          <div className="row">
            <div className="col-sm-4" />
            <div className="col-sm-5 ">
              <div className="card bg-success px-md-5 px-sm-0 py-md-5 py-sm-5  text-dark bg-opacity-25 mt-5 ">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h1>LOGIN PAGE</h1>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-warning">
                      Submit
                    </button>
                    <div className="mt-3">
                      <div className="form-text">
                        <Link to="/signup">
                          Not Registered yet?... Register here
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

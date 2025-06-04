import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addUser } from "../../api/user";
import { login, register } from "../../redux/authSlice";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "customer",
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
      // const res = await addUser(data);
      // localStorage.setItem("token",JSON.stringify(res.data))
      // dispatch(register(res.data));
      // navigate("/");

      const res = await axios.post(
        `http://${window.location.hostname}:5000/user/register`,
        data
      );
      dispatch(register(res.data))
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-md-5 px-sm-0 py-md-5 py-sm-0  mb-2 bg-warning text-dark">
      <div className="mt-2">
        <Navbar />
        <div className="container-fluid bg-light px-md-5 px-sm-0 py-md-5 py-sm-0  bg-opacity-50 ">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-5 ">
              <div className="card bg-success p-5 text-dark bg-opacity-25  ">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h1>CREATE ACCOUNT</h1>
                    <div className="mb-3">
                      <label for="exampleInputName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        aria-describedby="emailHelp"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
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
                      <label for="exampleInputPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword"
                        aria-describedby="passwordHelp"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputnumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputnumber"
                        aria-describedby="numberHelp"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputAddress" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputAddress"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-warning">
                      Submit
                    </button>
                    <div className="mt-3">
                      <Link className="form-text mt-5" to="/login">
                        Alredy Registered.?..Login here...
                      </Link>
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

export default Register;

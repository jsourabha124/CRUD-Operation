import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  //create state with default values
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  //navigate hook
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    //post the data to db.json
    axios
      .post("http://localhost:3031/users", values)
      //on success post, navigate back to home component
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            ></input>
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              className="form-control"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            ></input>
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();

  //navigate hook
  const navigate = useNavigate();

  //create state with default values
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  //get id from useParam hook
  useEffect(() => {
    axios
      .get("http://localhost:3031/users/" + id)
      .then((res) => {
        console.log("Read", res.data);
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    //post the data to db.json
    axios
      .put("http://localhost:3031/users/" + id, values)
      //on success post, navigate back to home component
      .then((res) => {
        console.log("update", res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Edit a User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              value={values.name}
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
              value={values.email}
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
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            ></input>
          </div>
          <button className="btn btn-success">Updte</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;

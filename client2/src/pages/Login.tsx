import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/authSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { DispatchType, rootState } from "../redux/store";

import { Button, Form } from "react-bootstrap";
import { clearError } from "../utils/clearError";
import { setCookie } from "../utils/cookie";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch<DispatchType>();
  const token = useSelector((state: rootState) => state.auth.token);

  const setErrorWithClear = (msg: string) => {
    setError(msg);
    clearError(setError);
  };

  const authUser = () => {
    setEmail(email.trim());
    setPassword(password.trim());

    if (!(email && password)) {
      setErrorWithClear("All fields are required");
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorWithClear("Invalid email address");
      return;
    }
    if (password.length < 8) {
      setErrorWithClear("Minimum password length must be 8");
      return;
    }
    if (password.length > 20) {
      setErrorWithClear("Maximum password length must be 20");
      return;
    }

    setError("");

    dispatch(loginThunk({ email, password }))
      .then((val) => val.payload)
      .then((val) => {
        if (val.success) {
          setCookie("authModule", { user: val.user, token: val.token });
          navigate("/product");
          return;
        }
        console.log(val);
        setErrorWithClear(val.msg);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) {
      navigate("/product");
      return;
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label htmlFor="email" className="col-sm-2 col-form-label">
                {" "}
                Email{" "}
              </Form.Label>
              <div className="col-sm-10">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                  id="email"
                />
              </div>
            </Form.Group>
            <div className="mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                {" "}
                Password{" "}
              </label>
              <div className="col-sm-10">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                />
              </div>
            </div>
            <div className="mb-3">
              <Link to="/resetPassword">Forgot password</Link>
            </div>
            <span style={{ color: "red", fontSize: "13px" }}> {error} </span>
            <div>
              <Button onClick={authUser}>Login</Button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Login;

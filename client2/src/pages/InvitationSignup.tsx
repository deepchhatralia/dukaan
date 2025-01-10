import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DispatchType } from "../redux/store";
import { useDispatch } from "react-redux";
import PageNotFound from "./PageNotFound";
import { Button } from "react-bootstrap";
import { clearError } from "../utils/clearError";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const InvitationSignup = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [token, setToken] = useState<string | null>("");

  const [isToken, setIsToken] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLame] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParam.get("token")) {
      setToken(searchParam.get("token"));
      setIsToken(true);
    }
    // if (!token) {
    // }
  }, []);

  const setErrorWithClear = (msg: string) => {
    setError(msg);
    clearError(setError);
  };

  const clearFields = () => {
    setFname("");
    setLame("");
    setPassword("");
    setCPassword("");
  };

  const signIn = () => {
    if (!(fname && lname && password && cpassword)) {
      setErrorWithClear("Enter all fields");
      return;
    }
    if (fname.length < 3) {
      setErrorWithClear("Minimum 3 characters required for first name");
      return;
    }
    if (fname.length > 20) {
      setErrorWithClear("Maximum 20 characters allowed for first name");
      return;
    }
    if (lname.length < 3) {
      setErrorWithClear("Minimum 3 characters required for last name");
      return;
    }
    if (lname.length > 20) {
      setErrorWithClear("Maximum 20 characters allowed for last name");
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
    if (password !== cpassword) {
      setErrorWithClear("Password does not match");
      return;
    }
    // if (password.length < 8) {
    //     setErrorWithClear("Password must be minimum 8 characters long")
    //     return;
    // }
    setErrorWithClear("");

    axios
      .post(
        `${BACKEND_URL}/staff/verifyToken`,
        { fname, lname, password, cpassword, token },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((val) => {
        setErrorWithClear(val.data.msg);
        clearFields();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-5">
      {isToken && (
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="fname" className="col-sm-2 col-form-label">
                First name{" "}
              </label>
              <div className="col-sm-10">
                <input
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  type="text"
                  className="form-control"
                  id="fname"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="col-sm-2 col-form-label">
                Last name{" "}
              </label>
              <div className="col-sm-10">
                <input
                  value={lname}
                  onChange={(e) => setLame(e.target.value)}
                  type="text"
                  className="form-control"
                  id="lname"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">
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
              <label htmlFor="password" className="col-sm-2 col-form-label">
                {" "}
                Confirm Password{" "}
              </label>
              <div className="col-sm-10">
                <input
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="cpassword"
                />
              </div>
            </div>
            <span style={{ color: "red", fontSize: "13px" }}> {error} </span>
            <div>
              <Button onClick={signIn}>Sign in</Button>
              <Link className="mx-5" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {!isToken && <PageNotFound />}
    </div>
  );
};
export default InvitationSignup;

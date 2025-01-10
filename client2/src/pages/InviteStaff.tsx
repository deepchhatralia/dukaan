import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearError } from "../utils/clearError";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const InviteStaff = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [error, setError] = useState("");

  const token = useSelector((state: rootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const setErrorWithClear = (msg: string) => {
    setError(msg);
    clearError(setError);
  };

  const sendStaffInvite = () => {
    if (!email) {
      setErrorWithClear("Please enter valid email");
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorWithClear("Please enter email");
      return;
    }
    axios
      .post(
        `${BACKEND_URL}/staff/inviteStaff`,
        { email, role },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((val) => {
        setErrorWithClear(val.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              {" "}
              Email{" "}
            </label>
            <div className="col-sm-10">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="col-sm-2 col-form-label">
              {" "}
              Role{" "}
            </label>
            <div className="dropdown" id="role">
              <select
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
              >
                <option value={0}>Admin</option>
                <option value={1}>Manager</option>
                <option value={2}>Staff</option>
              </select>
            </div>
          </div>
          <span style={{ color: "red", fontSize: "13px" }}> {error} </span>
          <div>
            <Button onClick={sendStaffInvite}>Invite</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InviteStaff;

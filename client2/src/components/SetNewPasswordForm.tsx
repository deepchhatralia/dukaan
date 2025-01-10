import React from "react";
import { Button } from "react-bootstrap";

type propType = {
  error: string;
  password: string;
  cpassword: string;
  setPassword: (password: string) => void;
  setCPassword: (cpassword: string) => void;
  changePassword: () => void;
};

const SetNewPasswordForm = ({
  error,
  password,
  cpassword,
  setPassword,
  setCPassword,
  changePassword,
}: propType) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              {" "}
              New Password{" "}
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
            <Button onClick={changePassword}>Change password</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetNewPasswordForm;

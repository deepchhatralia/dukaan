import React from "react";
import { Button } from "react-bootstrap";

type propType = {
  email: string;
  setEmail: (email: string) => void;
  sendResetLink: () => void;
  error: string;
};

const ForgotPasswordForm = ({
  email,
  setEmail,
  sendResetLink,
  error,
}: propType) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
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
          <span style={{ color: "red", fontSize: "13px" }}> {error} </span>
          <div>
            <Button onClick={sendResetLink}>Send reset link</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;

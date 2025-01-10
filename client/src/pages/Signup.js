import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk } from "../redux/authSlice";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (token) {
      navigate("/product");
      return;
    }
  });

  const clearFields = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setCpassword("");
  };

  const signup = () => {
    if (!(fname && lname && email && password && cpassword)) {
      setError("Enter all fields");
      return;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setError("Invalid email address");
      return;
    }
    if (password !== cpassword) {
      setError("Password does not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be minimum 8 characters long");
      return;
    }
    setError("");
    dispatch(signupThunk({ fname, lname, email, password, cpassword }))
      .then((val) => val.payload)
      .then((val) => {
        if (!val.success) {
          setError(val.msg);
          return;
        }
        clearFields();
        setError("User signed up");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="fname" className="col-sm-2 col-form-label">
                First Name
              </label>
              <div class="col-sm-10">
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
                Last Name
              </label>
              <div class="col-sm-10">
                <input
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  type="text"
                  className="form-control"
                  id="lname"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
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
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
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
              <label htmlFor="cpassword" className="col-sm-4 col-form-label">
                Confirm password
              </label>
              <div class="col-sm-10">
                <input
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="cpassword"
                />
              </div>
            </div>
            <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
            <div>
              {/* <input type="submit" value="Signup" className="btn btn-primary" onClick={signup} /> */}
              <button className="btn btn-primary" onClick={signup}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

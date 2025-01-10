import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import { DispatchType, rootState } from "../redux/store";
import { getCookie } from "../utils/cookie";

const MyNavbar: React.FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: rootState) => state.auth.token);
  const dispatch = useDispatch<DispatchType>();

  const handleLogout = () => {
    if (window.confirm("Logout ??")) {
      if (getCookie("authModule")) {
        dispatch(logoutUser());
      }
      navigate("/");
    }
  };

  return (
    <div
      className="container-fluid mb-4"
      style={{ backgroundColor: "rebeccapurple" }}
    >
      <nav>
        <div className="row">
          <div className="col-md-5">
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: "8px 0",
              }}
              className="navbar-nav mr-auto"
            >
              <li className="nav-item active">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              {token ? (
                <>
                  <li className="nav-item">
                    <Link to="/product" className="link">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/staff/inviteStaff" className="link">
                      Invite Staff
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/changePassword" className="link">
                      Change Password
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="link">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default MyNavbar;

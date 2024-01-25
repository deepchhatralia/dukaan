import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="container">
            <div className="navbar">
                <Link className="text-light" to="/">
                    <button className="btn btn-outline-secondary">
                        Home
                    </button>
                </Link>
                <Link className="text-light" to="/signup">
                    <button className="btn btn-outline-secondary">
                        Signup
                    </button>
                </Link>
                <Link className="text-light" to="/login">
                    <button className="btn btn-outline-secondary">
                        Login
                    </button>
                </Link>
                <Link className="text-light" to="/product">
                    <button className="btn btn-outline-secondary">
                        Products
                    </button>
                </Link>
            </div>
        </nav>
    )
}
export default Navbar
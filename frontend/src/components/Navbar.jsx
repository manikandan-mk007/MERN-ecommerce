import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>E-Commerce GenLab</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
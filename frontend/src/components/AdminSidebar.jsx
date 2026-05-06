import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <Link to="/admin/products">Manage Products</Link>

      <Link to="/admin/deals">Manage Deals</Link>

      <Link to="/admin/reports">Reports</Link>
    </div>
  );
}

export default AdminSidebar;
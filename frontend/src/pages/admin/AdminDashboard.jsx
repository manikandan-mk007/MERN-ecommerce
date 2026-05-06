import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Admin Dashboard</h1>

        <p>
          Welcome to Admin Panel.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
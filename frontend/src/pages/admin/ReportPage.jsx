import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";
import socket from "../../socket";

import AdminSidebar from "../../components/AdminSidebar";

function ReportPage() {
  const [report, setReport] = useState({
    totalProducts: 0,
    totalActiveDeals: 0,
    totalCartItems: 0,
  });

  const fetchReports = async () => {
    const res = await API.get(
      "/reports/admin"
    );

    setReport(res.data);
  };

  useEffect(() => {
    fetchReports();

    socket.on(
      "product-changed",
      fetchReports
    );

    socket.on("deal-changed", fetchReports);

    socket.on("cart-changed", fetchReports);

    return () => {
      socket.off(
        "product-changed",
        fetchReports
      );

      socket.off(
        "deal-changed",
        fetchReports
      );

      socket.off(
        "cart-changed",
        fetchReports
      );
    };
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Reports</h1>

        <div className="grid">
          <div className="card">
            <h2>
              {report.totalProducts}
            </h2>

            <p>Total Products</p>
          </div>

          <div className="card">
            <h2>
              {report.totalActiveDeals}
            </h2>

            <p>Active Deals</p>
          </div>

          <div className="card">
            <h2>
              {report.totalCartItems}
            </h2>

            <p>Cart Items</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
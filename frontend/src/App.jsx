import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import ProductListingPage from "./pages/ProductListingPage";
import CartPage from "./pages/CartPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagePage from "./pages/admin/ProductManagePage";
import DealManagePage from "./pages/admin/DealManagePage";
import ReportPage from "./pages/admin/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductManagePage />} />
        <Route path="/admin/deals" element={<DealManagePage />} />
        <Route path="/admin/reports" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
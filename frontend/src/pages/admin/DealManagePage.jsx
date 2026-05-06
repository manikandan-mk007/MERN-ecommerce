import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";

function DealManagePage() {
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    product: "",
    title: "",
    description: "",
    discountPercentage: "",
    isActive: true,
  });

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data);
  };

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchDeals();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === "isActive" ? e.target.checked : e.target.value;

    setForm({ ...form, [e.target.name]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      product: "",
      title: "",
      description: "",
      discountPercentage: "",
      isActive: true,
    });
  };

  const submitDeal = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/deals/${editingId}`, form);
    } else {
      await API.post("/deals", form);
    }

    resetForm();
    fetchDeals();
  };

  const editDeal = (deal) => {
    setEditingId(deal._id);
    setForm({
      product: deal.product?._id || "",
      title: deal.title,
      description: deal.description,
      discountPercentage: deal.discountPercentage,
      isActive: deal.isActive,
    });
  };

  const deleteDeal = async (id) => {
    await API.delete(`/deals/${id}`);
    fetchDeals();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <h1>Admin - Manage Deals</h1>

        <form className="form" onSubmit={submitDeal}>
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option value={product._id} key={product._id}>
                {product.name} - ₹{product.price}
              </option>
            ))}
          </select>

          <input
            name="title"
            placeholder="Deal Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Deal Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="discountPercentage"
            type="number"
            placeholder="Discount Percentage"
            value={form.discountPercentage}
            onChange={handleChange}
            required
          />

          <label>
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active Deal
          </label>

          <button type="submit">
            {editingId ? "Update Deal" : "Add Deal"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        <h2>Deal List</h2>

        {deals.map((deal) => (
          <div className="admin-row" key={deal._id}>
            <h3>{deal.title}</h3>
            <p>Product: {deal.product?.name}</p>
            <p>{deal.discountPercentage}% OFF</p>
            <p>{deal.isActive ? "Active" : "Inactive"}</p>

            <div className="admin-row-actions">
                <button onClick={() => editDeal(deal)}>Edit</button>
                <button onClick={() => deleteDeal(deal._id)}>Delete</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default DealManagePage;
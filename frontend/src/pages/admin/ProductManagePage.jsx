import { useEffect, useState } from "react";

import API from "../../api/axiosInstance";

import AdminSidebar from "../../components/AdminSidebar";
import ProductForm from "../../components/ProductForm";

function ProductManagePage() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stockQuantity: "",
    image: null,
  });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      name: "",
      price: "",
      description: "",
      category: "",
      stockQuantity: "",
      image: null,
    });
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    if (editingId) {
      await API.put(
        `/products/${editingId}`,
        formData
      );
    } else {
      await API.post("/products", formData);
    }

    resetForm();
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stockQuantity: product.stockQuantity,
      image: null,
    });
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);

    fetchProducts();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <h1>Manage Products</h1>

        <ProductForm
          form={form}
          handleChange={handleChange}
          submitProduct={submitProduct}
          editingId={editingId}
          resetForm={resetForm}
        />

        <div className="grid">
          {products.map((product) => (
            <div
              className="card"
              key={product._id}
            >
              <h3>{product.name}</h3>

              <p>{product.category}</p>

              <h2>₹{product.price}</h2>

              <button
                onClick={() =>
                  editProduct(product)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(product._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductManagePage;
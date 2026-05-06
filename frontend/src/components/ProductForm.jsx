function ProductForm({
  form,
  handleChange,
  submitProduct,
  editingId,
  resetForm,
}) {
  return (
    <form className="form" onSubmit={submitProduct}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stockQuantity"
        placeholder="Stock Quantity"
        value={form.stockQuantity}
        onChange={handleChange}
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
      />

      <button type="submit">
        {editingId ? "Update Product" : "Add Product"}
      </button>

      {editingId && (
        <button type="button" onClick={resetForm}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
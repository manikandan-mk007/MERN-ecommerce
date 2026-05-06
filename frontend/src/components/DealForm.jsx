function DealForm({
  form,
  handleChange,
  submitDeal,
  editingId,
}) {
  return (
    <form className="form" onSubmit={submitDeal}>
      <input
        type="text"
        name="title"
        placeholder="Deal Title"
        value={form.title}
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
        type="number"
        name="discountPercentage"
        placeholder="Discount Percentage"
        value={form.discountPercentage}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active Deal
      </label>

      <button type="submit">
        {editingId ? "Update Deal" : "Add Deal"}
      </button>
    </form>
  );
}

export default DealForm;
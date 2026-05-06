function CartItem({
  item,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.product.name}</h3>

        <p>₹{item.product.price}</p>
      </div>

      <div className="cart-actions">
        <button
          onClick={() =>
            updateQuantity(item._id, item.quantity - 1)
          }
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() =>
            updateQuantity(item._id, item.quantity + 1)
          }
        >
          +
        </button>

        <button onClick={() => removeItem(item._id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
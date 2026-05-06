function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      {product.image && (
        <img
          src={`${import.meta.env.VITE_SOCKET_URL}${product.image}`}
          alt={product.name}
          className="product-img"
        />
      )}

      <div className="card-content">
        <span className="badge">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <p className="price">₹{product.price}</p>

        <p>
          <strong>Status:</strong> {product.availabilityStatus}
        </p>

        <p>
          <strong>Stock:</strong> {product.stockQuantity}
        </p>

        <button
          disabled={product.stockQuantity <= 0}
          onClick={() => addToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
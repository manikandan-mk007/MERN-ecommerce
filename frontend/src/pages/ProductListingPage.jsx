import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import socket from "../socket";

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data.filter((deal) => deal.isActive));
  };

  const getProductDeal = (productId) => {
    return deals.find((deal) => deal.product?._id === productId);
  };

  const getDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
  };

  const addToCart = async (productId) => {
    await API.post("/cart", { productId });
    alert("Product added to cart");
  };

  useEffect(() => {
    fetchProducts();
    fetchDeals();

    socket.on("product-changed", fetchProducts);
    socket.on("deal-changed", fetchDeals);

    return () => {
      socket.off("product-changed", fetchProducts);
      socket.off("deal-changed", fetchDeals);
    };
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="grid">
        {products.map((product) => {
          const deal = getProductDeal(product._id);
          const finalPrice = deal
            ? getDiscountedPrice(product.price, deal.discountPercentage)
            : product.price;

          return (
            <div className="card" key={product._id}>
              {deal && <span className="offer-badge">{deal.discountPercentage}% OFF</span>}

              {product.image && (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-img"
                />
              )}

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <b>Category:</b> {product.category}
              </p>

              {deal ? (
                <>
                  <p className="old-price">₹{product.price}</p>
                  <h3 className="new-price">₹{finalPrice}</h3>
                </>
              ) : (
                <h3>₹{product.price}</h3>
              )}

              <p>
                <b>Status:</b> {product.availabilityStatus}
              </p>
              <p>
                <b>Stock:</b> {product.stockQuantity}
              </p>

              <button
                disabled={product.stockQuantity <= 0}
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListingPage;
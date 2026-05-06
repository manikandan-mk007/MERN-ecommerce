import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import socket from "../socket";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [deals, setDeals] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
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

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    await API.put(`/cart/${id}`, { quantity });

    fetchCart();
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`);

    fetchCart();
  };

  const totalAmount = cart.reduce((sum, item) => {
    const deal = getProductDeal(item.product._id);

    const finalPrice = deal
      ? getDiscountedPrice(item.product.price, deal.discountPercentage)
      : item.product.price;

    return sum + finalPrice * item.quantity;
  }, 0);

  useEffect(() => {
    fetchCart();
    fetchDeals();

    socket.on("cart-changed", fetchCart);
    socket.on("product-changed", fetchCart);
    socket.on("deal-changed", fetchDeals);

    return () => {
      socket.off("cart-changed", fetchCart);
      socket.off("product-changed", fetchCart);
      socket.off("deal-changed", fetchDeals);
    };
  }, []);

  return (
    <div className="container">
      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => {
        const deal = getProductDeal(item.product._id);

        const finalPrice = deal
          ? getDiscountedPrice(item.product.price, deal.discountPercentage)
          : item.product.price;

        const itemTotal = finalPrice * item.quantity;

        return (
          <div className="cart-item" key={item._id}>
            <div className="cart-left">
              <h3>{item.product.name}</h3>

              {deal ? (
                <>
                  <p>
                    Original Price:{" "}
                    <span className="old-price">
                      ₹{item.product.price}
                    </span>
                  </p>

                  <p>
                    Discount:{" "}
                    <b>{deal.discountPercentage}% OFF</b>
                  </p>

                  <p>
                    Final Price:{" "}
                    <b className="new-price">
                      ₹{finalPrice}
                    </b>
                  </p>
                </>
              ) : (
                <p>
                  Price: <b>₹{item.product.price}</b>
                </p>
              )}

              <p>
                Item Total: <b>₹{itemTotal}</b>
              </p>
            </div>

            <div className="cart-right">
              <div className="cart-qty">
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
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      {cart.length > 0 && (
        <h2 className="cart-total">
          Total: ₹{totalAmount}
        </h2>
      )}
    </div>
  );
}

export default CartPage;
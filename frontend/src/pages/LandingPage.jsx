import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import socket from "../socket";

function LandingPage() {
  const [deals, setDeals] = useState([]);

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data.filter((deal) => deal.isActive));
  };

  useEffect(() => {
    fetchDeals();

    socket.on("deal-changed", fetchDeals);

    return () => {
      socket.off("deal-changed", fetchDeals);
    };
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Buy your favourite products with best deals.</p>
      </section>

      <h2>Active Product Deals</h2>

      <div className="grid">
        {deals.map((deal) => (
          <div className="card" key={deal._id}>
            <h3>{deal.title}</h3>
            <p>{deal.description}</p>
            <h4>{deal.discountPercentage}% OFF</h4>
            <p>
              Product: <b>{deal.product?.name}</b>
            </p>
            <p>Original Price: ₹{deal.product?.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
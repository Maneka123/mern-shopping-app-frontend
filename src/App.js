import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      //.get("http://localhost:5000/api/products")
      //.get("/api/products")
      .get("https://mern-shopping-app-backend.vercel.app/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add one item to cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove one item from cart
  const removeFromCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist.quantity === 1) {
      // Remove completely if only 1 left
      setCart(cart.filter((item) => item._id !== product._id));
    } else {
      // Decrease quantity by 1
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <div className="row">
        {/* PRODUCTS */}
        <div className="col-md-8">
          <h2>Products</h2>
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 text-center mb-4">
                <img
                  src={product.image}
                  className="img-thumbnail mb-2"
                  alt={product.name}
                />
                <h5>{product.name}</h5>
                <p className="text-danger">${product.price}</p>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CART */}
        <div className="col-md-4">
          <h2>Shopping Cart</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item)}
                      >
                        -
                      </button>{" "}
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Cart is empty
                  </td>
                </tr>
              )}
              {cart.length > 0 && (
                <tr>
                  <td colSpan="3" className="text-end">
                    <b>Total</b>
                  </td>
                  <td colSpan="2">
                    <b>${total.toFixed(2)}</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
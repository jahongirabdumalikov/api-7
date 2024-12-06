import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("APIdan ma'lumot olishda xatolik yuz berdi!");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("Mahsulotni o'chirishda xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Mahsulotlar ro'yxati</h1>
      {loading && <div className="loading">Ma'lumotlar yuklanmoqda...</div>}
      {error && <div className="error">{error}</div>}
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="product-price">${product.price}</span>
            <button className="details-btn" onClick={() => window.location.href = `/product/${product.id}`}>
              Batafsil
            </button>
            <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
              O'chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import Catalog from "./components/Catalog.jsx";
import Item from "./components/Item.jsx";
import Cart from "./components/CartPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { ShopProvider } from "./components/ShopContext.jsx";
import './components/styles/button.css';

function App() {
    return (
        <ShopProvider>
            <Router>
                <div className="app">
                    <Header />

                    <nav className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/catalog">Catalog</Link>
                        <Link to="/cart" className="cart-link">Cart</Link>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/item/:id" element={<Item />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>

                    <Footer />
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;

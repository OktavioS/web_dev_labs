import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import Catalog from "./components/Catalog.jsx";
import Item from "./components/Item.jsx";
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
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/item/:id" element={<Item />} />
                    </Routes>

                    <Footer />
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;

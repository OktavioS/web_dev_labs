import React from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <Navigation />
            <Home />
            <Footer />
        </div>
    );
}

export default App;

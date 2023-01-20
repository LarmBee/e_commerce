import React, { useState, useEffect } from "react";
import { commerce } from "./Components/Products/lib/commerce";
import { Navbar, Products, Cart } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		const cart = await commerce.cart.retrieve();
		setCart(cart);
	};

	const handleAddToCart = async (productId, quantity) => {
		setCart(await commerce.cart.add(productId, quantity));
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	console.log(cart);

	return (
		<Router>
			<div>
				<Navbar totalItems={cart.total_items} />
				<Routes>
					<Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}/>
					<Route path="/cart" element={<Cart cart={cart} />}/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;

import React, { useState, useEffect } from "react";
import { commerce } from "./Components/Products/lib/commerce";
import { Navbar, Products, Cart, } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/CheckoutForm/Checkout/Checkout";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
		
	};

	const handleAddToCart = async (productId, quantity) => {
		setCart( await commerce.cart.add(productId, quantity));
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		setCart(await commerce.cart.update(productId, { quantity }));
	};

	const handleRemoveFromCart = async (productId) => {
		setCart(await commerce.cart.remove(productId));
		
	};

	const handleEmptyCart = async () => {
		setCart( await commerce.cart.empty());
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
					<Route
						path="/"
						element={
							<Products products={products} onAddToCart={handleAddToCart} />
						}
					/>
					
					<Route
						path="/cart"
						element={
							<Cart
								cart={cart}
								onUpdateCartQty={handleUpdateCartQty}
								onRemoveFromCart={handleRemoveFromCart}
								onEmptyCart={handleEmptyCart}
							/>
						}
					/>
					<Route path="/checkout" element={<Checkout/>}/>
					
				</Routes>
			</div>
		</Router>
	);
};

export default App;
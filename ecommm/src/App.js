import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import {
	fetchLoggedInUserAsync,
	selectUserInfo,
} from "./features/user/userSlice";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Protected>
				<Home />
			</Protected>
		),
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	{
		path: "/cart",
		element: (
			<Protected>
				<CartPage />
			</Protected>
		),
	},
	{
		path: "/checkout",
		element: (
			<Protected>
				<Checkout />
			</Protected>
		),
	},
	{
		path: "/product-detail/:id",
		element: (
			<Protected>
				<ProductDetailPage />
			</Protected>
		),
	},
	{
		path: "/order-success/:id",
		element: (
			<Protected>
				<OrderSuccessPage />
			</Protected>
		),
	},
	{
		path: "/orders",
		element: (
			<Protected>
				<UserOrdersPage />
			</Protected>
		),
	},
	{
		path: "/profile",
		element: (
			<Protected>
				<UserProfilePage />
			</Protected>
		),
	},
	{
		path: "*",
		element: (
			<>
				<PageNotFound />
			</>
		),
	},
]);

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUserInfo);

	useEffect(() => {
		if (user) {
			dispatch(fetchItemsByUserIdAsync(user.id));
			dispatch(fetchLoggedInUserAsync(user.id));
		}
	}, [dispatch, user]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;

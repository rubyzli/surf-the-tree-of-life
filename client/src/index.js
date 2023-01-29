import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PageHome from "./Pages/page-home";
import reportWebVitals from "./reportWebVitals";
import InputSpecies from "./Pages/page-input";
import ShowInputSpecies from "./Pages/page-show-input";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PageHome></PageHome>,

		children: [],
	},
	{
		path: "/input",
		element: <InputSpecies></InputSpecies>,

		children: [],
	}, 
	{
		path: "/show",
		element: <ShowInputSpecies></ShowInputSpecies>,

		children: [],
	}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

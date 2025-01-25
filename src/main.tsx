import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutsMain } from "./components/Layouts/LayoutsMain.tsx";
import "./index.css";
import Home from "./pages/Home/Home.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import Checkout from "./pages/Checkout/Checkout.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login/Login.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutsMain />,
    children: [
      { index: true, element: <Home /> },
      { path: "/checkout", element: <Checkout/> },
    ],
  },
  {
    path: "/Login", element: <Login/>
  },
  {
    path: "/dashboard", element: <Dashboard/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>

    </QueryClientProvider>
  </StrictMode>
);

import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import AllProducts from "./pages/AllProducts";
import AboutUs from "./pages/AboutUs";
import Error from "./pages/Error";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import CarManagement from "./pages/CarManagement";
import ManageUser from "./pages/ManageUser";
import AddNewCar from "./pages/AddNewCar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-cars"
        element={
          <PrivateRoute>
            <CarManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-cars"
        element={
          <PrivateRoute>
            <AddNewCar />
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-user"
        element={
          <PrivateRoute>
            <ManageUser />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;

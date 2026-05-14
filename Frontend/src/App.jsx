import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import ScrollTop from "./components/scrollTop/ScrollTop";


// Lazy-loaded components
const HomePage = lazy(() => import("./pages/home/HomePage"));
const NoPage = lazy(() => import("./pages/noPage/NoPage"));
const ProductInfo = lazy(() => import("./pages/productInfo/ProductInfo"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const AllProduct = lazy(() => import("./pages/allProduct/AllProduct"));
const Signup = lazy(() => import("./pages/registration/Signup"));
const Login = lazy(() => import("./pages/registration/Login"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AddProductPage = lazy(() => import("./pages/admin/AddProductPage"));
const UpdateProductPage = lazy(() => import("./pages/admin/UpdateProductPage"));
const CategoryPage = lazy(() => import("./pages/category/CategoryPage"));

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/productinfo/:productId" element={<ProductInfo />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/allproduct" element={<AllProduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} />
            <Route
              path="/user-dashboard"
              element={<UserDashboard />}
              // element={
              //   <ProtectedRouteForUser>
              //     <UserDashboard />
              //   </ProtectedRouteForUser>
              // }
            />
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
              // element={
              //   <ProtectedRouteForAdmin>
              //     <AdminDashboard />
              //   </ProtectedRouteForAdmin>
              // }
            />
            <Route
              path="/addproduct"
              element={<AddProductPage />}
              // element={
              //   <ProtectedRouteForAdmin>
              //     <AddProductPage />
              //   </ProtectedRouteForAdmin>
              // }
            />
            <Route
              path="/updateproduct/:id"
              element={<UpdateProductPage />}
              // element={
              //   <ProtectedRouteForAdmin>
              //     <UpdateProductPage />
              //   </ProtectedRouteForAdmin>
              // }
            />
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;

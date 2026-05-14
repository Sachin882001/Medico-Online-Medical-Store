import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../context/myContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

const categoryList = [{ name: "fashion" }, { name: "shirt" }, { name: "jacket" }, { name: "mobile" }, { name: "laptop" }, { name: "shoes" }, { name: "home" }, { name: "books" }];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/products/${id}`, product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [id]);

  return (
    <div className="container mt-5">
      {loading && <Loader />}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-light p-4 border rounded shadow-sm" style={{ width: "500px" }}>
          <h2 className="text-center mb-4 text-primary">Update Product</h2>

          {/* Input Fields */}
          <div className="mb-3">
            <input type="text" name="title" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} placeholder="Product Title" className="form-control" />
          </div>

          <div className="mb-3">
            <input type="number" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Product Price" className="form-control" />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
              placeholder="Product Image URL"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="form-select">
              <option value="" disabled>
                Select Product Category
              </option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              name="description"
              placeholder="Product Description"
              rows="5"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <button onClick={updateProduct} type="button" className="btn btn-primary w-100">
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;

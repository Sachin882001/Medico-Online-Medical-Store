import { useContext, useState } from "react";
import axios from "axios";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

// Category list
const categoryList = [{ name: "drugs" }, { name: "injection" }, { name: "cosmetic" }, { name: "homeo" }, { name: "pain-relief" }, { name: "devices" }, { name: "vitamins" }, { name: "first-Aid" }];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add Product Function
  const addProductFunction = async () => {
    if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      await axios.post("/api/products", product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {loading && <Loader />}
      {/* Add Product Form */}
      <div className="bg-light p-5 border border-secondary rounded shadow-lg" style={{ width: "600px" }}>
        {/* Top Heading */}
        <div className="mb-4 text-center">
          <h2 className="text-primary">Add Product</h2>
        </div>

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
            <option disabled>Select Product Category</option>
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
          ></textarea>
        </div>

        {/* Add Product Button */}
        <div className="mb-3">
          <button onClick={addProductFunction} type="button" className="btn btn-primary w-100">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

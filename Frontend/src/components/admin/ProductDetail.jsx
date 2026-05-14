import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import "../admin/ProductDetail.css";

const ProductDetail = ({ products }) => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8080/products/${id}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        getAllProductFunction(); // Refresh product list after deletion
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h1 className="display-4 text-primary font-weight-bold">All Products</h1>
        <Link to="/addproduct">
          <button className="btn btn-outline-primary">Add Product</button>
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Loader />
        </div>
      )}

      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th> {/* Updated Column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const { productId, productName, price, image, quantity } = item; // Destructure quantity
              return (
                <tr key={productId}>
                  <td>{index + 1}</td>
                  <td>
                    <img className="img-thumbnail" src={image} alt={`Image of ${productName}`} style={{ maxWidth: "100px" }} />
                  </td>
                  <td>{productName}</td>
                  <td>₹{price.toFixed(2)}</td>
                  <td>{quantity}</td> {/* Display Quantity */}
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => navigate(`/updateproduct/${productId}`)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(productId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;

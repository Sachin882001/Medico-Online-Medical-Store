import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Make the API request without adding the Authorization header
      const response = await axios.get("http://localhost:8080/api/public/products");
      const productsArray = response.data.content || [];
      setProducts(productsArray);
      setDisplayedProducts(productsArray.slice(0, 12)); // Display first 12 products
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const addCart = (item) => {
    const quantity = selectedQuantities[item.productId] || 1;

    if (quantity > item.quantity) {
      toast.error(`Cannot add more than ${item.quantity} items`);
      return;
    }

    dispatch(addToCart({
      ...item,
      quantity,
      availableQuantity: item.quantity,
    }));

    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-4">
      <div className="text-center mb-4">
        <h1 className="h4 font-weight-bold">Bestselling Products</h1>
      </div>

      <section className="text-dark">
        <div className="container py-4">
          <div className="text-center mb-4">{loading && <Loader />}</div>
          <div className="row">
            {displayedProducts.map((item, index) => {
              const { productId, productName, price, image, quantity } = item;
              return (
                <div key={index} className="col-md-3 mb-4">
                  <div className="card border-secondary shadow-sm">
                    <img
                      onClick={() => navigate(`/productinfo/${productId}`)}

                      className="card-img-top"
                      src={image}
                      alt="Product"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain', // Ensure the image is resized without being cropped
                        backgroundColor: '#f8f9fa' // Optional: Add a background color to fill any gaps
                      }}
                    />
                    <div className="card-body">
                      <h4 className="card-text text-dark">
                        {productName.length > 25 ? `${productName.substring(0, 25)}...` : productName}
                      </h4>
                      <p className="card-text text-dark">₹{price}</p>
                      <p className="card-text">Only {quantity} left</p>
                      <div className="form-group mb-3">
                        <label htmlFor={`quantity-${productId}`}>Quantity:</label>
                        <input
                          type="number"
                          id={`quantity-${productId}`}
                          className="form-control"
                          value={selectedQuantities[productId] || 1}
                          onChange={(e) => handleQuantityChange(productId, Math.min(e.target.value, quantity))}
                          min="1"
                          max={quantity}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {cartItems.some((p) => p.productId === item.productId) ? (
                          <button onClick={() => deleteCart(item)} className="btn btn-danger w-100">
                            Delete From Cart
                          </button>
                        ) : (
                          <button onClick={() => addCart(item)} className="btn btn-primary w-100">
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;

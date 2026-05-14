import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch products from the public API without including the token
      const response = await axios.get("http://localhost:8080/api/public/products");
      const productsArray = response.data.content || [];
      setProducts(productsArray);
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
  
    // Check if the selected quantity exceeds the available quantity
    if (quantity > item.quantity) {
      toast.error(`Cannot add more than ${item.quantity} items`);
      return;
    }
  
    // Dispatch the item to the cart with the selected quantity and availableQuantity
    dispatch(addToCart({
      ...item,
      quantity, // Selected quantity by the user
      availableQuantity: item.quantity, // Ensuring availableQuantity is passed
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
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4 text-2xl font-semibold">All Products</h1>
        {loading && <Loader />}
        <div className="row">
          {products.map((item) => {
            const { productId, productName, price, image, quantity } = item;
            return (
              <div key={productId} className="col-md-3 mb-4">
                <div className="card h-100 border-secondary shadow-sm">
                  <img
                    onClick={() => navigate(`/productinfo/${productId}`)}
                    className="card-img-top cursor-pointer"
                    src={image || '/medicine.jpg'}
                    alt={productName || 'Product Image'}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{productName.substring(0, 25)}</h5>
                    <p className="card-text">₹{price}</p>
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
                    <button
                      onClick={() => {
                        cartItems.some((p) => p.productId === item.productId)
                          ? deleteCart(item)
                          : addCart(item);
                      }}
                      className={`btn w-100 ${
                        cartItems.some((p) => p.productId === item.productId)
                          ? "btn-danger"
                          : "btn-primary"
                      }`}
                    >
                      {cartItems.some((p) => p.productId === item.productId)
                        ? "Remove from Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
















// import { useNavigate } from "react-router";
// import Layout from "../../components/layout/Layout";
// import { useContext, useEffect, useState } from "react";
// import myContext from "../../context/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// import Loader from "../../components/loader/Loader";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AllProduct = () => {
//   const navigate = useNavigate();
//   const context = useContext(myContext);
//   const { loading, setLoading } = context;

//   const [products, setProducts] = useState([]);
//   const [selectedQuantities, setSelectedQuantities] = useState({});
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       // Retrieve and parse the token
//       const token = JSON.parse(localStorage.getItem('token'));
//       // Check if the token is present
//       if (!token) {
//         throw new Error('Token not found');
//       }
//       const response = await axios.get("http://localhost:8080/api/public/products", {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const productsArray = response.data.content || [];
//       setProducts(productsArray);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleQuantityChange = (productId, quantity) => {
//     setSelectedQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [productId]: quantity,
//     }));
//   };

//   const addCart = (item) => {
//     const quantity = selectedQuantities[item.productId] || 1;
  
//     // Check if the selected quantity exceeds the available quantity
//     if (quantity > item.quantity) {
//       toast.error(`Cannot add more than ${item.quantity} items`);
//       return;
//     }
  
//     // Dispatch the item to the cart with the selected quantity and availableQuantity
//     dispatch(addToCart({
//       ...item,
//       quantity, // Selected quantity by the user
//       availableQuantity: item.quantity, // Ensuring availableQuantity is passed
//     }));
  
//     toast.success("Added to cart");
//   };
  
//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     toast.success("Removed from cart");
//   };

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <Layout>
//       <div className="container py-5">
//         <h1 className="text-center mb-4 text-2xl font-semibold">All Products</h1>
//         {loading && <Loader />}
//         <div className="row">
//           {products.map((item) => {
//             const { productId, productName, price, image, quantity } = item;
//             return (
//               <div key={productId} className="col-md-3 mb-4">
//                 <div className="card h-100 border-secondary shadow-sm">
//                   <img
//                     onClick={() => navigate(`/productinfo/${productId}`)}
//                     className="card-img-top cursor-pointer"
//                     src={image || '/medicine.jpg'}
//                     alt={productName || 'Product Image'}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{productName.substring(0, 25)}</h5>
//                     <p className="card-text">₹{price}</p>
//                     <p className="card-text">Only {quantity} left</p>
//                     <div className="form-group mb-3">
//                       <label htmlFor={`quantity-${productId}`}>Quantity:</label>
//                       <input
//                         type="number"
//                         id={`quantity-${productId}`}
//                         className="form-control"
//                         value={selectedQuantities[productId] || 1}
//                         onChange={(e) => handleQuantityChange(productId, Math.min(e.target.value, quantity))}
//                         min="1"
//                         max={quantity}
//                       />
//                     </div>
//                     <button
//                       onClick={() => {
//                         cartItems.some((p) => p.productId === item.productId)
//                           ? deleteCart(item)
//                           : addCart(item);
//                       }}
//                       className={`btn w-100 ${
//                         cartItems.some((p) => p.productId === item.productId)
//                           ? "btn-danger"
//                           : "btn-primary"
//                       }`}
//                     >
//                       {cartItems.some((p) => p.productId === item.productId)
//                         ? "Remove from Cart"
//                         : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AllProduct;

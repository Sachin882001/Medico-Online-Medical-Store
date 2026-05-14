// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../../components/layout/Layout";
// import { Trash } from "lucide-react";
// import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
// import { Navigate } from "react-router";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     toast.success("Removed from cart");
//   };

//   // Handle incrementing quantity
//   const handleIncrement = (productId) => {
//     const item = cartItems.find((item) => item.productId === productId);
//     if (item) {
//       if (item.quantity < item.availableQuantity) {
//         dispatch(incrementQuantity(productId));
//       } else {
//         toast.error("Cannot exceed available quantity");
//       }
//     }
//   };

//   // Handle decrementing quantity
//   const handleDecrement = (productId) => {
//     const item = cartItems.find((item) => item.productId === productId);
//     if (item) {
//       if (item.quantity > 1) {
//         dispatch(decrementQuantity(productId));
//       } else {
//         toast.error("Quantity cannot be less than 1");
//       }
//     }
//   };

//   const cartItemTotal = cartItems.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
//   const cartTotal = cartItems.map((item) => item.orderedProductPrice * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // user
//   const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

//   // Buy Now Function
//   const [addressInfo, setAddressInfo] = useState({
//     name: "",
//     address: "",
//     pincode: "",
//     mobileNumber: "",
//   });

//   const buyNowFunction = async () => {
//     // validation
//     if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
//       return toast.error("All Fields are required");
//     }

//     // Convert cartItems to the format expected by the backend
//     const productOrders = cartItems.map(item => ({
//       productId: item.productId,
//       orderedProductPrice: item.orderedProductPrice,
//       quantity: item.quantity,
//       discountedPrice: item.discountedPrice,
//       discount: item.discount,
//     }));

//     // Order Info
//     const orderInfo = {
//       email: userEmail,
//       total: cartTotal,
//       paymentMethod: "Cash_On_Delivery", // or use a variable if dynamically set
//       products: productOrders,
//       addressInfo,
//     };

//     try {
//       await axios.post("https://localhost:8080/api/users/orders", orderInfo);
//       dispatch(resetCart());
//       localStorage.removeItem("cart");
//       setAddressInfo({
//         name: "",
//         address: "",
//         pincode: "",
//         mobileNumber: "",
//       });
//       toast.success("Order Placed Successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to place order");
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">Shopping Cart</h1>
//         <div className="row">
//           <div className="col-md-8">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="card-title">Items in your shopping cart</h2>
//                 {cartItems.length > 0 ? (
//                   cartItems.map((item) => {
//                     const { productId, productName, orderedProductPrice, image, quantity, category } = item;
//                     return (
//                       <div key={productId} className="mb-3 d-flex align-items-start">
//                         <img src={image} alt={productName} className="img-fluid me-3" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
//                         <div className="flex-grow-1">
//                           <h5 className="mb-1">{productName}</h5>
//                           <p className="text-muted mb-1">{category}</p>
//                           <p className="mb-1">₹{orderedProductPrice}</p>
//                           <div className="d-flex align-items-center">
//                             <button onClick={() => handleDecrement(productId)} className="btn btn-outline-secondary me-2">
//                               -
//                             </button>
//                             <input type="text" className="form-control text-center" value={quantity} readOnly />
//                             <button onClick={() => handleIncrement(productId)} className="btn btn-outline-secondary ms-2">
//                               +
//                             </button>
//                             <button onClick={() => deleteCart(item)} className="btn btn-danger ms-3">
//                               <Trash size={16} className="me-1" />
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p className="text-center">No items in the cart</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="card-title">Price Details</h2>
//                 <dl className="row mb-3">
//                   <dt className="col-sm-6">Price ({cartItemTotal} items)</dt>
//                   <dd className="col-sm-6">₹{cartTotal}</dd>
//                 </dl>
//                 <dl className="row mb-3">
//                   <dt className="col-sm-6">Delivery Charges</dt>
//                   <dd className="col-sm-6 text-success">Free</dd>
//                 </dl>
//                 <dl className="row mb-4 border-top pt-2">
//                   <dt className="col-sm-6">Total Amount</dt>
//                   <dd className="col-sm-6">₹{cartTotal}</dd>
//                 </dl>
//                 <div className="d-flex justify-content-between">
//                   {userEmail ? <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction} /> : <Navigate to="/login" />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;







import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/cartSlice";


const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  const navigate = useNavigate();

// Handle incrementing quantity
const handleIncrement = (productId) => {
  const item = cartItems.find((item) => item.productId === productId);
  if (item) {
    if (item.quantity < item.availableQuantity) {
      dispatch(incrementQuantity(productId));
    } else {
      toast.error("Cannot exceed available quantity");
    }
  }
};

// Handle decrementing quantity
const handleDecrement = (productId) => {
  const item = cartItems.find((item) => item.productId === productId);
  if (item) {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(productId));
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  }
};

  const cartItemTotal = cartItems.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems.map((item) => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // user
  const userEmail = JSON.parse(localStorage.getItem("user"));

  // Buy Now Function
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: new Date().toISOString(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async () => {
    // validation
    if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
      return toast.error("All Fields are required");
    }


    // Convert cartItems to the format expected by the backend
  const products = cartItems.map(item => ({
    productId: item.productId,
    orderedProductPrice: item.price,  // Adjust according to your backend's expected field
    quantity: item.quantity,
    discountedPrice: item.discount, // If applicable
  }));

    // Order Info
    const orderInfo = {
      products,
      addressInfo,
      email: userEmail,
      total: cartTotal,
      paymentMethod: "cash-on-delivery",  
      status: "confirmed",
      time: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      await axios.post("http://localhost:8080/api/users/orders", orderInfo, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(resetCart());
    localStorage.removeItem("cart");
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order Placed Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Shopping Cart</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
               
                {cartItems.length > 0 ? (
                  cartItems.map((item) => {
                    const { productId, productName, price, image, quantity, category } = item;
                    return (
                      <div key={productId} className="mb-3 d-flex align-items-start">
                        <img src={image} alt={productName} className="img-fluid me-3" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        <div className="flex-grow-1">
                          <h5 className="mb-1">{productName}</h5>
                          <p className="text-muted mb-1">{category}</p>
                          <p className="mb-1">₹{price}</p>
                          <div className="d-flex align-items-center">
                            <button onClick={() => handleDecrement(productId)} className="btn btn-outline-secondary me-2">
                              -
                            </button>
                            <input type="text" className="form-control text-center" value={quantity} readOnly />
                            <button onClick={() => handleIncrement(productId)} className="btn btn-outline-secondary ms-2">
                              +
                            </button>
                            <button onClick={() => deleteCart(item)} className="btn btn-danger ms-3">
                              <Trash size={16} className="me-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center"style={{textAlign:"center", fontWeight: "bold",fontSize:25}}>No items in the cart</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Price Details</h2>
                <dl className="row mb-3">
                  <dt className="col-sm-6">Price ({cartItemTotal} items)</dt>
                  <dd className="col-sm-6">₹{cartTotal}</dd>
                </dl>
                <dl className="row mb-3">
                  <dt className="col-sm-6">Delivery Charges</dt>
                  <dd className="col-sm-6 text-success">Free</dd>
                </dl>
                <dl className="row mb-4 border-top pt-2">
                  <dt className="col-sm-6">Total Amount</dt>
                  <dd className="col-sm-6">₹{cartTotal}</dd>
                </dl>
                <div className="d-flex justify-content-between">
                  {userEmail ? <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction} /> : <Navigate to="/login" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

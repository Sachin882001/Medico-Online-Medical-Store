import { useContext, useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import axios from "axios";

const UserDashboard = () => {
  // Get user details from local storage
  const userEmail = JSON.parse(localStorage.getItem("user"));
  const Role = JSON.parse(localStorage.getItem("role"));
  const firstName = JSON.parse(localStorage.getItem("firstName"));
  const lastName = JSON.parse(localStorage.getItem("lastName"));

  const [orders, setOrders] = useState([]);
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/public/users/${userEmail}/orders`, config);
      const { data } = response;





      setOrders(response.data); // Adjust according to your API response structure
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log();

  useEffect(() => {
    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <Layout>
      <div className="container my-5">
        {/* Top Section */}
        <div className="mb-4 p-4 border border-secondary rounded bg-light">
          {/* Image */}
          <div className="text-center mb-3">
            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" className="img-fluid" />
          </div>
          {/* Text */}
          <div>
            {/* Name */}
            <h1 className="text-center h4">
              <span className="fw-bold">Name: </span>
              {firstName + " " + lastName}
            </h1>

            {/* Email */}
            <h1 className="text-center h4">
              <span className="fw-bold">Email: </span>
              {userEmail}
            </h1>

            {/* Role */}
            <h1 className="text-center h4">
              <span className="fw-bold">Role: </span>
              {Role}
            </h1>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Order Details Section */}
          <div className="mb-4">
            <h2 className="h3 mb-4">Order Details</h2>

            <div className="text-center mb-3">{loading && <Loader />}</div>

            {/* Orders List */}
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.orderId} className="mb-4 border border-secondary rounded bg-light p-3">
                  {order.orderItems.map((item) => {
                    const { product, quantity, orderedProductPrice } = item;
                    const { productId, productName, image } = product;
                    const { orderStatus, orderDate } = order;
                    return (
                      <div key={item.orderItemId} className="d-flex flex-column flex-md-row mb-4 border border-secondary rounded bg-light">
                        {/* Left Column */}
                        <div className="p-3 border-end">
                          <div className="row">
                            <div className="col-6 mb-2">
                              <div className="fw-semibold">Order Id</div>
                              <div className="text-muted">#{order.orderId}</div>
                            </div>

                            <div className="col-6 mb-2">
                              <div className="fw-semibold">Date</div>
                              <div className="text-muted">{orderDate}</div>
                            </div>

                            <div className="col-6 mb-2">
                              <div className="fw-semibold">Total Amount</div>
                              <div className="text-muted">₹ {orderedProductPrice * quantity}</div>
                            </div>

                            <div className="col-6 mb-2">
                              <div className="fw-semibold">Order Status</div>
                              <div className={`text-muted ${orderStatus === "pending" ? "text-danger" : "text-success"}`}>{orderStatus}</div>
                            </div>
                          </div>
                        </div>
                        {/* Right Column */}
                        <div className="flex-grow-1">
                          <ul className="list-unstyled">
                            <li className="d-flex justify-content-between align-items-start py-3">
                              <div className="d-flex">
                                <img className="img-fluid me-3 rounded border" src={image} alt="Product" style={{ maxHeight: "150px", objectFit: "contain" }} />
                                <div>
                                  <p className="fw-bold mb-1">{productName}</p>
                                  <p className="text-muted mb-1">x {quantity}</p>
                                </div>
                              </div>
                              <div className="text-end">
                                <p className="fw-bold mb-1">₹ {orderedProductPrice}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="text-center text-muted">No orders found</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;

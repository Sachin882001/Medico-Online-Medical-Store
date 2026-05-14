import React from "react";
import "../admin/OrderDetail.css";

const OrderDetail = ({ orders = [], orderDelete }) => {
  let serialNumber = 1; // This will keep the serial number across orders

  return (
    <div className="container mt-5">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="display-4 text-primary font-weight-bold">All Orders</h1>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>S.No.</th>
              <th>Order Id</th>
              <th>Email</th>
              <th>Order Date</th> {/* New Column for Order Date */}
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, orderIndex) => (
                order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, itemIndex) => {
                    const { product } = item;
                    return (
                      <tr key={`${product.productId}-${orderIndex}-${itemIndex}`}>
                        <td>{serialNumber++}</td>
                        <td>{order.orderId}</td> {/* Display Order ID */}
                        <td>{order.email}</td> {/* Display Email */}
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td> {/* Display Order Date */}
                        <td>
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="img-fluid"
                            style={{ maxWidth: "100px", height: "auto" }}
                          />
                        </td>
                        <td>{product.productName}</td>
                        <td>₹{product.price ? product.price.toFixed(2) : "0.00"}</td>
                        <td>{item.quantity || 0}</td>
                        <td>₹{(product.price * item.quantity).toFixed(2)}</td>
                        <td
                          onClick={() => orderDelete(order.orderId)}
                          className="text-danger cursor-pointer"
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr key={orderIndex}>
                    <td colSpan="10">No items found in this order.</td> {/* Update colSpan to match columns */}
                  </tr>
                )
              ))
            ) : (
              <tr>
                <td colSpan="10">No orders found.</td> {/* Update colSpan to match columns */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;

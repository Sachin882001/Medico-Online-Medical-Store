import { useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./myContext";
import toast from "react-hot-toast";

function MyState({ children }) {
  // Loading State
  const [loading, setLoading] = useState(false);

  // State for storing data
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  /**========================================================================
   *                          GET All Product Function
   *========================================================================**/
  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products");
      setGetAllProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /**========================================================================
   *                           GET All Order Function
   *========================================================================**/
  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/orders");
      setGetAllOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /**========================================================================
   *                           DELETE Order Function
   *========================================================================**/
  const orderDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/orders/${id}`);
      toast.success("Order Deleted successfully");
      getAllOrderFunction(); // Refresh order list
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**========================================================================
   *                           GET All User Function
   *========================================================================**/
  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users");
      setGetAllUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        orderDelete,
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;

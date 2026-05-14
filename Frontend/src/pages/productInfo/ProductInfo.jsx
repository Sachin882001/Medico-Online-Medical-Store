import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState({});   
  const { productId } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:8080/api/public/products/${productId}`);
        setProduct(response.data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};


  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="py-5 bg-light">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          <Container>
            <Row className="mb-4">
              <Col md={6}>
                <img className="w-100 rounded-lg" src={product?.image} alt={product?.productName} />
              </Col>
              <Col md={6}>
                <div className="ps-md-4">
                  <h2 className="mb-4">{product?.productName}</h2>
                  <div className="mb-4">
                    <div className="d-flex mb-3">
                      {[...Array(4)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-star text-danger"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="fs-3 fw-semibold text-muted">₹ {product?.price}</span>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-2">Description:</h4>
                    <p>{product?.description}</p>
                  </div>
                  <div className="mb-4">
                    {cartItems.some((p) => p.productId === product.productId) ? (
                      <Button onClick={() => deleteCart(product)} className="w-100" variant="danger">
                        Remove from cart
                      </Button>
                    ) : (
                      <Button onClick={() => addCart(product)} className="w-100" variant="primary">
                        Add to cart
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;

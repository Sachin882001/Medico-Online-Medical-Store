import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const categoryList = [
        { id: "1", image: "/drugs.png", name: "drugs" },
        { id: "2", image: "/injection.png", name: "injection" },
        { id: "3", image: "sun-block.png", name: "cosmetic" },
        { id: "4", image: "homeopathy.png", name: "homeo" },
        { id: "5", image: "pain-relief.png", name: "pain-relief" },
        { id: "6", image: "lab-equipment.png", name: "devices" },
        { id: "7", image: "multivitamin.png", name: "vitamins" },
        { id: "8", image: "first-aid-kit.png", name: "first-Aid" },
    ];

    useEffect(() => {
        const category = categoryList.find(cat => cat.name.trim().toLowerCase() === categoryname.trim().toLowerCase());
        if (category) {
            setCategoryId(category.id);
        } else {
            console.error("Category not found");
        }
    }, [categoryname]);

    useEffect(() => {
        if (categoryId) {
            setProducts([]);  // Clear previous products on category change
            fetchProductsByCategory(categoryId);
        }
    }, [categoryId]);

    const fetchProductsByCategory = async (categoryId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/public/categories/${categoryId}/products`);
            const productsArray = response.data.content || [];
            setProducts(productsArray);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            toast.error("Failed to fetch products by category");
        } finally {
            setLoading(false);
        }
    };

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
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <Container className="mt-4">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-semibold text-uppercase">{categoryname}</h1>
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Loader />
                    </div>
                ) : (
                    <Row>
                        {products.length > 0 ? (
                            products.map((item, index) => {
                                const { productId, productName, price, image, quantity } = item;
                                return (
                                    <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                                        <Card className="h-100">
                                            <Card.Img
                                                variant="top"
                                                src={image}
                                                onClick={() => navigate(`/productinfo/${productId}`)}
                                                style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{productName.substring(0, 25)}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">₹{price}</Card.Subtitle>
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
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => deleteCart(item)}
                                                        >
                                                            Remove from Cart
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => addCart(item)}
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        ) : (
                            <div className="text-center">
                                <img
                                    className="mb-2"
                                    src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                    alt=""
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <h2 className="text-black">No {categoryname} products found</h2>
                            </div>
                        )}
                    </Row>
                )}
            </Container>
        </Layout>
    );
}

export default CategoryPage;

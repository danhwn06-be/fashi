import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const alertShown = useRef(false);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                if (!alertShown.current) {
                    alert("Please login to view your cart!");
                    alertShown.current = true;
                }
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart data:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                } else {
                    setLoading(false);
                }
            }
        };

        fetchCart();
    }, [navigate]);

    const handleDeleteItem = async (cartId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/cart/${cartId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(prevItems => prevItems.filter(item => item.cart_id !== cartId));

            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error("Error deleting cart item:", error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                alert("Could not remove item. Please try again");
            }
        }
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            const priceToUse = item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price;
            const priceNum = parseFloat(priceToUse);
            total += priceNum * item.quantity;
        });
        return `$${total.toFixed(2)}`;
    };

    return (
        <>
            <Breadcrumb currentTitle="Shopping Cart" links={[{ name: "Home", url: "/" }, { name: "Shop", url: "/shop" }]} />

            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th className="p-name">Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center p-4">Loading your cart...</td>
                                            </tr>
                                        ) : cartItems.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center p-4">Your shopping cart is currently empty!</td>
                                            </tr>
                                        ) : (
                                            cartItems.map(item => (
                                                <CartItem 
                                                    key={item.cart_id}
                                                    cartId={item.cart_id}
                                                    productId={item.product_id}
                                                    image={`/${item.image}`}
                                                    name={item.name}
                                                    price={`$${parseFloat(item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price).toFixed(2)}`}
                                                    quantity={item.quantity}
                                                    total={`$${(parseFloat(item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price) * item.quantity).toFixed(2)}`}
                                                    selected_specs={item.selected_specs}
                                                    onDelete={handleDeleteItem}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 offset-lg-8">
                                    <CartSummary subtotal={calculateTotal()} total={calculateTotal()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShoppingCart;
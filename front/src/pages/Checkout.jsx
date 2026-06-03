import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const [formData, setFormData] = useState(() => {
        const defaultData = {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: ''
        };
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                defaultData.firstName = user.first_name || '';
                defaultData.lastName = user.last_name || '';
                defaultData.address = user.address || '';
                defaultData.phone = user.phone || '';
                defaultData.email = user.email || '';
            }
        } catch (e) {}
        return defaultData;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchCartForCheckout = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const items = response.data;
                if (items.length === 0) {
                    alert("Your cart is empty. Let's buy something first!");
                    navigate('/shop');
                    return;
                }

                setCartItems(items);

                let total = 0;
                items.forEach(item => {
                    const priceToUse = item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price;
                    const priceNum = parseFloat(String(priceToUse).replace(/[^0-9.-]+/g, ""));
                    total += priceNum * item.quantity;
                });
                setCartTotal(total);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCartForCheckout();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/coupons/validate', { code: couponCode }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { discount_type, discount_value } = response.data;
            let dAmount = 0;
            if (discount_type === 'PERCENT') {
                dAmount = cartTotal * (parseFloat(discount_value) / 100);
            } else if (discount_type === 'FIXED') {
                dAmount = parseFloat(discount_value);
            }
            if (dAmount > cartTotal) dAmount = cartTotal;
            setDiscount(dAmount);
            alert("Coupon applied successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Invalid coupon");
            setDiscount(0);
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const payload = { ...formData, couponCode: discount > 0 ? couponCode : null };
            const response = await axios.post('http://localhost:5000/api/orders', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(response.data.message);

            window.dispatchEvent(new Event('cartUpdated'));

            navigate('/');

        } catch (error) {
            console.error("Checkout error:", error);
            alert(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    if (loading) {
        return (
            <>
                <div className="text-center py-5 my-5">Loading checkout...</div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb currentTitle="Checkout" links={[{ name: "Home", url: "/" }, { name: "Shop", url: "/shop" }]} />

            <section className="checkout-section spad">
                <div className="container">
                    <form onSubmit={handlePlaceOrder} className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label htmlFor="firstName">First Name<span>*</span></label>
                                        <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="lastName">Last Name<span>*</span></label>
                                        <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="email">Email Address<span>*</span></label>
                                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="address">Street Address<span>*</span></label>
                                        <input type="text" id="address" className="street-first" value={formData.address} onChange={handleInputChange} required placeholder="E.g. 123 Main St, Apartment 4B" />
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="phone">Phone Number<span>*</span></label>
                                        <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="discount-coupon mb-4">
                                    <div className="d-flex w-100">
                                        <input type="text" placeholder="Enter Your Coupon Code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="flex-grow-1 mb-0 mr-2" />
                                        <button type="button" className="site-btn" onClick={handleApplyCoupon}>APPLY</button>
                                    </div>
                                </div>
                                <div className="place-order">
                                    <h4>Your Order</h4>
                                    <div className="order-total">
                                        <ul className="order-table">
                                            <li>Product <span>Total</span></li>

                                            {cartItems.map(item => {
                                                const priceToUse = item.sale_price !== null && item.sale_price !== undefined ? item.sale_price : item.price;
                                                const itemTotal = (parseFloat(String(priceToUse).replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2);
                                                return (
                                                    <li key={item.cart_id} className="fw-normal">
                                                        {item.name} {item.selected_specs && <small className="text-muted d-block small">{item.selected_specs}</small>} 
                                                        x {item.quantity}
                                                        <span>${itemTotal}</span>
                                                    </li>
                                                );
                                            })}

                                            {discount > 0 && <li className="fw-normal text-success">Discount <span>-${discount.toFixed(2)}</span></li>}
                                            <li className="total-price">Total <span>${(cartTotal - discount).toFixed(2)}</span></li>
                                        </ul>
                                        <div className="payment-check">
                                            <div className="pc-item">
                                                <label htmlFor="pc-check">
                                                    Cash on Delivery (COD)
                                                    <input type="checkbox" id="pc-check" defaultChecked />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="order-btn">
                                            <button type="submit" className="site-btn place-btn">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Checkout;
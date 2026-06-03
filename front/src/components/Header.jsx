import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const fetchMiniCart = async () => {
        if (!token) return;
        try {
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${token} ` }
            });
            setCartItems(response.data);

            let total = 0;
            response.data.forEach(item => {
                const priceNum = parseFloat(item.price);
                total += priceNum * item.quantity;
            });
            setCartTotal(total);
        } catch (error) {
            console.error('Error fetching mini cart:', error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        fetchMiniCart();

        window.addEventListener('cartUpdated', fetchMiniCart);

        return () => window.removeEventListener('cartUpdated', fetchMiniCart);
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCartItems([]);
        window.dispatchEvent(new Event('authChanged'));
        navigate('/login');
    };

    const handleCartClick = (e) => {
        if (!token) {
            e.preventDefault();
            alert("Please log in to view your cart!");
            navigate('/login');
        }
    };

    const recentCartItems = [...cartItems].reverse().slice(0, 2);

    return (
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="ht-left">
                        <div className="mail-service">
                            <i className="fa fa-envelope"></i>
                            hello.colorlib@gmail.com
                        </div>
                        <div className="phone-service">
                            <i className="fa fa-phone"></i>
                            +65 11.188.888
                        </div>
                    </div>
                    <div className="ht-right">
                        {user ? (
                            <div className="login-panel cursor-pointer" onClick={handleLogout}>
                                <i className="fa fa-user"></i> Logout ({user.username})
                            </div>
                        ) : (
                            <Link to="/login" className="login-panel">
                                <i className="fa fa-user"></i> Login
                            </Link>
                        )}
                        <div className="lan-selector">
                            <select className="language_drop custom-lang-drop" name="countries" id="countries">
                                <option value='yt' data-image="/img/flag-1.jpg" data-imagecss="flag yt" data-title="English">English</option>
                                <option value='yu' data-image="/img/flag-2.jpg" data-imagecss="flag yu" data-title="Bangladesh">German</option>
                            </select>
                        </div>
                        <div className="top-social">
                            <a href="#"><i className="ti-facebook"></i></a>
                            <a href="#"><i className="ti-twitter-alt"></i></a>
                            <a href="#"><i className="ti-linkedin"></i></a>
                            <a href="#"><i className="ti-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/img/logo.png" alt="Fashi Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7">
                            <div className="advanced-search">
                                <button type="button" className="category-btn">All Categories</button>
                                <form onSubmit={handleSearch} className="input-group">
                                    <input 
                                        type="text" 
                                        placeholder="What do you need?" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button type="submit"><i className="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                <li className="heart-icon">
                                    <a href="#">
                                        <i className="icon_heart_alt"></i>
                                        <span>0</span>
                                    </a>
                                </li>
                                <li className="cart-icon">
                                    <Link to="/cart" onClick={handleCartClick}>
                                        <i className="icon_bag_alt"></i>
                                        <span>{token ? cartItems.length : 0}</span>
                                    </Link>
                                    {token && (
                                        <div className="cart-hover">
                                            {cartItems.length === 0 ? (
                                                <div className="select-items">
                                                    <p className="text-center p-3 m-0 font-weight-bold">
                                                        Your cart is empty.
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="select-items">
                                                        <table>
                                                            <tbody>
                                                                {recentCartItems.map(item => (
                                                                    <tr key={item.cart_id}>
                                                                        <td className="si-pic">
                                                                            <Link to={`/product/${item.product_id}`}>
                                                                                <img src={`/${item.image}`} alt={item.name} className="cart-item-img rounded" />
                                                                            </Link>
                                                                        </td>
                                                                        <td className="si-text">
                                                                            <div className="product-selected">
                                                                                <p>${parseFloat(item.price).toFixed(2)} x {item.quantity}</p>
                                                                                <h6>
                                                                                    <Link to={`/product/${item.product_id}`} className="text-reset">
                                                                                        {item.name}
                                                                                    </Link>
                                                                                    {item.selected_specs && (() => {
                                                                                        try {
                                                                                            const specs = JSON.parse(item.selected_specs);
                                                                                            return <span className="d-block small text-muted mt-1">({Object.values(specs).join(' | ')})</span>;
                                                                                        } catch (e) { return null; }
                                                                                    })()}
                                                                                </h6>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="select-total">
                                                        <span>total:</span>
                                                        <h5>${cartTotal.toFixed(2)}</h5>
                                                    </div>
                                                    <div className="select-button">
                                                        <Link to="/cart" className="primary-btn view-card">VIEW CARD</Link>
                                                        <Link to="/checkout" className="primary-btn checkout-btn">CHECK OUT</Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav-item">
                <div className="container">
                    <div className="nav-depart">
                        <div className="depart-btn">
                            <i className="ti-menu"></i>
                            <span>All Categories</span>
                            <ul className="depart-hover">
                                <li className="active"><Link to="/shop">All Products</Link></li>
                                <li><Link to="/shop?category=Clothing">Clothing</Link></li>
                                <li><Link to="/shop?category=Shoes">Shoes</Link></li>
                                <li><Link to="/shop?category=Accessories">Accessories</Link></li>
                            </ul>
                        </div>
                    </div>
                    <nav className="nav-menu mobile-menu">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li className="mega-menu-item">
                                <Link to="/collection">Collection</Link>
                                <div className="mega-menu">
                                    <div className="mega-menu-column">
                                        <h4><Link to="/shop?category=Clothing">Clothing</Link></h4>
                                        <ul>
                                            <li><Link to="/shop?subcategory=T-Shirt">T-Shirts</Link></li>
                                            <li><Link to="/shop?subcategory=Jeans">Jeans</Link></li>
                                            <li><Link to="/shop?subcategory=Dress">Dresses</Link></li>
                                            <li><Link to="/shop?subcategory=Sweater">Sweaters</Link></li>
                                            <li><Link to="/shop?subcategory=Jacket">Jackets</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4><Link to="/shop?category=Shoes">Shoes</Link></h4>
                                        <ul>
                                            <li><Link to="/shop?subcategory=Sneakers">Sneakers</Link></li>
                                            <li><Link to="/shop?subcategory=Boots">Boots</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4><Link to="/shop?category=Accessories">Accessories</Link></h4>
                                        <ul>
                                            <li><Link to="/shop?subcategory=Backpack">Backpacks</Link></li>
                                            <li><Link to="/shop?subcategory=Hat">Hats</Link></li>
                                            <li><Link to="/shop?subcategory=Scarf">Scarves</Link></li>
                                            <li><Link to="/shop?subcategory=Sunglasses">Sunglasses</Link></li>
                                            <li><Link to="/shop?subcategory=Watch">Watches</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Pages</a></li>
                        </ul>
                    </nav>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
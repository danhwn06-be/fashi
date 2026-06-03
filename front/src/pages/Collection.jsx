import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import PartnerLogo from '../components/PartnerLogo';

const Collection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data from backend:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId, defaultSpecs = null) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to add items to your cart!");
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/cart', 
                { product_id: productId, quantity: 1, selected_specs: defaultSpecs },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Product added to cart successfully!");
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error("Error adding to cart:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                alert("Something went wrong. Please try again!");
            }
        }
    };

    // Nhóm sản phẩm theo category -> subcategory
    const grouped = products.reduce((acc, product) => {
        const { category, subcategory } = product;
        if (!acc[category]) {
            acc[category] = {};
        }
        if (!acc[category][subcategory]) {
            acc[category][subcategory] = [];
        }
        acc[category][subcategory].push(product);
        return acc;
    }, {});

    return (
        <>
            <Breadcrumb currentTitle="Collection" links={[{ name: "Home", url: "/" }]} />
            <section className="product-shop spad">
                <div className="container">
                    {loading ? (
                        <div className="text-center w-100 py-5">
                            <h4>Loading Collection...</h4>
                        </div>
                    ) : (
                        Object.keys(grouped).map(category => (
                            <div key={category} className="mb-5 pb-4 border-bottom">
                                <div className="row mb-5 align-items-center">
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <h2 className="fw-bold text-uppercase m-0" style={{ letterSpacing: '2px', color: '#252525' }}>{category}</h2>
                                        <Link to={`/shop?category=${category}`} className="btn btn-outline-dark btn-sm">View All {category}</Link>
                                    </div>
                                </div>
                                {Object.keys(grouped[category]).map(subcategory => (
                                    <div key={subcategory} className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h4 className="text-secondary text-capitalize m-0" style={{ borderLeft: '4px solid #e7ab3c', paddingLeft: '10px', fontSize: '20px' }}>
                                                {subcategory}
                                            </h4>
                                            <Link to={`/shop?subcategory=${subcategory}`} className="text-primary fs-6" style={{textDecoration: 'underline'}}>View All</Link>
                                        </div>
                                        <div className="collection-horizontal-scroll">
                                            {grouped[category][subcategory].slice(0, 10).map(product => (
                                                <ProductCard 
                                                    key={product.id}
                                                    id={product.id}
                                                    image={product.image}
                                                    category={product.category}
                                                    name={product.name}
                                                    price={product.price}
                                                    isSale={product.isSale ? true : false} 
                                                    sale_price={product.sale_price}
                                                    specifications={product.specifications}
                                                    onAddToCart={handleAddToCart}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </section>
            <PartnerLogo />
        </>
    );
};

export default Collection;

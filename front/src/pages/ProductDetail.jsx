import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSpecs, setSelectedSpecs] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                const productData = response.data;
                setProduct(productData);

                const specs = typeof productData.specifications === 'string'
                    ? JSON.parse(productData.specifications)
                    : productData.specifications;

                if (specs) {
                    const defaults = {};
                    if (specs.size_chart && Object.keys(specs.size_chart).length > 0) {
                        defaults.size = Object.keys(specs.size_chart)[0];
                    }
                    if (specs.colors && specs.colors.length > 0) {
                        defaults.color = specs.colors[0];
                    }
                    setSelectedSpecs(defaults);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please log in to add items to your cart!");
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/cart',
                { product_id: product.id, quantity: quantity, selected_specs: selectedSpecs },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setShowModal(false); // Đóng modal sau khi thêm thành công
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

    if (loading) {
        return (
            <div className="text-center py-5 my-5">
                <h4 className="text-muted">Loading product details...</h4>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-5 my-5">
                <h4 className="text-danger">Product not found!</h4>
            </div>
        );
    }

    const specs = typeof product.specifications === 'string'
        ? JSON.parse(product.specifications)
        : product.specifications;

    return (
        <>
            <Breadcrumb
                currentTitle={product.name}
                links={[{ name: "Home", url: "/" }, { name: "Shop", url: "/shop" }]}
            />

            <section className="product-shop spad page-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product-pic-zoom">
                                <img className="product-big-img w-100 rounded" src={`/${product.image}`} alt={product.name} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product-details">
                                <div className="pd-title">
                                    <span>{product.category} &gt; {product.subcategory}</span>
                                    <h3>{product.name}</h3>
                                    <a href="#" className="heart-icon"><i className="icon_heart_alt"></i></a>
                                </div>
                                <div className="pd-rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span>(5)</span>
                                </div>
                                <div className="pd-desc">
                                    <p>
                                        {product.description || "This is a high-quality product from Fashi. Carefully selected materials ensure maximum comfort and style. Perfect for daily wear or special occasions."}
                                    </p>
                                    <h4>
                                        {product.isSale && product.sale_price ? (
                                            <>
                                                ${parseFloat(product.sale_price).toFixed(2)} <span>${parseFloat(product.price).toFixed(2)}</span>
                                            </>
                                        ) : (
                                            `$${parseFloat(product.price).toFixed(2)}`
                                        )}
                                    </h4>
                                </div>

                                <div className="quantity">
                                    <div className="pro-qty d-inline-flex align-items-center mr-3">
                                        <button
                                            className="border-0 bg-transparent fs-4 cursor-pointer"
                                            onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                                        >-</button>
                                        <input type="text" value={quantity} readOnly className="qty-input border-0 text-center" style={{ width: '40px' }} />
                                        <button
                                            className="border-0 bg-transparent fs-4 cursor-pointer"
                                            onClick={() => setQuantity(prev => prev + 1)}
                                        >+</button>
                                    </div>
                                    <button onClick={() => setShowModal(true)} className="primary-btn pd-cart border-0">
                                        Add To Cart
                                    </button>
                                </div>

                                {specs && (
                                    <div className="pd-specs mt-4 mb-4 border-top pt-3">
                                        <h5 className="fw-bold mb-3 text-dark fs-5">Specifications:</h5>
                                        <table className="table table-sm table-borderless fs-6 mb-3 text-dark">
                                            <tbody>
                                                {specs.material && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2 w-25">Material</td>
                                                        <td className="py-2 text-dark">{specs.material}</td>
                                                    </tr>
                                                )}
                                                {specs.season && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2">Season</td>
                                                        <td className="py-2 text-dark">{specs.season}</td>
                                                    </tr>
                                                )}
                                                {specs.fit_type && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2">Fit Type</td>
                                                        <td className="py-2 text-dark">{specs.fit_type}</td>
                                                    </tr>
                                                )}
                                                {specs.dimensions && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2">Dimensions</td>
                                                        <td className="py-2 text-dark">{specs.dimensions}</td>
                                                    </tr>
                                                )}
                                                {specs.capacity && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2">Capacity</td>
                                                        <td className="py-2 text-dark">{specs.capacity}</td>
                                                    </tr>
                                                )}
                                                {specs.waterproof !== undefined && (
                                                    <tr className="border-bottom border-light">
                                                        <td className="fw-bold text-secondary py-2">Waterproof</td>
                                                        <td className="py-2 text-dark">{specs.waterproof ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {specs.size_chart && (
                                            <div className="mt-3 bg-light p-3 rounded">
                                                <h6 className="fw-bold mb-2 text-dark fs-7">Size Chart:</h6>
                                                <ul className="ps-3 text-muted mb-0 spec-list">
                                                    {Object.entries(specs.size_chart).map(([size, desc]) => (
                                                        <li key={size} className="mb-1">
                                                            <strong>Size {size}</strong>: {desc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal Chọn Biến Thể */}
            {showModal && (
                <div className="modal show d-block modal-backdrop-custom" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Select Specifications</h5>
                                <button type="button" className="close border-0 bg-transparent" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {specs && (specs.colors || specs.size_chart) ? (
                                    <div className="mb-2">
                                        {specs.size_chart && (
                                            <div className="mb-3">
                                                <span className="fw-bold d-block mb-2 text-dark">Size:</span>
                                                <div className="d-flex">
                                                    {Object.keys(specs.size_chart).map(size => (
                                                        <button
                                                            key={size}
                                                            onClick={() => setSelectedSpecs(prev => ({ ...prev, size }))}
                                                            className={`btn btn-sm mr-2 ${selectedSpecs.size === size ? 'btn-dark' : 'btn-outline-secondary'}`}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {specs.colors && (
                                            <div className="mb-3">
                                                <span className="fw-bold d-block mb-2 text-dark">Color:</span>
                                                <div className="d-flex flex-wrap">
                                                    {specs.colors.map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setSelectedSpecs(prev => ({ ...prev, color }))}
                                                            className={`btn btn-sm mr-2 mb-2 ${selectedSpecs.color === color ? 'btn-dark' : 'btn-outline-secondary'}`}
                                                        >
                                                            {color}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No extra specifications needed for this product.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-dark" onClick={handleAddToCart}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
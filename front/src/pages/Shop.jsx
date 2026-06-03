import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import PartnerLogo from '../components/PartnerLogo';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Đọc page từ URL
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const productsPerPage = 9;
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
            navigate('/login'); // Tự động điều hướng sang login
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

    const categoryFilter = searchParams.get('category');
    const subcategoryFilter = searchParams.get('subcategory');
    const searchFilter = searchParams.get('search');

    const handlePageChange = (newPage) => {
        const newParams = { page: newPage };
        if (categoryFilter) newParams.category = categoryFilter;
        if (subcategoryFilter) newParams.subcategory = subcategoryFilter;
        if (searchFilter) newParams.search = searchFilter;
        setSearchParams(newParams);
        window.scrollTo(0, 0); // Tự động cuộn lên đầu khi chuyển trang
    };

    // Lọc sản phẩm
    let filteredProducts = products;
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    if (subcategoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.subcategory === subcategoryFilter);
    }
    if (searchFilter) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Xử lý Breadcrumb động
    let breadcrumbTitle = "Shop";
    let breadcrumbLinks = [{ name: "Home", url: "/" }];

    if (searchFilter) {
        breadcrumbTitle = `Search results for: "${searchFilter}"`;
        breadcrumbLinks.push({ name: "Shop", url: "/shop" });
    } else if (subcategoryFilter && categoryFilter) {
        breadcrumbTitle = subcategoryFilter;
        breadcrumbLinks.push({ name: "Shop", url: "/shop" });
        breadcrumbLinks.push({ name: categoryFilter, url: `/shop?category=${categoryFilter}` });
    } else if (subcategoryFilter) {
        breadcrumbTitle = subcategoryFilter;
        breadcrumbLinks.push({ name: "Shop", url: "/shop" });
    } else if (categoryFilter) {
        breadcrumbTitle = categoryFilter;
        breadcrumbLinks.push({ name: "Shop", url: "/shop" });
    }

    return (
        <>
            <Breadcrumb currentTitle={breadcrumbTitle} links={breadcrumbLinks} />
            <section className="product-shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-list">
                                <div className="row">
                                    {loading ? (
                                        <div className="text-center w-100 py-5">
                                            <h4>No products found!</h4>
                                        </div>
                                    ) : (
                                        currentProducts.map(product => (
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
                                        ))
                                    )}
                                </div>
                                {!loading && totalPages > 1 && (
                                    <div className="row mt-4">
                                        <div className="col-12 text-center">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-center">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            style={{ color: '#252525' }}
                                                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                                        >
                                                            Previous
                                                        </button>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                            <button
                                                                className="page-link"
                                                                style={currentPage === i + 1 ? { backgroundColor: '#e7ab3c', borderColor: '#e7ab3c', color: 'white' } : { color: '#252525' }}
                                                                onClick={() => handlePageChange(i + 1)}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            style={{ color: '#252525' }}
                                                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                                        >
                                                            Next
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PartnerLogo />
        </>
    );
};

export default Shop;
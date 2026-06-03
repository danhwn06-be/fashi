import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, category, name, price, isSale, sale_price, specifications, onAddToCart }) => {
    const handleAddToCartClick = (e) => {
        e.preventDefault();
        let defaultSpecs = null;
        if (specifications) {
            const specs = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
            const defaults = {};
            if (specs.size_chart && Object.keys(specs.size_chart).length > 0) {
                defaults.size = Object.keys(specs.size_chart)[0];
            }
            if (specs.colors && specs.colors.length > 0) {
                defaults.color = specs.colors[0];
            }
            if (Object.keys(defaults).length > 0) {
                defaultSpecs = defaults;
            }
        }
        onAddToCart(id, defaultSpecs);
    };
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product-item">
                <div className="pi-pic">
                    <Link to={`/product/${id}`}>
                        <img src={`/${image}`} alt={name} />
                    </Link>

                    {isSale && <div className="sale pp-sale">Sale</div>}

                    <div className="icon">
                        <i className="icon_heart_alt"></i>
                    </div>
                    <ul>
                        <li className="w-icon active">
                            <a href="#" onClick={handleAddToCartClick}>
                                <i className="icon_bag_alt"></i>
                            </a>
                        </li>
                        <li className="quick-view">
                            <Link to={`/product/${id}`}>+ Quick View</Link>
                        </li>
                        <li className="w-icon">
                            <a href="#"><i className="fa fa-random"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="pi-text">
                    <div className="catagory-name">{category}</div>
                    <Link to={`/product/${id}`}>
                        <h5>{name}</h5>
                    </Link>
                    <div className="product-price">
                        {isSale && sale_price ? (
                            <>
                                ${parseFloat(sale_price).toFixed(2)}
                                <span className="ml-2 text-muted" style={{ textDecoration: 'line-through', fontSize: '0.9em' }}>${parseFloat(price).toFixed(2)}</span>
                            </>
                        ) : (
                            `$${parseFloat(price).toFixed(2)}`
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
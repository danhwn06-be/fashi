import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ cartId, productId, image, name, price, quantity, total, selected_specs, onDelete }) => {
    let specsString = "";
    if (selected_specs) {
        try {
            const specsObj = JSON.parse(selected_specs);
            specsString = Object.values(specsObj).join(' | ');
        } catch {}
    }

    return (
        <tr>
            <td className="cart-pic first-row">
                <Link to={`/product/${productId}`}>
                    <img src={image} alt={name} style={{ width: '90px' }} />
                </Link>
            </td>
            <td className="cart-title first-row">
                <h5>
                    <Link to={`/product/${productId}`} style={{ color: 'inherit' }}>
                        {name}
                    </Link>
                    {specsString && <span className="d-block mt-1 text-muted font-weight-normal small">({specsString})</span>}
                </h5>
            </td>
            <td className="p-price first-row">{price}</td>
            <td className="qua-col first-row">
                <div className="quantity">
                    <div className="pro-qty">
                        <input type="text" value={quantity} readOnly />
                    </div>
                </div>
            </td>
            <td className="total-price first-row">{total}</td>
            <td className="close-td first-row" style={{ cursor: 'pointer' }} onClick={() => onDelete(cartId)}>
                <i className="ti-close"></i>
            </td>
        </tr>
    );
};

export default CartItem;
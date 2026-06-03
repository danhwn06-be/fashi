import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ subtotal, total }) => {
    return (
        <div className="proceed-checkout">
            <ul>
                <li className="subtotal">Subtotal <span>{subtotal}</span></li>
                <li className="cart-total">Total <span>{total}</span></li>
            </ul>
            <Link to="/checkout" className="proceed-btn">PROCEED TO CHECK OUT</Link>
        </div>
    );
};

export default CartSummary;
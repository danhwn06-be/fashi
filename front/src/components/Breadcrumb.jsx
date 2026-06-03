import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ currentTitle, links }) => {
    return (
        <div className="breacrumb-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-text">
                            {links && links.map((link, index) => (
                                <Link to={link.url} key={index}>
                                    {index === 0 && <i className="fa fa-home"></i>}
                                    {index === 0 && " "}
                                    {link.name}
                                </Link>
                            ))}
                            <span>{currentTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../redux/action';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
        }
    }, []);

    const handleLogout = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            localStorage.removeItem(`cart_${user.username}`);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUsername('');
        dispatch(resetCart());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {username ? (
                            <>
                                <span className="navbar-text mx-2">Hello, {username}</span>
                                <button onClick={handleLogout} className="btn btn-outline-dark m-2"><i className="fa fa-sign-out-alt mr-1"></i> Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        )}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
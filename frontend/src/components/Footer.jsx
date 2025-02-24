import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start" style={{position: "fixed", bottom: 0, width: "100%"}}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are a leading e-commerce platform providing a wide range of products to cater to all your needs. Our mission is to deliver quality products at the best prices.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/" className="text-dark">Home</Link>
              </li>
              <li>
                <Link to="/product" className="text-dark">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-dark">About</Link>
              </li>
             
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="https://facebook.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark mb-0"><i className="fas fa-map-marker-alt"></i> 1234 Street Name, City, Country</p>
              </li>
              <li>
                <p className="text-dark mb-0"><i className="fas fa-phone"></i> +1 234 567 890</p>
              </li>
              <li>
                <p className="text-dark mb-0"><i className="fas fa-envelope"></i> info@example.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-dark text-white">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
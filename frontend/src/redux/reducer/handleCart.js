// filepath: /d:/2089375/GHCP-react-base-app/mern-Ecom-app/frontend/src/redux/reducer/handleCart.js
import axios from 'axios';

const handleCart = (state = [], action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Check if product already in cart
      const exist = state.find((x) => x.productId === product.productId);
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          x.productId === product.productId ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      break;

    case "DELITEM":
      const exist2 = state.find((x) => x.productId === product.productId);
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => x.productId !== exist2.productId);
      } else {
        updatedCart = state.map((x) =>
          x.productId === product.productId ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    case "RESETCART":
      updatedCart = [];
      break;

    default:
      return state;
  }

  // Update cart in the backend
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update`, { cart: updatedCart }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  return updatedCart;
};

export default handleCart;
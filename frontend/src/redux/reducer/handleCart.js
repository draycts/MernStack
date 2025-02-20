// filepath: /d:/2089375/GHCP-react-base-app/mern-Ecom-app/frontend/src/redux/reducer/handleCart.js

// Retrieve initial state from localStorage if available
const getInitialCart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const storedCart = localStorage.getItem(`cart_${user.username}`);
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Check if product already in cart
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      break;

    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => x.id !== exist2.id);
      } else {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    default:
      return state;
  }

  // Update localStorage with user-specific key
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    localStorage.setItem(`cart_${user.username}`, JSON.stringify(updatedCart));
  }

  return updatedCart;
};

export default handleCart;
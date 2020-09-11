import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = item => {
    const cartItems = this.state.cartItems.slice();
    const filtered = cartItems.filter(x => x._id !== item._id);
    this.setState({
      cartItems: filtered,
    });
    localStorage.setItem('cartItems', JSON.stringify(filtered));
  };

  createOrder = order => {
    alert('need to save an order for ' + order.name);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All rights are reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;

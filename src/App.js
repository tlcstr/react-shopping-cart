import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      size: '',
      sort: '',
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

  sortProducts = e => {
    const sort = e.target.value;
    this.setState(state => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price < b.price
              ? -1
              : 1
            : sort === 'highest'
            ? a.price > b.price
              ? -1
              : 1
            : a._id < b._id
            ? -1
            : 1
        ),
    }));
  };

  filterProducts = e => {
    if (e.target.value === '') {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(product =>
          product.availableSizes.includes(e.target.value)
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
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
    );
  }
}

export default App;

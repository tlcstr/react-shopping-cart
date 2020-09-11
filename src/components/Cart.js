import React, { Component } from 'react';
import Animation from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { showCheckout: false, name: '', email: '', address: '' };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = e => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };

  render() {
    const { cartItems } = this.props;
    const count = cartItems.length;
    return (
      <div>
        {count === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {count} {count > 1 ? 'items' : 'item'} in the cart
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      ${item.price} x {item.count}{' '}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: $
                    {cartItems
                      .reduce((a, b) => a + b.price * b.count, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Animation right duration={300}>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Animation>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);

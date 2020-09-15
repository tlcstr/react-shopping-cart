import React, { Component } from 'react';
import Animation from 'react-reveal/Fade';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      showCart: false,
      name: '',
      email: '',
      address: '',
    };
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
      total: this.props.cartItems.reduce((a, b) => a + b.price * b.count, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  closeCart = () => {
    this.setState({ showCart: false });
  };

  render() {
    const { cartItems, order } = this.props;
    // const count = cartItems.reduce((a, b) => a + b.count, 0);
    return (
      <React.Fragment>
        <div className="cart-icon">
          <i
            onClick={() => {
              this.setState({ showCart: true });
            }}
            className="fas fa-shopping-cart fa-3x"
          ></i>
        </div>

        {order && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            shouldCloseOnOverlayClick={true}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
              content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
                width: '800px',
                height: 'min-content',
              },
            }}
          >
            <div className="order-details">
              <h3 className="success-message">Your order has been placed.</h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>{order.createdAt}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>${order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map(x => (
                      <div>
                        {x.count} {' x '} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Modal>
        )}
        <Modal
          isOpen={this.state.showCart}
          onRequestClose={this.closeCart}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%) translateX(-50%)',
              width: '800px',
              height: 'min-content',
            },
          }}
        >
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
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);

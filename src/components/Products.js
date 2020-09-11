import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

Modal.setAppElement('#root');

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, product: null };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = product => {
    this.setState({ showModal: true, product });
  };

  closeModal = () => {
    this.setState({ showModal: false, product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {this.props.products.map(product => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={'#' + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{product.price}</div>
                    <button
                      className="button primary"
                      onClick={() => this.props.addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {this.state.showModal && (
          <Modal
            isOpen={this.state.showModal}
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
            <div className="product-details">
              <img src={product.image} alt={product.title}></img>
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available sizes:{' '}
                  {product.availableSizes.map(size => (
                    <span>
                      {' '}
                      <button className="button">{size}</button>
                    </span>
                  ))}
                </p>
                <div className="price-add-to-cart">
                  <div className="product-price">
                    <div>{product.price}</div>
                  </div>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.props.addToCart(product);
                      this.closeModal();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(state => ({ products: state.products.items }), {
  fetchProducts,
})(Products);

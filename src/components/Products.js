import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

Modal.setAppElement('#root');

class Products extends Component {
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
      <React.Fragment>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <div className="products">
            {this.props.products.map(product => (
              <div className="product-container">
                <div
                  className={`product ${!this.state.showModal ? 'above' : ''}`}
                  key={product._id}
                >
                  <a
                    href={'#' + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <div className="price">${product.price}</div>
                    <p>{product.title}</p>
                  </a>
                  <div className="hide">
                    <div className="sizes">
                      Sizes: {product.availableSizes.map(x => x + ' ')}
                    </div>

                    <button
                      className="button"
                      onClick={() => this.props.addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                width: '60%',
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
                    <span>{size}</span>
                  ))}
                </p>
                <div className="price-add-to-cart">
                  <div className="product-price">
                    <div>${product.price}</div>
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
      </React.Fragment>
    );
  }
}

export default connect(state => ({ products: state.products.filteredItems }), {
  fetchProducts,
  addToCart,
})(Products);

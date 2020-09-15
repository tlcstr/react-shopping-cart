import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">OLYMPIYKI</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <hr className="separator"/>
                <Products />
              </div>
              <Cart />
            </div>
          </main>
          <footer>All rights are reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;

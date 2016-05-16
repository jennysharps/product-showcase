import React from 'react';
import Product from '../components/Product.js';

class ProductList extends React.Component {
  render() {
    var productNodes = this.props.products.map(function(product) {
        return (
            <li key={product.id}>
                <Product title={product.title} description={product.description}/>
            </li>
        );
    });

    return (
        <div className="productList">
            <ul>
                {productNodes}
            </ul>
        </div>
    );
  }
}

export default ProductList;
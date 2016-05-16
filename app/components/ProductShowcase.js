import React from 'react';
import $ from 'jQuery';
import CategoryList from '../components/CategoryList.js';
import SearchFilter from '../components/SearchFilter.js';
import ProductList from '../components/ProductList.js'

class ProductShowcase extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            categories: [],
            products: [],
            nameFilter: '',
            categoryFilter: ''
        };
    }

    componentDidMount() {
        var component = this,
            apis = [
                {
                    name: "categories",
                    url: "https://api.gousto.co.uk/products/v2.0/categories"
                },
                {
                    name: "products",
                    url: "https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i"
                }
            ];

        for (var i = 0; i < apis.length; i++) {
            (function(api) {
                var stateData = {};

                $.ajax({
                    url: api.url,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        stateData[api.name] = data.data || [];

                        if(stateData[api.name].title !== undefined) {
                            stateData[api.name].titleLower = stateData[api.name].title.toLowerCase();
                        }

                        component.setState(stateData);
                    },
                    error: function(xhr, status, err) {
                        console.error(api.url, status, err.toString());
                    }
                });
            }(apis[i]));
        }
    }

    handleFilterUpdate = (filterValue, filterType) => {
        var filterUpdate = {};
        filterUpdate[filterType + 'Filter'] = filterValue;
        this.setState(filterUpdate);
    }

    render() {
        var displayedProducts = this.state.products;

        if(this.state.categoryFilter) {
            displayedProducts = displayedProducts.filter(function(product) {
                var categoryMatch = false;

                for(var i = 0; i < product.categories.length; i++) {
                    if(product.categories[i].id === this.state.categoryFilter) {
                        categoryMatch = true;
                    }
                    break;
                }

                return categoryMatch;
            }.bind(this));
        }

        var nameFilter = this.state.nameFilter.toLowerCase();

        displayedProducts = displayedProducts.filter(function(product) {
            var productName = product.titleLower || product.title.toLowerCase();
            return productName.indexOf(nameFilter) !== -1;
        }.bind(this));

        return (
            <div className="productShowcase">
                <CategoryList categories={this.state.categories} updateFilter={this.handleFilterUpdate} />
                <SearchFilter updateFilter={this.handleFilterUpdate} />
                <ProductList products={displayedProducts}/>
            </div>
        );
    }
}

export default ProductShowcase;
var ProductShowcase = React.createClass({
    getInitialState: function() {
        return {
            categories: [],
            products: [],
            nameFilter: '',
            categoryFilter: ''
        };
    },

    componentDidMount: function() {
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
                        component.setState(stateData);
                    },
                    error: function(xhr, status, err) {
                        console.error(api.url, status, err.toString());
                    }
                });
            }(apis[i]));
        }

    },

    handleFilterUpdate: function(filterValue, filterType) {
        var filterUpdate = {};
        filterUpdate[filterType + 'Filter'] = filterValue;
        this.setState(filterUpdate);
    },

    render: function() {
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

        displayedProducts = displayedProducts.filter(function(product) {
            return product.title.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) !== -1;
        }.bind(this));

        return (
            <div className="productShowcase">
                <CategoryList categories={this.state.categories} updateFilter={this.handleFilterUpdate} />
                <SearchFilter updateFilter={this.handleFilterUpdate} />
                <ProductList products={displayedProducts}/>
            </div>
        );
    }
});

var CategoryList = React.createClass({
    getInitialState: function() {
        return {
            active: null
        };
    },

    setActive: function(id) {
        this.setState({active: id});
    },

    render: function() {
        var categoryNodes = this.props.categories.map(function(category) {
            var active = this.state.active === category.id ? 'active' : '';
            
            return (
                <li key={category.id}>
                    <Category title={category.title} id={category.id} updateFilter={this.props.updateFilter} setActive={this.setActive} active={active}
                    />
                </li>
            );
        }.bind(this));

        return (
            <div className="categoryList">
                <ul>
                    {categoryNodes}
                </ul>
            </div>
        );
    }
});

var Category = React.createClass({
    handleFilterSet: function() {
        this.props.updateFilter(this.props.id, 'category');
        this.props.setActive(this.props.id);
    },

    render: function() {
        return (
            <div className={this.props.active} onClick={this.handleFilterSet}>{this.props.title}</div>
        );
    }
});

var SearchFilter = React.createClass({
    handleFilterChange: function(ev) {
        this.props.updateFilter(ev.target.value, 'name');
    },

    render: function() {
        return (
            <div className="searchFilter">
                <input type="text" onChange={this.handleFilterChange} />
            </div>
        );
    }
});

var ProductList = React.createClass({
  render: function() {
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
});

var Product = React.createClass({
    getInitialState: function(){
        return {
            active: false
        }
    },

    toggleActiveState: function(ev) {
        this.setState({active: !this.state.active});
    },

    render: function() {
        return (
            <div className={this.state.active ? 'active' : ''} onClick={this.toggleActiveState}>
                <h3 className="title">{this.props.title}</h3>

                <p className="description">{this.props.description}</p>
            </div>
        );
    }
});

ReactDOM.render(
    <ProductShowcase />,
    document.getElementById('content')
);
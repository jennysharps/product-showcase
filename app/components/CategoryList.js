import React from 'react';
import Category from '../components/Category.js';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            active: null
        };
    }

    setActive = (id) => {
        this.setState({active: id});
    }

    render() {
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
}

export default CategoryList;
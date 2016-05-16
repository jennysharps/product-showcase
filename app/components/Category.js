import React from 'react';

class Category extends React.Component {
    handleFilterSet = () => {
        this.props.updateFilter(this.props.id, 'category');
        this.props.setActive(this.props.id);
    }

    render() {
        return (
            <div className={this.props.active} onClick={this.handleFilterSet}>{this.props.title}</div>
        );
    }
}

export default Category;
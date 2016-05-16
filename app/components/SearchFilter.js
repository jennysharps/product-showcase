import React from 'react';

class SearchFilter extends React.Component {
    handleFilterChange = (ev) => {
        this.props.updateFilter(ev.target.value, 'name');
    }

    render() {
        return (
            <div className="searchFilter">
                <input type="text" onChange={this.handleFilterChange} />
            </div>
        );
    }
}

export default SearchFilter;
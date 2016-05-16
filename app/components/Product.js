import React from 'react';

class Product extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            active: false
        };
    }

    toggleActiveState = (ev) => {
        this.setState({active: !this.state.active});
    }

    render() {
        return (
            <div className={this.state.active ? 'active' : ''} onClick={this.toggleActiveState}>
                <h3 className="title">{this.props.title}</h3>

                <p className="description">{this.props.description}</p>
            </div>
        );
    }
}

export default Product;
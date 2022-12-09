import React from 'react';
import sampleProducts from '../../../../fixtures/Overview/Products.js';
import sampleProductIdStyles from '../../../../fixtures/Overview/IdProducts.js';
export default class OverView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {},
      styles: []

    };
  }

  initialRender () {
    this.setState({ product: sampleProducts.sampleProducts[0] })
    this.setState({ styles: sampleProductIdStyles.sampleProductIdStyles.results })
  }
  componentDidMount () { this.initialRender() }
  render () {
    console.log(this.state, "photooooos")

    return (
      <div>
       <p> OverView Place Holder </p>
       <div data-testid='name header'>NAME: {this.state.product.name}</div>
       <div>PRICE: {this.state.product.default_price}</div>
       <div>CATEGORY: {this.state.product.category}</div>
       <div>TITLE:{this.state.product.slogan} </div>
       <div>DESCRIPTION: {this.state.product.description} </div>
       <div>Star toggle</div>
       {/* <img src={this.state.styles[0].photos[0].url} alt="Girl in a jacket" width="500" height="600"/> */}
       </div>
    )
  }
}

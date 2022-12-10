import React from 'react';
import sampleProducts from '../../../../fixtures/Overview/Products.js';
import sampleProductIdStyles from '../../../../fixtures/Overview/IdProducts.js';
import sampleProductId from '../../../../fixtures/Overview/ProductsID.js';
import sampleData from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'

export default class OverView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {},
      styles: [],
      reviews: [],
      selectedStyle: {},
      selectedSize: {},
      starToggled: false
    };
    this.initialRender = this.initialRender.bind(this);
    this.starToggle = this.starToggle.bind(this);
  }

  initialRender () {
    this.setState({ product: sampleProducts.sampleProducts[0] })
    this.setState({ styles: sampleProductIdStyles.sampleProductIdStyles.results })
    this.setState({ reviews: sampleData.sampleData.results })
    this.setState({ selectedStyle: sampleProductIdStyles.sampleProductIdStyles.results[0] })
  }
  starToggle () {
    this.setState({starToggled: !this.state.starToggled}) //need to communitcate to yassir
  }

  componentDidMount () { this.initialRender() }
  render () {
    // console.log(this.state.selectedStyle.photos, "photooooos")
    // if (this.state.selectedStyle.photos[0] === {}) {
    //   return (
    //     <div>  Please Wait while we load our products... </div>
    //   );
    // } else {
      return (
      <div>
       <p> OverView Place Holder </p>
       <div data-testid='name header'>NAME: {this.state.product.name}</div>
       <div>PRICE: {this.state.selectedSize.price}</div>
       <div>CATEGORY: {this.state.product.category}</div>
       <div>TITLE:{this.state.product.slogan} </div>
       <div>DESCRIPTION: {this.state.product.description} </div>
       <div>STAR RATINGS: </div>
       <a className="skip-link" href="#Reviews">Read all {this.state.reviews.length} reviews</a>
       {/* Still need to fix href link to reviews component */}
       <button onClick = {this.starToggle}>Star toggle</button>
       {/* <img src={this.state.selectedStyle.photos[0].url} alt="Girl in a jacket" width="500" height="600"/> */}
       {this.state.styles.map(style => (<div key = {style.style_id}>
        <img src={style.photos[0].thumbnail_url} alt="style thumbNail" width="500" height="600"/>
          </div>)
      )}
       </div>
      )
    }
  }
//}

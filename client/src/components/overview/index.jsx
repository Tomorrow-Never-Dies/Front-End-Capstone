import React from 'react';
import sampleProducts from '../../../../fixtures/Overview/Products.js';
import sampleProductIdStyles from '../../../../fixtures/Overview/IdProducts.js';
import sampleProductId from '../../../../fixtures/Overview/ProductsID.js';
import sampleData from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import $ from 'jquery';
import './look.css';

export default class OverView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      products: [],
      product: undefined,
      styles: undefined,
      reviews: [],
      selectedStyle: {},
      selectedSize: {},
      starToggled: false
    };
    // this.initialRender = this.initialRender.bind(this);
    this.starToggle = this.starToggle.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getproducts = this.getproducts.bind(this);
  }

  // initialRender () {
  //   this.setState({ product: sampleProducts.sampleProducts[0] })
  //   this.setState({ styles: sampleProductIdStyles.sampleProductIdStyles.results })
  //   this.setState({ reviews: sampleData.sampleData.results })
  //   this.setState({ selectedStyle: sampleProductIdStyles.sampleProductIdStyles.results[0] })
  // }

  starToggle () {
    // console.log(this.state.starToggled, 'togggleeee')

    this.setState({ starToggled: !this.state.starToggled }) // need to communitcate to yassir
  }

  getproducts () {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      context: this,
      url: `/products/${this.props.id}`,
      data: { id: this.props.id },
      success: (data) => {
        // console.log(data, 'dataaaaaa22')
        this.setState({ product: data[0] });
      },
      error: (error) => {
        console.log(error, 'error geting data in ajaxxxx');
      }
    });
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      context: this,
      url: `/products/${this.props.id}/styles`,
      data: {
        id: this.props.id
      },
      success: (data) => {
        console.log(data.results, 'data from stylesssss333')
        this.setState({ styles: data.results, selectedStyle: data.results[0] });
      },
      error: (error) => {
        console.log(error, 'error geting data in ajaxxxx');
      }
    });

    // $.ajax({
    //   type: 'GET',
    //   contentType: 'application/json',
    //   context: this,
    //   data: {id: this.props.id},
    //   url: `/getReview/${this.props.id}`,
    //   success: (data) => {
    //     console.log(data, 'data from reviewwww')
    //     //this.setState({ reviews: data});
    //   },
    //   error: (error) => {
    //     console.log(error, 'error geting data in ajaxxxx');
    //   }
    // });
  }

  addToCart () {
    console.log('added to cart!')
  }

  changeSelectedStyle (event) {
    console.log('selected style changed');
    console.log(event.target, 'eeeeeee')
    // this.setState({selectedStyle: });
    // also need to add checkmark
  }

  componentDidMount () { this.getproducts() }
  render () {
    // console.log(this.state.product, 'productssssss')

    if (this.state.styles === undefined || this.state.product === undefined) {
      return (
        <div>  Render products overview here...
          <div id="placeholder-div">fetching data. Please wait...</div>
        </div>
      );
    } else {
      return (
      <div>
       <p> OverView Place Holder </p>
       <div className = "gallery">
       {this.state.selectedStyle.photos !== {}
         ? <img className = "mainImg" src={this.state.selectedStyle.photos[0].url} />
         : <div>  Please Wait while we load our products... </div> }

        {this.state.selectedStyle.photos.map(image => (
          <img className="selectedStyleImages" src={image.thumbnail_url} />
        )
        )}
       </div>
       <div data-testid='name header'>NAME: {this.state.product.name}</div>
       <div>PRICE: ${this.state.selectedStyle.original_price}</div>
       <div>CATEGORY: {this.state.product.category}</div>
       <div>TITLE:{this.state.product.slogan} </div>
       <div>DESCRIPTION: {this.state.product.description} </div>
       <div>STAR RATINGS: </div>
       <a className="skip-link" href="#Reviews">Read all {this.state.reviews.length} reviews</a>
       <button onClick = {this.starToggle}>Star toggle</button>
       {this.state.styles.map(style => (<div key = {style.style_id}>

        <img className="styleList" src={style.photos[0].thumbnail_url} onClick = {this.changeSelectedStyle} />
          </div>)
       )}

        <form>
        <b> Select your Size </b>
        <select id = "mySize" >
        <option> ---Choose size--- </option>
        <option> place holder1 </option>
        <option> place holder2 </option>
        </select>
        </form>
        <form>
        <b> Select your Quantity </b>
        <select id = "myQuantity" >
        <option> ---Choose Quantity--- </option>
        <option> place holder1 </option>

        <option> place holder2 </option>
        </select>
        </form>
        <button onClick = {this.addToCart}>Add to cart!</button>
      </div>
      )
    }
  }
}

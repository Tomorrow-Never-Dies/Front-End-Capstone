import React, { useState, useEffect } from 'react';
import sampleProducts from '../../../../fixtures/Overview/Products.js';
import sampleProductIdStyles from '../../../../fixtures/Overview/IdProducts.js';
import sampleProductId from '../../../../fixtures/Overview/ProductsID.js';
import sampleData from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import $ from 'jquery';
import './style.css';
import StarOverview from '../ratings&reviews/Stars/StarOverview.jsx';

export default class OverView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      productsID: this.props.id,
      products: [],
      product: undefined,
      styles: undefined,
      reviews: [],
      selectedStyle: {},
      selectedSize: {},
      starToggled: false,
      mainImg: undefined,
      outofstock: false,
      reviewsLen: 0,
      quantity: null
    };
    // this.initialRender = this.initialRender.bind(this);
    this.starToggle = this.starToggle.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getproducts = this.getproducts.bind(this);
    this.changeSelectedStyle = this.changeSelectedStyle.bind(this);
    this.changeMainImg = this.changeMainImg.bind(this);
    this.executeScroll = this.executeScroll.bind(this);
    this.checkForInventory = this.checkForInventory.bind(this);
    this.disableoptions = this.disableoptions.bind(this);
    this.setQuantity = this.setQuantity.bind(this)
  }

  // initialRender () {
  //   this.setState({ product: sampleProducts.sampleProducts[0] })
  //   this.setState({ styles: sampleProductIdStyles.sampleProductIdStyles.results })
  //   this.setState({ reviews: sampleData.sampleData.results })
  //   this.setState({ selectedStyle: sampleProductIdStyles.sampleProductIdStyles.results[0] })
  // }

  starToggle () {
    this.setState({ starToggled: !this.state.starToggled }) // need to communitcate to yassir
  }

  getproducts () {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      context: this,
      url: `/products/${this.state.productsID}`,
      data: { id: this.state.productsID },
      success: (data) => {
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
      url: `/products/${this.state.productsID}/styles`,
      data: {
        id: this.state.productsID
      },
      success: (data) => {
        console.log(data.results[0], 'data from stylesssss333')
        this.setState({ styles: data.results, selectedStyle: data.results[0], mainImg: data.results[0].photos[0].url });
        this.checkForInventory()
      },
      error: (error) => {
        console.log(error, 'error geting data in ajaxxxx');
      }
    });
    console.log(this.props.reviews, "ffff", this.props.reviewsLen, "dfskldfjk")
    // $.ajax({
    //   type: 'GET',
    //   contentType: 'application/json',
    //   context: this,
    //   data: { id: this.state.productsID },
    //   params: {
    //     id: this.state.productsID
    //   },
    //   url: '/getReviewMeta',
    //   success: (data) => {
    //     let count = 0;
    //     for (const key in data.ratings) {
    //       count += parseInt(data.ratings[key])
    //     }
    //     this.setState({ reviews: data, reviewsLen: count });
    //   },
    //   error: (error) => {
    //     console.log(error, 'error geting data in ajaxxxx reviewwww');
    //   }
    // });
  }

  addToCart () {
    console.log('added to cart!')
    if (document.getElementById('mySize').selectedOptions[0].label === '---Select size---' ||
    document.getElementById('myQuantity').selectedOptions[0].label === '-') {
      alert('Please select size and qauntity to add to cart!')
    }
  }

  changeSelectedStyle (event) {
    for (let i = 0; i < this.state.styles.length; i++) {
      if (event.target.id == this.state.styles[i].style_id) {
        this.setState({ selectedStyle: this.state.styles[i], mainImg: this.state.styles[i].photos[0].url })
        break;
      }
    }
  }

  changeMainImg (event) {
    this.setState({ mainImg: event.target.src })
  }

  executeScroll () {
    document.getElementsByClassName('Reviews')[0].scrollIntoView({ behavior: 'smooth' })
  }

  checkForInventory () {
    let count = 0;
    Object.keys(this.state.selectedStyle.skus).map((key) => {
      if (this.state.selectedStyle.skus[key].quantity > 0) {
        count++
      }
    })
    if (count === 0) {
      this.setState({ outofstock: true })
    }
  }

  disableoptions () {
    document.getElementById('sizeBanner').innerHTML = 'OUT OF STOCK';
    Array.from(document.getElementsByClassName('sizes')).map((option) => {
      option.disabled = true;
    })
  }

  setQuantity () {
    const label = document.getElementById('mySize').selectedOptions[0].label
    if (label === '---Select size---') {
      const select = document.getElementById('myQuantity')

      const opt = document.createElement('option');
      opt.innerHTML = '-';
      select.appendChild(opt);
    } else if (label !== 'OUT OF STOCK' && label !== '---Select size---') {
      const i = 1;
      let quan = 1;
      Object.keys(this.state.selectedStyle.skus).map((key) => {
        if (this.state.selectedStyle.skus[key].size === label) {
          quan = this.state.selectedStyle.skus[key].quantity
        }
      })
      this.setState({ quantity: quan })
    }
  }

  componentDidMount () {
    this.getproducts()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.state.productsID) {
      this.setState({
        productsID: nextProps.id
      }, () => {
        console.log(this.state.productsID, 'state id')
        this.getproducts()
      })
    }
  }

  render () {
    if (this.state.styles === undefined || this.state.product === undefined) {
      return (
        <div>  Render products overview here...
          <div id="placeholder-div">fetching data. Please wait...</div>
        </div>
      );
    } else {
      return (
      <div>
       <div className = "gallery">
        <div>
       {this.state.selectedStyle.photos !== {}
         ? <img className = "mainImg" src={this.state.mainImg} />
         : <div>  Please Wait while we load our products... </div> }
        </div>
        <div>
        {this.state.selectedStyle.photos.map(image => (
          <img className="selectedStyleImages" src={image.thumbnail_url} onClick = {this.changeMainImg}/>
        )
        )}
        </div>
       </div>

       <div data-testid='name header'>NAME: {this.state.product.name}</div>
       <div>PRICE: ${this.state.selectedStyle.original_price}</div>
       <div>CATEGORY: {this.state.product.category}</div>
       <div>TITLE:{this.state.product.slogan} </div>
       <div>DESCRIPTION: {this.state.product.description} </div>

       <div>
       {this.props.reviewsLen > 0
         ? <div> <div data-testid='reviews'>STAR RATINGS: </div>
       <a className="skip-link" href="#Reviews" onClick = {this.executeScroll}>Read all {this.props.reviewsLen} reviews</a>
       <div> {this.props.reviews !== [] ? <StarOverview data = {this.props.reviews} component={"related"} />: "no reviews" }</div>
       </div>
         : <div></div>}
       </div>
       <button onClick = {this.starToggle}>LIKE</button>
       <div>
        Selected Style Name: {this.state.selectedStyle.name}
       </div>
       {this.state.styles.map(style => (<div key = {style.style_id}>

        <img className="styleList" src={style.photos[0].thumbnail_url} id ={style.style_id} onClick = {this.changeSelectedStyle} />
          </div>)
       )}
        <div>
        <form>
        <b> Select your Size </b>
        <select id = 'mySize' onChange = {this.setQuantity}>
        <option id = 'sizeBanner' className = 'sizes'> ---Select size--- </option>
        {
          Object.keys(this.state.selectedStyle.skus).map((key) => {
            if (this.state.selectedStyle.skus[key].quantity > 0) {
              return <option className = 'sizes'> {this.state.selectedStyle.skus[key].size} </option>
            }
          })
      }
        </select>
        </form>
        </div>
          {this.state.outofstock
            ? this.disableoptions()
            : null
          }
        <form>
        <b> Select your Quantity </b>
        <select id = "myQuantity" >
        {Array.from({ length: this.state.quantity }).map((it, index) => { if (index <= 14) { return <option>{index + 1}</option> } })}
        </select>
        </form>
        <button onClick = {this.addToCart}>Add to cart!</button>
      </div>
      )
    }
  }
}

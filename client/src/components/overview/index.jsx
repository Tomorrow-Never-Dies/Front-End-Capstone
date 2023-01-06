import React, { useState, useEffect } from 'react';
import sampleProducts from '../../../../fixtures/Overview/Products.js';
import sampleProductIdStyles from '../../../../fixtures/Overview/IdProducts.js';
import sampleProductId from '../../../../fixtures/Overview/ProductsID.js';
import sampleData from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
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
      mainImg: undefined,
      outofstock: false,
      reviewsLen: 0,
      quantity: null
    };
    // this.initialRender = this.initialRender.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getproducts = this.getproducts.bind(this);
    this.changeSelectedStyle = this.changeSelectedStyle.bind(this);
    this.changeMainImg = this.changeMainImg.bind(this);
    this.executeScroll = this.executeScroll.bind(this);
    this.checkForInventory = this.checkForInventory.bind(this);
    this.disableoptions = this.disableoptions.bind(this);
    this.setQuantity = this.setQuantity.bind(this)
    this.changeMainImgBack = this.changeMainImgBack.bind(this);
    this.changeMainImgForward = this.changeMainImgForward.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  // initialRender () {
  //   this.setState({ product: sampleProducts.sampleProducts[0] })
  //   this.setState({ styles: sampleProductIdStyles.sampleProductIdStyles.results })
  //   this.setState({ reviews: sampleData.sampleData.results })
  //   this.setState({ selectedStyle: sampleProductIdStyles.sampleProductIdStyles.results[0] })
  // }


  getproducts () {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      context: this,
      url: `/products/${this.state.productsID}`,
      data: { id: this.state.productsID },
      success: (data) => {
        console.log(data, "producttttt")
        this.setState({ product: data });
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
        this.setState({ styles: data.results, selectedStyle: data.results[0], mainImg: data.results[0].photos[0].url });
        this.checkForInventory()
      },
      error: (error) => {
        console.log(error, 'error geting data in ajaxxxx');
      }
    });
  }

  addToCart (event) {
    if (document.getElementById('mySize').selectedOptions[0].label === '---Select size---') {
    //   var event;
    //  event = document.createEvent('MouseEvents');
    // event.initMouseEvent('mousedown', true, true, window);
    // document.getElementById('mySize').dispatchEvent(event)

    }
  }

  changeSelectedStyle (event) {
    for (let i = 0; i < this.state.styles.length; i++) {
      if (event.target.id == this.state.styles[i].style_id) {
        this.setState({ selectedStyle: this.state.styles[i], mainImg: this.state.styles[i].photos[0].url })
        document.getElementsById(event.target.id).setAttribute("alt","10003");
        break;
      }
    }
  }

  changeMainImg (event) {
    this.setState({ mainImg: event.target.src })
  }

  checkMark() {
    //if selected id equal to stylelist style id
    //return div with checkmark inside thumbnails div as child div
  }
  changeMainImgBack() {
    for(var i = 0; i < this.state.selectedStyle.photos.length; i++){
      var newMain = '';
      if(this.state.selectedStyle.photos[i].thumbnail_url == this.state.mainImg && i == 0) {
        newMain = this.state.selectedStyle.photos[this.state.selectedStyle.photos.length -1].thumbnail_url
        break;
      }else if (this.state.selectedStyle.photos[i].thumbnail_url == this.state.mainImg) {
        newMain = this.state.selectedStyle.photos[i-1].thumbnail_url
        break;
      }else if (this.state.selectedStyle.photos[i].url == this.state.mainImg && i === 0){
        newMain = this.state.selectedStyle.photos[this.state.selectedStyle.photos.length -1].thumbnail_url
        break;
      }
    }
    this.setState({mainImg: newMain})
  }

  fullScreen() {
    document.querySelector('.mainImg').classList.toggle('expand');
  }

  changeMainImgForward() {
    for(var i = 0; i < this.state.selectedStyle.photos.length; i++){
      var newMain = '';
      if(this.state.selectedStyle.photos[i].thumbnail_url == this.state.mainImg && i == this.state.selectedStyle.photos.length -1) {
        newMain = this.state.selectedStyle.photos[0].thumbnail_url
        break;
      }else if (this.state.selectedStyle.photos[i].thumbnail_url == this.state.mainImg) {
        newMain = this.state.selectedStyle.photos[i+1].thumbnail_url
        break;
      }else if (this.state.selectedStyle.photos[i].url == this.state.mainImg && i === 0){
        newMain = this.state.selectedStyle.photos[i+1].thumbnail_url
        break;
      }
    }
    this.setState({mainImg: newMain})
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
      console.log(this.state.selectedStyle, "sssss")

      return (
      <div className = 'all-overview'>
        <h1 className = 'logo'>TND</h1>
      <div className = 'flex-container'>
       <div className = "leftSideImage">
       <div className = 'carousel'>
          <div className = 'carousel-buttons'>
            <div className = 'carousel-button_up' onClick = {this.changeMainImgBack}><ArrowDropUpIcon/></div>
            <div className = 'carousel-button_down' onClick = {this.changeMainImgForward}> <ArrowDropDownIcon/></div>
          </div>
        <div className='side-images'>
        {this.state.selectedStyle.photos.map(image => (
          <img className="selectedStyleImages" src={image.thumbnail_url} onClick = {this.changeMainImg}/>
        )
        )}
        </div>
        </div>
        <div className="flex-child">
        <div className = 'main-img-button_back' onClick = {this.changeMainImgBack}><ArrowBackIcon/></div>
        <div className = 'main-img-button_forward' onClick = {this.changeMainImgForward}> <ArrowForwardIcon/></div>
        <div className = 'fullscreen' onClick ={this.fullScreen}><FullscreenIcon/></div>
       {this.state.selectedStyle.photos !== {}
         ? <img className = "mainImg" src={this.state.mainImg} id = {this.state.selectedStyle.style_id} />
         : <div>  Please Wait while we load our products... </div> }
        </div>
       </div>

      <div className = 'rightSideSelect'>
       {this.props.reviewsLen > 0
         ? <div className = 'allReviews'>
            <div className = 'StarsOverview'> {this.props.reviews !== [] ? <StarOverview data = {this.props.reviews} component={'related'} /> : 'no reviews' }</div>
            <a className="skip-link" href="#Reviews" onClick = {this.executeScroll}>Read all {this.props.reviewsLen} reviews</a>
            </div>
         : <div></div>}
       <div className = 'category'><font size="+2">{this.state.product.category}</font></div>
       <div className = 'name' data-testid='name header'><font size="+4"><strong>{this.state.product.name}</strong></font></div>
       <div className = 'price'>${this.state.selectedStyle.original_price}</div>
       <div className = 'styleName'><strong>Style > </strong> {this.state.selectedStyle.name}</div>
       <div className = 'thumbNails'>
       {this.state.styles.map(style => (<div className="thumb-nail" key = {style.style_id}>

        <img className="styleList" src={style.photos[0].thumbnail_url} id ={style.style_id} onClick = {this.changeSelectedStyle}/>
         </div>)
       )}
       </div>


       <div className = 'select-menu'>
       <div className = 'SelectSize'>
        <form>
          <select id = 'mySize' onChange = {this.setQuantity}>
            <option id = 'sizeBanner' className = 'sizes'>---Select size---</option>
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
        <div className = 'selectQuantity'>
        {this.state.outofstock
          ? this.disableoptions()
          : null
        }
        <form>
        <select id = "myQuantity" >
        {Array.from({ length: this.state.quantity }).map((it, index) => { if (index <= 14) { return <option>{index + 1}</option> } })}
        </select>
        </form>
        </div>

       </div>

       <div className = 'select-menu'>
        <Button variant="outlined" style={{color: "black", border: '1px solid black'}} onClick = {this.addToCart}  >Add to cart!</Button>

        <Button variant="outlined" style={{color: "black",  border: '1px solid black'}} onClick = {()=>{this.props.starToggle()}} ><StarIcon/></Button>


       </div>

      </div>
      </div>
      <div className = "third_bottom">

      <div className = 'description'>
        <div className = 'title'><strong>{this.state.product.slogan}</strong></div>
        <div className = 'slogan'>{this.state.product.description} </div>
      </div>
      <div className = "vertical"></div>
      <div className = 'features'>
        {this.state.product.features.map((item) => {
          return <div> &#x2713; {item.feature}: {item.value}</div>
        })}

      </div>
      </div>

      </div>
      )
    }
  }
}

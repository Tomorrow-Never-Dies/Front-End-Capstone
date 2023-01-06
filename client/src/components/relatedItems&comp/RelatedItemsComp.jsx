import React, { Component } from "react";
import axios from "axios";
import Items from "./items.jsx";
import Comparison from "./Comparison.jsx";




// Refactor repeated code.

class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: props.id,
      products:[],
      related_products:[],
      products_array:[],
      current_product:{},
      compare_product:{},
      activeIndex: 0,
      metaData: [],
      compared: false,
      stars: false
    }
    this.get_update = this.get_update.bind(this)
    this.compare = this.compare.bind(this)
    this.carousel = this.carousel.bind(this)
    this.index = this.index.bind(this)
    this.close_compare = this.close_compare.bind(this)
  }

  componentDidMount(){
    console.log("testt")
    this.get_update()
  }

  get_update(){
    console.log(this.state.productsID, "state id")
    var style_promises =[]
    var star_promises = []
    axios({
      method: 'get',
      url: "/products/:product_id/related",
      params:{
        id: this.state.productsID
      }
    })
    .then((result)=>{
      // console.log(result)
      this.setState({
        related_products :result.data
      }, function(){
        for(var i = 0 ; i<this.state.related_products.length; i++){
          style_promises.push(   axios({
            method: 'get',
            url: "/products/:product_id/styles",
            params:{
              id: this.state.related_products[i]
            }
          })
          .catch((err) =>{

          }))
          star_promises.push( axios.get('/getReviewMeta', {
            params: {
              id: this.state.related_products[i]
            }
          }))
        }
      })
      Promise.all(style_promises)
        .then((result)=>{
          this.setState({
            products: result
          }, function(){
          })
        })
      Promise.all(star_promises)
        .then((result) =>{
          console.log(result)
          this.setState({
            metaData: result,
            stars:true
          }, ()=>{
            console.log(this.state.related_products)
            console.log(this.state.metaData)})
        })
    })
    .catch((err) => {
    })

  }

  componentWillReceiveProps(nextProps){
      if(nextProps.id !== this.state.productsID){
        this.setState({
          productsID:nextProps.id
        },() =>{
          console.log(this.state.productsID, "state id")
          this.get_update()
        })
    }


  }




  compare(id){
    axios({
      method: 'get',
      url: "/products/:product_id",
      params:{
        id: this.state.productsID
      }
    })
    .then((result) =>{
      console.log(result, "result")
      this.setState({
        current_product: result.data
      })
    })
    .then(()=>{
      axios({
        method: 'get',
        url: "/products/:product_id",
        params:{
          id: id
        }
      })
      .then((result) =>{
        console.log(result, 'ressullttss')
        this.setState({
          compare_product: result.data,
          compared: true
        }, ()=>{ console.log(this.state, "state")})

      })
    })

  }

  close_compare(){

    this.setState({
      compared: false
    })

  }


 index(num_cards){
  var index = ((num_cards/2.5)-1) *10
  index = (index - (index%5))/10
  var clicks = index * .2
  return clicks
 }


 carousel(str){
    console.log(this.state.related_products.length)
    console.log(this.index(this.state.related_products.length))
    if(this.state.activeIndex < this.state.related_products.length -3 && str === 'next') {
      this.setState({
        activeIndex: this.state.activeIndex+.20
      }, ()=>{console.log(this.state.activeIndex)})
    } else if(str === 'next'){
      this.setState({
        activeIndex: 0
      }, ()=>{console.log(this.state.activeIndex)})
    } else if(this.state.activeIndex > 0 && str === 'prev') {
      this.setState({
       activeIndex: this.state.activeIndex-.5
      }, ()=>{console.log(this.state.activeIndex)})
      } else if(str === 'prev'){
        this.setState({
          activeIndex: this.state.related_products.length -3
        }, ()=>{console.log(this.state.activeIndex)})
      }

 }
  render(){
    return(
      <div className="main">
        {this.state.compared ?
        <Comparison
        current = {this.state.current_product}
        compare = {this.state.compare_product}
        close = {this.close_compare}
        />

        : null}
        <button data-testid='prev-button' className="scroll-left" onClick={()=>{ this.carousel('prev')}}>
        &larr;
        </button>
         <div  data-testid='main-component' className ="carousel-container">
            <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${this.state.activeIndex*100}%)`}}>
              <Items
                products = {this.state.products}
                click = {this.props.click}
                compare = {this.compare}
                metaData = {this.state.metaData}
                type = {"related"}
              />
            </div>
         </div>
         <button data-testid='next-button' className="scroll-right" onClick={()=>{ this.carousel('next')}}>
         &rarr;
          </button>
      </div>

    )
  }
}


export default RelatedItemsComp;
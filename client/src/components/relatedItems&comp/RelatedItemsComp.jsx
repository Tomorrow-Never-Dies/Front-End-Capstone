import React, { Component } from "react";
import axios from "axios";
import Items from "./items.jsx";




class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: props.id,
      products:[],
      related_products:[],
      products_array:[],
      current_product:[],
      compare_product:[],
      activeIndex: 0
    }
    this.get_update = this.get_update.bind(this)
    this.update_id = this.update_id.bind(this)
    this.compare = this.compare.bind(this)
    this.carousel = this.carousel.bind(this)
  }

  componentDidMount(){
    this.get_update()
  }

  get_update(){
    var get_promises =[]
    axios({
      method: 'get',
      url: "/products/:product_id/related",
      params:{
        id: this.state.productsID
      }
    })
    .then((result)=>{
      console.log(result)
      this.setState({
        related_products :result.data
      }, function(){
        for(var i = 0 ; i<this.state.related_products.length; i++){
          get_promises.push(   axios({
            method: 'get',
            url: "/products/:product_id/styles",
            params:{
              id: this.state.related_products[i]
            }
          })
          .catch((err) =>{

          }))
        }
      })
      Promise.all(get_promises)
        .then((result)=>{
          this.setState({
            products: result
          }, function(){
          })
        })
    })
    .catch((err) => {
    })

  }
  update_id(id){
    this.setState({
      productsID: id
    }, () =>{
      console.log(this.state.productsID)
      this.get_update()
    })
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
      this.setState({
        current_product: this.state.current_product.concat(result.data.features)
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
        this.setState({
          compare_product: this.state.compare_product.concat(result.data.features)
        })

      })
    })

  }
 carousel(str){
    if(this.state.activeIndex < this.state.related_products.length -3.5 && str === 'next') {
      this.setState({
        activeIndex: this.state.activeIndex+.5
      })
    } else if(str === 'next'){
      this.setState({
        activeIndex: 0
      })
    } else if(this.state.activeIndex > 0 && str === 'prev') {
      this.setState({
       activeIndex: this.state.activeIndex-.5
      })
      } else if(str === 'prev'){
        this.setState({
          activeIndex: this.state.related_products.length -3.5
        })
      }
 }
  render(){
    return(
      <div>
         <div  data-testid='main-component' className ="carousel-container">
            <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${this.state.activeIndex*100}%)`}}>
              <Items
                products = {this.state.products}
                click = {this.props.click}
                id_update = {this.update_id}
                compare = {this.compare}
              />
            </div>
         </div>
      <button data-testid='prev-button' onClick={()=>{ this.carousel('prev')}}>
          prev
        </button>
        <button data-testid='next-button' onClick={()=>{ this.carousel('next')}}>
          Next
        </button>
      </div>

    )
  }
}


export default RelatedItemsComp;
import React, { Component } from "react";
import axios from "axios";
import Carousel from "./carousel.jsx";
import ProductCards from "./productcard.jsx";



class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    console.log(props, "propyprops")
    this.state = {
      productsID: props.id,
      products:[],
      related_products:[],
      products_array:[]
    }
    this.get_update = this.get_update.bind(this)
    this.update_id = this.update_id.bind(this)
  }

  componentDidMount(){
    this.get_update()
  }

  get_update(){
    console.log("related")
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
            console.log(err, "inner error")
          }))
        }
      })
      Promise.all(get_promises)
        .then((result)=>{
          this.setState({
            products: result
          }, function(){
            console.log(this.state.products, "products")
          })
        })
    })
    .catch((err) => {
      console.log(err, "error")
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
  render(){
    return(
      <div>
        {/* <ProductCards data = {this.state.products} /> */}
        <Carousel products = {this.state.products} click = {this.props.click} id_update = {this.update_id}/>
      </div>
    )
  }
}


export default RelatedItemsComp;
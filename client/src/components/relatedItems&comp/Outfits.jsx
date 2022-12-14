import React, { Component } from "react";
import axios from "axios";
import Outfit_Carousel from "./Outfit_Carousel.jsx";
import ProductCards from "./productcard.jsx";



class Outfits extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: props.id,
      product_ids: [],
      product_styles:[]
    }
    this.add = this.add.bind(this)
    this.get_products = this.get_products.bind(this)
    this.update_id = this.update_id.bind(this)
  }

  get_products(){
        axios({
            method: 'get',
            url: "/products/:product_id/styles",
            params:{
              id: this.state.productsID
            }
          })
          .then((result) =>{
            console.log(result, "outfits result")
            this.setState({
              product_styles: this.state.product_styles.concat(result)
            })
          })
          .catch((err) =>{
            console.log(err, "inner error")
          })
  }

  add(){
    this.setState({
      productsID:this.props.id
    }, ()=>{
      if(!this.state.product_ids.includes(this.state.productsID)){
        this.setState({
          product_ids: this.state.product_ids.concat(this.state.productsID)
        }, () =>{
          this.get_products()
          console.log(this.state.product_ids, "state")
        })
      } else{
        console.log(this.state)
      }


    })

  }
  update_id(id){
    this.setState({
      productsID: id
    }, () =>{
      console.log(this.state.productsID)
    })
  }

  render(){
    return(
      <div>
        <Outfit_Carousel add ={this.add} products = {this.state.product_styles} id_update = {this.update_id} click = {this.props.click} />
      </div>
    )
  }
}


export default Outfits;
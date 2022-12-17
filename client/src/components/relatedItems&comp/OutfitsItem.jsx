import React, { Component } from "react";
import axios from "axios";
import Items from "./items.jsx"




class Outfits extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: props.id,
      product_ids: [],
      product_styles:[],
      activeIndex: 0
    }
    this.add = this.add.bind(this)
    this.get_products = this.get_products.bind(this)
    this.update_id = this.update_id.bind(this)
    this.carousel = this.carousel.bind(this)
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
        })
      } else{
      }


    })

  }
  update_id(id){
    this.setState({
      productsID: id
    }, () =>{

    })
  }

  carousel(str){
    if(this.state.activeIndex < this.state.product_ids.length  && str === 'next') {
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
          activeIndex: this.state.product_ids.length
        })
      }
 }

  render(){
    return(
      <div>
           <div  data-testid='main-component' className ="carousel-container">
              <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${this.state.activeIndex*100}%)`}}>
              <Items add ={this.add} products = {this.state.product_styles} id_update = {this.update_id} click = {this.props.click} />
              </div>
           </div>
        <button data-testid='add-button' onClick={
          this.add}>
          Add
        </button>
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


export default Outfits;
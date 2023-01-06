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
      activeIndex: 0,
      metaData:[],
      starToggled: false,
    }
    this.add = this.add.bind(this)
    this.get_products = this.get_products.bind(this)
    this.update_id = this.update_id.bind(this)
    this.carousel = this.carousel.bind(this)
    this.delete = this.delete.bind(this)
  }

  get_products(){
    var star_promises = []
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
          .then(()=>{
            axios.get('/getReviewMeta', {
              params: {
                id: this.state.productsID
              }
            })
            .then((result) =>{
              console.log(this.state.productsID)
              console.log(result)
            this.setState({
              metaData: result,
            }, ()=>{
              console.log(this.state.metaData)})
          })
          })



          .catch((err) =>{
            console.log(err, "inner error")
          })
  }

  componentWillReceiveProps(nextProps){
    console.log(this.props)
    if(nextProps.starToggled){
      console.log("toggeled")
      this.setState({
        productsID:nextProps.id,
        starToggled: true
      },() =>{
        console.log(this.state.productsID, "state id")
        this.add()
      })
  } else if(nextProps.starToggled !== this.state.starToggled){
    this.delete(this.state.productsID)
  }

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
  delete(id){
    console.log(id, "id")
    console.log(Number(id), "id number")
    console.log("delete", this.state.product_ids)
    var index = this.state.product_ids.filter(item =>  Number(item) !== Number(id))
    console.log(index, "index")
    this.setState({
      product_ids: this.state.product_ids.filter(item =>  Number(item) !== Number(id)),
      product_styles:  this.state.product_styles.filter(item =>  Number(item.data.product_id) !== Number(id))
    }, ()=>{console.log(this.state.product_styles, "state")})
  }
  update_id(id){
    this.setState({
      productsID: id
    }, () =>{

    })
  }

  carousel(str){
    if(this.state.activeIndex < (this.state.related_products.length - 3)*.25 && str === 'next') {
      this.setState({
        activeIndex: this.state.activeIndex+.25
      }, ()=>{console.log(this.state.activeIndex)})
    } else if(str === 'next'){
      this.setState({
        activeIndex: 0
      }, ()=>{console.log(this.state.activeIndex)})
    } else if(this.state.activeIndex > 0 && str === 'prev') {
      this.setState({
       activeIndex: this.state.activeIndex-.25
      }, ()=>{console.log(this.state.activeIndex)})
      } else if(str === 'prev'){
        this.setState({
          activeIndex: (this.state.related_products.length -3)*.25
        }, ()=>{console.log(this.state.activeIndex)})
      }

 }

  render(){
    return(
      <div className="main">
            <button data-testid='prev-button' className="scroll-left" onClick={()=>{ this.carousel('prev')}}>
              &larr;
           </button>
           <div  data-testid='main-component' className ="carousel-container">
              <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${this.state.activeIndex*100}%)`}}>
                <button data-testid='add-button' className="carousel-item"  onClick={() => (this.add())}>
                + Add item
              </button>
              <Items
                add ={this.add}
                products = {this.state.product_styles}
                id_update = {this.update_id}
                click = {this.props.click}
                delete = {this.delete}
                metaData = {this.state.metaData}
                type = {"outfits"}

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


export default Outfits;
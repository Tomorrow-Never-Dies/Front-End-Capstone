import React, { Component } from "react";
import axios from "axios";
//import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"
import Carousel from "./carousel.jsx";
import ProductCards from "./productcard.jsx";



class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: props.id,
      products:[],
      related_products:[]
    }

  }

  componentDidMount(){
    // axios({
    //   method: 'get',
    //   url: "/products/:product_id/related",
    //   params:{
    //     id: this.state.productsID
    //   }
    // })
    // .then((result) =>{
    //   this.setState({
    //     related_products :result
    //   })
    // })
    axios({
      method: 'get',
      url: "/products",
      params:{
        id: this.state.productsID
      }
    })
    .then((result)=>{
      console.log(result)
      this.setState({
        products: result.data
      })

      console.log(this.state.products, "state")
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }

  render(){
    return(
      <div>
        {/* <ProductCards data = {this.state.products} /> */}
        <Carousel products = {this.state.products} />
      </div>
    )
  }
}


export default RelatedItemsComp;
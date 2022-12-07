import React, { Component } from "react";
import axios from "axios";
import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"
import Carousel from "./carousel.jsx";
import ProductCards from "./productcard.jsx";



class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      products: []
    }

  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:3033/products',
    })
    .then((result)=>{
      this.setState({
        products: result.data
      })
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }

  render(){
    return(
      <div>
        <ProductCards data = {this.state.products} />
        <Carousel />
      </div>
    )
  }
}


export default RelatedItemsComp;
import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
import  "./styles/carousel.css"
=======
//import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"
>>>>>>> b29874998e7dad1b7cc95880e853ebbfcc6d8bad
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
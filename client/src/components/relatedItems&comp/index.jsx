import React, { Component } from "react";
import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"
import Carousel from "./carousel.jsx";



class RelatedItemsComp extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }

  }

  render(){
    return(
      <div>
        <Carousel />
      </div>
    )
  }
}


export default RelatedItemsComp;
import React from "react"
import './styles/carousel.css'
import OverView from '../overview/index.jsx'

function ProductCards (props) {
  // console.log("product cards")
  return(
    <div className="carousel-item" onClick={() => <OverView id = {props.item.id}/>}>
      <div> {props.item.name}</div>
      <div> {props.item.category}</div>
      <div className ="item-price"> {props.item.default_price}</div>
    </div>

  )
}

export default ProductCards
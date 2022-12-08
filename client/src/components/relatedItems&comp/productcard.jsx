import React from "react"
import  "./styles/carousel.css"

function ProductCards (props) {
  console.log(props.data)
  return (
    props.data.map(product =>

     <carousel-item>
      {product.description}
     </carousel-item> )
  )
}

export default ProductCards
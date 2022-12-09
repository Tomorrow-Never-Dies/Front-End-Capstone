import React from "react"
//import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"

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
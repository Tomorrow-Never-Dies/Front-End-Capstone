import React from "react"
<<<<<<< HEAD
import  "./styles/carousel.css"
=======
//import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"
>>>>>>> b29874998e7dad1b7cc95880e853ebbfcc6d8bad

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
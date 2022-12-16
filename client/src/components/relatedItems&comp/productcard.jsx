import React from "react"
import './styles/carousel.css'

function ProductCards (props) {
  var url=''
  if(props.item.photos[0].thumbnail_url === undefined){
    url = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
  } else{
    url = props.item.photos[0].thumbnail_url
  }
  return(
    <div>
       <button onClick={() => props.compare(props.id)} >
        compare
       </button>
       <div data-testid='product-card' className="carousel-item" onClick={() => (
        props.click(props.id),
        props.id_update(props.id)
        )}>

        <img src = {url}/ >
      </div>
    </div>



  )
}

export default ProductCards
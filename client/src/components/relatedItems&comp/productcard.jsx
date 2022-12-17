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
    <div data-testid='product-card' className="carousel-item" style={{
      backgroundImage:`url(${url})` }}  onClick={() => (
        props.click(props.id),
        props.id_update(props.id)
        )}>
       <button className = "compare-button" onClick={() => props.compare(props.id)} >
        compare
       </button>
    </div>
  )
}

export default ProductCards
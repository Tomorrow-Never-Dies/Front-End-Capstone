import React from "react"
import './styles/carousel.css'
import App from "/Users/yasereisa/HackReactor/Course/FEC/client/src/App.jsx"

function ProductCards (props) {
  console.log(props)
  var url=''
  if(props.item.photos[0].thumbnail_url === undefined){
    url = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
  } else{
    url = props.item.photos[0].thumbnail_url
  }
  return(
    <div className="carousel-item" onClick={() => (
      props.click(props.id),
      props.id_update(props.id)
      )}>
      <img src = {url}/ >
    </div>

  )
}

export default ProductCards
import React from "react"
import './styles/carousel.css'
import StarOverview from "../ratings&reviews/Stars/StarOverview.jsx";



function ProductCards (props) {
  var metaData = 0
  console.log(props.metaData.data, "props.metadata")
  if(props.metaData.data !== undefined && props.type === "outfits"){
    metaData = props.metaData.data
  } else {
  if(props.metaData !== undefined){
      for(var i =0 ; i< props.metaData.length ; i++){
        if(props.metaData[i].data.product_id === props.id){
          metaData = props.metaData[i].data
        }
      }
    }
    }
  console.log(metaData, "metaData", props.type)

  var url=''
  if(props.item.photos[0].thumbnail_url === undefined){
    url = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
  } else{
    url = props.item.photos[0].thumbnail_url
  }
  return(
    //article
    <article className="card">
          <div className="image" style={{
      backgroundImage:`url(${url})` }}>

          {props.type ==="outfits"?
          <button className="delete_outfit" onClick={()=>props.delete(props.id)}>x</button> :
          <button className = "compare-button" onClick={() => props.compare(props.id)} >
            compare
          </button> }


         <div data-testid='product-card' className="carousel-item"   onClick={() => (
        props.click(props.id)
        )}>


       </div>
       </div>
       <div className="card-info">
          <div className="product-name">
            {props.item.name}
          </div>
          <div className="product-price">
            {props.item.original_price}
          </div>

          {metaData !== 0 ? <StarOverview  data = { metaData} component={props.type} />: "no reviews" }



       </div>

   </article>

  )
}


export default ProductCards
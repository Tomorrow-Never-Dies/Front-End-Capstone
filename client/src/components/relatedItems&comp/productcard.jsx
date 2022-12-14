import React from "react"
import './styles/carousel.css'
import StarOverview from "../ratings&reviews/Stars/StarOverview.jsx";
import StarIcon from '@mui/icons-material/Star';



function ProductCards (props) {
  var metaData = 0
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

  var url=''
  if(props.item.photos[0].thumbnail_url === undefined){
    url = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
  } else{
    url = props.item.photos[0].thumbnail_url
  }
  return(
    //article
    <article className="card">

          <div className="image" style={{backgroundImage:`url(${url})` }}  >

          {props.type ==="outfits"?
          <button data-testid='delete-card' className="delete_outfit" style={{ float: "right"}} onClick={()=>props.delete(props.id)}>x</button> :
          <button className = "compare-button" variant="outlined" style={{color: "white", float: "right"}} onClick={() => props.compare(props.id)} >
            <StarIcon/>
          </button> }

          </div>
          <div data-testid='product-card' className="carousel-item" onClick={() => (props.click(props.id))} >




       <div data-testid='card-info' className="card-info">
          <div data-testid='product-name' className="product-name">
            {props.item.name}
          </div>
          <div data-testid='product-price' className="product-price">
            {props.item.original_price}
          </div>

          {metaData !== 0 ? <StarOverview  data = { metaData} component={props.type} />: "no reviews" }

          </div>

       </div>

   </article>

  )
}


export default ProductCards
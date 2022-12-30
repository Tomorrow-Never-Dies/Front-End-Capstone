import React, { useEffect, useState } from "react";
import ProductCards from "./productcard.jsx"


function Items (props) {
  if(props.products.length > 0 ){
    return (
      <>
            {props.products.map(item =>
               (
               <ProductCards
               compare = {props.compare}
               item = {item.data.results[0] }
               id ={item.data.product_id}
               click = {props.click}
               metaData = {props.metaData}
               type = {props.type}
               delete = {props.delete}
               />

               ))}
       </>
    )
  } else {
    return (
      <>
    </>
    )
  }

}
export default Items;
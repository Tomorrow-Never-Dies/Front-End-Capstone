import React, { useEffect, useState } from "react";
import ProductCards from "./productcard.jsx"
import './styles/carousel.css'





function Outfit_Carousel (props) {
  console.log(props.products[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const updateIndex = (str) => {
    if(activeIndex <4 && str === 'next') {
      setActiveIndex(activeIndex+.50)
    } else if(str === 'next'){
      setActiveIndex(0)
    } else if(activeIndex > 0 && str === 'prev') {
       setActiveIndex(activeIndex-.50)
      } else if(str === 'prev'){
        setActiveIndex(4)
      }
  }

    return (
      <div>
        <div  data-testid='main-component' className ="carousel-container">
          <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${activeIndex*100}%)` }}>
          {props.products.map(item =>
               (
               <ProductCards
               item = {item.data.results[0] }
               id ={item.data.product_id}
               id_update = {props.id_update}
               />

               ))}
          </div>
        </div>
        <button data-testid='next-button' onClick={()=>{
          props.add()}}>
          Add
        </button>
        <button data-testid='prev-button' onClick={()=>{ updateIndex('prev')}}>
          prev
        </button>
        <button data-testid='next-button' onClick={()=>{ updateIndex('next')}}>
          Next
        </button>
    </div>
    )

}
export default Outfit_Carousel;
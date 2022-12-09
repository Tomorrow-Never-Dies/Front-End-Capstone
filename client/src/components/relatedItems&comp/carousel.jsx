import React, { useEffect, useState } from "react";
//import '../styles/carousel.css'





function carousel (props) {

  const [activeIndex, setActiveIndex] = useState(0)
  const updateIndex = (str) => {
    if(activeIndex <4 && str === 'next') {
      setActiveIndex(activeIndex+1)
    } else if(str === 'next'){
      setActiveIndex(0)
    } else if(activeIndex > 0 && str === 'prev') {
       setActiveIndex(activeIndex-1)
      } else if(str === 'prev'){
        setActiveIndex(4)
      }
  }

  return (
    <div>
      <div  data-testid='main-component' className ="carousel-container">
        <div data-testid='inner-component' className = "inner" style={{transform: `translateX(-${activeIndex*100}%)` }}>

          <div data-testid='item-component1' className ="carousel-item">
              item 1
          </div>
          <div data-testid='item-component2' className ="carousel-item">
              item 2
          </div>
          <div data-testid='item-component3' className ="carousel-item">
              item 3
          </div>
          <div data-testid='item-component4' className ="carousel-item">
              item 4
          </div>
          <div data-testid='item-component5' className ="carousel-item">
              item 5
          </div>
        </div>
      </div>
      <button data-testid='prev-button' onClick={()=>{ updateIndex('prev')}}>
        prev
      </button>
      <button data-testid='next-button' onClick={()=>{ updateIndex('next')}}>
        Next
      </button>
  </div>
  )
}
export default carousel;
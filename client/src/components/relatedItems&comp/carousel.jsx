import React, { useEffect, useState } from "react";
import  "/Users/yasereisa/HackReactor/Course/FEC/client/src/components/relatedItems&comp/styles/carousel.css"





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
        <div className = "inner" style={{transform: `translateX(-${activeIndex*100}%)` }}>
          <div className ="carousel-item">
              item 1
          </div>
          <div className ="carousel-item">
              item 2
          </div>
          <div className ="carousel-item">
              item 3
          </div>
          <div className ="carousel-item">
              item 4
          </div>
          <div className ="carousel-item">
              item 5
          </div>
        </div>
      </div>
      <button onClick={()=>{ updateIndex('prev')}}>
        prev
      </button>
      <button onClick={()=>{ updateIndex('next')}}>
        Next
      </button>
  </div>
  )
}
export default carousel;
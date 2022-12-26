import React, { useState, useEffect } from 'react'
import '../reviews.css'

export default function ImageModal(props) {


  return(
    <React.Fragment>
    {props.show && (
      <div className="modal">
        <img className = 'ModalReviewImage' src={props.img} key={`${props.img} modal`} alt="alt tag"/>
        <button onClick={props.onHide}>Close Modal</button>
      </div>
    )}
  </React.Fragment>
  )
}
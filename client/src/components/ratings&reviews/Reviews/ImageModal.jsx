import React, { useState, useEffect } from 'react'
import '../reviews.css'

export default function ImageModal(props) {


  return(
    <React.Fragment>
    {props.show && (
      <div className="modal">
        <button onClick={props.onHide}>x</button>
        <img className = 'ModalReviewImage' src={props.img} key={`${props.img} modal`} alt="alt tag"/>
      </div>
    )}
  </React.Fragment>
  )
}
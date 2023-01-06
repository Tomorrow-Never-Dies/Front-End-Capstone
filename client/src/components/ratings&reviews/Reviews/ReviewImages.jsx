import React, { useState, useEffect } from 'react'
import '../reviews.css'
import ImageModal from './ImageModal.jsx'

export default function ReviewImages(props) {
  const [showModal, setModal] =useState(false);
  const [modalData, setData] = useState(null)

  const hideModal = () => {
    setModal(false);
  };

  const getModal = data => {
    setModal(true);
  };
  useEffect(() => {
    console.log(`props.src for image is equal to ${props.src}`)
  },[props.src])
  return(
    <div className = 'reviewImages'>
      <img className = 'singleReviewImage' width = "100" height = "100" src={props.src} key={props.src} alt="alt tag" onClick = {getModal}/>
      <ImageModal show = {showModal} onHide = {hideModal} img = {props.src} />
    </div>
  )
}
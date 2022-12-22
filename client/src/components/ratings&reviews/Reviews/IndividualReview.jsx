import React, { useState, useEffect } from 'react'
import '../reviews.css'
import ReviewDate from './ReviewDate.jsx'
import reviewHelpers from '../ReviewHelper.jsx'

export default function IndividualReview (props) {

  const [starRating, setRating] = useState(null);
  const [images, setImages] =useState(null);

  useEffect(() => {
    console.log(`props.reviewInfo is equal to ${JSON.stringify(props.reviewInfo)}`); //use props.reviewInfo.rating
    var starRating = reviewHelpers.IndividualStarRating(props.reviewInfo.rating, props.reviewInfo.review_id)
    setRating(starRating);
    var ratingImages = props.reviewInfo.photos.map((imgSrc, index) => (<img className = 'IndividualReviewImage' src={imgSrc.url} key={index} alt=" alt tag"/>))
    setImages(ratingImages)
  }, [props.reviewInfo])
  return (
  <div className = 'singleReview' data-testid = "singleReview">
    {starRating}
    <ReviewDate username = {props.reviewInfo.reviewer_name} date = {props.reviewInfo.date}/>
    <h1>{props.reviewInfo.summary}</h1>
    <p>{props.reviewInfo.body}</p>
    <div>
    {props.reviewInfo.photos.length === 0 ? '' : images}
    </div>

    Helpful? Yes | Report
  </div>
  )
}

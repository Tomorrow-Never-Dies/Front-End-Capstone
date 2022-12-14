import React, { useState, useEffect } from 'react'
import '../reviews.css'
import ReviewDate from './ReviewDate.jsx'

export default function IndividualReview (props) {
  useEffect(() => {
    console.log(`props.reviewInfo is equal to ${JSON.stringify(props.reviewInfo)}`);
  }, [])
  return (
  <div className = 'singleReview' data-testid = "singleReview">
    <ReviewDate username = {props.reviewInfo.reviewer_name} date = {props.reviewInfo.date}/>
    <h1>{props.reviewInfo.summary}</h1>
    <p>{props.reviewInfo.body}</p>
  </div>
  )
}

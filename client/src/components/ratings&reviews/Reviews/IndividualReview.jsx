import React, { useState, useEffect } from 'react';
import '../reviews.css';
import ReviewDate from './ReviewDate.jsx';
import reviewHelpers from '../ReviewHelper.jsx';
import ReviewImages from './ReviewImages.jsx';
import axios from 'axios';

export default function IndividualReview (props) {

  const [starRating, setRating] = useState(null);
  const [images, setImages] = useState(null);
  const [helpfulness, setHelpfulness] = useState(null);
  const [reported, setReported] = useState(false);
  const [markedHelpful, setHelpful] = useState(true);

  function markHelpful (e) {
    e.preventDefault();
    console.log(`marking helpful!`)
    setHelpfulness(helpfulness + 1);
    axios.post('helpful', {
      id: props.review_id
    })
  }

  function reportReview (e) {
    e.preventDefault();
    console.log(`reporting!`);
    axios.post('/reportReview', {
      id: props.review_id
    })
  }

  useEffect(() => {
    console.log(`helpfulness is equal to ${helpfulness}`);
  }, [helpfulness])

  useEffect(() => {
    setHelpfulness(props.reviewInfo.helpfulness);
    console.log(`props.reviewInfo is equal to ${JSON.stringify(props.reviewInfo)}`); //use props.reviewInfo.rating
    var starRating = reviewHelpers.IndividualStarRating(props.reviewInfo.rating, props.reviewInfo.review_id)
    setRating(starRating);
    var ratingImages = props.reviewInfo.photos.map((imgSrc, index) => (<ReviewImages src={imgSrc.url} />))
    setImages(ratingImages)
  }, [props.reviewInfo])
  return (
  <div className = 'singleReview' data-testid = "singleReview">
    {starRating}
    <ReviewDate username = {props.reviewInfo.reviewer_name} date = {props.reviewInfo.date}/>
    <br/>
    <h1>{props.reviewInfo.summary}</h1>
    <p>{props.reviewInfo.body}</p>
    <div>
    {props.reviewInfo.photos.length === 0 ? '' : images}
    </div>
    {props.reviewInfo.recommend ? <div> <i className="fa fa-solid fa-check"></i> I recommend this product </div>: '' }
    {props.reviewInfo.response !== null ? <div className = "response"> Response : {props.reviewInfo.response}</div> : ''}
    <br/>
    <div className = 'helpfulAndReportButton'>
    Was this review helpful? <button className = 'IndividualReviewButton' onClick = {markHelpful} >Yes</button> {helpfulness > 0 ? `(${helpfulness})` : '' } |    <button className = 'IndividualReviewButton' onClick ={reportReview}>Report</button>
    </div>
  </div>

  )
}

import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'
import reviewHelpers from '../ReviewHelper.jsx'
import BarChart from './BarChart.jsx'
import ProductBreakdown from './ProductBreakDown.jsx'

export default function StarOverview (props) {
  // console.log(props)
  const [rating, setRating] = useState(null);
  const [starRating,setStarRating] = useState([]);
  const [recommendedRating, setRecommended] = useState(null);
  const [barChartRating, setBarRatings] = useState(null)
  useEffect(() => {
    let ratings = props.data.ratings;
    let totalStars = reviewHelpers.avgStarRating(ratings);
    if (props.data.recommended) {
      let recommendedPercentage = reviewHelpers.recommend(props.data.recommended);
      setRecommended(recommendedPercentage);
    }
    setStarRating(totalStars);
    setRating(reviewHelpers.calculateAverage(ratings));
    setBarRatings(props.data.ratings);
  }, [props.data])

  if (props.component === 'related' || props.component === 'outfits') {
    return (
      <div className = 'ReviewOverview' key = 'ReviewOverview'>
        <div className = 'StarOverview' key = 'StarOverview'>
        {starRating}
        </div>
      </div>
    )}
  else {
    return (
    <div className = 'ReviewOverview' key = 'ReviewOverview'>
      <div className = 'StarOverview' key = 'StarOverview'>
        <div className = 'ratingNumberAndStar'>
          <div className = 'reviewRatingNumber'>{rating} </div>  <div className = "StarOverviewRating">{starRating}</div>
        </div>
      <br/>
      <div className = 'recommendPercentage'>
      {recommendedRating}% of reviews recommend this product
      </div>
      </div>
      {props.data.ratings ? <BarChart key = {barChartRating} ratings = {barChartRating} onClick = {props.onClickBarChart}/> : "loading"}
      {props.data.ratings ? <ProductBreakdown characteristics = {props.data.characteristics}/> : "loading"}
    </div>
  )}
}

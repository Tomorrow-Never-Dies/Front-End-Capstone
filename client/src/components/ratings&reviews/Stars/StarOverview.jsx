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
    // console.log(`props meta is equal to ${JSON.stringify(props.data.characteristics)}`);
    console.log(`props meta is equal to ${JSON.stringify(props.data)}`);
    let ratings = props.data.ratings;
    // console.log(ratings, "ratings")
    let totalStars = reviewHelpers.avgStarRating(ratings);
    console.log(`recommended data is equal to ${props.data.recommended}`);
    if (props.data.recommended) {
      let recommendedPercentage = reviewHelpers.recommend(props.data.recommended);
      setRecommended(recommendedPercentage);
    }
    setStarRating(totalStars);
    setRating(reviewHelpers.calculateAverage(ratings));
    setBarRatings(props.data.ratings);
   //setRecommended(recommendedPercentage);
  }, [props.data])

  useEffect(() => {
  console.log(`barChartRating is equal to ${JSON.stringify(barChartRating)}`);
  }, [barChartRating])
  if (props.component === 'related' || props.component === 'outfits') {
    return (
      <div className = 'ReviewOverview' key = 'ReviewOverview'>
        <div className = 'StarOverview' key = 'StarOverview'>
        {/* {rating} */}
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
      {props.data.ratings ? <BarChart key = {barChartRating} ratings = {barChartRating}/> : "loading"}
      {props.data.ratings ? <ProductBreakdown characteristics = {props.data.characteristics}/> : "loading"}
    </div>
  )}
}

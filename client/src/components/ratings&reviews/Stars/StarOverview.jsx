import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'
import reviewHelpers from '../ReviewHelper.jsx'
import BarChart from './BarChart.jsx'
import ProductBreakdown from './ProductBreakDown.jsx'

export default function StarOverview (props) {
  const [rating, setRating] = useState(null);
  const [starRating,setStarRating] = useState([]);
  useEffect(() => {
    console.log(`props meta is equal to ${JSON.stringify(props.data.characteristics)}`);
    let ratings = props.data.ratings;
    let totalStars = reviewHelpers.avgStarRating(ratings);
    setStarRating(totalStars);
    setRating(reviewHelpers.calculateAverage(ratings));
  }, [props.data])

  return (
    <div className = 'ReviewOverview' key = 'ReviewOverview'>
      <div className = 'StarOverview' key = 'StarOverview'>
      {rating}
      {starRating}
      </div>
      {props.data.ratings ? <BarChart ratings = {props.data.ratings}/> : "loading"}
      {props.data.ratings ? <ProductBreakdown characteristics = {props.data.characteristics}/> : "loading"}
    </div>








  )
}



import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'
import reviewHelpers from '../ReviewHelper.jsx'
import BarChart from './BarChart.jsx'

export default function StarOverview (props) {
  const [rating, setRating] = useState(null);
  const [starRating,setStarRating] = useState([]);
  useEffect(() => {
    console.log(`props meta is equal to ${JSON.stringify(props.data.ratings)}`);
    let ratings = props.data.ratings;
    let totalStars = reviewHelpers.avgStarRating(ratings);
    setStarRating(totalStars);
    setRating(reviewHelpers.calculateAverage(ratings));
  }, [props.data])

  return (
    <div className = 'ReviewOverview'>
      <div className = 'StarOverview'>
      {rating}
      {starRating}
      </div>
      {props.data.ratings ? <BarChart ratings = {props.data.ratings}/> : "loading"}
    </div>








  )
}



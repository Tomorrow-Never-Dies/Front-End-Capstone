import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import reviewHelpers from '/Users/andyma/Desktop/Hack Reactor Sprints/Front-End-Capstone/client/src/components/ratings&reviews/ReviewHelper.jsx'

export default function StarOverview (props) {
  const [rating, setRating] = useState(null);
  const [starRating,setStarRating] = useState([]);
  useEffect(() => {
    console.log(`props meta is equal to ${JSON.stringify(props.data)}`);
    let ratings = props.data.ratings;
    var totalStars = reviewHelpers.avgStarRating(ratings);
    setStarRating(totalStars);
    setRating(reviewHelpers.calculateAverage(ratings));
  }, [props.data])

  return (
    <div id = 'staroverview'>
      {rating}
      {starRating}
    </div>



  )
}



import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';

export default function StarOverview (props) {
  const [rating, setRating] = useState(null)
  useEffect(() => {
    //console.log(`props meta is equal to ${JSON.stringify(props.data)}`);
    let ratings = props.data.ratings
    let weightedSum = 0;
    let total = 0;
    Object.keys(ratings || {}).forEach(function (key, index) {
      weightedSum += Number(ratings[key]) * Number(key);
      total += Number(ratings[key]);
    });
    const excessFinalRating = (weightedSum / total)
    const finalRating = excessFinalRating.toFixed(1)
    //console.log(`finalRating is equal to ${finalRating}`)
    setRating(finalRating);
  }, [props.data])

  return (
    <div id = 'staroverview'>
      <span className= "fa fa-star empty-star" id = "star-100" />
      <span className= "fa fa-star empty-star" id = "star-100"/>
      <span className= "fa fa-star empty-star" id = "star-100"/>
      <span className= "fa fa-star empty-star" id = "star-100"/>
      <span className= "fa fa-star empty-star" id = "star-25"/>
    </div>



  )
}


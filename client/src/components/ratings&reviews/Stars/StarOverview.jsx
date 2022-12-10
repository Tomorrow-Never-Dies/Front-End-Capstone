import React, { useState, useEffect } from 'react'
import '../reviews.css'
import axios from 'axios'

export default function StarOverview (props) {
  const [meta, setMeta] = useState({});
  const [rating, setRating] = useState(null)
  useEffect(() => {
    axios.get('/getReviewMeta', {
      params: {
        id: '71697'
      }
    })
      .then((result) => {
        console.log(`result from getMeta request is equal to ${JSON.stringify(result.data)}`)
        return setMeta(result.data);
      })
  }, [])

  useEffect(() => {
    let ratings = meta.ratings
    let weightedSum = 0;
    let total = 0;
    console.log(`meta ratings is equal to ${JSON.stringify(ratings)}`);
    Object.keys(ratings || {}).forEach(function( key, index) {
      weightedSum += Number(ratings[key]) * Number(key);
      total += Number(ratings[key]);
      console.log(`total is equal to ${total} and weight is equal to ${weightedSum}`);
    });
    setRating((weightedSum / total).toFixed(1));
  }, [meta.ratings])
  return (
    <div className = 'starStats'>
      {rating > 0 ? rating : 'stars' }
    </div>
  )
}
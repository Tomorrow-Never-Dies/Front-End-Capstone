import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndividualReview from './Reviews/IndividualReview.jsx';
import sampleData from '../../../../fixtures/ReviewExampleData.js'
import StarOverview from './Stars/StarOverview.jsx'
import './reviews.css';

function RatingsReviews (props) {
  const [reviews, setReviews] = useState(sampleData.sampleData.results);
  const mappedReviews = reviews.map((review) => {
    return <IndividualReview reviewInfo = {review}/>
  })
  useEffect(() => {
    console.log(`sampleData.results is equal to ${JSON.stringify(sampleData.sampleData.results)}`);
    console.log(`item state is equal to ${JSON.stringify(reviews)}`);
    axios.get('/getReview', {
      params: {
        id: '1'
      }
    })
      .then((result) => {
        //setReviews([...result.data.results]);
        console.log(`result from getReview request is equal to ${result.data}`);
      })
  }, [])

  return (
  <div className = 'Reviews'>
    <StarOverview/>
    <div className = 'IndividualReviews'>
    {mappedReviews}
  <div className = 'ReviewButtons'>
    <button>
    MORE REVIEWS
    </button>
    <button>
    ADD A REVIEW
    </button>
  </div>
    </div>
  </div>
  )
}
export default RatingsReviews

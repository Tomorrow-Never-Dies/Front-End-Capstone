import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndividualReview from './Reviews/IndividualReview.jsx';
import sampleData from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import StarOverview from './Stars/StarOverview.jsx'
import Form from './Reviews/Form.jsx'
import './reviews.css';

function RatingsReviews (props) {
  const [reviews, setReviews] = useState(sampleData.sampleData.results);
  const [enableForm, setForm] = useState(false);

  const mappedReviews = reviews.map((review) => {
    return <IndividualReview reviewInfo = {review} key = {review.review_id}/>
  })
  useEffect(() => {
    axios.get('/getReview', {
      params: {
        id: '1'
      }
    })
      .then((result) => {
        setReviews([...result.data.results]);
        //console.log(`result from getReview request is equal to ${result.data}`);
      })
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault();
    setForm(true);
  }
  const changeView = (e) => {
    e.preventDefault();
    setForm(false);
  }
  return (
    <div>
   {enableForm === false
     ? <div className = 'Reviews'> <StarOverview/>
     <div className = 'IndividualReviews'> {mappedReviews}
     <div className = 'ReviewButtons'>
     <button>
     MORE REVIEWS
    </button>
    <button onClick = {onFormSubmit}>
    ADD A REVIEW
    </button>
    </div>
    </div>
    </div>
     : <div><Form changeView = {changeView}/></div>}
    </div>

  )
}
export default RatingsReviews

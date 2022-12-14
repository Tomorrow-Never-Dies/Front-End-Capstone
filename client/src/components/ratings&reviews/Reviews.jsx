import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndividualReview from './Reviews/IndividualReview.jsx';
import { sampleData } from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import StarOverview from './Stars/StarOverview.jsx'
import Form from './Reviews/Form.jsx'
import './reviews.css';

function RatingsReviews (props) {
  const [reviews, setReviews] = useState(sampleData.results);
  const [metaData, setMeta] = useState({});
  const [enableForm, setForm] = useState(false);
  const mappedReviews = reviews.map((review) => {
    return <IndividualReview reviewInfo = {review} key = {review.review_id}/>
  })

  useEffect(() => {
    const fetchData = async () => {
      const reviewData = await axios.get('/getReview', {
        params: {
          id: props.id // swap this to parent prop id after testing
        }
      })
      const metaData = await axios.get('/getReviewMeta', {
        params: {
          id: props.id
        }
      })
      setReviews([...reviewData.data.results]);
      setMeta(metaData.data);
    }
    fetchData();
  }, [props.id])


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
      Ratings & Reviews
   {enableForm === false
     ? <div className = 'Reviews'> <StarOverview key = {metaData} data = { metaData} />
     {metaData.product_id}
     <div className = 'IndividualReviews'> {mappedReviews}
     <div className = 'ReviewButtons'>
     <button>
     MORE REVIEWS
    </button>
    <button name = "addReviewButton" data-testid = "addReviewButton" onClick = {onFormSubmit} >
    ADD A REVIEW
    </button>
    </div>
    </div>
    </div>
     : <div><Form changeView = {changeView} id = {props.id}/></div>}
    </div>

  )
}
export default RatingsReviews

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndividualReview from './Reviews/IndividualReview.jsx';
import { sampleData } from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import StarOverview from './Stars/StarOverview.jsx'
import Form from './Reviews/Form.jsx'
import FormModal from './Reviews/FormModal.jsx'
import './reviews.css';

function RatingsReviews (props) {
  const [reviews, setReviews] = useState(sampleData.results);
  const [metaData, setMeta] = useState({});
  const [enableForm, setForm] = useState(false);
  const [showModal, setModal] = useState(false);
  const [modalData, setData] = useState(null);
  const [totalNumOfReviews, setNumReviews] = useState(null);
  const [totalShownReviews, setShownReviews] = useState(5);
  const [reviewFilter, setFilter] = useState('relevant')
  const hideModal = () => {
    setModal(false);
  };
  const getModal = data => {
    setModal(true);
  };
  const mappedReviews = reviews.map((review) => {
    return <IndividualReview reviewInfo = {review} key = {review.review_id}/>
  })

  const setReviewFilter = (event) => {
    setFilter(event.target.value)
  }

  const showAdditionalReviews = () => {
    setShownReviews(totalShownReviews+2)
  }

  const getFilteredReviews = () => {
    axios.get('/getReview2', {
      params: {
        id: props.id,
        sort: reviewFilter,
        count: totalShownReviews
      }
    })
    .then ((reviews) => {
      console.log(`filtered reviews is equal to ${JSON.stringify(reviews.data.results)}`);
      setReviews(reviews.data.results)
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    setForm(true);
  }
  const changeView = (e) => {
    e.preventDefault();
    setForm(false);
  }

  useEffect(() => {
    getFilteredReviews()
  },[reviewFilter, totalShownReviews])

  useEffect(() => {
    const fetchData = async () => {
      const reviewData = await axios.get('/getReview2', {
        params: {
          id: props.id,// swap this to parent prop id after testing
          sort:'relevant',
          count: totalShownReviews
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


  useEffect(() => {
    if(metaData.recommended) {
      console.log(`metaData is equal to ${JSON.stringify(metaData)}`)
    var totalNum = Number(metaData.recommended.true) + Number(metaData.recommended.false);
    setNumReviews(totalNum)
    }
  }, [metaData])


  useEffect(() => {
    console.log(`reviews is equal to ${JSON.stringify(reviews)}`);
  }, [reviews])

  return (
    <div>
      Ratings & Reviews
    <div className = 'Reviews'> <StarOverview key = {metaData} data = {metaData} />
     <div className = 'IndividualReviews'>
     <div class = "dropdown"> {totalNumOfReviews} reviews, sorted by  <select className = "selectReview" onChange={setReviewFilter}>
          <option value="relevant">relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
     </select>
      </div>
     {mappedReviews}
     <FormModal show={showModal} onHide = {hideModal} characteristics = {metaData.characteristics} />
        <div className = 'ReviewButtons' onClick ={showAdditionalReviews}>
            <button>
              MORE REVIEWS
            </button>
            <button name = "addReviewButton" data-testid = "addReviewButton" onClick = {getModal} >
              ADD A REVIEW
            </button>
        </div>
      </div>
    </div>
    </div>
  )
}
export default RatingsReviews

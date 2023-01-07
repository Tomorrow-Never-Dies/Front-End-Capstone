import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndividualReview from './Reviews/IndividualReview.jsx';
import { sampleData } from '../../../../fixtures/ratings&reviews/ReviewExampleData.js'
import StarOverview from './Stars/StarOverview.jsx'
import FormModal from './Reviews/FormModal.jsx'
import './reviews.css';

function RatingsReviews (props) {
  const [reviews, setReviews] = useState(sampleData.results);
  const [allReviews, setAllReviews] = useState([]);
  const [filteredReviews,setfilteredReviews] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});
  const [metaData, setMeta] = useState({});
  const [enableForm, setForm] = useState(false);
  const [showModal, setModal] = useState(false);
  const [modalData, setData] = useState(null);
  const [totalNumOfReviews, setNumReviews] = useState(null);
  const [totalShownReviews, setShownReviews] = useState(5);
  const [reviewFilter, setFilter] = useState('relevant');
  const [currentFilter, setCurrentFilter] = useState('reviewType')
  const [starFilter, setStarFilter] = useState(null)
  const hideModal = () => {
    setModal(false);
  };
  const getModal = data => {
    setModal(true);
  };
  const mappedReviews = reviews.map((review) => {
    return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
  })

  const setReviewFilter = (event) => {
    setFilter(event.target.value);
    setCurrentFilter('reviewType');
  }

  const showAdditionalReviews = () => {
    setShownReviews(totalShownReviews+2)
  }

  const filterReviewsByStars = (starRating) => {
      setStarFilter(starRating.toString());
      setCurrentFilter(`${starRating}-stars`);

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
    var totalNum = Number(metaData.recommended.true) + Number(metaData.recommended.false);
    setNumReviews(totalNum)
    }
  }, [metaData])


  useEffect(() => {
    axios.get('/getReview2', {
      params: {
        id: props.id,// swap this to parent prop id after testing
        count: Number(totalNumOfReviews)
      }
    })
    .then ((result) => {
      var data = result.data.results;
      setAllReviews(data);
    })
  }, [totalNumOfReviews])

  useEffect(() => {
      const FilteredReviewsByStars = allReviews.map((review) => {
        if(review.rating === 1) {
          return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
        }
      })
      const FilteredReviewsBy2Stars = allReviews.map((review) => {
        if(review.rating === 2) {
          return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
        }
      })
      const FilteredReviewsBy3Stars = allReviews.map((review) => {
        if(review.rating === 3) {
          return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
        }
      })
      const FilteredReviewsBy4Stars = allReviews.map((review) => {
        if(review.rating === 4) {
          return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
        }
      })
      const FilteredReviewsBy5Stars = allReviews.map((review) => {
        if(review.rating === 5) {
          return <IndividualReview reviewInfo = {review} key = {review.review_id} review_id = {review.review_id}/>
        }
      })
      setfilteredReviews({['1']:[...FilteredReviewsByStars], ['2']: [...FilteredReviewsBy2Stars], ['3']:[...FilteredReviewsBy3Stars],['4']: [...FilteredReviewsBy4Stars], ['5']:[...FilteredReviewsBy5Stars]});
  }, [allReviews])


  return (
    <div className = 'RatingsAndReviews'>
      <div className = 'RatingsAndReviewsTitle'>
      <h1 className = 'RatingsAndReviewsHeader'>Ratings & Reviews</h1>
      </div>
    <div className = 'Reviews'> <StarOverview key = {metaData} data = {metaData} onClickBarChart = {filterReviewsByStars}/>
     <div className = 'IndividualReviews'>
     <div className = "dropdown"> {totalNumOfReviews} reviews, sorted by  <select className = "selectReview" onChange={setReviewFilter}>
          <option value="relevant">relevance</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
     </select>
      </div>
      <div className = 'mappedReviews'>
      {currentFilter === 'reviewType' ? mappedReviews : filteredReviews[starFilter]}

      </div>
     <FormModal show={showModal} onHide = {hideModal} characteristics = {metaData.characteristics} id={props.id} />
        <div className = 'ReviewButtons' >
            <button className = 'moreReviewButtons' onClick ={showAdditionalReviews}>
              MORE REVIEWS
            </button>
            <button className = "addReviewButton" data-testid = "addReviewButton" onClick = {getModal} >
              ADD A REVIEW
            </button>
        </div>
      </div>
    </div>
    </div>
  )
}
export default RatingsReviews

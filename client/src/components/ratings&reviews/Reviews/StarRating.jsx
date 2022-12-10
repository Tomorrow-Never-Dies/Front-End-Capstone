import React, {useState, useEffect} from 'react';
import {FaStar} from 'react-icons/fa';
import '../reviews.css'
const StarRating = (props) => {
  const [starRating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleMouseEnter = (value) => {
    setHover(value);
  }
  const handleMouseLeave = () => {
    setHover(null);
  }

  const fiveStars = [...Array(5)].map((star, i) => {
    const ratingValue = i + 1;
    return (
      <label key = {ratingValue} onChange = {props.handleStarRating}>
        <input type = 'radio'
        name = 'starRating'
        className = 'starRating'
        value = {ratingValue}
        onClick = {() => setRating(ratingValue)}
        />
         <FaStar className = 'star-form' size ={20} color = {ratingValue <= (hover||starRating) ? '#ffc107':'#e4e5e9'}
        onMouseEnter = {() => handleMouseEnter(ratingValue)}
        onMouseLeave = {() => handleMouseLeave()}/>
      </label>

    )
  })
  return <div>
    {fiveStars}
  </div>
}

export default StarRating

import axios from 'axios';
import React from 'react';

const reviewHelpers = {


  calculateAverage : (ratings) => {
    let totalRating = 0;
    let weightedSum = 0;
    Object.keys(ratings || {}).forEach(function (key, index) {
      weightedSum += Number(ratings[key]) * Number(key);
      totalRating += Number(ratings[key]);
    });
    let ratingResult = (weightedSum / totalRating)
    console.log(`ratingResult is equal to ${ratingResult}`);
    return ratingResult;
  },

  avgStarRating  : (rating) => {
    var calculatedRating = reviewHelpers.calculateAverage(rating)
    let averageRating = Math.ceil(calculatedRating/0.25) * 0.25 // rounds rating to nearest 0.25
    let totalStars = 5;
    const fiveStars = [...Array(5)].map((star, i) => {
      if ( averageRating >= 1) {
        averageRating--;
        return  <span className= "fa fa-star empty-star" id = "star-100" />
      } else if (averageRating === 0.75) {
        averageRating = averageRating - 0.75
        return  <span className= "fa fa-star empty-star" id = "star-75" />
      } else if (averageRating === 0.50) {
        averageRating = averageRating - 0.50
        return  <span className= "fa fa-star empty-star" id = "star-50" />
      } else if (averageRating === 0.25) {
        averageRating = averageRating - 0.25
        return  <span className= "fa fa-star empty-star" id = "star-25" />
      }else if (averageRating === 0) {
        return  <span className= "fa fa-star empty-star" id = "star-0" />
      }
    })
    console.log(`fiveStars is equal to ${JSON.stringify(fiveStars)}`);
    return fiveStars
  }

}


export default reviewHelpers

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
    //console.log(`ratingResult is equal to ${ratingResult}`);
    return parseFloat(""+ratingResult).toFixed(1);
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
    //console.log(`fiveStars is equal to ${JSON.stringify(fiveStars)}`);
    return fiveStars
  },

  barChartPercentage : (ratings) => {
    let totalRatings = 0;
    Object.keys(ratings || {}).forEach(function (key, index) {
      totalRatings += Number(ratings[key]);
    });
    return totalRatings;
  },

  factorBreakDown : (FactorRatings) => {
    console.log(`factorratings is equal to ${JSON.stringify(FactorRatings['Fit']['value'])}`);

    const tickTitles = {
      Size: { first: 'Too Small', third: 'Perfect', fifth: 'Too Large' },
      Width: { first: 'Too Narrow', third: 'Perfect', fifth: 'Too Large' },
      Comfort: { first: 'Poor', fifth: 'Perfect' },
      Quality: { first: 'Poor', third: 'What I Expected', fifth: 'Perfect' },
      Length: { first: 'Runs Short', third: 'Perfect', fifth: 'Runs Long' },
      Fit: { first: 'Too Small', third: 'Perfect', fifth: 'Too Long' }
    };

    let factorBreakdownResult = Object.keys(FactorRatings || {}).map( (key, index) => {
        if(tickTitles[key].length === 3) {
          return (
          <div key = {FactorRatings.id}>
               {key}
            <input type="range" min="0" max="5" value={Number(FactorRatings[key]['value'])} step = "0.1" class="slider" readonly/>
              <div class="sliderticks">
              <p>{tickTitles[key]['first']}</p>
              <p>{tickTitles[key]['third']}</p>
              <p>{tickTitles[key]['fifth']}</p>
            </div>
          </div>
          )
      } else {
          return (
            <div key = {FactorRatings.id} >
              {key}
            <input type="range" min="0" max="5" value={Number(FactorRatings[key]['value'])} step = "0.1" class="slider" readonly/>
              <div class="sliderticks">
                <p>{tickTitles[key]['first']}</p>
                <p>{tickTitles[key]['fifth']}</p>
            </div>
            </div>
          )

        }
    })
    console.log(`typeof reviewhelper breakdown is ${JSON.stringify(factorBreakdownResult)}`)
    return factorBreakdownResult
  }

}


export default reviewHelpers

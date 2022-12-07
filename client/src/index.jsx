import React from "react";
import { render } from "react-dom";
import OverView from './components/overview/index.jsx'
import QuestionAnswers from './components/q&a/index.jsx'
import RatingsReviews from './components/ratings&reviews/index.jsx'
import RelatedItemsComp from './components/relatedItems&comp/index.jsx'

render(
  <div>
    <h1>Front End Capstone</h1>
    <OverView/>
    <RelatedItemsComp/>
    <QuestionAnswers/>
    <RatingsReviews/>
  </div>,
  document.getElementById("root")
);
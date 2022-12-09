import React from "react";
import { render } from "react-dom";
import OverView from './components/overview/index.jsx'
import QuestionAnswers from './components/q&a/index.jsx'
import RatingsReviews from './components/ratings&reviews/index.jsx'
import RelatedItemsComp from './components/relatedItems&comp/index.jsx'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID: 1
    }

  }


  render(){
    return(
      <div>
        <h1>Front End Capstone</h1>
        <OverView id ={this.state.productsID}/>
        <RelatedItemsComp id ={this.state.productsID}/>
        <QuestionAnswers id ={this.state.productsID}/>
        <RatingsReviews id ={this.state.productsID}/>
      </div>
    )
  }
}


export default App
import React from "react";
import { render } from "react-dom";
import OverView from './components/overview/index.jsx'
import QuestionAnswers from './components/q&a/index.jsx'
import RatingsReviews from './components/ratings&reviews/Reviews.jsx'
import RelatedItemsComp from './components/relatedItems&comp/RelatedItemsComp.jsx'
import Outfits from './components/relatedItems&comp/OutfitsItem.jsx'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      productsID:  71697
    }
    this.onclick = this.onclick.bind(this)
  }

  onclick(id){
    this.setState({
      productsID: id
    }, () =>{
    })

  }


  render(){
    return(
      <div>
        <h1>Front End Capstone</h1>
        <OverView id ={this.state.productsID}/>
        {/* <RelatedItemsComp id ={this.state.productsID} click = {this.onclick}/>
        <Outfits id ={this.state.productsID} click = {this.onclick} />
        <QuestionAnswers id ={this.state.productsID} />
        <RatingsReviews id ={this.state.productsID}/> */}
      </div>
    )
  }
}


export default App
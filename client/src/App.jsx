import React from "react";
import { render } from "react-dom";
import OverView from './components/overview/index.jsx'
import QuestionAnswers from './components/q&a/index.jsx'
import RatingsReviews from './components/ratings&reviews/Reviews.jsx'
import RelatedItemsComp from './components/relatedItems&comp/RelatedItemsComp.jsx'
import Outfits from './components/relatedItems&comp/OutfitsItem.jsx'
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productsID:  71697,
      reviews: [],
      reviewsLen: 0,
      starToggled: false,
      track:{}
    }
    this.onclick = this.onclick.bind(this)
    this.getReviewMeta = this.getReviewMeta.bind(this)
    this.starToggle = this.starToggle.bind(this)
    this.track = this.track.bind(this)
  }

  onclick(id) {
    this.setState({
      productsID: id
    }, () => {
      console.log("app.jsx")
    })

    this.track(id)

  }
  track(id){
    //need to add objects correctly
    console.log()
    var keys = Object.keys(this.state.track)
    console.log(keys)
    if(keys.includes(id.toString())){
      this.setState({
        track : {
          [id]: this.state.track[toString(id)]+1
        }
      }, console.log(this.state.track, "track"))
    } else{
      this.setState({
        track : {
          [id]: 1
        }
      } , console.log(this.state.track, "track"))
    }
  }
  starToggle () {
    console.log("clicked star")
    this.setState({ starToggled: !this.state.starToggled }) // need to communitcate to yassir
  }
  getReviewMeta() {
    $.ajax({
      type: 'GET',
      contentType: 'application/json',
      context: this,
      data: { id: this.state.productsID },
      params: {
        id: this.state.productsID
      },
      url: '/getReviewMeta',
      success: (data) => {
        let count = 0;
        for (const key in data.ratings) {
          count += parseInt(data.ratings[key])
        }
        this.setState({ reviews: data, reviewsLen: count });
      },
      error: (error) => {
        console.log(error, 'error geting data in ajaxxxx reviewwww');
      }
    });
  }

  componentDidMount() {
    this.getReviewMeta()
  }
  render(){
    return(
      <div>
        <OverView  starToggle = {this.starToggle} id ={this.state.productsID} reviews = {this.state.reviews} reviewsLen = {this.state.reviewsLen}/>
        <RelatedItemsComp   id ={this.state.productsID} click = {this.onclick} track = {this.track}/>
        <Outfits id ={this.state.productsID} click = {this.onclick} starToggled = {this.state.starToggled} />
         <QuestionAnswers id ={this.state.productsID} />
        {/* <RatingsReviews id ={this.state.productsID} reviews = {this.state.reviews} reviewsLen = {this.state.reviewsLen}/> */}
      </div>
    )
  }
}


export default App
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import axios from 'axios';
import {FaStar} from 'react-icons/fa';

function FormModal (props) {
  const [ characteristicForm, setCharForm] = useState([]);

  const [newReview, setReview] = useState({
    product_id: props.id,
    rating: '',
    recommended: '',
    characteristics: {},
    summary: '',
    body: '',
    photos: null,
    name: '',
    email: ''
  })
  function onRatingChange (e) {
    setReview({ ...newReview, rating: Number(e.target.value) })
    console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onChangeForm (e) {
    setReview({ ...newReview, [e.target.name]: e.target.value })
    console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onCharacteristicChange (e) {
    console.log(`radio button clicked : ${e.target.name}`)
    setReview({ ...newReview, characteristics: { ...newReview.characteristics, [e.target.name]: e.target.value } })
    console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onFileChange (e) {
    setReview({ ...newReview, Photos: e.target.files[0] })
  }
  function onRecommendChange(e) {
    if (e.target.value === 'true') {
      setReview({...newReview, recommended: true })
    } else {
      setReview({...newReview, recommended: false })
    }
  }
  function handleSubmit (e) {
    e.preventDefault();
    console.log('submitting!');
    props.onHide();
    axios.post('addReview', newReview)
      // .then((result) => {
      //   console.log(`result from posting a new review is ${JSON.stringify(result)}`);
      // })
  }

  useEffect(() => {
    var charForm = [];
   if(props.characteristics) {
    Object.keys(props.characteristics).forEach ( function (key, index) {
      console.log(`key is equal to ${key} key in characteristics form is equal to ${JSON.stringify(props.characteristics[key].id)}`);
      charForm.push(
        <label onChange = {onCharacteristicChange}>
      {`${key} and ${props.characteristics[key].id}`}
          <input type = 'radio' value = '1' name = {props.characteristics[key].id}/>
          1
          <input type = 'radio' value = '2' name = {props.characteristics[key].id}/>
          2
          <input type = 'radio' value = '3' name = {props.characteristics[key].id}/>
          3
          <input type = 'radio' value = '4' name = {props.characteristics[key].id}/>
          4
          <input type = 'radio' value = '5' name = {props.characteristics[key].id}/>
          5
      </label>
      )
      charForm.push(<br/>)
    })
   }
   setCharForm(charForm)
  }, [props.characteristics]);
  return (
    <React.Fragment>
    {props.show &&
    <form className = "modal">
      <label>
        <StarRating handleStarRating = {onRatingChange}/>
      </label>
      <br />
      <label onChange = {onRecommendChange}>
        Recommended
          <input type = 'radio' value = 'true' name = 'recommended'/>
          Yes
          <input type = 'radio' value = 'false' name = 'recommended'/>
          No
      </label>
      <br />
      {characteristicForm}
      {/* <label onChange = {onCharacteristicChange}>
      Size
          <input type = 'radio' value = '1' name = '14'/>
          1
          <input type = 'radio' value = '2' name = '14'/>
          2
          <input type = 'radio' value = '3' name = '14'/>
          3
          <input type = 'radio' value = '4' name = '14'/>
          4
          <input type = 'radio' value = '5' name = '14'/>
          5
      </label>
      <br />
      <label onChange = {onCharacteristicChange}>
      Width
          <input type = 'radio' value = '1' name = '15'/>
          1
          <input type = 'radio' value = '2' name = '15'/>
          2
          <input type = 'radio' value = '3' name = '15'/>
          3
          <input type = 'radio' value = '4' name = '15'/>
          4
          <input type = 'radio' value = '5' name = '15'/>
          5
      </label>
      <br />
      <label onChange = {onCharacteristicChange}>
      Comfort
          <input type = 'radio' value = '1' name = '16'/>
          1
          <input type = 'radio' value = '2' name = '16'/>
          2
          <input type = 'radio' value = '3' name = '16'/>
          3
          <input type = 'radio' value = '4' name = '16'/>
          4
          <input type = 'radio' value = '5' name = '16'/>
          5
      </label>
      <br />
      <label onChange = {onCharacteristicChange}>
      Quality
      <input type = 'radio' value = '1' name = '17'/>
      1
      <input type = 'radio' value = '2' name = '17'/>
      2
      <input type = 'radio' value = '3' name = '17'/>
      3
      <input type = 'radio' value = '4' name = '17'/>
      4
      <input type = 'radio' value = '5' name = '17'/>
      5
    </label>
    <br />
    <label onChange = {onCharacteristicChange}>
      Length
      <input type = 'radio' value = '1' name = '18'/>
      1
      <input type = 'radio' value = '2' name = '18'/>
      2
      <input type = 'radio' value = '3' name = '18'/>
      3
      <input type = 'radio' value = '4' name = '18'/>
      4
      <input type = 'radio' value = '5' name = '18'/>
      5
    </label>
    <br />
    <label onChange = {onCharacteristicChange}>
      Fit
      <input type = 'radio' value = '1' name = '19'/>
      1
      <input type = 'radio' value = '2' name = '19'/>
      2
      <input type = 'radio' value = '3' name = '19'/>
      3
      <input type = 'radio' value = '4' name = '19'/>
      4
      <input type = 'radio' value = '5' name = '19'/>
      5
    </label>
    <br /> */}
      <label onChange = {onChangeForm}>
      Review summary
      <input type = 'text' name = 'summary'/>
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Review Body
      <input type = 'text' name = 'body' />
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Photos
      <input type = 'file' name = 'photos' onChange = {onFileChange}/>
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Name
      <input type = 'text' name = 'name' />
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Email
      <input type = 'text' name = 'email' />
      </label>
      <button type="submit" onClick = {handleSubmit}>Submit</button>
    </form>
}
  </React.Fragment>
  )
}

export default FormModal

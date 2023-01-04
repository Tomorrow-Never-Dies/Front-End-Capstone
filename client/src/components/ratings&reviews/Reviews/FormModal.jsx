import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import axios from 'axios';
import {FaStar} from 'react-icons/fa';

function FormModal (props) {
  const [testArray, setTest] = useState([]);
  const [characteristicForm, setCharForm] = useState([]);
  const [newReview, setReview] = useState({
    product_id: props.id,
    rating: '',
    recommend: '',
    characteristics: {},
    summary: '',
    body: '',
    photos: [],
    name: '',
    email: ''
  })
  function onRatingChange (e) {
    setReview(newReview =>({ ...newReview, rating: Number(e.target.value) }))
    console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onChangeForm (e) {
    setReview(newReview => ({ ...newReview, [e.target.name]: e.target.value }))
    console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onCharacteristicChange (e) {
    console.log(`radio button clicked : ${e.target.name}`);
    var charHolder = newReview.characteristics;
    charHolder[e.target.name] = Number(e.target.value);
    console.log(`newReviewonchar is equal to ${JSON.stringify(charHolder)}`)
    setReview(newReview => ({ ...newReview, ['characteristics'] : {...charHolder}}))
    // console.log(`new review is equal to ${JSON.stringify(newReview)}`)
  }
  function onFileChange (e) {
    var testArray = [];
    testArray.push(e.target.files[0])
    console.log(`testarray is equal to ${Array.isArray(testArray)}`)
    setReview(newReview => ({ ...newReview, photos: [...newReview.photos, ...testArray] }))
  }
  function onRecommendChange (e) {
    if (e.target.value === 'true') {
      setReview(newReview => ({ ...newReview, recommend: true }))
    } else {
      setReview(newReview => ({ ...newReview, recommend: false }))
    }
  }
  function handleSubmit (e) {
    e.preventDefault();
    console.log('submitting!');
    props.onHide();
    axios.post('addReview', newReview)
      .then((result) => {
        console.log(`result from posting a new review is ${JSON.stringify(result)}`);
      })
  }

  useEffect(() => {
    console.log(`newReview is equal to ${JSON.stringify(newReview)}`);
    console.log(`photos type is equal to ${typeof newReview.photos}`)
  },[newReview])

  useEffect(() => {
    console.log(`newReview is equal to ${JSON.stringify(newReview)}`);
    console.log(`photos type is equal to ${typeof newReview.photos}`)
  },[])

  useEffect(() => {
    console.log(`testArray is equal to ${testArray}`);
    console.log(`testArray type is equal to ${Array.isArray(testArray)}`)
  },[testArray])

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
    <form className = "newReviewModal">
      <label>
        <StarRating handleStarRating = {onRatingChange}/>
      </label>
      <br />
      <label onChange = {onRecommendChange}>
        Recommended
          <input type = 'radio' value = 'true' name = 'recommend'/>
          Yes
          <input type = 'radio' value = 'false' name = 'recommend'/>
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
      <label className = 'labelSummary' onChange = {onChangeForm}>
      Review summary
      <textarea className = 'summary' cols="40" rows = "5"></textarea>
      </label>
      <br />
      <label className = 'labelBody' onChange = {onChangeForm}>
      Review Body
      <textarea className = 'body' cols="40" rows = "5"></textarea>
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Photos
      <input type = 'file' name = 'photos' onChange = {onFileChange}/>
      <input type = 'file' name = 'photos2' onChange = {onFileChange}/>
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

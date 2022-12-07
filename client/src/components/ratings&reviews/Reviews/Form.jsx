import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form (props) {
  const [newReview, setReview] = useState({
    product_id: '',
    rating: '',
    recommended: '',
    characteristics: { 14: '', 15: '', 16: '', 17: '', 18: '', 19: '' },
    summary: '',
    body: '',
    photos: null,
    name: '',
    email: ''
  })
  function onChangeForm (e) {
    e.preventDefault();
    setReview({ ...newReview, [e.target.name]: e.target.value })
  }
  function onCharacteristicChange (e) {
    setReview({ ...newReview, characteristics: { ...newReview.characteristics, [e.target.name]: e.target.value } })
  }
  function onFileChange (e) {
    setReview({ ...newReview, Photos: e.target.files[0] })
  }
  function handleSubmit (e) {
    console.log('submitting!')
    props.changeView(e);
  }

  useEffect(() => {
    console.log(`newReview is equal to ${JSON.stringify(newReview)}`);
  }, [newReview]);
  return (
    <form>
      <label onChange = {onChangeForm}>
        Overall rating -mandatory - star rating:
        <input type = 'text' name ='rating'/>
      </label>
      <br />
      <label onChange = {onChangeForm}>
        Recommended
          <input type = 'radio' value = 'Yes' name = 'recommended'/>
          Yes
          <input type = 'radio' value = 'No' name = 'recommended'/>
          No
      </label>
      <br />
      <label onChange = {onCharacteristicChange}>
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
    <br />
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
  )
}

export default Form

import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import axios from 'axios';
import {FaStar} from 'react-icons/fa';
import config from '../../../../../config.js';

const MAX_FILES = 5;

function FormModal (props) {
  const [testArray, setTest] = useState({photos:[]});
  const [characteristicForm, setCharForm] = useState([]);
  const [uploadedPictures, setPictures] = useState({ photos: [] });
  const [fileLimit, setFileLimit] = useState(false);
  const [fileLimitExceed, setExceed] = useState(false);
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
  }
  function onChangeForm (e) {
    setReview(newReview => ({ ...newReview, [e.target.name]: e.target.value }))
  }
  function onCharacteristicChange (e) {
    var charHolder = newReview.characteristics;
    charHolder[e.target.name] = Number(e.target.value);
    setReview(newReview => ({ ...newReview, ['characteristics'] : {...charHolder}}))
  }
  function onFileChange (e) {
    const uploadedFiles = Array.prototype.slice.call(e.target.files)
    const promisifiedIMGBB = uploadedFiles.map(fileObject => {
      let fileImage = new FormData;
      let IMGBB_API = process.env.REACT_APP_IMGBB_API;
      fileImage.append("image", event.target.files[0]);
      fileImage.append('key', IMGBB_API);
      return axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: fileImage
      })
        .then ((res) => {
          return res;
        })
    })
    Promise.all(promisifiedIMGBB)
      .then((url) => {
        let urlResults = url.map(imgLink => {
          return imgLink.data.data.url
        })
        return urlResults
      })
      .then ((results) => {
        if (results.length > MAX_FILES) {
          let randomString = Math.random().toString(36);
          setExceed(randomString);
          alert(`you can only add a maximum of ${MAX_FILES} files`);
          return true;
        } else {
          setReview(newReview => ({...newReview, characteristics: newReview.characteristics, photos:[...results] }))
        }
      })
  }

  function handleUploadFiles (files) {
    const uploaded = [...uploadedPictures]
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
      if (uploaded.length > MAX_FILES) {
        alert(`you can only add a maximum of ${MAX_FILES} files`)
        setFileLimit(false);
        limitExceeded = true;
        return true;
      }
    })
    if (!limitExceeded) {
      setPictures({ photos: [...uploaded] })
      setReview(newReview => ({...newReview, characteristics: newReview.characteristics, photos:[...uploadedPictures] }))
    }
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
    props.onHide();

    axios.post('addReview', newReview)
      .then((result) => {
        console.log(`result from posting a new review is ${JSON.stringify(result)}`);
      })
  }

  useEffect(() => {
    var charForm = [];
   if(props.characteristics) {
    Object.keys(props.characteristics).forEach ( function (key, index) {
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

      <label className = 'labelSummary'>
      Review summary
      <textarea name = 'summary' cols="40" rows = "5" onChange = {onChangeForm}></textarea>
      </label>
      <br />
      <label className = 'labelBody'>
      Review Body
      <textarea name = 'body' cols="40" rows = "5" onChange = {onChangeForm}></textarea>
      </label>
      <br />
      <label onChange = {onChangeForm}>
      Photos
      <input type = 'file' key={fileLimitExceed || ''} name = 'photos' accept = 'image/png/jpeg' onChange = {onFileChange} multiple/>
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

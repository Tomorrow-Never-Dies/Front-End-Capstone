import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Form(props) {
  return (
    <form>
      <label>
        Overall rating -mandatory - star rating:
        <input type = 'text' name ='OverallRating'/>
      </label>
    </form>
  )
}

export default Form


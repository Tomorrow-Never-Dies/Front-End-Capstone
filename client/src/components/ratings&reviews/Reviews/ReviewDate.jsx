import React, { useState, useEffect } from 'react'
import { format, parseISO } from "date-fns";
import '../reviews.css'

export default function ReviewDate (props) {
  const dateObject = new Date(props.date);
  // useEffect(() => {
  //   console.log(`dateObject is equal to ${dateObject}`);
  //   console.log(`date month is equal to ${dateObject.toDateString()}`);
  // }, [])
  return (
    <div className = 'UserAndDate'>
        <p>{props.username}, {dateObject.toDateString()} </p>
    </div>

  )
}

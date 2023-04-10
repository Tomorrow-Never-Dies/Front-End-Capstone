import React, { useState, useEffect } from 'react'
import { format, parseISO } from "date-fns";
import '../reviews.css'

export default function ReviewDate (props) {
  const dateObject = new Date(props.date);
  return (
    <div className = 'UserAndDate'>
        <p>{props.username}, {dateObject.toDateString().split(' ').slice(1).join(' ')} </p>
    </div>

  )
}

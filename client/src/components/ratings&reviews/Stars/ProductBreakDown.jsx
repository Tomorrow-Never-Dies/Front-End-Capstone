import React, {useState,useEffect} from 'react';
import '../reviews.css'
import reviewHelpers from '../ReviewHelper.jsx'

function ProductBreakdown (props) {
  const { characteristics } = props;
  console.log('characteristics:', characteristics);
  const [breakdown, setBreakdown] = useState([]);
  useEffect(() => {
    console.log(`props.characteristics inside pb is equal to ${JSON.stringify(props.characteristics)}`)
    const Breakdown = reviewHelpers.factorBreakDown(characteristics);
    setBreakdown([...Breakdown]);
  },[props.characteristics])

  useEffect(() => {
    console.log(`breakdown is equal to ${breakdown}`)
  },[breakdown])

  return (
    <div className = 'ProductBreakDown'>
      {breakdown.length !==0 ? breakdown: "loading"}
    </div>


  )
};

export default ProductBreakdown;
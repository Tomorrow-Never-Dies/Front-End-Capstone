import React, {useState,useEffect} from 'react';
import '../reviews.css'
import reviewHelpers from '../ReviewHelper.jsx'

function ProductBreakdown (props) {
  const { characteristics } = props;
  const [breakdown, setBreakdown] = useState([]);
  useEffect(() => {
    if (Object.keys(props.characteristics).length !== 0) {
      const Breakdown = reviewHelpers.factorBreakDown(characteristics);
      setBreakdown([...Breakdown]);
    }
  },[props.characteristics])


  return (
    <div className = 'ProductBreakDown' key= 'ProductBreakDown'>
      {breakdown.length !==0 ? breakdown: "loading"}
    </div>


  )
};

export default ProductBreakdown;
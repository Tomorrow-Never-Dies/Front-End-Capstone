import React, {useState, useEffect} from 'react'
import reviewHelpers from '../ReviewHelper.jsx'

function BarGroup(props) {
  let barPadding = 2
  let barColour = '6e6e6e'
  let barColour2='#00db5a'
  let widthScale = d => d * 10

  let width = widthScale(10)
  let yMid = props.barHeight * 0.5
  let totalPercentage = (props.d.value)/(props.totalNumOfRatings)*100
  console.log(`totalpercentage is equal to ${totalPercentage}`)
  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <rect y={barPadding * 0.5} width={totalPercentage} height={props.barHeight - barPadding} fill={barColour2} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}


export default function BarChart (props) {
    const [barGraph, setBar] = useState([])

    useEffect(() => {
      console.log(`props.ratings is equal to ${props.ratings}`);
      let barHeight = 20
      let totalNumOfRatings = reviewHelpers.barChartPercentage(props.ratings)
      let barGroups = [...Array(5)].map((d, i) => {
        let index = i+1;
        var ratingData = {name:`${index} stars`, value:props.ratings[index.toString()]};
        return (<g transform={`translate(0, ${i * barHeight})`}>
              <BarGroup d={ratingData} totalNumOfRatings = {totalNumOfRatings} barHeight={barHeight} />
              </g>)
      })
      setBar([...barGroups]);
    },[props.rating])

    return (<svg width="300" height="200" className = 'barChart'>
             <g className="container">
              <g className="chart" transform="translate(100,60)">
              {barGraph}
              </g>
              </g>
              </svg>
    )
}


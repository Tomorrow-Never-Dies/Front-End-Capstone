import React, {useState, useEffect} from 'react'
import reviewHelpers from '../ReviewHelper.jsx'

function BarGroup(props) {
  let barPadding = 2
  let barColour ='#D3D3D3'
  let barColour2='#000000'
  let widthScale = d => d * 10

  let width = widthScale(15)
  let yMid = props.barHeight * 0.5
  let totalPercentage = (props.d.value)/(props.totalNumOfRatings)*100
  // console.log(`totalpercentage is equal to ${totalPercentage}`)
  return <g className="bar-group" key = {totalPercentage}>
    <text className="name-label" x="-20" y={yMid} alignmentBaseline="middle" key = {props.d.value + 'name-label'}>{props.d.name}</text>
    <rect className = "star-breakdown"y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} key = {props.d.value + 'star-breakdown'} />
    <rect y={barPadding * 0.5} width={totalPercentage} height={props.barHeight - barPadding} fill={barColour2} key = {props.d.value + 'padding'} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" key = {props.d.value + 'value-label'} >{props.d.value}</text>
  </g>
}

export default function BarChart (props) {
  const [barGraph, setBar] = useState([]);

  useEffect(() => {
    console.log(`props.ratings in barchart component is equal to ${JSON.stringify(props.ratings)}`);
    if (props.ratings) {
      let barHeight = 20
      let totalNumOfRatings = reviewHelpers.barChartPercentage(props.ratings)
      let barGroups = [...Array(5)].map((d, i) => {
        let index = 5-i; //makes 5 star bar on top
        var ratingData = {name:`${index} stars`, value:props.ratings[index.toString()]};
        return (<g transform={`translate(0, ${i * barHeight})`} key = {props.ratings + 'g-transform' + index}>
              <BarGroup d={ratingData} totalNumOfRatings = {totalNumOfRatings} barHeight={barHeight} key = {props.ratings} />
              </g>)
      })
      setBar([...barGroups]);
    }
  }, [props.ratings])

  return (<svg width="300" height="200" className = 'barChart'>
             <g className="container">
              <g className="chart" transform="translate(100,60)">
              {barGraph}
              </g>
              </g>
              </svg>
  )
}

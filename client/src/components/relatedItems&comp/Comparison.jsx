import React from "react"
import './styles/carousel.css'


function Comparison (props) {
  console.log(props)
  console.log(props.current[0])
  const showHideClassName = props.compare? 'modal display-block' : 'modal display-none';
    return (
    <div className={showHideClassName}>

      <div className="modal-main">
        <div className="comparison-title">
          Product Comparison
        </div>
        <div className="comparison">
        <section className="current-product">
            <div className="compare-name">
              {props.current.name}
            </div>

        </section>
        <section className="compare-product">
          <div className="compare-name">
            {props.compare.name}
          </div>
        </section>
        <button type="button" onClick={()=>{props.close()}} >
                close
            </button>
      </div>
      </div>
    </div>
    )
  }

  export default Comparison;
import React from "react"
import '/Users/yasereisa/HackReactor/Course/FEC/client/src/components/q&a/questionModal.css'


function Comparison (props) {
  console.log(props)
  console.log(props.current[0])
  const showHideClassName = props.compare? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
      <section className="modal-main">
          {props.children}
          <button type="button" onClick={()=>{props.close()}} >
              close
          </button>
      </section>
  </div>
    )
  }

  export default Comparison;
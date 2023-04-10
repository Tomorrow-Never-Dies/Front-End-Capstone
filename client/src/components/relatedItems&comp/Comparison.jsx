import React from "react"
import './styles/carousel.css'



function Comparison (props) {
  console.log(props)
  console.log(props.current[0])
  const showHideClassName = props.compare? 'modal display-block' : 'modal display-none';
    return (
    <div className={showHideClassName}>

      <div className="modal-main">
        <table className="comparison">
          <tbody>
            <tr>
              <td>{props.current.category}</td>
              <td className="middle">Category</td>
              <td>{props.compare.category}</td>
            </tr>
            <tr>
              <td>{props.current.name}</td>
              <td className="middle">Name</td>
              <td>{props.compare.name}</td>
            </tr>
            <tr>
              <td>{props.current.description}</td>
              <td className="middle">Description</td>
              <td>{props.compare.description}</td>
            </tr>
            <tr>
              <td>{props.current.default_price}</td>
              <td className="middle">Price</td>
              <td>{props.compare.default_price}</td>
            </tr>
          </tbody>



        <section className="current-product">






        </section>
      </table>
      <button type="button" onClick={()=>{props.close()}} >
                close
            </button>
      </div>
    </div>
    )
  }

  export default Comparison;
import React from "react";

export default class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  render() {
    // See examples/Detail.html for what this component should render.
    return (
      <div>
       <p> OverView Place Holder </p>
       <h2 data-testid='name header'>name place holder </h2>
       </div>
    )
  }
}

import React from "react";
const postAnswer = require('../../../../helpers/q&a.js')

import './q&a.css';

const QuestionModal = props => {
    const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {props.children}
                <button type="button">
                    Submit
                </button>
                <button type="button" onClick={props.handleClose}>
                    close
                </button>
            </section>
        </div>
    )
}

export default QuestionModal;
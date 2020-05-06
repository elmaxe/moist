import React from 'react'
import PropTypes from 'prop-types'
import './SubmittedActivity.css'
import {Link} from 'react-router-dom'

const SubmittedActivity = ({text, creationDate, onClickReport, user, suggestion}) => {

    let date = new Date(parseInt(creationDate, 10))
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()+1 < 10 ? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1
    let day = date.getUTCDate() < 10 ? "0"+date.getUTCDate() : date.getUTCDate()
    date = year + "-" + month + "-" + day

    return (
        <div className="submittedactivity">
            <div id="title">{text}</div>
            <div id="date">
                Submitted on {date}
                <span onClick={onClickReport} title="Report this activity" style={{float: "right", padding: "0 10px"}}>
                    <Link to={{pathname: "/report", state: {suggestion: suggestion, reporter: user, time: Date.now()}}}>Report</Link>
                </span>
            </div>
            
        </div>
    )
}

SubmittedActivity.propTypes = {
    text: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired
}

export default SubmittedActivity
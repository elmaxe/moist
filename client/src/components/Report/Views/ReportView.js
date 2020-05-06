import React, { useState } from 'react'
import {Alert} from 'react-bootstrap'
import './Report.css'

const ReportView = ({suggestion, reporter, time, onReport, history, error, interval, success}) => {
    const [clicked, setClicked] = useState(false)
    return (
        <div className="ReportPage">
            <div className="Report">
                <div><h1>Report</h1></div>
                <div>Issue a report for the user created activity: <b>"{suggestion.activity}"</b></div>
                <div>Created by user: <b>{suggestion.createdBy.username}</b></div>
                <br/>
                <div>Beware that abusing this feature may lead to consequences for your account.</div>
                <br/>
                <div id="buttons">
                    <button
                        className="btn green"
                        disabled={clicked}
                        onClick={() => {
                            onReport(suggestion);
                            setClicked(true);
                        }}
                    >Report</button>
                    <button
                        className="btn red"
                        disabled={clicked}
                        onClick={() => history.goBack()}
                    >Cancel</button>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success} Redirecting...</Alert>}
            </div>
        </div>
    )
}

export default ReportView
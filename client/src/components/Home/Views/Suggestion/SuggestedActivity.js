import React from 'react'

import spinner from '../../../../images/spinner.gif'
import Accessibility from '../../../../images/accessibility.svg'
import Participants from '../../../../images/participants.svg'
import Price from '../../../../images/price.svg'
import questionmark from '../../../../images/questionmark.svg'
import { Link } from 'react-router-dom'
import './SuggestedActivity.css'

const SuggestedActivity = ({fetching = false, suggestion, user, onClickHelp}) => {
    return (
        <div className="SuggestedActivity">
            {fetching ?
                <img id="spinner" src={spinner} height="150px" />
                :    
                suggestion ?
                <>
                    {/* TODO: LAUNCH ALERT WHEN CLICK HELP */}
                    <img id="help" src={questionmark} title="Help" onClick={(e) => onClickHelp(e)}/>
                    <div id="title">{suggestion.activity}</div>
                    <div id="info">
                        <span id="icon" title="Accessibility">  
                            <img src={Accessibility} height="30px" alt="Accessibility" />
                            {suggestion.accessibility ? suggestion.accessibility : "N/A"}
                        </span>
                        <span id="icon" title="Participants">
                            <img src={Participants} height="30px" alt="Participants" />
                            {suggestion.participants ? suggestion.participants : "N/A"}
                        </span>
                        <span id="icon" title="Price">
                            <img src={Price} height="30px" alt="Price" />
                            {suggestion.price ? suggestion.price : "N/A"}
                        </span>
                    </div>
                    <div id="link">
                        {suggestion.link && <a href={suggestion.link} title={suggestion.link} rel="noopener noreferrer" target="_blank">Link</a>}
                    </div>
                    <div id="warningtext">
                        {suggestion.saveGlobally && "*Will add as a suggestion for other users"}
                    </div>
                    <div id="createdby">
                        {suggestion.createdBy ?
                            <div>
                                Created by user <Link to={'/u/' + suggestion.createdBy.username}>{suggestion.createdBy.username}</Link>
                                <br />
                                <Link to={{pathname: '/report', state: {suggestion, reporter: user, time: Date.now()}}}>Report</Link>
                            </div>
                        : null}
                    </div>
                </>
                :
                    <b>Click the button above to suggest an activity.</b>
            }
        </div>
    )
}

export default SuggestedActivity
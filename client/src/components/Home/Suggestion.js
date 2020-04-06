import React from 'react'
import './Suggestion.css'
import Accessibility from '../../images/accessibility.svg'
import Participants from '../../images/participants.svg'
import Price from '../../images/price.svg'
import spinner from '../../images/spinner.gif'

const Suggestion = ({fetching, suggestion}) => {

    return (
        <div className="Suggestion">
            {fetching ? 
                <img src={spinner} height="150px"/>
            :
                suggestion ?
                    <>
                        <div id="title">{suggestion.activity}</div>
                        <div id="info">
                            <span id="icon" title="Accessibility">
                                <img src={Accessibility} height="30px" alt="Accessibility" />
                                {suggestion.accessibility}
                            </span>
                            <span id="icon" title="Participants">
                                <img src={Participants} height="30px" alt="Participants" />
                                {suggestion.participants}
                            </span>
                            <span id="icon" title="Price">
                                <img src={Price} height="30px" alt="Price" />
                                {suggestion.price}
                            </span>
                        </div>
                        <div id="link">
                            {suggestion.link ? <a href={suggestion.link} rel="noopener noreferrer" target="_blank">Link</a> : null}
                        </div>
                    </>
                :
                    <b>Click the button above to randomize an activity</b>
            }
        </div>
    )
}

export default Suggestion
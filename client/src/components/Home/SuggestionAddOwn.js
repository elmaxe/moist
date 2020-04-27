import React from 'react'

import spinner from '../../images/spinner.gif'
import Accessibility from '../../images/accessibility.svg'
import Participants from '../../images/participants.svg'
import Price from '../../images/price.svg'
import questionmark from '../../images/questionmark.svg'
import { Link } from 'react-router-dom'
import './SuggestionAddOwn.css'

const SuggestionAddOwn = ({addOwnState, onChange, onSave}) => {
    const emptyData = addOwnState.title === "" || addOwnState.accessibility === "" || addOwnState.participants === "" || addOwnState.price === ""
    const invalidData = isNaN(parseFloat(addOwnState.accessibility)) || isNaN(parseInt(addOwnState.participants)) || isNaN(parseFloat(addOwnState.price))
    || parseFloat(addOwnState.accessibility) < 0 || parseFloat(addOwnState.accessibility) > 1 || parseFloat(addOwnState.price) < 0 || parseFloat(addOwnState.price) > 1 || !(parseFloat(addOwnState.participants) > 0)
    
    return (
        <div className="SuggestedActivity">
            <>
                <div id="title">
                    <input placeholder="Activity" autoFocus autoComplete="off" name="title" value={addOwnState.title} onChange={onChange} type="text" />
                </div>
                <div id="info">
                    <span id="icon" title="Accessibility">  
                        <img src={Accessibility} height="30px" alt="Accessibility" />
                        <input placeholder="0-1" autoComplete="off" name="accessibility" value={addOwnState.accessibility} onChange={onChange} type="text" />
                    </span>
                    <span id="icon" title="Participants">
                        <img src={Participants} height="30px" alt="Participants" />
                        <input placeholder="1-&#8734;" autoComplete="off" name="participants" value={addOwnState.participants} onChange={onChange} type="number" />
                    </span>
                    <span id="icon" title="Price">
                        <img src={Price} height="30px" alt="Price" />
                        <input placeholder="0-1" autoComplete="off" name="price" value={addOwnState.price} onChange={onChange} type="text" />
                    </span>
                </div>
                <div id="saveAddOwn">
                    <>
                        <button className="btn green" onClick={onSave} disabled={emptyData || invalidData} >Save</button>
                        <span>
                            <input onChange={onChange} checked={addOwnState.saveGlobally} name="saveGlobally" type="checkbox" />
                            Add as suggestions for other users
                        </span>
                    </>
                </div>
            </>
        </div>
    )
}

export default SuggestionAddOwn
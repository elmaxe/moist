import React, { useState } from 'react'
import './ExpandableBukketlist.css'
import spinner from '../../../images/spinner.gif'
import down from '../../../images/down.svg'

const ExpandableBukketlistView = ({bukketlist, activities, hide, fetching, onClick}) => {
    const indicatorClassname = !hide ? "up" : "down"
    return (
        <div>
            <div className="expandable-head" onClick={() => onClick()}>
                <span id="title">{bukketlist.name}</span>
                <span id="desc">{bukketlist.description ? bukketlist.description : "No description"}</span>
                <span><img id="indicator" className={indicatorClassname} src={down}/></span>
            </div>
            {
                !hide ?
                    <div className="expandable-body">
                        {fetching ? 
                                <img src={spinner} style={{width: "80px"}} />
                            :
                                activities.length === 0 ? <div id="title">No activities</div> : activities.map(x => <div id="title" key={x.aid}>{x.done === 0 ? x.activity : <s>{x.activity}</s>}</div>)
                        }
                    </div>
                :
                    null
            }

        </div>
    )
}

export default ExpandableBukketlistView
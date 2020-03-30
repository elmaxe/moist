import React, { useState } from 'react'

import './Home.css'

const Home = ({props}) => {
    const [suggestion, setSuggestion] = useState(null)
    const [fetching, setFetching] = useState(false)
    const [bucketlist, setBucketlist] = useState([])

    const save = () => {
        setBucketlist(bucketlist.concat([suggestion]))
    }

    const getSuggestion = () => {
        setFetching(true)
        fetch('https://www.boredapi.com/api/activity', {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setFetching(false)
            setSuggestion(json)
        })
    }

    return (
        <div>
            <div className="Home">
                <div>
                    <h1>My bucketlist</h1>
                </div>
                <div>
                    <button onClick={getSuggestion} disabled={fetching} >Suggest an activity</button>
                </div>
                <div>
                    {suggestion ? suggestion.activity : null}
                </div>
                <div>
                    <button onClick={save}>Save to bucketlist</button>
                </div>
                <div>
                    {bucketlist.map(x => <div>{x.activity}</div>)}
                </div>
            </div>
        </div>
    )
}

export default Home
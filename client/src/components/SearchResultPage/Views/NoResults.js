import React from 'react'
import PropTypes from 'prop-types'
import noresults from '../../../images/noresults2.svg'

const NoResults = ({query}) => {
    return (
        <div className="NoResultsFound">
            <img src={noresults} style={{width: "5vw", paddingBottom: "5vh"}}/>
            <div>We found no results for:</div>
            <span><b>"{query}"</b></span>
            <div>Try another search term.</div>
        </div>
    )
}

NoResults.propTypes = {
    query: PropTypes.string.isRequired
}

export default NoResults
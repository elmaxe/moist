import React from 'react'
import PropTypes from 'prop-types'

const NoResults = ({query}) => {
    return (
        <div className="NoResultsFound">
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
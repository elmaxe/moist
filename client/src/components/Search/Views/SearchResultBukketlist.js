import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './SearchResult.css'

const SearchResultBukketlist = ({title, isPrivate, description, username, link}) => {
    return (
        <div className="SearchResult">
            <div>
                <div>
                    <Link to={link}>
                        {title}
                    </Link>
                    <span id="availability" title={isPrivate === 0 ? "Can be seen by anyone" : "Can only be seen by you"}>
                        {isPrivate === 0 ? "Public" : "Private"}
                    </span>
                </div>
                <div id="description">
                    {description ? description : "No description"}
                </div>
                <div id="username">
                    {username}
                </div>
            </div>
        </div>
    )
}

SearchResultBukketlist.propTypes = {
    title: PropTypes.string.isRequired,
    isPrivate: PropTypes.number.isRequired,
    description: PropTypes.string,
    username: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default SearchResultBukketlist
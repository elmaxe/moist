import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// import GenericProfile from '../../images/profile1600x1600.png'
import './SearchResult.css'

const SearchResultUser = ({link, profilePicture, username, description}) => {
    return (
        <div className="SearchResult">
            <span>
                <Link to={link}>
                    <img style={{height:"60px", width:"60px",objectFit:"cover", borderRadius: "10%"}} src={profilePicture ? profilePicture : "images/genericprofile.png"}/>
                </Link>
            </span>
            <div style={{width: "100%"}}>
                <Link to={link} id="userlink">
                    {username}
                </Link>
                <div id="userdesc">
                    {description}
                </div>
            </div>
        </div>
    )
}

SearchResultUser.propTypes = {
    link: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    username: PropTypes.string.isRequired,
    description: PropTypes.string
}

export default SearchResultUser
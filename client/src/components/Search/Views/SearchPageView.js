import React from 'react'
import PropTypes from 'prop-types'

import spinner from '../../../images/spinner.gif'

import SearchResultBukketlist from './SearchResultBukketlist'
import SearchResultUser from './SearchResultUser'
import NoResults from './NoResults'

import './SearchPage.css'

const SearchPageView = ({fetching, userResults = "", bukketlistResults = "", query}) => {
    return (
        <div style={{paddingTop: "50px"}}>
            {fetching ?
                <img src={spinner} />
            :
                userResults.length === 0 && bukketlistResults.length === 0 ?
                    // "No users found"
                    <NoResults query={query} />
                : 
                    <div className="SearchPageView">
                        <div>
                            <h4>Users</h4>
                        </div>
                        <div>
                            {userResults.map(user => 
                                <SearchResultUser
                                    key={user.id}
                                    username={user.username}
                                    description={user.description}
                                    link={`/u/${user.username}`}
                                    profilePicture={user.profilePicture}
                                ></SearchResultUser> 
                            )}
                        </div>
                        <div>
                            <h4>Bukketlists</h4>
                        </div>
                        <div>
                            {bukketlistResults.map(blist => 
                                <SearchResultBukketlist
                                    title={blist.name}    
                                    description={blist.description}
                                    username={blist.username}
                                    isPrivate={blist.private}
                                    link={`/u/${blist.username}`}
                                ></SearchResultBukketlist>  
                            )}
                        </div>
                    </div>
                
            }
        </div>
    )
}

SearchPageView.propTypes = {
    fetching: PropTypes.bool.isRequired,
    userResults: PropTypes.array.isRequired,
    bukketlistResults: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
}

export default SearchPageView
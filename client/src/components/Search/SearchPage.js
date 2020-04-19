import React from 'react'

import GenericProfile from '../../images/profile1600x1600.png'
import spinner from '../../images/spinner.gif'

import {Link} from 'react-router-dom'

import './SearchPage.css'

class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            query: props.history.location.state ? props.history.location.state.query : "",
            fetching: true,
            userResults: [],
            bukketlistResults: []
        }

        this.doSearchQuery = this.doSearchQuery.bind(this)
    }
    
    //When the component mounts, the constructor is called. Therefore no setState
    componentWillMount() {
        this.doSearchQuery()
    }

    //When we are at the search page and search again, the props are updated. SetState and search
    componentWillReceiveProps() {
        this.setState({query: this.props.history.location.state.query}, () => {
            this.doSearchQuery()
        })
    }

    doSearchQuery() {
        const query = this.state.query
        this.setState({fetching: true, userResults: [], bukketlistResults: []})
        fetch('/api/search', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query})
        })
        .then(res => res.json())
        .then(json => {
            this.setState({userResults: json.users, bukketlistResults: json.bukketlists,fetching: false})
        })
    }

    render() {
        const {fetching, userResults, bukketlistResults, query} = this.state
        return (
            <>
            <SearchPageView fetching={fetching} userResults={userResults} bukketlistResults={bukketlistResults} query={query}/>
            </>
        )
    }
}

const SearchPageView = ({fetching, userResults, bukketlistResults, query}) => {
    return (
        <div style={{paddingTop: "50px"}}>
            {fetching ?
                <img src={spinner} />
                :
                userResults.length === 0 ?
                    // "No users found"
                    <NoResults query={query}/>
                    : 
                    <div className="SearchPageView">
                        <div>
                            <h4>Users</h4>
                        </div>
                        <div>
                            {userResults.map(x => <SearchResult key={x.id} username={x.username} profilePicture={x.profilePicture} userData={x}/>)}
                        </div>
                        <div>
                            <h4>Bukketlists</h4>
                        </div>
                        <div>
                        {bukketlistResults.map(x => <SearchResult key={x.bid} username={x.username} bukketlist={{name: x.name, description: x.description, private: x.private}} />)}
                        </div>
                    </div>
            }
        </div>
    )
}

const SearchResult = ({username, profilePicture, bukketlist}) => {
    const link = `/u/${username}`
    return (
        <div className="SearchResult">
            {!bukketlist ? 
                <span>
                    <Link to={link}>
                        <img style={{height:"60px", width:"60px",objectFit:"cover", borderRadius: "10%"}} src={profilePicture ? profilePicture : GenericProfile}/>
                    </Link>
                </span>
            :
                null
            }
            <div className="SearchResultText">
                    {bukketlist ?
                        <div>
                            <Link to={link}>
                                {bukketlist.name}
                            </Link>
                            <span id="availability">
                                {bukketlist.private === 0 ? "Public" : "Private"}
                            </span>
                            <div id="description">
                                {bukketlist.description ? bukketlist.description : "No description"}
                            </div>
                            <div id="username">
                                {username}
                            </div>
                        </div>
                    :
                        <Link to={link}>
                        {username}
                        </Link>
                    }
            </div>
        </div>
    )
}

const NoResults = ({query}) => {
    return (
        <div className="NoResultsFound">
            <div>We found no results for:</div>
            <span><b>"{query}"</b></span>
            <div>Try another search term.</div>
        </div>
    )
}

export default SearchPage
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
            results: []
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
        this.setState({fetching: true, results: []})
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
            this.setState({results: json.users, fetching: false})
        })
    }

    render() {
        const {fetching, results, query} = this.state
        return (
            <>
            <SearchPageView fetching={fetching} results={results} query={query}/>
            </>
        )
    }
}

const SearchPageView = ({fetching, results, query}) => {
    return (
        <div style={{paddingTop: "50px"}}>
            {fetching ?
                <img src={spinner} />
                :
                results.length === 0 ?
                    // "No users found"
                    <NoResults query={query}/>
                    : 
                    <div className="SearchPageView">
                        <div>
                            <h4>Users</h4>
                        </div>
                        <div>
                            {results.map(x => <SearchResult key={x.id} username={x.username} profilePicture={x.profilePicture} />)}
                        </div>
                    </div>
            }
        </div>
    )
}

const SearchResult = ({username, profilePicture}) => {
    const link = `/u/${username}`
    return (
        <div className="SearchResult">
            <span>
                <Link to={link}>
                    <img style={{height:"60px", width:"60px",objectFit:"cover", borderRadius: "50%"}} src={profilePicture ? profilePicture : GenericProfile}/>
                </Link>
            </span>
            <div className="SearchResultText">
                <Link to={link}>
                    {username}
                </Link>
                <button>Test</button>
            </div>
        </div>
    )
}

const NoResults = ({query}) => {
    return (
        <div className="NoResultsFound">
            <div>We found no results for:</div>
            <span><b>{query}</b></span>
            <div>Try another search term.</div>
        </div>
    )
}

export default SearchPage
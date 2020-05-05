import React from 'react'
import SearchPageView from './Views/SearchPageView'

class SearchPage extends React.Component {
    constructor(props) {
        super(props)
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
            this.setState({userResults: json.users, bukketlistResults: json.bukketlists, fetching: false})
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

export default SearchPage
import React from 'react'
import './Search.css'
import * as ROUTES from '../../routes'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ""
        }
    }

    onChange(e) {
        this.setState({
            query: e.target.value
        })
    }

    onSearch(e) {
        const {query} = this.state
        e.preventDefault()
        console.log(this.props)
        console.log(this.state.query)
        this.props.history.replace(ROUTES.SEARCH, {query})
    }

    render() {
        const {query} = this.state
        return (
            <div>
                <SearchView
                    onChange={this.onChange.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    value={query}
                />
            </div>
        )
    }
}

const SearchView = ({onSearch, onChange, value}) => {
    return (
        <div>
            <form>
                <input
                    className="SearchInput"
                    type="text" value={value}
                    onChange={onChange}
                    placeholder="Search"
                />
                <button
                    className="SearchButton"
                    onClick={onSearch}
                    // disabled={value === ""}
                    >Search
                </button>
            </form>
        </div>
    )
}

export default Search
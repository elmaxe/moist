import React from 'react'

import BarSearchView from './Views/BarSearchView'
import * as ROUTES from '../../routes'

class BarSearchComponent extends React.Component {
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
        this.props.history.replace(ROUTES.SEARCH, {query})
    }

    render() {
        const {query} = this.state
        return (
            <div>
                <BarSearchView
                    onChange={this.onChange.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    value={query}
                />
            </div>
        )
    }
}

export default BarSearchComponent
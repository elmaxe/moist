import React from 'react'
import ExpandableBukketlistView from './Views/ExpandableBukketlistView'

class ExpandableBukketlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hide: true,
            fetching: false,
            activities: []
        }
    }

    doFetch() {
        this.setState({fetching: true},
        () => {
            fetch(`/api/activities/get/${this.props.bukketlist.bid}`, {
                method: "GET",
                credentials: "same-origin",
            })
            .then(res => res.json())
            .then(json => {
                this.setState({fetching: false})
                if (json.error) {
                    this.setState({hide: true})
                } else {
                    this.setState({activities: json.rows})
                }
            })
        })
    }
    
    onClick() {
        this.setState({hide: !this.state.hide, fetching: false},
        () => {
            if (!this.state.hide) {
                this.doFetch()
            }
        })
    }

    render() {
        return(
            <ExpandableBukketlistView
                bukketlist={this.props.bukketlist}
                activities={this.state.activities}
                hide={this.state.hide}
                fetching={this.state.fetching}
                onClick={this.onClick.bind(this)}
            />
        )
    }
}

export default ExpandableBukketlist
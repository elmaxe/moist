import React from 'react'
import {Redirect} from 'react-router-dom'

import ReportView from './Views/ReportView'

class Report extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interval: undefined,
            error: "",
            success: ""
        }
    }

    onReport(suggestion) {
        fetch('/api/report', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({suggestion})
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                this.setState({error: json.error})
            } else {
                this.setState({
                    success: json.status,
                    interval: setInterval(() => {
                        clearInterval(this.state.interval)
                        this.setState({interval: undefined})
                        this.props.history.goBack()
                    }, 2000)
                })
            }
        })
    }

    render() {
            if (!this.props.history.location.state) {
                return (
                    <Redirect to="/" />
                )
            } else {
                return (
                    <ReportView
                        suggestion={this.props.history.location.state.suggestion}
                        time={this.props.history.location.state.time}
                        reporter={this.props.history.location.state.reporter}
                        onReport={this.onReport.bind(this)}
                        history={this.props.history}
                        error={this.state.error}
                        interval={this.state.interval}
                        success={this.state.success}
                    />
                )
            }
    }
}

export default Report
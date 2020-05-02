import React, { useState } from 'react'

import LeftBarView from './Views/LeftBarView'

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            fetchDesc: false,
            description: this.props.description,
            inputDescription: this.props.description,
            file: []
        }
    }

    componentWillReceiveProps() {
        this.setState({description: this.props.description, inputDescription: this.props.description})
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})
    }

    onSave() {
        this.setState({fetchDesc: true})
        fetch('/api/auth/user/change-description', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({description: this.state.inputDescription})
        })
        .then(res => res.json())
        .then(json => {
            this.setState({fetchDesc: false})

            if (json.error) {

            } else {
                this.setState({description: this.state.inputDescription}, () => {
                    this.setState({inputDescription: this.state.description})
                })
                this.toggleEdit()
                this.props.history.replace({pathname: this.props.history.location.pathname, state: {refresh: true}})
            }
        })
    }

    onCancel() {
        this.toggleEdit()
        this.setState({inputDescription: this.state.description})
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {edit, inputDescription, file} = this.state
        return (
            <LeftBarView
                {...this.props}
                onSave={this.onSave.bind(this)}
                edit={edit}
                toggleEdit={this.toggleEdit.bind(this)}
                onSave={this.onSave.bind(this)}
                onCancel={this.onCancel.bind(this)}
                onChange={this.onChange.bind(this)}
                inputDescription={inputDescription}
                fetchDesc={this.state.fetchDesc}
                file={file}
            />
        )
    }
}

export default LeftBar

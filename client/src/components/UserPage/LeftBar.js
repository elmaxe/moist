import React, { useState } from 'react'
import genericprofile from '../../images/profile1600x1600.png'

class LeftBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            fetchDesc: false,
            description: this.props.description,
            inputDescription: this.props.description,
            file: null
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

const LeftBarView = ({username, profilePicture, id, description, inputDescription, regDate, loggedInUser, edit, toggleEdit, onSave, onCancel, onChange, fetchDesc, file}) => {
    const picture = profilePicture ? profilePicture : genericprofile
    const isOwnProfile = loggedInUser.id === id

    return (
        <div className="profile">
            <img src={picture} className="profilePic" alt={`${username}'s profile picture.`} title={username} style={{width: "250px", height: "250px", objectFit: "cover"}}/>
            {edit ? 
                <div className="update-profile-pic-box">
                    <input name="file" id="uploadprofilepic" disabled="true" type="file" onChange={e => onChange(e)} value={file} />
                    <button id="uploadprofilepicbtn" disabled={!file || true} className="btn green">Upload</button>
                </div>
            : null}
            <div className="profilecontent">
                <div id="head">
                    <h1>{username}</h1>
                    <h4>Member since {regDate}</h4>
                </div>
                <div id="description">
                    { isOwnProfile? 
                        edit ?
                            <>
                                <button id="editdescbtn" className="btn green" disabled={fetchDesc || inputDescription === description} onClick={() => onSave()}>Save</button>
                                <button id="editdescbtn" className="btn red" disabled={fetchDesc} onClick={() => onCancel()}>Cancel</button>
                            </>
                        :
                            <button id="editprofile" className="btn blue" onClick={() => toggleEdit()}>Edit profile</button>
                    :
                        null
                    }
                    {edit ? <textarea name="inputDescription" autoFocus autoComplete="off" type="textbox" placeholder="Description" value={inputDescription} onChange={e => onChange(e)} /> : (description === '' ? "No description" : description)}
                </div>
            </div>
        </div>
    )
}
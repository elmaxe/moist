import React, { useState } from 'react'
import {Alert} from 'react-bootstrap'
import genericprofile from '../../../images/profile1600x1600.png'

const LeftBarView = ({username, profilePicture, id, description, inputDescription, regDate, loggedInUser, edit, toggleEdit, onSave, onCancel, onChange, fetchDesc, file, onFileChange, onFileUpload, profilePicError}) => {
    const picture = profilePicture ? profilePicture : genericprofile
    const isOwnProfile = loggedInUser.id === id

    return (
        <div className="profile">
            <img src={picture} className="profilePic" alt={`${username}'s profile picture.`} title={username} style={{width: "15vw", height: "15vw", objectFit: "cover"}}/>
            {edit ? 
                <div className="update-profile-pic-box">
                    <form onSubmit={(e) => onFileUpload(e)}>
                        <input name="imageFile" id="uploadprofilepic" disabled={false} type="file" onChange={e => onFileChange(e)} />
                        <button
                            id="uploadprofilepicbtn"
                            disabled={!file}
                            className="btn green"
                            // onClick={}
                        >Upload and save</button>
                    </form>
                    {profilePicError && <Alert id="profilePicError" variant="danger">{profilePicError}</Alert>}
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
                                <button id="editdescbtn" className="btn green" disabled={fetchDesc || inputDescription === description || inputDescription.length > 250} onClick={() => onSave()}>Save</button>
                                <button id="editdescbtn" className="btn red" disabled={fetchDesc} onClick={() => onCancel()}>Cancel</button>
                            </>
                        :
                            <button id="editprofile" className="btn blue" onClick={() => toggleEdit()}>Edit profile</button>
                    :
                        null
                    }
                    {edit ? <span style={inputDescription.length > 250 ? {color: "red"} : null}>{inputDescription.length}/250</span>: null}
                    {edit ? <textarea id="textareauserdesc" name="inputDescription" style={inputDescription === description || inputDescription.length > 250 ? {border: "solid 1px red"} : null} autoFocus autoComplete="off" type="textbox" placeholder="Description" value={inputDescription} onChange={e => onChange(e)} /> : (description === '' ? "No description" : description)}
                </div>
            </div>
        </div>
    )
}

export default LeftBarView
import React from 'react'
import SidebarView from './Views/Sidebar/SidebarView'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // selected: this.props.state.bucketlist,
            blistname: "",
            privatechecked: 0,
            blistdesc: ""
        }
    }

    componentDidMount() {
        this.props.actions.fetchBukketlists()
    }

    clickItem(bukketlist) {
        console.log(bukketlist)
        console.log(this.props.state)
        // if (this.props.state.bucketlist.bucketlist && this.props.state.bucketlist.bukketlist.bid !== bukketlist.bukketlist.bid) {
            // this.setState({selected: id})
            this.props.actions.setBukketlist(bukketlist)
        // }
    }

    clickDelete(bukketlist) {
        const {name, bid} = bukketlist
        const {actions} = this.props
        console.log(bukketlist)
        const buttons = [
            <button
                className="btn red"
                style={{margin: "0 10px 0 10px", padding: "3px"}}
                onClick={() => {
                    actions.removeBukketlist(bid)
                    actions.clearBucketlist()
                }}
            >Yes</button>,
            <button
                className="btn green"
                style={{margin: "0 10px 0 10px", padding: "3px"}}
                onClick={() => {
                    actions.hideAlert()
                }}
            >No</button>,
        ]

        actions.setAndShowAlert("Delete Bukketlist", <span>Are you sure you want to delete "<b>{name}</b>"? This can't be undone</span>, buttons)
    }

    clickCreateNew() {
        const {actions} = this.props
        const buttons = [
            <button
                className="btn green"
                style={{margin: "0 10px 0 10px", padding: "3px"}}
                disabled={this.state.blistname.length === 0 || this.state.blistname.length > 20}
                onClick={() => {
                    actions.createBukketlist(this.state.blistname, this.state.blistdesc, this.state.privatechecked)
                    this.setState({
                        blistname: "",
                        blistdesc: "",
                        privatechecked: false
                    })
                }}
            >Yes</button>,
            <button
                className="btn red"
                style={{margin: "0 10px 0 10px", padding: "3px"}}
                onClick={() => {
                    actions.hideAlert()
                    this.setState({
                        blistname: "",
                        blistdesc: "",
                        privatechecked: false
                    })
                }}
            >Cancel</button>,
        ]

        const onChange = (e) => {
            if (e.target.type === "checkbox") {
                this.setState({
                    [e.target.name]: e.target.checked
                }, () => this.clickCreateNew())
            } else {
                this.setState({
                    [e.target.name]: e.target.value
                }, () => this.clickCreateNew())
            }
        }

        actions.setAndShowAlert(
            "Create new bukketlist",
            <div>
                <input
                    name="blistname"
                    type="text"
                    placeholder="Bukketlist name"
                    onChange={(e) => onChange(e)}
                    autoFocus
                    autoComplete="off"
                />
                {`${this.state.blistname.length}/20`}
                <div style={{marginTop: "10px"}}>
                    <textarea
                        name="blistdesc"
                        style={{resize: "none", height: "10vh"}}
                        placeholder="Description"
                        value={this.state.blistdesc}
                        onChange={e => onChange(e)}
                    />
                    {`${this.state.blistdesc.length}/50`}
                </div>
                <div style={{marginTop: "10px"}}>
                    <input name="privatechecked" type="checkbox" onChange={(e) => onChange(e)} checked={this.state.privatechecked} />
                    <span style={{marginRight: "10px"}}>Private (Only visible to you)</span>
                </div>
            </div>,
            buttons
        )
    }

    render() {
        return( 
            <SidebarView
            // [{id: 0, text: "Reee"}, {id: 1, text: "Reee2eeeeeeeeeeeeeeeeeeeeeeees"}, {id: 2, text: "Reee3"}, {id: 3, text: "Reee4"}, {id: 4, text: "Reee4"}, {id: 5, text: "Reee4"}, {id: 6, text: "Reee4"}]
                bukketlists={this.props.state.bucketlists}
                selected={this.props.state.bucketlist.bukketlist ? this.props.state.bucketlist.bukketlist.bid : -1}
                onClick={this.clickItem.bind(this)}
                onDeleteClick={this.clickDelete.bind(this)}
                createNewClick={this.clickCreateNew.bind(this)}
                // actions={this.props.actions.setAndShowAlert}
            ></SidebarView>
        )
    }
}

export default Sidebar
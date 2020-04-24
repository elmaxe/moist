import React from 'react'
import './Sidebar.css'
import './SidebarItem.css'

import DeleteImage from '../../images/criss-cross.svg'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: 0
        }
    }

    componentDidMount() {
        this.props.actions.fetchBukketlists()
    }

    clickItem(id) {
        if (this.state.selected !== id) {
            this.setState({selected: id})
            this.props.actions.setBukketlist(id)
        }
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

    render() {
        return( 
            <SidebarView
            // [{id: 0, text: "Reee"}, {id: 1, text: "Reee2eeeeeeeeeeeeeeeeeeeeeeees"}, {id: 2, text: "Reee3"}, {id: 3, text: "Reee4"}, {id: 4, text: "Reee4"}, {id: 5, text: "Reee4"}, {id: 6, text: "Reee4"}]
                bukketlists={this.props.state.bucketlists}
                selected={this.state.selected}
                onClick={this.clickItem.bind(this)}
                onDeleteClick={this.clickDelete.bind(this)}
                // actions={this.props.actions.setAndShowAlert}
            ></SidebarView>
        )
    }
}

const SidebarView = ({bukketlists, selected, onClick, onDeleteClick}) => {
return (
        <div className="sidebar">
            <div><h4>My bukketlists</h4></div>
            <div>
                <SidebarItem
                    className="create-bukketlist"
                    text="Create new Bukketlist..."
                    id={-1}
                    selected={-1}
                    onClick={() => alert("Create new")}
                    noDeleteIcon
                ></SidebarItem>
                {bukketlists.map(list => 
                    <SidebarItem
                    key={list.bukketlist.bid}
                    text={list.bukketlist.name}
                    id={list.bukketlist.bid}
                    selected={selected}
                    onClick={onClick}
                    onDeleteClick={() => onDeleteClick(list.bukketlist)}
                    ></SidebarItem>
                    )}
            </div>
        </div>
    )
}

const SidebarItem = ({text, id, selected, onClick, onDeleteClick, noDeleteIcon = false}) => {
    const itemStyle = selected === id ? " selected" : ""

    return (
        <div className={"SidebarItem" + itemStyle} onClick={() => onClick(id)} >
            <span id="title">{text.substring(0, 24)}</span>
            {noDeleteIcon ?
                <span id="delete" onClick={onDeleteClick}>
                <img id="deleteimg" src="" />
            </span>
            : 
                <span id="delete" onClick={onDeleteClick}>
                    <img id="deleteimg" src={DeleteImage}  />
                </span>
            }
        </div>
    )
}

export default Sidebar
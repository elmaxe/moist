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

    clickItem(id) {
        if (this.state.id !== id)
        this.setState({selected: id})
    }

    render() {
        return( 
            <SidebarView
                bukketlists={[{id: 0, text: "Reee"}, {id: 1, text: "Reee2eeeeeeeeeeeeeeeeeeeeeeees"}, {id: 2, text: "Reee3"}, {id: 3, text: "Reee4"}, {id: 4, text: "Reee4"}, {id: 5, text: "Reee4"}, {id: 6, text: "Reee4"}]}
                selected={this.state.selected}
                onClick={this.clickItem.bind(this)}
            ></SidebarView>
        )
    }
}

const SidebarView = ({bukketlists, selected, onClick}) => {
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
                    text={list.text}
                    id={list.id}
                    selected={selected}
                    onClick={onClick}
                    onDeleteClick={() => {alert("Are you sure?")}}
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
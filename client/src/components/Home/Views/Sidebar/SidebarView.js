import React from 'react'
import SidebarItem from './SidebarItem'
import './Sidebar.css'

const SidebarView = ({bukketlists, selected, onClick, onDeleteClick, createNewClick}) => {
    return (
            <div className="sidebar">
                <div><h4>My bukketlists</h4></div>
                <div>
                    <SidebarItem
                        className="create-bukketlist"
                        text="Create new bukketlist..."
                        id={-1}
                        selected={-1}
                        onClick={() => createNewClick()}
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
                            bukketlist={list}
                        ></SidebarItem>
                    )}
                </div>
            </div>
        )
}

export default SidebarView
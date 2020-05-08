import React from 'react'
import DeleteImage from '../../../../images/criss-cross.svg'
import './SidebarItem.css'

const SidebarItem = ({index, text, id, selected, onClick, onDeleteClick, noDeleteIcon = false, bukketlist}) => {
    const itemStyle = selected === id ? " selected" : ""

    return (
        <div className={"SidebarItem" + itemStyle} onClick={() => onClick(index)} >
            <span id="itemtitle">{text.substring(0, 24)}</span>
            {noDeleteIcon ?

                    <img id="deleteimg" src="" />

            : 
                <span id="delete" onClick={onDeleteClick}>
                    <img id="deleteimg" src={DeleteImage}  />
                </span>
            }
        </div>
    )
}

export default SidebarItem
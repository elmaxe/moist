import React from 'react'
import './Search.css'
import searchimg from '../../../images/search.svg'

const BarSearchView = ({onSearch, onChange, value}) => {
    return (
        <div>
            <form>
                <input
                    className="SearchInput"
                    type="text" value={value}
                    onChange={onChange}
                    placeholder="Search users or bukketlists"
                />
                {/* <button
                    id="search-button"
                    className="btn blue"
                    onClick={onSearch}
                    // disabled={value === ""}
                    >Search
                </button> */}
                <img
                    src={searchimg}
                    title="Search"
                    onClick={onSearch}
                    id="search-button"
                />
            </form>
        </div>
    )
}

export default BarSearchView
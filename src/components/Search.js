import React from "react"

function Search({placeholder="Search"}) {
    return (
        <div className="search-box">
            <input type="text" placeholder={placeholder+"..."} />
        </div>
    )
}

export default Search;
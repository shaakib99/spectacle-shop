import React from 'react'
import SearchIcon from '../../assets/images/search.svg'
import '../../css/browse/Search.css'
const Search = (props) => {
    const placeholder = 'Search here...'
    const [searchText, setSearchText] = React.useState('')
    const handleSearch = (e)=>{
        setSearchText(e.target.value)
    }
    return (
        <div id='search-container'>
            <input type='text' placeholder={placeholder} onChange = {props.onSearching}/>
            <img src= {SearchIcon} alt = {"Search"}/>
        </div>
    )
}
export default Search
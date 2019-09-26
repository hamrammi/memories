import React from 'react'
import { Link } from "react-router-dom";
import './SearchBox.css'

function SearchBox () {
  return (
    <nav className="navbar fixed-top navbar-light" style={{ backgroundColor: '#17a2b8' }}>
      <div className="d-flex justify-content-center w-100">
        <div>
          <input className="form-control SearchBox__input" type="search" placeholder="Search" aria-label="Search"/>
        </div>
        <div className="d-flex align-items-center">
          <Link to={'/add'} className="ml-3 SearchBox__plus-icon">
            <i className={'fas fa-plus-square text-light'}/>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default SearchBox

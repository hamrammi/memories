import React from 'react'
import { Link } from "react-router-dom";
import './SearchBox.css'
import { connect } from 'react-redux'

function SearchBox ({ notifiers }) {
  return (
    <nav className="navbar fixed-top navbar-light" style={{ backgroundColor: '#00c7ac' }}>
      { notifiers.success && (
        <div className="alert alert-success position-absolute" style={{
          left: 0, right: 0
        }}>{ notifiers.success }</div>
      ) }
      { notifiers.error && (
        <div className="alert alert-danger position-absolute" style={{
          left: 0, right: 0
        }}>{ notifiers.error }</div>
      ) }
      <div className="d-flex justify-content-center w-100">
        <div>
          <input className="form-control SearchBox__input" type="search" placeholder="Search" aria-label="Search"/>
        </div>
        <div className="d-flex align-items-center">
          <Link to={'add'} className="ml-3 SearchBox__plus-icon">
            <i className={'fas fa-plus-square text-light'}/>
          </Link>
        </div>
      </div>
    </nav>
  )
}

function mapStateToProps (state) {
  return {
    notifiers: state.notifiers
  }
}

const ConnectedSearchBox = connect(mapStateToProps)(SearchBox)

export default ConnectedSearchBox

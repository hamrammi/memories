import React from 'react'
import { Link } from "react-router-dom";
import './SearchBox.css'
import { connect } from 'react-redux'

function SearchBox ({ notifiers }) {
  return (
    <>
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

      <nav className="navbar fixed-top navbar-light shadow-sm" style={{ backgroundColor: '#00c7ac' }}>
        <div className="container px-0 px-lg-3">
          <div className="d-flex justify-content-between w-100">
            <div className="by-hand text-white d-flex align-items-center SearchBox__title">Memories</div>
            <div className="flex-fill d-flex justify-content-end">
              <div className="w-50 d-none d-lg-block mx-3">
                <input className="form-control form-control-lg SearchBox__input" type="search" placeholder="Search"
                       aria-label="Search"/>
              </div>
              <div className="w-100 d-block d-lg-none mx-3">
                <input className="form-control SearchBox__input" type="search" placeholder="Search"
                       aria-label="Search"/>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Link to={'add'} className="SearchBox__plus-icon">
                <i className={'fas fa-sticky-note text-light'}/>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function mapStateToProps (state) {
  return {
    notifiers: state.notifiers
  }
}

const ConnectedSearchBox = connect(mapStateToProps)(SearchBox)

export default ConnectedSearchBox

import React from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import './NavBar.sass'

export default function NavBar () {
  const alertStyles = {
    left: '0',
    right: '0',
    top: '0',
    zIndex: '10000',
    width: '100vw',
    textAlign: 'center',
    height: '68px'
  }

  const alertClasses = 'alert alert-light position-fixed border-0 shadow-sm rounded-0 d-flex align-items-center justify-content-center'

  const notifiers = useSelector(state => state.notifiers)

  return (
    <>
      { notifiers.success && (
        <div className={alertClasses} style={alertStyles}><strong>{notifiers.success}</strong></div>
      ) }
      { notifiers.error && (
        <div className={alertClasses} style={alertStyles}><strong>{notifiers.error}</strong></div>
      ) }

      <nav className="navbar fixed-top navbar-light shadow-sm NavBar">
        <div className="container-fluid px-0 px-lg-3">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center NavBar__AppLogo">
              <i className="fab fa-markdown"/>
            </div>
            <div className="flex-fill d-flex justify-content-end">
              <div className="w-50 d-none d-lg-block mx-3">
                <input className="form-control NavBar__SearchInput" type="search" placeholder="Type to search"/>
              </div>
              <div className="w-100 d-block d-lg-none mx-3">
                <input className="form-control NavBar__SearchInput" type="search" placeholder="Type to search"/>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Link to={'add'} className="NavBar__AddButton">
                <i className="fas fa-feather-alt"/>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

import React from 'react'
import { Link } from "react-router-dom";

function SearchBox () {
  return (
    <>
      <div className="my-4">
        <input className="form-control form-control-lg"
               autoComplete="off"
               type="text" name="search" id="search" placeholder="Search "/>
      </div>
      <div className="my-4">
        <Link to={'/add'} className={'btn btn-outline-info'}>
          Добавить
        </Link>
      </div>
    </>
  )
}

export default SearchBox

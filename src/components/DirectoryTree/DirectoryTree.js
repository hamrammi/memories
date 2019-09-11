import React from 'react'
import { connect } from 'react-redux'
import Directory from "../Directory/Directory";

function DirectoryTree ({ directories }) {
  return (
    <>
      {directories.map(x =>
        <Directory key={x.id} directory={x} />)
      }
      <button className="mt-2 btn btn-light"><i className="mr-2 text-info fas fa-plus"></i> Add new</button>
    </>
  )
}

function mapStateToProps (state) {
  return {
    directories: state.directories.tree
  }
}

export default connect(mapStateToProps)(DirectoryTree)

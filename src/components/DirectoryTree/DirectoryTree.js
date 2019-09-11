import React from 'react'
import { connect } from 'react-redux'
import Directory from "../Directory/Directory";

function DirectoryTree ({ directories }) {
  return (
    <>
      {directories.map(x =>
        <Directory key={x.id} directory={x} />)
      }
      <button>Add new +</button>
    </>
  )
}

function mapStateToProps (state) {
  return {
    directories: state.directories
  }
}

export default connect(mapStateToProps)(DirectoryTree)

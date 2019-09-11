import React from 'react'
import { connect } from 'react-redux'

function DirectoryContent ({ items }) {
  return (
    <>
      {items.length === 0 && <div><i>Choose something on the left</i></div>}
      {items.map((x) => {
        return (
          <div className="border-bottom py-2" key={x.id}>
            <div className="text-info">{ x.title }</div>
            <div><small>{ x.description }</small></div>
          </div>
        )
      })}
    </>
  )
}



function mapStateToProps (state) {
  return {
    items: state.directoryContent[state.directories.activeDirectoryId] || []
  }
}

const ConnectedDirectoryContent = connect(mapStateToProps)(DirectoryContent)
export default ConnectedDirectoryContent

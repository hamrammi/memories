import React from 'react'
import { connect } from 'react-redux'
import { loadDirectoryContent, toggleSubdirectories } from "../../store/actions/actions";

function Directory ({ directory, expandedDirectories, toggle, load }) {
  const isExpanded = expandedDirectories.indexOf(directory.id) !== -1
  const subNodes = directory.__subNodes

  function onClick () {
    toggle(directory.id)
    load(directory.id)
  }

  return (
    <>
      <div onClick={onClick} className="my-1 py-2 px-2 bg-light">
        <i className={'mr-2 text-info fas ' + (isExpanded ? 'fa-folder-open' : 'fa-folder')}/>{ directory.name }
      </div>
      <div className="ml-4">
        {isExpanded && Object.keys(subNodes).map((nodeId) => {
          return <ConnectedDirectory key={nodeId} directory={subNodes[nodeId]}/>
        })}
      </div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    expandedDirectories: state.expandedDirectories
  }
}

const mapDispatchToProps = {
  toggle: toggleSubdirectories,
  load: loadDirectoryContent
}

const ConnectedDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory)
export default ConnectedDirectory

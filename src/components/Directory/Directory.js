import React from 'react'
import { connect } from 'react-redux'
import { loadDirectoryContent, toggleSubdirectories } from "../../store/actions/actions";
import './Directory.css'

function Directory ({ directory, expandedDirectories, toggle, load }) {
  const isExpanded = expandedDirectories.indexOf(directory.id) !== -1
  const subNodes = directory.__subNodes
  return (
    <div>
      <div className="d-flex">
        <div onClick={() => toggle(directory.id)} className={'my-1 pr-2 d-flex align-items-center'}>
          <span className={'Directory__caret-container mb-0 ' + (Object.keys(subNodes).length === 0 ? 'd-none' : '')}>
            <i className={'Directory__caret text-info fas ' + (isExpanded ? 'fa-caret-down' : 'fa-caret-right')}/>
          </span>
        </div>
        <div onClick={() => load(directory.id)} className="my-1 py-2 px-2 Directory__name">
          <i className={'mr-2 text-info fas fa-folder'}/>
          { directory.name }
        </div>
      </div>
      <div className="ml-4">
        {isExpanded && Object.keys(subNodes).map((nodeId) => {
          return <ConnectedDirectory key={nodeId} directory={subNodes[nodeId]}/>
        })}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    expandedDirectories: state.directories.expandedIds
  }
}

const mapDispatchToProps = {
  toggle: toggleSubdirectories,
  load: loadDirectoryContent
}

const ConnectedDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory)
export default ConnectedDirectory

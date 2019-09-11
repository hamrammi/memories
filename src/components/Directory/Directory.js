import React from 'react'
import { connect } from 'react-redux'
import { loadDirectoryContent, toggleSubdirectories } from "../../store/actions/actions";

function Directory ({ directory: { id, name, subDirectories },
                      expandedDirectories, toggle, load }) {
  const isExpanded = expandedDirectories.indexOf(id) !== -1

  function onClick () {
    toggle(id)
    load(id)
  }

  return (
    <>
      <div onClick={onClick} className="my-1 py-2 px-2 bg-light">
        <i className={'mr-2 text-info fas ' + (isExpanded ? 'fa-folder-open' : 'fa-folder')}></i>{ name }
      </div>
      <div className="ml-4">
        {isExpanded && subDirectories.map((x) => {
          return <ConnectedDirectory key={x.id} directory={x}/>
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

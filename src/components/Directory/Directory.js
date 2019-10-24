import React, { useContext } from 'react'
import { connect } from 'react-redux'
import {
  selectDirectory,
  toggleSubdirectories
} from "../../store/actions/actions";
import './Directory.css'
import DirectoryContext from "../../contexts/DirectoryContext";

const NoDescription = () => (<i>No description</i>)

const themes = { SearchMemories: 'main', AddMemory: 'main', AddDirectory: 'main' }

function Directory ({ directory, expandedDirectories, activeDirectoryIds, onToggle, onClick }) {
  const context = useContext(DirectoryContext)
  const theme = themes[context]

  const isExpanded = expandedDirectories[context].indexOf(directory.id) !== -1
  const subNodes = directory.__subNodes
  return (
    <>
      <div className="shadow-sm mb-2 rounded-lg border-default">
        <div className="d-flex" style={{ fontSize: '1em', borderRadius: 'inherit' }}>
          <div onClick={() => onToggle(directory.id, context)} className="Directory__icon rounded-lg px-3 d-flex align-items-center bg-light">
            <span className={'Directory__caret-container mb-0 ' + (Object.keys(subNodes).length === 0 ? 'invisible' : '')}>
              <i className={`text-${theme} far ` + (isExpanded ? 'fa-folder-open' : 'fa-folder')}/>
            </span>
          </div>
          <div onClick={() => onClick(directory.id, context)} className="px-2 py-1 Directory__name w-100 bg-white ">
            <div style={{ fontWeight: activeDirectoryIds[context] === directory.id ? 'bold' : 'normal' }}>
              {directory.name}
            </div>
            <div>
              <small className="text-muted">
                {directory.description ? directory.description : <NoDescription/>}
              </small>
            </div>
          </div>
        </div>
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
    expandedDirectories: {
      SearchMemories: state.directories.SearchMemories__expandedIds,
      AddMemory: state.directories.AddMemory__expandedIds,
      AddDirectory: state.directories.AddDirectory__expandedIds
    },
    activeDirectoryIds: {
      SearchMemories: state.directories.SearchMemories__activeId,
      AddMemory: state.directories.AddMemory__activeId,
      AddDirectory: state.directories.AddDirectory__activeId
    }
  }
}

const mapDispatchToProps = {
  onToggle: toggleSubdirectories,
  onClick: selectDirectory
}

const ConnectedDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory)
export default ConnectedDirectory

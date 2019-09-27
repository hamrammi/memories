import React, { useContext } from 'react'
import { connect } from 'react-redux'
import {
  selectDirectory,
  toggleSubdirectories
} from "../../store/actions/actions";
import './Directory.css'
import DirectoryContext from "../../contexts/DIrectoryContext";

const themes = { SearchMemories: 'info', AddMemory: 'warning' }

function Directory ({ directory, expandedDirectories, onToggle, onClick }) {
  const context = useContext(DirectoryContext)
  const theme = themes[context]

  const isExpanded = expandedDirectories[context].indexOf(directory.id) !== -1
  const subNodes = directory.__subNodes
  return (
    <div>
      <div className="d-flex">
        <div onClick={() => onToggle(directory.id, context)} className={'pr-2 d-flex align-items-center'}>
          <span className={'Directory__caret-container mb-0 ' + (Object.keys(subNodes).length === 0 ? 'invisible' : '')}>
            <i className={`Directory__caret text-${theme} fas ` + (isExpanded ? 'fa-caret-down' : 'fa-caret-right')}/>
          </span>
        </div>
        <div onClick={() => onClick(directory.id, context)} className="py-2 pr-2 Directory__name">
          <i className={`mr-2 fas fa-folder text-${theme}`}/>
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
    expandedDirectories: {
      SearchMemories: state.directories.SearchMemories__expandedIds,
      AddMemory: state.directories.AddMemory__expandedIds
    }
  }
}

const mapDispatchToProps = {
  onToggle: toggleSubdirectories,
  onClick: selectDirectory
}

const ConnectedDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory)
export default ConnectedDirectory

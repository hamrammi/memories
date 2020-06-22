import React, { useContext } from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {
  selectDirectory,
  toggleSubdirectories
} from "../../store/actions/actions";
import './Folder.sass'
import DirectoryContext from "../../contexts/DirectoryContext";

const themes = { SearchMemories: 'main', AddMemory: 'main', AddDirectory: 'main' }

function Folder ({ directory }) {
  const context = useContext(DirectoryContext)
  const theme = themes[context]

  const dispatch = useDispatch()
  const expandedDirectories = useSelector(state => ({
    SearchMemories: state.directories.SearchMemories__expandedIds,
    AddMemory: state.directories.AddMemory__expandedIds,
    AddFolder: state.directories.AddDirectory__expandedIds
  }), shallowEqual)
  const activeDirectoryIds = useSelector(state => ({
    SearchMemories: state.directories.SearchMemories__activeId,
    AddMemory: state.directories.AddMemory__activeId,
    AddFolder: state.directories.AddDirectory__activeId
  }), shallowEqual)

  const isExpanded = expandedDirectories[context].indexOf(directory.id) !== -1
  const subNodes = directory.__subNodes

  return (
    <>
      <div className="Folder__Container shadow mb-3 rounded-lg">
        <div className="d-flex" style={{ fontSize: '1em', borderRadius: 'inherit' }}>
          <div onClick={() => dispatch(toggleSubdirectories(directory.id, context))}
               className="Directory__icon px-3 d-flex align-items-center">
            <span className={'Directory__caret-container mb-0 '
            + (Object.keys(subNodes).length === 0 ? 'invisible' : '')}>
              <i className={`text-${theme} far ` + (isExpanded ? 'fa-folder-open' : 'fa-folder')}/>
            </span>
          </div>
          <div
              onClick={() => dispatch(selectDirectory(directory.id, context))}
              className={'px-2 py-2 Folder__Name w-100 '
                + (activeDirectoryIds[context] === directory.id ? 'Folder__Name--active' : '')}
          >
            <div><strong>{directory.name}</strong></div>
            <div className="text-white-50">Some awesome folder info</div>
          </div>
        </div>
      </div>
      <div className="ml-4">
        {isExpanded && Object.keys(subNodes).map((nodeId) => {
          return <Folder key={nodeId} directory={subNodes[nodeId]}/>
        })}
      </div>
    </>
  )
}

export default Folder

import React from 'react'
import FolderTree from "../FolderTree/FolderTree";
import MemoryList from "../MemoryList/MemoryList";
import MemoryView from "../MemoryView/MemoryView";
import { useSelector } from "react-redux";
import MemoryViewEmpty from "../MemoryView/MemoryViewEmpty";

function Dashboard () {
  const memoryId = useSelector(state => state.memories.activeId)

  return (
    <div className="row">
      <FolderTree/>
      <MemoryList/>
      {memoryId === ''
          ? <MemoryViewEmpty/>
          : <MemoryView/>
      }
    </div>
  )
}

export default Dashboard

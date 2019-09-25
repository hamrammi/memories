import React from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DIrectoryContext";

function AddMemory () {
  return (
    <div className={'row'}>
      <div className="col-8">
        <h3 className={'mb-3'}><strong>Adding a new memory</strong></h3>
        <div className={'AddMemory__step'}>
          <div className={'mb-2'}><strong>Title</strong></div>
          <input type="text" className={'form-control'} placeholder={'Enter title'}/>
        </div>
        <div className={'AddMemory__step'}>
          <div className={'mt-4 mb-2'}><strong>Description</strong></div>
          <input type="text" className={'form-control'} placeholder={'Enter description'}/>
        </div>
        <div className={'AddMemory__step'}>
          <div className={'mt-4 mb-2'}><strong>Choose a folder</strong></div>
          <DirectoryContext.Provider value={'warning'}>
            <DirectoryTree/>
          </DirectoryContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default AddMemory

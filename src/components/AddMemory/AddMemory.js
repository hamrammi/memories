import React from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DIrectoryContext";
import { Link } from 'react-router-dom'

function AddMemory () {
  return (
    <div className={'row'}>
      <div className="col-12">
        <h3 className={'mb-3'}>
          <Link to={'/'}><i className={'fas fa-arrow-left mr-3 text-info'}/></Link>
          <strong>New memory</strong>
        </h3>
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
          <DirectoryContext.Provider value={'AddMemory'}>
            <DirectoryTree/>
          </DirectoryContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default AddMemory

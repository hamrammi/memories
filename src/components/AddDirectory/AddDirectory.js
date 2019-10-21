import React, { useState } from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DirectoryContext";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const GQL_createDirectory = gql`
  mutation CreateDirectory($name: String!, $parentId: ID) {
    createDirectory(name: $name, parentId: $parentId) {
      id
      name
      parentId
    }
  }
`

function AddDirectory ({ selectedDirectoryId }) {
  const [name, setName] = useState('')

  return (
    <div className={'row'}>
      <div className="col-12">
        <h4 className="mb-4 eyes-friendly">
          <Link to={''}><i className={'fas fa-chevron-left mr-3 text-main'}/></Link>
          <strong>New directory</strong>
        </h4>
      </div>
      <div className="col-12 col-lg-4">
        <DirectoryContext.Provider value={'AddDirectory'}>
          <DirectoryTree/>
        </DirectoryContext.Provider>
      </div>
      <div className="col-12 col-lg-8">
        <h5 className="card-title"><strong>Folder information</strong></h5>
        <div className="shadow-sm bg-white rounded-lg p-3">
          <div className="AddDirectory__step mb-3">
            <div className={'mb-2'}><strong>Name</strong></div>
            <input type="text" className="form-control border"
                   onChange={e => setName(e.target.value)} value={name}/>
          </div>
          <Mutation mutation={GQL_createDirectory} variables={{ name, parentId: selectedDirectoryId }}>
            {createDirectoryMutation =>
              <button onClick={createDirectoryMutation} className="btn btn-main rounded-lg shadow-sm">Save directory</button>
            }
          </Mutation>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    selectedDirectoryId: state.directories.AddDirectory__activeId
  }
}

const ConnectedAddDirectory = connect(mapStateToProps)(AddDirectory)

export default ConnectedAddDirectory

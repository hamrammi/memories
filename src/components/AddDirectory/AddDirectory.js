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
        <h3 className={'mb-4'}>
          <Link to={''}><i className={'fas fa-chevron-left mr-3 text-main'}/></Link>
          <strong>New directory</strong>
        </h3>
      </div>
      <div className="col-12 col-lg-4">
        <DirectoryContext.Provider value={'AddDirectory'}>
          <DirectoryTree/>
        </DirectoryContext.Provider>
      </div>
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className={'AddDirectory__step'}>
              <div className={'mb-2'}><strong>Name</strong></div>
              <input type="text" className={'form-control'}
                     onChange={e => setName(e.target.value)} value={name}/>
            </div>
          </div>
          <div className="card-footer">
            <Mutation mutation={GQL_createDirectory} variables={{ name, parentId: selectedDirectoryId }}>
              {createDirectoryMutation =>
                <button onClick={createDirectoryMutation} className="btn btn-main">Save directory</button>
              }
            </Mutation>
          </div>
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

import React, { useState } from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DIrectoryContext";
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
        <h3 className={'mb-3'}>
          <Link to={'/'}><i className={'fas fa-arrow-left mr-3 text-info'}/></Link>
          <strong>New directory</strong>
        </h3>
        <div className={'AddDirectory__step'}>
          <div className={'mb-2'}><strong>Name</strong></div>
          <input type="text" className={'form-control'}
                 onChange={e => setName(e.target.value)} value={name}/>
        </div>
        <div className={'AddDirectory__step'}>
          <div className={'mt-4 mb-2'}><strong>Choose a folder</strong></div>
          <DirectoryContext.Provider value={'AddDirectory'}>
            <DirectoryTree/>
          </DirectoryContext.Provider>
        </div>
        <div className="text-center">
          <Mutation mutation={GQL_createDirectory} variables={{ name, parentId: selectedDirectoryId }}>
            {createDirectoryMutation =>
              <button onClick={createDirectoryMutation} className="btn btn-info">Save</button>
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

import React, { useState } from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DIrectoryContext";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { selectDirectory } from "../../store/actions/actions";

const GQL_createMemory = gql`
  mutation CreateMemory($title: String!, $description: String, $directoryId: ID!) {
    createMemory(title: $title, description: $description, directoryId: $directoryId) {
      id
      title
      description
      directoryId
    }
  }
`

function AddMemory ({ selectedDirectoryId, selectDirectory }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function onClick (handler) {
    handler()
    setTitle('')
    setDescription('')
    selectDirectory('')
  }

  return (
    <div className={'row'}>
      <div className="col-12">
        <h3 className={'mb-3'}>
          <Link to={'/'}><i className={'fas fa-arrow-left mr-3 text-info'}/></Link>
          <strong>New memory</strong>
        </h3>
      </div>
      <div className="col-12 col-xl-4">
        <div className={'AddMemory__step'}>
          <div className={'mt-4 mb-2'}><strong>Choose a folder</strong></div>
          <DirectoryContext.Provider value={'AddMemory'}>
            <DirectoryTree/>
          </DirectoryContext.Provider>
        </div>
      </div>
      <div className="col-12 col-xl-8">
        <div className={'AddMemory__step'}>
          <div className={'mb-2'}><strong>Title</strong></div>
          <input type="text" className={'form-control'}
                 onChange={e => setTitle(e.target.value)} value={title}/>
        </div>
        <div className={'AddMemory__step'}>
          <div className={'mt-4 mb-2'}><strong>Description</strong></div>
          <input type="text" className={'form-control'}
                 onChange={e => setDescription(e.target.value)} value={description}/>
        </div>
        <div className="text-center mt-4">
          <Mutation mutation={GQL_createMemory} variables={{ title, description, directoryId: selectedDirectoryId }}>
            {createMemoryMutation =>
              <button onClick={() => onClick(createMemoryMutation)} className="btn btn-info">Save</button>
            }
          </Mutation>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    selectedDirectoryId: state.directories.AddMemory__activeId
  }
}

const mapDispatchToProps = {
  selectDirectory: (id) => selectDirectory(id, 'AddMemory')
}

const ConnectedAddMemory = connect(mapStateToProps, mapDispatchToProps)(AddMemory)

export default ConnectedAddMemory

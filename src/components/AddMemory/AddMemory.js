import React, { useState } from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DirectoryContext";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { hideNotifier, selectDirectory, showNotifier } from "../../store/actions/actions";
import { GQL_memories } from '../DirectoryContent/DirectoryContent'

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

function AddMemory ({ selectedDirectoryId, selectDirectory, showNotifier, hideNotifier }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function onClick (handler) {
    handler()
    setTitle('')
    setDescription('')
    selectDirectory('')
  }

  function onUpdate (store, { data: { createMemory } }) {
    try {
      const data = store.readQuery({ query: GQL_memories, variables: { directoryId: selectedDirectoryId } })
      data.memories.push(createMemory)
      store.writeQuery({ query: GQL_memories, variables: { directoryId: selectedDirectoryId }, data })
    } catch (e) {}
    showNotifier('success', 'Memory saved!')
    setTimeout(hideNotifier, 2000)
  }

  return (
    <div className="row">
      <div className="col-12">
        <h4 className="mb-4 eyes-friendly">
          <Link to={''}><i className="fas fa-chevron-left mr-3 text-main"/></Link>
          <strong>New memory</strong>
        </h4>
      </div>
      <div className="col-12 col-lg-4">
        <DirectoryContext.Provider value={'AddMemory'}>
          <DirectoryTree/>
        </DirectoryContext.Provider>
      </div>
      <div className="col-12 col-lg-8">
        <h5 className="card-title"><strong>Memory bio</strong></h5>
        <div className="shadow-sm p-3 bg-white rounded-lg">
          <div className="AddMemory__step">
            <div className={'mb-2'}><strong>Title</strong></div>
            <input type="text" className="form-control border"
                   onChange={e => setTitle(e.target.value)} value={title}/>
          </div>
          <div className="AddMemory__step mb-3">
            <div className={'mt-4 mb-2'}><strong>Description</strong></div>
            <textarea className="form-control border" rows="4"
                      onChange={e => setDescription(e.target.value)} value={description}/>
          </div>
          <Mutation mutation={GQL_createMemory}
                    variables={{ title, description, directoryId: selectedDirectoryId }}
                    update={onUpdate}>
            {createMemoryMutation =>
              <button onClick={() => onClick(createMemoryMutation)}
                      className="btn btn-main shadow-sm rounded-lg">Save memory</button>
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
  selectDirectory: (id) => selectDirectory(id, 'AddMemory'),
  showNotifier: showNotifier,
  hideNotifier: hideNotifier
}

const ConnectedAddMemory = connect(mapStateToProps, mapDispatchToProps)(AddMemory)

export default ConnectedAddMemory

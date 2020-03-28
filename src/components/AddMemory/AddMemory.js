import React, { useState } from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DirectoryContext";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { hideNotifier, selectDirectory, showNotifier } from "../../store/actions/actions";
import { GQL_memories } from '../DirectoryContent/DirectoryContent'
import { GQLErrors, transformGQLError } from '../shared/GQLErrors'

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

function AddMemory () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const selectedDirectoryId = useSelector(state => state.directories.AddMemory__activeId)

  function onError (gqlError) {
    setErrors(transformGQLError(gqlError))
  }

  function onUpdate (store, { data: { createMemory } }) {
    try {
      const data = store.readQuery({ query: GQL_memories, variables: { directoryId: selectedDirectoryId } })
      const newData = Object.assign({}, data, {
        memories: data.memories.concat(createMemory)
      })
      store.writeQuery({ query: GQL_memories, variables: { directoryId: selectedDirectoryId }, data: newData })
    } catch (e) {}
    setTitle('')
    setDescription('')
    dispatch(selectDirectory('', 'AddMemory'))
    setErrors([])
    dispatch(showNotifier('success', 'Memory saved!'))
    setTimeout(() => dispatch(hideNotifier()), 2000)
  }

  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="mb-4 d-flex align-items-center">
          <Link to={''}>
            <button className="btn btn-secondary">
              <i className="fas fa-arrow-left mr-2"/>Back
            </button>
          </Link>
          <h5 className="mb-0 ml-4 text-uppercase"><strong>New memory</strong></h5>
        </div>
        <hr className="mb-4"/>
      </div>
      <div className="col-12 col-lg-4">
        <DirectoryContext.Provider value="AddMemory">
          <DirectoryTree/>
        </DirectoryContext.Provider>
      </div>
      <div className="col-12 col-lg-8">
        <h5 className="card-title mb-4">
          <strong><span className="text-secondary mr-2">Step 2:</span>Memory BIO</strong>
        </h5>
        <GQLErrors errors={errors}/>
        <div className="panel-default p-3">
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
                    onError={onError}
                    update={onUpdate}>
            {createMemoryMutation =>
              <button onClick={createMemoryMutation}
                      className="btn btn-main shadow-sm rounded-lg">Save memory</button>
            }
          </Mutation>
        </div>
      </div>
    </div>
  )
}

export default AddMemory

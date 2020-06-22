import React, { useState } from 'react'
import FolderTree, { GQL_directories } from "../FolderTree/FolderTree";
import DirectoryContext from "../../contexts/DirectoryContext";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { GQLErrors, transformGQLError } from '../shared/GQLErrors'
import { hideNotifier, selectDirectory, showNotifier } from "../../store/actions/actions";
import './AddFolder.sass'


const GQL_addFolder = gql`
  mutation CreateDirectory($name: String!, $parentId: ID) {
    createDirectory(name: $name, parent_id: $parentId) {
      id
      name
      parent_id
    }
  }
`

function AddFolder () {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const selectedDirectoryId = useSelector(state => state.directories.AddDirectory__activeId)

  function onError (gqlError) {
    setErrors(transformGQLError(gqlError))
  }

  function onUpdate (store, { data: { createDirectory }}) {
    try {
      const data = store.readQuery({ query: GQL_directories })
      const newData = Object.assign({}, data, {
        directories: data.directories.concat(createDirectory)
      })
      store.writeQuery({ query: GQL_directories, data: newData })
    } catch (e) {}
    setName('')
    dispatch(selectDirectory('', 'AddFolder'))
    setErrors([])
    dispatch(showNotifier('success', 'Folder saved!'))
    setTimeout(() => dispatch(hideNotifier()), 2000)
  }

  const [addFolderMutation] = useMutation(GQL_addFolder, {
    update: onUpdate,
    onError
  })

  return (
    <div className="row">
      <div className="col-12 py-3 AddFolder__Header">
        <div className="d-flex align-items-center">
          <Link to={''}>
            <button className="btn btn-secondary">
              <i className="fas fa-arrow-left mr-2"/>Back
            </button>
          </Link>
          <h5 className="mb-0 ml-4 text-uppercase text-white"><strong>New directory</strong></h5>
        </div>
      </div>
      <DirectoryContext.Provider value={'AddFolder'}>
        <FolderTree/>
      </DirectoryContext.Provider>
      <div className="col-12 col-xl-9 py-4 AddFolder__FolderInfo">
        <h5 className="mb-4">
          <strong className="text-white-50"><span className="mr-2">Step 2:</span>Folder information</strong>
        </h5>
        <GQLErrors errors={errors}/>
        <div className="panel-default p-3">
          <div className="AddDirectory__step mb-3">
            <div className={'mb-2'}><strong>Name</strong></div>
            <input type="text" className="form-control border"
                   onChange={e => setName(e.target.value)} value={name}/>
          </div>
          <button
              onClick={(e) => {
                e.preventDefault()
                addFolderMutation({ variables: { name, parentId: selectedDirectoryId } })
              }}
              className="btn btn-main rounded-lg shadow-sm"
          >Add Folder</button>
        </div>
      </div>
    </div>
  )
}

export default AddFolder

import React, { useState } from 'react'
import DirectoryTree, { GQL_directories } from "../DirectoryTree/DirectoryTree";
import DirectoryContext from "../../contexts/DirectoryContext";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { GQLErrors, transformGQLError } from '../shared/GQLErrors'
import { hideNotifier, selectDirectory, showNotifier } from "../../store/actions/actions";


const GQL_createDirectory = gql`
  mutation CreateDirectory($name: String!, $parentId: ID) {
    createDirectory(name: $name, parentId: $parentId) {
      id
      name
      parentId
    }
  }
`

function AddDirectory () {
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
    dispatch(selectDirectory('', 'AddDirectory'))
    setErrors([])
    dispatch(showNotifier('success', 'Directory saved!'))
    setTimeout(() => dispatch(hideNotifier()), 2000)
  }

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
        <GQLErrors errors={errors}/>
        <div className="panel-default p-3">
          <div className="AddDirectory__step mb-3">
            <div className={'mb-2'}><strong>Name</strong></div>
            <input type="text" className="form-control border"
                   onChange={e => setName(e.target.value)} value={name}/>
          </div>
          <Mutation mutation={GQL_createDirectory}
                    update={onUpdate}
                    onError={onError}
                    variables={{ name, parentId: selectedDirectoryId }}>
            {createDirectoryMutation =>
              <button onClick={createDirectoryMutation} className="btn btn-main rounded-lg shadow-sm">Save directory</button>
            }
          </Mutation>
        </div>
      </div>
    </div>
  )
}

export default AddDirectory

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import gql from 'graphql-tag'
import Fetching from '../shared/Fetching'
import ErrorAlert from '../shared/ErrorAlert'
import './MemoryList.sass'
import { useQuery } from "@apollo/client";
import { selectMemory } from "../../store/actions/actions";

export const GQL_memories = gql`
  query ($directoryId: ID!) {
    memories(directory_id: $directoryId) {
      id
      title
      description
      directory_id
    }
  }
`

function MemoryList () {
  const dispatch = useDispatch()
  const directoryId = useSelector(state => state.directories.SearchMemories__activeId)
  const { loading, error, data } = useQuery(GQL_memories, {
    variables: { directoryId }
  })
  if (loading) return (
    <div className="col-12 col-xl-4 py-4 FolderContent">
      <Fetching/>
    </div>
  )
  if (error) return (
    <div className="col-12 col-xl-4 py-4 FolderContent">
      <ErrorAlert message={error.message}/>
    </div>
  )

  const memories = data['memories']
  if (memories.length === 0) return (
    <div className="col-12 col-xl-4 py-4 FolderContent">
      <i className="text-white">There're no items yet</i>
    </div>
  )

  return (
    <div className="col-12 col-xl-4 py-4 FolderContent">
      <h5 className="mb-4 text-center text-white-50">
        <strong>Folder content</strong>
      </h5>

      {memories.map((x) => {
        return (
          <div
              className="FolderContent__FolderItem mb-3 p-3 rounded-lg shadow"
              onClick={() => dispatch(selectMemory(x.id))}
              key={x.id}
          >
            <h5 style={{ color: '#ddd' }}><strong>{x.title}</strong></h5>
            <div className="mb-2">{ x.description }</div>
            <div className="text-muted">
              <span className="badge badge-info mr-2">#super</span>
              <span className="badge badge-warning">#coolstuff</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}



export default MemoryList

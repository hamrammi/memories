import React from 'react'
import './MemoryView.sass'
import { useSelector } from "react-redux";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Fetching from "../shared/Fetching";
import ErrorAlert from "../shared/ErrorAlert";

export const GQL_memory = gql`
  query ($memoryId: ID!) {
    memory(memory_id: $memoryId) {
      id
      title
      description
      directory_id
    }
  }
`

function MemoryView () {
  const memoryId = useSelector(state => state.memories.activeId)
  const { loading, error, data } = useQuery(GQL_memory, {
    variables: { memoryId }
  })
  if (loading) return (
    <div className="col-12 col-xl-5 MemoryView py-4">
      <Fetching/>
    </div>
  )
  if (error) return (
    <div className="col-12 col-xl-5 MemoryView py-4">
      <ErrorAlert message={error.message}/>
    </div>
  )

  const memory = data.memory

  return (
    <div className="col-12 col-xl-5 py-4 MemoryView">
      <h5 className="text-center text-white mb-4">
        <strong>{memory.title}</strong>
      </h5>
      <p className="text-white">{memory.description}</p>
    </div>
  )
}

export default MemoryView

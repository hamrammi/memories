import React from 'react'
import { useSelector } from 'react-redux'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Fetching from '../shared/Fetching'
import ErrorAlert from '../shared/ErrorAlert'
import { Link } from 'react-router-dom'

export const GQL_memories = gql`
  query ($directoryId: ID!) {
    memories(directoryId: $directoryId) {
      id
      title
      description
      directoryId
    }
  }
`

function DirectoryContent () {
  const directoryId = useSelector(state => state.directories.SearchMemories__activeId)
  return (
    <>
      <Query query={GQL_memories} variables={{ directoryId }}>
        {({ loading, error, data }) => {
          if (loading) return <Fetching/>
          if (error) return <ErrorAlert message={error.message}/>
          const items = data['memories']

          if (items.length === 0) return <div><i>There're no items yet</i></div>
          return (
            items.map((x) => {
              return (
                <div className="panel-default mb-2 pb-2 pt-3 px-3" key={x.id}>
                  <Link to={`/m/${x.id}`}>
                    <h5 className="text-main"><strong>{x.title}</strong></h5>
                  </Link>
                  <div className="mb-2">{ x.description }</div>
                  <div className="text-muted">
                    #super #coolstuff
                  </div>
                </div>
              )
            })
          )
        }}
      </Query>
    </>
  )
}



export default DirectoryContent

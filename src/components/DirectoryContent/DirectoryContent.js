import React from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Fetching from '../shared/Fetching'
import ErrorAlert from '../shared/ErrorAlert'

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

function DirectoryContent ({ directoryId }) {
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
                  <h5 className="text-main"><strong>{x.title}</strong></h5>
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



function mapStateToProps (state) {
  return {
    directoryId: state.directories.SearchMemories__activeId
  }
}

const ConnectedDirectoryContent = connect(mapStateToProps)(DirectoryContent)
export default ConnectedDirectoryContent

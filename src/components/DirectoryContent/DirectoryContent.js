import React from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GQL_nodeContent = gql`
  query ($nodeId: ID!) {
    nodeContent(nodeId: $nodeId) {
      id
      title
      description
    }
  }
`

function DirectoryContent ({ activeNodeId }) {
  return (
    <>
      <Query query={GQL_nodeContent} variables={{ nodeId: activeNodeId }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          const items = data['nodeContent']

          if (items.length === 0) return <div><i>There're no items yet</i></div>
          return (
            items.map((x) => {
              return (
                <div className="border-bottom py-2" key={x.id}>
                  <div className="text-info">{ x.title }</div>
                  <div><small>{ x.description }</small></div>
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
    activeNodeId: state.directories.SearchMemories__activeId
  }
}

const ConnectedDirectoryContent = connect(mapStateToProps)(DirectoryContent)
export default ConnectedDirectoryContent

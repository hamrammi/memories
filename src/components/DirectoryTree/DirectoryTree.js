import React from 'react'
import Directory from "../Directory/Directory"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GQL_nodes = gql`
  query {
    nodes {
      id
      name
      parentId
      level
    }
  }
`

function DirectoryTree () {
  return (
    <>
      <Query query={GQL_nodes}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          return (
            <div>
              {makeTree(data.nodes)/*.map(x => <Directory key={x.id} directory={x} />)*/}
            </div>
          )
        }}
      </Query>
      <button className="mt-2 btn btn-light"><i className="mr-2 text-info fas fa-plus"></i>Add new</button>
    </>
  )
}

export default DirectoryTree

function makeTree (nodes) {
  const findNodeIdsByParentId = id =>
    nodes.filter(x => x.parentId === id).map(x => x.id)

  function findSubDirs (parentNodeId, tree) {
    let nodeIds = findNodeIdsByParentId(parentNodeId)
    tree[parentNodeId] = {}
    nodeIds.forEach(nodeId => {
      tree[parentNodeId][nodeId] = {}
      findSubDirs(nodeId, tree[parentNodeId])
    })
    return tree
  }

  findNodeIdsByParentId(null).forEach(id => {
    const tree = findSubDirs(id, {})
    console.log('Tree', id, tree)
  })

  // console.log(nodes);
}

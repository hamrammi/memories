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
          const tree = makeTree(data.nodes)
          return (
            <div>
              {Object.keys(tree)
                .map(nodeId => <Directory key={nodeId} directory={tree[nodeId]} />)}
            </div>
          )
        }}
      </Query>
      <button className="mt-2 btn btn-light"><i className="mr-2 text-info fas fa-plus"/>Add new</button>
    </>
  )
}

export default DirectoryTree

function makeTree (nodes) {
  const findNodesByParentNodeId = parentNodeId =>
    nodes.filter(node => node.parentId === parentNodeId)//.map(x => x.id)

  function addSubNodes (parentNode, tree) {
    let nodes = findNodesByParentNodeId(parentNode.id)
    tree[parentNode.id] = Object.assign({}, parentNode, {
      __subNodes: {}
    })
    nodes.forEach(node => {
      addSubNodes(node, tree[parentNode.id]['__subNodes'])
    })
    return tree
  }

  let tree = {}

  findNodesByParentNodeId(null).forEach(node => {
    tree = Object.assign({}, tree, addSubNodes(node, {}))
  })

  return tree
}

import React from 'react'
import Directory from "../Directory/Directory"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

const GQL_directories = gql`
  query {
    directories {
      id
      name
      parentId
    }
  }
`

function DirectoryTree () {
  return (
    <div className="mb-4 ">
      <div className="">
        <h5 className="card-title text-center"><strong>Choose a folder</strong></h5>
        <Query query={GQL_directories}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            const tree = makeTree(data.directories)
            return (
              <div>
                {Object.keys(tree)
                  .map(nodeId => <Directory key={nodeId} directory={tree[nodeId]} />)}
              </div>
            )
          }}
        </Query>
      </div>
      <div className="card-footer text-center">
        <Link to={'add-directory'} className="text-main">New directory</Link>
      </div>
    </div>
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

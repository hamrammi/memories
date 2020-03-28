import React, {useContext} from 'react'
import Directory from "../Directory/Directory"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import ErrorAlert from '../shared/ErrorAlert'
import Fetching from '../shared/Fetching'
import DirectoryContext from "../../contexts/DirectoryContext";

export const GQL_directories = gql`
  query {
    directories {
      id
      name
      parentId
    }
  }
`

function DirectoryTree () {
  const context = useContext(DirectoryContext)
  console.log(context);

  return (
    <div className="mb-4">
      <div className="mb-3">
        <h5 className="card-title mb-4">
          <strong>{context === 'SearchMemories'
            ? null
            : <span className="text-black-50 mr-2">Step 1:</span>
          }Choose a folder</strong>
        </h5>
        <Query query={GQL_directories}>
          {({ loading, error, data }) => {
            if (loading) return <Fetching/>
            if (error) return <ErrorAlert message={error.message}/>
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
      <div className="text-center">
        <Link to={'add-directory'} className="text-main">New directory</Link>
      </div>
    </div>
  )
}

export default DirectoryTree

function makeTree (nodes) {
  const findNodesByParentNodeId = parentNodeId =>
    nodes.filter(node => node.parentId === parentNodeId)

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

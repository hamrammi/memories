import React, { useContext } from 'react'
import Folder from "./Folder"
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import ErrorAlert from '../shared/ErrorAlert'
import Fetching from '../shared/Fetching'
import DirectoryContext from "../../contexts/DirectoryContext";
import { useQuery } from "@apollo/client"
import './FolderTree.sass'

export const GQL_directories = gql`
  query {
    directories {
      id
      name
      parent_id
    }
  }
`

function FolderTree () {
  const context = useContext(DirectoryContext)
  const { loading, error, data } = useQuery(GQL_directories)
  if (loading) return (
    <div className="col-12 col-xl-3 FolderTree py-4">
      <Fetching/>
    </div>
  )
  if (error) return (
    <div className="col-12 col-xl-3 FolderTree py-4">
      <ErrorAlert message={error.message}/>
    </div>
  )
  const tree = makeTree(data.directories)

  return (
    <div className="col-12 col-xl-3 FolderTree">
      <div className="my-4">
        <h5 className="mb-4 text-center text-white-50">
          <strong>{context === 'SearchMemories'
            ? null
            : <span className="mr-2">Step 1:</span>
          }Folders</strong>
        </h5>
        <div>
          {Object.keys(tree)
              .map(nodeId => <Folder key={nodeId} directory={tree[nodeId]} />)}
        </div>
      </div>
      <div className="text-center">
        <Link to={'add-folder'} className="btn btn-secondary">New Folder</Link>
      </div>
    </div>
  )
}

export default FolderTree

function makeTree (nodes) {
  const findNodesByParentNodeId = parentNodeId =>
    nodes.filter(node => node.parent_id === parentNodeId)

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

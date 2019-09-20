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

function makeTree (nodes) {
  const findByParentId = id => nodes.filter(x => x.parentId === id).map(x => x.id)

  const preTree = nodes.reduce((xs, x) => {
    if (x.parentId !== null) {
      xs['leafs'][x.parentId] = findByParentId(x.parentId)
    } else {
      xs['trunk'] = xs['trunk'].concat(x.id)
    }
    return xs
  }, { 'trunk': [], 'leafs': {} })

  function findSubDirs (dirId, tree) {
    if (dirId in preTree['leafs']) {
      tree[dirId] = {}
      preTree['leafs'][dirId].forEach(subDirId => {
        tree[dirId][subDirId] = {}
        findSubDirs(subDirId, tree[dirId])
      })
    }
    return tree
  }

  preTree['trunk'].forEach(id => {
    const tree = findSubDirs(id, {})
    console.log('Tree', id, tree)
  })

  // console.log(nodes);
  // console.log(preTree)
}

function DirectoryTree () {
  return (
    <>
      <Query query={GQL_nodes}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          return (
            <div>
              {makeTree(data.nodes).map(x => <Directory key={x.id} directory={x} />)}
            </div>
          )
        }}
      </Query>
      <button className="mt-2 btn btn-light"><i className="mr-2 text-info fas fa-plus"></i>Add new</button>
    </>
  )
}

export default DirectoryTree

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

  const pathsById = nodes.reduce((xs, x) => {
    if (x.parentId !== null) {
      xs['leafs'][x.parentId] = findByParentId(x.parentId)
    } else {
      xs['trunk'] = xs['trunk'].concat(x.id)
    }
    return xs
  }, { trunk: [], leafs: [] })



  console.log(nodes);
  console.log(pathsById)
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

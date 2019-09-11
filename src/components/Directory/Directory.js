import React from 'react'
import { connect } from 'react-redux'
import { toggleSubdirs } from "../../store/actions";

function Directory ({ directory: { id, name, subDirectories }, expandedDirectories, toggleSubdirs }) {
  return (
    <>
      <div onClick={() => toggleSubdirs(id)} className="my-1 py-2 px-4 border bg-light">{ name }</div>
      <div className="ml-4">
        {expandedDirectories.indexOf(id) !== -1 && subDirectories.map((x) => {
          return <ConnectedDirectory key={x.id} directory={x}/>
        })}
      </div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    expandedDirectories: state.expandedDirectories
  }
}

const mapDispatchToProps = {
  toggleSubdirs
}

const ConnectedDirectory = connect(mapStateToProps, mapDispatchToProps)(Directory)
export default ConnectedDirectory

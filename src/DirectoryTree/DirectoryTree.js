import React from 'react'
import Directory from "../Directory/Directory";
import TODO_store from "../store";

export default function DirectoryTree () {

  return (
    <>
      {TODO_store.map(x => <Directory key={x.id} directory={x} />)}
      <button>Add new +</button>
    </>
  )
}

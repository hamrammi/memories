import React from 'react'
import Directory from "../Directory/Directory";

export default function DirectoryTree () {

  const TODO_list = [{ id: 1, name: 'React' }, { 'id': 2, name: 'Angular' }, { id: 3, name: 'Vue' }]

  return (
    <>
      {TODO_list.map(x => <Directory key={x.id} name={x.name}/>)}
      <button>Add new +</button>
    </>
  )
}

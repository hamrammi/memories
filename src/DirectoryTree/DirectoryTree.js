import React from 'react'
import Directory from "../Directory/Directory";

export default function DirectoryTree () {

  const list = ['React', 'Angular', 'Vue']

  return (
    <>
      {list.map(x => <Directory name={x}/>)}
      <button>Add new +</button>
    </>
  )
}

import React, { useState } from 'react'

function TODO_getFromStore () {
  return [
    { id: 1, name: 'Getting Started' },
    { id: 2, name: 'Router' },
    { id: 3, name: 'Redux' },
  ]
}

export default function Directory ({ name }) {
  let [subDirectories, setSubDirectories] = useState([])

  function onClick () {
    setSubDirectories(TODO_getFromStore())
  }

  return (
    <>
      <div onClick={onClick} className="my-1 py-2 px-4 border bg-light">{ name }</div>
      <div className="ml-4">
        {subDirectories.map((x) => {
          return <Directory key={x.id} name={x.name}/>
        })}
      </div>
    </>
  )
}

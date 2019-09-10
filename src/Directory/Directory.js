import React, { useState } from 'react'

export default function Directory ({ directory: { id, name, subDirectories } }) {
  console.log(id, name, subDirectories);
  let [subDirs, setSubDirs] = useState(subDirectories)

  function onClick () {
    setSubDirs({})
  }

  return (
    <>
      <div onClick={onClick} className="my-1 py-2 px-4 border bg-light">{ name }</div>
      <div className="ml-4">
        {subDirs.map((x) => {
          return <Directory key={x.id} directory={x}/>
        })}
      </div>
    </>
  )
}

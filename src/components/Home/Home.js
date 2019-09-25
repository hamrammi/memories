import React from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContent from "../DirectoryContent/DirectoryContent";

function Home () {
  return (
    <div className={'row'}>
      <div className="col-4">
        <DirectoryTree/>
      </div>
      <div className="col-8">
        <DirectoryContent/>
      </div>
    </div>
  )
}

export default Home

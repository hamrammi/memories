import React from 'react'
import DirectoryTree from "../DirectoryTree/DirectoryTree";
import DirectoryContent from "../DirectoryContent/DirectoryContent";

function SearchMemories () {
  return (
    <div className="row mt-4">
      <div className="col-12 col-lg-4">
        <DirectoryTree/>
      </div>
      <div className="col-12 col-lg-8">
        <h5 className="card-title mb-4"><strong>Directory content</strong></h5>
        <DirectoryContent/>
      </div>
    </div>
  )
}

export default SearchMemories

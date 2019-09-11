import React from 'react'
import DirectoryTree from "./DirectoryTree/DirectoryTree";
import DirectoryContent from "./DirectoryContent/DirectoryContent";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="my-4">
              <input className="form-control form-control-lg"
                     autoComplete="off"
                     type="text" name="search" id="search" placeholder="Search "/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <DirectoryTree/>
          </div>
          <div className="col-8">
            <DirectoryContent/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

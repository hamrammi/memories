import React from 'react'
import { Switch, Route } from "react-router-dom";
import SearchMemories from "./SearchMemories/SearchMemories";
import AddMemory from "./AddMemory/AddMemory";
import SearchBox from "./SearchBox/SearchBox";
import AddDirectory from './AddDirectory/AddDirectory'

function App () {
  return (
    <div>
      <SearchBox/>
      <div className="container">
        <div className={'row'} style={{ marginTop: '80px' }}>
          <div className="col-12">
            <Switch>
              <Route exact path={'/'} component={SearchMemories} />
              <Route exact path={'/add'} component={AddMemory} />
              <Route exact path={'/add-directory'} component={AddDirectory} />>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

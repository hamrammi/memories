import React from 'react'
import { Switch, Route } from "react-router-dom";
import SearchMemories from "./SearchMemories/SearchMemories";
import AddMemory from "./AddMemory/AddMemory";
import AddDirectory from './AddDirectory/AddDirectory'
import MemoryView from "./MemoryView/MemoryView";
import NavBar from "./NavBar/NavBar";

function App () {
  return (
    <div>
      <NavBar/>
      <div className="container">
        <div className="row" style={{ marginTop: '68px' }}>
          <div className="col-12">
            <Switch>
              <Route exact path={'/'} component={SearchMemories} />
              <Route exact path={'/add'} component={AddMemory} />
              <Route exact path={'/add-directory'} component={AddDirectory} />
              <Route path={'/m/:id'} component={MemoryView} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

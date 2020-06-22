import React from 'react'
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AddMemory from "./AddMemory/AddMemory";
import AddFolder from './AddFolder/AddFolder'
import NavBar from "./NavBar/NavBar";

function App () {
  return (
    <div>
      <NavBar/>
      <div className="container-fluid">
        <div className="row" style={{ marginTop: '62px' }}>
          <div className="col-12">
            <Switch>
              <Route exact path={'/'} component={Dashboard} />
              <Route exact path={'/add'} component={AddMemory} />
              <Route exact path={'/add-folder'} component={AddFolder} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

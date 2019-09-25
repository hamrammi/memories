import React from 'react'
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import AddMemory from "./AddMemory/AddMemory";
import SearchBox from "./SearchBox/SearchBox";

function App () {
  return (
    <div className={'container'}>
      <div className="row">
        <div className="col-12 text-center">
          <SearchBox/>
        </div>
      </div>
      <div className={'row'}>
        <div className="col-12">
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/add'} component={AddMemory} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

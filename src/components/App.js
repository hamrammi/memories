import React from 'react'
import { Switch, Route } from "react-router-dom";
import SearchMemories from "./SearchMemories/SearchMemories";
import AddMemory from "./AddMemory/AddMemory";
import SearchBox from "./SearchBox/SearchBox";

function App () {
  return (
    <div className={'container'}>
      <SearchBox/>
      <div className={'row'} style={{ marginTop: '70px' }}>
        <div className="col-12">
          <Switch>
            <Route exact path={'/'} component={SearchMemories} />
            <Route exact path={'/add'} component={AddMemory} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

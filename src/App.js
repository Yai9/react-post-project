import React, { Fragment } from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from "./UI/Header.js";
import Posts from "./components/Posts/Posts.js";

function App() {
  return (

   <BrowserRouter>
	  
      <Header />
	  <Switch>
      
	  <Route path="/" component={Posts}/>
	  </Switch>
    </BrowserRouter>
  );
}

export default App;

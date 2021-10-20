import React, { Fragment } from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from "./UI/Header.js";
import Posts from "./components/Posts/Posts.js";
import PostDetail from './components/PostDetail/PostDetail.js'

function App() {
  return (

   <BrowserRouter>
	  
      <Header />
	  <Switch>
      
	  <Route path="/:id" component={PostDetail}/>
	  <Route exact path="/" component={Posts}/>
	  </Switch>
    </BrowserRouter>
  );
}

export default App;

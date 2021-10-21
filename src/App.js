import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./UI/Header.js";
import Posts from "./components/Posts/Posts.js";
import PostDetail from "./components/PostDetail/PostDetail.js";
import PostEdit from "./components/PostEdit/PostEdit.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/edit/:id" component={PostEdit} />
        <Route path="/:id" component={PostDetail} />
        <Route exact path="/" component={Posts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

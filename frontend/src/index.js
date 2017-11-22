import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Route } from "react-router";
import { loadCategories } from "./actions/categoriesActions";
import { loadPosts } from "./actions/postActions";
import App from "./components/App";

const store = configureStore();
store.dispatch(loadCategories());
store.dispatch(loadPosts());


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App}>
        {" "}
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

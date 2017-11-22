import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import Post from "./Post";
import EditPost from "./EditPost";
import EditComment from "./EditComment";
import Comment from "./Comment";
import ListCategories from "./ListCategories";
import ListPosts from "./ListPosts";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <ListCategories />} />
          <Route
            path="/add"
            render={({ history }) => (
              <Post
                {...this.props}
                onCreatePost={post => {
                  history.push("/");
                }}
              />
            )}
          />
          <Route
            exact
            path="/:category/:parentId/addComment"
            render={({ history }) => (
              <Comment
                {...this.props}
                onCreateComment={comment => {
                  history.push("/");
                }}
              />
            )}
          />
          <Route
            exact
            path="/:category/:postId"
            render={({ history }) => <EditPost />}
          />
          <Route
            exact
            path="/:category/:parentId/comments/:commentId"
            render={({ history }) => <EditComment {...this.props} />}
          />
          <Route
            exact
            path="/react"
            render={({ history }) => <ListPosts {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;

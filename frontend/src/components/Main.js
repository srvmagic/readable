import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Post from "./Post";
import EditPost from "./EditPost";
import PostDetail from "./PostDetail";
import EditComment from "./EditComment";
import Comment from "./Comment";
import ListPosts from "./ListPosts";
import NotFoundPage from "./NotFoundPage";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <ListPosts />} />

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
            path="/:category/:postId/edit"
            render={({ history }) => <EditPost />}
          />
          <Route
            
            path="/:category/:postId"
            render={({ history }) => (
              <PostDetail
                onDeletePost={post => {
                  history.replace("/");
                }}
              />
            )}
          />
          <Route
            exact
            path="/:category/:parentId/comments/:commentId"
            render={({ history }) => <EditComment {...this.props} />}
          />
          <Route
            exact
            path="/:category"
            render={({ history }) => <ListPosts {...this.props} cats=''/>}
          />
          <Route path="*" render={({ history }) => <NotFoundPage />} />
        </Switch>
      </div>
    );
  }
}

export default Main;

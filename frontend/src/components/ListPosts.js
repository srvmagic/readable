import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import * as postActions from "../actions/postActions";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";


class ListPosts extends Component {
  delete = (event, post) => {
    event.preventDefault();
    this.props.actions.deletePost(post.id);
  };
  upvote = (event, post) => {
    event.preventDefault();
    this.props.actions.upvotePost(post.id);
  };
  downvote = (event, post) => {
    event.preventDefault();
    this.props.actions.downvotePost(post.id);
  };

  render() {

    let posts = this.props.posts;
    var dataArray = [];
    for (var key in posts) {
      if (!posts[key].deleted) {
        dataArray.push(posts[key]);
      }
    }
    return (
      <div>
        <Table celled sortable>
          <Table.Header color="green">
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>No. of comments</Table.HeaderCell>
              <Table.HeaderCell>Current Score</Table.HeaderCell>
              <Table.HeaderCell>Vote on post</Table.HeaderCell>
              <Table.HeaderCell>Edit Post</Table.HeaderCell>
              <Table.HeaderCell>Delete Post</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {dataArray.map(post => (
              <Table.Row>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.author}</Table.Cell>
                <Table.Cell>{post.commentCount}</Table.Cell>
                <Table.Cell>{post.voteScore}</Table.Cell>
                <Table.Cell>
                  <i
                    class="green angle up icon"
                    onClick={e => this.upvote(e, post)}
                  />
                  <i
                    class="green angle down icon"
                    onClick={e => this.downvote(e, post)}
                  />
                </Table.Cell>
                <Table.HeaderCell>
                  <Link to={`/${post.category}/${post.id}`}>
                    <i class="green edit icon" />
                  </Link>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <i
                    class="green delete icon"
                    onClick={e => this.delete(e, post)}
                  />
                </Table.HeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListPosts)
);

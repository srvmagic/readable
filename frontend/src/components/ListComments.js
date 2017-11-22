import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";

class ListComments extends Component {
  static propTypes = {
    postId: PropTypes.object.isRequired,
  };  
  delete = (event, comment) => {
    event.preventDefault();
    this.props.actions.deleteComment(comment.id);
  };
  upvote = (event, comment) => {
    event.preventDefault();
    this.props.actions.upvoteComment(comment.id);
  };
  downvote = (event, comment) => {
    event.preventDefault();
    this.props.actions.downvoteComment(comment.id);
  };
  render() {
    let comments = this.props.comments;
    var dataArray = [];
    for (var key in comments) {
      if (!comments[key].deleted) {
        dataArray.push(comments[key]);
      }
    }
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Body</Table.HeaderCell>
              <Table.HeaderCell>Current Score</Table.HeaderCell>
              <Table.HeaderCell>Vote on post</Table.HeaderCell>
              <Table.HeaderCell>Edit Comment</Table.HeaderCell>
              <Table.HeaderCell>Delete Comment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {dataArray.map(comment => (
              <Table.Row>
                <Table.Cell>
                  <Moment format="MM/DD/YYYY HH:MM:SS">{comment.timestamp}</Moment>
                </Table.Cell>
                <Table.Cell>{comment.author}</Table.Cell>
                <Table.Cell>{comment.body}</Table.Cell>
                <Table.Cell>{comment.voteScore}</Table.Cell>
                <Table.Cell>
                  <i
                    class="blue angle up icon"
                    onClick={e => this.upvote(e, comment)}
                  />
                  <i
                    class="blue angle down icon"
                    onClick={e => this.downvote(e, comment)}
                  />
                </Table.Cell>
                <Table.HeaderCell>
                  <Link to={`/${this.props.match.params.category}/${comment.parentId}/comments/${comment.id}`}>
                    <i class="blue edit icon" />
                  </Link>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <i
                    class="blue delete icon"
                    onClick={e => this.delete(e, comment)}
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
 
  return { comments: state.comments, posts: state.posts  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListComments)
);

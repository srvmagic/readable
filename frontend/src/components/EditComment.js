import React, { Component } from "react";
import Moment from "react-moment";
import { Button, Form, Header,Container } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import NotFoundPage from "./NotFoundPage";
class EditComment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
  };
  static contextTypes = {
    router: () => true
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      parentId: props.match.params.parentId,
      id: props.match.params.commentId,
      author: this.props.comment.author,
      body: this.props.comment.body,
      time: this.props.comment.time
    };
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log(this.props.id)
    this.props.actions.editComment(this.props.match.params.commentId, {
      timestamp: Date.now(),
      id: this.props.match.params.commentId,
      parentId: this.props.match.params.parentId,
      body: this.refs.body.value,
      author: this.refs.author.value
    });
    this.setState({
      timestamp: Date.now(),
      body: this.refs.body.value,
      author: this.refs.author.value
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.comment.id !== nextProps.comment.id) {
      this.setState({
        author: nextProps.comment.author,
        body: nextProps.comment.body,
        deleted: nextProps.comment.deleted,
        voteScore: nextProps.comment.voteScore,
        timestamp: nextProps.comment.timestamp
      });
    }
  }
  render() {
    return (
      <Container textAlign="center">
      <div className="w3-card-4">
        <Header as="h3" dividing color="blue">
          Edit Comment
        </Header>
        <Form ref="commentForm" onSubmit={this.handleSubmit}>
          Author:<input
            ref="author"
            name="author"
            onChange={e => this.handleChange(e)}
            placeholder="Author"
            value={this.state.author}
          />
          Body:<textarea
            ref="body"
            name="body"
            onChange={e => this.handleChange(e)}
            placeholder="Body"
            value={this.state.body}
          />
          Time of Comment:
          <Moment format="MM/DD/YYYY HH:MM:SS">{this.props.time}</Moment>
          <Button onClick={this.context.router.history.goBack}>Go Back</Button>
          <Button type="submit">Save this Comment</Button>
        </Form>
      </div>
      </Container>
    );
  }
}

function getCommentById(comments, id) {
  let comment = comments.find(comment => comment.id == id);
  return Object.assign({}, comment);
}
function mapStateToProps(state, ownProps) {
  const stateComments = Object.assign([], state.comments);
  let comment = {};
  const commentId = ownProps.match.params.commentId;
  if (commentId && state.comments.length > 0) {
    comment = getCommentById(state.comments, commentId);
  }
  console.log(comment)
  return {
    comment: comment,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditComment)
);

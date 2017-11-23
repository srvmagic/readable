import React, { Component } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { Container } from "semantic-ui-react";

class Comment extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const uuidv4 = require("uuid/v4");
    event.preventDefault();
    this.props.actions.addComment({
      id: uuidv4(),
      parentId: this.props.match.params.parentId,
      timestamp: Date.now(),
      body: this.refs.body.value,
      author: this.refs.author.value,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    });
  }

  render() {

    return (
      <Container textAlign="center">
        <div className="w3-card-4">
          <Header as="h3" dividing color="green">
            Add a Comment
          </Header>
          <Form ref="commentForm" onSubmit={this.handleSubmit}>
            Author:<input ref="author" placeholder="Author" />
            Body:<textarea ref="body" placeholder="Body" />
            <Link
              to={`/${this.props.match.params.category}/${this.props.match
                .params.parentId}`}
            >
              <Button>Go Back</Button>
            </Link>
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);

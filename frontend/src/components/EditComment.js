import React, { Component } from "react";
import Moment from "react-moment";
import { Button, Form, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";

class EditComment extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    id: PropTypes.object.isRequired,
    parentId: PropTypes.object.isRequired,    
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired    
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      parentId: props.parentId,
      id: props.id,
      author: props.author,
      body: props.body,
      time: props.time,
    };    
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
    localStorage.setItem(name, event.target.value);

    
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.editComment(this.props.id, {
      timestamp: Date.now(),
      parentId: this.props.parentId,
      body: this.refs.body.value,
      author: this.refs.author.value,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    });
  }

  render() {
    return (
      <div className="w3-card-4">
        <Header as="h3" dividing color="blue">
          Edit Comment
        </Header>
        <Form ref="commentForm" onSubmit={this.handleSubmit}>
          Author:<input ref="author" name ="author" onChange={e => this.handleChange(e)} placeholder="Author" value={localStorage.getItem("author")}/>
          Body:<textarea ref="body" name ="body" onChange={e => this.handleChange(e)} placeholder="Body" value={localStorage.getItem("body")}/>
          Time of Comment:
          <Moment format="MM/DD/YYYY HH:MM:SS">{this.props.time}</Moment>          
          <Link
            to={`/${this.props.match.params.category}/${this.props.match.params
              .parentId}`}
          >
            <Button>Go Back</Button>
          </Link>
          <Button type="submit">Save this Comment</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const commentId = ownProps.match.params.commentId;
  const parentId = ownProps.match.params.parentId;
  let k = Object.assign({}, state.comments);
  let author,body,time = {};
  for (var o in state.comments) {
    if (k[o].id === commentId) {
      author = k[o].author;
      body = k[o].body;
      time = k[o].timestamp;
    }
  }
  localStorage.setItem("author", author);
  localStorage.setItem("body", body);
  localStorage.setItem("time", time);

  return {
    id: commentId,
    parentId: parentId,
    comments: state.comments,
    author: author,
    body: body,
    time: time,
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

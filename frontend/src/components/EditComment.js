import React, { Component } from "react";
import Moment from "react-moment";
import { Button, Form, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import NotFoundPage from "./NotFoundPage";
class EditComment extends Component {
  static propTypes = {
    id: PropTypes.object.isRequired,
    parentId: PropTypes.object.isRequired,    
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired    
  };
  static contextTypes = {
    router: () => true, 
  }  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.state = {
      parentId: props.parentId,
      id: props.id,
      author: localStorage.getItem("author"),
      body:  localStorage.getItem("body"),
      time:  localStorage.getItem("time"),
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
    this.props.actions.editComment(this.props.id, {
      timestamp: Date.now(),
      parentId: this.props.parentId,
      body: this.refs.body.value,
      author: this.refs.author.value,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    });
    localStorage.setItem("author", this.refs.author.value);
    localStorage.setItem("body",this.refs.body.value);
    localStorage.setItem("time", Date.now());      
  }

  render() {
    if (localStorage.getItem("deleted") === null) {
      return <NotFoundPage />;
    }
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

        
            <Button onClick={this.context.router.history.goBack}>Go Back</Button>
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
  let author,body,time,voteScore = {};
  for (var o in state.comments) {
    if (k[o].id === commentId) {
      author = k[o].author;
      body = k[o].body;
      time = k[o].timestamp;
      voteScore= k[o].voteScore;
      localStorage.setItem("author", author);
      localStorage.setItem("body", body);
      localStorage.setItem("time", time);      
      localStorage.setItem("voteScore", voteScore);      
    }
  }

  return {
    id: commentId,
    parentId: parentId,
    author: author,
    body: body,
    time: time,
    voteScore:voteScore
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

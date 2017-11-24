import React, { Component } from "react";
import Moment from "react-moment";
import {
  Button,
  Form,
  Header,
  Input,
  Segment,
  Accordion,
  Icon
} from "semantic-ui-react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as postActions from "../actions/postActions";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { Container } from "semantic-ui-react";
import ListComments from "./ListComments";
import NotFoundPage from "./NotFoundPage";

class PostDetail extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.saves = this.saves.bind(this);
    this.delete = this.delete.bind(this);
    this.edits = this.edits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findAllComments = this.findAllComments.bind(this);
    this.state = {
      isEditing: false,
      activeIndex: -1,
      title: this.props.post.title,
      author: this.props.post.author,
      body: this.props.post.body,
      category: this.props.post.category,
      voteScore: this.props.post.voteScore,
      deleted: this.props.post.deleted,
      timestamp: this.props.post.timestamp,
      commentCount: this.props.post.commentCount
    };
  }

  handleClick = (e, titleProps, id) => {
    const commentList = this.props.commentActions.loadSpecificComments(
      this.props.match.params.postId
    );
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    this.setState({ comments: commentList });
    this.setState({ commentCount: commentList.length });
  };
  findAllComments(id) {
    return this.props.commentActions.loadSpecificComments(
      this.props.match.params.postId
    );
  }
  edits = event => {
    this.setState({
      isEditing: true
    });
  };
  preview = event => {
    this.setState({
      isEditing: false
    });
  };
  saves(event) {
    //event.preventDefault();
    this.props.postActions.editPost(this.props.match.params.postId, {
      id: this.props.match.params.postId,
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
      commentCount: this.findAllComments(this.props.match.params.postId).length
    });
    this.setState({
      isEditing: true,
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
      voteScore: this.state.voteScore,
      commentCount: this.props.post.commentCount
    });
    console.log(this.state.voteScore)
  }
  delete = (event, id) => {
    var idx = this.props.posts
      .map(function(x) {
        return x.id;
      })
      .indexOf(id);
    event.preventDefault();
    this.props.postActions.deletePost(id, idx);
  };
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  edits(event) {
    event.preventDefault();
  }
  upvote = (event, id) => {
    this.props.postActions.upvotePost(id);
  };
  downvote = (event, id) => {
    event.preventDefault();
    this.props.postActions.downvotePost(id);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.post.id !== undefined && this.props.post.id !== nextProps.post.id) {
      this.setState({
        title: nextProps.post.title,
        author: nextProps.post.author,
        body: nextProps.post.body,
        category: nextProps.post.category,
        deleted: nextProps.post.deleted,
        voteScore: nextProps.post.voteScore,
        timestamp: nextProps.post.timestamp,
        commentCount: nextProps.post.commentCount
      });
    }
  }

  render() {
    if(this.state.title === undefined){
      return (<NotFoundPage />)
    }
    const activeIndex = this.state.activeIndex;
    console.log(this.state.isEditing);
    if (!this.state.isEditing) {
      return (
        <div>
          <Container textAlign="left">
            <div className="w3-card-4">
              <Header as="h3" dividing color="green" textAlign="center">
                Post Detail
              </Header>
              <Segment.Group>
                <Segment>
                  Title:{" "}
                  <Input transparent value={this.state.title} size="25" />
                </Segment>
                <Segment>
                  Author:<Input transparent value={this.state.author} />
                </Segment>
                <Segment>
                  Category:<Input transparent value={this.state.category} />
                </Segment>
                <Segment>
                  Time of Post:{" "}
                  <Moment format="MM/DD/YYYY HH:MM:SS">
                    {this.state.timestamp}
                  </Moment>
                </Segment>
                <Segment>
                  Body: <Input transparent value={this.state.body} />{" "}
                </Segment>
                <Segment>
                  VoteScore:{" "}
                  <Input transparent value={(this.props.post.voteScore || this.state.voteScore)} />
                  <i
                    class="green angle up icon"
                    onClick={e =>
                      this.upvote(e, this.props.match.params.postId)}
                  />
                  <i
                    class="green angle down icon"
                    onClick={e =>
                      this.downvote(e, this.props.match.params.postId)}
                  />
                </Segment>
              </Segment.Group>
              <Button>
                <Link to="/">Go Back</Link>
              </Button>
              <Button onClick={e => this.edits(e)}>Edit this Post</Button>
              <Button
                onClick={e => this.delete(e, this.props.match.params.postId)}
              >
                <Link to="/">Delete this Post</Link>
              </Button>
              <Container textAlign="left">
                <Accordion>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Comments
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <ListComments {...this.props} />
                  </Accordion.Content>
                </Accordion>
              </Container>
            </div>
          </Container>
          <Container textAlign="right">
            <Link
              to={`/${this.state.category}/${this.props.match.params
                .postId}/addComment`}
            >
              Add a comment <i class="green plus icon" />
            </Link>
          </Container>
        </div>
      );
    }
    let x = this.props.categories;
    const dataArray = [];
    for (var o in x.categories) {
      dataArray.push(x.categories[o]);
    }
    return (
      <Container textAlign="center">
        <div className="w3-card-4">
          <Header as="h3" dividing color="green">
            Post Detail
          </Header>
          <Form ref="postForm" onSubmit={this.saves}>
            Title:<input
              ref="title"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />
            Author:<input
              ref="author"
              name="author"
              placeholder="Author"
              value={this.state.author}
              onChange={e => this.handleChange(e)}
            />
            Category:<select
              ref="category"
              name="category"
              value={this.state.category}
              onChange={e => this.handleChange(e)}
            >
              {dataArray.map(function(first) {
                for (var key in first) {
                  return (
                    <option id={first[key]} value={first[key]}>
                      {first[key]}
                    </option>
                  );
                }
              })}
            </select>
            Body:<textarea
              ref="body"
              name="body"
              placeholder="Body"
              value={this.state.body}
              onChange={e => this.handleChange(e)}
            />
            Time of Post:
            <Moment format="MM/DD/YYYY HH:MM:SS">{this.state.timestamp}</Moment>
            <Container textAlign="left">
              VoteScore:
              <Input transparent value={(this.props.post.voteScore || this.state.voteScore)} />
              <i
                class="green angle up icon"
                onClick={e => this.upvote(e, this.props.match.params.postId)}
              />
              <i
                class="green angle down icon"
                onClick={e => this.downvote(e, this.props.match.params.postId)}
              />
            </Container>
            <Button>
              <Link to="/">Go Back</Link>
            </Button>
            <Button type="submit" onClick={e => this.saves(e)}>
              Save this Post
            </Button>
            <Button
              onClick={e => this.delete(e, this.props.match.params.postId)}
            >
              <Link to="/">Delete this Post</Link>
            </Button>
            <Button onClick={e => this.preview(e)}>Preview this Post</Button>
          </Form>
          <Container textAlign="left">
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Comments
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <ListComments {...this.props} />
              </Accordion.Content>
            </Accordion>
          </Container>
          <Container textAlign="right">
            <Link
              to={`/${this.state.category}/${this.props.match.params
                .postId}/addComment`}
            >
              Add a comment <i class="green plus icon" />
            </Link>
          </Container>

          <div />
        </div>
      </Container>
    );
  }
}
function getPostById(posts, id) {
  let post = posts.find(post => post.id == id);
  return Object.assign({}, post);
}
function mapStateToProps(state, ownProps) {
  const statePosts = Object.assign([], state.posts);
  let post = {};
  const postId = ownProps.match.params.postId;
  if (postId && state.posts.length > 0) {
    post = getPostById(state.posts, postId);
  }
  return {
    categories: state.categories,
    post: post,
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);

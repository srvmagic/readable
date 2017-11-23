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
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as postActions from "../actions/postActions";
import * as commentActions from "../actions/commentActions";
import { bindActionCreators } from "redux";
import { Container } from "semantic-ui-react";
import ListComments from "./ListComments";

class EditPost extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,
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
      activeIndex: -1,
      title: localStorage.getItem("title"),
      body: localStorage.getItem("body"),
      author: localStorage.getItem("author"),
      category: localStorage.getItem("category"),
      voteScore: localStorage.getItem("voteScore"),
      commentCount:localStorage.getItem("commentCount")
    };    
  }
  handleClick = (e, titleProps, id) => {
    const commentList = this.props.commentActions.loadSpecificComments(
      localStorage.getItem("id"))
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    this.setState({ comments: commentList });
    localStorage.setItem("comments", commentList);
    localStorage.setItem("commentCount", commentList.length);
    this.setState({ commentCount: commentList.length });
  };
  findAllComments(id){
    return this.props.commentActions.loadSpecificComments(
      localStorage.getItem("id")
    );
  }
  saves(event) {
    setLocal("title", this.refs.title.value);
    setLocal("author", this.refs.author.value);
    setLocal("body",this.refs.body.value);
    setLocal("category", this.refs.category.value);
    setLocal("voteScore", this.refs.voteScore.value);
    setLocal("time", Date.now());    
    this.props.postActions.editPost(this.props.match.params.postId, {
      id: this.props.match.params.postId,
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
      voteScore: this.state.voteScore,
      deleted: false,
      commentCount: this.findAllComments(this.props.match.params.postId).length
    });
    this.setState({      
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
      voteScore: this.state.voteScore,
      deleted: false,
      commentCount: this.findAllComments(this.props.match.params.postId)})
  
  }
  delete = (event, id) => {
    var idx = this.props.posts.map(function(x) {return x.id; }).indexOf(id);    
    event.preventDefault();
    this.props.postActions.deletePost(id,idx);
  };
  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
    localStorage.setItem(name, event.target.value);
    
  }
  componentWillMount() {
    this.setState({
      title: localStorage.getItem('title'),
      author: localStorage.getItem('author'),
      body: localStorage.getItem('body'),
      category: localStorage.getItem('category'),
      voteScore: localStorage.getItem('voteScore'),
      time: localStorage.getItem('time'),
    });
  }
  edits(event) {
    event.preventDefault();
  }
  upvote = (event, id) => {
    event.preventDefault();
    this.props.postActions.upvotePost(id);
  };
  downvote = (event, id) => {
    event.preventDefault();
    this.props.postActions.downvotePost(id);
  };

  render() {
    const activeIndex = this.state.activeIndex;
    let x = this.props.categories;
    const dataArray = [];
    for (var o in x.categories) {
      dataArray.push(x.categories[o]);
    }
    return (
      <Container textAlign="center">
        <div className="w3-card-4">
          <Header as="h3" dividing color="green">
            Edit Post
          </Header>
          <Form ref="postForm" onSubmit={this.saves}>
            Title:<input
              ref="title"
              name="title"
              placeholder="Title"
              value={localStorage.getItem("title")}
              onChange={e => this.handleChange(e)}
            />
            Author:<input
              ref="author"
              name="author"
              placeholder="Author"
              value={localStorage.getItem("author")}
              onChange={e => this.handleChange(e)}
            />
            Category:<select
              ref="category"
              name="category"
              value={localStorage.getItem("category")}
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
              value={localStorage.getItem("body")}
              onChange={e => this.handleChange(e)}
            />
            <Container textAlign="left">
              VoteScore:
              <Input transparent value={localStorage.getItem("voteScore")} />
              <i
                class="green angle up icon"
                onClick={e => this.upvote(e, localStorage.getItem("id"))}
              />
              <i
                class="green angle down icon"
                onClick={e => this.downvote(e, localStorage.getItem("id"))}
              />
              Time of Post:
              <Moment format="MM/DD/YYYY HH:MM:SS">{this.props.time}</Moment>
            </Container>
            <Button>
              <Link to="/">Go Back</Link>
            </Button>
            <Button type="submit" onClick={this.save}>
              Save this Post
            </Button>
            <Button onClick={e => this.delete(e, localStorage.getItem("id"))}>
              <Link to="/">Delete this Post</Link>
            </Button>
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
              to={`/${localStorage.getItem("category")}/${localStorage.getItem(
                "id"
              )}/addComment`}
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
function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps')
  const postId = ownProps.match.params.postId;
  let k = Object.assign({}, state.posts);
  for (var o in state.posts) {
    let l = Object.assign({}, k[o]);
    if (l.id === postId) {
      setLocal("id", postId);
      setLocal("title", l.title);
      setLocal("author", l.author);
      setLocal("body", l.body);
      setLocal("category", l.category);
      setLocal("voteScore", l.voteScore);
      setLocal("time", l.time);
      setLocal("comments", []);
      setLocal("commentCount", l.commentCount);
    }
  }
  return {
    categories: state.categories,
    posts: state.posts
  };
}

function setLocal(name,value){
  localStorage.setItem(name,value)
}

function mapDispatchToProps(dispatch) {  
  return {
    postActions: bindActionCreators(postActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPost)
);

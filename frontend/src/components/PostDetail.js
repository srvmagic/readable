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

class PostDetail extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.findAllComments = this.findAllComments.bind(this);
    this.state = {
      isEditing: true,
      activeIndex: -1,
      title: "",
      body: "",
      author: "",
      category: "",
      voteScore: "",
      commentCount: ""
    };
  }
  handleClick = (e, titleProps, id) => {
    const commentList = this.props.commentActions.loadSpecificComments(
      localStorage.getItem("id")
    );
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    this.setState({ comments: commentList });
    localStorage.setItem("comments", commentList);
    localStorage.setItem("commentCount", commentList.length);
    this.setState({ commentCount: commentList.length });
  };
  findAllComments(id) {
    return this.props.commentActions.loadSpecificComments(
      localStorage.getItem("id")
    );
  }
  componentDidMount(){
    console.log('IN HEREREEEEEEEEEE')
  }
  delete = (event, id,idx) => {
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
      title: localStorage.getItem("title"),
      author: localStorage.getItem("author"),
      body: localStorage.getItem("body"),
      category: localStorage.getItem("category"),
      voteScore: localStorage.getItem("voteScore"),
      time: localStorage.getItem("time")
    });
  }

  render() {
    const activeIndex = this.state.activeIndex;
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
                <Input transparent value={localStorage.getItem("title")} size="25"/>
              </Segment>
              <Segment>
                VoteScore:{" "}
                <Input transparent value={localStorage.getItem("voteScore")} />
              </Segment>
              <Segment>
                Author:<Input
                  transparent
                  value={localStorage.getItem("author")}
                />
              </Segment>
              <Segment>
                Category:<Input
                  transparent
                  value={localStorage.getItem("category")}
                />
              </Segment>
              <Segment>
                Time of Post:{" "}
                <Moment format="MM/DD/YYYY HH:MM:SS">{this.props.time}</Moment>
              </Segment>
              <Segment>
                Body: <Input transparent value={localStorage.getItem("body")} />{" "}
              </Segment>
              <Segment>
                VoteScore:{" "}
                <Input transparent value={localStorage.getItem("voteScore")} />
              </Segment>
            </Segment.Group>
            <Button>
              <Link to="/">Go Back</Link>
            </Button>
            <Button onClick={e => this.delete(e, localStorage.getItem("id"))}>
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
            to={`/${localStorage.getItem("category")}/${localStorage.getItem(
              "id"
            )}/addComment`}
          >
            Add a comment <i class="green plus icon" />
          </Link>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
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

function setLocal(name, value) {
  localStorage.setItem(name, value);
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    commentActions: bindActionCreators(commentActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);

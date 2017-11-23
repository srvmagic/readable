import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Menu, Container } from "semantic-ui-react";
import * as postActions from "../actions/postActions";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";

class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }
  sortScoreAsc = event => {
    event.preventDefault();
    this.props.actions.sortScoreAsc(this.props.posts);
  };
  sortScoreDesc = event => {
    event.preventDefault();
    this.props.actions.sortScoreDesc(this.props.posts);
  };
  sortTimeAsc = event => {
    event.preventDefault();
    this.props.actions.sortTimeAsc(this.props.posts);
  };
  sortTimeDesc = event => {
    event.preventDefault();
    this.props.actions.sortTimeDesc(this.props.posts);
  };  
  delete = (event, post, idx) => {
    event.preventDefault();
    this.props.actions.deletePost(post.id, idx);
  };
  upvote = (event, post) => {
    event.preventDefault();
    this.props.actions.upvotePost(post.id);
  };
  downvote = (event, post) => {
    event.preventDefault();
    this.props.actions.downvotePost(post.id);
  };
  handleClick = (event, data) => {
    if (event.target.text.toLowerCase() === "all posts") {
      this.props.actions.loadPosts();
    } else {
      this.props.actions.loadSpecificPosts(event.target.text.toLowerCase());
    }
    this.setState({ activeItem: event.target.text.toLowerCase() });
  };
  render() {
    const activeItem = this.state;
    const posts = this.props.posts;
    var dataArray = [];
    for (var key in posts) {
      if (!posts[key].deleted) {
        dataArray.push(posts[key]);
      }
    }
    const x = this.props.categories;
    var cats = [];
    for (var o in x.categories) {
      cats.push(x.categories[o].name);
    }
    return (
      <div>
        <Container textAlign="left">
          <Menu pointing inverted>
            <Link to="/">
              <Menu.Item
                name="All Posts"
                active={activeItem === "All Posts"}
                onClick={this.handleClick}
              />
            </Link>

            {cats.map(category => (
              <Link to={`/${category}`}>
                <Menu.Item
                  name={category}
                  link
                  active={activeItem === { category }}
                  onClick={this.handleClick}
                />
              </Link>
            ))}
          </Menu>
        </Container>
        <Container textAlign="left">
          <Table celled sortable>
            <Table.Header color="green">
              <Table.Row>
                <Table.HeaderCell>
                  Posted On
                  <i
                    onClick={e => this.sortTimeAsc(e)}
                    class="green caret up icon"
                  />
                  <i
                    onClick={e => this.sortTimeDesc(e)}
                    class="green caret down icon"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>No. of comments</Table.HeaderCell>
                <Table.HeaderCell>
                  Current Score{" "}
                  <i
                    onClick={e => this.sortScoreAsc(e)}
                    class="green caret up icon"
                  />
                  <i
                    onClick={e => this.sortScoreDesc(e)}
                    class="green caret down icon"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>Vote on post</Table.HeaderCell>
                <Table.HeaderCell>View post detail</Table.HeaderCell>
                <Table.HeaderCell>Edit Post</Table.HeaderCell>
                <Table.HeaderCell>Delete Post</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {dataArray.map((post, idx) => (
                <Table.Row>
                  <Table.Cell><Moment format="MM/DD/YYYY HH:MM:SS">{post.timestamp}</Moment></Table.Cell>
                  

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
                  <Table.Cell>
                    <Link to={`/${post.category}/${post.id}`}>
                      <i class="green content icon" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/${post.category}/${post.id}/edit`}>
                      <i class="green edit icon" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <i
                      class="green delete icon"
                      onClick={e => this.delete(e, post, idx)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Container textAlign="right">
            <Link to="/add">
              Add a post <i class="green plus icon" />
            </Link>
          </Container>
        </Container>
        <div />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: state.posts, categories: state.categories };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListPosts)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Menu, Container } from "semantic-ui-react";
import * as postActions from "../actions/postActions";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }
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
                color='red'
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
  connect(mapStateToProps, mapDispatchToProps)(HeaderBar)
);

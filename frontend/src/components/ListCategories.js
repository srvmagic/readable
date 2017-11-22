import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tab } from "semantic-ui-react";
import ListPosts from "./ListPosts";
import * as postActions from "../actions/postActions";
import { bindActionCreators } from "redux";
import { Container } from "semantic-ui-react";
import { Link,withRouter } from "react-router-dom";

class ListCategories extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
  };
  handleClick = (event, data) => {
    event.preventDefault();
    if (event.target.text.toLowerCase() === "all posts") {
      this.props.actions.loadPosts();
    } else {
      this.props.actions.loadSpecificPosts(event.target.text.toLowerCase());
    }
  };
  render() {
    const x = this.props.categories;
    var dataArray = [];
    dataArray.push({
      menuItem: "All Posts",
      render: () => (
        <Tab.Pane attached={false}>
          <Link to={"/"}>
            <ListPosts props={this.props.posts} />
          </Link>
        </Tab.Pane>
      )
    });
    for (var o in x.categories) {
      dataArray.push({
        menuItem: x.categories[o],
        render: () => (
          <Tab.Pane attached={false}>
            <Link to="{x.categories[o]}">
              <ListPosts props={this.props.posts} />
            </Link>
          </Tab.Pane>
        )
      });
    }
    return (
      <div>
        <Container textAlign="left">
          <Tab
            onTabChange={this.handleClick}
            menu={{
              color: "black",
              pointing: true,
              inverted: true,
              attached: false,
              tabular: false
            }}
            panes={dataArray}
          />
        </Container>

        <Container textAlign="right">
          <Link to="/add">
            Add a post <i class="green plus icon" />
          </Link>
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
connect(mapStateToProps, mapDispatchToProps)(ListCategories)
)
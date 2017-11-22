import React, { Component } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as postActions from  '../actions/postActions';
import { bindActionCreators } from 'redux';
import { Container } from "semantic-ui-react";

class Post extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const uuidv4 = require('uuid/v4');
    event.preventDefault();
    this.props.actions.addPost({
      id:uuidv4(),
      timestamp: Date.now(),
      title :this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
      "voteScore": 1,
      "deleted": false,
      "commentCount": 0      
    }
    )
  }

  render() {
    let x = this.props.categories;
    var dataArray = [];
    for (var o in x.categories) {
      dataArray.push(x.categories[o]);
    }
    return (
      <Container textAlign="center">
      <div className="w3-card-4">
        <Header as="h3" dividing color ="green">
          Add a Post
        </Header>
        <Form ref="postForm" onSubmit={this.handleSubmit}>
            Title:<input ref="title" placeholder="Title" />
            Author:<input ref="author" placeholder="Author"  />
            Category:<select ref="category" >
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
              placeholder="Body"
            />
          <Button> <Link to="/">Go Back</Link></Button>
          <Button type='submit'>Save</Button>
          </Form>
      </div>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) { 
  return {categories: state.categories, posts: state.posts};
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);

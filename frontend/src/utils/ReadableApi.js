
class ReadableApi {
  static fetchCategories() {
    return fetch(`http://localhost:3001/categories`, {
      method: "get",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    });
  }
  static fetchAllPosts() {
    return fetch(`http://localhost:3001/posts`, {
      method: "get",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    });
  }
  static fetchSpecificPosts(category) {
    return fetch(`http://localhost:3001/${category}/posts`, {
      method: "get",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    });
  }
  static fetchPost(id) {
    
    return fetch(`http://localhost:3001/posts/${id}`, {
      method: "get",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    })

  };
  static fetchSpecificComments(id) {
    
    return fetch(`http://localhost:3001/posts/${id}/comments`, {
      method: "get",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    })

  };
  static addPost(post) {
    return fetch(`http://localhost:3001/posts`, {
      method: "post",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(response => {
      return response.json();
    });
  }

  static addComment(comment) {
    return fetch(`http://localhost:3001/comments`, {
      method: "post",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(response => {
      return response.json();
    });
  }

  static editPost(id, post) {
   return fetch(`http://localhost:3001/posts/${id}`, {
        method: "put",
        headers: {
          Authorization: "whatever-you-want",
          "content-type": "application/json"
        },
        body: JSON.stringify(post)
      }).then(response => {
        return response.json();
      });
  }
  static editComment(id, comment) {
    return fetch(`http://localhost:3001/comments/${id}`, {
      method: "put",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(response => {
      return response.json();
    });
  }
  static deletePost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    });
  }
  static deleteComment(id) {
    return fetch(`http://localhost:3001/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "whatever-you-want"
      }
    }).then(response => {
      return response.json();
    });
  }
  static upvotePost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify({ option: "upVote" })
    }).then(response => {
      return response.json();
    });
  }
  static downvotePost(id) {
    return fetch(`http://localhost:3001/posts/${id}`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify({ option: "downVote" })
    }).then(response => {
      return response.json();
    });
  }

  static upvoteComment(id) {
    return fetch(`http://localhost:3001/comments/${id}`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify({ option: "upVote" })
    }).then(response => {
      return response.json();
    });
  }
  static downvoteComment(id) {
    return fetch(`http://localhost:3001/comments/${id}`, {
      method: "POST",
      headers: {
        Authorization: "whatever-you-want",
        "content-type": "application/json"
      },
      body: JSON.stringify({ option: "downVote" })
    }).then(response => {
      return response.json();
    });
  }
}

export default ReadableApi;

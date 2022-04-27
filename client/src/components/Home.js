import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // put all the posts from database into posts array variable and set the state
    };
  }

  componentDidMount() {
    // This will execute after all the components and sub components rendered
    this.retrievePost(); // Call the method
  }

  retrievePost() {
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts, // set the values to posts
        });
        console.log(this.state.posts);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/post/delete/${id}`).then((res) => {
      alert("Deleted successfully");
      this.retrievePost(); // After delete show existig posts
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.topic.toLowerCase().includes(searchKey) ||
        post.description.toLowerCase().includes(searchKey) ||
        post.postCategory.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result }); // posts are set to result variable
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("/posts").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Posts</h4>
          </div>
          <div className="col-lg-9 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(
              (
                posts,
                index // Use map function
              ) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/post/${posts._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {posts.topic}
                    </a>
                  </td>
                  <td>{posts.description}</td>
                  <td>{posts.postCategory}</td>
                  <td>
                    <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                      <i className="= fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(posts._id)}
                    >
                      <i className="= far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button className="btn btn-success">
          <a href="/add" style={{ textDecoration: "none", color: "white" }}>
            Create New Post
          </a>
        </button>
      </div>
    );
  }
}

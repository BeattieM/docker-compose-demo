import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchPosts, receivePost } from "../actions/post-actions";
import { signOut } from "../actions/auth-actions";
import { Link } from 'react-router';
import ActionCable from 'actioncable';
import { browserHistory } from 'react-router';
import PostCreateForm from '../components/post-create-form';
import Post from '../components/post';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.handleClick = this.handleClick.bind(this);
    cable.subscriptions.create('PostsChannel', { 
      props: this.props,
      received: function(data) {
        this.props.receivePost(data);
      }
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.signOut();
    browserHistory.push('/');
  }

  renderPost(postData) {
    return (
      <div className='post' id={postData.id} key={postData.id}>
        <Post post_id={postData.id} sprite={postData.attributes.sprite} comment={postData.attributes.comment} created_at={postData.attributes['created-at']}/>
      </div>
    );
  }

  render() {
    let button = <Link to="/sign_in" className = "btn btn-success log-button">Sign In</Link>;
    let createForm = null;
    let loggedIn = null;
    if(localStorage.getItem('access_token')){
      button = <Link to="/sign_out" className = "btn btn-success log-button" onClick={this.handleClick}>Sign Out</Link>;
      createForm = <PostCreateForm />
      loggedIn="logged-in";
    }

    return (
      <div>
        <div className="banner-spacer spacer-top">
          {button}
        </div>
        <div id="banner-wrapper">
          <img id="banner" src="/images/pokemon_banner.png" />
        </div>
        <div className="banner-spacer spacer-bottom"></div>
        <div id="content">
          <div id="content-header" className={loggedIn}>
            {createForm}
          </div>
          <span id="current_user" className="0"></span>
          <div id="posts">
             {this.props.posts.map(this.renderPost)}
          </div>
          <div id="content-footer"></div>
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  id: PropTypes.string,
  sprite: PropTypes.string,
  comment: PropTypes.string,
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, receivePost, signOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
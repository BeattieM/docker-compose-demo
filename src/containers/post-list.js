import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchPosts, receivePost } from "../actions/post-actions";
import { signOut } from "../actions/auth-actions";
import { Link } from 'react-router';
import ActionCable from 'actioncable';
import { browserHistory } from 'react-router';

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
    const id = postData.id;
    const sprite = postData.attributes.sprite;
    const comment = postData.attributes.comment;

    return (
      <div className='post' id={id} key={id}>
        <div className='post-pokemon'>
          <img src={sprite} />
        </div>
        <div className='post-content'>
          <p className='date'>Coming soon</p>
          <p id={`post_${id}_comment`}>{comment}</p>
        </div>
      </div>
    );
  }

  render() {
    let button = <Link to="/sign_in" className = "btn btn-success log-button">Sign In</Link>;
    if(localStorage.getItem('access_token')){
      button = <Link to="/sign_out" className = "btn btn-success log-button" onClick={this.handleClick}>Sign Out</Link>;
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
          <div id="content-header"></div>
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
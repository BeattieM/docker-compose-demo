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

  renderCreateForm() {
    return (
      <div>
        <div className='post-pokemon'>
          <img id="pokeball" src="/images/pokeball.png" />
        </div>
        <div className='post-content'>
          <form>
            <textarea placeholder="What's happening?" rows="1" maxLength="140" id="post_comment" style={{}}/>
            <input type="submit" id="submit-post" disabled="true" value="Sign post" className="btn btn-success" />
          </form>
        </div>
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
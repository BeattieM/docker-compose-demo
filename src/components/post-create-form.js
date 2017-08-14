import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { createPost } from "../actions/post-actions";
import { signOut } from "../actions/auth-actions";
import { Link } from 'react-router';
import ActionCable from 'actioncable';
import { browserHistory } from 'react-router';

class PostCreateForm extends Component {
  componentWillMount() {
    this.setState({
      term: '',
      displaySubmit: false
    });
  }
  componentDidMount() {
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.createPost({ "comment": this.state.term });
    this.setState({
      term: '',
      displaySubmit: false
    });
  }

  onFocus() {
    this.setState({
      displaySubmit: true
    });
  }

  onBlur() {
    if(!this.state.term){
      this.setState({
        displaySubmit: false
      });
    }
  }

  render() {
    return (
      <div>
        <div className='post-pokemon'>
          <img id="pokeball" src="/images/pokeball.png" />
        </div>
        <div className='post-content'>
          <form>
            <textarea placeholder="What's happening?" rows="1" maxLength="140" id="post_comment" className={this.state.term ? 'has-text' : null}style={{}} onFocus={this.onFocus} onBlur={this.onBlur} value={this.state.term} onChange={this.onInputChange}/>
            {this.state.displaySubmit ? <input type="submit" id="submit-post" disabled={this.state.term ? false : true} value="Submit Post" className="btn btn-success" onClick={this.handleClick} /> : null}
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateForm);

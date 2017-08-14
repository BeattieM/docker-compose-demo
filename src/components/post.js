import React, { Component } from "react";
import moment from 'moment';

export default class Post extends Component {
  render() {
    return (
      <div>
        <div className='post-pokemon'>
          <img src={this.props.sprite} />
        </div>
        <div className='post-content'>
          <p className='date'>{`${moment(this.props.created_at).format("D MMM YYYY")}`}</p>
          <p id={`post_${this.props.post_id}_comment`}>{this.props.comment}</p>
        </div>
      </div>
    );
  }
}

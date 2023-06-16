import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

// eslint-disable-next-line
const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    // eslint-disable-next-line no-shadow
    const initialContainerBackgroundClassNames = `initial-container ${
      // eslint-disable-next-line no-use-before-define
      initialContainerBackgroundClassNames[
        Math.ceil(
          // eslint-disable-next-line no-use-before-define
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-input-container">
            <form onSubmit={this.onAddComment} className="form-container">
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                value={nameInput}
                className="name-input"
                onChange={this.onChangeComment}
                placeholder="Your Name"
              />
              <textarea
                value={commentInput}
                className="comment-input"
                rows="8"
                cols="50"
                placeholder="Your Comment"
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
          </div>

          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="image"
            alt="comments"
          />

          <hr className="line" />
          <p className="comments-count">
            <span>{commentsList.length} </span>
            Comments
          </p>

          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments

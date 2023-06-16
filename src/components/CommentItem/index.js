// Write your code here
import {fromDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const postedTime = fromDistanceToNow(date)

  const onClickLiked = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-items">
      <div className="card3">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div>
            <p>{name}</p>
            <p>{postedTime} ago</p>
          </div>
          <p>{comment}</p>
        </div>
      </div>
      <div>
        <div>
          <img src={likeImgUrl} className="like-image" alt="like" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLiked}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem

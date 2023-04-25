import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {comments, bgColor, likeFunction, deleteFunction} = props
  const {name, comment, id, isLiked} = comments
  const initial = name.charAt(0).toUpperCase()
  const nameFormatted = initial + name.substring(1)

  const onCLickLike = () => {
    likeFunction(id)
  }

  const onDelete = () => {
    deleteFunction(id)
  }

  const likeColor = isLiked ? 'blue-txt' : ''

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li value={id} className="item-container">
      <div className="row-name-time">
        <p className={`name-icon ${bgColor}`}>{initial}</p>
        <h3 className="name-user">{nameFormatted}</h3>
        <p className="time-stamp">{formatDistanceToNow(new Date())}</p>
      </div>
      <p className="cmt">{comment}</p>
      <div className="row-like-delete">
        <div className="pic-like">
          <img className="logo" alt="like" src={likeUrl} />
          <button type="button" className="like-btn" onClick={onCLickLike}>
            <p className={`liked-text ${likeColor}`}>Like</p>
          </button>
        </div>
        <button
          type="button"
          data-testid="delete"
          className="like-btn"
          onClick={onDelete}
        >
          <img
            className="logo"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem

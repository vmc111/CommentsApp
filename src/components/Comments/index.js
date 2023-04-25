import {Component} from 'react'
import './index.css'
import {v4 as uuids} from 'uuid'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: ''}

  changeName = event => this.setState({name: event.target.value})

  changeComment = event => this.setState({comment: event.target.value})

  onClickLike = id =>
    this.setState(preState => ({
      commentsList: preState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))

  onClickDelete = id => {
    const {commentsList} = this.state

    const newCommentsList = commentsList.filter(eachItem => eachItem.id !== id)

    this.setState({commentsList: newCommentsList})
  }

  addNewComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const newComment = {
      id: uuids(),
      name,
      comment,
      isLiked: false,
      bgColor:
        initialContainerBackgroundClassNames[
          Math.ceil(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ],
    }
    this.setState(preState => ({
      commentsList: [...preState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    const noOfComments = commentsList.length

    return (
      <form className="main-bg">
        <h1 className="heading">Comments</h1>
        <div className="add-comment-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="img-comments"
          />
          <div className="add-comment">
            <p>Say something about 4.0 Technologies</p>
            <input
              onChange={this.changeName}
              type="text"
              className="input-ele"
              value={name}
              placeholder="Your Name"
            />
            <textarea
              onChange={this.changeComment}
              rows="5"
              type="text"
              className="input-ele"
              value={comment}
              placeholder="Your Comment"
            >
              {' '}
            </textarea>
            <button type="button" className="btn" onClick={this.addNewComment}>
              Add Comment
            </button>
          </div>
        </div>
        <div className="comments-container">
          <div className="comments-count">
            <p className="count">{noOfComments}</p>
            <p>Comments</p>
          </div>
          <ul className="items-container">
            {commentsList.map(commentItem => (
              <CommentItem
                comments={commentItem}
                key={commentItem.id}
                bgColor={commentItem.bgColor}
                likeFunction={this.onClickLike}
                deleteFunction={this.onClickDelete}
              />
            ))}
          </ul>
        </div>
      </form>
    )
  }
}

export default Comments

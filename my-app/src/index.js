import React, { Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/client';
import './index.css';

class Comment extends Component {
	static propTypes = {
		comment: PropTypes.object.isRequired
	}

	constructor() {
		super()
		this.state = {timeString: ""}
	}

	componentWillMount() {
		this._updateTimeString()
		this._timer = setInterval(
			this._updateTimeString.bind(this),
			5000
		)
	}

	_updateTimeString() {
		const comment = this.props.comment
		const duration = (+Date.now() - comment.createdTime) / 1000
		this.setState({
			timeString: duration > 60
			? `${Math.round(duration / 60)} minutes ago`
			: `${Math.round(Math.max(duration, 1))} seconds ago`
		})
	}

	render() {
		return (
			<div className='comment'>
				<div className='comment-user'>
					<span>{this.props.comment.username}</span> :
				</div>
					<p>{this.props.comment.content}</p>
					<span className='comment-createdtime'>
						{this.state.timeString}
					</span>
			</div>
		)
	}
}

class CommentInput extends Component{
	static propTypes = {
		onSubmit: PropTypes.func
	}

	constructor() {
		super()
		this.state = {
			username: "",
			content: "",
		}
	}

	componentWillMount() {
		this._loadUsername()
	}

	componentDidMount() {
		this.textarea.focus()
	}

	_loadUsername() {
		const username = localStorage.getItem('username')
		if (username) {
			this.setState({username})
		}
	}

	_saveUsername(username) {
		localStorage.setItem('username', username)
	}

	handleUsernameBlur(event) {
		this._saveUsername(event.target.value)
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		})
	}

	handleContentChange(event) {
		this.setState({
			content: event.target.value
		})
	}

	handleSubmit(event) {
		if (this.props.onSubmit) {
			this.props.onSubmit({
				username: this.state.username, 
				content: this.state.content,
				createdTime: +new Date()
			})
		}
		this.setState({content:""})
	}

  render() {
    return (
      <div className='comment-input'>
				<div className='comment-field'>
					<span className='comment-field-name'>User Name:</span>
					<div className='comment-field-input'>
						<input 
							value={this.state.username}
							onBlur={this.handleUsernameBlur.bind(this)}
							onChange={this.handleUsernameChange.bind(this)}
						/>
					</div>
				</div>
				<div className='comment-field'>
					<span className='comment-field-name'>Comment:</span>
					<div className='comment-field-input'>
						<textarea
							ref={(textarea) => this.textarea = textarea} 
							value={this.state.content}
							onChange={this.handleContentChange.bind(this)}
						/>
					</div>
				</div>
				<div className='comment-field-button'>
					<button
						onClick={this.handleSubmit.bind(this)}>
						Submit
					</button>
				</div>
      </div>
    )
  }
}

class CommentList extends Component {
	static defaultProps = {
		comments: []
	}

  render() {
    return (
      <div>{this.props.comments.map((comment, i) => 
					<Comment comment={comment} key={i} />
				)}</div>
    )
  }
}
class CommentApp extends Component {
	constructor() {
		super()
		this.state = {
			comments: []
		}
	}

	componentWillMount() {
		this._loadComments()
	}

	_loadComments() {
		let comments = localStorage.getItem("comments")
		if (comments) {
			comments = JSON.parse(comments)
			this.setState({comments})
		}
	}

	_saveComments (comments) {
		localStorage.setItem("comments", JSON.stringify(comments))
	}

	handleSubmitComment (comment) {
		if (!comment) return
		if(!comment.username) return alert("Please input username")
		if(!comment.content) return alert("Please input comment")
		const comments = this.state.comments
		comments.push(comment)
		this.setState({comments})
		this._saveComments(comments)
	}

  render() {
    return (
      <div className = "wrapper">
        <CommentInput 
					onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList 
					comments={this.state.comments} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<CommentApp />)

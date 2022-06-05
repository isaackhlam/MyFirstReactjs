import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Comment extends Component {
	render() {
		return (
			<div className='comment'>
				<div className='comment-user'>
					<span>{this.props.comment.username}</span> :
				</div>
					<p>{this.props.comment.content}</p>
			</div>
		)
	}
}

class CommentInput extends Component{
	constructor() {
		super()
		this.state = {
			username: "",
			content: "",
		}
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
			const {username, content} = this.state
			this.props.onSubmit({username, content})
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
							onChange={this.handleUsernameChange.bind(this)}
						/>
					</div>
				</div>
				<div className='comment-field'>
					<span className='comment-field-name'>Comment:</span>
					<div className='comment-field-input'>
						<textarea 
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

	handleSubmitComment (comment) {
		if (!comment) return
		if(!comment.username) return alert("Please input username")
		if(!comment.content) return alert("Please input comment")
		this.state.comments.push(comment)
		this.setState({
			comments: this.state.comments
		})
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

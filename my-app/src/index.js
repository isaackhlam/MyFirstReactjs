import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class CommentInput extends Component{
	constructor() {
		super();
		this.state = {
			username: "",
			content: "",
		};
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
			const {username, content} = this.state;
			this.props.onSubmit({username, content});
		}
		this.setState({content:""});
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
  render() {
    return (
      <div>CommentList</div>
    )
  }
}
class CommentApp extends Component {
handleSubmitComment (comment) {
	console.log(comment)
}

  render() {
    return (
      <div className = "wrapper">
        <CommentInput 
					onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CommentApp />);

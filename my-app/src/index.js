import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class CommentInput extends Component{
    render() {
        return (
            <div>CommentInput</div>
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
    render() {
        return (
            <div className = "wrapper">
                <CommentInput />
                <CommentList />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CommentApp />);

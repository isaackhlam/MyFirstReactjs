import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button 
      className={"square " + (props.winningSquare ? "square-winning" : null)}
      onClick={props.onClick} 
    >
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return(
      <Square 
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
        winningSquare = {this.props.winner && this.props.winner.includes(i) ? true : false}
      />
    );
  }
  
  renderRow(i){
    let row = []
    for(let j=0;j<3;j++){
      row.push(this.renderSquare(i*3+j));
    }
    return row;
  }

  render() {
    let squares = []
    for(let i=0;i<3;i++){
      squares.push(<div className="board-row">{this.renderRow(i)}</div>);
    }
    return(
      <div>{squares}</div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        clicked: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        clicked: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  isSortByAscending(){
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let r = Math.floor(history[move].clicked/3)+1;
      let c = history[move].clicked%3+1;
      
      const desc = move ?
        'Go to move #' + move + (move%2 ? ', X' : ', O')+' placed at (' + c + ',' + r + ')':
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <b>{desc}</b> : desc}</button>
        </li>
      );
    });

    let status;
    if(winner){
      status = 'Winner: ' + winner.winner;
    }else if(this.state.stepNumber < 9){
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }else{
      status = 'Draw';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner && winner.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.isSortByAscending()}>
            Sort by: {this.state.isAscending ? 'Ascending' : 'Descending'}
          </button>
          <ol>{this.state.isAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return{
        winner: squares[a],
        winningSquares: lines[i]
      } 
    }
  }
  return null;
}
  
  // ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  
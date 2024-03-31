/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { useState } from 'react'

function Square ({value, onSquareClick}) {

  return ( 
  <button className="square"onClick={onSquareClick}>
    {value}
  </button>
  )
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick (i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    // if (xIsNext) {
    //   nextSquares [i] = 'X';
    // } else {
    //   nextSquares [i] = 'O';
    // }

    // ternary / bisa juga begini
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay (nextSquares);
  }

  const winner = calculateWinner (squares)
  let status = '';
  if (winner) {
    status = 'Player ' + winner + ' Win the Game!';
  } else {
    status = 'Player ' + (xIsNext ? 'X' : 'O') + ' Turn.';
  }
 
  return (
    <>
    <div className="status">{status}</div>
    <div className="board">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  )
}

export default function Game () {
  const [xIsNext, setXIsNext] = useState (true);
  const [history, setHistory] = useState ([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history [currentMove];

  function jumpTo (nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1 ), nextSquares];
    setHistory (nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  const moves = history.map ((squares, move) => {
    let description = '';
    if (move > 0) {
      description = 'Go to Move #'+ move
   } else {
    description = 'Go to Started Game bro!'
   }

   return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
   );
  });


    return (
  <div className="game">
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  </div>
    );
  }
function calculateWinner (squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0; i < lines.length; i++) {
  // destructuring bisa juga begini
    const [a, b, c] = lines [i];
  
    // bisa pake juga begini
    //   const [a] = lines [i] [0];
  //   const [b] = lines [i] [1];
  //   const [c] = lines [i] [2];
  // }

  if (squares[a] && squares[a] === squares[b] && squares[c]) {
    return squares [a];
    }
  }
  return false
}
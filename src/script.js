// import { Chess,validateFen } from 'chess.js'

const gameBoard = () => {
  
  localStorage.removeItem('studentPosition');
  
  const FEN =
    'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 3 5';
  let board = null; // Initialize the chessboard
  const game = new Chess(FEN); // Create new Chess.js game instance
  let moveCount = 1; // Initialize the move count
  let userColor = 'w'; // Initialize the user's color as white
  let studentPosition = '';

  // Function to make a random move for the computer
  const makeRandomMove = () => {
    const possibleMoves = game.moves();

    if (game.game_over()) {
      alert('Checkmate!');
    } else {
      const randomIdx = Math.floor(Math.random() * possibleMoves.length);
      const move = possibleMoves[randomIdx];
      game.move(move);
      board.position(game.fen());
      recordMove(move, moveCount); // Record and display the move with move count
      moveCount++; // Increament the move count
    }
  };

  // Function to record and display a move in the move history
  const recordMove = (move, count) => {
    const formattedMove =
      count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
    studentPosition += formattedMove + ' ';
    localStorage.setItem('studentPosition', studentPosition);
  };

  // Function to handle the start of a drag position
  const onDragStart = (source, piece) => {
    // Allow the user to drag only their own pieces based on color
    return !game.game_over() && piece.search(userColor) === 0;
  };

  // Function to handle a piece drop on the board
  const onDrop = (source, target) => {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return 'snapback';

    setTimeout(makeRandomMove, 250);
    recordMove(move.san, moveCount); // Record and display the move with move count
    moveCount++;
  };

  // Function to handle the end of a piece snap animation
  const onSnapEnd = () => {
    board.position(game.fen());
  };

  // Configuration options for the chessboard
  const boardConfig = {
    showNotation: true,
    draggable: true,
    position: game.fen(),
    onDragStart,
    onDrop,
    onSnapEnd,
    moveSpeed: 'fast',
    snapBackSpeed: 500,
    snapSpeed: 100,
  };

  // Initialize the chessboard
  board = Chessboard('board', boardConfig);

  if (game.turn() !== userColor) {
    makeRandomMove();
  }
};

document.addEventListener('DOMContentLoaded', gameBoard);

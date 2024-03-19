/*****************************\
 =============================
 
    WukongJS + ChessboardJS

 =============================              
\*****************************/

// Starting position
START_FEN = '8/8/4n3/4k3/8/5K2/3R4/8 w - - 0 1';

// make engine move
function makeMove() {
  // make computer move
  setTimeout(function() {
    let bestMove = engine.searchTime(1000); // search for 1 second
    engine.makeMove(bestMove);
    let fen = engine.generateFen();
    board.position(fen);
    localStorage.studentPosition = engine.pgn() // store game in PGN
  }, 300);
}

// on dropping piece
function onDrop (source, target) {
  let promotedPiece = (engine.getSide() ? (5 + 6): 5) // queen promotion only for now
  let move = source + target + engine.promotedToString(promotedPiece);
  let validMove = engine.moveFromString(move);

  console.log('user move', promotedPiece);
  
  // invalid move
  if (validMove == 0) return 'snapback';
  
  let legalMoves = engine.generateLegalMoves();
  let isLegal = 0;
  
  for (let count = 0; count < legalMoves.length; count++) {
    if (validMove == legalMoves[count].move) isLegal = 1;  
  }
  
  // illegal move
  if (isLegal == 0) return 'snapback';
  
  // make user move
  engine.makeMove(validMove);    
  engine.printBoard();
  
  // make engine move
  makeMove();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(engine.generateFen());
}

// chess board configuration
var config = {
  draggable: true,
  position: START_FEN,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}

// create chess board widget instance
var board = Chessboard('board', config)

// create WukongJS engine instance
const engine = new Engine();
engine.setBoard(START_FEN);

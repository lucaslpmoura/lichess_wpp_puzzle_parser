import { Chess } from "chess.js";

const UTF_PIECES = {
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
};

const TEST_STRING = "Nf3 d5 e3 c6 c4 e6 b3 Nf6 Nc3 Be7 Bb2 O-O Be2 Nbd7 h3 b6 g4 Bb7 g5 Ne4 h4 Qc7 Qc2 f5 d3 Nec5 b4 Na6 a3 dxc4 dxc4 c5 b5 Nab8 O-O-O Ne5 Rh3 Nbd7 Nxe5 Nxe5 f4 Ng4 Bxg4 fxg4 Rg3 Bf3 Ne2 Rfd8 Rxd8+ Rxd8 Qc3 Bf8 Qc2 Qd6 Be5 Qd3 Qxd3 Rxd3 Ng1 Rxe3 Nxf3";

export function chessBoardFromMoves(movesString) {
    const chess = new Chess();

    const moves = movesString
        .replace(/\d+\./g, "")
        .trim()
        .split(/\s+/);

    for (const m of moves) {
        chess.move(m, { sloppy: true });
    }

    const board = chess.board();
 
    return board;

}

export function generateChessBoardText(board) {
    let output = "";
    for (let rank = 7; rank >= 0; rank--) {
        let line = "";
        for (let file = 0; file < 8; file++) {
            const piece = board[rank][file];
            if (piece) {
                line += UTF_PIECES[piece.color === 'w' ? piece.type.toUpperCase() : piece.type] + " ";
            } else {
                line += ". ";
            }
        }
        output += line.trim() + "\n";
    }

    return output.trim();
}

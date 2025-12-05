async function tstInitBoard() {
    let lichessResponse = await fetch('https://lichess.org/api/puzzle/daily');
    let lichessPayload = await lichessResponse.json();

    let initialMoves = lichessPayload.game.pgn;
    let id = lichessPayload.puzzle.id;
    let solution = lichessPayload.puzzle.solution;
    
    let apiResponse = await fetch("http://localhost:9000/initBoard", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            initialMoves: initialMoves,
            id: id,
            solution : solution 
        })
    });
    let apiPayload = await apiResponse.json();
    return apiPayload;
}

tstInitBoard().then((resp) => console.log(resp.boardText));
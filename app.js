import express from 'express';

import {chessBoardFromMoves, generateChessBoardText} from './chess_functions.js';

const app = express();
app.use(express.json());

const DATA_OK_STR = "Data ok.";

let board;
let initialMoves = "";
let solution = "";
let id = "";

app.post('/initBoard', (req,res) => {
    let message = ""
    let boardText = "";
    let status = 200;

    console.log("Request Body:")
    console.log(req.body);
    if(!req.body.initialMoves){
        message += " Missing Initial Moves.";
    }
    if(!req.body.solution){
        message += " Missing Solution.";
    }
    if(!req.body.id){
        message += " Missing Id.";
    }

    if(req.body.initialMoves && req.body.solution && req.body.id){
        message = DATA_OK_STR;

        initialMoves = req.body.initialMoves;
        solution = req.body.solution;
        id =  req.body.id;

        board = chessBoardFromMoves(initialMoves);
        boardText = generateChessBoardText(board);
    }


    if(message != DATA_OK_STR){
        status = 400;
    }
    res.send({"message" : message, "boardText": boardText});
    res.status(status);
});

app.get('/makeMove', (req,res) => {})

app.get('/checkSolution', (req,res) => {

})

app.listen(9000, () => console.log("App listening on port 9000"));
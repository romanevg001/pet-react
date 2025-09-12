import { useRef, useState } from "react";
import Player from "./Player";
import Board from "./Board";
import RestartDialog, { type IRestartDialog } from "./RestartDialog";
import { useLoaderData } from "react-router-dom";
import { httpCallJson } from "@/api/commonApi";
import { useHeaderMessages } from "@/hooks/useHeaderMessages";


function getActivePlayer(gameTurns) {
    let player = 'X';
    if (gameTurns.length && gameTurns[0].player == 'X') {
        player = 'O';
    }
    return player;
}

function getBoard(gameTurns) {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        board[row][col] = player;
    }

    return board;
}

function hasWinner(board, WINNING_COMBINATIONS) {
    let winner = null;
    for(const combination of WINNING_COMBINATIONS) {
        const squareCombination1 = board[combination[0].row][combination[0].column];
        const squareCombination2 = board[combination[1].row][combination[1].column];
        const squareCombination3 = board[combination[2].row][combination[2].column];
        if(squareCombination1 && squareCombination1 == squareCombination2 && squareCombination1 == squareCombination3) {
            winner = squareCombination1
        }
    }
    return winner;
}

export const ticTacPageLoader =  async ()=>{
    return await httpCallJson('WINNING_COMBINATIONS');
}



export function TicTacPage() {
  const WINNING_COMBINATIONS = useLoaderData();

  const dialogRef = useRef<IRestartDialog>(null);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);
  const board = getBoard(gameTurns);
  const winner = hasWinner(board, WINNING_COMBINATIONS);
 

  function handleSelectedSquare(row,col) {
    setGameTurns((prevTurns) => [ {square: {row, col}, player: activePlayer } ,...prevTurns] )
  }

  
  function onRestart() {
    setGameTurns([]);
  }

  if( winner || gameTurns.length > 8) {
    console.log('dialogRef.current',dialogRef.current);

    dialogRef.current?.open();
  }
  console.log('render TicTacPage')
  

  return (
    <main>
        <ol>
            <Player initialName='Masha' symbol='X' isActive={activePlayer == 'X'}></Player>
            <Player initialName='Dasha' symbol='O' isActive={activePlayer == 'O'}></Player>
        </ol>
        <Board onSelect={handleSelectedSquare} board={board}></Board>

        <RestartDialog onRestart={onRestart} winner={winner} ref={dialogRef}></RestartDialog>
    </main>
  );
}

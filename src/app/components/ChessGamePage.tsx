import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useInitData, MainButton } from "@vkruglikov/react-telegram-web-app";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import socket from "../socket";
import { AppContext } from "../context";
import { Game, Player, Types } from "../reducers";


function getName(player: Player | null | undefined) {
  let name = "";
  if (player?.firstName) {
    name += player.firstName;
  }

  if (player?.lastName) {
    name += " " + player.lastName;
  }

  if (!name && player?.username) {
    return player.username;
  }

  return name;
}


const ChessGamePage = () => {
  const [copied, setCopied] = useState(false);
  const [initDataUnsafe, initData] = useInitData();
  const { state, dispatch } = useContext(AppContext);
  const chess = new Chess(state.game?.board);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  const gameUrl = `${process.env.REACT_APP_BOT_URI}?startapp=chess_${state.game?.id}`;
  const waitingForOtherPlayer = <>
    Waiting for other player to join...&nbsp;
    <CopyToClipboard text={gameUrl} onCopy={handleCopy}><span className="CopyLink">Copy link</span></CopyToClipboard>
    <span className={copied ? "Copied show" : "Copied"}>&#128076;</span>
  </>;
  
  const game = state.game;
  const myUserId = initDataUnsafe.user?.id.toString();
  const mySide = game?.black?.id === myUserId ? 'black' : (game?.white?.id === myUserId ? 'white' : null);
  const orientation = mySide === 'black' || (!game?.black && mySide === null) ? 'black' : 'white';
  const topName = orientation === 'black' ? (getName(game?.white) || waitingForOtherPlayer) : (getName(game?.black) || waitingForOtherPlayer);
  const bottomName = orientation === 'black' ? (getName(game?.black) || null) : (getName(game?.white) || null);
  const gameStarted = !!game?.black && !!game?.white;
  const isMyTurn = mySide?.slice(0, 1) === chess.turn().toString();
  const isGameOver = chess.isGameOver();

  useEffect(() => {
    console.log(isGameOver);
    if (isGameOver) return () => {};
    console.log('Why?', isGameOver);
    const room_name = `chess_${game?.id}`;
    socket.connect();
  
    function onFooEvent(value: Game) {
      dispatch({
        type: Types.LoadGame,
        payload: {
          game: value
        }
      });
    }
  
    socket.on(room_name, onFooEvent);
  
    return () => {
      socket.off(room_name, onFooEvent);
      socket.disconnect();
    };
  }, [game?.id, isGameOver, dispatch]);
  
  const handleJoinClick = () => {
    axios.post(`/api/game/${game?.id}/join/`, {}, {
      headers: {
        'tg-init-data': initData
      }
    }).then((result) => {
      dispatch({
        type: Types.LoadGameAndOpenPage,
        payload: {
          page: 'chess_game',
          game: result.data
        }
      });
    })
  }

  const handleDrop = (sourceSquare: any, targetSquare: any) => {
    const testBoard = new Chess(game?.board);
    const move = testBoard.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });

    // illegal move
    if (move === null) return false;
    dispatch({
      type: Types.LoadGame,
      payload: {
        game: {
          ...game!,
          board: move.after
        }
      }
    })

    axios.post(`/api/game/${game?.id}/move/`, {
      from: move.from,
      to: move.to
    }, {
      headers: {
        'tg-init-data': initData
      }
    }).then((result) => {
      dispatch({
        type: Types.LoadGame,
        payload: {
          game: result.data
        }
      });
    });

    return true;
  }

  // const handleBegin = (piece: any) => {
  //   if (!piece || !mySide) return false;
  //   console.log(piece.slice(0, 1));
  //   console.log(mySide.slice(0, 1));
  //   if (piece.slice(0, 1) !== mySide.slice(0, 1)) return false;
  //   return true;
  // }
  const topTurn = mySide === null && !isGameOver && gameStarted && (orientation.slice(0, 1) !== chess.turn().toString()) ? <span className="Turn">turn</span> : null;
  const bottomTurn = mySide === null && !isGameOver && gameStarted && (orientation.slice(0, 1) === chess.turn().toString()) ? <span className="Turn">turn</span> : null;

  return <div className="ChessGame">
    {isGameOver ? <div className="GameOver">
      <h1>Game over</h1>
      <h3>{chess.isDraw() ? 'Draw' : (mySide !== null ? (isMyTurn ? 'You lost' : 'You\'re a winner') : `Winner: ${chess.turn() === 'w' ? getName(game?.black!) :  getName(game?.white!)}`)}</h3>
    </div> : null}
    <p>{topName}{mySide !== null && !isMyTurn && !isGameOver && gameStarted ? <span className="Turn">waiting</span> : null}{topTurn}</p>
    <Chessboard 
      position={state.game?.board}
      boardOrientation={orientation}
      areArrowsAllowed={false}
      arePiecesDraggable={gameStarted && isMyTurn && !isGameOver}
      onPieceDrop={handleDrop}
    />
    {bottomName ? <p>{bottomName}{mySide !== null && isMyTurn && !isGameOver && gameStarted ? <span className="Turn">your turn</span> : null}{bottomTurn}</p> : <MainButton text="JOIN GAME" onClick={handleJoinClick} />}
  </div>
};

export default ChessGamePage;

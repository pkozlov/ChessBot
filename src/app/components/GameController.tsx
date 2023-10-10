import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useInitData } from '@vkruglikov/react-telegram-web-app';

import { AppContext } from '../context';
import { Types } from '../reducers';
import useStyles from '../hooks/useStyles';

import LoadingPage from './LoadingPage';
import StartPage from './StartPage';
import ChessGamePage from './ChessGamePage';

const CHESS_GAME_REGEXP = /chess_(\d+)/;

const GameController = () => {
  const { state, dispatch } = useContext(AppContext);
  const [ initDataUnsafe, initData ] = useInitData();
  const style = useStyles();
  
  useEffect(() => {
    if (initDataUnsafe.start_param && CHESS_GAME_REGEXP.test(initDataUnsafe.start_param)) {
      const matches = CHESS_GAME_REGEXP.exec(initDataUnsafe.start_param);
      axios.get(`/api/game/${matches![1]}/`, {
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
      }).catch(() => {
        dispatch({
          type: Types.OpenPage,
          payload: {
            page: 'start'
          }
        });
      });
    } else {
      dispatch({
        type: Types.OpenPage,
        payload: {
          page: 'start'
        }
      });
    }
  }, [initDataUnsafe.start_param, initData, dispatch])

  return <div className='App' style={{
    backgroundColor: style.bg_color,
    color: style.text_color
  }}>
    {state.page === 'loading' ? <LoadingPage /> : null}
    {state.page === 'start' ? <StartPage /> : null}
    {state.page === 'chess_game' ? <ChessGamePage /> : null}
  </div>
}

export default GameController;

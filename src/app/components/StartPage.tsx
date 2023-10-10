import axios from "axios";
import { useContext } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { Side, Types} from "../reducers";
import { AppContext } from "../context";

const StartPage = () => {
  const [, initData] = useInitData();
  const { dispatch } = useContext(AppContext);
  const handleStartGame = async (side: Side | 'random') => {
    const result = await axios.post('/api/game/', {
      side: side
    }, {
      headers: {
        'tg-init-data': initData
      }
    })
    dispatch({
      type: Types.LoadGameAndOpenPage,
      payload: {
        page: 'chess_game',
        game: result.data
      }
    })
  }

  return <div className="StartPage">
    <h1>Chess</h1>
    <div className="inside">
      <h3>Create new game with side</h3>
      <button onClick={() => handleStartGame('white')}>White</button>
      <h3>or</h3>
      <button onClick={() => handleStartGame('black')}>Black</button>
      <h3>or</h3>
      <button onClick={() => handleStartGame('random')}>Random</button>
    </div>
  </div>
};

export default StartPage;

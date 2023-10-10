type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum Types {
  LoadGame = 'LOAD_GAME',
  OpenPage = 'OPEN_PAGE',
  LoadGameAndOpenPage = 'LOAD_GAME_AND_OPEN_PAGE',
  CreateGame = 'CREATE_GAME',
}

export type Pages = 'loading' | 'start' | 'chess_game';
export type Side = 'black' | 'white';

export type Player = {
  id: bigint,
  username: string,
  firstName: string,
  lastName: string,
}

export type Game = {
  id: number,
  white: Player | null,
  black: Player | null,
  board: string
}

export type StateType = {
  page: Pages,
  game: Game | null,
  isLoading: boolean
}

type Payload = {
  [Types.LoadGame] : {
    game: Game
  };
  [Types.OpenPage]: {
    page: Pages
  };
  [Types.CreateGame]: {
    side: Side
  };
  [Types.LoadGameAndOpenPage]: {
    page: Pages,
    game: Game
  };
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const appReducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case Types.OpenPage:
      return {
        ...state,
        page: action.payload.page
      }
    case Types.LoadGame:
      return {
        ...state,
        game: action.payload.game
      }
    case Types.LoadGameAndOpenPage:
      console.log(action);
      return {
        ...state,
        game: action.payload.game,
        page: action.payload.page
      }
    default:
      return state;
  }
}

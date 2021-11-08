import { SET_TEMP, SET_DEVS } from "../actions/types";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TEMP:
      return {
        ...state,
        ...action.data
      };
    case SET_DEVS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default reducer;
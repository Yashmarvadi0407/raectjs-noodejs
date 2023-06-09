import * as Actions from "../action/register.action";
import _ from "@lodash";

const initialState = {
  user: [],
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_USER: {
      return {
        ...state,
        user: state?.user?.length
          ? [...state?.user, action.payload]
          : [action.payload],
      };
    }
    case Actions.DELETE_USER: {
      return {
        ...state,
        user: state?.user?.length
          ? [...state?.user, action.payload]
          : [action.payload],
      };
    }
    case Actions.GET_USER:
      console.log("getuser2");
      {
        return {
          ...state,
          user: action.payload,
        };
      }
    case Actions.UPDATE_USER: {
      return {
        ...state,
        user: state?.user?.length
          ? [...state?.user, action.payload]
          : [action.payload],
      };
    }
    default:
      return state;
  }
};

export default registerReducer;

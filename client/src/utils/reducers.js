// Import our actions from our actions file
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  ADD_FAV,
  REMOVE_FAV,
} from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_POST: {
      const newPost = { ...action.payload };
      return { ...state, post: newPost };
    }
    case DELETE_POST: {
      return {};
    }
    case UPDATE_POST: {
      return {};
    }

    case ADD_FAV: {
      return {};
    }

    case REMOVE_FAV: {
      return {};
    }

    default:
      return state;
  }
}

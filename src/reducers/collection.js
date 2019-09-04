import {
  GET_COLLECTIONS,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  EDIT_COLLECTION,
  CREATE_FAILURE
} from '../actions/collection.js';

const INITIAL_STATE = {
  collections: []
};

const collection = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections
      };
    case CREATE_COLLECTION:
      return {
        ...state,
        collections: collections(state.collections, action)
      }
    case DELETE_COLLECTION:
    case EDIT_COLLECTION:
    case CREATE_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}

const collections = (state, action) => {
  switch (action.type) {
    case CREATE_COLLECTION:
      const collectionName = action.name;
      return [
        ...state,
        collectionName
      ];
    default:
      return state;

  }
}

export default collection;

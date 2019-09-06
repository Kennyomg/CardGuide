import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  EDIT_COLLECTION,
  ADD_CARD,
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
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.collection
      }
    case CREATE_COLLECTION:
      return {
        ...state,
        collections: collections(state.collections, action)
      }
    case DELETE_COLLECTION:
    case EDIT_COLLECTION:
    case ADD_CARD:
      return {
        ...state,
        collections: collections(state.collections, action)
      }
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
      return [
        ...state,
        action.collection
      ];
    case ADD_CARD:
      return [
        ...state,
        action.collection
      ];
    default:
      return state;

  }
}

export default collection;

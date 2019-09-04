export const GET_COLLECTIONS = 'GET_COLLECTIONS';
export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export const EDIT_COLLECTION = 'EDIT_COLLECTION';
export const CREATE_FAILURE = 'CREATE_FAILURE';

const COLLECTION_LIST = [
  'Box1',
  'Box2'
]

export const getAllCollections = () => (dispatch) => {
  dispatch({
    type: GET_COLLECTIONS,
    collections: COLLECTION_LIST
  });
};

export const createCollection = (name) => (dispatch, getState) => {
  const state = getState();

  state.collection.collections.forEach((val, i) => {
    if (val == name) {
      console.log("Name taken");
      dispatch({
        type: CREATE_FAILURE,
        error: 'Name was already taken.'
      });
      return;
    }
  });

  dispatch({
    type: CREATE_COLLECTION,
    name
  });
}

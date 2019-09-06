export const GET_COLLECTIONS = 'GET_COLLECTIONS';
export const GET_COLLECTION = 'GET_COLLECTION';
export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export const EDIT_COLLECTION = 'EDIT_COLLECTION';
export const ADD_CARD = 'ADD_CARD';
export const CREATE_FAILURE = 'CREATE_FAILURE';

const COLLECTION_LIST = [
  {
    name: 'Box1',
    cards: [
      {
        name: "Pot of Greed",
        quantity: 1,
        price: 0.04
      }
    ],
    options: {
      isDeleted: false
    },
    price: 128.54
  },
  {
    name: 'Box2',
    cards: [
      {
        name: "Pot of Desires",
        quantity: 3,
        price: 25.00
      }
    ],
    options: {
      isDeleted: false
    },
    price: 128.54
  },
];

export const getAllCollections = () => (dispatch) => {
  dispatch({
    type: GET_COLLECTIONS,
    collections: COLLECTION_LIST
  });
};

export const getCollection = (collectionName) => (dispatch, getState) => {
  const state = getState();
  const foundCollection = state.collection.collections.find(el => el.name === collectionName);

  dispatch({
    type: GET_COLLECTION,
    collection: foundCollection
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
    collection: {
      name,
      cards: [
      ],
      options: {
        isDeleted: false
      },
      price: 0
    }
  });
};

export const addCard = (collection, card) => (dispatch, getState) => {
    const state = getState();

    state.collection.collections.map((val) => {
      if (val.name === collection.name) {
        val.cards.push(card);
      }
    });

    dispatch({
      type: ADD_CARD,
      collection
    });

};

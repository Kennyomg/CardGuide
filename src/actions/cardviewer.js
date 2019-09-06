export const GET_CARD = 'GET_CARD';
const carddb = require("../../assets/carddb.json");

export const getCard = (name) => (dispatch) => {
  dispatch({
    type: GET_CARD,
    card: carddb.find(el => el.name === name)
  });
};

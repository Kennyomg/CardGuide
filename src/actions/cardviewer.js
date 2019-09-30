import slugify from 'slugify';

export const GET_CARD = 'GET_CARD';
const carddb = require("../../assets/carddb.json");

export const getCard = (name) => (dispatch) => {
  dispatch({
    type: GET_CARD,
    card: carddb.find(el => slugify(el.name, { lower: true }) === name)
  });
};

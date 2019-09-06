import {
  GET_CARD
} from '../actions/cardviewer.js';

const INITIAL_STATE = {
  card: {
      id: '',
      name: '',
      type: '',
      desc: '',
      race: '',
      archetype: '',
      card_sets: [
        {
          set_name: '',
          set_code: '',
          set_rarity: '',
          set_price: ''
        }
      ],
      banlist_info: {
        ban_tcg: '',
        ban_ocg: '',
        ban_goat: ''
      },
      card_images: [
        {
          id: '',
          image_url: '',
          image_url_small: ''
        }
      ],
      card_prices: {
        cardmarket_price: '',
        tcgplayer_price: '',
        ebay_price: '',
        amazon_price: ''
      }
    }
};

const cardviewer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CARD:
      return {
        ...state,
        card: action.card
      }
    default:
      return state;
  }
}

export default cardviewer;

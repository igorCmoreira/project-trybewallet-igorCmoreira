// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { INNITIAL_WALLET } from '../actions';

const INNITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case INNITIAL_WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
    };
  default:
    return state;
  }
}

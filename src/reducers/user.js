// Esse reducer será responsável por tratar as informações da pessoa usuária
// Pare este reducer segui o passo a passo da aula de revisão, course e aulas aovivo
import { LOGIN_SUCCSESS } from '../actions';

const INITIAL_STATE = { email: '' };

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_SUCCSESS:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

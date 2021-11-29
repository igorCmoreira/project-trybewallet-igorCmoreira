// Coloque aqui suas actions
export const LOGIN_SUCCSESS = 'LOGIN_SUCCSESS';

export const loginAction = (email) => ({
  type: LOGIN_SUCCSESS,
  email,
});

export const INNITIAL_WALLET = 'INNITIAL_WALLET';

export const walletAction = (payload) => ({
  type: INNITIAL_WALLET,
  payload,
});

export const coinAPI = (payload) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  dispatch(walletAction({
    ...payload,
    rateCoins: json,
  }));
};

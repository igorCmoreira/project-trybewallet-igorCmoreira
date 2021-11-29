import React from 'react';
import { connect } from 'react-redux';
import { walletAction } from '../actions';
import MetodoPagamento from './MetodoPagamento';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metodoPagamento: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      categoria: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      codes: [],
      valor: 0,
      descricao: '',
      pagamento: '',
      coin: 'USD',
      tag: '',
      rates: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCoinAPI = this.handleCoinAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleCoinAPI().then((coins) => {
      const withUSDT = Object.keys(coins);
      const index = withUSDT.indexOf('USDT');
      withUSDT.splice(index, 1);
      this.setState({ codes: withUSDT });
    });
  }

  handleClick() {
    this.handleCoinAPI().then((coins) => {
      this.setState({ rates: coins }, () => {
        const { valor, descricao, pagamento, tag, coin, rates } = this.state;
        const expence = {
          value: valor,
          currency: coin,
          method: pagamento,
          tag,
          description: descricao,
          exchangeRates: rates,
        };
        const { exchange } = this.props;
        exchange(expence);
        this.setState({ valor: 0,
          descricao: '',
          pagamento: '',
          coin: 'USD',
          tag: '',
          rates: {},
        });
      });
    });
  }

  async handleCoinAPI() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    return json;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { metodoPagamento, categoria, codes, valor } = this.state;
    return (
      <form>
        <h1>Despesas</h1>
        <label htmlFor="valor-despesas">
          Valor
          <input
            data-testid="value-input"
            name="valor"
            type="number"
            onChange={ this.handleChange }
            value={ valor }
          />
        </label>
        <label htmlFor="despesas">
          Descrição
          <input
            data-testid="description-input"
            name="descricao"
            type="text-area"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          <select
            id="currency"
            name="moeda"
            onClick={ this.handleChange }
            data-testid="currency-input"
          >
            {codes.map((code) => (
              <option name="coin" value={ code } data-testid={ code } key={ code }>
                {code}
              </option>
            ))}
          </select>
        </label>
        <MetodoPagamento
          handleChange={ this.handleChange }
          categoria={ categoria }
          metodoPagamento={ metodoPagamento }
        />
        <button type="reset" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  exchange: (rates) => dispatch(walletAction(rates)),
});

export default connect(null, mapDispatchToProps)(Forms);

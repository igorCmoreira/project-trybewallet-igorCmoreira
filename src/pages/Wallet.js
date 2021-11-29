import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Forms from '../components/Forms';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const { emailEntrada } = this.props;
    this.state = {
      email: emailEntrada,
      coin: 'BRL',
      totalField: 0,
    };
    this.attValor = this.attValor.bind(this);
  }

  // Eestava na duvida em qual valor da corretagem usar:
  // para esta parte realizei uma consulta no repositorio da lygia Dias
  attValor() {
    const { totalWallet } = this.props;
    const total = totalWallet.reduce((controle, gasto) => (
      controle + (gasto.value * gasto.exchangeRates[gasto.currency].ask)
    ), 0);
    this.setState({ totalField: total.toFixed(2) });
  }

  render() {
    const { email, coin, totalField } = this.state;
    return (
      <div>
        <header>
          <spam data-testid="email-field">{email}</spam>
          <spam data-testid="total-field">{totalField}</spam>
          <spam data-testid="header-currency-field">{coin}</spam>
        </header>
        <section>
          <Forms attValor={ this.attValor } />
          <Tabela />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  emailEntrada: state.user.email,
  totalWallet: state.wallet.expenses,
});

Wallet.propTypes = {
  emailEntrada: PropTypes.string,
  totalWallet: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);

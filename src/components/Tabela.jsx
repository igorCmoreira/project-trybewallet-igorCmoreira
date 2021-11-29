import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Tabela extends React.Component {
  render() {
    const { totalWallet } = this.props;
    return (
      // Referencia https://www.w3schools.com/tags/tag_table.asp
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {totalWallet.map((expense, i) => {
          const {
            description,
            tag,
            method,
            currency,
            exchangeRates,
            value,
          } = expense;
          // console.log(Number(exchangeRates[currency].ask).toFixed(2));
          return (
            <tr key={ i }>
              <td key={ i }>{description}</td>
              <td key={ i }>{tag}</td>
              <td key={ i }>{method}</td>
              <td key={ i }>{value}</td>
              <td key={ i }>{exchangeRates[currency].name}</td>
              <td key={ i }>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td key={ i }>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td key={ i }>Real</td>
            </tr>
          );
        })}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  totalWallet: state.wallet.expenses,
});
Tabela.propTypes = {
  totalWallet: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, null)(Tabela);

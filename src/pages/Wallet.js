import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Forms from '../components/Forms';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const { emailEntrada } = this.props;
    this.state = {
      email: emailEntrada,
      coin: 'BRL',
      totalField: 0,
    };
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
          <Forms />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  emailEntrada: state.user.email,
});

Wallet.propTypes = {
  emailEntrada: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

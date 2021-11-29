import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generalValidation = this.generalValidation.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.generalValidation());
  }

  // por algum motivo o lint esta reclamando da arrow function
  handleClick() {
    const { email } = this.state;
    const { history, emailEntrada } = this.props;
    emailEntrada(email);
    history.push('/carteira');
  }
  //= ======================================
  // Para esta função consutei o repositorio de alguns colegas
  // Apolo Wilker https://github.com/tryber/sd-015-a-project-trybewallet/pull/63/commits/cd5ee6b47f0198a6b25f25ca5f77296d5ed4b120
  // Lucas Toledo https://github.com/tryber/sd-015-a-project-trybewallet/pull/18/commits/8beef29094d97ebc0b4ae3b169936e5e21448431

  passwordValidation(senha) {
    const six = 6;
    return senha.length >= six;
  }

  emailValidation(email) {
    const validEmail = email.match(/(.+)(@)(.+).com/);
    return validEmail !== null;
  }

  generalValidation() {
    const { email, senha } = this.state;
    if (this.emailValidation(email) && this.passwordValidation(senha)) {
      this.setState({ disabled: false });
    } else { this.setState({ disabled: true }); }
  }
  //= ===================================

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="Email">
            Email
            <input
              onChange={ this.handleChange }
              type="email"
              name="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="Password">
            Senha
            <input
              onChange={ this.handleChange }
              type="password"
              name="senha"
              data-testid="password-input"
            />
          </label>
          <button disabled={ disabled } type="submit" onClick={ this.handleClick }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  emailEntrada: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  emailEntrada: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import PropTypes from 'prop-types';

class MetodoPagamento extends React.Component {
  render() {
    const { handleChange, categoria, metodoPagamento } = this.props;
    return (
      <div>
        <label htmlFor="metodo">
          <select
            id="metodo"
            name="pagamento"
            onChange={ handleChange }
            data-testid="method-input"
          >
            {metodoPagamento.map((metodo) => (
              <option value={ metodo } name="pagamento" key={ metodo }>
                {metodo}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          <select
            id="tag"
            name="tag"
            onChange={ handleChange }
            data-testid="tag-input"
          >
            {categoria.map((tag) => (
              <option key={ tag } value={ tag }>{tag}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
MetodoPagamento.propTypes = {
  handleChange: PropTypes.func,
  categoria: PropTypes.array,
  metodoPagamento: PropTypes.array,
}.isRequired;

export default MetodoPagamento;

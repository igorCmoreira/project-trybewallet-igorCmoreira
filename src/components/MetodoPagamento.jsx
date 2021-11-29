import React from 'react';

class MetodoPagamento extends React.Component {
  render() {
    const { handleChange, categoria, metodoPagamento } = this.props;
    return (
      <div>
        <label htmlFor="metodo">
          <select
            id="metodo"
            name="pagamento"
            onClick={ handleChange }
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
            onClick={ handleChange }
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

export default MetodoPagamento;

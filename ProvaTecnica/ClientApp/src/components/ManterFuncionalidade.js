import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import InputBox from './forms/InputBox'
import SelectBox from './forms/SelectBox'
import FormValidator from '../validation/FormValidator'
import FuncionalidadeFormRules from '../validation/FuncionalidadeFormRules'

export class ManterFuncionalidade extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(FuncionalidadeFormRules());

    this.state = {
      funcionalidade: { descFuncionalidade: "" }, loading: true,
      validation: this.validator.valid()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(value, field) {
    let model = this.state.Funcionalidade;
    model[field] = value;
    this.setState({ model });
    console.log(model);
  }

  handleInputBlur(event) {
    const name = event.target.name || event.target.id;
    //console.log(name);
    if (event.target.type === 'text') {
      const value = event.target.value;
      /// const valueTrimmed = getTrimmed(value);

      // let model = this.state.Funcionalidade;
      // mod/el[field] = value;

      ////  this.setState({ model });
    }

    /// if (valueTrimmed !== value) {
    //      this.updatecustomer(formSection, name, valueTrimmed);
    //}



    let stateToValidate = {

      ///  ...this.state.Funcionalidade,
      ...this.state
    }

    //console.log(stateToValidate);


    /// let validation = this.validator.validateOnBlur(stateToValidate, this.state.validation, name, "Funcionalidade");             

    // this.setState({ validation });            
  }

  async componentDidMount() {
    const id = this.props.location.search ? this.props.location.search.replace("?id=", "") : "";
    if (id)
      this.buscaFuncionalidade(id);
  }

  async handleSalvarClick() {

    this.validator.formSubmitted();
    const validation = this.validator.validate(this.state.Funcionalidade, "Funcionalidade");
    this.setState({ validation });

    if (validation.isValid) {
      await this.salvaFuncionalidade();   
    }
  }

  handleCancelarClick() {
    window.location.href = "/funcionalidades"
  }

  render() {
    return (
      <div>
        <h1>Cadastro de Funcionalidade</h1>
        <p></p>
        <Row>
          <Col>
            <InputBox
              displayName="Descrição"
              value={this.state.funcionalidade.descFuncionalidade}
              onChangeCallback={(value) => this.handleInputChange(value, "descFuncionalidade")}
              onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="Funcionalidade"
              errorMessage={this.state.validation.descricao.message}
              validationClass={this.validator.getValidationClass("descFuncionalidade", this.state.validation)}>
            </InputBox>
          </Col>
        </Row>     
        <Button className="btn btn-primary mr-3 mt-3" onClick={() => this.handleSalvarClick()}>Salvar</Button>
        <Button className="btn btn-primary mt-3" onClick={() => this.handleCancelarClick()}>Cancelar</Button>
      </div>
    );
  }

  async buscaFuncionalidade(id) {
    const response = await fetch(`api/funcionalidade/get?id=${id}`);
    const data = await response.json();
    this.setState({ Funcionalidade: data, loading: false });
  }

  async salvaFuncionalidade() {
    console.log(JSON.stringify(this.state.Funcionalidade));
    const response = await fetch('api/funcionalidade/put', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.Funcionalidade)
    });
  }
}

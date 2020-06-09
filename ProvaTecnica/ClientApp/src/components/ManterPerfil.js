import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import InputBox from './forms/InputBox'
import FormValidator from '../validation/FormValidator'
import PerfilFormRules from '../validation/PerfilFormRules'

export class ManterPerfil extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(PerfilFormRules());

    this.state = {
      perfil: { descPerfil: "" }, loading: true,
      validation: this.validator.valid()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(value, field) {
    let model = this.state.perfil;
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

      // let model = this.state.Perfil;
      // mod/el[field] = value;

      ////  this.setState({ model });
    }

    /// if (valueTrimmed !== value) {
    //      this.updatecustomer(formSection, name, valueTrimmed);
    //}



    let stateToValidate = {

      ///  ...this.state.Perfil,
      ...this.state
    }

    //console.log(stateToValidate);


    /// let validation = this.validator.validateOnBlur(stateToValidate, this.state.validation, name, "Perfil");             

    // this.setState({ validation });            
  }

  async componentDidMount() {
    const id = this.props.location.search ? this.props.location.search.replace("?id=", "") : "";
    if (id)
      this.buscaPerfil(id);
  }

  async handleSalvarClick() {
    this.validator.formSubmitted();
    const validation = this.validator.validate(this.state.perfil, "Perfil");
    this.setState({ validation });

    if (validation.isValid) {
      await this.salvaPerfil();   
    }
  }

  handleCancelarClick() {
    window.location.href = "/perfis"
  }

  render() {
    return (
      <div>
        <h1>Cadastro de Perfil</h1>
        <p></p>
        <Row>
          <Col>
            <InputBox
              displayName="Descrição"
              value={this.state.perfil.descPerfil}
              onChangeCallback={(value) => this.handleInputChange(value, "descPerfil")}
              onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="perfil"
              errorMessage={this.state.validation.descricao.message}
              validationClass={this.validator.getValidationClass("descPerfil", this.state.validation)}>
            </InputBox>
          </Col>
        </Row>     
        <Button className="btn btn-primary mr-3 mt-3" onClick={() => this.handleSalvarClick()}>Salvar</Button>
        <Button className="btn btn-primary mt-3" onClick={() => this.handleCancelarClick()}>Cancelar</Button>
      </div>
    );
  }

  async buscaPerfil(id) {
    const response = await fetch(`api/perfil/get?id=${id}`);
    const data = await response.json();
    this.setState({ perfil: data, loading: false });
  }

  async salvaPerfil() {
    console.log(JSON.stringify(this.state.perfil));
    const response = await fetch('api/perfil/put', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.perfil)
    });
  }
}

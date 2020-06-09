import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import InputBox from './forms/InputBox'
import SelectBox from './forms/SelectBox'
import FormValidator from '../validation/FormValidator'
import UsuarioFormRules from '../validation/UsuarioFormRules'

export class ManterUsuario extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(UsuarioFormRules());

    this.state = {
      usuario: { nome: "", login: "", email: "", idUsuario: "", idPerfil: "" }, loading: true,
      perfis: [],
      validation: this.validator.valid()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getPerfisOptionList = () => {
    const optionList = [{ value: "", text: ""}];
    this.state.perfis.map((perfil, id) => {
      optionList.push({ value: perfil.idPerfil, text: perfil.descPerfil });
    });

    return optionList;
  }

  getPerfis = async () => {
    const url = "api/perfil/list";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return data.results;
  }

  handleInputChange(value, field) {
    let model = this.state.usuario;
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

      // let model = this.state.usuario;
      // mod/el[field] = value;

      ////  this.setState({ model });
    }

    /// if (valueTrimmed !== value) {
    //      this.updatecustomer(formSection, name, valueTrimmed);
    //}



    let stateToValidate = {

      ///  ...this.state.usuario,
      ...this.state
    }

    //console.log(stateToValidate);


    /// let validation = this.validator.validateOnBlur(stateToValidate, this.state.validation, name, "usuario");             

    // this.setState({ validation });            
  }

  async componentDidMount() {

    console.log('componentDidMount');
    const perfis = await this.getPerfis();
    ///console.log(data);

    this.setState({ perfis });
    console.log(this.state);

    const id = this.props.location.search ? this.props.location.search.replace("?id=", "") : "";
    if (id)
      this.buscaUsuario(id);
  }

  async handleSalvarClick() {

    this.validator.formSubmitted();
    const validation = this.validator.validate(this.state.usuario, "usuario");
    this.setState({ validation });

    if (validation.isValid) {
      await this.salvaUsuario();
      // handle actual form submission here
      ////  DellMetricsLogNavigation.toApplicationDisclosures();
      //// this.props.history.push('/disclosures');
      //  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      /*  const iTimeout = setTimeout(() => {
           const firstInvalid = document.querySelector(".is-invalid");
           if (firstInvalid) {
               const label = document.querySelector(`label[for='${firstInvalid.id}']`);
               label.scrollIntoView({ block: "start", behavior: 'smooth' });
               clearTimeout(iTimeout);
           }
       }, 100); */
    }

  }

  handleCancelarClick() {
    window.location.href = "/usuarios"
  }

  render() {
    return (
      <div>
        <h1>Cadastro de Usuário</h1>
        <p></p>
        <Row>
          <Col>
            <InputBox
              displayName="Nome"
              value={this.state.usuario.nome}
              onChangeCallback={(value) => this.handleInputChange(value, "nome")}
              onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="usuario"
              errorMessage={this.state.validation.nome.message}
              validationClass={this.validator.getValidationClass("nome", this.state.validation)}>
            </InputBox>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputBox
              displayName="Login"
              value={this.state.usuario.login}
              onChangeCallback={(value) => this.handleInputChange(value, "login")}
              onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="usuario"
              errorMessage={this.state.validation.login.message}
              validationClass={this.validator.getValidationClass("login", this.state.validation)}>
            </InputBox>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputBox displayName="E-mail"
              value={this.state.usuario.email}
              onChangeCallback={(value) => this.handleInputChange(value, "email")}
              onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="usuario"
              errorMessage={this.state.validation.email.message}
              validationClass={this.validator.getValidationClass("email", this.state.validation)}></InputBox>
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectBox displayName="Perfil"
              options={this.getPerfisOptionList()}
              value={this.state.usuario.idPerfil}
              onChangeCallback={(value) => this.handleInputChange(value, "idPerfil")}
             // onBlurCallback={(event) => this.handleInputBlur(event)}
              formSection="usuario"
              errorMessage={this.state.validation.perfil.message}
              validationClass={this.validator.getValidationClass("perfil", this.state.validation)}></SelectBox>
          </Col>
        </Row>
        <Button className="btn btn-primary mr-3 mt-3" onClick={() => this.handleSalvarClick()}>Salvar</Button>
        <Button className="btn btn-primary mt-3" onClick={() => this.handleCancelarClick()}>Cancelar</Button>
      </div>
    );
  }

  async buscaUsuario(id) {
   /// console.log(this.props);
    const response = await fetch(`api/usuario/get?id=${id}`);
    const data = await response.json();
    this.setState({ usuario: data, loading: false });
  }

  async salvaUsuario() {
    console.log(JSON.stringify(this.state.usuario));
    const response = await fetch('api/usuario/put', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      ///body: "{\"idUsuario\":\"\",\"nome\":\"ffsdf\",\"login\":\"sdfsf\",\"email\":\"dsf\"}"
      body: JSON.stringify(this.state.usuario)
    });




    console.log(response);

    /// window.location.href = "/"
    // const data = await response.json();
    /// this.setState({ usuario: data, loading: false });
  }
}

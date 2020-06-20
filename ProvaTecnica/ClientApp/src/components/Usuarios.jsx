import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'reactstrap';
import Page from './Page';
import { List } from './List';

export class Usuarios extends Component {
  constructor(props) {
    super(props);

    const columns = [{ name: "idUsuario", label: "#" }, { name: "nome", label: "Nome" }];

    this.state = { columns, usuarios: [], usuario: {
      nome: "",
      login: "",
      email: "",
      idPerfil: ""
    }, loading: true };

    
  }

  async componentDidMount() {
     this.listaUsuarios();
  }

  handleNovoClick() {
    window.location.href = "/manterusuario"
  }

  handleEditClick(id) {
    window.location.href = "/manterusuario?id=" + id;
  }

  async handleExcluirClick(id) {
    const url = "api/usuario/delete";
    await fetch(url, {
      method: "POST",
      headers: {       
        'Content-Type':'application/x-www-form-urlencoded', 
      },    
      body: 'id='+id
    });

    this.handleClickPesquisar();
  }

  handleInputChange(event, field, obj) {
    let model = this.state.usuario;
    model[field] = event.target.value;
    this.setState({ model });
  }

  async handleClickPesquisar() {
    await this.listaUsuarios(this.state.usuario.nome, this.state.usuario.login, this.state.usuario.email);
  }

  renderizaTabelaUsuarios() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Login</th>
            <th>E-mail</th>
            <th>Perfil</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>
              <Input
                value={this.state.usuario.nome}
                onChange={(event) => this.handleInputChange(event, "nome")}>
              </Input></th>
            <th>
              <Input
                value={this.state.usuario.login}
                onChange={(event) => this.handleInputChange(event, "login")}>
              </Input>
            </th>
            <th>
              <Input
                value={this.state.usuario.email}
                onChange={(event) => this.handleInputChange(event, "email")}>
              </Input>
            </th>
            <th><Dropdown
                value={this.state.usuario.idPerfil}
                onChange={(event) => this.handleInputChange(event, "idPerfil")}>
              </Dropdown></th>
            <th></th>
            <th><Button className="btn btn-primary" onClick={() => this.handleClickPesquisar()}>Filtrar</Button></th>
          </tr>
        </thead>
        <tbody>
          {this.state.usuarios.map(usu =>
            <tr key={usu.idUsuario}>
              <td>{usu.idUsuario}</td>
              <td>{usu.nome}</td>
              <td>{usu.login}</td>
              <td>{usu.email}</td>
              <td>{usu.descPerfil}</td>
              <td><Button className="btn btn-primary" onClick={() => this.handleEditClick(usu.idUsuario)}>Edit</Button></td>
              <td><Button className="btn btn-primary" onClick={() =>  this.handleExcluirClick(usu.idUsuario)}>Excluir</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
   /*  let contents = this.state.loading
      ? <p><em>Carregando...</em></p>
      : this.renderizaTabelaUsuarios(); */
      console.log('this.props');
      console.log(this.props);
    return (
      <React.Fragment>
        <Page title="Lista de Usuários"/>  
        { this.state.usuarios.length}   
        <div className="mt-3 mb-3">
          <Button className="btn btn-primary" onClick={() => this.handleNovoClick()}>Novo</Button>
        </div>
         <List columns={this.state.columns} data={this.state.usuarios} />
        </React.Fragment>
    );
  }

  async listaUsuarios(nome = "", login = "", email = "") {
    const queryParams = "?nome=" + nome + "&login=" + login + "&email=" + email;
    const url = "api/usuario/list" + queryParams;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    //console.log(data);
    this.setState({ usuarios: data.results, loading: false });
    this.props = { ...this.props, data };
    console.log('this.props');
    console.log(this.props);
    ///this.forceUpdate();
    //console
    return data.results;
  }
}

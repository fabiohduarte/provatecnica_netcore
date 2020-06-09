import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'reactstrap';

export class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = { usuarios: [], loading: true };
    this.state.usuario = {
      nome: "",
      login: "",
      email: "",
      idPerfil: ""
    };
  }

  componentDidMount() {
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
    const response = await fetch(url, {
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

  static renderizaTabelaUsuarios(usuarios, obj) {
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
                value={obj.state.usuario.nome}
                onChange={(event) => obj.handleInputChange(event, "nome")}>
              </Input></th>
            <th>
              <Input
                value={obj.state.usuario.login}
                onChange={(event) => obj.handleInputChange(event, "login")}>
              </Input>
            </th>
            <th>
              <Input
                value={obj.state.usuario.email}
                onChange={(event) => obj.handleInputChange(event, "email")}>
              </Input>
            </th>
            <th><Dropdown
                value={obj.state.usuario.idPerfil}
                onChange={(event) => obj.handleInputChange(event, "idPerfil")}>
              </Dropdown></th>
            <th></th>
            <th><Button className="btn btn-primary" onClick={() => obj.handleClickPesquisar()}>Filtrar</Button></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usu =>
            <tr key={usu.idUsuario}>
              <td>{usu.idUsuario}</td>
              <td>{usu.nome}</td>
              <td>{usu.login}</td>
              <td>{usu.email}</td>
              <td>{usu.descPerfil}</td>
              <td><Button className="btn btn-primary" onClick={() => obj.handleEditClick(usu.idUsuario)}>Edit</Button></td>
              <td><Button className="btn btn-primary" onClick={() =>  obj.handleExcluirClick(usu.idUsuario)}>Excluir</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Carregando...</em></p>
      : Usuarios.renderizaTabelaUsuarios(this.state.usuarios, this);

    return (
      <div>
        <h1>Lista de Usuários</h1>
        <p></p>
        <div className="mt-3 mb-3">
          <Button className="btn btn-primary" onClick={() => this.handleNovoClick()}>Novo</Button>
        </div>
        {contents}
      </div>
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
    this.setState({ usuarios: data.results, loading: false });
  }
}

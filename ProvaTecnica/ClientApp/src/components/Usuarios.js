import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';

export class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = { usuarios: [], loading: true };
  }

  componentDidMount() {
    this.listaUsuarios();
  }

  handleNovoClick() {
    //window.location.href = "/manterusuario"
  }

  static renderizaTabelaUsuarios(usuarios) {
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
        </thead>
        <tbody>
          {usuarios.map(usu =>
            <tr key={usu.idUsuario}>
             <td>{usu.idUsuario}</td>
              <td>{usu.nome}</td>
              <td>{usu.login}</td>
              <td>{usu.email}</td>
              <td></td>
              <td><button>Edit</button>Edit</td>
              <td>Delete</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
     let contents = this.state.loading
      ? <p><em>Carregando...</em></p>
      : Usuarios.renderizaTabelaUsuarios(this.state.usuarios);
 
    return (
      <div>
        <h1 id="tabelLabel" >Lista de Usuários</h1>
        <p></p>
        <Button onClick={this.handleNovoClick()}>Novo</Button>
        {contents}
      </div>
    );
  }

  async listaUsuarios() { 
    const response = await fetch('api/usuario/list');
    const data = await response.json();
    this.setState({ usuarios: data.results, loading: false });
  }
}

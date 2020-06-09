import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';

export class Perfis extends Component {
  constructor(props) {
    super(props);
    this.state = { perfis: [], loading: true };
    this.state.perfil = {
      descPerfil: "",
    };
  }

  componentDidMount() {
    this.listaPerfis();
  }

  handleNovoClick() {
    window.location.href = "/manterperfil"
  }

  handleEditClick(id) {
    window.location.href = "/manterperfil?id=" + id;
  }

   async handleExcluirClick(id) {
    const url = "api/perfil/delete";
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
    let model = this.state.Perfil;
    model[field] = event.target.value;
    this.setState({ model });
  }

  async handleClickPesquisar() {
    await this.listaPerfis(this.state.perfil.descPerfil);
  }

  static renderizaTabelaPerfis(perfis, obj) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>        
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>
              <Input
                value={obj.state.perfil.descPerfil}
                onChange={(event) => obj.handleInputChange(event, "descPerfil")}>
              </Input></th>                   
            <th></th>
            <th><Button className="btn btn-primary" onClick={() => obj.handleClickPesquisar()}>Filtrar</Button></th>
          </tr>
        </thead>
        <tbody>
          {perfis.map(perf =>
            <tr key={perf.idPerfil}>
              <td>{perf.idPerfil}</td>
              <td>{perf.descPerfil}</td>
            
              <td><Button className="btn btn-primary" onClick={() => obj.handleEditClick(perf.idPerfil)}>Edit</Button></td>
              <td><Button className="btn btn-primary" onClick={() =>  obj.handleExcluirClick(perf.idPerfil)}>Excluir</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Carregando...</em></p>
      : Perfis.renderizaTabelaPerfis(this.state.perfis, this);

    return (
      <div>
        <h1>Lista de Perfis</h1>
        <p></p>
        <div className="mt-3 mb-3">
          <Button className="btn btn-primary" onClick={() => this.handleNovoClick()}>Novo</Button>
        </div>
        {contents}
      </div>
    );
  }

  async listaPerfis(descPerfil = "") {
    const queryParams = "?descPerfil=" + descPerfil;
    const url = "api/perfil/list" + queryParams;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    this.setState({ perfis: data.results, loading: false });
  }
}

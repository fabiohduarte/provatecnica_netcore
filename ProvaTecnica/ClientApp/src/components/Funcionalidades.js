import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'reactstrap';

export class Funcionalidades extends Component {
  constructor(props) {
    super(props);
    this.state = { Funcionalidades: [], loading: true };
    this.state.funcionalidade = {
      descFuncionalidade: "",
    };
  }

  componentDidMount() {
    this.listaFuncionalidades();
  }

  handleNovoClick() {
    window.location.href = "/manterfuncionalidade"
  }

  handleEditClick(id) {
    window.location.href = "/manterfuncionalidade?id=" + id;
  }

   async handleExcluirClick(id) {
    const url = "api/funcionalidade/delete";
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
    let model = this.state.funcionalidade;
    model[field] = event.target.value;
    this.setState({ model });
  }

  async handleClickPesquisar() {
    await this.listaFuncionalidades(this.state.funcionalidade.descFuncionalidade);
  }

  static renderizaTabelaFuncionalidades(funcionalidades, obj) {
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
                value={obj.state.funcionalidade.nome}
                onChange={(event) => obj.handleInputChange(event, "descFuncionalidade")}>
              </Input></th>                   
            <th></th>
            <th><Button className="btn btn-primary" onClick={() => obj.handleClickPesquisar()}>Filtrar</Button></th>
          </tr>
        </thead>
        <tbody>
          {funcionalidades.map(func =>
            <tr key={func.idFuncionalidade}>
              <td>{func.idFuncionalidade}</td>
              <td>{func.descFuncionalidade}</td>
            
              <td><Button className="btn btn-primary" onClick={() => obj.handleEditClick(func.idFuncionalidade)}>Edit</Button></td>
              <td><Button className="btn btn-primary" onClick={() =>  obj.handleExcluirClick(func.idFuncionalidade)}>Excluir</Button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Carregando...</em></p>
      : Funcionalidades.renderizaTabelaFuncionalidades(this.state.funcionalidades, this);

    return (
      <div>
        <h1>Lista de Funcionalidades</h1>
        <p></p>
        <div className="mt-3 mb-3">
          <Button className="btn btn-primary" onClick={() => this.handleNovoClick()}>Novo</Button>
        </div>
        {contents}
      </div>
    );
  }

  async listaFuncionalidades(descFuncionalidade = "") {
    const queryParams = "?descFuncionalidade=" + descFuncionalidade;
    const url = "api/funcionalidade/list" + queryParams;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    this.setState({ funcionalidades: data.results, loading: false });
  }
}

import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'reactstrap';
import Page from './Page';
import { List } from './List';
import PageList from './PageList'

export class Usuarios extends Component {
  constructor(props) {
    super(props);

    const columns = [{ name: "idUsuario", label: "#" },
    { name: "nome", label: "Nome", filter: true },
    { name: "login", label: "Login", filter: true },
    { name: "email", label: "E-mail", filter: true },
    { name: "descPerfil", label: "Perfil", filter: true, lookupData: true, data: [] }];

    this.state = {
      columns, usuarios: [],
      /*  usuario: {
        nome: "",
        login: "",
        email: "",
        idPerfil: ""
      },  */
      loading: true
    };

  }

  async listaPerfis() {
  
    const url = "api/perfil/list"
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    
    let optionList = [{ value: "", text: ""}];
     data.results.map((perfil, id) => {
        optionList.push({ value: perfil.idPerfil, text: perfil.descPerfil });
      });
      
    let columns = this.state.columns;
    columns[4]["data"] = optionList;

    this.setState({ columns });
  }

   async componentDidMount() {
    
    await this.listaPerfis();
    await this.listaUsuarios(this.state.model);
  }  

   onFindClick = async (e) => {
    await this.listaUsuarios(this.state.model);
  }

  onHandleInputChange = (model) => {
    console.log(model);
    this.setState({ model });
  }

  render() {
    return (
      <React.Fragment>
        <PageList title="Lista de Usuários"
        columns={this.state.columns} data={this.state.usuarios} loading={this.state.loading}
        onHandleInputChange={this.onHandleInputChange}
        enableFiltering={true}
        enableEditing={true}
        enableDeleting={true}
        onFindClick={this.onFindClick}
        newRecordLink="/manterusuario"
        idFieldName="idUsuario"
        apiDeletePath="api/usuario/delete"
        >
         </PageList>
      </React.Fragment>
    );
  }

  getParam(model, name) {
      return model && model[name] ? model[name] : "";
  }

  async listaUsuarios(model/* nome = "", login = "", email = "" */) {
   
    const queryParams = "?nome=" + this.getParam(model, "nome") + "&login=" + this.getParam(model,"login") + 
    "&email=" + this.getParam(model,"email") + "&idperfil=" + this.getParam(model,"descPerfil");
    console.log(queryParams);
    const url = "api/usuario/list" + queryParams;
    console.log(url);
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

    return data.results;
  }
}

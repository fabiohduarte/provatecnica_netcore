import  React, { Component } from 'react';
import { Button, Input, Dropdown } from 'reactstrap';
import Page from './Page';
import { List } from './List';


export default class PageList extends Component {
    constructor(props) {
        super(props);
    }

    handleNewRecordClick() {
      window.location.href = this.props.newRecordLink;
    }

   

   /*  async componentDidMount() {
        this.props.listaData();
      } 
 */
   /*  async listaData(url) {
        /// const queryParams = "?nome=" + nome + "&login=" + login + "&email=" + email;
        /// const url = "api/usuario/list";/// + queryParams;
         const response = await fetch(url, {
           method: "GET",
           headers: {
             "Content-Type": "application/json"
           }
         });
     
         const data = await response.json();
         //console.log(data);
         this.setState({ data: data.results, loading: false });
         this.props = { ...this.props, data };
         console.log('this.props');
         console.log(this.props);
         ///this.forceUpdate();
         //console
         return data.results;
       } */

    render() {
        return (
        <React.Fragment>
        <Page title={this.props.title} />
        <div className="mt-3 mb-3">
          { this.props.newRecordLink &&
            <Button className="btn btn-primary" onClick={() => this.handleNewRecordClick()}>Novo</Button>
          }
        </div>
        <List columns={this.props.columns} data={this.props.data} loading={this.props.loading}
               onHandleInputChange={this.props.onHandleInputChange}
               enableFiltering={this.props.enableFiltering}
               enableEditing={this.props.enableEditing}
               enableDeleting={this.props.enableDeleting}
               onFindClick={this.props.onFindClick}
               newRecordLink={this.props.newRecordLink}
               idFieldName={this.props.idFieldName}
               apiDeletePath={this.props.apiDeletePath} />
        </React.Fragment>)

    }
}



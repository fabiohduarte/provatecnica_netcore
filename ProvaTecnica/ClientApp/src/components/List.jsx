import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';

export class List extends Component {

    constructor(props) {
        super(props);
       console.log(props);
        this.state = { fieldvalues: []};
        
    }

    componentDidUpdate() {

    }

    async componentDidMount() {

    }

    handleInputChange(event, fieldname) {
        let model = this.state.fieldvalues;
        model[fieldname] = event.target.value;
        this.setState({ model });

        this.props.onHandleInputChange(model);
    }

    render() {
        return (
            this.props.loading ? <p><em>Carregando...</em></p> :
                this.renderTable()
        );
    }

    renderFilter(fieldname) {
        return (
            <Input
                value={this.state.fieldvalues[fieldname]}
                onChange={(event) => this.handleInputChange(event, fieldname)}>
            </Input>)
    }

    handleEditClick = (id) =>  {
        window.location.href = this.props.newRecordLink + "?id=" + id;
      }

      async handleDeleteClick(id) {
        await fetch(this.props.apiDeletePath, {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'id=' + id
        });
    
        this.props.onFindClick();
      }

    renderTableHead() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(col => {
                        return (
                            <th>{col.label}</th>
                        )
                    })}

                    {this.props.enableFiltering && <th></th>}
                </tr>
                <tr>
                    {this.props.columns.map(col => {
                        return (
                            <th>{col.filter && this.renderFilter(col.name)}</th>
                        )
                    })}
                   
                    {this.props.enableFiltering && <th><Button onClick={this.props.onFindClick}>Find</Button></th>}
                </tr>

            </thead>
        );
    }

    renderTableRow(dataRow) {
        return (
            <tr>
                {this.props.columns.map(field => {
                    return (<td>{dataRow[field.name]}</td>)
                })}


                 {<td> { this.props.enableEditing &&  <Button onClick={() => this.handleEditClick(dataRow[this.props.idFieldName])}>Edit</Button> }
                        {this.props.enableDeleting && <Button onClick={() => this.handleDeleteClick(dataRow[this.props.idFieldName])}>Delete</Button>} </td>}
                 
                   
            </tr>);
    }

    renderTable() {
        console.log(this.props.data);
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                {this.renderTableHead()}
                <tbody>
                    {this.props.data.map(row => {
                        return this.renderTableRow(row)
                    })}
                </tbody>
            </table>
        );
    }

}


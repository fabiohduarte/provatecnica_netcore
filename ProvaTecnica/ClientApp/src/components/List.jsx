import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import SelectBox from './forms/SelectBox'

export class List extends Component {

    constructor(props) {
        super(props);
       console.log(props);
        this.state = { fieldvalues: []};
        
    }

   /*  componentDidUpdate() {

    }

    async componentDidMount() {

    } */

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

    renderFilter(col) {
        console.log(col.data);
        return (
             col.lookupData ?
             
            <SelectBox
            filter={true}
             options={col.data}
            value={this.state.fieldvalues[col.name]}
            onChangeCallback={(value) => this.handleInputChange(value, col.name)}>
            </SelectBox> 
            :
            <Input
                value={this.state.fieldvalues[col.name]}
                onChange={(event) => this.handleInputChange(event, col.name)}>
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
                            <th>{col.filter && this.renderFilter(col)}</th>
                        )
                    })}
                   
                    {this.props.enableFiltering && <th><Button className="btn-primary" onClick={this.props.onFindClick}>Find</Button></th>}
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
                 {<td> { this.props.enableEditing &&  <Button className="btn-primary" onClick={() => this.handleEditClick(dataRow[this.props.idFieldName])}>Edit</Button> }
                        {this.props.enableDeleting && <Button className="btn-primary ml-3" onClick={() => this.handleDeleteClick(dataRow[this.props.idFieldName])}>Delete</Button>} </td>}                                   
            </tr>);
    }

    renderTable() {
       // console.log(this.props.data);
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


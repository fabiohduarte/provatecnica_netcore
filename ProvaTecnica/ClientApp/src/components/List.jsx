import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class List extends Component {

    constructor(props) {
        super(props);
       console.log(props);
       /// this.state = { data: this.props.data, columns: this.props.columns };
    }

    componentDidUpdate()
    {
        console.log("list update");
        console.log(this.props);
       /// console.log(this.state.data);
       /// this.setState({ data: this.props.data, columns: this.props.columns });
    }

      async componentDidMount() {
        console.log("list mount");
       /// let/ds = [{ name: "id", label: "#" }, { name: "name", label: "Nome" }];
       /// let data = [{ id: '1', name: 'fabio' }, { id: '2', name: 'flavio' }];
        //  this.setState({ data: this.props.data, columns: this.props.columns });
        ///  this.forceUpdate();
    }

    render() {
        // let contents = 
        //console.log(contents);


        return (
            this.renderTable()
              ///  [{ name: "id", label: "#" }, { name: "name", label: "Nome" }])
        );
    }

    renderTableRow(dataRow) {
        return (
            <tr>
                {this.props.columns.map(field => {
                    return (<td>{dataRow[field.name]}</td>)
                })}
            </tr>);
    }

    renderTable() {
        console.log(this.props.data);
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        {this.props.columns.map(col => {
                            return (
                                <th>{col.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(row => {
                        return this.renderTableRow(row)
                    })}
                </tbody>
            </table>
        );
    }

}


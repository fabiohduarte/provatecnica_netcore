import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Usuarios } from './components/Usuarios';
import { ManterUsuario } from './components/ManterUsuario';
import { Funcionalidades } from './components/Funcionalidades';
import { ManterFuncionalidade } from './components/ManterFuncionalidade';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
      
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/manterusuario' component={ManterUsuario} />
        <Route path='/funcionalidades' component={Funcionalidades} />
        <Route path='/manterfuncionalidade' component={ManterFuncionalidade} />
      </Layout>
    );
  }
}


import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Sobre } from './pages/sobre/sobre';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'sobre',
    component: Sobre
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenha
  },
  {
    path: 'admin',
    component: Admin
  },
  {
    path: '**',
    redirectTo: ''
  }
];

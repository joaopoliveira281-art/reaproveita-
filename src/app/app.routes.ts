
import { Routes } from '@angular/router';

export const routes: Routes = [

  // Página inicial
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },

  // Etapa 1: Acesso e Recuperação
  // A rota de login será adicionada quando o componente estiver disponível.

  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/auth/login/cadastro/cadastro')
        .then(m => m.Cadastro)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/recuperar-senha/recuperar-senha')
        .then(m => m.RecuperarSenha)
  },
  {
    path: 'confirmar-email',
    loadComponent: () =>
      import('./pages/confirmar-email/confirmar-email')
        .then(m => m.ConfirmarEmail)
  },

  // Etapa 2: Organizações, Convites e Contexto
  {
    path: 'selecionar-contexto',
    loadComponent: () =>
      import('./pages/organizacoes/selecionar-contexto/selecionar-contexto')
        .then(m => m.SelecionarContexto)
  },
  {
    path: 'estabelecimentos/cadastro',
    loadComponent: () =>
      import('./pages/organizacoes/cadastro-estabelecimento/cadastro-estabelecimento')
        .then(m => m.CadastroEstabelecimento)
  },
  {
    path: 'instituicoes/cadastro',
    loadComponent: () =>
      import('./pages/organizacoes/cadastro-instituicao/cadastro-instituicao')
        .then(m => m.CadastroInstituicao)
  },
  {
    path: 'organizacoes/status',
    loadComponent: () =>
      import('./pages/organizacoes/status-organizacoes/status-organizacoes')
        .then(m => m.StatusOrganizacoes)
  },

  // Etapa 3: Módulo do Integrante 3
  {
    path: 'instituicao',
    loadComponent: () =>
      import('./pages/instituicao/instituicao')
        .then(m => m.Instituicao)
  },

  // Rotas ainda aguardando a criação dos componentes:
  // gestao/usuarios
  // gestao/convites
  // convite/aceitar
  // admin/dashboard
  // admin/estabelecimentos
  // admin/instituicoes
  // admin/usuarios
  // admin/doacoes

  // Endereços não encontrados
  {
    path: '**',
    redirectTo: ''
  }

];

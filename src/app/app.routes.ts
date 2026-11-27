import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Etapa 1: Acesso e Recuperação
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/auth/cadastro/cadastro.component').then(m => m.Cadastro)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/auth/recuperar-senha/recuperar-senha.component').then(m => m.RecuperarSenha)
  },
  {
    path: 'redefinir-senha',
    loadComponent: () =>
      import('./pages/auth/redefinir-senha/redefinir-senha.component').then(m => m.RedefinirSenha)
  },
  {
    path: 'confirmar-email',
    loadComponent: () =>
      import('./pages/auth/confirmar-email/confirmar-email.component').then(m => m.ConfirmarEmail)
  },

  // Etapa 2: Organizações, Convites e Contexto
  {
    path: 'selecionar-contexto',
    loadComponent: () =>
      import('./pages/organizacoes/selecionar-contexto/selecionar-contexto.component').then(m => m.SelecionarContextoComponent)
  },
  {
    path: 'estabelecimentos/cadastro',
    loadComponent: () =>
      import('./pages/organizacoes/cadastro-estabelecimento/cadastro-estabelecimento.component').then(m => m.CadastroEstabelecimentoComponent)
  },
  {
    path: 'instituicoes/cadastro',
    loadComponent: () =>
      import('./pages/organizacoes/cadastro-instituicao/cadastro-instituicao.component').then(m => m.CadastroInstituicaoComponent)
  },
  {
    path: 'organizacoes/status',
    loadComponent: () =>
      import('./pages/organizacoes/status-organizacao/status-organizacao.component').then(m => m.StatusOrganizacaoComponent)
  },
  {
    path: 'gestao/usuarios',
    loadComponent: () =>
      import('./pages/gestao/usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
  {
    path: 'gestao/convites',
    loadComponent: () =>
      import('./pages/gestao/convites/convites.component').then(m => m.ConvitesComponent)
  },
  {
    path: 'convite/aceitar',
    loadComponent: () =>
      import('./pages/gestao/aceitar-convite/aceitar-convite.component').then(m => m.AceitarConviteComponent)
  },

  // Etapa 3: Administração Global
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/estabelecimentos',
    loadComponent: () =>
      import('./pages/admin/estabelecimentos/admin-estabelecimentos.component').then(m => m.AdminEstabelecimentosComponent)
  },
  {
    path: 'admin/instituicoes',
    loadComponent: () =>
      import('./pages/admin/instituicoes/admin-instituicoes.component').then(m => m.AdminInstituicoesComponent)
  },
  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./pages/admin/usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent)
  },
  {
    path: 'admin/doacoes',
    loadComponent: () =>
      import('./pages/admin/doacoes/admin-doacoes.component').then(m => m.AdminDoacoesComponent)
  }
];
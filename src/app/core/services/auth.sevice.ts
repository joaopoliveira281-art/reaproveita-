import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, delay, throwError } from 'rxjs';
import { UsuarioLogado, VinculoOrganizacao } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  // Signals para reatividade no menu e telas
  usuarioAtual = signal<UsuarioLogado | null>(null);
  contextoAtivo = signal<VinculoOrganizacao | null>(null);

  // Mock de contas para demonstrar os 4 perfis do guia
  private readonly usuariosMock: Record<string, UsuarioLogado> = {
    'admin@reaproveita.com': {
      id: 1,
      nome: 'Administrador Geral',
      email: 'admin@reaproveita.com',
      isAdminGeral: true,
      vinculos: []
    },
    'gestor@reaproveita.com': {
      id: 2,
      nome: 'Carlos Silva (Multi-vínculo)',
      email: 'gestor@restaurante.com',
      isAdminGeral: false,
      vinculos: [
        { organizacaoId: 10, nomeOrganizacao: 'Restaurante Sabor do Bairro', tipo: 'ESTABELECIMENTO', perfil: 'GESTOR', status: 'APROVADA' },
        { organizacaoId: 11, nomeOrganizacao: 'Bistrô Maré Alta', tipo: 'ESTABELECIMENTO', perfil: 'GESTOR', status: 'PENDENTE' }
      ]
    },
    'funcionario@reaproveita.com': {
      id: 3,
      nome: 'Ana Souza',
      email: 'funcionario@reaproveita.com',
      isAdminGeral: false,
      vinculos: [
        { organizacaoId: 10, nomeOrganizacao: 'Restaurante Sabor do Bairro', tipo: 'ESTABELECIMENTO', perfil: 'FUNCIONARIO', status: 'APROVADA' }
      ]
    },
    'instituicao@reaproveita.com': {
      id: 4,
      nome: 'João Lima',
      email: 'instituicao@reaproveita.com',
      isAdminGeral: false,
      vinculos: [
        { organizacaoId: 20, nomeOrganizacao: 'ONG Mesa Solidária', tipo: 'INSTITUICAO', perfil: 'REPRESENTANTE', status: 'APROVADA' }
      ]
    }
  };

  login(email: string, _senha: string): Observable<UsuarioLogado> {
    const usuario = this.usuariosMock[email.toLowerCase().trim()];

    if (!usuario) {
      // Erro genérico conforme exigido na Etapa 1
      return throwError(() => new Error('E-mail ou senha inválidos.')).pipe(delay(600));
    }

    return of(usuario).pipe(delay(600));
  }

  iniciarSessao(usuario: UsuarioLogado): void {
    this.usuarioAtual.set(usuario);

    if (usuario.isAdminGeral) {
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    if (usuario.vinculos.length === 0) {
      this.router.navigate(['/organizacoes/status']);
    } else if (usuario.vinculos.length === 1) {
      this.selecionarContexto(usuario.vinculos[0]);
    } else {
      // Múltiplos vínculos -> vai para /selecionar-contexto conforme Etapa 2
      this.router.navigate(['/selecionar-contexto']);
    }
  }

  selecionarContexto(vinculo: VinculoOrganizacao): void {
    this.contextoAtivo.set(vinculo);

    if (vinculo.status !== 'APROVADA') {
      this.router.navigate(['/organizacoes/status']);
      return;
    }

    // Redireciona conforme o perfil do vínculo escolhido
    if (vinculo.perfil === 'GESTOR') {
      this.router.navigate(['/gestao/usuarios']);
    } else if (vinculo.perfil === 'FUNCIONARIO') {
      this.router.navigate(['/operacional']); // Módulo do Integrante 2
    } else if (vinculo.perfil === 'REPRESENTANTE') {
      this.router.navigate(['/instituicao']); // Módulo do Integrante 3
    }
  }

  cadastrarConta(dados: { nome: string; email: string; telefone?: string }): Observable<{ sucesso: boolean }> {
    console.log('Mock cadastro enviado:', dados);
    return of({ sucesso: true }).pipe(delay(800));
  }

  logout(): void {
    this.usuarioAtual.set(null);
    this.contextoAtivo.set(null);
    this.router.navigate(['/login']);
  }
}
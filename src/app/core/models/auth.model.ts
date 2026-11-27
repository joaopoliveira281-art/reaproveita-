export type PerfilAcesso = 'ADMIN_GERAL' | 'GESTOR' | 'FUNCIONARIO' | 'REPRESENTANTE';

export type StatusOrganizacao = 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'SUSPENSA';

export interface VinculoOrganizacao {
  organizacaoId: number;
  nomeOrganizacao: string;
  tipo: 'ESTABELECIMENTO' | 'INSTITUICAO';
  perfil: PerfilAcesso;
  status: StatusOrganizacao;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  isAdminGeral: boolean;
  vinculos: VinculoOrganizacao[];
}
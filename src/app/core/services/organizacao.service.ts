// src/app/core/services/organizacao.service.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { StatusOrganizacao } from '../models/auth.model';

export interface OrganizacaoDetalhe {
  id: number;
  tipo: 'ESTABELECIMENTO' | 'INSTITUICAO';
  nome: string;
  documento: string; // CNPJ fictício
  emailContato: string;
  telefone: string;
  endereco: string;
  cidadeUf: string;
  status: StatusOrganizacao;
  motivoStatus?: string;
}

@Injectable({ providedIn: 'root' })
export class OrganizacaoService {
  // Armazena em memória a última organização cadastrada ou consultada
  ultimaOrganizacao = signal<OrganizacaoDetalhe>({
    id: 11,
    tipo: 'ESTABELECIMENTO',
    nome: 'Bistrô Maré Alta',
    documento: '00.000.000/0001-01',
    emailContato: 'contato@bistromarealta.exemplo.com',
    telefone: '(79) 90000-0001',
    endereco: 'Av. Beira Mar, 100',
    cidadeUf: 'Aracaju - SE',
    status: 'PENDENTE'
  });

  cadastrarOrganizacao(dados: Omit<OrganizacaoDetalhe, 'id' | 'status'>): Observable<OrganizacaoDetalhe> {
    const nova: OrganizacaoDetalhe = {
      ...dados,
      id: Math.floor(Math.random() * 1000) + 100,
      status: 'PENDENTE' // Nunca presumir aprovação imediata (Etapa 2)
    };
    this.ultimaOrganizacao.set(nova);
    return of(nova).pipe(delay(700));
  }
}
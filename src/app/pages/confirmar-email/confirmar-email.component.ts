// src/app/pages/auth/confirmar-email/confirmar-email.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, delay } from 'rxjs';

type EstadoConfirmacao = 'VALIDANDO' | 'SUCESSO' | 'EXPIRADO' | 'ERRO';

@Component({
  selector: 'app-confirmar-email',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="auth-wrapper">
      <section class="auth-card">
        <h1>Confirmação de e-mail</h1>

        @switch (estado()) {
          @case ('VALIDANDO') {
            <p>Validando seu link de confirmação...</p>
          }
          @case ('SUCESSO') {
            <div class="alert-success">
              <strong>E-mail confirmado com sucesso!</strong>
              <p>Sua conta está ativa. Faça login para cadastrar ou vincular sua organização.</p>
              <a routerLink="/login" class="btn-primary">Ir para o login</a>
            </div>
          }
          @case ('EXPIRADO') {
            <div class="alert-warn">
              <strong>Link expirado</strong>
              <p>O prazo de validade deste link terminou.</p>
              <button type="button" class="btn-primary" (click)="reenviar()" [disabled]="reenviado()">
                {{ reenviado() ? 'Novo e-mail enviado!' : 'Solicitar novo link de confirmação' }}
              </button>
            </div>
          }
          @case ('ERRO') {
            <div class="alert-error">
              <strong>Não foi possível confirmar o e-mail</strong>
              <p>O link informado é inválido ou já foi utilizado.</p>
              <a routerLink="/login">Voltar ao início</a>
            </div>
          }
        }

        <!-- Controles de teste para validar os 3 estados durante a apresentação -->
        <div class="mock-states">
          <small>Simular estado:</small>
          <button type="button" (click)="estado.set('SUCESSO')">Sucesso</button>
          <button type="button" (click)="estado.set('EXPIRADO')">Expirado</button>
          <button type="button" (click)="estado.set('ERRO')">Erro</button>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #f4f7f5; }
    .auth-card { width: 100%; max-width: 420px; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); text-align: center; }
    h1 { margin: 0 0 1.25rem; color: #1b5e20; font-size: 1.5rem; }
    .alert-success { background: #e8f5e9; color: #1b5e20; padding: 1.25rem; border-radius: 8px; }
    .alert-warn { background: #fff8e1; color: #8d6e00; padding: 1.25rem; border-radius: 8px; }
    .alert-error { background: #ffebee; color: #c62828; padding: 1.25rem; border-radius: 8px; }
    .btn-primary { display: inline-block; margin-top: 1rem; padding: 0.75rem 1.25rem; background: #2e7d32; color: #fff; border: none; border-radius: 6px; font-weight: 600; text-decoration: none; cursor: pointer; }
    .mock-states { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee; display: flex; gap: 0.5rem; justify-content: center; align-items: center; }
    .mock-states button { font-size: 0.75rem; padding: 0.25rem 0.5rem; cursor: pointer; }
  `]
})
export class ConfirmarEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  estado = signal<EstadoConfirmacao>('VALIDANDO');
  reenviado = signal(false);

  ngOnInit(): void {
    const statusParam = this.route.snapshot.queryParamMap.get('status');

    of(statusParam).pipe(delay(500)).subscribe((status) => {
      if (status === 'expirado') this.estado.set('EXPIRADO');
      else if (status === 'erro') this.estado.set('ERRO');
      else this.estado.set('SUCESSO');
    });
  }

  reenviar(): void {
    this.reenviado.set(true);
  }
}
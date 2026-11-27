// src/app/pages/auth/recuperar-senha/recuperar-senha.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { of, delay } from 'rxjs';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-wrapper">
      <section class="auth-card">
        <header>
          <h1>Recuperar senha</h1>
          <p>Informe o e-mail associado à sua conta para receber as instruções.</p>
        </header>

        @if (enviado()) {
          <div class="alert-info" role="status">
            <p>
              <strong>Solicitação registrada.</strong> Se o e-mail informado estiver cadastrado em nossa base,
              você receberá um link para redefinir sua senha em instantes.
            </p>
            <a routerLink="/redefinir-senha" [queryParams]="{ token: 'token-valido-mock' }" class="mock-link">
              [Simular clique no link do e-mail]
            </a>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label for="email">E-mail</label>
              <input id="email" type="email" formControlName="email" placeholder="nome@exemplo.com" />
              @if (form.controls.email.touched && form.controls.email.invalid) {
                <small class="field-error">Informe um e-mail válido.</small>
              }
            </div>

            <button type="submit" class="btn-primary" [disabled]="carregando()">
              {{ carregando() ? 'Enviando...' : 'Enviar instruções' }}
            </button>
          </form>
        }

        <footer class="auth-footer">
          <a routerLink="/login">Voltar para o login</a>
        </footer>
      </section>
    </main>
  `,
  styles: [`
    .auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #f4f7f5; }
    .auth-card { width: 100%; max-width: 420px; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    h1 { margin: 0 0 0.25rem; color: #1b5e20; font-size: 1.5rem; }
    header p { margin: 0 0 1.5rem; color: #555; font-size: 0.9rem; }
    .field { margin-bottom: 1rem; display: flex; flex-direction: column; }
    label { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.35rem; }
    input { padding: 0.7rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }
    .field-error { color: #c62828; font-size: 0.8rem; margin-top: 0.25rem; }
    .alert-info { background: #e8f5e9; color: #1b5e20; padding: 1rem; border-radius: 8px; font-size: 0.9rem; }
    .mock-link { display: inline-block; margin-top: 0.75rem; font-size: 0.8rem; color: #0d47a1; }
    .btn-primary { width: 100%; padding: 0.8rem; background: #2e7d32; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-primary:disabled { opacity: 0.65; }
    .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.9rem; }
    a { color: #2e7d32; text-decoration: none; font-weight: 600; }
  `]
})
export class RecuperarSenhaComponent {
  private fb = inject(FormBuilder);

  carregando = signal(false);
  enviado = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.carregando()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    of(true).pipe(delay(700)).subscribe(() => {
      this.carregando.set(false);
      this.enviado.set(true);
    });
  }
}
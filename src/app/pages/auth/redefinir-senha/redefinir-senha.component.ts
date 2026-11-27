// src/app/pages/auth/redefinir-senha/redefinir-senha.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, delay } from 'rxjs';

function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const nova = control.get('novaSenha')?.value;
  const conf = control.get('confirmarSenha')?.value;
  return nova && conf && nova !== conf ? { senhasDiferentes: true } : null;
}

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-wrapper">
      <section class="auth-card">
        <header>
          <h1>Redefinir senha</h1>
        </header>

        @if (statusToken() === 'INVALIDO') {
          <div class="alert-error">
            <strong>Link inválido ou expirado.</strong>
            <p>Este link de redefinição não é mais válido. Solicite uma nova recuperação de senha.</p>
            <a routerLink="/recuperar-senha">Solicitar novo link</a>
          </div>
        } @else if (redefinida()) {
          <div class="alert-success">
            <strong>Senha atualizada!</strong>
            <p>Sua senha foi redefinida com sucesso. Você já pode acessar a plataforma.</p>
            <a routerLink="/login">Ir para o login</a>
          </div>
        } @else {
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label for="novaSenha">Nova senha</label>
              <input id="novaSenha" type="password" formControlName="novaSenha" placeholder="Mínimo 8 caracteres" />
              @if (form.controls.novaSenha.touched && form.controls.novaSenha.invalid) {
                <small class="field-error">A nova senha deve ter no mínimo 8 caracteres.</small>
              }
            </div>

            <div class="field">
              <label for="confirmarSenha">Confirmar nova senha</label>
              <input id="confirmarSenha" type="password" formControlName="confirmarSenha" placeholder="Repita a nova senha" />
              @if (form.controls.confirmarSenha.touched && form.hasError('senhasDiferentes')) {
                <small class="field-error">As senhas não coincidem.</small>
              }
            </div>

            <button type="submit" class="btn-primary" [disabled]="carregando()">
              {{ carregando() ? 'Salvando...' : 'Salvar nova senha' }}
            </button>
          </form>
        }
      </section>
    </main>
  `,
  styles: [`
    .auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; background: #f4f7f5; }
    .auth-card { width: 100%; max-width: 420px; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    h1 { margin: 0 0 1.25rem; color: #1b5e20; font-size: 1.5rem; }
    .field { margin-bottom: 1rem; display: flex; flex-direction: column; }
    label { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.35rem; }
    input { padding: 0.7rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }
    .field-error { color: #c62828; font-size: 0.8rem; margin-top: 0.25rem; }
    .alert-error { background: #ffebee; color: #c62828; padding: 1rem; border-radius: 8px; }
    .alert-success { background: #e8f5e9; color: #1b5e20; padding: 1rem; border-radius: 8px; }
    .btn-primary { width: 100%; padding: 0.8rem; background: #2e7d32; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
    a { display: inline-block; margin-top: 0.75rem; color: #2e7d32; font-weight: 600; text-decoration: none; }
  `]
})
export class RedefinirSenhaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  statusToken = signal<'VALIDO' | 'INVALIDO'>('VALIDO');
  carregando = signal(false);
  redefinida = signal(false);

  form = this.fb.nonNullable.group(
    {
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]]
    },
    { validators: senhasIguaisValidator }
  );

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token || token === 'expirado') {
      this.statusToken.set('INVALIDO');
    }
  }

  onSubmit(): void {
    if (this.carregando()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    of(true).pipe(delay(700)).subscribe(() => {
      this.carregando.set(false);
      this.redefinida.set(true);
    });
  }
}
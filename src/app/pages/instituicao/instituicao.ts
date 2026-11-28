
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-instituicao',
  standalone: true,
  imports: [],
  templateUrl: './instituicao.html',
  styleUrl: './instituicao.css'
})
export class Instituicao {
  protected readonly authService = inject(AuthService);

  get nomeOrganizacao(): string | null {
    return this.authService.contextoAtivo()?.nomeOrganizacao ?? null;
  }
}

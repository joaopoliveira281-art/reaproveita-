import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.sevice';

@Component({
    selector: 'app-instituicao',
    imports: [],
    templateUrl: './instituicao.html',
    styleUrl: '/instituicao.css',
})
export class instituicao { 

    protected readonly AuthService = inject(AuthService) 

}
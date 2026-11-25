import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEstabelecimento } from './cadastro-estabelecimento';

describe('CadastroEstabelecimento', () => {
  let component: CadastroEstabelecimento;
  let fixture: ComponentFixture<CadastroEstabelecimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEstabelecimento],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroEstabelecimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

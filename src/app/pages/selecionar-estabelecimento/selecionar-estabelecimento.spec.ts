import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelecionarEstabelecimento } from './selecionar-estabelecimento';

describe('SelecionarEstabelecimento', () => {
  let component: SelecionarEstabelecimento;
  let fixture: ComponentFixture<SelecionarEstabelecimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarEstabelecimento],
    }).compileComponents();

    fixture = TestBed.createComponent(SelecionarEstabelecimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
